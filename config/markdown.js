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

const CUSTOM_ELEMENTS = ['netlify-form']
const USER_ALLOWED_ELEMENTS = [
  'p',
  'div',
  'span',
  'strong',
  'em',
  'a',
  'blockquote',
  'ol',
  'ul',
  'li',
  'pre',
  'code',
  'sup',
  'sub',
  'mark',
  'ins',
  's'
]

const createRenderFunction = (sanitize) => {
  const markdown = markdownIt({
    html: !sanitize,
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
          // Use the title as the max image width
          const maxWidth = token.attrs[token.attrIndex('title')][1]
          return `<lazy-image src="${src}" alt="${alt}" max-width="${maxWidth}"></lazy-image>`
        } else {
          return `<lazy-image src="${src}" alt="${alt}"></lazy-image>`
        }
      }
    })

  return markdown.render.bind(markdown)
}

const transformHTML = (html, sanitize) => {
  const fragment = JSDOM.fragment(`<div>${html}</div>`)

  // Unwrap custom components
  CUSTOM_ELEMENTS.forEach((customElement) => {
    fragment.querySelectorAll(`p > ${customElement}`).forEach((node) => {
      node.parentNode.replaceWith(node)
    })
  })

  // Remove elements for user-generated content
  if (sanitize) {
    fragment
      .querySelectorAll(`:not(${USER_ALLOWED_ELEMENTS.join('):not(')})`)
      .forEach((node) => {
        node.remove()
      })
  }

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
export default (body, sanitize = false) => {
  const render = createRenderFunction(sanitize)
  return transformHTML(render(`[[toc]]\n\n${body}`), sanitize)
}
