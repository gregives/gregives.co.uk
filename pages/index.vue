<template>
  <main class="home">
    <div class="home__banner">
      <h1 class="home__title">
        Hi, I’m <span class="home__title--primary">Greg Ives</span>
      </h1>
      <div class="home__description">
        <markdown :markdown="markdown" />
      </div>
      <div class="home__actions">
        <a class="home__stuff" href="#stuff">See my stuff <down-icon /></a>
        <nuxt-link class="home__contact" to="/contact/">Contact me</nuxt-link>
      </div>
      <headshots />
    </div>
    <ol id="stuff" class="home__posts">
      <post-card v-for="post in posts" :key="post.title" :post="post" />
    </ol>
    <div class="home__posts-more">
      <nuxt-link to="/blog/">See more blog posts</nuxt-link>
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
    </div>
  </main>
</template>

<script>
import DownIcon from 'icons/KeyboardBackspace'
import { hydrateWhenIdle, hydrateWhenVisible } from 'vue-lazy-hydration'
import { projectLoader, projectSlugs } from '~/contents/projects'
import { postLoader, postSlugs } from '~/contents/blog'

export default {
  components: {
    DownIcon,
    Headshots: hydrateWhenIdle(() => import('~/components/Headshots')),
    PostCard: hydrateWhenVisible(() => import('~/components/PostCard')),
    ProjectCard: hydrateWhenVisible(() => import('~/components/ProjectCard'))
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
  $clip-path: polygon(
    100% 15%,
    50% 25%,
    45% 35%,
    100% 45%,
    100% 100%,
    50% 100%,
    0% 70%,
    0% 100%,
    100% 100%
  );
  @include page;
  @include dots($clip-path);
}

.home__banner {
  min-height: calc(100vh - 11.5rem);
  min-height: calc(var(--vh, 1vh) * 100 - 11.5rem);
  position: relative;

  @media (min-width: $breakpoint--md) {
    min-height: calc(100vh - 13rem);
    min-height: calc(var(--vh, 1vh) * 100 - 13rem);
  }
}

.home__title {
  @include title;
}

.home__title--primary {
  @include title--primary;
}

.home__description {
  margin-bottom: 3rem;
  width: 100%;

  @media (min-width: $breakpoint--md) {
    width: 60%;
  }
}

.home__actions {
  align-items: flex-start;
  display: flex;
  flex-direction: column;

  @media (min-width: $breakpoint--md) {
    flex-direction: row;
  }
}

.home__stuff {
  @include button;
  @include button--primary;

  margin-right: 1rem;
  margin-bottom: 1rem;

  .keyboard-backspace-icon {
    display: inline-block;
    transform: rotate(-90deg);
  }
}

.home__contact {
  @include button;

  margin-bottom: 1rem;
}

.home__posts {
  display: grid;
  grid-gap: 1.5rem;

  &-more {
    margin-top: 1rem;
    margin-bottom: 3rem;
    text-align: right;

    > a {
      @include link;
    }
  }
}

.home__projects {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 3rem;

  @media (min-width: $breakpoint--md) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  &-more {
    margin-top: 1rem;
    text-align: right;

    > a {
      @include link;
    }
  }
}
</style>
