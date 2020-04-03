<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo">
        <nuxt-link to="/">Greg Ives</nuxt-link>
      </div>
      <nav-bar />
      <div class="header__buttons">
        <theme-toggle />
        <hamburger />
      </div>
    </div>
  </header>
</template>

<script>
import NavBar from '~/components/layout/NavBar'
import Hamburger from '~/components/layout/Hamburger'
import ThemeToggle from '~/components/layout/ThemeToggle'

export default {
  components: {
    NavBar,
    Hamburger,
    ThemeToggle
  }
}
</script>

<style lang="scss">
.header {
  background-color: $color__body--overlay;
  box-shadow: $box-shadow;
  line-height: 2rem;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;

  @media print {
    display: none;
  }
}

.header__content {
  @include container;

  display: flex;
}

.header__logo {
  @include font__fancy;

  flex-grow: 1;
  font-size: 130%;

  a:hover {
    color: $color__primary;
  }
}

.header__buttons {
  height: 100%;
  z-index: 3;
}
</style>
