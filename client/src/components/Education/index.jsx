import styled, { keyframes } from 'styled-components'
import EducationCard from '../Cards/EducationCard'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  background: ${({ theme }) => theme.bg || '#0a0a0a'};
  position: relative;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  animation: ${fadeIn} 0.8s ease-out;
`

const Header = styled.div`
  text-align: center;
  max-width: 800px;
  margin-bottom: 20px;
`

const Title = styled.h1`
  font-size: 42px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0 0 16px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`

const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.6;
  margin: 0 auto;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 32px;
  }
`

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 40px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  border: 2px dashed ${({ theme }) => theme.text_secondary + '30'};
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`

const EmptyText = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
`

const Education = ({ education = [] }) => {
  return (
    <Container id="education">
      <Wrapper>
        <Header>
          <Title>Education</Title>
          <Subtitle>
            My educational journey has been a path of continuous learning and
            growth, laying the foundation for my technical expertise and
            problem-solving skills.
          </Subtitle>
        </Header>

        <CardsContainer>
          {education.length > 0 ? (
            education.map((edu, index) => (
              <EducationCard key={edu._id || edu.id || index} education={edu} />
            ))
          ) : (
            <EmptyState>
              <EmptyText>No education data available</EmptyText>
            </EmptyState>
          )}
        </CardsContainer>
      </Wrapper>
    </Container>
  )
}

export default Education
