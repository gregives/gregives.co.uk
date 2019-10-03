<template>
  <main class="home">
    <h1 class="home__title">
      Hi, I’m <span class="home__title--primary">Greg Ives</span>
    </h1>
    <div class="home__description">
      <markdown :vue="vue" />
    </div>
    <p class="home__projects">
      <nuxt-link to="/projects">See my projects</nuxt-link>
    </p>
    <headshots />
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
  @include container;
  flex: 1;
  padding: 3rem 0;
}

.home__title {
  font-weight: 500;
  -webkit-text-stroke: 0.2vmin $color--primary;
  -webkit-text-fill-color: transparent;

  &::after {
    display: none;
  }
}

.home__title--primary {
  color: $color--primary;
  filter: url('#underwater');
  font-size: 110%;
  font-weight: 900;
  line-height: 1;
  -webkit-text-stroke: 0 currentColor;
  -webkit-text-fill-color: currentColor;
}

.home__description {
  margin-bottom: 3rem;
  width: 100%;

  @media (min-width: $breakpoint--md) {
    width: 75%;
  }

  @media (min-width: $breakpoint--md) {
    width: 70%;
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
