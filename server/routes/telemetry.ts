import { Router } from 'express'
import * as db from '../db/telemetry.ts'
import { TelemetryDataSnake } from '../../models/telemetry.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const snake = await db.getAllData()

    const result = snake?.map(
      ({
        sensor_id,
        time_stamp,
        speed,
        temperature,
        battery,
        altitude,
      }: TelemetryDataSnake) => ({
        sensorId: sensor_id,
        timeStamp: time_stamp,
        speed: speed,
        temperature: temperature,
        battery: battery,
        altitude: altitude,
      }),
    )

    //console.log(result)
    res.status(200).json(result)
  } catch (err) {
    res.status(200).json('Could not get all telemetry data')
    console.log(err)
  }
})

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
