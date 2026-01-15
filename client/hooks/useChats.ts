import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllChats, postChat, deleteChat } from '../apis/chats.ts'
import { PostChat } from '../../models/chat.ts'

//custom hook useQuery for getting all the chats gonna get the acccess token silently and send that bpmbilart motherfucking thing nigger
export function useGetAllChats() {
  const { getAccessTokenSilently, user } = useAuth0()
  const query = useQuery({
    queryKey: ['all-chats'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return getAllChats(token)
    },
    enabled: !!user,
  })
  return query
}
// factory mutation function

export function useChatMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-chats'] })
    },
  })
  return mutation
}

// post wrapper function
export function usePostChat() {
  const { getAccessTokenSilently } = useAuth0()
  async function postChatInit(chat: PostChat) {
    const token = await getAccessTokenSilently()
    return postChat(chat, token)
  }

  return useChatMutation(postChatInit)
}

// delete wrapper function
export function useDeleteChat() {
  const { getAccessTokenSilently } = useAuth0()
  async function deleteChatInit(id: number) {
    const token = await getAccessTokenSilently()
    return deleteChat(id, token)
  }

  return useChatMutation(deleteChatInit)
}
