import { getFilesById, getRandomChunksByFileId } from "@/lib/db/queries";
import { questionSchema, questionsSchema } from "@/lib/schemas/quiz";
import { google } from "@ai-sdk/google";
import { CoreMessage, streamObject } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { filesid, numQuestions }: { filesid: string[], numQuestions: number, prompt: string } = await req.json();
  
  if (filesid.length === 0) return new Response("No files selected", { status: 400 });
  if (numQuestions < 1 || numQuestions > 20) return new Response("Invalid number of questions", { status: 400 });
  const files = await getFilesById(filesid);

  const documents: CoreMessage[] = [];
  for (const file of files) {
    const fileChunks = await getRandomChunksByFileId(file.id, 10);
    const chunk = fileChunks.map((chunk) => chunk.content).join(" - CHUNK CHANGE - ");
    documents.push({ 
      role: "system", 
      content: `File ${file.name}:` + chunk 
    });
  }

  const result = streamObject({
    model: google("gemini-1.5-pro-latest"),
    messages: [
      {
        role: "system",
        content:
          `You are a teacher. Your job is to take all documents and create a multiple choice test (with ${numQuestions} questions) based on the content of the documents.
          Don't refer to the documents order in the questions.
          Only one of the options should be correct.
          The questions have to be strictly about the main content of the document, no about subjects related to it.
          Each option should be roughly equal in length.
          Answer in the same language as one of the documents.`,
      },
      ...documents,
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Create a multiple choice test based on this documents.",
          }
        ],
      },
    ],
    schema: questionSchema,
    output: "array",
    onFinish: ({ object }) => {
      const res = questionsSchema.safeParse(object);
      if (res.error) {
        throw new Error("Something went wrong");
      }
    },
  });

  return result.toTextStreamResponse();
}