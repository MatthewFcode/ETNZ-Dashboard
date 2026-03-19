import { Router } from 'express'
import * as db from '../db/telemetry.ts'
import { TelemetryDataSnake } from '../../models/telemetry.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'
import { updateUserActivity } from '../db/users.ts'
import { broadcast } from '../wss.ts'

const router = Router()

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const snake = await db.getAllData()
    const auth0Id = req.auth?.sub

    await updateUserActivity(auth0Id as string)

    //websocket for user activity updating | in theory every time that the websocket for the telemetric sensor refetches this route we execute the function and then we broadcast the websocket for the user activity which means when a user is logged in it catches it
    broadcast('database_change', 'General Mutation')

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
