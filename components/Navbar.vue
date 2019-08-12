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
    </div>
  </header>
</template>

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
    font-size: 115%;
  }

  nav {
    float: right;

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
}
</style>
