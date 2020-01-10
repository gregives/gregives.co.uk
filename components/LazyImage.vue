<template>
  <div class="lazy">
    <picture :style="{ width }">
      <source :data-srcset="webp" type="image/webp" />
      <source :data-srcset="responsive" :type="type" />
      <img
        :src="preview"
        :data-src="original"
        :alt="alt"
        class="lazy__image lazy__image--load"
      />
    </picture>
  </div>
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
    type() {
      return `image/${this.src.split('.').pop()}`
    },
    webp() {
      try {
        return require(`~/assets/images/lazy/${this.src}?webp`)
      } catch (e) {
        return false
      }
    },
    responsive() {
      try {
        return require(`~/assets/images/lazy/${this.src}?resize`).srcSet
      } catch (e) {
        return false
      }
    },
    preview() {
      try {
        return require(`~/assets/images/lazy/${this.src}?resize`).placeholder
      } catch (e) {
        return false
      }
    },
    original() {
      try {
        return require(`~/assets/images/lazy/${this.src}`)
      } catch (e) {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.lazy {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  overflow: hidden;
  width: 100%;
}

.lazy__image {
  background-image: repeating-linear-gradient(
    45deg,
    $color--body-blur,
    $color--body-blur 0.25rem,
    transparent 0.25rem,
    transparent 0.5rem
  );
  display: block;
  filter: blur(0.5rem);
  transition: filter 150ms ease-out;
  width: 100%;

  &--loaded {
    filter: none;
  }
}
</style>
