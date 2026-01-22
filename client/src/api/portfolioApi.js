import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
})

// Set auth token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Portfolio API
export const getPortfolio = async () => {
  try {
    const response = await api.get('/portfolio')
    return response.data
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    throw error
  }
}

// Auth API
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
      setAuthToken(response.data.token)
    }
    return response.data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

export const logout = () => {
  localStorage.removeItem('user')
  setAuthToken(null)
}

export const register = async (email, password) => {
  try {
    const response = await api.post('/auth/register', { email, password })
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
      setAuthToken(response.data.token)
    }
    return response.data
  } catch (error) {
    console.error('Register error:', error)
    throw error
  }
}

export const getProfile = async () => {
  try {
    const response = await api.get('/auth/profile')
    return response.data
  } catch (error) {
    console.error('Get profile error:', error)
    throw error
  }
}

export const updateProfile = async (userData) => {
  try {
    const response = await api.put('/auth/profile', userData)
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data))
      setAuthToken(response.data.token)
    }
    return response.data
  } catch (error) {
    console.error('Update profile error:', error)
    throw error
  }
}

// Admin APIs
export const updateBio = async (bioData) => {
  try {
    const response = await api.put('/portfolio/bio', bioData)
    return response.data
  } catch (error) {
    console.error('Update bio error:', error)
    throw error
  }
}

export const getPortfolioStats = async () => {
  try {
    const response = await api.get('/portfolio/stats')
    return response.data
  } catch (error) {
    console.error('Get stats error:', error)
    throw error
  }
}

// Projects
export const getProjects = async () => {
  try {
    const response = await api.get('/admin/projects')
    return response.data
  } catch (error) {
    console.error('Get projects error:', error)
    throw error
  }
}

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/admin/projects', projectData)
    return response.data
  } catch (error) {
    console.error('Create project error:', error)
    throw error
  }
}

export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/admin/projects/${id}`, projectData)
    return response.data
  } catch (error) {
    console.error('Update project error:', error)
    throw error
  }
}

export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/admin/projects/${id}`)
    return response.data
  } catch (error) {
    console.error('Delete project error:', error)
    throw error
  }
}

// Experiences
export const getExperiences = async () => {
  try {
    const response = await api.get('/admin/experiences')
    return response.data
  } catch (error) {
    console.error('Get experiences error:', error)
    throw error
  }
}

export const createExperience = async (experienceData) => {
  try {
    const response = await api.post('/admin/experiences', experienceData)
    return response.data
  } catch (error) {
    console.error(
      'Create experience error:',
      error.response?.data || error.message,
    )
    throw error
  }
}

export const updateExperience = async (id, experienceData) => {
  try {
    const response = await api.put(`/admin/experiences/${id}`, experienceData)
    return response.data
  } catch (error) {
    console.error(
      'Update experience error:',
      error.response?.data || error.message,
    )
    throw error
  }
}

export const deleteExperience = async (id) => {
  try {
    const response = await api.delete(`/admin/experiences/${id}`)
    return response.data
  } catch (error) {
    console.error('Delete experience error:', error)
    throw error
  }
}

// Education
export const getEducation = async () => {
  try {
    const response = await api.get('/admin/education')
    return response.data
  } catch (error) {
    console.error('Get education error:', error)
    throw error
  }
}

export const createEducation = async (educationData) => {
  try {
    const response = await api.post('/admin/education', educationData)
    return response.data
  } catch (error) {
    console.error(
      'Create education error:',
      error.response?.data || error.message,
    )
    throw error
  }
}

export const updateEducation = async (id, educationData) => {
  try {
    const response = await api.put(`/admin/education/${id}`, educationData)
    return response.data
  } catch (error) {
    console.error(
      'Update education error:',
      error.response?.data || error.message,
    )
    throw error
  }
}

export const deleteEducation = async (id) => {
  try {
    const response = await api.delete(`/admin/education/${id}`)
    return response.data
  } catch (error) {
    console.error('Delete education error:', error)
    throw error
  }
}

// Skills
export const getSkills = async () => {
  try {
    const response = await api.get('/admin/skills')
    return response.data
  } catch (error) {
    console.error('Get skills error:', error)
    throw error
  }
}

export const createSkill = async (skillData) => {
  try {
    const response = await api.post('/admin/skills', skillData)
    return response.data
  } catch (error) {
    console.error('Create skill error:', error)
    throw error
  }
}

export const updateSkill = async (id, skillData) => {
  try {
    const response = await api.put(`/admin/skills/${id}`, skillData)
    return response.data
  } catch (error) {
    console.error('Update skill error:', error)
    throw error
  }
}

export const deleteSkill = async (id) => {
  try {
    const response = await api.delete(`/admin/skills/${id}`)
    return response.data
  } catch (error) {
    console.error('Delete skill error:', error)
    throw error
  }
}

// Update order
export const updateOrder = async (type, items) => {
  try {
    const response = await api.put('/admin/order', { type, items })
    return response.data
  } catch (error) {
    console.error('Update order error:', error)
    throw error
  }
}

// Email API
export const sendContactEmail = async (emailData) => {
  try {
    const response = await api.post('/email/send', emailData)
    return response.data
  } catch (error) {
    console.error('Send email error:', error)
    throw error
  }
}

export default api
