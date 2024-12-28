import { AISDKError, APICallError, streamText } from 'ai'
import { providers, ProviderName } from '@/lib/ai-providers'
import { ApiError } from 'next/dist/server/api-utils'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, provider } = await req.json()
  const selectedProvider = providers[provider as ProviderName]

  if (!selectedProvider) {
    return new Response('Invalid provider', { status: 400 })
  }
  

  const result = streamText({
      model: selectedProvider,
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