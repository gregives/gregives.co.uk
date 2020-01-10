import projectSlugs from '~/contents/projects'

export const state = () => ({
  projects: []
})

export const mutations = {
  setProjects(state, projects) {
    state.projects = projects
  }
}

export const actions = {
  async getProjects({ commit }) {
    const projects = await Promise.all(
      projectSlugs.map(async (projectSlug) => {
        const project = await import(`~/contents/projects/${projectSlug}.md`)
        project.attributes.slug = projectSlug
        project.attributes.date = new Date(project.attributes.date)
        project.attributes.link = `/projects/${projectSlug}`
        project.attributes.mins = project.vue.render.split(' ').length / 265

        return {
          ...project.attributes
        }
      })
    )
    projects.sort((projectA, projectB) => projectB.date - projectA.date)

    commit('setProjects', projects)
  }
}
