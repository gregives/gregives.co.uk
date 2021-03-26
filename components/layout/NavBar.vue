<template>
  <nav class="nav">
    <ol class="nav__list">
      <li class="nav__list-item">
        <nuxt-link class="nav__link" to="/blog/">
          <span>Blog</span>
        </nuxt-link>
      </li>
      <li class="nav__list-item">
        <nuxt-link class="nav__link" to="/projects/">
          <span>Projects</span>
        </nuxt-link>
      </li>
      <li class="nav__list-item">
        <nuxt-link class="nav__link" to="/about/">
          <span>About</span>
        </nuxt-link>
      </li>
      <li class="nav__list-item">
        <nuxt-link class="nav__link" to="/contact/">
          <span>Contact</span>
        </nuxt-link>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss">
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
  width: 100vw;
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

      filter: drop-shadow(0 0 0.2rem $color__body--overlay)
        drop-shadow(0 0 0.5rem $color__body--overlay);
    }
  }

  &:hover,
  &.nuxt-link-active {
    span {
      @include link--active;
    }
  }
}

#__menu:checked ~ .nav {
  visibility: visible;
  transform: translateX(-100%);
  transition: transform 400ms $transition__snappy--out, visibility 0s;

  @media (min-width: $breakpoint--md) {
    transform: none;
    transition: none;
  }
}

.page-enter-active,
.page-leave-active,
.layout-enter-active,
.layout-leave-active {
  .nav {
    transform: none;
    transition: none;
  }
}
</style>
