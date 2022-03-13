<template>
  <main class="watches">
    <h1 class="watches__title"><span>Watches</span></h1>
    <div class="watches__intro">
      <markdown :markdown="markdown" />
    </div>
    <ol class="watches__watches">
      <watch-card
        v-for="(watch, index) in watches"
        :key="watch.title"
        :watch="watch"
        :hero="index === 0"
      />
    </ol>
  </main>
</template>

<script>
import { postLoader, postSlugs } from '~/contents/watches'
import WatchCard from '~/components/WatchCard'

export default {
  components: {
    WatchCard
  },
  async asyncData() {
    const { vue } = await import('~/contents/watches.md')

    const watches = await Promise.all(
      postSlugs.map(async (postSlug) => {
        const post = await postLoader(postSlug)
        return {
          ...post.attributes
        }
      })
    )
    watches.sort((postA, postB) => postB.date - postA.date)

    return {
      markdown: {
        vue
      },
      watches
    }
  },
  head() {
    return {
      title: 'Watches'
    }
  }
}
</script>

<style lang="scss">
.watches {
  @include page;
}

.watches__title {
  @include title;

  color: $color__primary;
  margin: -1rem 0 0;
  text-align: center;
  width: 100%;

  > span {
    font-size: 200%;
  }
}

.watches__intro {
  backdrop-filter: blur(0.25rem) brightness(1.1);
  border: $border-weight solid $color__primary--muter;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  margin-top: calc(-5% - 1.25rem);
  padding: calc(5% + 1rem) 1.5rem 1.5rem;
  text-align: center;
  z-index: 1;

  > .markdown {
    margin-left: auto;
    margin-right: auto;
    max-width: 80ch;
  }
}

.watches__watches {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 3rem;
  margin-top: 3rem;

  @media (min-width: $breakpoint--md) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}
</style>
