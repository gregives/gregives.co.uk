<template>
  <li class="project-card">
    <nuxt-link :to="project.link" class="project-card__link">
      <div
        :data-title="title"
        :style="`--scroll-speed: ${title.length / 1.5}s`"
        class="project-card__image"
      >
        <lazy-image :src="project.image" :alt="title" />
      </div>
      <div class="project-card__content">
        <h3 class="project-card__title">{{ title }}</h3>
        <small class="project-card__date">{{ date }}</small>
        <p v-html="project.description" class="project-card__description"></p>
      </div>
    </nuxt-link>
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
      return this.project.date.getFullYear()
    }
  }
}
</script>

<style lang="scss">
.project-card__link {
  display: block;

  &:hover {
    .project-card__content {
      border-color: $color__primary;
      box-shadow: $box-shadow;
    }

    .project-card__title {
      color: $color__primary;
    }

    .project-card__image {
      &::before {
        animation-play-state: running;
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

.project-card__title {
  display: inline-block;
  margin-bottom: 1rem;
}

.project-card__date {
  color: $color__text--muted;
  font-family: $font__fancy;
  font-size: 90%;

  &::before {
    content: '\2014';
  }
}

.project-card__image {
  background-color: $color__body;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  margin-right: 1.5rem;
  overflow: hidden;
  padding-bottom: calc(50% - 0.75rem);
  position: relative;
  width: calc(100% - 1.5rem);

  &::before {
    animation: 10s infinite linear scroll;
    animation-duration: var(--scroll-speed);
    animation-play-state: paused;
    bottom: -25%;
    color: $color__body--overlay;
    content: '\00A0\00A0'attr(data-title) '\00A0\00A0'attr(data-title)
      '\00A0\00A0'attr(data-title);
    font-family: $font__fancy;
    font-size: 10em;
    left: 0;
    opacity: 0;
    position: absolute;
    transition: opacity 300ms ease;
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
    transition: opacity 300ms ease;
    width: 100%;
  }

  .lazy {
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: filter 300ms ease-out;
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
  margin-top: -1.5rem;
  margin-left: 1.5rem;
  padding: 1.5rem;
  position: relative;
  transition: box-shadow 150ms ease-out, border-color 150ms ease-out;
  z-index: 1;
}
</style>
