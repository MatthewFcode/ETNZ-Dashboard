import connection from './connection.ts'
import { TelemetryDataSnake } from '../../models/telemetry.ts'

const db = connection

export async function getAllData(): Promise<TelemetryDataSnake[] | undefined> {
  try {
    const result = await db('telemetry').select()
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
  }
}

export async function getTelemetryDataBySensor(
  sensorId: string,
): Promise<TelemetryDataSnake[] | undefined> {
  try {
    const result = await db('telemetry')
      .select()
      .where('telemetry.sensor_id', sensorId)
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
  }
}
