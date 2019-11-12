<template>
  <div id="__app">
    <script v-html="script"></script>
    <navbar />
    <nuxt />
    <svg id="__filters" height="0" width="0">
      <defs>
        <filter id="underwater">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="2"
            result="turbulence"
          ></feTurbulence>
          <feColorMatrix
            in="turbulence"
            type="hueRotate"
            values="0"
            result="animated"
          >
            <animate
              attributeName="values"
              from="0"
              to="360"
              :dur="`${Math.random() + 2}s`"
              repeatCount="indefinite"
            ></animate>
          </feColorMatrix>
          <feDisplacementMap
            in="SourceGraphic"
            in2="animated"
            xChannelSelector="R"
            yChannelSelector="G"
          >
            <animate
              attributeName="scale"
              values="10; 20; 10"
              :dur="`${Math.random() + 7}s`"
              repeatCount="indefinite"
            ></animate>
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
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
            theme === 'light' ? '--color--primary' : '--color--body-overlay'
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
  }
}
</script>

<style lang="scss">
#__filters {
  position: absolute;
}

#__app {
  overflow: hidden;
}
</style>
