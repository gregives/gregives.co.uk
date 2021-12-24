const nodemailer = require('nodemailer')

// Use Gmail SMTP server
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD
  }
})

module.exports.handler = async (event) => {
  const payload = JSON.parse(event.body).payload
  const { name, email, subject, message } = payload.data

  await transporter.sendMail({
    from: `"${name}" <greg@gregives.co.uk>`,
    sender: 'greg@gregives.co.uk',
    to: 'greg@gregives.co.uk',
    replyTo: email,
    subject,
    text: message
  })

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' })
  }
}
