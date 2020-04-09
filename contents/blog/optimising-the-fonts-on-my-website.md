---
tags: []
title: Optimising the Fonts on My Website
date: 2020-04-09
description: How I changed my font loading strategy and reduced the first stage fonts
  by over 100 kB

---
I'll admit, I visit my own website a lot more than I reasonably should. One of my biggest peeves about my website was the time taken to load the display font --- the titles would initially render in <span style="font-family: Georgia;">Georgia</span> and after a few seconds there would be a layout shift when my chosen font, Tiempos Headline, finally loaded! I read an excellent article by Zach Leatherman, [Developing a Robust Font Loading Strategy for CSS-Tricks](https://www.zachleat.com/web/css-tricks-web-fonts/), which inspired me to change my font loading strategy and massively reduce initial load times.

## Before Optimising the Fonts

Before I decided to optimise the fonts on my website, I was loading four web fonts on the home page and up to **seven** web fonts on some other pages! These amounted to a staggering **145kB**:

* Tiempos Headline, 31.3kB
* Tiempos Headline Bold, 30.2kB
* IBM Plex Sans, 17.9kB
* IBM Plex Sans Bold, 18.7kB
* IBM Plex Sans Italic, 19.5kB
* IBM Plex Mono, 13.7kB
* IBM Plex Mono Bold, 14.1kB

Opening up the Network panel in Chrome DevTools showed the time taken to download all four web fonts on the home page. The waterfall graph below shows the times at which the fonts were requested, over a period of 600ms:

![A waterfall graph showing the four fonts taking just under 600ms to load](https://app.forestry.io/sites/c9ypi1rb-tnfxq/body-media//assets/images/dynamic/optimising-fonts/waterfall1.png)

The first request for the body font (IBM Plex Sans) started at around 140ms and finished before 200ms, which isn't too bad! However, the other fonts took a further 200–300ms to download, which resulted in a nasty layout shift, as you can see here:

<video src="/blog/optimising-the-fonts-on-my-website/loading1.webm" type="video/webm" autoplay muted loop></video>

## Font Loading Strategies

Before we go any further, it's about time we talked about font loading strategies. Font loading strategies dictate when the fonts on your page load, how the fonts load, and what happens whilst the fonts are loading; I find the best way to group font loading strategies is by describing how the font appears **before** the font loads.

### Flash of Invisible Text

FOIT is the default browser behaviour which renders the text invisible whilst the font is loading. The text will be invisible during the _swap period_, up to 3 seconds, depending on the browser: this is a particularly poor experience for users as there may be up to 3 seconds when they cannot read the content of your website!

### Flash of Unstyled Text

A FOUT occurs when the browser renders the fallback system font while the web font is loading. By default, the fallback font will render after the 3 second swap period, or if the web font fails to load. FOUT is preferable to FOIT, as users can still read the content whilst the web font is loading; however, care must be taken to minimise the layout shift when the web font does load.

### Flash of Faux Text

FOFT is very similar to FOUT, in that you render text as soon as possible without waiting for the web font to load. However, instead of the browser rendering a fallback system font, the browser renders a "Roman" web font. A "Roman" web font is a subset of the full web font, which often supports exclusively Western European languages and a reduced set of features. The browser uses _font synthesis_ to render "faux bold" and "faux italic" text, while the full web font continues to load.

Zach Leatherman really is the authority on everything web fonts --- I encourage you to read his [Web Font Loading Glossary]() and [Guide to Font Loading Strategies]() for all the different ways of loading fonts!

## Do I Really Need This Many Web Fonts?

Retrospectively, it seems crazy to load seven web fonts on a single page of my website. I encourage yourself to ask the question, "Why am I actually using this web font?" --- I couldn't come up with any explanation aside from the fact that I like fonts! I wasn't relying on any special ligatures for my code blocks, nor features like tabular numbers of the fonts I was loading.

Instead of browsing Google Fonts for new fonts on my website, I decided instead to take a look at the system fonts already on my device. Obviously the fonts available on each device vary, so here are some great resources I used:

* [CSS Font Stack](https://www.cssfontstack.com/) shows the percentage of Windows and Mac devices which support some common fallback system fonts.
* [System Font Stack article](https://css-tricks.com/snippets/css/system-font-stack/) on CSS-Tricks which has some good snippets for body font.
* [Using UI System Fonts]() a longer article on Smashing which explains which fonts target which systems.