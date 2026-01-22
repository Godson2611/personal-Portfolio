import express from 'express'
import { sendEmail } from '../controllers/emailController.js'

const router = express.Router()

// Test endpoint
router.get('/', (req, res) => {
  res.json({ message: 'Email API is working' })
})

router.post('/send', sendEmail)

export default router
