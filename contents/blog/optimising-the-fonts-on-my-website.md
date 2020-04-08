---
tags: []
title: Optimising the Fonts on My Website
date: 2020-04-07T23:00:00.000+00:00
description: How I changed my font-loading strategy and reduced the first stage fonts
  by over 100 kB

---
I'll admit, I visit my own website a lot more than I reasonably should. One of my biggest peeves about my website was the time taken to load the display font — the titles would initially render in <span style="font-family: Georgia;">Georgia</span> and after a few seconds there would be a layout shift when my chosen font, Tiempos Headline, finally loaded! I read an excellent article by Zach Leatherman, [Developing a Robust Font Loading Strategy for CSS-Tricks](https://www.zachleat.com/web/css-tricks-web-fonts/), which inspired me to change my font loading strategy and massively reduce initial load times.

## Before Optimising Fonts

Before I decided to optimise the fonts on my website, I was loading four web fonts on the home page and up to **seven** web fonts on some other pages! These amounted to a staggering **145kB**:

* Tiempos Headline, 31.3kB
* Tiempos Headline Bold, 30.2kB
* IBM Plex Sans, 17.9kB
* IBM Plex Sans Bold, 18.7kB
* IBM Plex Sans Italic, 19.5kB
* IBM Plex Mono, 13.7kB
* IBM Plex Mono Bold, 14.1kB

Opening up the Network panel in Chrome DevTools showed the time taken to download all four web fonts on the home page.

![](/assets/images/dynamic/optimising-fonts/waterfall1.png)