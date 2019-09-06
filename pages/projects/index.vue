<template>
  <div class="container">
    <ol class="project-list">
      <li
        v-for="project in projects"
        :key="project.title"
        class="project-list__item"
      >
        <nuxt-link :to="project.link" class="project-list__link">
          <img
            src="https://via.placeholder.com/800x400"
            class="project-list__image"
          />
          <h3 class="project-list__title">
            {{ project.title }}
            <small class="project-list__date">
              {{ project.date.getFullYear() }}
            </small>
          </h3>
          <p class="project-list__description">{{ project.description }}</p>
        </nuxt-link>
      </li>
    </ol>
  </div>
</template>

<script>
const files = require.context('./', false, /\.vue$/)
const projects = Array.from(files.keys())
  .filter((file) => files(file).default !== undefined)
  .map((file) => {
    const name = file.match(/[\w-]+/)[0]
    const project = files(file).default.data()
    return {
      title: project.shortTitle || project.title,
      date: project.date,
      description: project.description,
      link: `/projects/${name}`
    }
  })
  .sort((a, b) => b.date - a.date)

export default {
  data() {
    return {
      projects
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/sass/_variables';

.project-list {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: calc(6rem + 6vmin) calc(3rem + 6vmin);
  margin-top: 10vh;
  margin-bottom: 10vh;

  @media (min-width: $break-md) {
    grid-template-columns: 1fr 1fr;
    grid-gap: calc(3rem + 6vmin);
    margin-top: calc(4rem + 10vh);
  }
}

.project-list__item {
  margin: -1.5rem;
  padding: 0rem;
  position: relative;

  @media (min-width: $break-md) {
    &:nth-child(2n) {
      margin-top: 2rem;
    }

    &:nth-child(2n + 1) {
      margin-top: -4rem;
      margin-bottom: 4rem;
    }
  }

  @for $i from 1 through 14 {
    &:nth-child(#{$i}) > .project-list__link::before,
    &:nth-child(#{$i}) > .project-list__link::after {
      transform: rotate(#{random() * 4 - 2}deg);
    }
  }
}

.project-list__link {
  display: block;
  margin: 0;
  padding: 1.5rem;
  white-space: initial;

  &::before {
    border: solid 2px transparentize(black, 0.95);
    box-sizing: content-box;
    content: '';
    height: 95%;
    left: 0.5rem;
    position: absolute;
    transition: border 300ms ease;
    top: 5%;
    width: calc(100% - 1rem);
  }

  &:hover::before {
    border: solid 2px transparentize($color-primary, 0.4);
  }
}

.project-list__date {
  color: transparentize(black, 0.46);
  font-size: 60%;
}

.project-list__image {
  margin-top: -3rem;
  margin-bottom: 1rem;
  width: 80%;
}
</style>
