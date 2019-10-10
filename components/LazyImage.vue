<template>
  <picture :style="{ width }">
    <source :data-srcset="webp" type="image/webp" />
    <source :data-srcset="responsive" type="image/png" />
    <img
      :src="sqip"
      :data-src="original"
      class="lazy-image lazy-image--load"
      :alt="alt"
    />
  </picture>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    webp() {
      if (!this.src) return false
      return require(`~/assets/images/lazy/${this.src}?webp`)
    },
    responsive() {
      if (!this.src) return false
      return require(`~/assets/images/lazy/${this.src}?resize`).srcSet
    },
    sqip() {
      if (!this.src) return false
      return require(`~/assets/images/lazy/${this.src}?sqip`)
    },
    original() {
      if (!this.src) return false
      return require(`~/assets/images/lazy/${this.src}`)
    }
  }
}
</script>

<style lang="scss">
.lazy-image {
  filter: drop-shadow(0 0 0.5rem transparentize(black, 0.9));

  &:not([src]) {
    &::before,
    &::after {
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }

    &::before {
      background-color: $color--body;
    }

    &::after {
      background-color: $color--primary-muted;
    }
  }
}
</style>
