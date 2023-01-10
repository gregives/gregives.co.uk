<template>
  <main class="home">
    <div class="home__banner">
      <headshots />
      <h1 class="home__title">
        Hi, I’m <span class="home__title--primary">Greg Ives</span>
      </h1>
      <div class="home__description">
        <markdown :markdown="markdown" />
      </div>
    </div>
    <ol id="stuff" class="home__posts">
      <post-card v-for="post in posts" :key="post.title" :post="post" />
    </ol>
    <div class="home__posts-more">
      <nuxt-link to="/blog/">See more blog posts</nuxt-link>
      <see-more-icon />
    </div>
    <ol class="home__projects">
      <project-card
        v-for="project in projects"
        :key="project.title"
        :project="project"
      />
    </ol>
    <div class="home__projects-more">
      <nuxt-link to="/projects/">See more projects</nuxt-link>
      <see-more-icon />
    </div>
  </main>
</template>

<script>
import DownIcon from 'icons/KeyboardBackspace'
import { hydrateWhenIdle } from 'vue-lazy-hydration'
import { projectLoader, projectSlugs } from '~/contents/projects'
import { postLoader, postSlugs } from '~/contents/blog'
import PostCard from '~/components/PostCard'
import ProjectCard from '~/components/ProjectCard'

export default {
  components: {
    SeeMoreIcon: DownIcon,
    Headshots: hydrateWhenIdle(() => import('~/components/Headshots')),
    PostCard,
    ProjectCard
  },
  async asyncData() {
    const { vue } = await import('~/contents/index.md')

    const posts = await Promise.all(
      postSlugs.map(async (postSlug) => {
        const post = await postLoader(postSlug)
        return {
          ...post.attributes
        }
      })
    )
    posts.sort((postA, postB) => postB.date - postA.date)

    const projects = await Promise.all(
      projectSlugs.map(async (projectSlug) => {
        const project = await projectLoader(projectSlug)
        return {
          ...project.attributes
        }
      })
    )
    projects.sort((projectA, projectB) => projectB.date - projectA.date)

    return {
      markdown: {
        vue
      },
      posts: posts.slice(0, 3),
      projects: projects.slice(0, 2)
    }
  }
}
</script>

<style lang="scss">
.home {
  @include page;
}

.home__title {
  @include title;

  text-align: center;
  position: relative;
  z-index: 1;

  &::before {
    background-color: $color__body;
    bottom: -5rem;
    content: '';
    filter: blur(1.5rem);
    height: calc(100% + 8rem);
    left: 0;
    position: absolute;
    width: 100%;
    z-index: -1;
  }
}

.home__title--primary {
  @include title--primary;
}

.home__description {
  margin-bottom: 10rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  text-align: center;
  width: 100%;
  z-index: 1;

  @media (min-width: $breakpoint--md) {
    width: 90%;
  }
}

.home__posts {
  display: grid;
  grid-gap: 1.5rem;
}

.home__projects {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 3rem;
  margin-top: 3rem;

  @media (min-width: $breakpoint--md) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}

.home__posts-more,
.home__projects-more {
  margin-top: 1rem;
  position: relative;
  text-align: right;

  .material-design-icon {
    pointer-events: none;

    svg {
      color: $color__primary;
      transform: rotate(180deg);
    }
  }

  a {
    @include link;

    &::after {
      content: '';
      inset: 0;
      position: absolute;
    }
  }
}
</style>
