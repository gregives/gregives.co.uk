---
tags: []
title: Optimising the Fonts on My Website
date: 2020-04-07T23:00:00Z
description: How I changed my font-loading strategy and reduced the first stage fonts
  by nearly 100 KB

---
I'll admit, I visit my own website a lot more than I reasonably should. One of my biggest peeves about my website was the time taken to load the display font — the titles would initially render in <span style="font-family: Georgia;">Georgia</span> and after a few seconds there would be a layout shift when my chosen font, Tiempos Headline, finally loaded! I read an excellent article by Zach Leatherman, [Developing a Robust Font Loading Strategy for CSS-Tricks](https://www.zachleat.com/web/css-tricks-web-fonts/), which inspired me to change my font loading strategy and massively reduce initial load times.