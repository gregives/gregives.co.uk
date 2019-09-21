<template>
  <button
    class="theme-toggle"
    :aria-label="theme === 'light' ? 'Dark theme' : 'Light theme'"
    :title="theme === 'light' ? 'Dark theme' : 'Light theme'"
    @click="toggleTheme"
  >
    {{ theme === 'light' ? '🌛' : '🌞' }}
  </button>
</template>

<script>
export default {
  data() {
    return {
      theme: 'light'
    }
  },
  mounted() {
    this.theme = localStorage.getItem('theme')
    document.documentElement.dataset.theme = this.theme
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.documentElement.dataset.theme = this.theme
      localStorage.setItem('theme', this.theme)
    }
  }
}
</script>

<style lang="scss">
.theme-toggle {
  background: none;
  border: none;
  color: $color--text;
  cursor: pointer;
  filter: saturate(0);
  float: right;
  font-size: 110%;
  margin-right: 1rem;
  opacity: 0.87;
  outline: none;
  padding: 0.25rem;
  text-align: right;
  transition: filter 150ms ease-out, opacity 150ms ease-out;
  width: 2rem;

  &:hover {
    opacity: 1;
    filter: saturate(0.4);
  }

  @media (min-width: $breakpoint--lg) {
    margin-right: 0;
    margin-left: 1rem;
  }
}

:root[data-theme='dark'] .theme-toggle {
  opacity: 1;

  &:hover {
    filter: saturate(1);
  }
}
</style>
