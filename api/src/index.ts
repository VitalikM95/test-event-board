import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './config/db'
import router from './routes'

dotenv.config()
const app = express()

app.use(
  cors({
    origin: ['https://test-event-board-server.vercel.app/'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
)
app.use(express.json())

connectDB()
app.use('/api', router)

const PORT = 4444 || 5000

app.listen(PORT, () => console.log(`Server running on port - ${PORT}`))
