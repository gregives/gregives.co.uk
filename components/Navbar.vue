<template>
  <header class="header">
    <div class="header__content">
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
.header {
  background-color: transparentize(white, 0.1);
  box-shadow: 0 0 2rem -1rem transparentize(black, 0.8);
  clear: both;
  padding: 1rem 0;
  z-index: 1;

  @supports (backdrop-filter: blur(5px)) {
    backdrop-filter: blur(5px);
    background-color: transparentize(white, 0.4);
  }
}

.header__content {
  @include container;
}

.header__logo {
  display: inline-block;
  font-family: $font--fancy;
  font-size: 130%;
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
    position: relative;
    transition: none;
    visibility: visible;
    width: auto;
    z-index: auto;
  }
}

.nav__list {
  counter-reset: navbar-links;
  left: 50%;
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
    margin-right: 3vmin;
    vertical-align: text-top;
  }

  @media (min-width: $breakpoint--lg) {
    display: inline-block;
    font-size: 100%;

    ~ .nav__list-item {
      margin-left: 7vmin;
      margin-top: auto;
    }

    &::before {
      margin-right: 1vmin;
    }
  }
}

.nav__link {
  transition: color 150ms ease-out;
  position: relative;
  margin: -0.5rem -1rem;
  padding: 0.5rem 1rem;

  &::before {
    bottom: 0.5rem;
    background-color: transparentize($color--primary, 0.9);
    content: '';
    height: 0.4em;
    left: 1rem;
    position: absolute;
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 150ms ease-out;
    width: calc(100% - 2rem);
    z-index: -1;
  }

  &:hover,
  &.nuxt-link-exact-active {
    color: $color--primary;

    &::before {
      transform: scaleY(1);
    }
  }
}

:root[data-menu='open'] .nav {
  visibility: visible;
  transform: none;
  transition: transform 400ms ease, visibility 0s;

  @media (min-width: $breakpoint--lg) {
    transform: translateX(100%);
    transition: none;
  }
}
</style>
