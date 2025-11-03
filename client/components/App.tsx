import Dashboard from './Dashboard.tsx'
import { TelemetryProvider } from './Context.tsx'

function App() {
  return (
    <>
      <div className="app">
        <TelemetryProvider>
          Testing
          <Dashboard />
        </TelemetryProvider>
      </div>
    </>
  )
}

export default App
