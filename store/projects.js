import projectSlugs from '~/contents/projects'

export const state = () => ({
  currentProject: {},
  projects: []
})

export const mutations = {
  setCurrentProject(state, project) {
    state.currentProject = project
  },
  setProjects(state, projects) {
    state.projects = projects
  }
}

async function loadProject(projectSlug) {
  const project = await import(`~/contents/projects/${projectSlug}.md`)
  project.attributes.slug = projectSlug
  project.attributes.date = new Date(project.attributes.date)
  project.attributes.link = `/projects/${projectSlug}`
  project.attributes.mins = project.vue.render.split(' ').length / 265

  return project
}

export const actions = {
  async setCurrentProject({ commit }, projectSlug) {
    try {
      const project = await loadProject(projectSlug)

      commit('setCurrentProject', {
        ...project.attributes,
        vue: project.vue
      })
    } catch {
      throw new Error('Project not found')
    }
  },
  async setProjects({ commit }) {
    const projects = await Promise.all(
      projectSlugs.map(async (projectSlug) => {
        const project = await loadProject(projectSlug)

        return {
          ...project.attributes
        }
      })
    )
    projects.sort((projectA, projectB) => projectB.date - projectA.date)

    commit('setProjects', projects)
  }
}
