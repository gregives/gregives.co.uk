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
  data() {
    return {
      menu: 'closed'
    }
  },
  watch: {
    $route() {
      this.changingRoute = true
      if (this.menu === 'open') {
        setTimeout(this.closeMenu, 300) // If link clicked to other route
      }
    },
    menu(menu) {
      document.documentElement.dataset.menu = menu
      if (menu === 'open') {
        window.addEventListener('click', this.handleClick)
      } else {
        window.removeEventListener('click', this.handleClick)
      }
    }
  },
  mounted() {
    window.matchMedia('(min-width: 768px)').addListener((event) => {
      if (event.matches) {
        this.menu = 'closed' // If screen is larger than md breakpoint
      }
    })
  },
  methods: {
    toggleMenu() {
      this.menu = this.menu === 'open' ? 'closed' : 'open'
    },
    handleClick(event) {
      const link = event.target.closest('a.nuxt-link-exact-active')
      if (link !== null) {
        if (!this.changingRoute && this.menu === 'open') {
          this.menu = 'closed' // If link clicked to current route
        }
        this.changingRoute = false
      }

      const nav = document.querySelector('nav').getBoundingClientRect()
      if (event.clientX < nav.left && this.menu === 'open') {
        this.menu = 'closed' // If clicking outside the nav
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

  &:hover {
    .hamburger__icon {
      background-color: $color__primary;

      &::before,
      &::after {
        background-color: $color__primary;
      }
    }
  }
}

.hamburger__icon {
  background-color: $color__text;
  border-radius: $thickness / 2;
  height: $thickness;
  position: absolute;
  right: 0.5rem;
  top: calc(50% - #{$thickness / 2});
  transition: transform $speed ease-in;
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
    transition: bottom $speed $speed ease-out, opacity 0s $speed;
  }

  &::after {
    top: 0.425rem;
    transition: top $speed $speed ease-out, transform $speed ease-in;
  }
}

:root[data-menu='open'] {
  .hamburger__icon {
    transform: rotate(45deg);
    transition: transform $speed $speed ease-out;

    &::before {
      bottom: 0;
      opacity: 0;
      transition: bottom $speed ease-in, opacity 0s $speed;
    }

    &::after {
      top: 0;
      transform: rotate(-90deg);
      transition: top $speed ease-in, transform $speed $speed ease-out;
    }
  }
}
</style>
