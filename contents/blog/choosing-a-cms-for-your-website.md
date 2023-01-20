---
title: Choosing a CMS for Your Website
date: 2020-03-28
description: Why I decided to use a CMS for my website and why I chose to use Forestry.io, a Git-based CMS.
tags:
  - Content management system
  - Git-based
  - API-based
  - Forestry.io
---

I'm writing this blog post on my phone and when I'm finished I'll click save, which will automatically trigger a build of my website. I think that's really cool! A few months ago, I didn't see the appeal in content management systems --- in this blog post I'm going to explain why I've changed my mind and how to choose the right CMS for you.

## Why Use a Content Management System?

In my opinion, a content management system is used to abstract the content of a website away from the code. Before I started using a CMS, everything was all squished together in a Git repository; when I wanted to make a new blog post, I would open up Visual Studio Code and create a new Markdown file for the blog post. Now I've started using a CMS, everything is still inside the repository (more on that later) but I write new content on Forestry.io, which provides me with an online dashboard _designed solely for my content_.

This separation between code and content allows me to focus more on writing content, instead of getting distracted with menial code changes.

## Which Type of CMS Is Right for You?

When you think of a Content Management System, you'll probably think of WordPress, which is used on a staggering [36.2% of all websites](https://w3techs.com/technologies/overview/content_management) at the time of writing. If you used WordPress as your CMS of choice, you typically had to use WordPress to create your website as well as the content, this is known as a monolithic or traditional CMS. However, **headless** content management systems are becoming much more popular: headless CMSs allow you to manage your content on the CMS but _use your chosen technology_, for example, a static site generator like Gatsby or Hugo, to build your website.

When I started thinking about using a CMS on my website, I'd already created my blog <nuxt-link to="/blog/build-a-blog-with-nuxt-and-markdown/">using Nuxt.js and Markdown</nuxt-link>, so I knew I needed to use a headless CMS. Which brought me to my next decision: should I use a Git-based or API-based headless CMS?

![Diagram showing the architecture of different CMSs](/assets/images/dynamic/which-cms/designs.png)

### Git-Based CMSs

After you edit content in your Git-based CMS, your changes will be pushed to the repository, which will trigger a build of your website (or application). Essentially, all of your content is stored in your Git repository.

**Pros:**

- Version control straight out-of-the-box
- Easily revert changes (using your version control system)
- You can easily switch between Git-based CMSs
- No change to the workflow for developers
- It's really simple!

**Cons:**

- Flat-file storage like Markdown isn't suited to lots of content
- New content will trigger a build every time

### API-Based CMSs

An API-based CMS stores all your content in their database. When you edit content, nothing implicitly changes, although you may want to send a webhook to your build process. When you build your website, you will make a request to the API (usually REST or GraphQL) to retrieve the content.

**Pros:**

- You can use the content for multiple websites and/or applications
- It can easily handle large amounts of data
- Add new content as often as you want, without necessarily triggering a build

**Cons:**

- Version control of your content is now down to the CMS
- API-based CMSs usually have storage and usage limits, which can cost
- Changing your API-based CMS will require changes to how you retrieve your content

## Why I Chose Forestry.io

As all of the content on my website was already stored in the `contents` directory of my Git repository, it seemed obvious to use a Git-based CMS. I found a number of options, including [Forestry.io](https://forestry.io/), [Publii](https://getpublii.com/) and [Netlify CMS](https://www.netlifycms.org/). Each of these uses a different way of accessing the CMS:

- Forestry.io provides a hosted dashboard
- Publii needs to be downloaded as a local application
- Netlify CMS is hosted by you, on your website

I wanted to be able to edit my content online but I didn't want the hassle (although it's probably very straightforward) of setting up Netlify CMS. So I decided to use Forestry.io!

### Setting up Forestry.io

Setting up Forestry.io was as simple as telling it where my content and media lived in my repository, and setting up the "sidebar", essentially the pages on your website.

![Screenshot of the Forestry.io editing panel and sidebar](/assets/images/dynamic/which-cms/screenshot.png)

I hope you found this blog post useful in deciding which CMS is right for you!
