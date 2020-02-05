---
title: Build a Blog with Nuxt and Markdown
date: 2020-02-05
description: >-
  Learn how to build a blog with Nuxt and Markdown. This first blog post of the series will explain how to load Markdown files and display them using a Markdown component.

---

I recently redesigned my website to showcase my projects and facilitate writing my new blog, which you're reading right now! I wanted my new website to be performant, look good and be accessible to everyone. However, I also wanted _my_ experience to be good --- I wanted to be able to easily write new blog posts and for it to just work, without writing code for each new page I wanted to add to my website.

## The Nuxt Big Thing

At the moment, [JAMstack](https://jamstack.org) seems to be all the rage, with an increasing number of websites being pre-rendered and served by a CDN. Building websites in this manner brings brilliant performance at a cheap cost; this website is hosted for free on Netlify, I just pay around $10 a year for my domain.

I decided to make my new website using Nuxt, a static site generator (amongst other things) which is built upon Vue. Nuxt has allowed me to build a performant website, with a great _developer_ experience as well as user experience; in this series of blog posts, I'm going to detail how I use Markdown for the content of my website, how I created a responsive, lazy image component, a dark theme and more.

## Why Markdown?

In my opinion, Markdown is a fantastic middle ground between writing code and writing normal text. It allows you to express everything you need in a blog post using very concise syntax --- this makes it great for writing blog posts, without sacrificing any rich text formatting.

```md
# An Example Blog Post

May look something like this. It's easy to _emphasise_ words, link to [other sites](https://gregiv.es), write `inline code` or larger code blocks, and add images.

![Smiley face for Markdown](smiley.gif)
```

## Loading Markdown Files

In order to load Markdown files into Nuxt, we need to use a webpack loader. A webpack loader simply preprocesses a file, of any type, to allow us to include it into our application. Conveniently, `frontmatter-markdown-loader` does exactly what we want: it can load the compiled Markdown _as a Vue render function_, as well as the front matter attributes from the top of the Markdown file. All we need to do is to tell webpack to use `frontmatter-markdown-loader` whenever it sees a Markdown file, which we can do in `nuxt.config.js`.

```js
import FMMode from 'frontmatter-markdown-loader/mode'

export default {
  ...
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [FMMode.VUE_RENDER_FUNCTIONS],
          vue: {
            root: 'markdown' // The class name of the root div
          }
        }
      });
    }
  }
  ...
}
```

By default, `frontmatter-markdown-loader` uses `markdown-it` to compile the Markdown. If you wish, you can pass your own options to `markdown-it` or override the Markdown compilation completely with your Markdown compiler of choice, see [the documentation](https://hmsk.github.io/frontmatter-markdown-loader/options.html#markdown-compilation) on how to do this. I'll discuss customising your compiled Markdown later in this post.

## A Markdown Component

Now we have told webpack how to load Markdown files, we need some way to show them to the user! Let's create a Markdown component, I've just called mine `Markdown.vue` for ease, within your `components` directory.

```vue
<script>
export default {
  props: {
    markdown: {
      type: Object,
      required: true
    }
  },
  created() {
    // eslint-disable-next-line no-new-func
    this.templateRender = new Function(this.markdown.vue.render)()
    // eslint-disable-next-line no-new-func
    this.$options.staticRenderFns = new Function(this.markdown.vue.staticRenderFns)()
  },
  render(h) {
    return this.templateRender ? this.templateRender() : h('div')
  }
}
</script>

<style>
.markdown {
  /* Put your Markdown styles here */
}
</style>
```

If you're new to Vue, you might be surprised to see that our Markdown component doesn't have a `<template>` at the top. Instead of this, we have a `render` function on the component which is used to render the HTML --- behind the scenes, Vue actually converts all templates into render functions anyway. The render function takes a single argument, which is used to create elements. It's convention [to name this parameter `h`](https://css-tricks.com/what-does-the-h-stand-for-in-vues-render-method/), but it can be thought of as `createElement`.

Our Markdown component has a single required prop, a `markdown` object, which contains the render functions exposed by `frontmatter-markdown-loader`. These functions are actually passed as strings, so when the component is created we turn these back into functions by using `new Function()`. Note I've added two comments for ESLint above these lines, as [it's considered bad practice to create functions in this way](https://eslint.org/docs/rules/no-new-func) but this is a valid case.

In our component's render function, we simply call the template render function which we assigned when the component was created, or create an empty div if the template render function doesn't exist. That's pretty much it, add some styles to your Markdown component and you're good to go!

## Writing Your Blog Posts

Now it's time to write your first blog post and let Nuxt know that you've written one. Create a new directory in the root of your project called `contents` and then create a Markdown file in there called `my-first-blog-post.md`. At the start of the Markdown file we're going to write some front matter, which is just some extra information about our blog post, such as the date and title. Front matter is always placed at the top of the file and is denoted by the `---` three dashes.

```md
---
date: 2015-10-21
title: My First Blog Post
---

Who moved my cheese cow mascarpone. Cheese on toast cheese on toast mozzarella bavarian bergkase emmental gouda cheese triangles. Croque monsieur dolcelatte macaroni cheese taleggio parmesan cheese triangles St. Agur blue cheese. Everyone loves cheese.
```

In the `contents` directory, we're also going to create an `index.js` JavaScript file. We'll use this file to let Nuxt know which blog posts we want to generate a page for, and the route corresponding to the pages.

```js
export const postSlugs = ['my-first-blog-post']
export const postRoutes = postSlugs.map((postSlug) => `/blog/${postSlug}`)
```

### Nuxt Configuration

We need to change the configuration of Nuxt slightly, to let it know about our blog posts. This is because the pages for our blog posts will be generated _dynamically_, i.e. we're not manually creating a page for each of them. In `nuxt.config.js`, we're going to import the routes for our blog posts at the top, and then pass them to `generate.routes`.

```js
import { postRoutes } from './contents'

export default {
  ...
  generate: {
    routes: postRoutes
  }
  ...
}
```

## Creating the Blog Post Pages

Finally, we need to actually create the pages for the blog posts. Let's create a new directory in the `pages` directory called `blog` and in this we'll create two pages: `index.vue` to list the blog posts and `_post.vue` for the individual blog posts. Note that any dynamic page **must be prefixed by an underscore**.

### Listing All the Blog Posts

In `index.vue`, we're going to use `asyncData` to load the blog posts before the component is created. We'll map over the `postSlugs` array which we exported earlier, importing each blog post; this will use `frontmatter-markdown-loader` which we also set up earlier. In this page, we only need the attributes of each blog post so we'll return just the attributes and then sort the posts depending on their date.

```vue
<template>
  <main>
    <h1>My Blog</h1>
    <ol>
      <li v-for="post in posts" :key="post.title">
        <nuxt-link :to="`/blog/${post.slug}`">
          {{ post.title }}
        </nuxt-link>
        — {{ post.date.toLocaleDateString() }}
      </li>
    </ol>
  </main>
</template>

<script>
import { postSlugs } from '~/contents'

export default {
  async asyncData() {
    const posts = await Promise.all(
      postSlugs.map(async (postSlug) => {
        const post = await import(`~/contents/${postSlug}.md`)
        post.attributes.date = new Date(post.attributes.date)

        return post.attributes
      })
    )
    posts.sort((postA, postB) => postB.date - postA.date)

    return {
      posts
    }
  }
}
</script>
```

### Showing an Individual Blog Post

```vue
<template>
  <main>
    <h1>{{ post.title }}</h1>
    <p>{{ post.date.toLocaleDateString() }}</p>
    <markdown :markdown="post" />
  </main>
</template>

<script>
export default {
  async asyncData({ params, error }) {
    try {
      const post = await import(`~/contents/${params.post}.md`)
      post.attributes.date = new Date(post.attributes.date)

      return {
        post: {
          ...post.attributes,
          vue: post.vue
        }
      }
    } catch {
      error({ statusCode: 404, message: 'This post could not be found' })
    }
  }
}
</script>
```

*[CDN]: Content Delivery Network