<template>
  <div class="home">
    <shapes />
    <div class="container">
      <div class="home__hero">
        <h1 class="home__title">I am&nbsp;<typer /></h1>
        <p class="home__description">
          Hi there! I'm a final-year Computer Science student at the University
          of Sheffield. I'm looking for an opportunity in software development
          from June&nbsp;2020 &mdash; check out my projects and experience or
          <nuxt-link to="/contact">contact me</nuxt-link>!
        </p>
      </div>
      <div ref="headshots" class="headshots">
        <picture
          v-for="head in heads"
          :key="head.png"
          class="headshots__image"
          :data-x="head.x"
          :data-y="head.y"
        >
          <source :srcset="head.webp" type="image/webp" />
          <source :srcset="head.png" type="image/png" />
          <img :src="head.png" alt="Headshot of Greg Ives" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script>
import Shapes from '~/components/Shapes'
import Typer from '~/components/Typer'

const path = require('path')
const files = require.context('~/assets/images/headshots/', false, /\.png$/)
const heads = Array.from(files.keys()).map((file) => {
  const basename = path.basename(file)
  const coords = basename.replace(/\..*/, '').split('_')
  return {
    x: parseInt(coords[0]),
    y: parseInt(coords[1]),
    png: require(`~/assets/images/headshots/${basename}`),
    webp: require(`~/assets/images/headshots/${basename}?webp`)
  }
})

export default {
  components: {
    Shapes,
    Typer
  },
  data() {
    return {
      heads
    }
  },
  mounted() {
    this.$tilt(document.querySelectorAll('[data-tilt]'))

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

.home {
  height: 100%;
  overflow-y: hidden;

  .container {
    height: 100%;
  }
}

.home__hero {
  margin-top: calc(5vw - 7rem);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.home__description {
  font-size: 120%;
  width: 100%;

  @media (min-width: $break-md) {
    width: 70%;
  }
}

.headshots {
  bottom: calc(-2vh - 3vw);
  filter: saturate(0) sepia(1) hue-rotate(170deg) saturate(2);
  height: calc(20vh + 30vw);
  position: absolute;
  right: -5vw;

  @media (min-width: $break-xl) {
    height: calc(20vh + #{30 / 100 * $break-xl});
    bottom: calc(-2vh - #{3 / 100 * $break-xl});
  }
}

.headshots__image {
  display: none;
  height: 100%;

  &[data-x='5'][data-y='3'] {
    display: block;
  }

  img {
    height: 100%;
  }
}
</style>
