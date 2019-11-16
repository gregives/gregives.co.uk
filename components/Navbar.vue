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
            <nuxt-link class="nav__link" to="/">
              <span>Home</span>
            </nuxt-link>
          </li>
          <li class="nav__list-item">
            <nuxt-link class="nav__link" to="/projects">
              <span>Projects</span>
            </nuxt-link>
          </li>
          <li class="nav__list-item">
            <nuxt-link class="nav__link" to="/about">
              <span>About</span>
            </nuxt-link>
          </li>
          <li class="nav__list-item">
            <nuxt-link class="nav__link" to="/contact">
              <span>Contact</span>
            </nuxt-link>
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
  line-height: 2rem;
  padding: 1rem 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;

  @supports (backdrop-filter: blur(5px)) {
    backdrop-filter: blur(5px);
    background-color: $color--body-blur;
  }

  @media print {
    display: none;
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
  transition: color 150ms ease-out, opacity 300ms ease-out;

  &:hover {
    color: $color--primary;
  }
}

.nav {
  $clip-path: polygon(
    0% 100%,
    0% 80%,
    80% 100%,
    100% 100%,
    100% 90%,
    80% 30%,
    100% 10%,
    100% 100%
  );
  @include dots($clip-path);

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

  &::before {
    width: 100%;
  }

  @media (min-width: $breakpoint--lg) {
    background-color: transparent;
    box-shadow: none;
    float: right;
    height: auto;
    position: relative;
    transform: none;
    transition: none;
    visibility: visible;
    width: auto;
    z-index: auto;

    &::before {
      display: none;
    }
  }
}

.nav__list {
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
  position: relative;
  font-size: 150%;

  ~ .nav__list-item {
    margin-top: 2rem;
  }

  @media (min-width: $breakpoint--lg) {
    display: inline-block;
    font-size: 100%;

    ~ .nav__list-item {
      margin-left: 2rem;
      margin-top: auto;
    }
  }
}

.nav__link {
  margin: -0.5rem -1rem;
  padding: 0.5rem 1rem;

  span {
    @include link;
  }

  &:hover,
  &.nuxt-link-exact-active {
    span {
      @include link-active;
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
