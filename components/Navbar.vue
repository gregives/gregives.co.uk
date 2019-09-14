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
  z-index: 1;

  @supports (backdrop-filter: blur(5px)) {
    backdrop-filter: blur(5px);
    background-color: transparentize(white, 0.4);
  }
}

.header__logo {
  display: inline-block;
  font-family: $font--monospace;
  font-size: 120%;
  font-weight: 500;
}

.nav {
  background-color: darken(white, 5%);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  transform: translateX(100%);
  transition: transform 300ms ease, visibility 0s 300ms;
  visibility: hidden;
  width: 100%;
  z-index: -1;

  @media (min-width: $breakpoint--lg) {
    background-color: transparent;
    float: right;
    height: auto;
    margin-top: 0.2rem;
    overflow: visible;
    position: relative;
    visibility: visible;
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

  @media (min-width: $breakpoint--lg) {
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
    color: $color--text-muted;
    content: '0' counter(navbar-links);
    font-size: 60%;
    position: absolute;
    right: calc(100% + 4vmin);
    top: 1vmin;
  }

  @media (min-width: $breakpoint--lg) {
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
  visibility: visible;
  transform: none;
  transition: transform 400ms ease, visibility 0s;

  @media (min-width: $breakpoint--lg) {
    transform: translateX(100%);
    transition: none;
  }
}
</style>
