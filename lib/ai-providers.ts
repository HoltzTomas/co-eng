import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'

export const providers = {
  openai: openai('gpt-4o-mini'),
  gemini: google('gemini-1.5-flash'),
}

export type ProviderName = keyof typeof providers