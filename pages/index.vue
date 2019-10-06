<template>
  <main class="home">
    <headshots />
    <h1 class="home__title">
      Hi, I’m <span class="home__title--primary">Greg Ives</span>
    </h1>
    <div class="home__description">
      <markdown :vue="vue" />
    </div>
    <p class="home__projects">
      <nuxt-link to="/projects">See my projects</nuxt-link>
    </p>
  </main>
</template>

<script>
import Headshots from '~/components/Headshots'
import Markdown from '~/components/Markdown'

export default {
  components: {
    Headshots,
    Markdown
  },
  async asyncData() {
    const { vue } = await import('~/contents/index.md')
    return {
      vue
    }
  }
}
</script>

<style lang="scss">
.home {
  @include page;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}

.home__title {
  @include title;
}

.home__title--primary {
  @include title--primary;
}

.home__description {
  margin-bottom: 3rem;
  width: 100%;

  @media (min-width: $breakpoint--md) {
    width: 70%;
  }

  @media (min-width: $breakpoint--md) {
    width: 60%;
  }
}

.home__projects {
  font-family: $font--fancy;
  font-size: calc(120% + 1vw);
  font-style: italic;
  font-weight: 500;

  @media (min-width: $breakpoint--lg) {
    &::after {
      content: ' \2192';
      font-size: 3rem;
    }
  }
}
</style>
