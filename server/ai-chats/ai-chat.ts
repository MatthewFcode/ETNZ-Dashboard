import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-flash',
  temperature: 0.7,
})

// I want to first get all the seed userss I guess
