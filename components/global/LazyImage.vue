<template>
  <span class="lazy">
    <picture :style="width ? { width } : false">
      <source :data-srcset="srcsetWebp" :sizes="sizes" type="image/webp" />
      <source :data-srcset="srcset" :sizes="sizes" :type="meta.format" />
      <img
        :width="meta.width"
        :height="meta.height"
        :src="lqip"
        :alt="alt"
        class="lazy__image lazy__image--load"
      />
      <!-- Fallback image -->
      <noscript inline-template>
        <img
          :width="meta.width"
          :height="meta.height"
          :src="original"
          :alt="alt"
          class="lazy__image lazy__image--loaded"
        />
      </noscript>
    </picture>
  </span>
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
  computed: {
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
    meta() {
      return require(`~/assets/images/dynamic/${this.srcRel}?meta`)
    },
    original() {
      return require(`~/assets/images/dynamic/${this.srcRel}`)
    }
  }
}
</script>

<style lang="scss">
.lazy {
  background-color: $color__body;
  border-radius: $border-radius;
  display: block;
  width: 100%;

  picture {
    border-radius: $border-radius;
    filter: drop-shadow(0 0 0.5rem transparentize(#000, 0.8));
    overflow: hidden;
  }
}

.lazy__image {
  display: block;
  filter: blur(0.5rem);
  height: auto;
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
