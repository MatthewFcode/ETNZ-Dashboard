interface LoadingSpinnerProps {
  message?: string
}

export default function LoadingSpinner({
  message = 'Loading Telemetry Data...',
}: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner-container">
      <div className="spinner-wrapper">
        {/* Outer ring - AC75 foil path */}
        <div className="spinner-ring spinner-ring-outer"></div>

        {/* Middle ring - Team NZ rotation */}
        <div className="spinner-ring spinner-ring-middle"></div>

        {/* Inner ring */}
        <div className="spinner-ring spinner-ring-inner"></div>

        {/* Center dot - represents the boat */}
        <div className="spinner-center"></div>
      </div>

      <div className="spinner-text">
        <p className="loading-message">{message}</p>
        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  )
}
