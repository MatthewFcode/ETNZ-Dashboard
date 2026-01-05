import request from 'superagent'
import { User } from '../../models/users.ts'

// const rootURL =
//   typeof document !== 'undefined'
//     ? new URL(`/api/v1`, document.baseURI)
//     : 'http://localhost:3000/api/v1'
const rootURL = '/api/v1'

console.log('POST URL:', `${rootURL}/users`)

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

export async function postUser(
  newUser: User,
  token: string,
): Promise<User | undefined> {
  try {
    const result = await request
      .post(`${rootURL}/users`)
      .set('Authorization', `Bearer ${token}`)
      .send(newUser)
    return result.body
  } catch (err) {
    console.log(
      'there was an error posting the new user to the server from the client side API functions',
      err,
    )
  }
}

export async function updateUser(
  updatedUser: User,
  token: string,
): Promise<User | undefined> {
  try {
    const result = await request
      .patch(`${rootURL}/users`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser)
    return result.body
  } catch (err) {
    console.log(
      'There was an error making the PATCH request to the server from the client API functions',
    )
  }
}

export async function deleteUser(token: string): Promise<number | undefined> {
  try {
    const result = await request
      .delete(`${rootURL}/users`)
      .set('Authorization', `Bearer ${token}`)
    return result.status
  } catch (err) {
    console.log(
      'Error making DELETE request to the server from the client functions',
      err,
    )
  }
}
