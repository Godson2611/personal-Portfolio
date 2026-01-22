import Education from '../models/Education.js'
import Experience from '../models/Experience.js'
import Portfolio from '../models/Portfolio.js'
import Project from '../models/Project.js'
import Skill from '../models/Skill.js'

export const getPortfolio = async (req, res) => {
  try {
    const [portfolio, projects, experiences, education, skills] =
      await Promise.all([
        Portfolio.findOne({ isPublished: true }),
        Project.find().sort({ order: 1, createdAt: -1 }),
        Experience.find().sort({ order: 1, id: -1 }),
        Education.find().sort({ order: 1, id: -1 }),
        Skill.find().sort({ order: 1 }),
      ])

    const bio = portfolio?.bio || {}
    if (!bio.profileImage) {
      bio.profileImage = ''
    }

    res.json({
      bio,
      projects,
      experiences,
      education,
      skills,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateBio = async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne()

    if (!portfolio) {
      const bioData = { ...req.body }

      if (bioData.roles) {
        if (typeof bioData.roles === 'string') {
          try {
            bioData.roles = JSON.parse(bioData.roles)
          } catch (e) {
            bioData.roles = bioData.roles
              .split(',')
              .map((role) => role.trim())
              .filter((role) => role)
          }
        }
      }

      if (req.file) {
        bioData.profileImage = `/uploads/${req.file.filename}`
      } else {
        bioData.profileImage = bioData.profileImage || ''
      }

      portfolio = new Portfolio({
        bio: bioData,
      })
    } else {
      if (req.body.roles && typeof req.body.roles === 'string') {
        try {
          req.body.roles = JSON.parse(req.body.roles)
        } catch (e) {
          req.body.roles = req.body.roles
            .split(',')
            .map((role) => role.trim())
            .filter((role) => role)
        }
      }

      Object.keys(req.body).forEach((key) => {
        if (key !== 'removeImage') {
          portfolio.bio[key] = req.body[key]
        }
      })

      if (req.file) {
        portfolio.bio.profileImage = `/uploads/${req.file.filename}`
      } else if (req.body.removeImage === 'true') {
        portfolio.bio.profileImage = ''
      }

      portfolio.markModified('bio')
    }

    portfolio.lastUpdated = Date.now()
    await portfolio.save()
    res.json(portfolio.bio)
  } catch (error) {
    console.error('Error updating bio:', error)
    res.status(400).json({ message: error.message })
  }
}

export const getStats = async (req, res) => {
  try {
    const [
      projectsCount,
      experiencesCount,
      educationCount,
      skillsCount,
      portfolio,
    ] = await Promise.all([
      Project.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
      Skill.countDocuments(),
      Portfolio.findOne(),
    ])

    // Ensure profileImage exists in bio
    const bio = portfolio?.bio || {
      name: '',
      email: '',
      description: '',
      github: '',
      linkedin: '',
      resume: '',
      phone: '',
      location: '',
      roles: [],
      profileImage: '',
    }

    if (!bio.profileImage) {
      bio.profileImage = ''
    }

    res.json({
      projects: projectsCount,
      experiences: experiencesCount,
      education: educationCount,
      skills: skillsCount,
      bio,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(400).json({ message: error.message })
  }
}
