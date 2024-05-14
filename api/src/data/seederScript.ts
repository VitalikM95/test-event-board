import dotenv from 'dotenv'
import connectDB from '../config/db'
import eventsData from './eventsData'
import { Event } from '../models/eventModel'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Event.deleteMany({})

    await Event.insertMany(eventsData)

    console.log('Data Import Success')

    process.exit()
  } catch (error) {
    console.error('Data import Error', error)
    process.exit(1)
  }
}

importData()
