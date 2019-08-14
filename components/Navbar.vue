<template>
  <header>
    <div class="container">
      <span id="logo">Greg Ives</span>
      <div id="hamburger" :class="{ open }" @click="open = !open">
        <div>
          <div></div>
        </div>
      </div>
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
    cursor: pointer;
    height: 100%;
    padding: 10px;
    position: absolute;
    right: 0;
    top: 0;

    $speed: 150ms;

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
      transition: background-color 0ms $speed;
      width: calc(8px + 3vw);

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
        top: calc(-4px - 0.5vw);
        transition: top $speed $speed ease-out, transform $speed ease-in;
      }

      &::after {
        bottom: calc(-4px - 0.5vw);
        transition: bottom $speed $speed ease-out, transform $speed ease-in;
      }

      > div {
        background-color: darken(white, 5%);
        border-radius: 1vmax;
        cursor: default;
        height: 0;
        left: 50%;
        opacity: 1;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1),
          height 0s 600ms, width 0s 600ms;
        width: 0;
        z-index: -1;
      }
    }

    &.open > div {
      background-color: transparent;

      &::before {
        top: 0;
        transform: rotate(-45deg);
        transition: top $speed ease-in, transform $speed $speed ease-out;
      }

      &::after {
        bottom: 0;
        transform: rotate(45deg);
        transition: bottom $speed ease-in, transform $speed $speed ease-out;
      }

      > div {
        transform: translate(-50%, -50%) scale(283);
        transition: transform 600ms cubic-bezier(0.755, 0.05, 0.855, 0.06);
        height: 1vmax;
        width: 1vmax;
      }
    }
  }
}
</style>
