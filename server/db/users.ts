import connection from './connection'
import { User } from '../../models/users.ts'

const db = connection

export async function getUserByAuth0Id(
  auth0Id: string,
): Promise<User | undefined> {
  try {
    const user = await db('users')
      .where('users.auth0Id', auth0Id)
      .select()
      .first()
    return user
  } catch (err) {
    console.log(err)
  }
}
