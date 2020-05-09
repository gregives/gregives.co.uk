<template>
  <div class="lazy">
    <picture :style="width ? { width } : false">
      <source :data-srcset="srcsetWebp" :sizes="sizes" type="image/webp" />
      <source :data-srcset="srcset" :sizes="sizes" :type="format" />
      <img
        :src="lqip"
        :alt="alt"
        :class="{ 'lazy__image--load': mounted }"
        class="lazy__image"
      />
      <!-- Fallback image -->
      <noscript inline-template>
        <img
          :src="original"
          :alt="alt"
          class="lazy__image lazy__image--loaded"
        />
      </noscript>
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
    sizes: {
      type: String,
      default: '(min-width: 992px) 75vw, 100vw'
    },
    width: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      mounted: false
    }
  },
  computed: {
    format() {
      return `image/${this.src.split('.').pop()}`
    },
    srcRel() {
      return this.src.replace(/^\/assets\/images\/dynamic\//, '')
    },
    srcset() {
      return require(`~/assets/images/dynamic/${this.srcRel}?srcset`)
    },
    srcsetWebp() {
      return require(`~/assets/images/dynamic/${this.srcRel}?srcset&format=webp`)
    },
    lqip() {
      return require(`~/assets/images/dynamic/${this.srcRel}?size=20&format=jpeg&inline`)
    },
    original() {
      return require(`~/assets/images/dynamic/${this.srcRel}`)
    }
  },
  mounted() {
    this.mounted = true
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
    max-width: 100%;
    width: 100%;
  }
}
</style>
