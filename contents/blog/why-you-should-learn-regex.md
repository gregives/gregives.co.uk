---
title: Why You Should Learn Regex
date: 2020-02-26
description: Learning how to write regular expressions is a great investment of your time
tags: []
---

I often find myself needing to do bulk *find and replace*s, usually when refactoring my code. The other day, I needed to change a number of class names, something like this:

```scss
// From these class names
.projects__project,
.projects__project-title,
.projects__project-date,
.posts__post,
.posts__post-title,
.posts__post-date

// To these class names
.project,
.project__title,
.project__date,
.post,
.post__title,
.post__date
```

I could have manually replaced all the occurrences or used a VSCode keyboard shortut like `Ctrl+D`, however, these class names existed over many files.

### Regex to the Rescue

A regex, short for regular expression, is a **pattern used to match character combinations in strings**. I used the following regex to find and replace all occurrences of the class names.

<table>
  <tbody>
    <tr>
      <th>Find</th>
      <td><code>\.(project|post)s(?:(__)\1-(\w+)|__\1)</code></td>
    </tr>
    <tr>
      <th>Replace</th>
      <td><code>.$1$2$3</code></td>
    </tr>
  </tbody>
</table>

A few years ago, I wouldn't have had the faintest idea what that regex meant, or even where to begin --- you can see parts of the class names we are looking for, but the latter half of the regex is mostly incomprehensible. As with anything, **practice is key** to writing regular expressions. I frequently refer to the online tool [regexr.com](https://regexr.com) as a cheatsheet and an easy way to test out regexes; here's [the above regex](https://regexr.com/4v5lj) in regexr.com, which will allow you to see what each part of the regex does.

Regex can be used for all sorts of things, from input validation to data extraction. In my opinion, it is well worth the time invested into learning how to write regular expressions as it will save you so much time in the future!
