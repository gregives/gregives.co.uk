<template>
  <li class="project-card">
    <div :data-title="title" :style="scrollSpeed" class="project-card__image">
      <lazy-image :src="project.image" :alt="title" />
    </div>
    <div class="project-card__content">
      <h3 class="project-card__title">
        <nuxt-link :to="project.link" class="project-card__link">
          {{ title }}
        </nuxt-link>
      </h3>
      <small class="project-card__date">&mdash; {{ date }}</small>
      <p class="project-card__description">{{ project.description }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return this.project.titleShort || this.project.title
    },
    date() {
      return this.project.date.toLocaleString('en-GB', {
        month: 'long',
        year: 'numeric'
      })
    },
    scrollSpeed() {
      return `--scroll-speed: ${this.title.length / 1.5}s`
    }
  }
}
</script>

<style lang="scss">
.project-card {
  position: relative;

  &:hover {
    .project-card__image {
      &::before {
        opacity: 0.3;
      }

      &::after {
        opacity: 1;
      }

      .lazy {
        filter: grayscale(0.8);
      }
    }
  }
}

.project-card__image {
  background-color: $color__body;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  overflow: hidden;
  padding-bottom: 50%;
  position: relative;
  width: 100%;
  z-index: -1;

  &::before {
    animation: 10s infinite linear scroll;
    animation-duration: var(--scroll-speed);
    bottom: -1.5rem;
    color: $color__body--overlay;
    content: '\00A0\00A0'attr(data-title) '\00A0\00A0'attr(data-title)
      '\00A0\00A0'attr(data-title);
    font-family: $font__fancy;
    font-size: 10rem;
    left: 0;
    opacity: 0;
    position: absolute;
    transition: opacity 300ms $transition__normal;
    white-space: nowrap;
    z-index: 1;
  }

  @keyframes scroll {
    from {
      transform: translateX(#{-1/3 * 100%});
    }

    to {
      transform: translateX(#{-2/3 * 100%});
    }
  }

  &::after {
    background-color: $color__primary--muted;
    background-image: linear-gradient(transparent, $color__primary);
    content: '';
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 300ms $transition__normal;
    width: 100%;
  }

  .lazy {
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: filter 300ms $transition__normal;
    width: 100%;

    picture {
      height: 100%;

      .lazy__image {
        height: 100%;
        object-fit: cover;
        object-position: top left;
      }
    }
  }
}

.project-card__content {
  background: linear-gradient(transparent 75%, #{transparentize(black, 0.95)}),
    $color__body--overlay;
  border: $border-weight solid $color__primary--muted;
  border-radius: $border-radius;
  box-shadow: $box-shadow--small;
  margin-top: -3rem;
  margin-left: 1.5rem;
  padding: 1.5rem;
  padding-top: 1rem;
  transition: box-shadow 150ms $transition__normal,
    border-color 150ms $transition__normal;

  &:hover {
    border-color: $color__primary;
    box-shadow: $box-shadow;
  }
}

.project-card__title {
  display: inline-block;
  margin-bottom: 0.5rem;
}

.project-card__link {
  @include link($color__body--overlay);

  &::after {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    content: '';
    top: 0;
  }
}

.project-card__date {
  color: $color__text--muted;
}
</style>
