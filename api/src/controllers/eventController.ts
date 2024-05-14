import { Request, Response } from 'express'
import { Event } from '../models/eventModel'

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { limit, skip, sortBy, sortOrder } = req.query

    let query = Event.find()

    if (sortBy && sortOrder) {
      query = query.sort({ [sortBy as string]: sortOrder === 'asc' ? 1 : -1 })
    }

    if (limit) {
      query = query.limit(Number(limit))
    }
    if (skip) {
      query = query.skip(Number(skip))
    }

    const events = await query.exec()

    res.status(200).json(events)
  } catch (error) {
    console.error('Error getting events:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getUsersForEvent = async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId
    const event = await Event.findById(eventId).populate('users')

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.status(200).json({ users: event.users, title: event.title })
  } catch (error) {
    console.error('Error getting users for event:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
