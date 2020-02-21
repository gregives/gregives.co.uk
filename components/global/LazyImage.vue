<template>
  <div class="lazy">
    <picture :style="{ width }">
      <source :data-srcset="srcsetWebp" type="image/webp" />
      <source :data-srcset="srcset" :type="format" />
      <img :src="lqip" :alt="alt" class="lazy__image lazy__image--load" />
    </picture>
  </div>
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
      default: null
    }
  },
  computed: {
    format() {
      return this.src.split('.').pop()
    },
    srcset() {
      return require(`~/assets/images/dynamic/${this.src}?srcset`)
    },
    srcsetWebp() {
      return require(`~/assets/images/dynamic/${this.src}?srcset&format=webp`)
    },
    lqip() {
      return require(`~/assets/images/dynamic/${this.src}?size=20&format=jpeg&inline`)
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
  margin: -0.5rem;
  max-width: none;
  width: calc(100% + 1rem);

  &--loaded {
    filter: none;
    margin: 0;
    width: 100%;
  }
}
</style>
