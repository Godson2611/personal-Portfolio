import axios from 'axios'

export const sendEmail = async (req, res) => {
  try {
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

    // Get Brevo API credentials from environment variables
    const brevoApiKey = process.env.BREVO_API_KEY

    if (!brevoApiKey) {
      throw new Error('BREVO_API_KEY is not configured')
    }

    // Email to owner (you)
    const emailDataToOwner = {
      sender: {
        name: `${name} (via Portfolio)`,
        email: process.env.EMAIL_FROM || 'noreply@yourportfolio.com',
      },
      to: [
        {
          email: process.env.RECEIVER_EMAIL,
          name: 'Godson S',
        },
      ],
      subject: `New Contact Form Submission: ${subject}`,
      htmlContent: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: {
        email: email,
        name: name,
      },
    }

    // Send email using Brevo API
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      emailDataToOwner,
      {
        headers: {
          'api-key': brevoApiKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    )

    console.log('Email sent successfully:', response.data.messageId)

    res.status(200).json({
      success: true,
      message: 'Email sent successfully! I will get back to you soon.',
    })
  } catch (error) {
    console.error('Email sending error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })

    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}
