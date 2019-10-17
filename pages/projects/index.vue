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
          <div class="projects__list-image">
            <lazy-image :src="project.image" :alt="project.title" />
          </div>
          <div class="projects__list-content">
            <h4 class="projects__list-title">
              {{ project.titleShort || project.title }}
            </h4>
            <small class="projects__list-date">
              {{ project.date.getFullYear() }}
            </small>
            <p
              class="projects__list-description"
              v-html="project.description"
            ></p>
          </div>
        </nuxt-link>
      </li>
    </ol>
  </main>
</template>

<script>
import projectNames from '~/contents/projects'

export default {
  async asyncData() {
    // Import all projects
    const projects = await Promise.all(
      projectNames.map(async (project) => {
        const { attributes } = await import(`~/contents/projects/${project}.md`)
        const date = attributes.date.split('/')
        return {
          ...attributes,
          date: new Date(date[1], date[0]),
          link: `/projects/${project}`
        }
      })
    )

    projects.sort((projectA, projectB) => projectB.date - projectA.date)
    return {
      projects
    }
  },
  head() {
    return {
      title: 'Projects'
    }
  }
}
</script>

<style lang="scss">
.projects {
  @include page;
}

.projects__title {
  @include title;
  transition: color 150ms ease-out;
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
      box-shadow: $box-shadow--small;
    }

    .projects__list-title {
      color: $color--primary;
    }

    .projects__list-image {
      filter: saturate(0.5) brightness(1.2);

      &::after {
        opacity: 0.6;
      }

      img {
        transform: scale(1.02);
      }
    }
  }
}

.projects__list-title {
  display: inline-block;
  margin-bottom: 1rem;
}

.projects__list-date {
  color: $color--text-muted;
  font-family: $font--fancy;
  font-size: 90%;
  transition: color 150ms ease-out;

  &::before {
    content: '\2014';
  }
}

.projects__list-image {
  box-shadow: $box-shadow;
  border-radius: $border-radius;
  margin-right: 1.5rem;
  overflow: hidden;
  padding-bottom: calc(50% - 0.75rem);
  position: relative;
  transition: filter 300ms ease;
  width: calc(100% - 1.5rem);

  &::after {
    background-color: $color--primary;
    content: '';
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 300ms ease;
    width: 100%;
  }

  img {
    bottom: 0;
    filter: none !important;
    height: 100%;
    left: 0;
    object-fit: cover;
    object-position: top left;
    position: absolute;
    transition: transform 300ms ease;
    width: 100%;
  }
}

.projects__list-content {
  background-color: $color--body-overlay;
  border-radius: $border-radius;
  box-shadow: $box-shadow;
  margin-top: -1.5rem;
  margin-left: 1.5rem;
  padding: 1.5rem;
  position: relative;
  transition: background-color 150ms ease-out, box-shadow 150ms ease-out;
}
</style>
