<template>
  <div ref="headshots" class="headshots">
    <picture
      v-for="head in heads"
      :key="head.png"
      class="headshots__image"
      :data-x="head.x"
      :data-y="head.y"
    >
      <source :srcset="head.lazy ? false : head.webp" type="image/webp" />
      <source :srcset="head.lazy ? false : head.png" type="image/png" />
      <img :src="head.lazy ? false : head.png" alt="Headshot of Greg Ives" />
    </picture>
  </div>
</template>

<script>
export default {
  data() {
    return {
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

    window.addEventListener('mousemove', (event) => {
      const headshots = this.$refs.headshots
      if (headshots === undefined) {
        return
      }
      const rect = headshots.getBoundingClientRect()

      const mouseX = ((event.clientX - rect.x) * 10) / rect.width
      const mouseY = ((event.clientY - rect.y) * 10) / rect.height

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
          headshot: headshots[0]
        }
      )

      Array.from(headshots.children).forEach((headshot) => {
        headshot.style.display = 'none'
      })
      closestHeadshot.headshot.style.display = 'block'
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

.headshots {
  bottom: 0;
  filter: sepia(1) hue-rotate(#{hue($color-primary) - 50deg}) saturate(2);
  height: calc(20vh + 30vw);
  pointer-events: none;
  position: absolute;
  right: -2vw;

  @media (min-width: $break-xl) {
    height: calc(20vh + #{30 / 100 * $break-xl});
    bottom: calc(-2vh - #{3 / 100 * $break-xl});
  }
}

.headshots__image {
  display: none;
  height: 100%;

  &:first-child {
    display: block;
  }

  img {
    height: 100%;
  }
}
</style>
