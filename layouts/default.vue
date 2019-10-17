<template>
  <div id="__app">
    <script v-html="script"></script>
    <Header />
    <Nuxt />
    <Footer />
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
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      script: (() => {
        const content = function() {
          const theme = localStorage.getItem('theme') || 'light'
          document.documentElement.dataset.theme = theme
          const color = getComputedStyle(
            document.documentElement
          ).getPropertyValue(
            theme === 'light' ? '--color--primary' : '--color--body-overlay'
          )
          document
            .querySelector('meta[name=theme-color]')
            .setAttribute('content', color)
          document.documentElement.dataset.menu = 'closed'
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
  }
}
</script>

<style lang="scss">
#__filters {
  position: absolute;
}
</style>
