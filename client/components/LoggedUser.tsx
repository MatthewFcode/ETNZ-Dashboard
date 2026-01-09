import { useGetUserByAuth0Id } from '../hooks/useUsers.ts'
// import { User } from '../../models/users.ts'
import LoadingSpinner from './LoadingSpinner.tsx'

function LoggedUser() {
  const { data, isPending, isError } = useGetUserByAuth0Id()

  if (isPending) {
    return <LoadingSpinner />
  }
  if (isError) {
    return <div>...Error loading user details</div>
  }

  return (
    <div className="logged-user">
      <ul>
        <li>
          <img src={data?.profile_photo} alt="profile-image" />
          <div className="user-info">
            <div className="user-name">{data?.name}</div>
            <div className="user-role">{data?.role}</div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default LoggedUser
