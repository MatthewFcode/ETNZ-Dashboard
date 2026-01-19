import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import connection from '../db/connection.ts'

const db = connection

const model = new ChatGoogleGenerativeAI({
  model: 'gemini-1.5-flash',
  temperature: 0.7,
})

// I want to first get all the seed userss I guess so we are gong to get all the users
interface User {
  id: number
  auth0Id: string
  name: string
  role: string
  profile_photo: string
  activity_status: string
}
const getAllUsers = async (): Promise<User[] | undefined> => {
  try {
    const result = await db('users').where({ is_seed_user: true }).select()
    return result
  } catch (err) {
    console.log('error trying to grab all seed users', err)
  }
}

const allUsers = getAllUsers()

// I am going to just get all previous chats as part of this operation because I cannot be bothered trying to do it differently
interface Chat {
  id: number
  message: string
  time_sent: string
  auth0Id: string
}
const getAllChats = async (): Promise<Chat[] | undefined> => {
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

const allChats = getAllChats()

// we need to update user activity when we send a chat aswell
 const generateChats = async (): Promise<Chat | undefined> => {
  try {
    const allUsers = getAllUsers()

    const allChats = getAllChats()

    const lastChat: Chat = allChats[allChats.length - 1]

    const eligibleUsers = allUsers.filter((u: User) => u.auth0Id !== lastChat.auth0Id)

    const prompt = `You are continuing a conversation amongst m`
  }
 }