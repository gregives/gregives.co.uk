---
title: Twelvety
titleShort: ''
date: 2020-10-18
image: '/assets/images/dynamic/twelvety/train.jpg'
description: An Eleventy starter project built to be fast including component architecture and pipelines for CSS and JavaScript
tags:
  - Eleventy
  - Starter project
  - Components
  - Critical CSS
  - Minify
---

[See the demo site](https://twelvety.netlify.app)

Twelvety is a pre-configured Eleventy starter project built to be fast. It includes:

- Component architecture
- CSS pipeline using Sass, PostCSS and CleanCSS
- JS pipeline using Browserify, Babel and Uglify
- Page-specific CSS and JS
- Inline critical CSS and defer non-critical CSS
- Minified HTML, CSS and JS
- Responsive picture shortcode **with AVIF and WebP support**
- Content-hash of assets

Write components like this:

<!-- prettier-ignore-start -->
```html
<main class="home">
  <h1 class="home__title">Twelvety</h1>
</main>

{% stylesheet 'scss' %}
  @import "mixins";

  .home {
    @include container;

    &__title {
      color: red;
    }
  }
{% endstylesheet %}

{% javascript %}
  console.log("Super fast 💨");
{% endjavascript %}
```
<!-- prettier-ignore-end -->

See the [GitHub repository](https://github.com/gregives/twelvety) for documentation.
