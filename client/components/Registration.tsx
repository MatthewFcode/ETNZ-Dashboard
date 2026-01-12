import { usePostUser } from '../hooks/useUsers.ts'
import { useNavigate } from 'react-router'
//import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'

function Registraton() {
  const postUser = usePostUser()
  //const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    role: '',
    file: null as File | null,
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target.files && evt.target.files[0]) {
      setForm({ ...form, file: evt.target.files[0] })
    }
  }
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    // const token = await getAccessTokenSilently()
    evt.preventDefault()

    // const newUser = {
    //   name: form.name,
    //   role: form.role,
    //   profile_photo: form.file
    // }
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('role', form.role)

    if (form.file) {
      formData.append('file', form.file)
    }

    postUser.mutate(formData, {
      onSuccess: () => {
        navigate('/')
      },
      onError: (err) => {
        console.error('Failed to create user', err)
      },
    })
  }

  return (
    <>
      <IfAuthenticated>
        <h1>🏎️ Create your ETNZ race hub account 🏎️ </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="name">What is your name?</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="..Matthew"
            />
          </div>
          <div>
            <label htmlFor="role">What is your role?</label>
            <input
              type="text"
              id="role"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="..Captain"
            />
          </div>

          <div>
            <label htmlFor="file">Upload a file..</label>
            <input
              type="file"
              id="profile_photo"
              name="profile_photo"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" disabled={!form.name}>
            ⛵Create Account⛵
          </button>
        </form>
      </IfAuthenticated>
      <IfNotAuthenticated>
        <div>
          <h1>❗Go back and authenticate yourself❗</h1>
        </div>
      </IfNotAuthenticated>
    </>
  )
}

export default Registraton
