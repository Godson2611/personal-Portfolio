/** @format */

import { Alert, Snackbar } from '@mui/material'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { sendContactEmail } from '../../api/portfolioApi'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`

const Title = styled.div`
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

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.button} 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  disabled: ${({ disabled }) => (disabled ? 'true' : 'false')};
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.3);
  }
`

const Contact = () => {
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [loading, setLoading] = useState(false)
  const form = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const emailData = {
        email: e.target.from_email.value,
        name: e.target.from_name.value,
        subject: e.target.subject.value,
        message: e.target.message.value,
      }

      await sendContactEmail(emailData)

      setMessage('Email sent successfully! Thank you for reaching out.')
      setMessageType('success')
      setOpen(true)
      form.current.reset()
    } catch (error) {
      console.error('Error sending email:', error)
      setMessage(
        error.response?.data?.message ||
          'Failed to send email. Please try again later.',
      )
      setMessageType('error')
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me</ContactTitle>
          <ContactInput
            placeholder="Your Email"
            name="from_email"
            type="email"
            required
            disabled={loading}
          />
          <ContactInput
            placeholder="Your Name"
            name="from_name"
            required
            disabled={loading}
          />
          <ContactInput
            placeholder="Subject"
            name="subject"
            required
            disabled={loading}
          />
          <ContactInputMessage
            placeholder="Message"
            rows="4"
            name="message"
            required
            disabled={loading}
          />
          <ContactButton
            type="submit"
            value={loading ? 'Sending...' : 'Send'}
            disabled={loading}
          />
        </ContactForm>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={messageType}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  )
}

export default Contact
