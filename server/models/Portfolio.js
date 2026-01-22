import mongoose from 'mongoose'

const bioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  github: String,
  resume: String,
  linkedin: String,
  email: String,
  phone: String,
  location: String,
  profileImage: String,
})

const portfolioSchema = new mongoose.Schema(
  {
    bio: bioSchema,
    isPublished: {
      type: Boolean,
      default: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

const Portfolio = mongoose.model('Portfolio', portfolioSchema)
export default Portfolio
