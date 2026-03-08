export interface PostChat {
  id?: number
  auth0Id: string
  message: string
}

export interface GetChat {
  id?: number
  message: string
  time_sent: string
  name: string
  profile_photo: string
}
