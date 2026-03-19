import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import connection from '../db/connection.ts'
import { broadcast } from '../wss.ts'
import 'dotenv/config'

const db = connection // db connection for connecting the knex ORM and being able to perform SQL queries as JavaScript on our database

const model = new ChatGoogleGenerativeAI({
  // LLM model client
  model: 'models/gemini-flash-latest',
  temperature: 0.7,
  apiKey: process.env.GOOGLE_API_KEY,
})

// I want to first get all the seed userss I guess so we are gong to get all the users
interface User {
  // user interface for our seeds
  id: number
  auth0Id: string
  name: string
  role: string
  profile_photo: string
  activity_status: string
}

const getAllUsers = async (): Promise<User[] | undefined> => {
  // getting all of our seed users
  try {
    const result = await db('users').where({ is_seed_user: true }).select()
    return result
  } catch (err) {
    console.log('error trying to grab all seed users', err)
  }
}

//const allUsers = getAllUsers()

// I am going to just get all previous chats as part of this operation because I cannot be bothered trying to do it differently
interface Chat {
  id?: number
  message: string
  time_sent?: string
  auth0Id: string
}
const getAllChats = async (): Promise<Chat[] | undefined> => {
  // getting all the chats
  try {
    const result = await db('chat').select()
    return result
  } catch (err) {
    console.log(
      'error trying to fetch all the chats in the langchain function',
      err,
    )
  }
}

//const allChats = getAllChats()

// we need to update user activity when we send a chat aswell
const generateChats = async (): Promise<Chat | undefined> => {
  try {
    const allUsers = await getAllUsers() // saving all users to a variable

    const allChats = await getAllChats() // saving all chats to a variable

    const conversation = allChats!
      .map((chat) => `${chat.auth0Id}: ${chat.message}`)
      .join('\n') // making all the chats a string

    const lastChat: Chat = allChats![allChats!.length - 1] // getting the last chat

    const eligibleUsers = allUsers!.filter(
      (u: User) => u.auth0Id !== lastChat.auth0Id,
    ) // filtering through the objects in the users var to remove the one that sent the last chat

    const respondingUser =
      eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)] // picking a random users to respond by Math.randoming an index

    const prompt = `You are continuing a conversation amongst multiple users, this is the entire conversation so far ${conversation}. Come up with a response as if you were ${respondingUser.name}. The message should be relevant and respond to the last message. Only provide the message text and nothing else | make the message 20-30 words maxß.`

    const response = await model.invoke(prompt)
    const messageContent =
      typeof response.content === 'string'
        ? response.content.trim()
        : response.content
            .map((block) => ('text' in block ? block.text : ''))
            .join('')
            .trim() // langchaing response glotch blocker

    const newChat: Chat = {
      auth0Id: respondingUser.auth0Id,
      message: messageContent,
    }

    await db('users')
      .where('users.auth0Id', respondingUser.auth0Id)
      .update({ activity_status: new Date().toISOString() })

    broadcast('database_change', 'General Mutation')

    return newChat
  } catch (err) {
    console.error('Error generating next chat:', err)
    return undefined
  }
}

export function chatGenerator() {
  console.log('AI chat generator service started')
  setInterval(async () => {
    try {
      const newChat = await generateChats() // saves the object to a variable

      if (newChat) {
        await db('chat').insert(newChat) // inserts the new chat into the chat table

        broadcast('database_change', 'General Mutation')
        console.log(
          `New chat generated and broadcasted: ${JSON.stringify(newChat)}`,
        )
      }
    } catch (err) {
      console.error('Error in chatGenerator interval:', err)
    }
  }, 20000)
}
