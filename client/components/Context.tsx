import { createContext, useContext, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllTelemetryData } from '../apis/telemetry.ts'
import { TelemetryDataCamel } from '../../models/telemetry.ts'

interface TelemetryContextType {
  data: TelemetryDataCamel[]
  isPending: boolean
  isError: boolean
}
const TelemetryContext = createContext<TelemetryContextType | null>(null)

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ['telemetry', 'all-sensors'],
    queryFn: getAllTelemetryData,
  })

  return (
    <TelemetryContext.Provider value={{ data, isPending, isError }}>
      {children}
    </TelemetryContext.Provider>
  )
}

export function useTelemetry() {
  const context = useContext(TelemetryContext)
  if (!context) {
    throw new Error('useTelemetry must be used within TelemetryProvider')
  }
  return context
}
