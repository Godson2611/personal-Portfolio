import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createEducation,
  createExperience,
  createProject,
  createSkill,
  deleteEducation,
  deleteExperience,
  deleteProject,
  deleteSkill,
  getEducation,
  getExperiences,
  getPortfolioStats,
  getProjects,
  getSkills,
  login,
  logout,
  setAuthToken,
  updateBio,
  updateEducation,
  updateExperience,
  updateProject,
  updateSkill,
} from '../../api/portfolioApi'
import './Dashboard.css'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState(null)
  const [bio, setBio] = useState({})
  const [projects, setProjects] = useState([])
  const [experiences, setExperiences] = useState([])
  const [education, setEducation] = useState([])
  const [skills, setSkills] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState(null)
  const [editType, setEditType] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [skillCount, setSkillCount] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      const userFromStorage = localStorage.getItem('user')
      if (userFromStorage) {
        const parsedUser = JSON.parse(userFromStorage)
        if (parsedUser?.token) {
          setAuthToken(parsedUser.token)
          setUser(parsedUser)
          setIsAuthenticated(true)
          // Fetch data immediately without waiting for state update
          fetchDashboardData()
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
      localStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchDashboardData = async () => {
    try {
      const statsData = await getPortfolioStats()
      // Set stats from response
      setStats({
        projects: statsData.projects || 0,
        experiences: statsData.experiences || 0,
        education: statsData.education || 0,
        skills: statsData.skills || 0,
      })
      // Set bio data from nested bio object
      if (statsData.bio) {
        setBio(statsData.bio)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      showMessage('Error fetching dashboard data', 'error')
    }
  }

  const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 3000)
  }

  const fetchBio = async () => {
    try {
      const statsData = await getPortfolioStats()
      if (statsData?.bio) {
        setBio(statsData.bio)
      }
    } catch (error) {
      console.error('Error fetching bio:', error)
      showMessage('Error fetching bio information', 'error')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userData = await login(email, password)
      localStorage.setItem('user', JSON.stringify(userData))
      setAuthToken(userData.token)
      setUser(userData)
      setIsAuthenticated(true)
      await fetchDashboardData()
      showMessage('Login successful!')
    } catch (error) {
      showMessage(
        'Login failed: ' + (error.response?.data?.message || error.message),
        'error',
      )
    }
  }

  const handleLogout = () => {
    logout()
    setUser(null)
    setIsAuthenticated(false)
    navigate('/')
    showMessage('Logged out successfully')
  }

  const handleUpdateBio = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const roles = formData.get('roles')
    if (roles) {
      const rolesArray = roles
        .split(',')
        .map((role) => role.trim())
        .filter((role) => role)

      formData.delete('roles')
      formData.append('roles', JSON.stringify(rolesArray))
    }

    try {
      const updatedBio = await updateBio(formData)
      showMessage('Bio updated successfully!')
      setBio(updatedBio)
      setEditMode(false)
    } catch (error) {
      showMessage('Error updating bio: ' + error.message, 'error')
    }
  }

  // Project Management
  const fetchProjects = async () => {
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const handleCreateProject = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const projectData = Object.fromEntries(formData.entries())

    // Convert tags string to array
    if (projectData.tags) {
      projectData.tags = projectData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag)
    }

    // Convert boolean values
    if (projectData.featured) {
      projectData.featured = projectData.featured === 'true'
    }

    try {
      if (editData) {
        await updateProject(editData._id, projectData)
        showMessage('Project updated successfully!')
      } else {
        await createProject(projectData)
        showMessage('Project created successfully!')
      }
      setEditMode(false)
      setEditData(null)
      fetchProjects()
    } catch (error) {
      showMessage('Error saving project: ' + error.message, 'error')
    }
  }

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id)
        showMessage('Project deleted successfully!')
        fetchProjects()
      } catch (error) {
        showMessage('Error deleting project: ' + error.message, 'error')
      }
    }
  }

  // Experience Management
  const fetchExperiences = async () => {
    try {
      const data = await getExperiences()
      setExperiences(data)
    } catch (error) {
      console.error('Error fetching experiences:', error)
    }
  }

  const handleCreateExperience = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    // Don't convert to object, keep as FormData to preserve file uploads
    const experienceData = formData

    // Add skills as array if present
    const skillsInput = formData.get('skills')
    if (skillsInput) {
      const skillsArray = skillsInput
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill)

      // Remove the old skills field and add the array
      formData.delete('skills')
      skillsArray.forEach((skill) => formData.append('skills', skill))
    }

    try {
      if (editData) {
        await updateExperience(editData._id, experienceData)
        showMessage('Experience updated successfully!')
      } else {
        await createExperience(experienceData)
        showMessage('Experience created successfully!')
      }
      setEditMode(false)
      setEditData(null)
      fetchExperiences()
    } catch (error) {
      showMessage('Error saving experience: ' + error.message, 'error')
    }
  }

  const handleDeleteExperience = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await deleteExperience(id)
        showMessage('Experience deleted successfully!')
        fetchExperiences()
      } catch (error) {
        showMessage('Error deleting experience: ' + error.message, 'error')
      }
    }
  }

  // Education Management
  const fetchEducation = async () => {
    try {
      const data = await getEducation()
      setEducation(data)
    } catch (error) {
      console.error('Error fetching education:', error)
    }
  }

  const handleCreateEducation = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    // Don't convert to object, keep as FormData to preserve file uploads
    const educationData = formData

    try {
      if (editData) {
        await updateEducation(editData._id, educationData)
        showMessage('Education updated successfully!')
      } else {
        await createEducation(educationData)
        showMessage('Education created successfully!')
      }
      setEditMode(false)
      setEditData(null)
      fetchEducation()
    } catch (error) {
      showMessage('Error saving education: ' + error.message, 'error')
    }
  }

  const handleDeleteEducation = async (id) => {
    if (window.confirm('Are you sure you want to delete this education?')) {
      try {
        await deleteEducation(id)
        showMessage('Education deleted successfully!')
        fetchEducation()
      } catch (error) {
        showMessage('Error deleting education: ' + error.message, 'error')
      }
    }
  }

  // Skills Management
  const fetchSkills = async () => {
    try {
      const data = await getSkills()
      setSkills(data)
    } catch (error) {
      console.error('Error fetching skills:', error)
    }
  }

  const handleCreateSkill = async (e) => {
    e.preventDefault()
    const form = e.target

    const title = form.querySelector('input[name="title"]').value

    // Build skills array from individual form inputs
    const skillsArray = []
    for (let i = 0; i < skillCount; i++) {
      const skillName = form.querySelector(
        `input[name="skill_${i}_name"]`,
      )?.value
      const skillProficiency = parseInt(
        form.querySelector(`input[name="skill_${i}_proficiency"]`)?.value ||
          '80',
      )

      if (skillName && skillName.trim() !== '') {
        const skillObj = {
          name: skillName.trim(),
          proficiency: skillProficiency,
        }

        // Only add existing image if we're editing
        if (editData?.skills?.[i]?.image) {
          skillObj.image = editData.skills[i].image
        }

        skillsArray.push(skillObj)
      }
    }

    if (skillsArray.length === 0) {
      showMessage('Please add at least one skill', 'error')
      return
    }

    // Create FormData for file upload
    const submitData = new FormData()
    submitData.append('title', title)
    submitData.append('skills', JSON.stringify(skillsArray))

    // Append image files with indexed field names
    let fileCount = 0
    for (let i = 0; i < skillCount; i++) {
      const imageFile = form.querySelector(`input[name="imgFile_${i}"]`)
        ?.files?.[0]
      if (imageFile) {
        // Append each file with indexed field name
        submitData.append(`imgFile_${i}`, imageFile)
        fileCount++
        console.log(`Added file for skill ${i}:`, imageFile.name)
      } else if (editData?.skills?.[i]?.image) {
        console.log(`Preserving existing image for skill ${i}`)
      }
    }

    // Also append a count of files for debugging
    submitData.append('fileCount', fileCount)

    console.log('FormData entries:')
    for (let [key, value] of submitData.entries()) {
      if (value instanceof File) {
        console.log(key, value.name, value.type, value.size)
      } else {
        console.log(key, value)
      }
    }

    console.log('Skills array being sent:', skillsArray)

    try {
      if (editData) {
        await updateSkill(editData._id, submitData)
        showMessage('Skill category updated successfully!')
      } else {
        await createSkill(submitData)
        showMessage('Skill category created successfully!')
      }
      setEditMode(false)
      setEditData(null)
      setSkillCount(1)
      fetchSkills()
    } catch (error) {
      console.error('Skill creation error:', error)
      const errorMessage = error.response?.data?.message || error.message
      showMessage(`Error saving skill category: ${errorMessage}`, 'error')
    }
  }

  const handleDeleteSkill = async (id) => {
    if (
      window.confirm('Are you sure you want to delete this skill category?')
    ) {
      try {
        await deleteSkill(id)
        showMessage('Skill category deleted successfully!')
        fetchSkills()
      } catch (error) {
        showMessage('Error deleting skill category: ' + error.message, 'error')
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      switch (activeTab) {
        case 'bio':
          fetchBio()
          break
        case 'projects':
          fetchProjects()
          break
        case 'experience':
          fetchExperiences()
          break
        case 'education':
          fetchEducation()
          break
        case 'skills':
          fetchSkills()
          break
      }
    }
  }, [activeTab, isAuthenticated])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-box">
          <h2>Portfolio Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      {message && <div className={`message ${messageType}`}>{message}</div>}

      <header className="dashboard-header">
        <div className="header-left">
          <h1>Portfolio Dashboard</h1>
          <span className="welcome">Welcome, {user?.email}</span>
        </div>
        <div className="header-right">
          <button className="view-site" onClick={() => navigate('/')}>
            View Site
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button
            className={activeTab === 'bio' ? 'active' : ''}
            onClick={() => setActiveTab('bio')}
          >
            👤 Bio
          </button>
          <button
            className={activeTab === 'projects' ? 'active' : ''}
            onClick={() => setActiveTab('projects')}
          >
            🚀 Projects
          </button>
          <button
            className={activeTab === 'experience' ? 'active' : ''}
            onClick={() => setActiveTab('experience')}
          >
            💼 Experience
          </button>
          <button
            className={activeTab === 'education' ? 'active' : ''}
            onClick={() => setActiveTab('education')}
          >
            🎓 Education
          </button>
          <button
            className={activeTab === 'skills' ? 'active' : ''}
            onClick={() => setActiveTab('skills')}
          >
            🔧 Skills
          </button>
        </nav>

        <main className="dashboard-main">
          {activeTab === 'overview' && (
            <div className="overview">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">🚀</div>
                  <div className="stat-content">
                    <h3>Projects</h3>
                    <p className="stat-number">{stats?.projects || 0}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💼</div>
                  <div className="stat-content">
                    <h3>Experience</h3>
                    <p className="stat-number">{stats?.experiences || 0}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🎓</div>
                  <div className="stat-content">
                    <h3>Education</h3>
                    <p className="stat-number">{stats?.education || 0}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🔧</div>
                  <div className="stat-content">
                    <h3>Skills</h3>
                    <p className="stat-number">{stats?.skills || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bio' && (
            <div className="bio-editor">
              <div className="editor-header">
                <h2>Edit Bio Information</h2>
                {!editMode && (
                  <button className="add-btn" onClick={() => setEditMode(true)}>
                    ✏️ Edit Bio
                  </button>
                )}
              </div>

              {editMode ? (
                <form onSubmit={handleUpdateBio}>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Profile Image</label>
                      <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const reader = new FileReader()
                            reader.onload = (event) => {}
                            reader.readAsDataURL(e.target.files[0])
                          }
                        }}
                      />
                      {bio?.profileImage && (
                        <div style={{ marginTop: '10px' }}>
                          <small>Current image: {bio.profileImage}</small>
                          <br />
                          <img
                            src={(() => {
                              const apiUrl =
                                import.meta.env.VITE_API_URL ||
                                'http://localhost:5000/api'
                              const baseUrl = apiUrl.replace('/api', '')
                              return `${baseUrl}${bio.profileImage}`
                            })()}
                            alt="Profile"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.style.display = 'none'
                            }}
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                              borderRadius: '50%',
                              marginTop: '10px',
                              border: '2px solid #ddd',
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={bio?.name || ''}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={bio?.email || ''}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Description *</label>
                      <textarea
                        name="description"
                        defaultValue={bio?.description || ''}
                        placeholder="Enter your professional description"
                        rows="5"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>GitHub URL</label>
                      <input
                        type="url"
                        name="github"
                        defaultValue={bio?.github || ''}
                        placeholder="https://github.com/username"
                      />
                    </div>

                    <div className="form-group">
                      <label>LinkedIn URL</label>
                      <input
                        type="url"
                        name="linkedin"
                        defaultValue={bio?.linkedin || ''}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div className="form-group">
                      <label>Resume URL</label>
                      <input
                        type="url"
                        name="resume"
                        defaultValue={bio?.resume || ''}
                        placeholder="https://drive.google.com/your-resume"
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        defaultValue={bio?.phone || ''}
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        name="location"
                        defaultValue={bio?.location || ''}
                        placeholder="City, Country"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Roles (comma-separated) *</label>
                      <input
                        type="text"
                        name="roles"
                        defaultValue={bio?.roles?.join(', ') || ''}
                        placeholder="MERN Stack Developer, Frontend Developer, ..."
                        required
                      />
                      <small className="form-hint">
                        Separate multiple roles with commas
                      </small>
                    </div>

                    <div className="form-group full-width">
                      <div className="form-actions">
                        <button type="submit" className="save-btn">
                          Update Bio
                        </button>
                        <button
                          type="button"
                          className="cancel-btn"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="bio-view">
                  <div className="bio-card">
                    <div className="bio-section">
                      <h3>Profile Image</h3>
                      {bio?.profileImage ? (
                        <div style={{ marginTop: '10px' }}>
                          <img
                            src={(() => {
                              const apiUrl =
                                import.meta.env.VITE_API_URL ||
                                'http://localhost:5000/api'
                              const baseUrl = apiUrl.replace('/api', '')
                              return `${baseUrl}${bio.profileImage}`
                            })()}
                            alt="Profile"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.style.display = 'none'
                            }}
                            style={{
                              width: '150px',
                              height: '150px',
                              objectFit: 'cover',
                              borderRadius: '50%',
                              border: '3px solid #ddd',
                            }}
                          />
                        </div>
                      ) : (
                        <p>Not set</p>
                      )}
                    </div>

                    <div className="bio-section">
                      <h3>Name</h3>
                      <p>{bio?.name || 'Not set'}</p>
                    </div>

                    <div className="bio-section">
                      <h3>Email</h3>
                      <p>{bio?.email || 'Not set'}</p>
                    </div>

                    <div className="bio-section">
                      <h3>Phone</h3>
                      <p>{bio?.phone || 'Not set'}</p>
                    </div>

                    <div className="bio-section">
                      <h3>Location</h3>
                      <p>{bio?.location || 'Not set'}</p>
                    </div>

                    <div className="bio-section full-width">
                      <h3>Description</h3>
                      <p>{bio?.description || 'Not set'}</p>
                    </div>

                    <div className="bio-section full-width">
                      <h3>Roles</h3>
                      <div className="roles-display">
                        {bio?.roles && bio.roles.length > 0 ? (
                          bio.roles.map((role, index) => (
                            <span key={index} className="role-tag">
                              {role}
                            </span>
                          ))
                        ) : (
                          <p>Not set</p>
                        )}
                      </div>
                    </div>

                    <div className="bio-section">
                      <h3>GitHub</h3>
                      <p>
                        {bio?.github ? (
                          <a
                            href={bio.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {bio.github}
                          </a>
                        ) : (
                          'Not set'
                        )}
                      </p>
                    </div>

                    <div className="bio-section">
                      <h3>LinkedIn</h3>
                      <p>
                        {bio?.linkedin ? (
                          <a
                            href={bio.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {bio.linkedin}
                          </a>
                        ) : (
                          'Not set'
                        )}
                      </p>
                    </div>

                    <div className="bio-section">
                      <h3>Resume</h3>
                      <p>
                        {bio?.resume ? (
                          <a
                            href={bio.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Resume
                          </a>
                        ) : (
                          'Not set'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="projects-management">
              <div className="management-header">
                <h2>Manage Projects ({projects.length})</h2>
                <button
                  className="add-btn"
                  onClick={() => {
                    setEditMode(true)
                    setEditType('project')
                    setEditData(null)
                  }}
                >
                  + Add New Project
                </button>
              </div>

              {editMode && editType === 'project' ? (
                <div className="edit-form">
                  <h3>{editData ? 'Edit Project' : 'Create New Project'}</h3>
                  <form onSubmit={handleCreateProject}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Title *</label>
                        <input
                          type="text"
                          name="title"
                          defaultValue={editData?.title || ''}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Date</label>
                        <input
                          type="text"
                          name="date"
                          defaultValue={editData?.date || ''}
                          placeholder="Jan 2024 - Present"
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Description *</label>
                        <textarea
                          name="description"
                          defaultValue={editData?.description || ''}
                          required
                          rows="4"
                        />
                      </div>
                      <div className="form-group">
                        <label>GitHub URL</label>
                        <input
                          type="url"
                          name="github"
                          defaultValue={editData?.github || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label>Live Demo URL</label>
                        <input
                          type="url"
                          name="webapp"
                          defaultValue={editData?.webapp || ''}
                        />
                      </div>
                      <div className="form-group">
                        <label>Category</label>
                        <select
                          name="category"
                          defaultValue={editData?.category || 'web app'}
                        >
                          <option value="web app">Web App</option>
                          <option value="mobile app">Mobile App</option>
                          <option value="android app">Android App</option>
                          <option value="machine learning">
                            Machine Learning
                          </option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Featured</label>
                        <select
                          name="featured"
                          defaultValue={editData?.featured || 'false'}
                        >
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      </div>
                      <div className="form-group full-width">
                        <label>Tags (comma-separated)</label>
                        <input
                          type="text"
                          name="tags"
                          defaultValue={editData?.tags?.join(', ') || ''}
                          placeholder="React, Node.js, MongoDB"
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Image URL</label>
                        <input
                          type="url"
                          name="image"
                          defaultValue={editData?.image || ''}
                          placeholder="https://example.com/image.png"
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="save-btn">
                        {editData ? 'Update' : 'Create'} Project
                      </button>
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                          setEditMode(false)
                          setEditData(null)
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="projects-list">
                  {projects.length === 0 ? (
                    <div className="empty-state">
                      <p>No projects found. Add your first project!</p>
                    </div>
                  ) : (
                    projects.map((project) => (
                      <div key={project._id} className="project-item">
                        <div className="project-info">
                          <h3>{project.title}</h3>
                          <p className="project-date">{project.date}</p>
                          <p className="project-description">
                            {project.description.substring(0, 100)}...
                          </p>
                          <div className="project-tags">
                            {project.tags?.slice(0, 3).map((tag) => (
                              <span key={tag} className="tag">
                                {tag}
                              </span>
                            ))}
                            {project.tags?.length > 3 && (
                              <span className="tag">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                          <div className="project-meta">
                            <span>Category: {project.category}</span>
                            <span>
                              Featured: {project.featured ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                        <div className="project-actions">
                          <button
                            className="edit-btn"
                            onClick={() => {
                              setEditMode(true)
                              setEditType('project')
                              setEditData(project)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteProject(project._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="experiences-management">
              <div className="management-header">
                <h2>Manage Experience ({experiences.length})</h2>
                <button
                  className="add-btn"
                  onClick={() => {
                    setEditMode(true)
                    setEditType('experience')
                    setEditData(null)
                  }}
                >
                  + Add New Experience
                </button>
              </div>

              {editMode && editType === 'experience' ? (
                <div className="edit-form">
                  <h3>
                    {editData ? 'Edit Experience' : 'Create New Experience'}
                  </h3>
                  <form onSubmit={handleCreateExperience}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Role *</label>
                        <input
                          type="text"
                          name="role"
                          defaultValue={editData?.role || ''}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Company *</label>
                        <input
                          type="text"
                          name="company"
                          defaultValue={editData?.company || ''}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Date *</label>
                        <input
                          type="text"
                          name="date"
                          defaultValue={editData?.date || ''}
                          placeholder="Jan 2023 - Present"
                          required
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Description *</label>
                        <textarea
                          name="desc"
                          defaultValue={editData?.desc || ''}
                          required
                          rows="4"
                        />
                      </div>
                      <div className="form-group">
                        <label>Logo Image File *</label>
                        <input
                          type="file"
                          name="imgFile"
                          accept="image/*"
                          required={!editData}
                        />
                        {editData?.imgFile && (
                          <small>Current: {editData?.imgFile}</small>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Document Image File</label>
                        <input type="file" name="docFile" accept="image/*" />
                        {editData?.docFile && (
                          <small>Current: {editData?.docFile}</small>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Document URL</label>
                        <input
                          type="url"
                          name="doc"
                          defaultValue={editData?.doc || ''}
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Skills (comma-separated)</label>
                        <input
                          type="text"
                          name="skills"
                          defaultValue={editData?.skills?.join(', ') || ''}
                          placeholder="HTML, CSS, JavaScript"
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="save-btn">
                        {editData ? 'Update' : 'Create'} Experience
                      </button>
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                          setEditMode(false)
                          setEditData(null)
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="experiences-list">
                  {experiences.length === 0 ? (
                    <div className="empty-state">
                      <p>No experiences found. Add your first experience!</p>
                    </div>
                  ) : (
                    experiences.map((experience) => (
                      <div key={experience._id} className="experience-item">
                        <div className="experience-info">
                          <h3>{experience.role}</h3>
                          <p className="experience-company">
                            {experience.company}
                          </p>
                          <p className="experience-date">{experience.date}</p>
                          <p className="experience-description">
                            {experience.desc.substring(0, 100)}...
                          </p>
                          <div className="experience-skills">
                            {experience.skills?.slice(0, 3).map((skill) => (
                              <span key={skill} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                            {experience.skills?.length > 3 && (
                              <span className="skill-tag">
                                +{experience.skills.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="experience-actions">
                          <button
                            className="edit-btn"
                            onClick={() => {
                              setEditMode(true)
                              setEditType('experience')
                              setEditData(experience)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteExperience(experience._id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="education-management">
              <div className="management-header">
                <h2>Manage Education ({education.length})</h2>
                <button
                  className="add-btn"
                  onClick={() => {
                    setEditMode(true)
                    setEditType('education')
                    setEditData(null)
                  }}
                >
                  + Add New Education
                </button>
              </div>

              {editMode && editType === 'education' ? (
                <div className="edit-form">
                  <h3>
                    {editData ? 'Edit Education' : 'Create New Education'}
                  </h3>
                  <form onSubmit={handleCreateEducation}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>School *</label>
                        <input
                          type="text"
                          name="school"
                          defaultValue={editData?.school || ''}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Degree *</label>
                        <input
                          type="text"
                          name="degree"
                          defaultValue={editData?.degree || ''}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Date *</label>
                        <input
                          type="text"
                          name="date"
                          defaultValue={editData?.date || ''}
                          placeholder="2019 - 2023"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Grade</label>
                        <input
                          type="text"
                          name="grade"
                          defaultValue={editData?.grade || ''}
                          placeholder="7.15 CGPA"
                        />
                      </div>
                      <div className="form-group full-width">
                        <label>Description</label>
                        <textarea
                          name="desc"
                          defaultValue={editData?.desc || ''}
                          rows="3"
                        />
                      </div>
                      <div className="form-group">
                        <label>Image File</label>
                        <input type="file" name="imgFile" accept="image/*" />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="save-btn">
                        {editData ? 'Update' : 'Create'} Education
                      </button>
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                          setEditMode(false)
                          setEditData(null)
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="education-list">
                  {education.length === 0 ? (
                    <div className="empty-state">
                      <p>
                        No education records found. Add your first education!
                      </p>
                    </div>
                  ) : (
                    education.map((edu) => (
                      <div key={edu._id} className="education-item">
                        <div className="education-info">
                          <h3>{edu.school}</h3>
                          <p className="education-degree">{edu.degree}</p>
                          <p className="education-date">{edu.date}</p>
                          <p className="education-grade">{edu.grade}</p>
                          <p className="education-description">
                            {edu.desc?.substring(0, 100)}...
                          </p>
                        </div>
                        <div className="education-actions">
                          <button
                            className="edit-btn"
                            onClick={() => {
                              setEditMode(true)
                              setEditType('education')
                              setEditData(edu)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteEducation(edu._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="skills-management">
              <div className="management-header">
                <h2>Manage Skills ({skills.length})</h2>
                <button
                  className="add-btn"
                  onClick={() => {
                    setEditMode(true)
                    setEditType('skill')
                    setEditData(null)
                    setSkillCount(1) // Reset to 1 for new skill category
                  }}
                >
                  + Add New Skill Category
                </button>
              </div>

              {editMode && editType === 'skill' ? (
                <div className="edit-form">
                  <h3>
                    {editData
                      ? 'Edit Skill Category'
                      : 'Create New Skill Category'}
                  </h3>
                  <form onSubmit={handleCreateSkill}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Category Title *</label>
                        <input
                          type="text"
                          name="title"
                          defaultValue={editData?.title || ''}
                          placeholder="Frontend, Backend, Tools"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Number of Skills</label>
                        <div
                          style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <input
                            type="number"
                            min="1"
                            max="20"
                            value={skillCount}
                            onChange={(e) =>
                              setSkillCount(parseInt(e.target.value) || 1)
                            }
                            required
                            style={{ flex: 1 }}
                          />
                          <button
                            type="button"
                            onClick={() => setSkillCount(skillCount + 1)}
                            style={{
                              padding: '5px 10px',
                              background: '#4CAF50',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                            }}
                          >
                            Add More
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="skills-input-container full-width">
                      <h4>Skills Details</h4>
                      {Array.from({ length: skillCount }, (_, i) => (
                        <div key={i} className="skill-input-group">
                          <h5>Skill {i + 1}</h5>
                          <div className="skill-fields">
                            <div className="form-group">
                              <label>Skill Name *</label>
                              <input
                                type="text"
                                name={`skill_${i}_name`}
                                defaultValue={editData?.skills?.[i]?.name || ''}
                                placeholder="e.g., React, CSS, Python"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Skill Image (File)</label>
                              <input
                                type="file"
                                name={`imgFile_${i}`}
                                accept="image/*"
                              />
                              {editData?.skills?.[i]?.image && (
                                <small>
                                  Current image: {editData.skills[i].image}
                                  <br />
                                  <img
                                    src={(() => {
                                      const apiUrl =
                                        import.meta.env.VITE_API_URL ||
                                        'http://localhost:5000/api'
                                      const baseUrl = apiUrl.replace('/api', '')
                                      return `${baseUrl}${editData.skills[i].image}`
                                    })()}
                                    alt="current"
                                    onError={(e) => {
                                      e.target.onerror = null
                                      e.target.style.display = 'none'
                                    }}
                                    style={{
                                      width: '50px',
                                      height: '50px',
                                      objectFit: 'contain',
                                      marginTop: '5px',
                                    }}
                                  />
                                </small>
                              )}
                            </div>
                            <div className="form-group">
                              <label>Proficiency Level (%) (0-100)</label>
                              <input
                                type="number"
                                name={`skill_${i}_proficiency`}
                                defaultValue={
                                  editData?.skills?.[i]?.proficiency || 80
                                }
                                min="0"
                                max="100"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="save-btn">
                        {editData ? 'Update' : 'Create'} Skill Category
                      </button>
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => {
                          setEditMode(false)
                          setEditData(null)
                          setSkillCount(1)
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="skills-list">
                  {skills.length === 0 ? (
                    <div className="empty-state">
                      <p>
                        No skill categories found. Add your first skill
                        category!
                      </p>
                    </div>
                  ) : (
                    skills.map((skill) => (
                      <div key={skill._id} className="skill-item">
                        <div className="skill-info">
                          <h3>{skill.title}</h3>
                          <div className="skill-items">
                            {skill.skills?.slice(0, 5).map((item, index) => (
                              <span key={index} className="skill-tag">
                                {item.name}
                                {item.image && ' 📷'}
                              </span>
                            ))}
                            {skill.skills?.length > 5 && (
                              <span className="skill-tag">
                                +{skill.skills.length - 5} more
                              </span>
                            )}
                          </div>
                          <p>
                            {skill.skills?.length || 0} skills in this category
                            ({skill.skills?.filter((s) => s.image).length || 0}{' '}
                            with images)
                          </p>
                        </div>
                        <div className="skill-actions">
                          <button
                            className="edit-btn"
                            onClick={() => {
                              setEditMode(true)
                              setEditType('skill')
                              setEditData(skill)
                              setSkillCount(skill.skills?.length || 1)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteSkill(skill._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard
