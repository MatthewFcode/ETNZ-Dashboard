import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { server } from '../../server.ts'
import connection from '../../db/connection.ts'

const db = connection
const BASE_URL = '/api/v1/telemetry'

beforeAll(async () => {
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
