import { useTelemetry } from './Context.tsx'

function Dashboard() {
  const { data, isPending, isError } = useTelemetry()
  if (isPending) {
    return <div>...Loading</div>
  }
  if (isError) {
    return <div>Error</div>
  }
  return (
    <div>
      <h1>Telemetry Dashboard</h1>
      {data.map((sensor, i: number) => (
        <div key={i}>
          <h3>{sensor.speed}</h3>
          <p>Speed: {sensor.speed}</p>
          <p>Temp: {sensor.temperature}</p>
          <p>Battery: {sensor.battery}</p>
        </div>
      ))}
    </div>
  )
}

export default Dashboard
