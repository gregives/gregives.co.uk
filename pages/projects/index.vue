<template>
  <main class="projects">
    <h1 class="projects__title">
      My <span class="projects__title--primary">Projects</span>
    </h1>
    <ol class="projects__projects">
      <project-card
        v-for="project in projects"
        :key="project.title"
        :project="project"
      />
    </ol>
  </main>
</template>

<script>
import { projectLoader, projectSlugs } from '~/contents/projects'
import ProjectCard from '~/components/ProjectCard'

export default {
  components: {
    ProjectCard
  },
  async asyncData() {
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
  @include background(
    (
      (calc(50% + 40rem) -30rem 50rem),
      (calc(50% - 50rem) -10rem 40rem),
      (calc(50% - 80rem) 60rem 55rem),
      (calc(50% + 10rem) 100rem 30rem),
      (calc(50% - 40rem) calc(100% + 10rem) 50rem),
      (calc(50% + 80rem) 60% 55rem)
    )
  );
}

.projects__title {
  @include title;

  margin-bottom: 4rem;
}

.projects__title--primary {
  @include title--primary;
}

.projects__projects {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 4rem;

  @media (min-width: $breakpoint--md) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}
</style>
