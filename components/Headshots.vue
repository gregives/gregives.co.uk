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
        />
      </picture>
    </div>
  </div>
</template>

<script>
import headshots from '~/config/headshots'

export default {
  props: {
    error: {
      type: Boolean,
      default: false
    }
  },
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
      return `headshots__image--${this.error ? 'error' : this.closestHeadshot}`
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

    if (!this.error) {
      window.addEventListener('mousemove', this.storeMousePosition)
      window.addEventListener('touchstart', this.storeMousePosition)
      window.addEventListener('touchmove', this.storeMousePosition)

      this.rAF = requestAnimationFrame(this.changeHeadshot)
    }
  },
  beforeDestroy() {
    if (!this.error) {
      window.removeEventListener('mousemove', this.storeMousePosition)
      window.removeEventListener('touchstart', this.storeMousePosition)
      window.removeEventListener('touchmove', this.storeMousePosition)

      cancelAnimationFrame(this.rAF)
    }
  },
  methods: {
    storeMousePosition(event) {
      try {
        this.x = event.clientX || event.changedTouches[0].clientX
        this.y = event.clientY || event.changedTouches[0].clientY
      } catch (error) {
        // Don't worry about errors
      }
    },
    changeHeadshot() {
      if (this.x === null || this.y === null) {
        this.rAF = requestAnimationFrame(this.changeHeadshot)
        return
      }

      let rect
      try {
        rect = this.$refs.headshot.getBoundingClientRect()
      } catch (error) {
        this.rAF = requestAnimationFrame(this.changeHeadshot)
        return
      }

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

      this.rAF = requestAnimationFrame(this.changeHeadshot)
    }
  }
}
</script>

<style lang="scss">
.headshots {
  bottom: 0;
  filter: sepia(1) hue-rotate(-45deg) hue-rotate($color__primary--hue)
    saturate(1.5) brightness(1.2) contrast(0.9);
  height: calc(20vh + 30vw - 1rem);
  overflow: hidden;
  position: absolute;
  right: 1.5rem;
  width: calc(15vh + 22.5vw); // Aspect ratio of 4:3
  z-index: 1;

  @media (min-width: $breakpoint--xl) {
    height: calc(20vh + #{30 / 100 * $breakpoint--xl} - 0.5rem);
    width: calc(15vh + #{22.5 / 100 * $breakpoint--xl});
  }
}

:root[data-theme='dark'] .headshots {
  filter: contrast(0) sepia(1) hue-rotate(-45deg)
    hue-rotate($color__primary--hue) saturate(3) brightness(0.8);
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
    left: 0;
    margin: 0;
    max-width: none;
    position: absolute;
    top: 0;
    transform: translate(-(400% / 7), -(300% / 4));
    width: 700%;
  }
}

.headshots__image--_k_f .lazy__image--loaded {
  transform: translate(0, 0);
}

.headshots__image--_la .lazy__image--loaded {
  transform: translate(-(100% / 7), 0);
}

.headshots__image--_pd .lazy__image--loaded {
  transform: translate(-(200% / 7), 0);
}

.headshots__image--_r_f .lazy__image--loaded {
  transform: translate(-(300% / 7), 0);
}

.headshots__image--_sa .lazy__image--loaded {
  transform: translate(-(400% / 7), 0);
}

.headshots__image--_bd .lazy__image--loaded {
  transform: translate(-(500% / 7), 0);
}

.headshots__image--ia .lazy__image--loaded {
  transform: translate(-(600% / 7), 0);
}

.headshots__image--_ug .lazy__image--loaded {
  transform: translate(0, -(100% / 4));
}

.headshots__image--_xd .lazy__image--loaded {
  transform: translate(-(100% / 7), -(100% / 4));
}

.headshots__image--_c_f .lazy__image--loaded {
  transform: translate(-(200% / 7), -(100% / 4));
}

.headshots__image--_da .lazy__image--loaded {
  transform: translate(-(300% / 7), -(100% / 4));
}

.headshots__image--_f_f .lazy__image--loaded {
  transform: translate(-(400% / 7), -(100% / 4));
}

.headshots__image--_hg .lazy__image--loaded {
  transform: translate(-(500% / 7), -(100% / 4));
}

.headshots__image--id .lazy__image--loaded {
  transform: translate(-(600% / 7), -(100% / 4));
}

.headshots__image--_jd .lazy__image--loaded {
  transform: translate(0, -(200% / 4));
}

.headshots__image--ag .lazy__image--loaded {
  transform: translate(-(100% / 7), -(200% / 4));
}

.headshots__image--k_f .lazy__image--loaded {
  transform: translate(-(200% / 7), -(200% / 4));
}

.headshots__image--ma .lazy__image--loaded {
  transform: translate(-(300% / 7), -(200% / 4));
}

.headshots__image--od .lazy__image--loaded {
  transform: translate(-(400% / 7), -(200% / 4));
}

.headshots__image--og .lazy__image--loaded {
  transform: translate(-(500% / 7), -(200% / 4));
}

.headshots__image--jg .lazy__image--loaded {
  transform: translate(-(600% / 7), -(200% / 4));
}

.headshots__image--c_f .lazy__image--loaded {
  transform: translate(0, -(300% / 4));
}

.headshots__image--ca .lazy__image--loaded {
  transform: translate(-(100% / 7), -(300% / 4));
}

.headshots__image--ea .lazy__image--loaded {
  transform: translate(-(200% / 7), -(300% / 4));
}

.headshots__image--f_f .lazy__image--loaded {
  transform: translate(-(300% / 7), -(300% / 4));
}

.headshots__image--fd .lazy__image--loaded {
  transform: translate(-(400% / 7), -(300% / 4));
}

.headshots__image--fg .lazy__image--loaded {
  transform: translate(-(500% / 7), -(300% / 4));
}

.headshots__image--error .lazy__image--loaded {
  transform: translate(-(600% / 7), -(300% / 4)) !important;
}
</style>
