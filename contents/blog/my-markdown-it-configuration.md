---
title: My Markdown-It Configuration
date: 2020-02-16
description: An overview of the markdown-it and highlight.js configurations used on my website
tags: []
---

I use [markdown-it](https://github.com/markdown-it/markdown-it) and [highlight.js](https://highlightjs.org) to render my blog posts. Out of the box, markdown-it and highlight.js may provide all the functionality you need, however, customising them enables you to do stuff like:

- Display the language of code blocks
- Add new language aliases for syntax highlighting
- Use [BEM](http://getbem.com/naming) class names
- Add heading anchors
- Use proper quote characters e.g. “”
- Open external links in new tabs
- Write abbreviations, subscript, superscript and more in Markdown

## The Configuration

I've been slowly tinkering with my configuration and I'll keep updating this blog post as I change it. In this short blog post I'll explain everything in the configuration, but before I do that, here's the whole thing:

```js
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
  .use(require('markdown-it-task-lists'), {
    label: true
  })
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-ins'))
```

### Configuring Highlight.js

Firstly, I configure highlight.js. You can use the syntax highlighter of your choice in conjunction with markdown-it; the most popular syntax highlighting libraries are [highlight.js and Prism](https://github.com/search?l=JavaScript&o=desc&q=syntax+highlighting&s=stars&type=Repositories), it's up to you which you use. I do two things in setting up syntax highlighting:

1. Change the `classPrefix` to `highlight__`. All my other class names use BEM so I felt the need to do this for consistency's sake.
2. Set up language aliases. I've only needed one alias, namely highlighting `vue` code blocks as `html`.

```js
const hljs = require('highlight.js')
hljs.configure({
  classPrefix: 'highlight__'
})
hljs.registerLanguage('vue', () => hljs.getLanguage('html'))
```

### Configuring Markdown-It

Secondly, I pass some configuration options to markdown-it:

- `html: true` allows me to put raw HTML into my Markdown files. This also allows me to put Vue components into my Markdown files, as explained in my previous blog post, <nuxt-link to="/blog/build-a-blog-with-nuxt-and-markdown/">Build a Blog with Nuxt and Markdown</nuxt-link>.
- `xhtmlOut: true` converts newlines `\n` in paragraphs into break tags `<br/>`.
- `typographer: true` enables some 'language-neutral replacement' and beautifies quotation marks.

```js
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
```

Within the markdown-it configuration, I also enable syntax highlighting. Essentially, I attempt to highlight the code with the given language using highlight.js and if this fails then I just degrade to the plain text in a code block.

Note that within the syntax highlighting configuration, I add a `data-language` attribute which stores the language of the code block. This allows me to add the name of the language to the top right of the code block using a pseudo-element like so:

```css
pre[data-language]::after {
  background-color: grey;
  content: '.' attr(data-language); /* The cool bit! */
  padding: 0.5rem;
  position: absolute;
  right: 0;
  top: 0;
}
```

## Markdown-It Plugins

There are some great plugins out there to extend the functionality of markdown-it. I use several plugins to:

- Add heading anchors
- Add task lists to Markdown (this is taken from GFM)
- Add abbreviations, for example, 'GFM'
- Add ^superscript^ text
- Add ~subscript~ text
- Add ==marked== text
- Add ++inserted++ text

```js
  .use(require('markdown-it-anchor'), {
    permalink: true,
    permalinkSymbol: '#',
    permalinkSpace: false
  })
  .use(require('markdown-it-task-lists'), {
    label: true
  })
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-ins'))
```

Have fun tinkering with your Markdown configuration!

<!-- prettier-ignore -->
*[GFM]: GitHub Flavoured Markdown
