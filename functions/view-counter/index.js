const fauna = require('faunadb')
const { query: q } = fauna

const client = new fauna.Client({
  secret: process.env.FAUNA_API_KEY,
  domain: 'db.eu.fauna.com',
  port: 443,
  scheme: 'https',
  keepAlive: false
})

const cache = {}
const recentViews = {}

module.exports.handler = async (event) => {
  const { url, uid, recentView } = JSON.parse(event.body)

  // Check if this page is already in the cache or in fauna
  const inCache = cache.hasOwnProperty(url)
  const inFauna =
    inCache || (await client.query(q.Exists(q.Match(q.Index('url'), url))))

  // Get document or create if it doesn't exist
  const document = await (() => {
    if (inCache) {
      // Get from cache
      return cache[url]
    } else if (inFauna) {
      // Get from fauna
      return client.query(q.Get(q.Match(q.Index('url'), url)))
    } else {
      // Create in fauna and return new document
      return client.query(
        q.Create(q.Collection('pages'), {
          data: {
            url,
            views: 0
          }
        })
      )
    }
  })()

  // Store each user's recent views in a set
  if (!recentViews.hasOwnProperty(uid)) {
    recentViews[uid] = new Set()
  }

  // Check if the user has recently viewed this page
  const recentlyViewed = recentView
    ? recentViews[uid].add(url) && true
    : recentViews[uid].has(url)

  // Increment view count if the user hasn't recently viewed this page
  if (!recentlyViewed) {
    recentViews[uid].add(url)

    cache[url] = await client.query(
      q.Update(document.ref, {
        data: {
          views: document.data.views + 1
        }
      })
    )
  }

  console.log({ cache, recentViews })

  return {
    statusCode: 200,
    body: JSON.stringify({
      views: document.data.views
    })
  }
}
