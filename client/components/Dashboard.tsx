import { useTelemetry } from './Context.tsx'
import { IfAuthenticated } from './Auth0.tsx'
import { useAuth0 } from '@auth0/auth0-react'
import LoadingSpinner from './LoadingSpinner.tsx'
import UserActivity from './UserActivity.tsx'
import LoggedUser from './LoggedUser.tsx'

function Dashboard() {
  const { data, isPending, isError } = useTelemetry()
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  if (isPending) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div className="error">Error Loading Telemetry Data</div>
  }

  return (
    <div>
      {/* Main content area with margin for activity panel */}
      <div className="dashboard-container">
        {/* Dashboard header with integrated user info and logout */}
        <div className="dashboard-header">
          <div className="user-header">
            <LoggedUser />
            <IfAuthenticated>
              <button className="logout-btn" onClick={handleLogout}>
                Sign Out
              </button>
            </IfAuthenticated>
          </div>

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

      {/* Activity panel fixed on the right side */}
      <UserActivity />
    </div>
  )
}

export default Dashboard
