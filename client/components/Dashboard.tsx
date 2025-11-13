import { useTelemetry } from './Context.tsx'
import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'
import { useAuth0 } from '@auth0/auth0-react'
//import { useNavigate } from 'react-router'

function Dashboard() {
  const { data, isPending, isError } = useTelemetry()
  const { logout, loginWithRedirect } = useAuth0()
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        redirectUri: `${window.location.origin}/registration`,
      },
    })
  }

  if (isPending) {
    return <div className="loading">Loading Telemetry Data...</div>
  }

  if (isError) {
    return <div className="error">Error Loading Telemetry Data</div>
  }

  return (
    <div>
      <div className="dashboard-header">
        <IfNotAuthenticated>
          <button onClick={handleLogin}>Sign In</button>
        </IfNotAuthenticated>
        <IfAuthenticated>
          <button onClick={handleLogout}>Sign Out</button>
        </IfAuthenticated>
        <img src="/images/teamnz.png" alt="ETNZ-logo" />
        <h1>Emirates Team New Zealand Telemetry Dashboard</h1>
        <div className="live-indicator">
          <span>Live Data Stream</span>
        </div>
      </div>

      <div className="sensor-grid">
        {data.map((sensor) => (
          <div key={sensor.sensorId} className="sensor-card">
            <h2>{sensor.sensorId}</h2>

            <div className="speed-display">
              <span className="speed-value">{sensor.speed}</span>
              <span className="speed-unit">Knots</span>
            </div>

            <div className="telemetry-data">
              <div className="data-item">
                <div className="data-label">Temperature</div>
                <div className="data-value">
                  {sensor.temperature}
                  <span className="unit">°C</span>
                </div>
              </div>

              <div className="data-item">
                <div className="data-label">Battery</div>
                <div className="data-value">
                  {sensor.battery}
                  <span className="unit">%</span>
                </div>
              </div>

              <div className="data-item">
                <div className="data-label">Altitude</div>
                <div className="data-value">
                  {sensor.altitude}
                  <span className="unit">m</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
