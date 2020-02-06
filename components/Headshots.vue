<template>
  <div ref="headshots" class="headshots">
    <picture v-if="error" class="error__headshot">
      <source :srcset="errorHead.webp" type="image/webp" />
      <source :srcset="errorHead.png" type="image/png" />
      <img :src="head.png" alt="Greg Ives looking worried" />
    </picture>
    <picture
      v-else
      v-for="head in heads"
      :key="head.png"
      :data-x="head.x"
      :data-y="head.y"
      class="headshots__image"
    >
      <source :srcset="head.lazy ? false : head.webp" type="image/webp" />
      <source :srcset="head.lazy ? false : head.png" type="image/png" />
      <img :src="head.lazy ? false : head.png" alt="Greg Ives looking around" />
    </picture>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      errorHead: {
        png: require('~/assets/images/error.png'),
        webp: require('~/assets/images/error.png?webp')
      },
      heads: (() => {
        const path = require('path')
        const files = require.context(
          '~/assets/images/headshots/',
          false,
          /\.png$/
        )
        const heads = files.keys().map((file) => {
          const basename = path.basename(file)
          const coords = basename.match(/[^.]+/)[0].split('_')
          return {
            x: parseInt(coords[0]),
            y: parseInt(coords[1]),
            png: require(`~/assets/images/headshots/${basename}?original`),
            webp: require(`~/assets/images/headshots/${basename}?webp`),
            lazy: true
          }
        })

        const headIndex = heads.findIndex((head) => {
          return head.x === 5 && head.y === 3
        })

        const head = heads.splice(headIndex, 1)[0]
        heads.unshift({ ...head, lazy: false })
        return heads
      })()
    }
  },
  mounted() {
    this.heads = this.heads.map((head) => {
      return { ...head, lazy: false }
    })

    window.addEventListener('mousemove', this.changeHeadshot)
    window.addEventListener('touchstart', this.changeHeadshot)
    window.addEventListener('touchmove', this.changeHeadshot)
  },
  methods: {
    changeHeadshot(event) {
      const headshots = this.$refs.headshots
      if (headshots === undefined) {
        return
      }

      let clientX
      let clientY
      try {
        clientX = event.clientX || event.changedTouches[0].clientX
        clientY = event.clientY || event.changedTouches[0].clientY
      } catch (error) {
        return
      }

      const rect = headshots.getBoundingClientRect()
      const mouseX = ((clientX - rect.left) * 10) / rect.width
      const mouseY = ((clientY - rect.top) * 10) / rect.height

      const closestHeadshot = Array.from(headshots.children).reduce(
        (closest, headshot) => {
          const pointX = headshot.dataset.x
          const pointY = headshot.dataset.y

          const distance = {
            x: Math.abs(mouseX - pointX),
            y: Math.abs(mouseY - pointY)
          }

          if (
            distance.y < closest.distance.y ||
            (distance.y === closest.distance.y &&
              distance.x < closest.distance.x)
          ) {
            return {
              distance,
              headshot
            }
          } else {
            return closest
          }
        },
        {
          distance: {
            x: Infinity,
            y: Infinity
          },
          headshot: headshots.children[0]
        }
      )

      Array.from(headshots.children).forEach((headshot) => {
        headshot.style.visibility = 'hidden'
      })
      closestHeadshot.headshot.style.visibility = 'visible'
    }
  }
}
</script>

<style lang="scss">
.headshots {
  bottom: 0;
  filter: sepia(1) hue-rotate(-45deg) hue-rotate($color__primary--hue)
    saturate(1.5) brightness(1.2) contrast(0.9);
  height: calc(20vh + 30vw);
  overflow-y: hidden;
  pointer-events: none;
  position: absolute;
  right: 1.5rem;
  width: calc(15vh + 22.5vw); // Aspect ratio of 4:3

  @media (min-width: $breakpoint--xl) {
    height: calc(20vh + #{30 / 100 * $breakpoint--xl});
    width: calc(15vh + #{22.5 / 100 * $breakpoint--xl});
  }
}

:root[data-theme='dark'] .headshots {
  filter: contrast(0) sepia(1) hue-rotate(-45deg)
    hue-rotate($color__primary--hue) saturate(3) brightness(0.8);
}

.headshots__image {
  height: 100%;
  right: 0;
  position: absolute;
  top: 0;
  visibility: hidden;

  &:first-child {
    visibility: visible;
  }

  img {
    height: 100%;
  }
}
</style>
