import { describe, it, expect, beforeAll, beforeEach, afterAll, vi } from 'vitest'
import request from 'supertest'
import { server } from '../../server.ts'
import connection from '../../db/connection.ts'
import jwt from 'jsonwebtoken'

const db = connection
const BASE_URL = '/api/v1/users'

vi.mock('../../cloudinary.js', () => ({
  default: {
    uploader: {
      upload: vi.fn().mockResolvedValue({ secure_url: 'http://test-url.com' }),
    },
  },
}))

const testToken = jwt.sign({ sub: 'auth0|123' }, 'test-secret', { algorithm: 'HS256' })

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('POST /api/v1/users', () => {
  it('successfully creates a new user', async () => {
    const response = await request(server)
      .post(BASE_URL)
      .set('Authorization', `Bearer ${testToken}`)
      .field('name', 'Test User')
      .field('role', 'Developer')
    
    expect(response.status).toBe(201)
    expect(response.body[0]).toMatchObject({
      auth0Id: 'auth0|123',
      name: 'Test User',
      role: 'Developer'
    })
  })

  it('fails when auth is missing', async () => {
    const response = await request(server)
      .post(BASE_URL)
      .field('name', 'Test User')
      .field('role', 'Developer')
    
    expect(response.status).toBe(401)
  })

  it('fails when user already exists', async () => {
    // First call
    await request(server)
      .post(BASE_URL)
      .set('Authorization', `Bearer ${testToken}`)
      .field('name', 'Test User')
      .field('role', 'Developer')
    
    // Second call with same auth0Id
    const response = await request(server)
      .post(BASE_URL)
      .set('Authorization', `Bearer ${testToken}`)
      .field('name', 'Test User 2')
      .field('role', 'Developer 2')
    
    expect(response.status).toBe(400)
    expect(response.body).toBe('Bad Post request')
  })
})
