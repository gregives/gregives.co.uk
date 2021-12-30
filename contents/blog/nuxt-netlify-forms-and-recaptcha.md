---
title: Nuxt, Netlify Forms and reCAPTCHA
date: 2021-12-27
description: How to integrate Netlify Forms and reCAPTCHA into a Nuxt application
tags: []
---

For a long time, I've been using [FormSubmit](https://formsubmit.co/) for the contact form on this website. It is great at what it does and it's free! However, after submitting the contact form it would redirect you to the FormSubmit website to fill out a reCAPTCHA; I would much rather the users stay on my website and use AJAX to submit the form.

## Netlify Forms

My website is built with Nuxt and deployed using Netlify, so [Netlify Forms](https://www.netlify.com/products/forms/) was an obvious choice. It promises to "manage forms and submissions without any server-side code or JavaScript", which sounds just like FormSubmit. The bit that interested me was:

> While JavaScript is never required for Netlify Forms, you can use JavaScript to submit forms with AJAX/XHR if you'd like. That makes Netlify Forms a great companion to sites powered by Vue, React, or other modern frameworks.

It is a great companion to sites powered by Vue, which Nuxt uses under the hood! In theory, all the information you need to set up Netlify Forms is documented [in this page](https://docs.netlify.com/forms/setup/), however, it's a bit confusing.

### How Netlify Forms Works

Firstly, let's try to understand how Netlify Forms works, starting on the [HTML forms section](https://docs.netlify.com/forms/setup/#html-forms):

> Code an HTML form into any page on your site, add `data-netlify="true"` or a `netlify` attribute to the `<form>` tag, and you can start receiving [submissions](https://docs.netlify.com/forms/submissions/) in your Netlify site admin panel.
>
> Your form's `name` attribute determines what we call the form in the Netlify app interface. If you have more than one form on a site, each form should have a different `name` attribute.
>
> When Netlify bots parse the static HTML for a form you’ve added, they automatically strip the `data-netlify="true"` or `netlify` attribute from the `<form>` tag and inject a hidden input named `form-name`.

There are **three things we should take away from this documentation**:

1. Your `<form>` tag needs a `name` attribute which will determine what the form is called in the Netlify app interface.
2. Netlify will remove the `data-netlify="true"` or `netlify` attribute from your form.
3. Netlify will inject a hidden input named `form-name`. The value of this input will be the same as the `name` attribute on your `<form>` tag.

Bearing those three things in mind, let's look at an example. Netlify would search through your HTML files in your build output and find this form:

```html
<form name="contact" method="POST" data-netlify="true">
  <label>
    Your Name:
    <input type="text" name="name" />
  </label>
  <button type="submit">Send</button>
</form>
```

Netlify would then remove the `data-netlify="true"` attribute (or the `netlify` attribute if that's what you used) and add the hidden `form-name` input:

```html {1,2}
<form name="contact" method="POST">
  <input type="hidden" name="form-name" value="contact" />
  <label>
    Your Name:
    <input type="text" name="name" />
  </label>
  <button type="submit">Send</button>
</form>
```

### JavaScript-Rendered Forms

This is where the documentation gets a bit confusing, especially if you're building your site using a static site generator like Nuxt.

> Our buildbots find your forms by parsing the HTML of your site when the build completes. This means that if you’re using JavaScript to render a form client-side, our buildbots won’t find it in the pre-built files.
>
> - Create a hidden HTML form with the `data-netlify="true"` attribute or a `netlify` attribute and input fields with `name` attributes to match the inputs of your JavaScript-rendered form. You need to apply the same work around if you want to use our reCAPTCHA 2 integration, and create a `div` element in the hidden HTML with the `data-netlify-recaptcha="true"` attribute.
> - Add a hidden input to the JavaScript-rendered form or JSX form:
>
>   ```html
>   <input type="hidden" name="form-name" value="name_of_my_form" />
>   ```

Create a hidden HTML form, that sounds a bit weird? Netlify needs to know **at build time** that your form exists and what inputs your form takes --- it does this by searching your HTML files. If your form lives in a JavaScript file ready to be rendered on the client-side, then Netlify won't know about it.

**However, this does not apply to Nuxt** because Nuxt is a static site generator. The `nuxt generate` command will render your HTML at build time and Netlify will have no trouble finding your form.

We do need to pay attention to the second point though: if we ignore the second point, Netlify will change our HTML by removing the `data-netlify="true"` or `netlify` attribute and adding the hidden input into our form, **without Nuxt knowing**. This will cause a mismatch during hydration.

<post-aside type="info">

Hydration refers to the client-side process during which Vue takes over the static HTML sent by the server and turns it into dynamic DOM that can react to client-side data changes. A mismatch occurs when the virtual DOM tree does not match the DOM structure rendered from the server. Read more about hydration in the [Vue SSR Guide](https://ssr.vuejs.org/guide/hydration.html).

</post-aside>

## A Basic Form Using Netlify Forms and Nuxt

Putting together everything we've learnt so far, let's create our first form. We'll put the form in a single-file component, with some optional styles in a `<style>` tag. No need for a `<script>` tag yet, this form works using HTML only.

```vue
<template>
  <form name="contact" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact" />
    <label>
      Your Name:
      <input type="text" name="name" />
    </label>
    <button type="submit">Send</button>
  </form>
</template>

<style lang="scss">
/* Make your form look beautiful here */
</style>
```

<output>
  <form name="Test Form" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="Test Form" />
    <label>
      Your Name:
      <input type="text" name="name" />
    </label>
    <button type="submit">Send</button>
  </form>
</output>

When you click the submit button, a few things will happen:

1. Your browser will make a POST request with the form data to the current URL
2. Netlify will look for `form-name` to know which form has been submitted
3. Netlify will show the user a generic success page with a link back to your website
4. You'll be able to see the submission form in the [Netlify app](https://app.netlify.com/) interface

### Using Your Own Success Message

You can display your own success page instead of Netlify's by adding an `action` attribute to your `<form>` tag. The value should be the URL of your success page, for example:

```vue {2}
<template>
  <form name="contact" method="POST" action="/success" data-netlify="true">
    <input type="hidden" name="form-name" value="contact" />
    <label>
      Your Name:
      <input type="text" name="name" />
    </label>
    <button type="submit">Send</button>
  </form>
</template>
```

<output>
  <form name="Test Form" method="POST" action="./success/" data-netlify="true">
    <input type="hidden" name="form-name" value="Test Form" />
    <label>
      Your Name:
      <input type="text" name="name" />
    </label>
    <button type="submit">Send</button>
  </form>
</output>

## Adding reCAPTCHA to Your Form

Now we've set up a basic form, let's add support for reCAPTCHA.

> To have Netlify provide the CAPTCHA:
>
> 1. Add a `data-netlify-recaptcha="true"` attribute to your `<form>` tag.
> 2. In the place where you'd like the CAPTCHA to appear, add an empty `<div>` element inside your form with the same `data-netlify-recaptcha="true"` attribute.

```vue {7,14}
<template>
  <form
    name="contact"
    method="POST"
    action="/success"
    data-netlify="true"
    data-netlify-recaptcha="true"
  >
    <input type="hidden" name="form-name" value="contact" />
    <label>
      Your Name:
      <input type="text" name="name" />
    </label>
    <div data-netlify-recaptcha="true"></div>
    <button type="submit">Send</button>
  </form>
</template>
```

<output>
  <form name="Test Form" method="POST" action="./success/" data-netlify="true" data-netlify-recaptcha="true">
    <input type="hidden" name="form-name" value="Test Form" />
    <label>
      Your Name:
      <input type="text" name="name" />
    </label>
    <div data-netlify-recaptcha="true"></div>
    <button type="submit">Send</button>
  </form>
</output>
