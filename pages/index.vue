<template>
  <div id="home">
    <shapes />
    <div class="container">
      <div class="centre-y">
        <h1>
          I am
          <typer />
        </h1>
        <div class="description">
          Hi there! I'm a final-year Computer Science student at the University
          of Sheffield. I'm looking for an opportunity in software development
          from June&nbsp;2020 &mdash; check out my projects and experience or
          <nuxt-link to="/contact">contact me</nuxt-link>!
        </div>
      </div>
      <div class="headshots">
        <picture
          v-for="head in heads()"
          :key="head.png"
          class="headshots__image"
          :data-xy="`${head.x}${head.y}`"
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

export default {
  components: {
    Shapes,
    Typer
  },
  data() {
    return {
      heads() {
        const heads = []
        for (let y = 1; y <= 5; y++) {
          for (let x = 1; x <= 6; x++) {
            const png = require(`~/assets/images/headshots/${y}${x}.png`)
            const webp = require(`~/assets/images/headshots/${y}${x}.png?webp`)
            heads.push({ x, y, png, webp })
          }
        }
        return heads
      }
    }
  },
  mounted() {
    this.$tilt(document.querySelectorAll('[data-tilt]'))

    window.addEventListener('mousemove', (event) => {
      const x = Math.floor((event.clientX / window.innerWidth) * 6) + 1
      const y = Math.floor((event.clientY / window.innerHeight) * 5) + 1

      const headshots = Array.from(
        document.getElementsByClassName('headshots__image')
      )

      headshots.forEach((headshot) => {
        if (headshot.dataset.xy === `${x}${y}`) {
          headshot.style.display = 'block'
        } else {
          headshot.style.display = 'none'
        }
      })
    })
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

#home {
  height: 100%;
  overflow-y: hidden;

  .container {
    height: 100%;
  }

  .centre-y {
    margin-top: calc(5vw - 7rem);

    > div {
      font-size: 120%;
      width: 100%;

      @media (min-width: $break-md) {
        width: 70%;
      }
    }
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

  &[data-xy='53'] {
    display: block;
  }

  img {
    height: 100%;
  }
}
</style>
