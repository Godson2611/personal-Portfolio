import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const dropIndex = async () => {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected!')

    // Drop the educations collection to remove all indexes
    const db = mongoose.connection.db

    console.log('Dropping educations collection...')
    await db.collection('educations').deleteMany({})
    console.log('✅ All education documents deleted!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

dropIndex()
