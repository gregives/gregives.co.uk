export async function postLoader(postSlug) {
  const post = await import(`~/contents/blog/${postSlug}.md`)
  post.attributes.slug = postSlug
  post.attributes.date = new Date(post.attributes.date)
  post.attributes.link = `/blog/${postSlug}`
  post.attributes.mins = Math.round(post.body.length / 1250) || 1

  return post
}

export const postSlugs = ['build-a-blog-with-nuxt-and-markdown']
