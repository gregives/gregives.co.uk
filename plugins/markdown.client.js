const ENDPOINT = '/.netlify/functions/markdown-preview'

export default (_context, inject) => {
  inject('markdown', async (markdown) => {
    // Bypass serverless function if the markdown is empty
    if (markdown.length === 0) {
      return ''
    }

    // Render markdown using serverless function
    const preview = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(markdown)
    }).then((response) => response.json())

    return preview
  })
}
