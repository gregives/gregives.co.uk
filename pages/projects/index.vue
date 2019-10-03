<template>
  <main class="projects">
    <h1 class="projects__title">
      My <span class="projects__title--primary">Projects</span>
    </h1>
    <p class="projects__introduction">
      Here’s a selection of projects which I’ve created since I became
      interested in coding... I’ve made lots of things from Android apps to
      websites to a TV remote, have a browse!
    </p>
    <ol class="projects__list">
      <li
        v-for="project in projects"
        :key="project.title"
        class="projects__list-item"
        :class="{ 'projects__list-item--small': !project.link }"
      >
        <nuxt-link
          v-if="project.link"
          :to="project.link"
          class="projects__list-link"
        >
          <div class="projects__list-image">
            <lazy-image src="placeholder.png" :alt="project.title" />
          </div>
          <h3 class="projects__list-title">
            {{ project.titleShort || project.title }}
          </h3>
          <small class="projects__list-date">
            {{ project.date.getFullYear() }}
          </small>
          <p
            class="projects__list-description"
            v-html="project.description"
          ></p>
        </nuxt-link>
        <p
          v-else
          class="projects__list-description"
          v-html="project.description"
        ></p>
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

    // Add other content into list of projects
    projects.splice(3, 0, {
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione minima quasi porro voluptatibus nesciunt assumenda voluptatem dolor illo libero totam! Repellat sequi quibusdam architecto aliquam rerum totam ipsum veritatis ex.'
    })

    return {
      projects
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
}

.projects__title--primary {
  @include title--primary;
}

.projects__list {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 100%;
  grid-gap: calc(1rem + 5vmin);

  @media (min-width: $breakpoint--md) {
    grid-template-columns: 1fr 1fr;
  }
}

.projects__list-item {
  grid-row: span 2;
  position: relative;

  &::before {
    background-color: $color--body-overlay;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    content: '';
    height: 80%;
    left: 0;
    position: absolute;
    top: 20%;
    width: 100%;
    z-index: -1;
  }
}

.projects__list-item--small {
  grid-row: span 1;

  &::before {
    height: 100%;
    top: 0;
  }

  .projects__list-description {
    padding: 1.5rem;
  }
}

.projects__list-link {
  display: block;
  padding: 1.5rem;
  padding-top: 0;

  &:hover {
    .projects__list-image {
      filter: saturate(0.5) brightness(1.2);

      &::after {
        opacity: 0.6;
      }

      img {
        transform: scale(1.05);
      }
    }
  }
}

.projects__list-title {
  display: inline-block;
}

.projects__list-date {
  color: $color--text-muted;
  font-family: $font--fancy;
  font-size: 90%;
  margin-left: 1rem;
}

.projects__list-image {
  border-radius: $border-radius;
  border-bottom-left-radius: 0;
  margin-bottom: 1rem;
  margin-left: -1.5rem;
  overflow: hidden;
  padding-bottom: 50%;
  position: relative;
  transition: filter 300ms ease;
  width: 100%;

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
    height: 100%;
    left: 0;
    object-fit: cover;
    object-position: top left;
    position: absolute;
    transition: transform 300ms ease;
    width: 100%;
  }
}
</style>
