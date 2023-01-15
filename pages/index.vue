<template>
  <main class="home">
    <div class="home__banner">
      <headshots />
      <h1 class="home__title">
        Hi, I’m <span class="home__title--primary">Greg Ives</span>
      </h1>
      <div ref="description" class="home__description">
        <markdown :markdown="markdown" />
      </div>
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
    <ol id="stuff" class="home__posts">
      <post-card v-for="post in posts" :key="post.title" :post="post" />
    </ol>
    <div class="home__posts-more">
      <nuxt-link to="/blog/">See more blog posts</nuxt-link>
      <see-more-icon />
    </div>
  </main>
</template>

<script>
import balanceText from 'balance-text'
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
      projects: projects.slice(0, 1)
    }
  },
  mounted() {
    window.addEventListener('resize', this.balanceText)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.balanceText)
  },
  methods: {
    balanceText() {
      balanceText(this.$refs.description.children[0].children[0])
    }
  }
}
</script>

<style lang="scss">
.home {
  @include page;
  @include background(
    (
      (calc(50% - 10rem) 5rem 20rem),
      (calc(50% + 5rem) 10rem 15rem),
      (calc(50% - 80rem) 60rem 55rem),
      (calc(50% + 80rem) 60% 55rem)
    )
  );
}

.home__title {
  @include title;

  text-align: center;
  position: relative;
  z-index: 1;

  &::before {
    background-color: $color__body;
    border-radius: 10rem;
    box-shadow: 0 0 4rem 5rem $color__body;
    bottom: 0;
    content: '';
    height: calc(100% + 1rem);
    left: 50%;
    max-width: 40rem;
    position: absolute;
    transform: translateX(-50%);
    width: 100vw;
    z-index: -1;
  }
}

.home__title--primary {
  @include title--primary;
}

.home__description {
  margin-bottom: 8rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  text-align: center;
  width: 100%;
  z-index: 1;
}

.home__posts {
  display: grid;
  grid-gap: 2.5rem;
  margin-top: 5rem;

  @media (min-width: $breakpoint--sm) {
    margin-top: 10rem;
  }
}

.home__projects {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 4rem;

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

    position: relative;

    &::before {
      background-color: $color__body;
      box-shadow: 0 0 2rem 2rem $color__body;
      border-radius: 50%;
      content: '';
      position: absolute;
      inset: 0;
      z-index: -1;
    }

    &::after {
      bottom: -0.5rem;
      content: '';
      left: -1rem;
      position: absolute;
      right: -2rem;
      top: -0.5rem;
    }
  }
}

@media (min-width: $breakpoint--sm) {
  .home__projects-more {
    margin-top: -4rem;
  }
}
</style>
