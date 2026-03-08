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
    const result: GetChat[] | undefined = await db.getAllChats()

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
            message: 'Chat Mutation',
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

router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const id = Number(req.params.id)
    await db.deleteChat(id)

    wss.clients.forEach((client) => {
      // loops through the clients and send the database change
      if (client.readyState === ws.OPEN) {
        client.send(
          JSON.stringify({
            type: 'database_change',
            message: 'Chat Mutation',
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
