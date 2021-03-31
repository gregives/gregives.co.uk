const hljs = require('highlight.js')
hljs.configure({
  classPrefix: 'highlight__'
})
hljs.registerLanguage('vue', () => hljs.getLanguage('html'))

const markdown = require('markdown-it')({
  html: true,
  xhtmlOut: true,
  breaks: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="highlight" data-language="${lang}"><code>${
          hljs.highlight(lang, str, true).value
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
  .use(require('markdown-it-anchor'), {
    permalink: true,
    permalinkSymbol: '&nbsp;#',
    permalinkSpace: false
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
  .use(require('markdown-it-container'), 'aside', {
    render(tokens, index) {
      const [, type] = tokens[index].info.split(' ') || 'info'
      return tokens[index].nesting === 1
        ? `<post-aside type="${type}">`
        : '</post-aside>'
    }
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

// Remove wrapper paragraph, from markdown-it inline image
const replaceInlineImages = (html) => {
  return html.replace(/<p>(<lazy-image[^>]*>)<\/p>/g, '$1')
}

export default function (body) {
  return replaceInlineImages(markdown.render(`[[toc]]\n\n${body}`))
}
