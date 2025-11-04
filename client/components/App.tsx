import Dashboard from './Dashboard.tsx'
import { TelemetryProvider } from './Context.tsx'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
function App() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000')
    ws.onopen = () => {
      console.log('WebSocket connected')
    }

    ws.onmessage = (event) => {
      console.log('Message received:', event.data)
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'database_change') {
          queryClient.invalidateQueries({
            queryKey: ['telemetry', 'all-sensors'],
          })
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err)
      }
    }

    ws.onclose = () => {
      console.log('WebSocket closed')
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    // Cleanup on unmount
    return () => {
      ws.close()
    }
  }, [queryClient])
  return (
    <>
      <div className="app">
        <TelemetryProvider>
          <Dashboard />
        </TelemetryProvider>
      </div>
    </>
  )
}

export default App
