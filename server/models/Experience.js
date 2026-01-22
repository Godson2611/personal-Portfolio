import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema(
  {
    img: String,
    imgFile: String,
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    date: String,
    desc: {
      type: String,
      required: true,
    },
    skills: [String],
    docImg: String,
    docFile: String,
    doc: String,
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

const Experience = mongoose.model('Experience', experienceSchema)
export default Experience
