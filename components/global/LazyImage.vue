<template>
  <div class="lazy">
    <picture :style="{ width }">
      <source :data-srcset="image.webpSrcSet" type="image/webp" />
      <source :data-srcset="image.srcSet" :type="image.format" />
      <img :src="image.lqip" :alt="alt" class="lazy__image lazy__image--load" />
    </picture>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: [String, Object],
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
    image() {
      const src = typeof this.src === 'object' && this.src
      return src || require(`~/assets/images/dynamic/${this.src}?lazy`)
    }
  }
}
</script>

<style lang="scss">
.lazy {
  background-color: $color__body;
  border-radius: $border-radius;
  width: 100%;

  picture {
    border-radius: $border-radius;
    filter: drop-shadow(0 0 0.5rem transparentize(black, 0.8));
    overflow: hidden;
  }
}

.lazy__image {
  display: block;
  filter: blur(0.5rem);
  width: 100%;

  &--loaded {
    filter: none;
  }
}
</style>
