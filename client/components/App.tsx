import Dashboard from './Dashboard.tsx'
import { TelemetryProvider } from './Context.tsx'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import RequireAuth from './RequireAuth.tsx'

function App() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const ws = new WebSocket('wss://etnz-dashboard.borb.nz/')
    let shouldInvalidate = false
    ws.onopen = () => {
      console.log('WebSocket connected')
    }

    ws.onmessage = (event) => {
      console.log('Message received:', event.data)
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'database_change') {
          queryClient.invalidateQueries({ queryKey: [''] })
        }

        if (
          data.type === 'database_change' &&
          data.message === 'New telemetry data'
        ) {
          // once there is the change in the database detected mark a the variable as true for the set timeout
          shouldInvalidate = true
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err)
      }
    }

    const interval = setInterval(() => {
      if (shouldInvalidate) {
        queryClient.invalidateQueries({
          queryKey: ['telemetry', 'all-sensors'],
        })
        shouldInvalidate = false
      }
    }, 700)

    ws.onclose = () => {
      console.log('WebSocket closed')
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    // Cleanup on unmount
    return () => {
      ws.close()
      clearInterval(interval)
    }
  }, [queryClient])
  return (
    <>
      <div className="app">
        <RequireAuth>
          <TelemetryProvider>
            {' '}
            {/* everything inside of AI can access our global container with the
            telemetric data in it */}
            <Dashboard />
          </TelemetryProvider>
        </RequireAuth>
      </div>
    </>
  )
}

export default App
