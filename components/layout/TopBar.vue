<template>
  <header class="header">
    <div class="header__content">
      <div class="header__logo">
        <nuxt-link to="/">Greg Ives</nuxt-link>
      </div>
      <nav class="nav">
        <ol class="nav__list">
          <li class="nav__list-item">
            <nuxt-link class="nav__link" to="/blog">
              <span>Blog</span>
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
      <div class="header__buttons">
        <theme-toggle />
        <hamburger />
      </div>
    </div>
  </header>
</template>

<script>
import Hamburger from '~/components/layout/Hamburger'
import ThemeToggle from '~/components/layout/ThemeToggle'

export default {
  components: {
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
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  @media print {
    display: none;
  }

  &::before {
    background-color: $color__body;
    content: '';
    height: 100vh;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 300ms $transition__snappy--out, visibility 0s 300ms;
    visibility: hidden;
    width: 100vw;
    will-change: opacity, visibility;
    z-index: 1;

    @media (min-width: $breakpoint--md) {
      display: none;
      will-change: auto;
    }
  }
}

:root[data-menu='open'] .header {
  &::before {
    opacity: 0.9;
    transition: opacity 400ms $transition__snappy--out, visibility 0s;
    visibility: visible;
  }
}

.header__content {
  @include container;

  display: flex;
}

.header__logo {
  flex-grow: 1;
  font-family: $font__fancy;
  font-size: 130%;
  font-weight: 500;

  a:hover {
    color: $color__primary;
  }
}

.header__buttons {
  height: 100%;
  z-index: 3;
}

.nav {
  background-color: $color__body;
  box-shadow: $box-shadow;
  height: 100vh;
  left: 100%;
  position: fixed;
  top: 0;
  transform: translateX(0);
  transform-origin: top left;
  transition: transform 300ms $transition__snappy--out, visibility 0s 300ms;
  visibility: hidden;
  width: calc(90% - 5rem);
  will-change: transform, visibility;
  z-index: 2;

  @media (min-width: $breakpoint--md) {
    background-color: transparent;
    box-shadow: none;
    height: auto;
    left: auto;
    position: relative;
    top: auto;
    transform: none;
    transition: none;
    visibility: visible;
    width: auto;
    will-change: auto;
  }
}

.nav__list {
  display: inline-block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: $breakpoint--md) {
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

  @media (min-width: $breakpoint--md) {
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

    @media (min-width: $breakpoint--md) {
      @include link($color__body--overlay);
    }
  }

  &:hover,
  &.nuxt-link-active {
    span {
      @include link--active;
    }
  }
}

:root[data-menu='open'] .nav {
  visibility: visible;
  transform: translateX(-100%);
  transition: transform 400ms $transition__snappy--out, visibility 0s;

  @media (min-width: $breakpoint--md) {
    transform: none;
    transition: none;
  }
}
</style>
