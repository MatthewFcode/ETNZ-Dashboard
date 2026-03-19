import 'dotenv/config' // importing dotenv vars and injects them into process.env  everywhere in the server
import express from 'express'
import * as Path from 'node:path'
import { createServer } from 'http'
import { wss } from './wss.ts'
import telemetryRoutes from './routes/telemetry.ts'
import userRoutes from './routes/users.ts'
import chatRoutes from './routes/chat.ts'

const app = express()

const server = createServer(app)

// Handle WebSocket upgrade manually
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request)
  })
})

app.use(express.json())

app.use('/api/v1/telemetry', telemetryRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/chat', chatRoutes)

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
