import request from 'superagent'
import { PostChat, GetChat } from '../../models/chat.ts'

const rootURL = '/api/v1'

export async function getAllChats(
  token: string,
): Promise<GetChat[] | undefined> {
  try {
    const result = await request
      .get(`${rootURL}/chat`)
      .set('Authorization', `Bearer ${token}`)
    return result.body
  } catch (err) {
    console.log('GET request error in the client side API functions ')
  }
}

export async function postChat(
  chat: PostChat,
  token: string,
): Promise<PostChat | undefined> {
  try {
    const result = await request
      .post(`${rootURL}/chat`)
      .set('Authorization', `Bearer ${token}`)
      .send(chat)
    return result.body
  } catch (err) {
    console.log('POST request error in the client side API functions', err)
  }
}

export async function deleteChat(
  id: number,
  token: string,
): Promise<number | undefined> {
  try {
    const result = await request
      .delete(`${rootURL}/chat/${id}`)
      .set('Atuhorization', `Bearer ${token}`)
    return result.body
  } catch (err) {
    console.log('DELETE request error in the client side API functions ')
  }
}
