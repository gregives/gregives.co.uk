import projectSlugs from '~/contents/projects'

export const state = () => ({
  project: {},
  projects: []
})

export const mutations = {
  SET_PROJECT(state, project) {
    state.project = project
  },
  SET_PROJECTS(state, projects) {
    state.projects = projects
  }
}

async function loadProject(projectSlug) {
  const project = await import(`~/contents/projects/${projectSlug}.md`)
  project.attributes.slug = projectSlug
  project.attributes.date = new Date(project.attributes.date)
  project.attributes.link = `/projects/${projectSlug}`

  return project
}

export const actions = {
  async GET_PROJECT({ commit }, projectSlug) {
    try {
      const project = await loadProject(projectSlug)

      commit('SET_PROJECT', {
        ...project.attributes,
        vue: project.vue
      })
    } catch {
      throw new Error('Project not found')
    }
  },
  async GET_PROJECTS({ commit }) {
    const projects = await Promise.all(
      projectSlugs.map(async (projectSlug) => {
        const project = await loadProject(projectSlug)
        return {
          ...project.attributes
        }
      })
    )
    projects.sort((projectA, projectB) => projectB.date - projectA.date)

    commit('SET_PROJECTS', projects)
  }
}
