import {
  useGetAllChats,
  usePostChat,
  useDeleteChat,
} from '../hooks/useChats.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { useState } from 'react'
import { GetChat } from '../../models/chat.ts'

function Chat() {
  const { data, isPending, isError } = useGetAllChats()
  const usePost = usePostChat()
  const deleteChat = useDeleteChat()

  const [form, setForm] = useState({ message: '' })

  if (isPending) return <LoadingSpinner />
  if (isError) return <div className="error">Error loading chat</div>

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setForm({ ...form, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    try {
      await usePost.mutateAsync({ message: form.message })
      setForm({ message: '' })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">Team Chat</div>

      <ul className="chat-messages">
        {data?.map((d: GetChat) => (
          <li key={d.id} className="chat-message-item">
            <img src={d.profile_photo} alt={`${d.name} profile`} />
            <div className="message-content">
              <div className="message-meta">
                <span className="message-name">{d.name}</span>
                <span className="message-time">{d.time_sent}</span>
              </div>
              <div className="message-text">{d.message}</div>
            </div>
            <button
              className="delete-btn"
              onClick={() => deleteChat.mutate(d.id!)}
              title="Delete"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="chat-input-area">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Send a message…"
            value={form.message}
            onChange={handleChange}
            autoComplete="off"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat
