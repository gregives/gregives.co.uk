---
title: SnapScroll
date: 2017-08-01
image: /assets/images/dynamic/snapscroll/screenshot.png
description: >-
  My first JavaScript library to scroll smoothly between points on a website, built as a jQuery plugin.
tags:
  - jQuery
  - Library
  - Scrolling
  - Animation
---

When creating my personal site in 2016, fullscreen scrolling websites were all the rage. However, none of the open-source libraries available were what I was looking for; [fullPage by Alvaro Trigo](https://alvarotrigo.com/fullPage/) came close, but did not allow the centering of elements less than the height of the viewport. So I decided to create my own snap scrolling JavaScript library, **snapScroll.js**.

**Note:** There is considerable controversy over "scroll-hijacking", whereby a website overrides the native scrolling behavior of the browser to create its own interaction, which confuses some visitors. This is a very important note to consider, and the reason why my website no longer uses snapScroll.js.

<video src="/projects/snapscroll/preview.webm" type="video/webm" autoplay muted></video>

## Creating the Library

SnapScroll.js was built as a jQuery plugin, in order to use jQuery's scrollTo function. It revolves around adding _snap points_ throughout the page, added via a `data-snap-point` attribute, which determines the scrolling flow of the page. Custom jQuery easings enable the possibility of quirky scrolling, such as a bouncing effect at the bottom of the page.

## Browser Support

SnapScroll.js was kindly supported by [BrowserStack](https://browserstack.com), in order to test browser support and find any problems with the scroll detection. SnapScroll.js supports the following browsers:

- Chrome ≥ 26
- Firefox ≥ 21
- Edge ≥ 14
- Opera ≥ 15
- Safari ≥ 6.2
- Internet Explorer not supported
