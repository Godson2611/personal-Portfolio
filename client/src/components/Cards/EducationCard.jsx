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

const Card = styled.div`
  width: 100%;
  max-width: 800px;
  background: ${({ theme }) => theme.card || '#1a1a1a'};
  border-radius: 16px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.text_secondary + '20'};
  margin: 0 auto;
  animation: ${fadeInUp} 0.6s ease-out;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    border-color: ${({ theme }) => theme.text_secondary + '40'};
  }

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 12px;
    gap: 20px;
    margin: 0 16px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: center;
    text-align: center;
  }
`

const LogoContainer = styled.div`
  width: 80px;
  height: 80px;
  min-width: 80px;
  border-radius: 12px;
  background: ${({ theme }) => theme.text_secondary + '10'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 8px;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    min-width: 70px;
  }
`

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const HeaderContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const SchoolName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

const Degree = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 4px;

  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`

const DateBadge = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.text_secondary + '10'};
  padding: 6px 12px;
  border-radius: 6px;
`

const GradeBadge = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + '15'};
  padding: 6px 12px;
  border-radius: 6px;
`

const Description = styled.div`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.text_primary};
  padding: 20px;
  background: ${({ theme }) => theme.text_secondary + '08'};
  border-radius: 12px;
  border-left: 3px solid ${({ theme }) => theme.primary};

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 16px;
  }
`

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
`

const SkillItem = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  background: ${({ theme }) => theme.text_secondary + '08'};
  padding: 10px 16px;
  border-radius: 8px;
  border-left: 2px solid ${({ theme }) => theme.primary};

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 8px 12px;
  }
`

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.text_secondary + '20'};
  width: 100%;
  margin: 8px 0;
`

const EducationCard = ({ education }) => {
  const getImageUrl = (path) => {
    if (!path) return null
    if (path.startsWith('http')) return path
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    const baseUrl = apiUrl.replace('/api', '')
    return `${baseUrl}${path}`
  }

  const logoSrc =
    getImageUrl(education.imgFile) ||
    getImageUrl(education.img) ||
    `https://ui-avatars.com/api/?name=${education.school}&background=random&color=fff&size=256`

  // const coursework = [
  //   'Software Engineering',
  //   'Web Development',
  //   'Database Systems',
  //   'Network Security',
  //   'Machine Learning',
  //   'Cloud Computing',
  //   'Computer Architecture',
  //   'Artificial Intelligence',
  // ]

  return (
    <Card>
      <Header>
        <LogoContainer>
          <Logo
            src={logoSrc}
            alt={education.school}
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${education.school}&background=random&color=fff&size=256`
            }}
          />
        </LogoContainer>
        <HeaderContent>
          <SchoolName>{education.school}</SchoolName>
          <Degree>{education.degree}</Degree>
          <InfoRow>
            <DateBadge>{education.date}</DateBadge>
            {education.grade && <GradeBadge>{education.grade}</GradeBadge>}
          </InfoRow>
        </HeaderContent>
      </Header>

      <Description>
        {education.desc ||
          "I successfully completed my Bachelor's degree in Information Technology (B.Tech in Information and Technology) from Park College of Engineering and Technology in September 2023. Throughout the four-year program, I completed 8 semesters with a CGPA of 7.15. My coursework covered a wide range of subjects including Software Engineering, Computer Architecture, Web Development, Databases, Network Security, and Artificial Intelligence."}
      </Description>

      {/* <Divider />

      <div>
        <SectionTitle>Key Coursework</SectionTitle>
        <SkillsContainer>
          {coursework.map((skill, index) => (
            <SkillItem key={index}>{skill}</SkillItem>
          ))}
        </SkillsContainer>
      </div> */}
    </Card>
  )
}

export default EducationCard
