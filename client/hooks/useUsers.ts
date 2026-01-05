import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from '../../models/users.ts'
import { getUserById, postUser, updateUser, deleteUser } from '../apis/users.ts'

export function useGetUserByAuth0Id() {
  const { user, getAccessTokenSilently } = useAuth0()
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getUserById(token)
    },
    enabled: !!user,
  })
  return query
}

export function useUserMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  return mutation
}

//POST mutation wrapper function
export function usePostUser() {
  const { getAccessTokenSilently } = useAuth0()

  return useUserMutation(async (newUser: User) => {
    const token = await getAccessTokenSilently()
    return postUser(newUser, token)
  })
}

//PATCH mutation wrapper function
export function useUpdateUser() {
  const { getAccessTokenSilently } = useAuth0()
  return useUserMutation(async (updatedUser: User) => {
    const token = await getAccessTokenSilently()
    return updateUser(updatedUser, token)
  })
}

//DELETE mutation wrapper function
export function useDeleteUset() {
  const { getAccessTokenSilently } = useAuth0()
  return useUserMutation(async () => {
    const token = await getAccessTokenSilently()
    return deleteUser(token)
  })
}
