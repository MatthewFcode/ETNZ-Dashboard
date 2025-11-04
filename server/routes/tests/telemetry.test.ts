import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { server, wss } from '../../server.ts'
import connection from '../../db/connection.ts'
import { startTelemetryGeneration } from '../../telemetry/telemetry.js'

const db = connection
const BASE_URL = '/api/v1/telemetry'

// helper function to help us wait for a certain period of time between making requests
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

beforeAll(async () => {
  startTelemetryGeneration(wss)
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('tests that the database is returning random telemetry data', () => {
  it('the GET route reutrns all telemetry data live for that update on the database', async () => {
    const response = await request(server).get(`${BASE_URL}`)
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body[0]).toEqual({
      sensorId: expect.any(String),
      timeStamp: expect.any(Number),
      speed: expect.any(Number),
      temperature: expect.any(Number),
      battery: expect.any(Number),
      altitude: expect.any(Number),
    })
  })
})

describe('tests the frequency of the telemetry stream', () => {
  it('tests that the data being retrieved from the data base is changing over time', async () => {
    const firstResponse = await request(server).get(`${BASE_URL}`)
    expect(firstResponse.status).toBe(StatusCodes.OK)
    expect(Array.isArray(firstResponse.body)).toBe(true)
    const firstTelemetry = firstResponse.body[0]

    await wait(600)

    const secondResponse = await request(server).get(`${BASE_URL}`)
    expect(secondResponse.status).toBe(StatusCodes.OK)
    expect(Array.isArray(secondResponse.body)).toBe(true)
    const secondTelemetry = secondResponse.body[0]

    // assert the id of the first and second response to be the same
    expect(firstTelemetry.sensorId).toBe(secondTelemetry.sensorId)

    // compare the numerical values to ensure they are changing
    const changed =
      firstTelemetry.speed !== secondTelemetry.speed ||
      firstTelemetry.temperature !== secondTelemetry.temperature ||
      firstTelemetry.battery !== secondTelemetry.battery ||
      firstTelemetry.altitude !== secondTelemetry.altitude

    expect(changed).toBe(true)
  })
})
