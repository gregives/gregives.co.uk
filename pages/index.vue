<template>
  <main class="home">
    <h1 class="home__title">
      Hi, I’m
      <span class="home__title--primary">Greg Ives</span>
    </h1>
    <p class="home__description">
      I’m a final-year Computer Science student at the University of Sheffield.
      I’m looking for an opportunity in software development from
      <strong>June&nbsp;2020</strong> &mdash; check out my work or
      contact&nbsp;me!&nbsp;👋
    </p>
    <p class="home__projects">
      <nuxt-link to="/projects">See my projects</nuxt-link>
    </p>
    <headshots />
  </main>
</template>

<script>
import Headshots from '~/components/Headshots'

export default {
  components: {
    Headshots
  },
  mounted() {
    this.$tilt(document.querySelectorAll('[data-tilt]'))
  }
}
</script>

<style lang="scss">
.home {
  @include container;
  padding: 3rem 0;
}

.home__title {
  font-weight: 500;
  -webkit-text-stroke: 0.2vmin $color__primary;
  -webkit-text-fill-color: $color__body;

  &::after {
    display: none;
  }
}

.home__title--primary {
  color: $color__primary;
  filter: url('#underwater');
  font-size: 110%;
  font-weight: 900;
  line-height: 1;
  -webkit-text-stroke: 0 currentColor;
  -webkit-text-fill-color: currentColor;
}

.home__description {
  font-size: 120%;
  margin-bottom: 3rem;
  width: 100%;

  @media (min-width: $breakpoint__md) {
    width: 75%;
  }

  @media (min-width: $breakpoint__md) {
    width: 70%;
  }
}

.home__projects {
  font-family: $font__fancy;
  font-size: calc(120% + 1vw);
  font-style: italic;
  font-weight: 500;

  @media (min-width: $breakpoint__lg) {
    &::after {
      content: ' \2192';
      font-size: 3rem;
    }
  }
}
</style>
