import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { getPortfolio } from './api/portfolioApi.js'
import './App.css'
import Contact from './components/Contact'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Education from './components/Education'
import Experience from './components/Experience'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection/index.jsx'
import Navbar from './components/Navbar/index.jsx'
import ProjectDetails from './components/ProjectDetails/index.jsx'
import Projects from './components/Projects/index.jsx'
import Skills from './components/Skills/index.jsx'
import { darkTheme, lightTheme } from './themes/Themes.js'

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
`

const Wrapper = styled.div`
  background:
    linear-gradient(
      38.73deg,
      rgba(255, 165, 0, 0.15) 0%,
      rgba(255, 165, 0, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(255, 255, 0, 0) 50%,
      rgba(255, 255, 0, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
  transition: background-color 0.5s ease;
`

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [openModal, setOpenModal] = useState({ state: false, project: null })
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio()
        setPortfolioData(data)
      } catch (error) {
        console.error('Error fetching portfolio:', error)
        // Fallback to local data if API fails
        const localData = {
          bio: {
            name: 'Godson S',
            roles: ['MERN Stack Developer', 'Programmer'],
            description: 'BTech IT graduate...',
            github: 'https://github.com/Godson2611',
            linkedin: 'https://linkedin.com/in/godson-s',
            resume: '#',
          },
          projects: [],
          experiences: [],
          education: [],
          skills: [],
        }
        setPortfolioData(localData)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [])

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: darkMode ? '#0f1624' : '#ffffff',
          color: darkMode ? '#ffffff' : '#000000',
        }}
      >
        Loading Portfolio...
      </div>
    )
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route path="/admin/*" element={<Dashboard />} />
          <Route
            path="/"
            element={
              <>
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                <Body>
                  <HeroSection bio={portfolioData.bio} />
                  <Wrapper>
                    <Skills skills={portfolioData.skills} />
                    <Experience experiences={portfolioData.experiences} />
                  </Wrapper>
                  <Projects
                    projects={portfolioData.projects}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                  />
                  <Wrapper>
                    <Education education={portfolioData.education} />
                    <Contact />
                  </Wrapper>
                  <Footer bio={portfolioData.bio} />
                  {openModal.state && (
                    <ProjectDetails
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                    />
                  )}
                </Body>
              </>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
