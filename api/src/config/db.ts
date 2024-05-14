import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async () => {
  mongoose
    .connect(
      'mongodb+srv://admin:wwwwwwww@shoes-cluster.depshum.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(() => {
      console.log(`MongoDB is OK`)
    })
    .catch(error => console.log('MongoDB is FAIL', error))
}

export default connectDB
