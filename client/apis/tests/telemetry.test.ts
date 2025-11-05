import nock from 'nock'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { getAllTelemetryData } from '../telemetry.ts'
import { TelemetryDataCamel } from '../../../models/telemetry.ts'

// helper function to help us wait for a certain period of time between making requests
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

beforeAll(() => {
  nock.cleanAll()
})

beforeEach(() => {
  nock.cleanAll()
})

afterAll(() => {
  expect(nock.isDone()).toBe(true)
})
// make a get request with no parameteers and create a fake response with the first object of the telemetry data
describe('make a GET request to our api server endpoint and respond with the first object', () => {
  it('Responds with the telemetry data', async () => {
    const server = 'http://localhost:3000'
    const BASE_URL = '/api/v1'

    const fakeResponse: TelemetryDataCamel[] = [
      {
        sensorId: 'sensor-1',
        timeStamp: new Date().toISOString(),
        speed: parseFloat((Math.random() * 35).toFixed(2)),
        temperature: parseFloat((15 + Math.random() * 10).toFixed(2)),
        battery: parseFloat((50 + Math.random() * 50).toFixed(1)),
        altitude: parseFloat((100 + Math.random() * 50).toFixed(2)),
      },
    ]

    nock(server).get(`${BASE_URL}/telemetry`).reply(200, fakeResponse)
    const result = await getAllTelemetryData()

    expect(result).toEqual(fakeResponse)
  })
})

describe('Test frequencies of telemetry data coming through the front end API endpoints', () => {
  it('wait between API calls to test the difference in data', async () => {
    const server = 'http://localhost:3000'
    const BASE_URL = '/api/v1'
    const firstFakeResponse: TelemetryDataCamel[] = [
      {
        sensorId: 'sensor-1',
        timeStamp: new Date().toISOString(),
        speed: parseFloat((Math.random() * 35).toFixed(2)),
        temperature: parseFloat((15 + Math.random() * 10).toFixed(2)),
        battery: parseFloat((50 + Math.random() * 50).toFixed(1)),
        altitude: parseFloat((100 + Math.random() * 50).toFixed(2)),
      },
    ]

    nock(server).get(`${BASE_URL}/telemetry`).reply(200, firstFakeResponse)
    const firstResult = await getAllTelemetryData()
    expect(firstResult).toEqual(firstFakeResponse)

    wait(600)

    const secondFakeResponse: TelemetryDataCamel[] = [
      {
        sensorId: 'sensor-1',
        timeStamp: new Date().toISOString(),
        speed: parseFloat((Math.random() * 35).toFixed(2)),
        temperature: parseFloat((15 + Math.random() * 10).toFixed(2)),
        battery: parseFloat((50 + Math.random() * 50).toFixed(1)),
        altitude: parseFloat((100 + Math.random() * 50).toFixed(2)),
      },
    ]

    nock(server).get(`${BASE_URL}/telemetry`).reply(200, secondFakeResponse)
    const secondResult = await getAllTelemetryData()
    expect(secondResult).toEqual(secondFakeResponse)

    if (!firstResult || !secondResult) {
      throw new Error('telemetry results are undefined')
    }

    // assert that the sensor id is the same
    expect(firstResult[0].sensorId)

    // assert that atleast on of the values on the response object is different
    const changed =
      firstResult[0].speed !== secondResult[0].speed ||
      firstResult[0].temperature !== secondResult[0].temperature ||
      firstResult[0].battery !== secondResult[0].battery ||
      firstResult[0].altitude !== secondResult[0].altitude

    expect(changed).toBe(true)
  })
})
