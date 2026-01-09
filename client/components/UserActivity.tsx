import { useGetAllUserActivity } from '../hooks/useUsers.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { User } from '../../models/users.ts'
// unwrap the useQuery and then return a map over the data displaying all the different values

// function UserActivity() {
//   const { data, isError, isPending } = useGetAllUserActivity()

//   if (isPending) {
//     return <LoadingSpinner />
//   }
//   if (isError) {
//     return <div>...Error Loading User Activity</div>
//   }

//   return (
//     <div>
//       <ul>
//         {data?.map((d: User, i: number) => (
//           <li key={i}>
//             <img src={d.profile_photo} alt="profile-image" />
//             <div>{d.name}</div>
//             <div>{d.role}</div>
//             <div>{d.activity_status}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
function UserActivity() {
  const { data, isError, isPending } = useGetAllUserActivity()

  if (isPending) {
    return <LoadingSpinner />
  }
  if (isError) {
    return <div>...Error Loading User Activity</div>
  }

  return (
    <div className="activity-panel">
      <div className="activity-header">Team Activity</div>
      <ul className="activity-list">
        {data?.map((d: User, i: number) => (
          <li key={i} className="activity-item">
            <img src={d.profile_photo} alt="profile-image" />
            <div className="user-details">
              <div className="activity-name">{d.name}</div>
              <div className="activity-role">{d.role}</div>
              <div
                className={`activity-status status-${d.activity_status?.toLowerCase()}`}
              >
                {d.activity_status}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserActivity
