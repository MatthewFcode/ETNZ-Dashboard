import { createContext, useContext, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllTelemetryData } from '../apis/telemetry.ts'
import { TelemetryDataCamel } from '../../models/telemetry.ts'

interface TelemetryContextType {
  data: TelemetryDataCamel[]
  isPending: boolean
  isError: boolean
}
const TelemetryContext = createContext<TelemetryContextType | null>(null) // just creating the global container that the react components can get in on

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['telemetry', 'all-sensors'],
    queryFn: getAllTelemetryData,
  })

  return (
    <TelemetryContext.Provider value={{ data: data ?? [], isPending, isError }}>
      {/* any components can access this as long as it is wrapped in it */}
      {children}
    </TelemetryContext.Provider>
  )
}

export function useTelemetry() {
  // just the custom hook for unwrapping the data const {data, isError} = useTelemetry()
  const context = useContext(TelemetryContext)
  if (!context) {
    throw new Error('useTelemetry must be used within TelemetryProvider')
  }
  return context
}
