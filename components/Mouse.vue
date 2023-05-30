<template>
  <div ref="mouse" class="mouse"></div>
</template>

<script>
export default {
  data() {
    return {
      x: 0,
      y: 0,
      rAF: null
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.calculatePositionWithinParent)
    window.addEventListener('touchstart', this.calculatePositionWithinParent)
    window.addEventListener('touchmove', this.calculatePositionWithinParent)

    this.rAF = requestAnimationFrame(this.changeStyle)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.calculatePositionWithinParent)
    window.removeEventListener('touchstart', this.calculatePositionWithinParent)
    window.removeEventListener('touchmove', this.calculatePositionWithinParent)

    cancelAnimationFrame(this.rAF)
  },
  methods: {
    calculatePositionWithinParent(event) {
      try {
        this.x = Math.round(event.clientX || event.changedTouches[0].clientX)
        this.y = Math.round(event.clientY || event.changedTouches[0].clientY)
      } catch {
        // Don't worry about errors
      }
    },
    changeStyle() {
      try {
        let [newX, newY] = [this.x, this.y]

        const Matrix = window.DOMMatrix || window.WebKitCSSMatrix
        if (Matrix) {
          const style = window.getComputedStyle(this.$refs.mouse)
          const matrix = new Matrix(style.transform)

          const oldX = matrix.m41 + style.width.replace('px', '') / 2
          const oldY = matrix.m42 + style.width.replace('px', '') / 2

          newX = oldX + (newX - oldX) / 15
          newY = oldY + (newY - oldY) / 15
        }

        this.$refs.mouse.style.transform = `translate3d(calc(${newX}px - 50%), calc(${newY}px - 50%), 0)`
      } catch {
        // We don't care about this error
      } finally {
        this.rAF = requestAnimationFrame(this.changeStyle)
      }
    }
  }
}
</script>

<style lang="scss">
@supports (pointer-events: none) {
  @media screen and (pointer: fine) {
    html:hover .mouse {
      opacity: 0.1;
    }

    .mouse {
      background-image: radial-gradient($color__primary 5%, transparent 50%);
      left: 0;
      height: 20rem;
      opacity: 0;
      pointer-events: none;
      position: fixed;
      top: 0;
      transform: translate3d(0, 0, 0);
      transition: height 300ms $transition__normal,
        width 300ms $transition__normal, opacity 300ms $transition__normal 600ms;
      width: 20rem;
      will-change: transform;
      z-index: 100;
    }

    :not(#__layout > div):hover > .mouse {
      height: 40rem;
      width: 40rem;
    }
  }
}
</style>
