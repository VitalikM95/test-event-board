import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log(`MongoDB is OK`)
    })
    .catch(error => console.log('MongoDB is FAIL', error))
}

export default connectDB
