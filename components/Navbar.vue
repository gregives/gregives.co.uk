<template>
  <header>
    <div class="container">
      <span id="logo">Greg Ives</span>
      <nav>
        <ol>
          <li>
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/projects">Projects</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/work">Work</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/about">About</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/contact">Contact</nuxt-link>
          </li>
        </ol>
      </nav>
      <div id="hamburger" :class="{ open }" @click="open = !open">
        <div></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

header {
  clear: both;
  padding: 30px 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;

  #logo {
    display: inline-block;
    font-family: $header-font;
    font-size: 120%;
  }

  nav {
    display: none;
    float: right;

    @media (min-width: $break-lg) {
      display: block;
    }

    ol {
      counter-reset: navbar-links;

      li {
        counter-increment: navbar-links;
        display: inline-block;
        font-size: 80%;
        position: relative;

        ~ li {
          margin-left: 6vmin;
        }

        &::before {
          color: transparentize($color: #000000, $amount: 0.63);
          content: '0' counter(navbar-links);
          font-size: 60%;
          position: absolute;
          right: calc(100% + 1vmin);
          top: 0.5vmin;
        }
      }
    }
  }

  #hamburger {
    height: 100%;
    padding: 10px;
    position: absolute;
    right: 0;
    top: 0;

    @media (min-width: $break-lg) {
      display: none;
    }

    > div {
      background-color: transparentize($color: black, $amount: 0.1);
      border-radius: 1px;
      height: 2px;
      position: relative;
      right: 0;
      top: calc(50% - 1px);
      transition: transform 300ms ease, background-color 300ms ease;
      width: 28px;

      &::before,
      &::after {
        background-color: transparentize($color: black, $amount: 0.1);
        border-radius: 1px;
        content: '';
        height: 100%;
        position: absolute;
        width: 100%;
      }

      &::before {
        top: -7px;
        transition: top 300ms ease;
      }

      &::after {
        bottom: -7px;
        transition: bottom 300ms ease, transform 300ms ease;
      }
    }

    &.open > div {
      background-color: transparent;
      transform: rotate(45deg);

      &::before {
        top: 0;
      }

      &::after {
        bottom: 0;
        transform: rotate(90deg);
      }
    }
  }
}
</style>
