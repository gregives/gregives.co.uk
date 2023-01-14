<template>
  <button
    :aria-label="theme === 'light' ? 'Dark theme' : 'Light theme'"
    class="theme-toggle"
    @click="toggleTheme"
  >
    <transition name="spin" mode="out-in">
      <moon-icon v-if="theme === 'light'" title="Dark theme" />
      <sun-icon v-else title="Light theme" />
    </transition>
  </button>
</template>

<script>
import SunIcon from 'icons/WhiteBalanceSunny'
import MoonIcon from 'icons/MoonWaningCrescent'

export default {
  components: {
    SunIcon,
    MoonIcon
  },
  data() {
    return {
      theme: (process.client && localStorage.getItem('theme')) || 'dark'
    }
  },
  head() {
    if (!process.server) {
      return {
        meta: [{ hid: 'theme-color', name: 'theme-color', content: this.color }]
      }
    }
  },
  computed: {
    color() {
      const color = this.theme === 'light' ? 'primary' : 'body--overlay'
      return getComputedStyle(document.documentElement)
        .getPropertyValue(`--color__${color}`)
        .trim()
    }
  },
  watch: {
    theme(theme) {
      document.documentElement.dataset.theme = theme
      localStorage.setItem('theme', theme)
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  }
}
</script>

<style lang="scss">
.theme-toggle {
  background-color: transparent;
  border: none;
  color: $color__text;
  cursor: pointer;
  margin: 0 -0.5rem;
  padding: 0 0.5rem;
  position: relative;

  &:hover {
    color: $color__primary;
  }

  .material-design-icon {
    display: block;
  }

  svg {
    margin-top: -0.125rem;
    transform: rotate(-45deg);
  }

  @media (min-width: $breakpoint--md) {
    color: $color__primary;
    margin-left: 1rem;

    svg {
      transform: scale(0.9) rotate(-45deg);
    }
  }

  .spin-enter-active,
  .spin-leave-active {
    transition: transform 100ms linear;
  }

  .spin-enter {
    transform: scale(0.9) rotate(90deg);
  }

  .spin-leave-to {
    transform: scale(0.9) rotate(-90deg);
  }
}
</style>
