<template>
  <span class="lazy">
    <picture :style="{ paddingBottom, width }">
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
      default: '(min-width: 992px) 66vw, 100vw'
    },
    width: {
      type: String,
      default: '100%'
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
    },
    paddingBottom() {
      return `calc(${this.width} * ${this.meta.height / this.meta.width})`
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
    overflow: hidden;
    position: relative;

    &::after {
      backdrop-filter: blur(0.5rem);
      content: '';
      inset: 0;
      position: absolute;
      transition: backdrop-filter 150ms $transition__normal--out;
    }
  }

  &--loaded picture::after {
    backdrop-filter: none;
  }
}

.lazy__image {
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  width: 100%;
}

// Add noise to images in the watch blog
.watch,
.watches {
  .lazy--loaded {
    picture {
      filter: url('#noise') brightness(0.9) contrast(1.015) saturate(1.1);
    }
  }
}

[data-theme='dark'] {
  .watch,
  .watches {
    .lazy--loaded {
      picture {
        filter: url('#noise') brightness(1.3) saturate(1.1);
      }
    }
  }
}
</style>
