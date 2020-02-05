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
        return `<pre class="highlight" data-language="${lang.toUpperCase()}"><code>${
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
    permalinkSymbol: '#',
    permalinkSpace: false
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

export default function(body) {
  return markdown.render(body)
}
