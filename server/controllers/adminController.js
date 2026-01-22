import Education from '../models/Education.js'
import Experience from '../models/Experience.js'
import Project from '../models/Project.js'
import Skill from '../models/Skill.js'

// Project Controllers
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    res.json(project)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    res.json({ message: 'Project removed' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Experience Controllers
export const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, id: -1 })
    res.json(experiences)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const createExperience = async (req, res) => {
  try {
    const experienceData = { ...req.body }

    // Handle logo file upload
    if (req.files?.imgFile?.[0]) {
      experienceData.imgFile = `/uploads/${req.files.imgFile[0].filename}`
    }

    // Handle document image file upload
    if (req.files?.docFile?.[0]) {
      experienceData.docFile = `/uploads/${req.files.docFile[0].filename}`
    }

    const experience = new Experience(experienceData)
    await experience.save()
    res.status(201).json(experience)
  } catch (error) {
    console.error('Create experience error:', error.message)
    res.status(400).json({ message: error.message })
  }
}

export const updateExperience = async (req, res) => {
  try {
    const experienceData = { ...req.body }

    // Handle logo file upload
    if (req.files?.imgFile?.[0]) {
      experienceData.imgFile = `/uploads/${req.files.imgFile[0].filename}`
    }

    // Handle document image file upload
    if (req.files?.docFile?.[0]) {
      experienceData.docFile = `/uploads/${req.files.docFile[0].filename}`
    }

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      experienceData,
      { new: true, runValidators: true },
    )

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' })
    }

    res.json(experience)
  } catch (error) {
    console.error('Update experience error:', error.message)
    res.status(400).json({ message: error.message })
  }
}

export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id)

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' })
    }

    res.json({ message: 'Experience removed' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Education Controllers
export const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, id: -1 })
    res.json(education)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const createEducation = async (req, res) => {
  try {
    const educationData = { ...req.body }

    // Handle file upload
    if (req.files?.imgFile?.[0]) {
      educationData.imgFile = `/uploads/${req.files.imgFile[0].filename}`
    }

    const education = new Education(educationData)
    await education.save()
    res.status(201).json(education)
  } catch (error) {
    console.error('Create education error:', error.message)
    res.status(400).json({ message: error.message })
  }
}

export const updateEducation = async (req, res) => {
  try {
    const educationData = { ...req.body }

    // Handle file upload
    if (req.files?.imgFile?.[0]) {
      educationData.imgFile = `/uploads/${req.files.imgFile[0].filename}`
    }

    const education = await Education.findByIdAndUpdate(
      req.params.id,
      educationData,
      { new: true, runValidators: true },
    )

    if (!education) {
      return res.status(404).json({ message: 'Education not found' })
    }

    res.json(education)
  } catch (error) {
    console.error('Update education error:', error.message)
    res.status(400).json({ message: error.message })
  }
}

export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id)

    if (!education) {
      return res.status(404).json({ message: 'Education not found' })
    }

    res.json({ message: 'Education removed' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Skill Controllers
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 })
    res.json(skills)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const createSkill = async (req, res) => {
  try {
    console.log('=== CREATE SKILL ===')
    console.log('Body:', req.body)
    console.log('Files:', req.files)

    const skillData = { ...req.body }

    // Parse skills array if it's a string (from form submission)
    if (typeof skillData.skills === 'string') {
      skillData.skills = JSON.parse(skillData.skills)
    }

    console.log('Parsed skills:', skillData.skills)

    // Handle image file uploads for each skill by index
    if (req.files && req.files.length > 0) {
      console.log('Processing uploaded files...')

      // Create a map of skill index to file
      const fileMap = {}
      req.files.forEach((file) => {
        // Extract index from field name like "imgFile_0", "imgFile_1", etc.
        const match = file.fieldname.match(/imgFile_(\d+)/)
        if (match) {
          const index = parseInt(match[1])
          fileMap[index] = `/uploads/${file.filename}`
          console.log(`File for skill ${index}: ${file.filename}`)
        }
      })

      console.log('File map:', fileMap)

      // Assign images to skills by index from the map
      skillData.skills = skillData.skills.map((skill, index) => {
        const newSkill = { ...skill }

        // If a file exists for this skill index, assign it
        if (fileMap[index]) {
          newSkill.image = fileMap[index]
          console.log(`Assigned image to skill ${index}: ${newSkill.image}`)
        } else {
          console.log(`No file for skill ${index}`)
        }

        return newSkill
      })
    }

    console.log('Final skill data before save:', skillData)

    const skill = new Skill(skillData)
    await skill.save()

    console.log('Skill saved successfully:', skill)
    res.status(201).json(skill)
  } catch (error) {
    console.error('Create skill error:', error)
    res.status(400).json({
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    })
  }
}

export const updateSkill = async (req, res) => {
  try {
    console.log('=== UPDATE SKILL ===')
    console.log('Skill ID:', req.params.id)
    console.log('Body:', req.body)
    console.log('Files:', req.files)

    const skillData = { ...req.body }

    // Parse skills array if it's a string
    if (typeof skillData.skills === 'string') {
      skillData.skills = JSON.parse(skillData.skills)
    }

    console.log('Parsed skills:', skillData.skills)

    // Get existing skill to preserve old images
    const existingSkill = await Skill.findById(req.params.id)
    if (!existingSkill) {
      return res.status(404).json({ message: 'Skill not found' })
    }

    console.log('Existing skill:', existingSkill)

    // Start with existing images
    const updatedSkills = skillData.skills.map((skill, index) => {
      const newSkill = { ...skill }

      // First, copy existing image if it exists
      if (
        existingSkill.skills &&
        existingSkill.skills[index] &&
        existingSkill.skills[index].image
      ) {
        newSkill.image = existingSkill.skills[index].image
      }

      return newSkill
    })

    // Handle image file uploads by index
    if (req.files && req.files.length > 0) {
      console.log('Processing uploaded files...')

      // Create a map of skill index to file
      const fileMap = {}
      req.files.forEach((file) => {
        // Extract index from field name like "imgFile_0", "imgFile_1", etc.
        const match = file.fieldname.match(/imgFile_(\d+)/)
        if (match) {
          const index = parseInt(match[1])
          fileMap[index] = `/uploads/${file.filename}`
          console.log(`File for skill ${index}: ${file.filename}`)
        }
      })

      console.log('File map:', fileMap)

      // Update skills with new images from the map
      Object.keys(fileMap).forEach((indexStr) => {
        const index = parseInt(indexStr)
        if (updatedSkills[index]) {
          updatedSkills[index].image = fileMap[index]
          console.log(
            `Updated image for skill ${index}: ${updatedSkills[index].image}`,
          )
        }
      })
    }

    skillData.skills = updatedSkills
    console.log('Final skill data for update:', skillData)

    const skill = await Skill.findByIdAndUpdate(req.params.id, skillData, {
      new: true,
      runValidators: true,
    })

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' })
    }

    console.log('Skill updated successfully:', skill)
    res.json(skill)
  } catch (error) {
    console.error('Update skill error:', error)
    res.status(400).json({
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    })
  }
}

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' })
    }

    res.json({ message: 'Skill removed' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Update order
export const updateOrder = async (req, res) => {
  try {
    const { type, items } = req.body

    let Model
    switch (type) {
      case 'projects':
        Model = Project
        break
      case 'experiences':
        Model = Experience
        break
      case 'education':
        Model = Education
        break
      case 'skills':
        Model = Skill
        break
      default:
        return res.status(400).json({ message: 'Invalid type' })
    }

    const bulkOps = items.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { order: item.order },
      },
    }))

    await Model.bulkWrite(bulkOps)
    res.json({ message: 'Order updated successfully' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
