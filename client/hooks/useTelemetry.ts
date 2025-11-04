import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import {
  getTelemetryDataBySensor,
  // getAllTelemetryData,
} from '../apis/telemetry.ts'

export function useTelemetryData(sensorId: string) {
  const query = useQuery({
    queryKey: ['telemetry', sensorId],
    queryFn: () => getTelemetryDataBySensor(sensorId),
  })
  return query
}

// export function useAllTelemetryData() {
//   const query = useQuery({
//     queryKey: ['all-data'],
//     queryFn: getAllTelemetryData,
//   })
//   return query
// }

export function useFruitsMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fruits'] })
    },
  })

  return mutation
}
