<template>
  <main class="watch">
    <post-article :post="watch" type="watch" />
  </main>
</template>

<script>
import { hydrateWhenIdle } from 'vue-lazy-hydration'
import { postLoader } from '~/contents/watches'

export default {
  components: {
    PostArticle: hydrateWhenIdle(() => import('~/components/PostArticle'))
  },
  async asyncData({ params, error }) {
    try {
      const watch = await postLoader(params.watch)
      return {
        watch: {
          ...watch.attributes,
          vue: watch.vue
        }
      }
    } catch {
      error({ statusCode: 404, message: 'This watch could not be found' })
    }
  },
  head() {
    return {
      title: this.watch.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.watch.description
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.watch.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.watch.description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `https://gregives.co.uk${this.watch.link}`
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: `https://gregives.co.uk${this.watch.link}/og.png`
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.watch {
  @include page;
}
</style>
