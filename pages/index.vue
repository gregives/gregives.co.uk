<template>
  <div>
    <shapes />
    <div class="container">
      <div class="centre-y">
        <h1>
          I am
          <typer />
        </h1>
        <div class="description">
          Hi there! I'm a final-year Computer Science student at the University
          of Sheffield. I'm looking for an opportunity in software development
          from June&nbsp;2020 &mdash; check out my projects and experience or
          <nuxt-link to="/contact">contact me</nuxt-link>!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Shapes from '~/components/Shapes'
import Typer from '~/components/Typer'

export default {
  components: {
    Shapes,
    Typer
  },
  mounted() {
    this.$tilt(document.querySelectorAll('[data-tilt]'))
  }
}
</script>

<style lang="scss" scoped>
.centre-y {
  margin-top: -3rem;

  > div {
    font-size: 140%;
  }
}
</style>
