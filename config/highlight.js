import hljs from 'highlight.js'

hljs.configure({
  classPrefix: 'highlight__'
})
hljs.registerLanguage('vue', () => hljs.getLanguage('html'))

// Try to apply syntax highlighting
const highlightString = (markdown, string, language) => {
  try {
    if (language && hljs.getLanguage(language)) {
      return hljs.highlight(string, { language, ignoreIllegals: true }).value
    } else {
      throw new Error('Syntax highlighting not supported for language')
    }
  } catch {
    // Just escape the string if syntax highlighting doesn't work
    return markdown.utils.escapeHtml(string)
  }
}

export default (markdown, string, language) => {
  const highlightedString = highlightString(markdown, string, language)

  return language
    ? `<pre class="highlight" data-language="${language}"><code>${highlightedString}</code></pre>`
    : `<pre class="highlight"><code>${highlightedString}</code></pre>`
}
