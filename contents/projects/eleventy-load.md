---
title: Eleventy Load
titleShort: ''
date: 2021-02-08
image: '/assets/images/dynamic/eleventy-load/connections.jpg'
description: Resolve dependencies and post-process files in your Eleventy project, similar to webpack loaders
tags:
  - Eleventy
  - Dependency
  - Loaders
---

Wish there was a way to import Sass files as easily as CSS files? Now there is!

Introducing eleventy-load, an [Eleventy](https://11ty.dev/) plugin which resolves dependencies and post-processes files for you. Loading Sass files is just one example: eleventy-load exposes "loaders" which can process **any file** including HTML, CSS, JavaScript, images and more. The concept of eleventy-load is very similar to [webpack loaders](https://webpack.js.org/loaders/), albeit with infinitely less JavaScript sent to the browser.

## Documentation

Visit the [eleventy-load website](https://eleventy-load.xyz/) for usage instructions, examples of eleventy-load, a list of loaders and how to write a loader yourself.

## Get Started

For more detailed instructions, see the [eleventy-load website](https://eleventy-load.xyz/usage/).

The following example sets up eleventy-load so that you can import Sass files just like you would import CSS files.

1. Install eleventy-load and any loaders you need.

```sh
npm install --save-dev eleventy-load eleventy-load-html eleventy-load-sass eleventy-load-css eleventy-load-file
```

2. Add eleventy-load as a plugin and set up rules to process your Sass file.

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(require('eleventy-load'), {
    rules: [
      {
        test: /\.html$/,
        loaders: [
          {
            loader: require('eleventy-load-html')
          }
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: require('eleventy-load-sass')
          },
          {
            loader: require('eleventy-load-css')
          },
          {
            loader: require('eleventy-load-file'),
            options: {
              name: '[hash].css'
            }
          }
        ]
      }
    ]
  })
}
```

3. Now you can write your Sass in a file and link it in your HTML using a `link` element!

```scss
$massive: 5rem;

body {
  background-color: red;

  h1 {
    font-size: $massive;
  }
}
```

```html
<link rel="stylesheet" href="styles.scss" />
```

It's as easy as that!
