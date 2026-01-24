import axios from 'axios'

export const sendEmail = async (req, res) => {
  try {
    // Validate environment variables
    const apiKey = process.env.BREVO_API_KEY
    const receiverEmail = process.env.RECEIVER_EMAIL
    const senderEmail = process.env.EMAIL_FROM

    if (!apiKey) {
      console.error('BREVO_API_KEY is not configured')
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: Email service not configured',
        error:
          process.env.NODE_ENV === 'development'
            ? 'Missing BREVO_API_KEY'
            : undefined,
      })
    }

    if (!receiverEmail || !senderEmail) {
      console.error('Missing email configuration:', {
        hasReceiverEmail: !!receiverEmail,
        hasSenderEmail: !!senderEmail,
      })
      return res.status(500).json({
        success: false,
        message: 'Email configuration incomplete on server',
        error:
          process.env.NODE_ENV === 'development'
            ? 'Missing RECEIVER_EMAIL or EMAIL_FROM'
            : undefined,
      })
    }

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

    // Send email to owner
    const ownerPayload = {
      sender: { email: senderEmail, name: 'Portfolio Contact Form' },
      to: [{ email: receiverEmail }],
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
    }

    // Send email to sender (confirmation)
    const senderPayload = {
      sender: { email: senderEmail, name: 'Portfolio Contact Form' },
      to: [{ email }],
      subject: `Re: ${subject} - Thank you for contacting us`,
      htmlContent: `
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

    const brevoApi = axios.create({
      baseURL: 'https://api.brevo.com/v3',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
    })

    // Send both emails
    await brevoApi.post('/smtp/email', ownerPayload)
    await brevoApi.post('/smtp/email', senderPayload)

    res.status(200).json({
      success: true,
      message: 'Email sent successfully! We will get back to you soon.',
    })
  } catch (error) {
    console.error('Email sending error:')
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status,
    })
    const errorMessage =
      error.response?.data?.message || error.message || 'Failed to send email'
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later.',
      error:
        process.env.NODE_ENV === 'development'
          ? {
              message: errorMessage,
              details: error.response?.data,
            }
          : undefined,
    })
  }
}
