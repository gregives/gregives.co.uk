<template>
  <div class="home">
    <shapes />
    <div class="container">
      <div class="home__hero">
        <h1 class="home__title">I am&nbsp;<typer /></h1>
        <p class="home__description">
          Hi there! I'm a final-year Computer Science student at the University
          of Sheffield. I'm looking for an opportunity in software development
          from June&nbsp;2020 &mdash; check out my projects and experience or
          <nuxt-link to="/contact">contact me</nuxt-link>!
        </p>
      </div>
      <headshots />
    </div>
  </div>
</template>

<script>
import Headshots from '~/components/Headshots'
import Shapes from '~/components/Shapes'
import Typer from '~/components/Typer'

export default {
  components: {
    Headshots,
    Shapes,
    Typer
  },
  mounted() {
    this.$tilt(document.querySelectorAll('[data-tilt]'))
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

.home {
  height: 100%;
  overflow-y: hidden;

  .container {
    height: 100%;
  }
}

.home__hero {
  margin-top: calc(5vw - 7rem);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.home__description {
  font-size: 120%;
  width: 100%;

  @media (min-width: $break-md) {
    width: 70%;
  }
}
</style>
