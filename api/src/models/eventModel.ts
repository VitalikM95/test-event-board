import mongoose, { Schema } from 'mongoose'
import { User } from './userModel'

export interface Event extends Document {
  title: string
  description?: string
  eventDate: Date
  organizer: string
  users: User[]
}

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
)

export const Event = mongoose.model<Event>('Event', EventSchema)
