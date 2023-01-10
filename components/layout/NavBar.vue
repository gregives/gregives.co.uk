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
        <nuxt-link class="nav__link" to="/guestbook/">
          <span>Guestbook</span>
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

    &::before {
      background-color: $color__body--overlay;
      content: '';
      filter: blur(2rem);
      inset: -1rem -4rem;
      position: absolute;
    }
  }
}

.nav__list-item {
  position: relative;
  font-size: 140%;

  ~ .nav__list-item {
    margin-top: 1.5rem;
  }

  @media (min-width: $breakpoint--md) {
    display: inline-block;
    font-size: 90%;

    ~ .nav__list-item {
      margin-left: 1.5rem;
      margin-top: auto;
    }
  }
}

.nav__link {
  margin: -0.25rem -0.5rem;
  padding: 0.25rem 0.5rem;

  span {
    @include link;

    background-image: linear-gradient(transparent, transparent),
      linear-gradient($color__primary, $color__primary) !important;

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

  &[href*='guestbook'] > span::after {
    background-color: $color__primary;
    border-radius: 2rem;
    bottom: calc(100% - 0.25rem);
    color: $color__body;
    content: 'New';
    font-size: 60%;
    line-height: 1.2;
    padding: 0.1em 0.4em;
    position: absolute;
    right: -30%;
    text-shadow: none;
    text-transform: uppercase;
    transform: rotate(5deg);
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
