import express from 'express'
import {
  getPortfolio,
  getStats,
  updateBio,
} from '../controllers/portfolioController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

router.get('/', getPortfolio)
router.get('/stats', protect, admin, getStats)
router.put('/bio', protect, admin, upload.single('profileImage'), updateBio)

export default router
