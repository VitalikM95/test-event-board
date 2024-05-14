import { Request, Response } from 'express'
import { User } from '../models/userModel'
import { Event } from '../models/eventModel'

export const registerUserForEvent = async (req: Request, res: Response) => {
  try {
    const { eventId, name, email, birthDate, whereHeard } = req.body.userData

    const user = new User({ name, email, birthDate, whereHeard })

    const event = await Event.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    event.users.push(user)

    await Promise.all([user.save(), event.save()])

    res.status(201).json({ message: 'User registered for event successfully' })
  } catch (error) {
    console.error('Error registering user for event:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const searchUsersForEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId
    const query = req.query.query as string

    const event = await Event.findById(eventId).populate({
      path: 'users',
      match: {
        $or: [
          { name: { $regex: new RegExp(query, 'i') } },
          { email: { $regex: new RegExp(query, 'i') } },
        ],
      },
    })

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.status(200).json({ users: event.users, title: event.title })
  } catch (error) {
    console.error('Error searching users for event:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
