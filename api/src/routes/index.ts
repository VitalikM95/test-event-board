import express from 'express'
import {
  registerUserForEvent,
  searchUsersForEvent,
} from '../controllers/userController'
import { getEvents, getUsersForEvent } from '../controllers/eventController'

const router = express.Router()

router.get('/events', getEvents)

router.post('/register', registerUserForEvent)

router.get('/events/:eventId', getUsersForEvent)

router.get('/events/:eventId/search', searchUsersForEvent)

export default router
