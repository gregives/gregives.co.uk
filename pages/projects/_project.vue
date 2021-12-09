<template>
  <main class="project">
    <post-article :post="project" type="project" />
  </main>
</template>

<script>
import { hydrateWhenIdle } from 'vue-lazy-hydration'
import { projectLoader } from '~/contents/projects'

export default {
  components: {
    PostArticle: hydrateWhenIdle(() => import('~/components/PostArticle'))
  },
  async asyncData({ params, error }) {
    try {
      const project = await projectLoader(params.project)
      return {
        project: {
          ...project.attributes,
          vue: project.vue
        }
      }
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
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.project.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.project.description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://gregives.co.uk${this.project.link}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://gregives.co.uk${this.project.link}/og.png`
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.project {
  @include page;
}
</style>
