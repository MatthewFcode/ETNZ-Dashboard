import request from 'superagent'
import { TelemetryDataCamel } from '../../models/telemetry.ts'

const rootURL =
  typeof document !== 'undefined'
    ? new URL(`/api/v1`, document.baseURI)
    : 'http://localhost:3000/api/v1'

// this is the API function used in production | the useQuery is run directly in the context container
export async function getAllTelemetryData(
  token: string,
): Promise<TelemetryDataCamel[] | undefined> {
  try {
    const result = await request
      .get(`${rootURL}/telemetry`)
      .set('Authorization', `Bearer ${token}`)
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
