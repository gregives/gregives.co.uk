import postSlugs from '~/contents/blog'

export const state = () => ({
  currentPost: {},
  posts: []
})

export const mutations = {
  setCurrentPost(state, post) {
    state.currentPost = post
  },
  setPosts(state, posts) {
    state.posts = posts
  }
}

async function loadPost(postSlug) {
  const post = await import(`~/contents/blog/${postSlug}.md`)
  post.attributes.slug = postSlug
  post.attributes.date = new Date(post.attributes.date)
  post.attributes.link = `/blog/${postSlug}`
  post.attributes.mins =
    Math.round((post.vue.render.split(' ').length - 10) / 265) || 1

  return post
}

export const actions = {
  async setCurrentPost({ commit }, postSlug) {
    try {
      const post = await loadPost(postSlug)

      commit('setCurrentPost', {
        ...post.attributes,
        vue: post.vue
      })
    } catch {
      throw new Error('Post not found')
    }
  },
  async setPosts({ commit }) {
    const posts = await Promise.all(
      postSlugs.map(async (postSlug) => {
        const post = await loadPost(postSlug)

        return {
          ...post.attributes
        }
      })
    )
    posts.sort((postA, postB) => postB.date - postA.date)

    commit('setPosts', posts)
  }
}
