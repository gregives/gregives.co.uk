<template>
  <header class="header">
    <div class="container">
      <span class="header__logo">
        <nuxt-link to="/">Greg Ives</nuxt-link>
      </span>
      <hamburger />
      <nav class="nav">
        <ol class="nav__list">
          <li class="nav__list-item">
            <nuxt-link class="nav__link" to="/">Home</nuxt-link>
          </li>
          <li class="nav__list-item">
            <nuxt-link class="nav__link" to="/projects">Projects</nuxt-link>
          </li>
          <li class="nav__list-item">
            <nuxt-link class="nav__link" to="/work">Work</nuxt-link>
          </li>
          <li class="nav__list-item">
            <nuxt-link class="nav__link" to="/about">About</nuxt-link>
          </li>
          <li class="nav__list-item">
            <nuxt-link class="nav__link" to="/contact">Contact</nuxt-link>
          </li>
        </ol>
      </nav>
    </div>
  </header>
</template>

<script>
import Hamburger from '~/components/Hamburger'

export default {
  components: {
    Hamburger
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

.header {
  background-color: transparentize(white, 0.1);
  box-shadow: 0 0 2rem -1rem transparentize(black, 0.8);
  clear: both;
  padding: 1.5rem 0;
  margin-bottom: 1rem;
  z-index: 1;

  @supports (backdrop-filter: blur(5px)) {
    backdrop-filter: blur(5px);
    background-color: transparentize(white, 0.6);
  }
}

.header__logo {
  display: inline-block;
  font-family: $header-font;
  font-size: 120%;

  a::before,
  a::after {
    display: none;
  }
}

.nav {
  background-color: darken(white, 5%);
  left: 0;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  transform: translateX(100%);
  transition: transform 300ms ease;
  width: 100%;
  z-index: -1;

  @media (min-width: $break-lg) {
    background-color: transparent;
    float: right;
    height: auto;
    margin-top: 0.2rem;
    overflow: visible;
    position: relative;
    width: auto;
    z-index: auto;
  }
}

.nav__list {
  counter-reset: navbar-links;
  left: calc(50% + 4vmin);
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: $break-lg) {
    left: auto;
    position: relative;
    top: auto;
    transform: translateX(-100%);
  }
}

.nav__list-item {
  counter-increment: navbar-links;
  position: relative;
  font-size: 150%;

  ~ .nav__list-item {
    margin-top: 5vmin;
  }

  &::before {
    color: transparentize($color: #000000, $amount: 0.63);
    content: '0' counter(navbar-links);
    font-size: 60%;
    position: absolute;
    right: calc(100% + 4vmin);
    top: 1vmin;
  }

  @media (min-width: $break-lg) {
    display: inline-block;
    font-size: 100%;

    ~ .nav__list-item {
      margin-left: 7vmin;
      margin-top: auto;
    }

    &::before {
      right: calc(100% + 1vmin);
      top: 0.5vmin;
    }
  }
}

:root[data-menu] .nav {
  transform: none;
  transition: transform 400ms ease;

  @media (min-width: $break-lg) {
    transform: translateX(100%);
    transition: none;
  }
}
</style>
