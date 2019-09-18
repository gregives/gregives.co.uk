<template>
  <picture>
    <source :data-srcset="webp" type="image/webp" />
    <source :data-srcset="responsive.srcSet" type="image/png" />
    <img :data-src="original" class="lazyload" :alt="alt" />
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
    }
  },
  computed: {
    webp() {
      return this.src ? require(`~/assets/images/lazy/${this.src}?webp`) : ''
    },
    responsive() {
      return this.src ? require(`~/assets/images/lazy/${this.src}?resize`) : ''
    },
    original() {
      return this.src ? require(`~/assets/images/lazy/${this.src}`) : ''
    }
  }
}
</script>
