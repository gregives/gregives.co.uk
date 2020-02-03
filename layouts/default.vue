<template>
  <div id="__app">
    <script v-html="script"></script>
    <top-bar />
    <nuxt />
  </div>
</template>

<script>
import TopBar from '~/components/layout/TopBar'

export default {
  components: {
    TopBar
  },
  data() {
    return {
      script: (() => {
        const content = function() {
          // Set theme and theme-color as soon as possible
          const theme = localStorage.getItem('theme') || 'light'
          document.documentElement.dataset.theme = theme

          const color = getComputedStyle(
            document.documentElement
          ).getPropertyValue(
            theme === 'light' ? '--color__primary' : '--color__body--overlay'
          )
          document
            .querySelector('meta[name="theme-color"]')
            .setAttribute('content', color.trim())

          // Set menu to closed
          document.documentElement.dataset.menu = 'closed'

          // Update VH units for Android
          const updateVH = () => {
            const vh = document.documentElement.clientHeight * 0.01
            document.documentElement.style.setProperty('--vh', `${vh}px`)
          }
          window.addEventListener('resize', updateVH)
          updateVH()

          // Remove data-n-head
          delete document.documentElement.dataset.nHead
        }
        return `(${content.toString()})()`
      })()
    }
  },
  mounted() {
    // Disable install prompt for PWA
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault()
    })

    // Check if the page should scroll to hash
    const hash = this.$route.hash
    if (hash) {
      this.scrollToHash(hash)
    }
  },
  methods: {
    scrollToHash(hash) {
      this.$nextTick(() => {
        location.href = hash
      })
    }
  }
}
</script>
