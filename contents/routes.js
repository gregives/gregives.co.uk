import { projectSlugs } from './projects'
import { postSlugs as posts } from './blog'
import { postSlugs as watches } from './watches'

export default [
  ...projectSlugs.map((projectSlug) => `/projects/${projectSlug}/`),
  ...posts.map((postSlug) => `/blog/${postSlug}/`),
  ...watches.map((watchSlug) => `/watches/${watchSlug}/`)
]
