import request from 'superagent'
import { TelemetryDataCamel } from '../../models/telemetry.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getAllTelemetryData(): Promise<
  TelemetryDataCamel[] | undefined
> {
  try {
    const result = await request.get('/api/v1/telemetry')
    return result.body
  } catch (err) {
    console.log(err)
  }
}

export async function getTelemetryDataBySensor(
  sensorId: string,
): Promise<TelemetryDataCamel | undefined> {
  try {
    const response = await request.get(`${rootURL}/telemetry/${sensorId}`)
    return response.body as TelemetryDataCamel
  } catch (err) {
    console.log(err)
  }
}
