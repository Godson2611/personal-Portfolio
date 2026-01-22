import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists (case-insensitive)
    const userExists = await User.findOne({
      email: email?.toLowerCase().trim(),
    })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create user
    const user = await User.create({
      email: email?.toLowerCase().trim(),
      password,
      role: 'admin',
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    console.log('Login attempt:', { email: email?.trim(), password: '***' })

    // Check for user email (case-insensitive)
    const user = await User.findOne({ email: email?.toLowerCase().trim() })

    console.log('User found:', user ? 'Yes' : 'No')
    if (!user) {
      console.log('User not found with email:', email)
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isPasswordMatch = await user.comparePassword(password)
    console.log('Password match:', isPasswordMatch)

    if (isPasswordMatch) {
      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      })
    } else {
      console.log('Password mismatch for user:', user.email)
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(400).json({ message: error.message })
  }
}

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.email = req.body.email || user.email

      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        email: updatedUser.email,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
