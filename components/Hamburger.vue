<template>
  <button class="hamburger" aria-label="Menu" title="Menu" @click="toggleMenu">
    <div class="hamburger__icon"></div>
  </button>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      this.changingRoute = true
      if (this.menuIsOpen()) {
        setTimeout(() => this.closeMenu(), 450)
      }
    }
  },
  mounted() {
    window.addEventListener('click', (event) => {
      const link = event.target.closest('a.nuxt-link-exact-active')
      if (link !== null) {
        if (!this.changingRoute) {
          this.closeMenu()
        }
        this.changingRoute = false
      }
    })
  },
  methods: {
    menuIsOpen() {
      return document.documentElement.dataset.menu !== 'closed'
    },
    openMenu() {
      document.documentElement.dataset.menu = 'open'
    },
    closeMenu() {
      document.documentElement.dataset.menu = 'closed'
    },
    toggleMenu() {
      if (this.menuIsOpen()) {
        this.closeMenu()
      } else {
        this.openMenu()
      }
    }
  }
}
</script>

<style lang="scss">
$speed: 150ms;
$width: 2px;

.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  float: right;
  height: 100%;
  padding: 1rem 0.5rem;
  margin: 0 -0.5rem;
  outline: none;

  @media (min-width: $breakpoint--lg) {
    display: none;
  }
}

.hamburger__icon {
  background-color: transparentize(black, 0.1);
  border-radius: $width / 2;
  height: $width;
  position: relative;
  right: 0;
  top: calc(50% - #{$width / 2});
  transition: background-color 0ms $speed;
  width: calc(15px + 2vw);

  &::before,
  &::after {
    background-color: transparentize(black, 0.1);
    border-radius: $width / 2;
    content: '';
    height: 100%;
    left: 0;
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
}

:root[data-menu='open'] .hamburger__icon {
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
}
</style>
