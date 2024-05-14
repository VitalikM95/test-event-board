import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './config/db'
import router from './routes'

dotenv.config()
const app = express()
connectDB()

app.use(cors())
app.use(express.json())

app.use('/api', router)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port - ${PORT}`))
