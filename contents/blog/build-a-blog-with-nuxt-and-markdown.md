---
title: Build a Blog with Nuxt and Markdown
date: 2019-05-01
description: >-
  Learn how to build a blog with Nuxt and Markdown.
---

I recently redesigned my website to showcase my projects and facilitate writing my new blog, which you're reading right now! I wanted my new website to be performant, look good and be accessible to everyone. However, I also wanted _my_ experience to be good --- I wanted to be able to easily write new blog posts and for it to just work, without writing code for each new page I wanted to add to my website.

## The Nuxt Big Thing

At the moment, [JAMstack](https://jamstack.org) seems to be all the rage, with an increasing number of websites being pre-rendered and served by a CDN. Building websites in this manner brings brilliant performance at a cheap cost; this website is hosted for free on Netlify, I just pay around $10 a year for my domain.

I decided to make my new website using Nuxt, a static site generator (amongst other things) which is built upon Vue. Nuxt has allowed me to build a performant website, with a great _developer_ experience as well as user experience; in this series of blog posts, I'm going to detail how I use Markdown for the content of my website, how I created a responsive, lazy image component, a dark theme and more.

## Why Markdown?

In my opinion, Markdown is a fantastic middle ground between writing code and writing normal text. It allows you to express everything you need in a blog post using very concise syntax.

```md
# An Example Blog Post

May look something like this. It's easy to _emphasise_ words, link to [other sites](https://gregiv.es), write `inline code` or larger code blocks, and add images.

![Smiley face for Markdown](smiley.gif)
```

## Loading Markdown Files

In order to load Markdown files into Nuxt, we need to use a webpack loader. A webpack loader simply preprocesses a file, of any type, to allow us to include it into our application. Conveniently, `frontmatter-markdown-loader` does exactly what we want: it can load the compiled Markdown _as a Vue component_, as well as the front matter attributes from the top of the Markdown file. All we need to do is to tell webpack to use `frontmatter-markdown-loader` whenever it sees a Markdown file, which we can do in `nuxt.config.js`.

```js
import FMMode from "frontmatter-markdown-loader/mode";

export default {
  ...
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        options: {
          mode: [FMMode.VUE_COMPONENT]
        }
      });
    }
  }
  ...
}
```

By default, `frontmatter-markdown-loader` uses `markdown-it` to compile the Markdown. If you wish, you can pass your own options to `markdown-it` or override the Markdown compilation completely with your Markdown compiler of choice, see [the documentation](https://hmsk.github.io/frontmatter-markdown-loader/options.html#markdown-compilation) on how to do this.

## A Markdown Component

Now we have told webpack how to load Markdown files, we need some way to show them to the user!

*[CDN]: Content Delivery Network