import ws, { WebSocketServer } from 'ws'

export const wss = new WebSocketServer({ noServer: true })

export function broadcast(type: string, message: string) {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify({ type, message }))
    }
  })
}
