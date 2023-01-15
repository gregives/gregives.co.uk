<template>
  <li
    class="project-card"
    :class="{
      'project-card--large': project.title === 'Eleventy Critical CSS',
      'project-card--myles': project.title === 'Myles Wellbeing'
    }"
  >
    <div v-if="project.image" class="project-card__image">
      <lazy-image
        :src="project.image"
        :alt="title"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
    </div>
    <div class="project-card__content">
      <h2 class="project-card__title">
        <a
          v-if="project.website || project.github"
          :href="project.website || project.github"
          class="project-card__link"
        >
          {{ title }}
        </a>
        <nuxt-link v-else :to="project.link" class="project-card__link">
          {{ title }}
        </nuxt-link>
      </h2>
      <p v-if="project.stars" class="project-card__stars">
        <star-icon /> {{ project.stars }}
      </p>
      <p class="project-card__description">{{ project.description }}</p>
      <mouse v-if="!project.image || project.title === 'Myles Wellbeing'" />
    </div>
  </li>
</template>

<script>
import StarIcon from 'icons/Star'
import Mouse from '~/components/Mouse'

export default {
  components: {
    StarIcon,
    Mouse
  },
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return this.project.titleShort || this.project.title
    }
  }
}
</script>

<style lang="scss">
.project-card {
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    .project-card__image::after {
      opacity: 0.5;
    }
  }

  &--large {
    grid-column: 1 / -1;

    .project-card__content {
      margin-top: 0;
      margin-left: 0;
    }
  }

  &--myles {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;

    @media (min-width: $breakpoint--sm) {
      flex-direction: row;
    }
  }
}

:not(.project-card--myles) > .project-card__image {
  background-color: $color__body;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  overflow: hidden;
  padding-bottom: 50%;
  position: relative;
  width: calc(100% - 1.5rem);
  z-index: -1;

  &::after {
    background-image: radial-gradient(
      circle at left,
      $color__primary--muted,
      $color__primary
    );
    content: '';
    inset: 0;
    opacity: 0;
    position: absolute;
    transition: opacity 150ms $transition__normal;
  }

  .lazy {
    inset: 0;
    position: absolute;

    picture {
      height: 100%;
      padding-bottom: 0;
      width: 100%;

      .lazy__image {
        object-position: top left;
      }
    }
  }
}

.project-card--myles > .project-card__image {
  background-color: transparent;
  filter: drop-shadow(0 0 0.5rem $color__accent--muted);
  margin: 0 auto;
  max-width: 15rem;
  position: relative;
  width: 100%;

  &::before {
    background-color: $color__accent;
    border-radius: 16% / 9%;
    box-shadow: 0 0 3rem 2rem $color__accent;
    content: '';
    left: 1rem;
    opacity: 0.2;
    padding-bottom: calc(200% - 2rem);
    position: absolute;
    top: 1rem;
    width: calc(100% - 2rem);

    @media (min-width: $breakpoint--sm) {
      box-shadow: 0 0 6rem 3rem $color__accent;
      padding-bottom: calc(200% - 4rem);
      top: 2rem;
      width: calc(100% - 5rem);
    }
  }

  > .lazy {
    background-color: transparent;
    border-radius: 16% / 9%;
    overflow: hidden;
  }

  @media (min-width: $breakpoint--sm) {
    max-width: none;
    min-width: 15rem;
    width: math.div(100%, 3);
    z-index: 1;
  }
}

.project-card__image ~ .project-card__content {
  clip-path: none;
}

.project-card__content {
  background-color: $color__body--overlay;
  border: $border-weight solid $color__primary--muted;
  border-radius: $border-radius;
  box-shadow: $box-shadow--small;
  clip-path: inset(0 0 0 0 round $border-radius);
  flex-grow: 1;
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

.project-card--myles > .project-card__content {
  clip-path: inset(0 0 0 0 round $border-radius);
  margin-left: 0;
  margin-top: -8rem;

  @media (min-width: $breakpoint--sm) {
    margin-bottom: 5rem;
    margin-left: -1rem;
    margin-top: 5rem;
    padding-left: 3rem;
  }
}

.project-card__title {
  @include h3;

  display: inline-block;
  margin-bottom: 0.5rem;
}

.project-card__stars {
  color: $color__primary;
  pointer-events: none;
  position: absolute;
  right: 2rem;
  margin-top: -2.5rem;

  .material-design-icon svg {
    vertical-align: top;
  }
}

.project-card__link {
  @include link($color__body--overlay, $heading: true);

  &::after {
    content: '';
    inset: 0;
    position: absolute;
  }
}
</style>
