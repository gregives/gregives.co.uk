<template>
  <div class="headshots">
    <div ref="headshot" :class="headshot" class="headshots__image"></div>
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
      x: null,
      y: null
    }
  },
  computed: {
    headshot() {
      return `headshots__image--${this.error ? 'error' : this.closestHeadshot}`
    }
  },
  mounted() {
    if (!this.error) {
      window.addEventListener('mousemove', this.storeMousePosition)
      window.addEventListener('touchstart', this.storeMousePosition)
      window.addEventListener('touchmove', this.storeMousePosition)

      requestAnimationFrame(this.changeHeadshot)
    }
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.storeMousePosition)
    window.removeEventListener('touchstart', this.storeMousePosition)
    window.removeEventListener('touchmove', this.storeMousePosition)
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
        requestAnimationFrame(this.changeHeadshot)
        return
      }

      let rect
      try {
        rect = this.$refs.headshot.getBoundingClientRect()
      } catch (error) {
        requestAnimationFrame(this.changeHeadshot)
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

      requestAnimationFrame(this.changeHeadshot)
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
  pointer-events: none;
  position: absolute;
  right: 1.5rem;
  width: calc(15vh + 22.5vw); // Aspect ratio of 4:3

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
  background-image: url('~assets/images/headshots.png');
  background-image: url('~assets/images/headshots.png?format=webp&quality=70');
  background-repeat: no-repeat;
  background-size: 700%;
  bottom: -0.5rem;
  height: calc(100% + 0.5rem);
  right: 0;
  position: absolute;
  width: 100%;
}

.headshots__image--_k_f {
  background-position: 0 0;
}

.headshots__image--_la {
  background-position: (100% / 6) 0;
}

.headshots__image--_pd {
  background-position: (200% / 6) 0;
}

.headshots__image--_r_f {
  background-position: (300% / 6) 0;
}

.headshots__image--_sa {
  background-position: (400% / 6) 0;
}

.headshots__image--_bd {
  background-position: (500% / 6) 0;
}

.headshots__image--ia {
  background-position: (600% / 6) 0;
}

.headshots__image--_ug {
  background-position: 0 (100% / 3);
}

.headshots__image--_xd {
  background-position: (100% / 6) (100% / 3);
}

.headshots__image--_c_f {
  background-position: (200% / 6) (100% / 3);
}

.headshots__image--_da {
  background-position: (300% / 6) (100% / 3);
}

.headshots__image--_f_f {
  background-position: (400% / 6) (100% / 3);
}

.headshots__image--_hg {
  background-position: (500% / 6) (100% / 3);
}

.headshots__image--id {
  background-position: (600% / 6) (100% / 3);
}

.headshots__image--_jd {
  background-position: 0 (200% / 3);
}

.headshots__image--ag {
  background-position: (100% / 6) (200% / 3);
}

.headshots__image--k_f {
  background-position: (200% / 6) (200% / 3);
}

.headshots__image--ma {
  background-position: (300% / 6) (200% / 3);
}

.headshots__image--od {
  background-position: (400% / 6) (200% / 3);
}

.headshots__image--og {
  background-position: (500% / 6) (200% / 3);
}

.headshots__image--jg {
  background-position: (600% / 6) (200% / 3);
}

.headshots__image--c_f {
  background-position: 0 (300% / 3);
}

.headshots__image--ca {
  background-position: (100% / 6) (300% / 3);
}

.headshots__image--ea {
  background-position: (200% / 6) (300% / 3);
}

.headshots__image--f_f {
  background-position: (300% / 6) (300% / 3);
}

.headshots__image--fd {
  background-position: (400% / 6) (300% / 3);
}

.headshots__image--fg {
  background-position: (500% / 6) (300% / 3);
}

.headshots__image--error {
  background-position: (600% / 6) (300% / 3) !important;
}
</style>
