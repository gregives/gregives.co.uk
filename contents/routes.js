import { projectSlugs } from './projects'
import { postSlugs } from './blog'

export default [
  ...projectSlugs.map((projectSlug) => `/projects/${projectSlug}/`),
  ...postSlugs.map((postSlug) => `/blog/${postSlug}/`),
]
