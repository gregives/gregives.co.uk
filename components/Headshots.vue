<template>
  <div class="headshots">
    <div ref="headshot" :class="headshot" class="headshots__image">
      <picture>
        <source
          :srcset="previewAvif"
          :data-srcset="srcsetAvif"
          :sizes="sizes"
          type="image/avif"
        />
        <source
          :srcset="previewWebp"
          :data-srcset="srcsetWebp"
          :sizes="sizes"
          type="image/webp"
        />
        <source :data-srcset="srcset" :sizes="sizes" type="image/png" />
        <img
          :src="preview"
          :class="{ 'lazy__image--load': mounted }"
          alt="Interactive photo of Greg Ives"
          class="lazy__image"
          width="3150"
          height="2400"
        />
      </picture>
    </div>
  </div>
</template>

<script>
import headshots from '~/config/headshots'

export default {
  data() {
    return {
      closestHeadshot: 'fd',
      mounted: false,
      x: null,
      y: null,
      rAF: null,
      sizes: '(min-width: 1200px) 25vw, (min-width: 992px) 33vw, 50vw'
    }
  },
  computed: {
    headshot() {
      return `headshots__image--${this.closestHeadshot}`
    },
    preview() {
      return require('~/assets/images/headshots--fd.png')
    },
    previewWebp() {
      return require('~/assets/images/headshots--fd.png?format=webp')
    },
    previewAvif() {
      return require('~/assets/images/headshots--fd.png?format=avif')
    },
    srcset() {
      return require(`~/assets/images/headshots.png`)
    },
    srcsetWebp() {
      return require(`~/assets/images/headshots.png?format=webp`)
    },
    srcsetAvif() {
      return require(`~/assets/images/headshots.png?format=avif`)
    }
  },
  mounted() {
    this.mounted = true

    window.addEventListener('mousemove', this.storeMousePosition)
    window.addEventListener('touchstart', this.storeMousePosition)
    window.addEventListener('touchmove', this.storeMousePosition)

    this.rAF = requestAnimationFrame(this.changeHeadshot)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.storeMousePosition)
    window.removeEventListener('touchstart', this.storeMousePosition)
    window.removeEventListener('touchmove', this.storeMousePosition)

    cancelAnimationFrame(this.rAF)
  },
  methods: {
    storeMousePosition(event) {
      try {
        this.x = event.clientX || event.changedTouches[0].clientX
        this.y = event.clientY || event.changedTouches[0].clientY
      } catch {
        // Don't worry about errors
      }
    },
    changeHeadshot() {
      try {
        if (this.x === null || this.y === null) {
          throw new Error('Prevent changing headshot without mouse position')
        }

        const rect = this.$refs.headshot.getBoundingClientRect()

        const mouseX = ((this.x - rect.left) * 10) / rect.width
        const mouseY = ((this.y - rect.top) * 10) / rect.height

        const closestHeadshot = headshots.reduce(
          (closest, headshot) => {
            const pointX = headshot[0]
            const pointY = headshot[1]

            const distance = {
              x: Math.abs(mouseX - pointX),
              y: Math.abs(mouseY - pointY)
            }

            const equalY = distance.y === closest.distance.y
            const closerY = distance.y < closest.distance.y
            const closerX = distance.x < closest.distance.x

            return closerY || (equalY && closerX)
              ? { distance, headshot }
              : closest
          },
          {
            distance: {
              x: Infinity,
              y: Infinity
            },
            headshot: headshots[0]
          }
        ).headshot

        this.closestHeadshot = [
          closestHeadshot[0] < 0 ? '_' : '',
          String.fromCharCode(97 + Math.abs(closestHeadshot[0])),
          closestHeadshot[1] < 0 ? '_' : '',
          String.fromCharCode(97 + Math.abs(closestHeadshot[1]))
        ].join('')
      } catch {
        // We don't care about this error
      } finally {
        this.rAF = requestAnimationFrame(this.changeHeadshot)
      }
    }
  }
}
</script>

<style lang="scss">
.headshots {
  filter: sepia(1) hue-rotate(-35deg) hue-rotate($color__primary--hue)
    saturate(2) brightness(1.1) drop-shadow(0 0 1rem $color__primary--muted);
  height: calc(12rem + 20vw - 0.5rem);
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  transform: translate3d(0, 0, 0);
  width: calc(9rem + 15vw); // Aspect ratio of 4:3

  @media (min-width: $breakpoint--xl) {
    height: calc(12rem + #{20 * $breakpoint--xl} / 100 - 0.5rem);
    width: calc(9rem + #{15 * $breakpoint--xl} / 100); // Aspect ratio of 4:3
  }
}

.headshots__image {
  bottom: -0.5rem;
  height: calc(100% + 1rem);
  right: 0;
  position: absolute;
  width: 100%;

  .lazy__image {
    display: block;
    filter: none;
    height: auto;
    left: 0;
    margin: 0;
    max-width: none;
    position: absolute;
    top: 0;
    transform: translate(math.div(-400%, 7), math.div(-300%, 4));
    width: 700%;
  }
}

.headshots__image--_k_f .lazy__image--loaded {
  transform: translate(0, 0);
}

.headshots__image--_la .lazy__image--loaded {
  transform: translate(math.div(-100%, 7), 0);
}

.headshots__image--_pd .lazy__image--loaded {
  transform: translate(math.div(-200%, 7), 0);
}

.headshots__image--_r_f .lazy__image--loaded {
  transform: translate(math.div(-300%, 7), 0);
}

.headshots__image--_sa .lazy__image--loaded {
  transform: translate(math.div(-400%, 7), 0);
}

.headshots__image--_bd .lazy__image--loaded {
  transform: translate(math.div(-500%, 7), 0);
}

.headshots__image--ia .lazy__image--loaded {
  transform: translate(math.div(-600%, 7), 0);
}

.headshots__image--_ug .lazy__image--loaded {
  transform: translate(0, math.div(-100%, 4));
}

.headshots__image--_xd .lazy__image--loaded {
  transform: translate(math.div(-100%, 7), math.div(-100%, 4));
}

.headshots__image--_c_f .lazy__image--loaded {
  transform: translate(math.div(-200%, 7), math.div(-100%, 4));
}

.headshots__image--_da .lazy__image--loaded {
  transform: translate(math.div(-300%, 7), math.div(-100%, 4));
}

.headshots__image--_f_f .lazy__image--loaded {
  transform: translate(math.div(-400%, 7), math.div(-100%, 4));
}

.headshots__image--_hg .lazy__image--loaded {
  transform: translate(math.div(-500%, 7), math.div(-100%, 4));
}

.headshots__image--id .lazy__image--loaded {
  transform: translate(math.div(-600%, 7), math.div(-100%, 4));
}

.headshots__image--_jd .lazy__image--loaded {
  transform: translate(0, math.div(-200%, 4));
}

.headshots__image--ag .lazy__image--loaded {
  transform: translate(math.div(-100%, 7), math.div(-200%, 4));
}

.headshots__image--k_f .lazy__image--loaded {
  transform: translate(math.div(-200%, 7), math.div(-200%, 4));
}

.headshots__image--ma .lazy__image--loaded {
  transform: translate(math.div(-300%, 7), math.div(-200%, 4));
}

.headshots__image--od .lazy__image--loaded {
  transform: translate(math.div(-400%, 7), math.div(-200%, 4));
}

.headshots__image--og .lazy__image--loaded {
  transform: translate(math.div(-500%, 7), math.div(-200%, 4));
}

.headshots__image--jg .lazy__image--loaded {
  transform: translate(math.div(-600%, 7), math.div(-200%, 4));
}

.headshots__image--c_f .lazy__image--loaded {
  transform: translate(0, math.div(-300%, 4));
}

.headshots__image--ca .lazy__image--loaded {
  transform: translate(math.div(-100%, 7), math.div(-300%, 4));
}

.headshots__image--ea .lazy__image--loaded {
  transform: translate(math.div(-200%, 7), math.div(-300%, 4));
}

.headshots__image--f_f .lazy__image--loaded {
  transform: translate(math.div(-300%, 7), math.div(-300%, 4));
}

.headshots__image--fd .lazy__image--loaded {
  transform: translate(math.div(-400%, 7), math.div(-300%, 4));
}

.headshots__image--fg .lazy__image--loaded {
  transform: translate(math.div(-500%, 7), math.div(-300%, 4));
}
</style>
