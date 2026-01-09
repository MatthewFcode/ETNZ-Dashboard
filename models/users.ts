export interface User {
  auth0Id?: string
  id?: number
  name: string
  role: string
  profile_photo?: string
  activity_status?: string
}

export interface UserPayload {
  auth0Id?: string
  name: string
  role: string
  file: File
}
