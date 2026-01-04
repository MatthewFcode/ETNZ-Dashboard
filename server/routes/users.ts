import { Router } from 'express'
import { User } from '../../models/users.ts'
import * as db from '../db/users.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = Router()

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string
    const user = await db.getUserByAuth0Id(auth0Id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json('Internal Server Error')
    console.log(err)
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub
    const user: User = {
      auth0Id: auth0Id,
      name: req.body.name,
      role: req.body.role,
    }

    res.status(201).json(user)
  } catch (err) {
    console.log(err)
    res.status(400).json('Bad Post request')
  }
})

router.patch('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string

    const user: User = {
      name: req.body.name,
      role: req.body.role,
    }

    const result = await db.updateUser(auth0Id, user)

    res.json(result).status(200)
  } catch (err) {
    console.log(err)
    res.status(400).json('Bad PATCH request')
  }
})

router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  try {
    const id = Number(req.params.id)

    await db.deleteUser(id)
  } catch (err) {
    console.log(err)
    res.status(400).json('Bad DELETE request')
  }
})

export default router
