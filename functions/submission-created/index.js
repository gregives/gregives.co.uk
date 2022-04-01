import nodemailer from 'nodemailer'
import fauna from 'faunadb'

const { query: q } = fauna

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

// Setup fauna client
const client = new fauna.Client({
  secret: process.env.FAUNA_API_KEY,
  domain: 'db.eu.fauna.com',
  port: 443,
  scheme: 'https',
  keepAlive: process.env.NETLIFY_DEV !== 'true'
})

export async function handleFormSubmission({ payload }) {
  // Form name can be defined in either the payload or the data
  const { data, form_name: formName = data['form-name'] } = payload

  if (formName === 'Contact Form') {
    const { name, email, subject, message } = data

    // Send an email to myself so I can reply
    await transporter.sendMail({
      from: `"${name}" <greg@gregives.co.uk>`,
      sender: 'greg@gregives.co.uk',
      to: 'greg@gregives.co.uk',
      replyTo: email,
      subject,
      text: message
    })
  } else if (formName === 'Comment Form') {
    const { name, text, url } = data

    if (!(name && text && url)) {
      return { message: 'Comment ignored' }
    }

    // Comment to add to that page
    const newComment = {
      name,
      text,
      date: Date.now()
    }

    // Check if the page is in fauna
    const inFauna = await client.query(q.Exists(q.Match(q.Index('url'), url)))

    if (inFauna) {
      const document = await client.query(q.Get(q.Match(q.Index('url'), url)))

      // Add the new comment to the existing comments
      await client.query(
        q.Update(document.ref, {
          data: {
            comments: [...(document.data.comments || []), newComment]
          }
        })
      )
    } else {
      // Create a new page with the new comment
      await client.query(
        q.Create(q.Collection('pages'), {
          data: {
            url,
            views: 0,
            comments: [newComment]
          }
        })
      )
    }
  }

  return { message: 'Success' }
}

export async function handler(event) {
  const body = JSON.parse(event.body)
  const response = await handleFormSubmission(body)

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}
