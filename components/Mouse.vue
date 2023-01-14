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
      this.$refs.mouse.style.transform = `translate(calc(${this.x}px - 50%), calc(${this.y}px - 50%))`
      this.rAF = requestAnimationFrame(this.changeStyle)
    }
  }
}
</script>

<style lang="scss">
@media (pointer: fine) {
  html:hover .mouse {
    opacity: 0.1;
  }
}

@supports (pointer-events: none) {
  .mouse {
    background-image: radial-gradient($color__primary, transparent 50%);
    left: 0;
    height: 20rem;
    opacity: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    transition: height 300ms $transition__normal,
      width 300ms $transition__normal, opacity 300ms $transition__normal;
    width: 20rem;
    z-index: 100;
  }

  :not(#__wrapper):hover > .mouse {
    height: 40rem;
    width: 40rem;
  }
}
</style>
