import { Router } from 'express'
import { UserBackend } from '../../models/users.ts'
import * as db from '../db/users.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'
import multer from 'multer'
import cloudinary from '../cloudinary.js'
import { unlink } from 'node:fs/promises'
//import dotenv from 'dotenv'

const router = Router()
const upload = multer({ dest: 'tmp' })

//dotenv.config()

console.log('Cloudinary:', process.env.CLOUDINARY_CLOUD_NAME)

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string
    const user = await db.getUserByAuth0Id(auth0Id)

    await db.updateUserActivity(auth0Id)

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json('Internal Server Error')
    console.log(err)
  }
})

//GET route for getting all user information and their activity
router.get('/activity', checkJwt, async (req: JwtRequest, res) => {
  try {
    const result = await db.getAllUserActivity()
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json('Internal Server Error trying to fetch all user activity')
  }
})

router.post(
  '/',
  (req, res, next) => {
    console.log('POST /api/v1/users hit')
    next()
  },
  checkJwt,
  upload.single('profile_photo'),
  async (req: JwtRequest, res) => {
    try {
      const auth0Id = req.auth?.sub
      console.log('AUTH:', auth0Id)
      console.log('BODY:', req.body)
      console.log('FILE:', req.file)

      let profile_photo = ''

      if (req.file) {
        try {
          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'ETNZ',
            transformation: [{ width: 300, height: 300, crop: 'fill' }],
          })
          profile_photo = result.secure_url

          // Clean up temp file
          await unlink(req.file.path)
        } catch (uploadErr) {
          console.error('Cloudinary upload error:', uploadErr)
          // Clean up temp file even if upload fails
          try {
            await unlink(req.file.path)
          } catch (unlinkErr) {
            console.error('Failed to delete temp file:', unlinkErr)
          }
          throw new Error('Failed to upload image')
        }
      }

      if (req.file) {
        profile_photo = '/images/placeholder.jpg' // Placeholder
        await unlink(req.file.path)
      }

      console.log(profile_photo)

      const user: UserBackend = {
        auth0Id: auth0Id,
        name: req.body.name,
        role: req.body.role,
        profile_photo: profile_photo,
      }

      const result = await db.addUser(user)

      res.status(201).json(result)
      console.log('POST req in express route succcessful')
    } catch (err) {
      console.error(err)
      res.status(400).json({
        message: 'Bad Post request',
        error: err instanceof Error ? err.message : String(err),
      })
    }
  },
)

router.patch('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string

    await db.updateUserActivity(auth0Id)

    const user: UserBackend = {
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

router.delete('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const auth0Id = req.auth?.sub as string

    await db.deleteUser(auth0Id)
    res.sendStatus(204)
  } catch (err) {
    console.log(err)
    res.status(400).json('Bad DELETE request')
  }
})

export default router
