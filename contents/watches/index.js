export async function postLoader(postSlug) {
  const post = await import(`~/contents/watches/${postSlug}.md`)
  post.attributes.slug = postSlug
  post.attributes.date = new Date(post.attributes.date)
  post.attributes.link = `/watches/${postSlug}/`
  post.attributes.mins = Math.round(post.body.length / 1250) || 1

  // Generate description from post
  post.attributes.description = (() => {
    let fragment
    if (process.server) {
      const { JSDOM } = require('jsdom')
      fragment = JSDOM.fragment(`<div>${post.html}</div>`).firstChild
    } else {
      fragment = document.createElement('div')
      fragment.innerHTML = post.html
    }

    return fragment.textContent
      .substring(0, 900)
      .split(' ')
      .slice(0, -1)
      .join(' ')
      .replace(/[^a-zA-Z0-9]+$/, '')
  })()

  return post
}

export const postSlugs = ['casio-duro']
