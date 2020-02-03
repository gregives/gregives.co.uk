<template>
  <main class="post">
    <post-article :post="post" :project="false" />
  </main>
</template>

<script>
import PostArticle from '~/components/PostArticle'
import { postLoader } from '~/contents/blog'

export default {
  components: {
    PostArticle
  },
  async asyncData({ params, error }) {
    try {
      const post = await postLoader(params.post)
      return {
        post: {
          ...post.attributes,
          vue: post.vue
        }
      }
    } catch {
      error({ statusCode: 404, message: 'This post could not be found' })
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.post {
  @include page;
}
</style>
