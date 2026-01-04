import request from 'superagent'
import { User } from '../../models/users.ts'

const rootURL =
  typeof document !== 'undefined'
    ? new URL(`/api/v1`, document.baseURI)
    : 'http://localhost:3000/api/v1'

export async function getUserById(token: string): Promise<User | undefined> {
  try {
    const result = await request
      .get(`${rootURL}/users`)
      .set('Authorization', `Bearer ${token}`)
    return result.body
  } catch (err) {
    console.log(
      'There was an error calling the user by ID from the API functions to the server',
      err,
    )
  }
}

// export async function postUser(newUser: User): Promise<User | undefined> {
//   try {
//     const result = (await request.post(`${rootURL}/users`)).send(newUser)
//   }
// }
