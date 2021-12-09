const hljs = require('highlight.js')
const { JSDOM } = require('jsdom')
const anchor = require('markdown-it-anchor')

hljs.configure({
  classPrefix: 'highlight__'
})
hljs.registerLanguage('vue', () => hljs.getLanguage('html'))

// Instance of markdown-it
const markdown = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  breaks: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="highlight" data-language="${lang}"><code>${
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        }</code></pre>`
      } finally {
        // No syntax highlighting
      }
    }

    return `<pre class="highlight"><code>${markdown.utils.escapeHtml(
      str
    )}</code></pre>`
  }
})
  .use(anchor, {
    permalink: anchor.permalink.headerLink()
  })
  .use(require('markdown-it-table-of-contents'), {
    includeLevel: [1, 2, 3]
  })
  .use(require('markdown-it-external-links'), {
    externalClassName: null,
    externalRel: 'noopener noreferrer',
    externalTarget: '_blank'
  })
  .use(require('markdown-it-task-lists'), {
    label: true
  })
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-ins'))
  .use(function (md) {
    // Plugin to switch images for custom component
    md.renderer.rules.image = function (tokens, index) {
      const token = tokens[index]
      const src = token.attrs[token.attrIndex('src')][1]
      const alt = token.attrs[token.attrIndex('alt')][1]

      // Render lazy image component
      if (token.attrIndex('title') !== -1) {
        // Use the title as the image width
        const width = token.attrs[token.attrIndex('title')][1]
        return `<lazy-image src="${src}" alt="${alt}" width="${width}" />`
      } else {
        return `<lazy-image src="${src}" alt="${alt}" />`
      }
    }
  })

const transformHTML = (html) => {
  const fragment = JSDOM.fragment(`<div>${html}</div>`)

  // Remove wrapper paragraph from markdown-it inline image
  fragment.querySelectorAll('p > lazy-image').forEach((image) => {
    image.parentNode.replaceWith(image)
  })

  // Remove empty paragraphs
  fragment.querySelectorAll('p:empty').forEach((paragraph) => {
    paragraph.remove()
  })

  // Remove empty table of contents
  fragment.querySelectorAll('.table-of-contents > ul:empty').forEach((toc) => {
    toc.parentNode.remove()
  })

  return fragment.firstChild.innerHTML
}

export default function (body) {
  // Add table of contents
  const html = markdown.render(`[[toc]]\n\n${body}`)
  return transformHTML(html)
}
