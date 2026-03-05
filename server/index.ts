import { server, wss } from './server.ts'
import { startTelemetryGeneration } from './telemetry/telemetry.js'
import { chatGenerator } from './ai-chats/ai-chat.ts'
import dns from 'node:dns'

dns.setDefaultResultOrder('ipv4first')

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port', PORT)
  startTelemetryGeneration(wss)
  chatGenerator()
})
