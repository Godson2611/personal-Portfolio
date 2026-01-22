import mongoose from 'mongoose'

const educationSchema = new mongoose.Schema(
  {
    img: String,
    imgFile: String,
    school: {
      type: String,
      required: true,
    },
    date: String,
    grade: String,
    desc: String,
    degree: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

const Education = mongoose.model('Education', educationSchema)
export default Education
