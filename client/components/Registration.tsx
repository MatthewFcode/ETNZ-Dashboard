import { usePostUser } from '../hooks/useUsers.ts'
import { useNavigate } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'
import {useState} from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Auth0.tsx'

function Registraton() {
  const postUser = usePostUser()
  const {getAccessTokenSilently} = useAuth0()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    role: '',
    //file: null as File | null,
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    })
  }

  // function handleFileChange(evt: React.ChangeEvent<HTMLInputElement>) {
  //   if (evt.target.files && evt.target.files[0]) {
  //     setForm({ ...form, file: evt.target.files[0] })
  //   }
  // }
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    const token = await getAccessTokenSilently()
    evt.preventDefault()

   const newUser = {
    name: form.name,
    role: form.role,
    //profile_photo: form.file
   }


    postUser.mutate(newUser, {
      onSuccess: () => {
        navigate('/')
      },
      onError: (err) => {
        console.error('Failed to create user', err)
      },
    })

    navigate('/')
  }

  return (
    
  )
}

export default Registraton
