import https from 'https'
import { join } from 'path'
import { createWriteStream, mkdirSync } from 'fs'
import dotenv from 'dotenv'
import routes from '../contents/routes'

// Load .env file
dotenv.config()

// Generate Open Graph images from script
if (require.main === module) {
  generateImages(routes)
}

function generateImages(routes) {
  const API_KEY = process.env.APIFLASH_KEY

  if (API_KEY !== undefined) {
    ;[...routes, '/'].forEach((route) => {
      // Create new file for Open Graph image
      const path = join(process.cwd(), 'static', route.slice(1))
      mkdirSync(path, { recursive: true })
      const file = createWriteStream(join(path, 'og.png'))

      // URL to corresponding meta page
      const url = encodeURIComponent(`https://gregives.co.uk/meta${route}`)

      // ApiFlash endpoint
      const api = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&format=png&height=630&response_type=image&ttl=2592000&url=${url}&width=1200&fresh=true`

      // Write response to stream
      https.get(api, (response) => {
        response.pipe(file)
        file.on('finish', file.close)
      })
    })
  }
}

export const openGraphTags = [
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website'
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'Greg Ives'
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: 'Greg Ives'
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: 'Personal site and portfolio of software engineer Greg Ives.'
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'https://gregives.co.uk/'
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: 'https://gregives.co.uk/og.png'
  },
  {
    hid: 'og:image:type',
    property: 'og:image:type',
    content: 'image/png'
  },
  {
    hid: 'og:image:width',
    property: 'og:image:width',
    content: '1200'
  },
  {
    hid: 'og:image:height',
    property: 'og:image:height',
    content: '630'
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image'
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: '@gregiv_es'
  }
]
