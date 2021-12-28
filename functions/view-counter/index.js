const fauna = require('faunadb')
const { query: q } = fauna

console.info(`Setting keepAlive: ${process.env.NETLIFY_DEV !== 'true'}`)

const client = new fauna.Client({
  secret: process.env.FAUNA_API_KEY,
  domain: 'db.eu.fauna.com',
  port: 443,
  scheme: 'https',
  keepAlive: process.env.NETLIFY_DEV !== 'true'
})

const cache = {}

module.exports.handler = async (event) => {
  const { url, recentlyViewed } = JSON.parse(event.body)

  // Check if this page is in the cache or in fauna
  const inCache = cache.hasOwnProperty(url)
  const inFauna =
    inCache || (await client.query(q.Exists(q.Match(q.Index('url'), url))))

  const document = await (async () => {
    if (inCache || inFauna) {
      // Get the document from cache or fauna
      const document = inCache
        ? cache[url]
        : await client.query(q.Get(q.Match(q.Index('url'), url)))

      if (recentlyViewed) {
        // If they have recently viewed the page then just return the document
        return document
      } else {
        // Otherwise, increment the view count and return the updated document
        return client.query(
          q.Update(document.ref, {
            data: {
              views: document.data.views + 1
            }
          })
        )
      }
    } else {
      // If this page isn't in the cache or fauna then create it and return the new document
      return client.query(
        q.Create(q.Collection('pages'), {
          data: {
            url,
            views: 1
          }
        })
      )
    }
  })()

  // Add document to cache
  cache[url] = document

  return {
    statusCode: 200,
    body: JSON.stringify({
      views: document.data.views
    })
  }
}
