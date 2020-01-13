<template>
  <button
    @click.stop="toggleMenu"
    class="hamburger"
    aria-label="Menu"
    title="Menu"
  >
    <div class="hamburger__icon"></div>
  </button>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      this.changingRoute = true
      if (this.menuIsOpen()) {
        setTimeout(this.closeMenu, 300) // If link clicked to other route
      }
    }
  },
  mounted() {
    window.addEventListener('click', (event) => {
      const link = event.target.closest('a.nuxt-link-exact-active')
      if (link !== null) {
        if (!this.changingRoute && this.menuIsOpen()) {
          this.closeMenu() // If link clicked to current route
        }
        this.changingRoute = false
      }

      const nav = document.querySelector('nav').getBoundingClientRect()
      if (event.clientX < nav.left && this.menuIsOpen()) {
        this.closeMenu() // If clicking outside the nav
      }
    })
  },
  methods: {
    menuIsOpen() {
      return document.documentElement.dataset.menu === 'open'
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
$thickness: 2px;

.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  height: 100%;
  padding: 0 0.5rem;
  position: relative;
  margin: 0 -0.5rem;
  outline: none;

  @media (min-width: $breakpoint--lg) {
    display: none;
  }

  &::before {
    content: '\00A0';
    display: block;
    height: 100%;
    width: 1.5rem;
  }
}

.hamburger__icon {
  background-color: $color--text;
  border-radius: $thickness / 2;
  height: $thickness;
  position: absolute;
  right: 0.5rem;
  top: calc(50% - #{$thickness / 2});
  transition: transform $speed ease-in;
  width: calc(100% - 1rem);

  &::before,
  &::after {
    background-color: $color--text;
    border-radius: $thickness / 2;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
  }

  &::before {
    top: 0.425rem;
    transition: top $speed $speed ease-out;
  }

  &::after {
    bottom: 0.425rem;
    transition: bottom $speed $speed ease-out, transform $speed ease-in;
  }
}

:root[data-menu='open'] {
  .hamburger__icon {
    transform: rotate(45deg);
    transition: transform $speed $speed ease-out;

    &::before {
      top: 0;
      transition: top $speed ease-in;
    }

    &::after {
      bottom: 0;
      transform: rotate(-90deg);
      transition: bottom $speed ease-in, transform $speed $speed ease-out;
    }
  }
}
</style>
