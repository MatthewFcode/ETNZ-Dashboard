import { useGetAllUserActivity } from '../hooks/useUsers.ts'
import LoadingSpinner from './LoadingSpinner.tsx'
import { User } from '../../models/users.ts'
import { useEffect, useState } from 'react'

function UserActivity() {
  const { data, isError, isPending } = useGetAllUserActivity()
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every 30 seconds to refresh relative times
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getRelativeTime = (timestamp: string): string => {
    const activityDate = new Date(timestamp)
    const diffMs = currentTime.getTime() - activityDate.getTime()
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSeconds < 60) return 'just now'
    if (diffMinutes < 60)
      return `${diffMinutes} ${diffMinutes === 1 ? 'min' : 'mins'} ago`
    if (diffHours < 24)
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
    if (diffDays < 7)
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`

    return activityDate.toLocaleDateString()
  }

  const isUserActive = (timestamp: string): boolean => {
    const activityDate = new Date(timestamp)
    const diffMs = currentTime.getTime() - activityDate.getTime()
    const diffMinutes = Math.floor(diffMs / 1000 / 60)

    // Consider user active if they were active within last 5 minutes
    return diffMinutes < 5
  }

  const getStatusClass = (timestamp: string): string => {
    const diffMs = currentTime.getTime() - new Date(timestamp).getTime()
    const diffMinutes = Math.floor(diffMs / 1000 / 60)

    if (diffMinutes < 5) return 'status-active'
    if (diffMinutes < 30) return 'status-away'
    return 'status-offline'
  }

  const getStatusText = (timestamp: string): string => {
    const diffMs = currentTime.getTime() - new Date(timestamp).getTime()
    const diffMinutes = Math.floor(diffMs / 1000 / 60)

    if (diffMinutes < 5) return 'Active'
    if (diffMinutes < 30) return 'Away'
    return 'Offline'
  }

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
            <div className="user-avatar-wrapper">
              <img src={d.profile_photo} alt="profile-image" />
              {isUserActive(d.activity_status) && (
                <span className="active-indicator"></span>
              )}
            </div>
            <div className="user-details">
              <div className="activity-name">{d.name}</div>
              <div className="activity-role">{d.role}</div>
              <div
                className={`activity-status ${getStatusClass(d.activity_status)}`}
              >
                {getStatusText(d.activity_status)}
              </div>
              <div className="last-active">
                {getRelativeTime(d.activity_status)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserActivity
