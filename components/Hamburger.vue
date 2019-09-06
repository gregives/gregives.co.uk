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
      return document.documentElement.hasAttribute('data-menu')
    },
    openMenu() {
      return document.documentElement.setAttribute('data-menu', '')
    },
    closeMenu() {
      return document.documentElement.removeAttribute('data-menu')
    },
    toggleMenu() {
      if (!this.menuIsOpen()) {
        this.openMenu()
      } else {
        this.closeMenu()
      }
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

$speed: 150ms;
$width: 2px;

.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  height: 100%;
  padding: 10px;
  outline: none;
  position: absolute;
  right: 0;
  top: 0;

  @media (min-width: $break-lg) {
    display: none;
  }
}

.hamburger__icon {
  background-color: transparentize($color: black, $amount: 0.1);
  border-radius: $width / 2;
  height: $width;
  position: relative;
  right: 0;
  top: calc(50% - #{$width / 2});
  transition: background-color 0ms $speed;
  width: calc(15px + 2vw);

  &::before,
  &::after {
    background-color: transparentize($color: black, $amount: 0.1);
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

:root[data-menu] .hamburger__icon {
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
