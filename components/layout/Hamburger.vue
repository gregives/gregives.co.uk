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
    $route() {
      this.changingRoute = true
      if (this.menuIsOpen()) {
        setTimeout(this.closeMenu, 300) // If link clicked to other route
      }
    }
  },
  mounted() {
    window.matchMedia('(min-width: 768px)').addListener((event) => {
      if (event.matches) {
        this.closeMenu() // If screen is larger than md breakpoint
      }
    })
  },
  methods: {
    menuIsOpen() {
      return document.documentElement.dataset.menu === 'open'
    },
    openMenu() {
      document.documentElement.dataset.menu = 'open'
      window.addEventListener('click', this.handleClick)
    },
    closeMenu() {
      document.documentElement.dataset.menu = 'closed'
      window.removeEventListener('click', this.handleClick)
    },
    toggleMenu() {
      if (this.menuIsOpen()) {
        this.closeMenu()
      } else {
        this.openMenu()
      }
    },
    handleClick(event) {
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

  @media (min-width: $breakpoint--md) {
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
  background-color: $color__text;
  border-radius: $thickness / 2;
  height: $thickness;
  position: absolute;
  right: 0.5rem;
  top: calc(50% - #{$thickness / 2});
  transition: transform $speed $transition__snappy--in;
  width: calc(100% - 1rem);

  &::before,
  &::after {
    background-color: $color__text;
    border-radius: $thickness / 2;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    width: 100%;
  }

  &::before {
    bottom: 0.425rem;
    transition: bottom $speed $speed $transition__snappy--out, opacity 0s $speed;
  }

  &::after {
    top: 0.425rem;
    transition: top $speed $speed $transition__snappy--out,
      transform $speed $transition__snappy--in;
  }
}

:root[data-menu='open'] {
  .hamburger__icon {
    transform: rotate(45deg);
    transition: transform $speed $speed $transition__snappy--out;

    &::before {
      bottom: 0;
      opacity: 0;
      transition: bottom $speed $transition__snappy--in, opacity 0s $speed;
    }

    &::after {
      top: 0;
      transform: rotate(-90deg);
      transition: top $speed $transition__snappy--in,
        transform $speed $speed $transition__snappy--out;
    }
  }
}
</style>
