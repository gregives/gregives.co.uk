import projectSlugs from './projects'

export default [
  ...projectSlugs.map((projectSlug) => `/projects/${projectSlug}`)
]
