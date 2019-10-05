<template>
  <header class="header">
    <div class="header__content">
      <span class="header__logo">
        <nuxt-link to="/">Greg Ives</nuxt-link>
      </span>
      <hamburger />
      <theme-toggle />
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
import ThemeToggle from '~/components/ThemeToggle'

export default {
  components: {
    Hamburger,
    ThemeToggle
  }
}
</script>

<style lang="scss">
.header {
  background-color: $color--body-overlay;
  box-shadow: $box-shadow;
  clear: both;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

  @supports (backdrop-filter: blur(5px)) {
    backdrop-filter: blur(5px);
    background-color: $color--body-blur;
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
  transition: color 150ms ease-out;

  &:hover {
    color: $color--primary;
  }
}

.nav {
  background-color: $color--body;
  box-shadow: $box-shadow;
  height: 100vh;
  right: 0;
  position: fixed;
  top: 0;
  transform: translateX(100%) skewX(20deg);
  transform-origin: top left;
  transition: transform 300ms ease-in, visibility 0s 300ms;
  visibility: hidden;
  width: calc(90% - 5rem);
  z-index: -1;

  @media (min-width: $breakpoint--lg) {
    background-color: transparent;
    box-shadow: none;
    float: right;
    height: auto;
    line-height: 2rem;
    position: relative;
    transform: none;
    transition: none;
    visibility: visible;
    width: auto;
    z-index: auto;
  }
}

.nav__list {
  counter-reset: navbar-links;
  display: inline-block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: $breakpoint--lg) {
    float: right;
    left: auto;
    position: relative;
    top: auto;
    transform: none;
  }
}

.nav__list-item {
  counter-increment: navbar-links;
  position: relative;
  font-size: 150%;

  ~ .nav__list-item {
    margin-top: 5vmin;
  }

  @media (min-width: $breakpoint--lg) {
    display: inline-block;
    font-size: 100%;

    ~ .nav__list-item {
      margin-left: 5vmin;
      margin-top: auto;
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
    background-color: $color--primary-muted;
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
  transition: transform 400ms ease-out, visibility 0s;

  @media (min-width: $breakpoint--lg) {
    transform: none;
    transition: none;
  }
}
</style>
