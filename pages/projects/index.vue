<template>
  <main class="projects">
    <h1 class="projects__title">
      My <span class="projects__title--primary">Projects</span>
    </h1>
    <ol class="projects__list">
      <li
        v-for="project in projects"
        :key="project.title"
        class="projects__list-item"
      >
        <nuxt-link :to="project.link" class="projects__list-link">
          <div
            :data-title="project.titleShort || project.title"
            :style="
              `--scroll-speed: ${(project.titleShort || project.title).length /
                1.5}s`
            "
            class="projects__list-image"
          >
            <lazy-image :src="project.image" :alt="project.title" />
          </div>
          <div class="projects__list-content">
            <h3 class="projects__list-title">
              {{ project.titleShort || project.title }}
            </h3>
            <small class="projects__list-date">
              {{ project.date.getFullYear() }}
            </small>
            <p
              v-html="project.description"
              class="projects__list-description"
            ></p>
          </div>
        </nuxt-link>
      </li>
    </ol>
  </main>
</template>

<script>
export default {
  computed: {
    projects() {
      return this.$store.state.projects.projects
    }
  },
  head() {
    return {
      title: 'Projects'
    }
  },
  async fetch({ store }) {
    await store.dispatch('projects/setProjects')
  }
}
</script>

<style lang="scss">
.projects {
  $clip-path: polygon(
    0% 30%,
    0% 20%,
    100% 10%,
    100% 20%,
    100% 30%,
    80% 50%,
    100% 80%,
    100% 100%,
    60% 100%,
    0% 70%,
    0% 100%,
    100% 100%,
    100% 20%
  );
  @include page;
  @include dots($clip-path);
}

.projects__title {
  @include title;
}

.projects__title--primary {
  @include title--primary;
}

.projects__list {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 3rem;

  @media (min-width: $breakpoint--md) {
    grid-template-columns: 1fr 1fr;
  }
}

.projects__list-link {
  display: block;

  &:hover {
    .projects__list-content {
      border-color: $color__primary;
      box-shadow: $box-shadow;
    }

    .projects__list-title {
      color: $color__primary;
    }

    .projects__list-image {
      &::before {
        animation-play-state: running;
        opacity: 0.3;
      }

      &::after {
        opacity: 0.6;
      }
    }
  }
}

.projects__list-title {
  display: inline-block;
  margin-bottom: 1rem;
}

.projects__list-date {
  color: $color__text--muted;
  font-family: $font__fancy;
  font-size: 90%;

  &::before {
    content: '\2014';
  }
}

.projects__list-image {
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
    background-color: $color__primary;
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

.projects__list-content {
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
