import express from 'express';
import { getProfile, login, register, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.route('/profile')
    .get(protect, getProfile)
    .put(protect, updateProfile);

export default router;