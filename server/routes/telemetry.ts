import { Router } from 'express'

import * as db from '../db/telemetry.ts'

const router = Router()

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const result = await db.getTelemetryDataBySensor(id)
    console.log(result)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json('Could not get telemetry data')
    console.log(err)
  }
})

export default router
