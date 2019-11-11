<template>
  <main class="home">
    <headshots />
    <h1 class="home__title">
      Hi, I’m <span class="home__title--primary">Greg Ives</span>
    </h1>
    <div class="home__description">
      <markdown :vue="vue" />
    </div>
    <nuxt-link class="home__projects" to="/projects">
      See my projects
    </nuxt-link>
    <nuxt-link class="home__contact" to="/contact">
      Contact me
    </nuxt-link>
  </main>
</template>

<script>
import Headshots from '~/components/Headshots'

export default {
  components: {
    Headshots
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
  $clip-path: polygon(0% 90%, 100% 50%, 100% 90%, 70% 100%, 0% 100%);
  @include page;
  @include dots($clip-path);
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
  @include button;
  @include button--primary;
  float: left;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.home__contact {
  @include button;
  clear: both;
  float: left;

  @media (min-width: $breakpoint--md) {
    clear: none;
  }
}
</style>
