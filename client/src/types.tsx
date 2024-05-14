export type Event = {
  _id: string
  title: string
  description: string
  eventDate: string
  organizer: string
  users: string[]
  __v: number
  createdAt: string
  updatedAt: string
}

export type RegisterUser = {
  eventId: string
  name: string
  email: string
  birthDate: string
  whereHeard: string
}

export type User = {
  _id: string
  name: string
  email: string
  birthDate: string
  whereHeard: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface UsersByEvent {
  users: User[]
  title: string
}
