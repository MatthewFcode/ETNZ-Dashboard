import * as db from '../db/chat.ts'
import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { PostChat, GetChat } from '../../models/chat.ts'
import { updateUserActivity } from '../db/users.ts'
import { wss } from '../server.ts'
import ws from 'ws'

const router = Router()

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub

    const result: GetChat[] | undefined = await db.getAllChats()

    await updateUserActivity(auth0Id as string)

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json('Internal Server Error')
    console.log('Error in the GET chat express route', err)
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const message: PostChat = {
      auth0Id: auth0Id!,
      message: req.body.message,
    }

    const result = await db.postChat(message)

    await updateUserActivity(auth0Id as string)

    wss.clients.forEach((client) => {
      // loops through the clients and send the database change
      if (client.readyState === ws.OPEN) {
        client.send(
          JSON.stringify({
            type: 'database_change',
            message: 'General Mutation',
          }),
        )
      }
    })

    res.status(201).json(result)
  } catch (err) {
    res.status(400).json('Bad POST request')
    console.log('Error in the POST chat express route', err)
  }
})

router.patch('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const id = Number(req.params.id)

    await updateUserActivity(auth0Id as string)
    // gonna call the function

    const newChat = {
      message: req.body.message,
      auth0Id: auth0Id as string,
    }

    const result = await db.updateChat(id, auth0Id as string, newChat)

    wss.clients.forEach((client) => {
      // loops through the clients and send the database change
      if (client.readyState === ws.OPEN) {
        client.send(
          JSON.stringify({
            type: 'database_change',
            message: 'General Mutation',
          }),
        )
      }
    })

    res.status(200).json(result)
  } catch (err) {
    res.status(400).json('Bad PATCH request')
    console.log('Error in the PATCH express route', err)
  }
})

router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const id = Number(req.params.id)
    const auth0Id = req.auth?.sub
    await db.deleteChat(id, auth0Id as string)

    await updateUserActivity(auth0Id as string)

    wss.clients.forEach((client) => {
      // loops through the clients and send the database change
      if (client.readyState === ws.OPEN) {
        client.send(
          JSON.stringify({
            type: 'database_change',
            message: 'General Mutation',
          }),
        )
      }
    })

    res.sendStatus(204)
  } catch (err) {
    res.status(400).json('Bad DELETE request')
    console.log('Error in the DELETE chat express route')
  }
})

export default router
