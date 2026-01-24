import { useState } from 'react'
import {
  Container,
  Desc,
  ImagePlaceholder,
  Skill,
  SkillContent,
  SkillImage,
  SkillItem,
  SkillList,
  SkillName,
  SkillsContainer,
  SkillTitle,
  Title,
  Wrapper,
} from './SkillsStyle'

const Skills = ({ skills }) => {
  const [failedImages, setFailedImages] = useState(new Set())

  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''

    if (imagePath.startsWith('http')) {
      return imagePath
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const baseUrl = apiUrl.replace('/api', '')

    if (imagePath.startsWith('/uploads')) {
      return `${baseUrl}${imagePath}`
    }

    return `${baseUrl}/uploads/${imagePath}`
  }

  const handleImageError = (skillIndex, itemIndex, imageUrl) => {
    console.warn(`Image failed to load: ${imageUrl}`)
    const key = `${skillIndex}-${itemIndex}`
    setFailedImages((prev) => new Set(prev).add(key))
  }

  return (
    <Container id="skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>
          Here are some of my skills on which I have been working on for the
          past 2 years.
        </Desc>

        <SkillsContainer>
          {skills && skills.length > 0 ? (
            skills.map((skill, skillIndex) => (
              <Skill key={skill._id || skillIndex}>
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillList>
                  {skill.skills &&
                    skill.skills.map((item, itemIndex) => {
                      const imageKey = `${skillIndex}-${itemIndex}`
                      const hasFailedImage = failedImages.has(imageKey)
                      const imageUrl = getImageUrl(item.image)

                      return (
                        <SkillItem
                          key={item._id || `${skillIndex}-${itemIndex}`}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                            }}
                          >
                            <div style={{ flexShrink: 0 }}>
                              {!hasFailedImage && imageUrl ? (
                                <SkillImage
                                  src={imageUrl}
                                  alt={item.name}
                                  onError={() =>
                                    handleImageError(
                                      skillIndex,
                                      itemIndex,
                                      imageUrl,
                                    )
                                  }
                                  loading="lazy"
                                  style={{
                                    border: '1px solid #ddd',
                                    backgroundColor: 'white',
                                    padding: '4px',
                                  }}
                                />
                              ) : (
                                <ImagePlaceholder>
                                  {item.name.charAt(0).toUpperCase()}
                                </ImagePlaceholder>
                              )}
                            </div>

                            <SkillContent>
                              <SkillName>{item.name}</SkillName>
                            </SkillContent>
                          </div>
                        </SkillItem>
                      )
                    })}
                </SkillList>
              </Skill>
            ))
          ) : (
            <p
              style={{
                textAlign: 'center',
                color: '#666',
                gridColumn: '1/-1',
                padding: '40px 0',
              }}
            >
              No skills data available
            </p>
          )}
        </SkillsContainer>
      </Wrapper>
    </Container>
  )
}

export default Skills
