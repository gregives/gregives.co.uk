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
      required: true
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
      return require(`~/assets/images/lazy/${this.src}?webp`)
    },
    responsive() {
      return require(`~/assets/images/lazy/${this.src}?resize`).srcSet
    },
    sqip() {
      return require(`~/assets/images/lazy/${this.src}?sqip`)
    },
    original() {
      return require(`~/assets/images/lazy/${this.src}`)
    }
  }
}
</script>

<style lang="scss">
.lazy-image {
  filter: drop-shadow(0 0 0.5rem transparentize(black, 0.9));
}
</style>
