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

export async function addUser(user: User): Promise<User | undefined> {
  try {
    const result = await db('users').insert(user).returning('*').first()

    return result
  } catch (err) {
    console.log(err)
  }
}

export async function updateUser(
  auth0Id: string,
  newUser: User,
): Promise<User | undefined> {
  try {
    await db('users').where('users.auth0Id', auth0Id).update(newUser)

    const result = await db('users')
      .where('users.auth0Id', auth0Id)
      .select()
      .first()

    return result
  } catch (err) {
    console.log(err)
  }
}

export async function deleteUser(auth0Id: string): Promise<number | undefined> {
  try {
    const result = await db('users').where('users.auth0Id', auth0Id).delete()
    return result
  } catch (err) {
    console.log(err)
  }
}
