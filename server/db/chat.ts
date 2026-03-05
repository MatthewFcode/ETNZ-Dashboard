import connection from './connection.ts'
import { GetChat, PostChat } from '../../models/chat.ts'
const db = connection

// we need a get function for all chats but joins the user table and the a select with all the things we need
export async function getAllChats(): Promise<GetChat[] | undefined> {
  try {
    const result = await db('chat')
      .join('users', 'chat.auth0Id', 'users.auth0Id')
      .select(
        'chat.id',
        'message',
        'time_sent',
        'users.name',
        'users.profile_photo',
      )
      .orderBy('chat.time_sent', 'desc')

    return result
  } catch (err) {
    console.log(
      'There was and error in the getting all chats from the Knex ORM functions',
      err,
    )
  }
}

//Update knex function for updating a chat by its chat ID and but the user init
// export async function updateChat(chat: PostChat)
// we need a post function for posting a chat which will just be a chat object with the message and the auth0Id
export async function postChat(chat: PostChat): Promise<PostChat | undefined> {
  try {
    const result = await db('chat').insert(chat).returning('*').first()
    return result
  } catch (err) {
    console.log(
      'There was an error inserting a chat from the Knex ORM functions',
      err,
    )
  }
}
// a function for deleting the message by the ID  || fuck knows where the id comes from on the client ngl I compleley forgot
export async function deleteChat(id: number): Promise<number | undefined> {
  try {
    const result = await db('chat').where('chat.id', id).delete()
    return result
  } catch (err) {
    console.log(
      'There was an error deleting a chat from the Knex ORM functions',
    )
  }
}
