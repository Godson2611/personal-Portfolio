import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Skill from './models/Skill.js'

dotenv.config()

const clearSkills = async () => {
  try {
    await connectDB()
    console.log('Connected to MongoDB')

    // Delete all skills
    const result = await Skill.deleteMany({})
    console.log(`Deleted ${result.deletedCount} skill records`)

    console.log('Skills cleared successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error clearing skills:', error)
    process.exit(1)
  }
}

clearSkills()
