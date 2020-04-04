export async function projectLoader(projectSlug) {
  const project = await import(`~/contents/projects/${projectSlug}.md`)
  project.attributes.slug = projectSlug
  project.attributes.date = new Date(project.attributes.date)
  project.attributes.link = `/projects/${projectSlug}/`
  project.attributes.mins = Math.round(project.body.length / 1250) || 1

  return project
}

export const projectSlugs = [
  'dissertation',
  'festimap',
  'hacksheffield',
  'hype',
  'icon-packs',
  'picnic-spots',
  'snapscroll',
  'stegaphoto',
  'tv-remote',
  'university-of-sheffield-brass-band'
]
