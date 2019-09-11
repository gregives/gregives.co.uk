<template>
  <div class="container">
    <ol class="project-list">
      <li
        v-for="project in projects"
        :key="project.title"
        class="project-list__item"
        :class="{ 'project-list__item--small': !project.link }"
      >
        <nuxt-link
          v-if="project.link"
          :to="project.link"
          class="project-list__link"
        >
          <div class="project-list__image">
            <img src="https://via.placeholder.com/800x400" />
          </div>
          <h3 class="project-list__title">
            {{ project.titleShort || project.title }}
          </h3>
          <small class="project-list__date">
            {{ project.date.getFullYear() }}
          </small>
          <p class="project-list__description" v-html="project.description"></p>
        </nuxt-link>
        <p
          v-else
          class="project-list__description"
          v-html="project.description"
        ></p>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: (() => {
        const path = require('path')
        const files = require.context('~/contents/projects/', false, /\.md$/)
        const projects = files.keys().map((file) => {
          const basename = path.basename(file)
          const project = files(file).attributes
          return {
            ...project,
            date: new Date(project.date),
            link: `/projects/${basename.match(/[^.]+/)[0]}`
          }
        })
        projects.sort((a, b) => b.date - a.date)
        projects.splice(3, 0, {
          description:
            'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione minima quasi porro voluptatibus nesciunt assumenda voluptatem dolor illo libero totam! Repellat sequi quibusdam architecto aliquam rerum totam ipsum veritatis ex.'
        })
        return projects
      })()
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

.project-list {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr;
  grid-gap: calc(1rem + 5vmin);
  margin: 4rem 0;

  @media (min-width: $break-md) {
    grid-template-columns: 1fr 1fr;
  }
}

.project-list__item {
  grid-row: span 2;
  position: relative;

  &::before {
    background-color: darken(white, 3%);
    box-shadow: 0 0 2rem -1rem transparentize(black, 0.8);
    content: '';
    height: 80%;
    left: 0;
    position: absolute;
    top: 20%;
    width: 100%;
    z-index: -1;
  }
}

.project-list__item--small {
  grid-row: span 1;

  &::before {
    background-color: darken(white, 3%);
    border: 4px solid transparentize($color-primary, 0.8);
    box-shadow: 0 0 2rem -1rem transparentize(black, 0.8);
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  .project-list__description {
    padding: 1.5rem;
  }
}

.project-list__link {
  display: block;
  padding: 1.5rem;
  padding-top: 0;

  &:hover {
    .project-list__title {
      box-shadow: 0 -1.5em transparentize($color-primary, 0.8) inset;
      color: $color-primary;
    }

    .project-list__image {
      &::after {
        opacity: 0.2;
      }

      img {
        filter: saturate(0);
        transform: scale(1.1);
      }
    }
  }
}

.project-list__title {
  box-shadow: 0 -0.6em transparentize($color-primary, 0.8) inset;
  display: inline-block;
  transition: box-shadow 150ms ease-out, color 150ms ease-out;
}

.project-list__date {
  color: transparentize(black, 0.46);
  font-family: $header-font;
  font-size: 90%;
  margin-left: 1rem;
}

.project-list__image {
  margin-bottom: 1rem;
  margin-left: -1.5rem;
  overflow: hidden;
  padding-bottom: 50%;
  position: relative;
  width: 100%;

  &::after {
    background-color: $color-primary;
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
    left: 0;
    position: absolute;
    transition: transform 300ms ease, filter 300ms ease;
    width: 100%;
  }
}
</style>
