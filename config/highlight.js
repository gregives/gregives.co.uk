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

// Generate an array of numbers including the first and last number
const range = (firstNumber, lastNumber) =>
  [...Array(lastNumber - firstNumber + 1).keys()].map((n) => n + firstNumber)

// Parse the parameter string e.g. {10,15,20-30} 10
const parseParams = (params) => {
  const [, highlightNumbers = '', startNumber = '1'] =
    params.match(/\{\s*([^}]*)\s*\}(?:\s*(\d+))?/) || []

  const numbersToHighlight = parseHighlightNumbers(highlightNumbers)
  return { numbersToHighlight, startNumber: parseInt(startNumber, 10) }
}

// Parse line numbers to highlight e.g. 10,15,20-30
const parseHighlightNumbers = (highlightNumbers) => {
  if (!/\d+(-\d+)?(,\d+(-\d+)?)*/.test(highlightNumbers)) {
    return []
  }

  return highlightNumbers
    .split(',')
    .map((numbers) => {
      const [firstNumber, lastNumber = firstNumber] = numbers
        .split('-')
        .map((number) => parseInt(number, 10))

      return range(firstNumber, lastNumber)
    })
    .flat()
}

export default (markdown, string, language, params) => {
  const { numbersToHighlight, startNumber } = parseParams(params)
  const highlightedString = highlightString(markdown, string, language)

  // Generate line numbers from start number
  const numberOfLines = highlightedString.trimEnd().split('\n').length
  const lineNumbers = range(startNumber, numberOfLines + startNumber - 1)

  // Generate a span to place behind each line
  const spanForEachLine = lineNumbers
    .map((number) => {
      const paddedNumber = number.toString().padStart(2, ' ')
      return numbersToHighlight.includes(number)
        ? `<span data-number="${paddedNumber}" data-highlight></span>`
        : `<span data-number="${paddedNumber}"></span>`
    })
    .join('')

  // Wrap lines in span
  const lines = `<span class="highlight__lines">${spanForEachLine}</span>`

  return language
    ? `<pre class="highlight" data-language="${language}"><code>${lines}<span class="highlight__code">${highlightedString}</span></code></pre>`
    : `<pre class="highlight"><code>${lines}<span class="highlight__code">${highlightedString}</span></code></pre>`
}
