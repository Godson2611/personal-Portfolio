import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving - SIMPLIFIED VERSION
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (error) {
    throw error
  }
})

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log('Comparing passwords...')
  console.log(
    'Candidate password type:',
    typeof candidatePassword,
    'length:',
    candidatePassword?.length,
  )
  console.log(
    'Stored hash type:',
    typeof this.password,
    'length:',
    this.password?.length,
  )
  const result = await bcrypt.compare(candidatePassword, this.password)
  console.log('bcrypt.compare result:', result)
  return result
}

const User = mongoose.model('User', userSchema)
export default User
