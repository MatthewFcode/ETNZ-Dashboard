import { useState } from 'react'
import { useTelemetryData } from '../hooks/useTelemetry.ts'

function Dashboard() {
  const { data, isPending, isError } = useTelemetryData()
  if (isPending) {
    return <div>...Loading</div>
  }
  if (isError) {
    return <div>Error</div>
  }
  return (
    <div>
      <h1>Telemetry Data</h1>
      {data.map()}
    </div>
  )
}

export default Dashboard
