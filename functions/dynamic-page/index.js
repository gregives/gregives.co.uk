const fauna = require('faunadb')
const { query: q } = fauna

// Setup fauna client
const client = new fauna.Client({
  secret: process.env.FAUNA_API_KEY,
  domain: 'db.eu.fauna.com',
  port: 443,
  scheme: 'https',
  keepAlive: process.env.NETLIFY_DEV !== 'true'
})

module.exports.handler = async (event) => {
  const { url, visitedPageBefore } = JSON.parse(event.body)

  // Check if this page is in fauna
  const inFauna = await client.query(q.Exists(q.Match(q.Index('url'), url)))

  const document = await (async () => {
    if (inFauna) {
      // Get the document from fauna
      const document = await client.query(q.Get(q.Match(q.Index('url'), url)))

      if (visitedPageBefore) {
        // If they have visited this page before then just return the document
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
      // If this page isn't in fauna then create it and return the new document
      return client.query(
        q.Create(q.Collection('pages'), {
          data: {
            url,
            views: 1,
            comments: []
          }
        })
      )
    }
  })()

  return {
    statusCode: 200,
    body: JSON.stringify({
      views: document.data.views,
      comments: document.data.comments || []
    })
  }
}
