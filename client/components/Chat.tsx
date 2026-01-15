import {
  useGetAllChats,
  usePostChat,
  useDeleteChat,
} from '../hooks/useChats.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { GetChat } from '../../models/chat.ts'

function Chat() {
  const { data, isPending, isError } = useGetAllChats()

  const usePost = usePostChat()
  const deleteChat = useDeleteChat()
  const navigate = useNavigate()

  const [form, setForm] = useState({ message: '' })

  if (isPending) {
    return <LoadingSpinner />
  }
  if (isError) {
    return <div>...Error</div>
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    // const token = await getAccessTokenSilently()
    evt.preventDefault()

    const chat = {
      message: form.message,
    }

    try {
      await usePost.mutateAsync(chat)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div>
      <div>
        {data?.map((d: GetChat) => (
          <>
            <li key={d.id}>
              <img src={d.profile_photo} alt={`${d.name} profile imagge`} />
              <p>{d.name}</p>
              <p>{d.message}</p>
              <div>{d.time_sent}</div>
            </li>
            <button onClick={() => deleteChat.mutate(d.id!)}>DELETE</button>
          </>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            placeholder="...something"
            value={form.message}
            onChange={handleChange}
          />
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  )
}
export default Chat
