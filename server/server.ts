import express from 'express'
import * as Path from 'node:path'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'

import telemetryRoutes from './routes/telemetry.ts'

const app = express()

const server = createServer(app)
const wss = new WebSocketServer({ server })

app.use(express.json())

app.use('/api/v1/telemetry', telemetryRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(Path.resolve('public')))
  app.use('/assets', express.static(Path.resolve('./dist/assets')))
  app.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

wss.on('connection', (ws) => {
  console.log('Client Connected')

  ws.on('message', (message) => {
    console.log(`Receivedmessage: ${message}`)
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

export { server, wss }
