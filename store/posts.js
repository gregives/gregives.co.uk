import postSlugs from '~/contents/blog'

export const state = () => ({
  post: {},
  posts: []
})

export const mutations = {
  SET_POST(state, post) {
    state.post = post
  },
  SET_POSTS(state, posts) {
    state.posts = posts
  }
}

async function loadPost(postSlug) {
  const post = await import(`~/contents/blog/${postSlug}.md`)
  post.attributes.slug = postSlug
  post.attributes.date = new Date(post.attributes.date)
  post.attributes.link = `/blog/${postSlug}`
  post.attributes.mins = Math.round(post.vue.render.split(' ').length / 265)
  post.attributes.mins = post.attributes.mins || 0 // Minutes >= 1

  return post
}

export const actions = {
  async GET_POST({ commit }, postSlug) {
    try {
      const post = await loadPost(postSlug)

      commit('SET_POST', {
        ...post.attributes,
        vue: post.vue
      })
    } catch {
      throw new Error('Post not found')
    }
  },
  async GET_POSTS({ commit }) {
    const posts = await Promise.all(
      postSlugs.map(async (postSlug) => {
        const post = await loadPost(postSlug)
        return {
          ...post.attributes
        }
      })
    )
    posts.sort((postA, postB) => postB.date - postA.date)

    commit('SET_POSTS', posts)
  }
}
