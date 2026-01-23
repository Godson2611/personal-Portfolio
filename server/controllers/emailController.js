import nodemailer from 'nodemailer'

const getTransporter = () => {
  const emailUser = process.env.EMAIL_USER
  const emailPassword = process.env.EMAIL_PASSWORD

  if (!emailUser || !emailPassword) {
    throw new Error(
      `Email credentials not configured. EMAIL_USER: ${emailUser ? 'set' : 'not set'}, EMAIL_PASSWORD: ${emailPassword ? 'set' : 'not set'}`,
    )
  }

  return nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  })
}

export const sendEmail = async (req, res) => {
  try {
    const transporter = getTransporter()

    const { email, name, subject, message } = req.body

    if (!email || !name || !subject || !message) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all required fields: email, name, subject, message',
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      })
    }

    const mailOptionsToOwner = {
      from: process.env.EMAIL_FROM,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
                <h2>New Message from Your Portfolio</h2>
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
    }

    const mailOptionsToSender = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Re: ${subject} - Thank you for contacting us`,
      html: `
                <h2>Thank You for Contacting Us!</h2>
                <p>Hi ${name},</p>
                <p>We have received your message and will get back to you as soon as possible.</p>
                <hr />
                <p><strong>Your Message:</strong></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr />
                <p>Best regards,<br>Godson S</p>
            `,
    }

    await transporter.sendMail(mailOptionsToOwner)

    await transporter.sendMail(mailOptionsToSender)

    res.status(200).json({
      success: true,
      message: 'Email sent successfully! We will get back to you soon.',
    })
  } catch (error) {
    console.error('Email sending error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}
