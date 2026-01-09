import { useGetAllUserActivity } from '../hooks/useUsers.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { User } from '../../models/users.ts'
// unwrap the useQuery and then return a map over the data displaying all the different values

function UserActivity() {
  const { data, isError, isPending } = useGetAllUserActivity()

  if (isPending) {
    return <LoadingSpinner />
  }
  if (isError) {
    return <div>...Error Loading User Activity</div>
  }

  return (
    <div>
      <ul>
        {data?.map((d: User, i: number) => (
          <li key={i}>
            <div>{d.name}</div>
            <div>{d.role}</div>
            <div>{d.activity_status}</div>
            <img src={d.profile_photo} alt="profile-image" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserActivity
