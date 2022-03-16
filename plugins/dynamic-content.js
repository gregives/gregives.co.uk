import { getDynamicContent } from '~/functions/dynamic-content'

// Netlify Functions endpoint
const ENDPOINT = '/.netlify/functions/dynamic-content'

export default (_context, inject) => {
  inject('dynamic', async (url) => {
    if (process.server) {
      // Call fauna directly if server-side rendering
      return await getDynamicContent({ url, visitedPageBefore: true })
    }

    // Get cached data from local storage
    const cache = JSON.parse(localStorage.getItem('pages')) || {}
    const visitedPageBefore = cache.hasOwnProperty(url)

    // Get views and comments from serverless function
    const { views, comments } = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        visitedPageBefore
      })
    }).then((response) => response.json())

    // Update the cache
    cache[url] = {
      lastVisited: Date.now(),
      views,
      comments
    }

    localStorage.setItem('pages', JSON.stringify(cache))
    return { views, comments }
  })
}
