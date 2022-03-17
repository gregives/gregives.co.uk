const ENDPOINT = '/.netlify/functions/dynamic-content'

export default (_context, inject) => {
  inject('dynamic', async (url) => {
    // Check if the user has visited the page before
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
