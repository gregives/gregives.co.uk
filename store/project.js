export const state = () => ({
  project: {}
})

export const mutations = {
  setProject(state, project) {
    state.project = project
  }
}

export const actions = {
  async getProjectBySlug({ commit }, projectSlug) {
    try {
      const project = await import(`~/contents/projects/${projectSlug}.md`)
      project.attributes.slug = projectSlug
      project.attributes.date = new Date(project.attributes.date)
      project.attributes.link = `/projects/${projectSlug}`
      project.attributes.mins = project.vue.render.split(' ').length / 265

      commit('setProject', {
        ...project.attributes,
        vue: project.vue
      })
    } catch {
      throw new Error('Project not found')
    }
  }
}
