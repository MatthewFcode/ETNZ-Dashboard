import { useTelemetry } from './Context.tsx'
import { IfAuthenticated } from './Auth0.tsx'
import { useAuth0 } from '@auth0/auth0-react'
import LoadingSpinner from './LoadingSpinner.tsx'
import UserActivity from './UserActivity.tsx'
import LoggedUser from './LoggedUser.tsx'
import Chat from './Chat.tsx'
import { useGetUserByAuth0Id } from '../hooks/useUsers.ts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

function Dashboard() {
  const { data, isPending, isError } = useTelemetry()
  const { logout, isAuthenticated, isLoading: authLoading } = useAuth0()
  const { data: userData, isLoading: userLoading } = useGetUserByAuth0Id()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && isAuthenticated && !userLoading && !userData) {
      navigate('/registration')
    }
  }, [isAuthenticated, authLoading, userLoading, userData, navigate])

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  if (isPending || userLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <div className="error">Error Loading Telemetry Data</div>
  }

  return (
    <div className="app">
      {/* ── Slim top header ── */}
      <div className="dashboard-header">
        <div className="header-brand">
          <img src="/images/teamnz.png" alt="ETNZ logo" />
          <h1>
            Emirates Team <span>New Zealand</span>
          </h1>
        </div>

        {/* <div className="live-indicator">
          <span>Live Data Stream</span>
        </div> */}

        <div className="user-header">
          <LoggedUser />
          <IfAuthenticated>
            <button className="logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </IfAuthenticated>
        </div>
      </div>

      {/* ── 3-column body ── */}
      <div className="main-layout">
        {/* Left: chat */}
        <Chat />

        {/* Center: sensor grid */}
        <div className="dashboard-container">
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

        {/* Right: team activity */}
        <UserActivity />
      </div>
    </div>
  )
}

export default Dashboard
