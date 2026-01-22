import express from 'express'
import {
  createEducation,
  createExperience,
  createProject,
  createSkill,
  deleteEducation,
  deleteExperience,
  deleteProject,
  deleteSkill,
  // Education
  getEducation,
  // Experiences
  getExperiences,
  // Projects
  getProjects,
  // Skills
  getSkills,
  updateEducation,
  updateExperience,
  // Order
  updateOrder,
  updateProject,
  updateSkill,
} from '../controllers/adminController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

// Apply admin middleware to all routes
router.use(protect)
router.use(admin)

// Project routes
router.route('/projects').get(getProjects).post(createProject)

router.route('/projects/:id').put(updateProject).delete(deleteProject)

// Experience routes
router
  .route('/experiences')
  .get(getExperiences)
  .post(
    upload.fields([
      { name: 'imgFile', maxCount: 1 },
      { name: 'docFile', maxCount: 1 },
    ]),
    createExperience,
  )

router
  .route('/experiences/:id')
  .put(
    upload.fields([
      { name: 'imgFile', maxCount: 1 },
      { name: 'docFile', maxCount: 1 },
    ]),
    updateExperience,
  )
  .delete(deleteExperience)

// Education routes
router
  .route('/education')
  .get(getEducation)
  .post(upload.fields([{ name: 'imgFile', maxCount: 1 }]), createEducation)

router
  .route('/education/:id')
  .put(upload.fields([{ name: 'imgFile', maxCount: 1 }]), updateEducation)
  .delete(deleteEducation)

// Skill routes
router
.route('/skills')
.get(getSkills)
.post(upload.any(), createSkill)
router
.route('/skills/:id')
.put(upload.any(), updateSkill)
.delete(deleteSkill)

// Update order
router.put('/order', updateOrder)

export default router
