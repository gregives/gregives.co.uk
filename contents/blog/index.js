export async function postLoader(postSlug) {
  const post = await import(`~/contents/blog/${postSlug}.md`)
  post.attributes.slug = postSlug
  post.attributes.date = new Date(post.attributes.date)
  post.attributes.link = `/blog/${postSlug}`
  post.attributes.mins =
    Math.round(post.vue.render.split(' ').length / 265) || 1

  return post
}

export const postSlugs = ['blog-post-2', 'build-a-blog-with-nuxt-and-markdown']
