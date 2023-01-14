<template>
  <main class="blog">
    <h1 class="blog__title">
      My <span class="blog__title--primary">Blog</span> Posts
    </h1>
    <ol class="blog__posts">
      <post-card v-for="post in posts" :key="post.title" :post="post" />
    </ol>
  </main>
</template>

<script>
import { hydrateWhenIdle } from 'vue-lazy-hydration'
import { postLoader, postSlugs } from '~/contents/blog'

export default {
  components: {
    PostCard: hydrateWhenIdle(() => import('~/components/PostCard'))
  },
  async asyncData() {
    const posts = await Promise.all(
      postSlugs.map(async (postSlug) => {
        const post = await postLoader(postSlug)

        return {
          ...post.attributes
        }
      })
    )
    posts.sort((postA, postB) => postB.date - postA.date)

    return {
      posts
    }
  },
  head() {
    return {
      title: 'Blog'
    }
  }
}
</script>

<style lang="scss">
.blog {
  @include page;
}

.blog__title {
  @include title;
}

.blog__title--primary {
  @include title--primary;
}

.blog__posts {
  display: grid;
  grid-gap: 1.5rem;
}
</style>
