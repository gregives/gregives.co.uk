<template>
  <main class="project">
    <post-article :post="project" :project="true" />
  </main>
</template>

<script>
import PostArticle from '~/components/PostArticle'

export default {
  components: {
    PostArticle
  },
  computed: {
    project() {
      return this.$store.state.projects.project
    }
  },
  async fetch({ store, params, error }) {
    try {
      await store.dispatch('projects/GET_PROJECT', params.project)
    } catch {
      error({ statusCode: 404, message: 'This project could not be found' })
    }
  },
  head() {
    return {
      title: this.project.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.project.description
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.project {
  $clip-path: polygon(60% 0%, 100% 0%, 100% 100%, 30% 40%);
  @include page;
  @include dots($clip-path);

  &::before {
    height: 15rem;
  }
}
</style>
