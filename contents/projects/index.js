export async function projectLoader(projectSlug) {
  const project = await import(`~/contents/projects/${projectSlug}.md`)
  project.attributes.slug = projectSlug
  project.attributes.date = new Date(project.attributes.date)
  project.attributes.link = `/projects/${projectSlug}/`
  project.attributes.mins = Math.round(project.body.length / 1250) || 1

  // Extract table of contents from post
  project.attributes.tableOfContents = (() => {
    let fragment
    if (process.server) {
      const { JSDOM } = require('jsdom')
      fragment = JSDOM.fragment(`<div>${project.html}</div>`).firstChild
    } else {
      fragment = document.createElement('div')
      fragment.innerHTML = project.html
    }

    const tableOfContents = fragment.querySelector('.table-of-contents')
    return tableOfContents && tableOfContents.outerHTML
  })()

  return project
}

export const projectSlugs = [
  'dissertation',
  'eleventy-load',
  'festimap',
  'hacksheffield',
  'hype',
  'icon-packs',
  'picnic-spots',
  'snapscroll',
  'stegaphoto',
  'tv-remote',
  'twelvety',
  'university-of-sheffield-brass-band'
]
