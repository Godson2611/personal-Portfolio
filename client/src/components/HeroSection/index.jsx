import Typewriter from 'typewriter-effect'
import HeroImg from '../../assets/images/HeroImage.jpg'
import HeroBgAnimation from '../HeroBgAnimation'
import {
  HeroBg,
  HeroContainer,
  HeroInnerContainer,
  HeroLeftContainer,
  HeroRightContainer,
  Img,
  ResumeButton,
  Span,
  SubTitle,
  TextLoop,
  Title,
} from './HeroStyle'

const HeroSection = ({ bio }) => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
  const baseUrl = apiUrl.replace('/api', '')

  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <HeroBgAnimation />
        </HeroBg>
        <HeroInnerContainer>
          <HeroLeftContainer id="Left">
            <Title>
              Hi, I am <br /> {bio?.name || 'Your Name'}
            </Title>
            <TextLoop>
              I am a
              <Span>
                <Typewriter
                  options={{
                    strings: bio?.roles || ['Web Developer'],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Span>
            </TextLoop>
            <SubTitle>
              {bio?.description || 'Add your description here'}
            </SubTitle>
            <ResumeButton href={bio?.resume || '#'} target="display">
              Check Resume
            </ResumeButton>
          </HeroLeftContainer>
          <HeroRightContainer id="Right">
            <Img
              src={
                bio?.profileImage ? `${baseUrl}${bio.profileImage}` : HeroImg
              }
              alt="profile"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = HeroImg
              }}
            />
          </HeroRightContainer>
        </HeroInnerContainer>
      </HeroContainer>
    </div>
  )
}

export default HeroSection
