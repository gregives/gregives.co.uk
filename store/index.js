import projectNames from '~/contents/projects'

export const state = () => ({
  projects: []
})

export const mutations = {
  setProjects(state, projects) {
    state.projects = projects
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const projects = await Promise.all(
      projectNames.map(async (projectName) => {
        const project = await import(`~/contents/projects/${projectName}.md`)
        project.attributes.slug = projectName
        project.attributes.date = new Date(project.attributes.date)
        project.attributes.link = `/projects/${projectName}`
        project.attributes.mins = project.vue.render.split(' ').length
        return {
          ...project.attributes,
          vue: project.vue
        }
      })
    )
    projects.sort((projectA, projectB) => projectB.date - projectA.date)

    commit('setProjects', projects)
  }
}
