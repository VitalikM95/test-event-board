import mongoose, { Schema } from 'mongoose'

export interface User extends Document {
  name: string
  email: string
  birthDate: Date
  whereHeard: 'Social Media' | 'Friends' | 'Found myself'
  eventId: string
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    whereHeard: {
      type: String,
      enum: ['Social Media', 'Friends', 'Found myself'],
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  },
  { timestamps: true }
)

export const User = mongoose.model<User>('User', UserSchema)
