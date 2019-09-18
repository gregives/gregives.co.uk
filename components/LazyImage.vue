<template>
  <picture :style="{ width }">
    <source :data-srcset="webp" type="image/webp" />
    <source :data-srcset="responsive.srcSet" type="image/png" />
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
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  computed: {
    webp() {
      return this.src ? require(`~/assets/images/lazy/${this.src}?webp`) : ''
    },
    responsive() {
      return this.src ? require(`~/assets/images/lazy/${this.src}?resize`) : ''
    },
    sqip() {
      return this.src ? require(`~/assets/images/lazy/${this.src}?sqip`) : ''
    },
    original() {
      return this.src ? require(`~/assets/images/lazy/${this.src}`) : ''
    }
  }
}
</script>
