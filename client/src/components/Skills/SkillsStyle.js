import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 0;

  @media (max-width: 960px) {
    padding: 60px 0;
  }
`

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0 20px;
  gap: 12px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`

export const Title = styled.h2`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`

export const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
    padding: 0 20px;
  }
`

export const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  width: 100%;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 20px;
  }
`

export const Skill = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  padding: 24px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: rgba(23, 92, 230, 0.25) 0px 8px 32px;
  }
`

export const SkillTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`

export const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${({ theme }) => theme.text_primary}15;
  border-radius: 12px;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.text_primary}25;
  }
`

export const SkillImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: contain;
  background: ${({ theme }) => theme.white};
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`

export const SkillContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0; /* Prevent overflow */
`

export const SkillName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ProficiencyBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.text_secondary}20;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
`

export const ProficiencyFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #007bff, #00bfff);
  border-radius: 4px;
  transition: width 0.5s ease;
  position: absolute;
  left: 0;
  top: 0;
`

export const ProficiencyText = styled.span`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  color: ${({ theme }) => theme.text_primary};
  padding: 0 4px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  font-weight: 600;
`

export const ImagePlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`
