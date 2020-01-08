<template>
  <div class="lazy">
    <picture :style="{ width }">
      <source :data-srcset="webp" type="image/webp" />
      <source :data-srcset="responsive" :type="type" />
      <img
        :src="preview"
        :data-src="original"
        class="lazy__image lazy__image--load"
        :alt="alt"
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
.lazy__image {
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
