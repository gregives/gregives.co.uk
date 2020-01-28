<template>
  <main class="post">
    <post-article :post="post" :project="false" />
  </main>
</template>

<script>
import PostArticle from '~/components/PostArticle'

export default {
  components: {
    PostArticle
  },
  computed: {
    post() {
      return this.$store.state.posts.post
    }
  },
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('posts/GET_POST', params.post)
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
  $clip-path: polygon(60% 0%, 100% 0%, 100% 100%, 30% 40%);
  @include page;
  @include dots($clip-path);

  &::before {
    height: 15rem;
  }
}
</style>
