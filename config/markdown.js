import { JSDOM } from 'jsdom'
import markdownIt from 'markdown-it'
import markdownItAbbr from 'markdown-it-abbr'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItIns from 'markdown-it-ins'
import markdownItMark from 'markdown-it-mark'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import markdownItToc from 'markdown-it-toc-done-right'

// Custom syntax highlighting
import highlight from './highlight'

const markdown = markdownIt({
  html: true,
  breaks: true,
  typographer: true,
  // Need to pass the instance of markdown-it
  highlight: (...args) => highlight(markdown, ...args)
})
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink()
  })
  .use(markdownItToc, {
    level: [2, 3]
  })
  .use(markdownItAbbr)
  .use(markdownItSup)
  .use(markdownItSub)
  .use(markdownItMark)
  .use(markdownItIns)
  .use(function (md) {
    // Plugin to switch images for custom component
    md.renderer.rules.image = (tokens, index) => {
      const token = tokens[index]
      const src = token.attrs[token.attrIndex('src')][1]
      const alt = token.attrs[token.attrIndex('alt')][1] || token.content

      // Render lazy image component
      if (token.attrIndex('title') !== -1) {
        // Use the title as the image width
        const width = token.attrs[token.attrIndex('title')][1]
        return `<lazy-image src="${src}" alt="${alt}" width="${width}"></lazy-image>`
      } else {
        return `<lazy-image src="${src}" alt="${alt}"></lazy-image>`
      }
    }
  })

const transformHTML = (html) => {
  const fragment = JSDOM.fragment(`<div>${html}</div>`)

  // Remove empty paragraphs
  fragment.querySelectorAll('p:empty').forEach((node) => {
    node.remove()
  })

  // Remove empty table of contents
  fragment.querySelectorAll('.table-of-contents:empty').forEach((node) => {
    node.remove()
  })

  return fragment.firstChild.innerHTML
}

// Add table of contents and transform resulting HTML
export default (body) => transformHTML(markdown.render(`[[toc]]\n\n${body}`))
