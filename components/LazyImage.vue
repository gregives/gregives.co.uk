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
      } catch (error) {
        return false
      }
    },
    responsive() {
      try {
        return require(`~/assets/images/lazy/${this.src}?resize`).srcSet
      } catch (error) {
        return false
      }
    },
    preview() {
      try {
        return require(`~/assets/images/lazy/${this.src}?resize`).placeholder
      } catch (error) {
        return false
      }
    },
    original() {
      try {
        return require(`~/assets/images/lazy/${this.src}`)
      } catch (error) {
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
  background-color: $color--body-overlay;
  display: block;
  filter: blur(0.5rem);
  width: 100%;
}

.lazy__image--loaded {
  filter: none;
}
</style>
