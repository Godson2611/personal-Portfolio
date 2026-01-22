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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;
  background: ${({ theme }) => theme.bg || '#0a0a0a'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.primary || '#854ce6'} 50%,
      transparent 100%
    );
  }

  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  position: relative;
`

export const Header = styled.div`
  text-align: center;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  animation: ${fadeInUp} 0.6s ease-out;
`

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary || '#854ce6'} 0%,
    ${({ theme }) => theme.secondary || '#6c3dd4'} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.primary || '#854ce6'} 50%,
      transparent 100%
    );
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }
`

export const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary + 'cc'};
  line-height: 1.6;
  margin: 0;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

export const TimelineContainer = styled.div`
  width: 100%;
  position: relative;
  padding: 40px 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${({ theme }) => theme.primary + '40'} 20%,
      ${({ theme }) => theme.primary + '40'} 80%,
      transparent 100%
    );

    @media (max-width: 992px) {
      left: 30px;
    }
  }
`

export const TimelineItem = styled.div`
  display: flex;
  justify-content: ${({ index }) =>
    index % 2 === 0 ? 'flex-start' : 'flex-end'};
  margin-bottom: 80px;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: ${({ index }) => index * 0.1}s;
  position: relative;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 992px) {
    justify-content: flex-start;
    padding-left: 60px;
  }
`

export const TimelineMarker = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.bg || '#0a0a0a'};
  border: 2px solid ${({ theme }) => theme.primary + '40'};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;

  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primary || '#854ce6'};
    transition: all 0.3s ease;
  }

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    transform: translateX(-50%) scale(1.1);

    &::after {
      transform: scale(1.2);
    }
  }

  @media (max-width: 992px) {
    left: 30px;

    &:hover {
      transform: translateX(-50%) scale(1.1);
    }
  }
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  svg {
    font-size: 48px;
    opacity: 0.5;
  }
`
