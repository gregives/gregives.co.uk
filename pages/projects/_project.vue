<template>
  <main class="project">
    <post-article :post="project" type="project" />
  </main>
</template>

<script>
import { projectLoader } from '~/contents/projects'
import PostArticle from '~/components/PostArticle'

export default {
  components: {
    PostArticle
  },
  async asyncData({ params, error }) {
    try {
      const project = await projectLoader(params.project)

      if (project.attributes.website || project.attributes.github) {
        throw new Error('Skipping rendering')
      }

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
          content: `https://gregives.co.uk${this.project.link}og.png`
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.project {
  @include page;
  @include background(
    ((calc(50% - 20rem) -5rem 30rem), (calc(50% + 10rem) 0 20rem))
  );
}
</style>
