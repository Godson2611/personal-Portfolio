import styled, { keyframes } from 'styled-components'

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const ExperienceContainer = styled.div`
  background: ${({ theme }) => theme.card || '#1a1a1a'};
  border: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  border-radius: 16px;
  padding: 32px;
  position: relative;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${({ index }) => index * 0.1}s;

  &::before {
    content: '';
    position: absolute;
    top: 32px;
    ${({ index }) => (index % 2 === 0 ? 'right: -11px;' : 'left: -11px;')}
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
    background: ${({ theme }) => theme.card || '#1a1a1a'};
    border-right: 1px solid ${({ theme }) => theme.text_secondary + '20'};
    border-bottom: 1px solid ${({ theme }) => theme.text_secondary + '20'};
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: ${({ theme }) => theme.primary + '40'};

    &::before {
      border-color: ${({ theme }) => theme.primary + '40'};
    }
  }

  @media (max-width: 992px) {
    &::before {
      left: -11px !important;
      right: auto !important;
    }
  }

  @media (max-width: 768px) {
    padding: 24px;
  }
`

export const ExperienceHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
`

export const Logo = styled.div`
  width: 60px;
  height: 60px;
  min-width: 60px;
  border-radius: 12px;
  background: ${({ theme }) => theme.text_secondary + '15'};
  border: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 8px;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    min-width: 50px;
  }
`

export const HeaderContent = styled.div`
  flex: 1;
`

export const Role = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 4px 0;
  line-height: 1.4;
`

export const Company = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 4px;
`

export const Duration = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary + 'cc'};
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '📅';
    font-size: 12px;
  }
`

export const Description = styled.p`
  color: ${({ theme }) => theme.text_primary + 'cc'};
  line-height: 1.6;
  margin: 20px 0;
  font-size: 15px;
`

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`

export const Skill = styled.span`
  font-size: 12px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 20px;
  background: ${({ theme }) => theme.primary + '15'};
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary + '30'};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary + '25'};
    transform: translateY(-1px);
  }
`

export const CertificateButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary || '#854ce6'} 0%,
    ${({ theme }) => theme.secondary || '#6c3dd4'} 100%
  );
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  margin-top: 20px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(133, 76, 230, 0.3);
  }

  &::after {
    content: '→';
    transition: transform 0.2s ease;
  }

  &:hover::after {
    transform: translateX(4px);
  }
`

export const CertificateImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-top: 20px;
  border: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`

const ExperienceCard = ({ experience, index }) => {
  const getImageUrl = (path) => {
    if (!path) return null
    if (path.startsWith('http')) return path
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const baseUrl = apiUrl.replace('/api', '')
    return `${baseUrl}${path}`
  }

  const logoSrc =
    getImageUrl(experience.imgFile) ||
    getImageUrl(experience.img) ||
    `https://ui-avatars.com/api/?name=${experience.company}&background=random&color=fff&size=128`

  const docImageSrc =
    getImageUrl(experience.docFile) || getImageUrl(experience.docImg)

  return (
    <ExperienceContainer index={index}>
      <ExperienceHeader>
        <Logo>
          <img
            src={logoSrc}
            alt={experience.company}
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${experience.company}&background=random&color=fff&size=128`
            }}
          />
        </Logo>
        <HeaderContent>
          <Role>{experience.role}</Role>
          <Company>{experience.company}</Company>
          <Duration>{experience.date}</Duration>
        </HeaderContent>
      </ExperienceHeader>

      <Description>{experience.desc}</Description>

      {experience.skills && experience.skills.length > 0 && (
        <SkillsContainer>
          {experience.skills.map((skill, idx) => (
            <Skill key={idx}>{skill}</Skill>
          ))}
        </SkillsContainer>
      )}

      {docImageSrc && (
        <CertificateImage
          src={docImageSrc}
          alt="Certificate"
          onError={(e) => {
            console.error('Failed to load certificate image:', docImageSrc)
            e.target.style.display = 'none'
          }}
        />
      )}

      {experience.doc && (
        <CertificateButton
          href={experience.doc}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Certificate
        </CertificateButton>
      )}
    </ExperienceContainer>
  )
}

export default ExperienceCard
