<template>
  <div>
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
import Typer from '~/components/Typer'

export default {
  components: {
    Typer
  }
}
</script>

<style lang="scss">
.description {
  font-size: 120%;
}
</style>
