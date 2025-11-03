import { createContext, useContext } from 'react'
import { useTelemetryData } from '../hooks/useTelemetry.ts'

const TelemetryContext = createContext(null)

export function TelemetryProvider({ children }) {
  const sensors = [
    'sensor-1',
    'sensor-2',
    'sensor-3',
    'sensor-4',
    'sensor-5',
    'sensor-6',
    'sensor-7',
    'sensor-8',
    'sensor-9',
    'sensor-10',
  ]

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const sensorQueries = sensors.map((id) => useTelemetryData(id))
  const data = sensorQueries.map((q) => q.data).filter(Boolean)
  const isLoading = sensorQueries.some((q) => q.isPending)
  const isError = sensorQueries.some((q) => q.isError)

  return (
    <TelemetryContext.Provider value={{ data, isLoading, isError }}>
      {children}
    </TelemetryContext.Provider>
  )
}

export function useTelemetry() {
  return useContext(TelemetryContext)
}
