import { cosineSimilarity, embed, generateText, Message, streamText } from 'ai'
import { providers, ProviderName } from '@/lib/ai-providers'
import { google } from '@ai-sdk/google'
import { getChunksByFileId } from '@/lib/db/queries'

type ChunkSimilarity = {
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
    system: "Answer this question with a short paragraph"
  })

  console.log("Temp response: " + tempResponse.text)

  const tempEmbedding = await embed({
    model: google.textEmbeddingModel("text-embedding-004"),
    value: tempResponse.text
  })

  let similarityList: ChunkSimilarity[] = []
  for (const fileid of filesid) {
    const chunks = await getChunksByFileId(fileid)
    for (const chunk of chunks) {
      const result = await embed({
        model: google.textEmbeddingModel("text-embedding-004"),
        value: chunk.content
      })
      similarityList.push({
        text: chunk.content,
        similarity: cosineSimilarity(result.embedding, tempEmbedding.embedding)
      })
    }
  }

  similarityList.sort((a, b) => b.similarity - a.similarity)
  similarityList = similarityList.slice(0, 10)

  let prompt: string = "Here are the most relevant paragraphs from the documents you uploaded:\n"

  similarityList.forEach((chunk, index) => {
    prompt += `${index + 1}. ${chunk.text}\n\n`
  })

  let message = messages.pop()
  prompt += `With this paragraphs, answer the following question: ${message!.content}\n`

  console.log("Final prompt: " + prompt)

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
    getErrorMessage: (e: unknown) => {
      return "Something went wrong"
    }
  })
}