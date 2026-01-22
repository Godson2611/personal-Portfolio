import { useState } from 'react'
import ProjectCard from '../Cards/ProjectCards'
import {
  CardContainer,
  Container,
  Desc,
  Divider,
  Title,
  ToggleButton,
  ToggleButtonGroup,
  Wrapper,
} from './ProjectsStyle'

const Projects = ({ projects = [], openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState('all')

  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects at web apps. Here are some
          of my projects.
        </Desc>
        <ToggleButtonGroup>
          {toggle === 'all' ? (
            <ToggleButton active value="all" onClick={() => setToggle('all')}>
              All
            </ToggleButton>
          ) : (
            <ToggleButton value="all" onClick={() => setToggle('all')}>
              All
            </ToggleButton>
          )}
          <Divider />
          {toggle === 'web app' ? (
            <ToggleButton
              active
              value="web app"
              onClick={() => setToggle('web app')}
            >
              WEB APP'S
            </ToggleButton>
          ) : (
            <ToggleButton value="web app" onClick={() => setToggle('web app')}>
              WEB APP'S
            </ToggleButton>
          )}
          <Divider />
          {toggle === 'android app' ? (
            <ToggleButton
              active
              value="android app"
              onClick={() => setToggle('android app')}
            >
              ANDROID APP'S
            </ToggleButton>
          ) : (
            <ToggleButton
              value="android app"
              onClick={() => setToggle('android app')}
            >
              ANDROID APP'S
            </ToggleButton>
          )}
          <Divider />
          {toggle === 'machine learning' ? (
            <ToggleButton
              active
              value="machine learning"
              onClick={() => setToggle('machine learning')}
            >
              MACHINE LEARNING
            </ToggleButton>
          ) : (
            <ToggleButton
              value="machine learning"
              onClick={() => setToggle('machine learning')}
            >
              MACHINE LEARNING
            </ToggleButton>
          )}
        </ToggleButtonGroup>
        <CardContainer>
          {projects && projects.length > 0 ? (
            toggle === 'all' ? (
              projects.map((project) => (
                <ProjectCard
                  key={project._id || project.id}
                  project={project}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                />
              ))
            ) : (
              projects
                .filter((item) => item.category === toggle)
                .map((project) => (
                  <ProjectCard
                    key={project._id || project.id}
                    project={project}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                  />
                ))
            )
          ) : (
            <p>No projects available</p>
          )}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects
