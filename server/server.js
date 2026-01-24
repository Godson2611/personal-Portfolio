import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import portfolioRoutes from './routes/portfolioRoutes.js'

app.use('/api/auth', authRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/email', emailRoutes)

import fs from 'fs'
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

app.use('/uploads', express.static(uploadsDir))

app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio API is running...',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      portfolio: '/api/portfolio',
      admin: '/api/admin',
      email: '/api/email',
    },
  })
})

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
