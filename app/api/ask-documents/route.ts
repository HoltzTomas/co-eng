import { cosineSimilarity, embed, generateText, Message, streamText } from 'ai'
import { providers } from '@/lib/ai-providers'
import { google } from '@ai-sdk/google'

import { db } from '@/lib/db/db'
import { getChunksByFileId } from '@/lib/db/queries'
import { inArray } from 'drizzle-orm'
import { files as filesTable } from '@/lib/db/schema'

type ChunkSimilarity = {
  file: string
  text: string
  similarity: number
}

export async function POST(req: Request) {
  const { messages, filesid }: { messages: Message[], filesid: number[] } = await req.json()

  const tempResponse = await generateText({
    model: providers.gemini,
    messages,
    maxTokens: 512,
    temperature: 0.3,
    maxRetries: 1,
    system: "Answer this question with a short paragraph."
  })

  const tempEmbedding = await embed({
    model: google.textEmbeddingModel("text-embedding-004"),
    value: tempResponse.text
  })

  const files = await db.select().from(filesTable).where(inArray(filesTable.id, filesid))

  let similarityList: ChunkSimilarity[] = []
  for (const fileid of filesid) {
    const chunks = await getChunksByFileId(fileid)
    for (const chunk of chunks) {
      const result = await embed({
        model: google.textEmbeddingModel("text-embedding-004"),
        value: chunk.content
      })
      similarityList.push({
        file: files.find(file => file.id === fileid)!.name,
        text: chunk.content,
        similarity: cosineSimilarity(result.embedding, tempEmbedding.embedding)
      })
    }
  }

  similarityList.sort((a, b) => b.similarity - a.similarity)
  similarityList = similarityList.slice(0, 10)

  let context: string = "";

  similarityList.forEach((chunk, index) => {
    context += `${index + 1}. File: ${chunk.file}\n${chunk.text}\n\n`
  })

  const message = messages.pop()

  const prompt = `Use the following pieces of context to answer the question at the end.
Answer in the same language as the question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Keep the answer concise. Mention the name of the document that you used to answer the question.

${context}


Question: ${message!.content}

Helpful Answer:`

  messages.push({
    id: message!.id,
    content: prompt,
    role: "user"
  })

  const result = streamText({
    model: providers.gemini,
    messages,
    maxTokens: 512,
    temperature: 0.3,
    maxRetries: 1,
  })

  return result.toDataStreamResponse({
    getErrorMessage: (_e) => {
      return "Something went wrong"
    }
  })
}
