---
title: Nuxt, Netlify Forms and reCAPTCHA
date: 2021-12-27
description: How to integrate Netlify Forms and reCAPTCHA into a Nuxt application
tags:
  - Nuxt
  - Netlify Forms
  - reCAPTCHA
  - Invisible
  - SSR
  - "@nuxtjs/recaptcha"
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

<netlify-form :step="1"></netlify-form>

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

<netlify-form :step="2"></netlify-form>

## Adding reCAPTCHA to Your Form

Now we've set up a basic form, let's add a reCAPTCHA challenge to our form. The [Netlify documentation](https://docs.netlify.com/forms/spam-filters/#recaptcha-2-challenge) says "Netlify can include one for you, or you can add your own".

> To have Netlify provide the CAPTCHA:
>
> 1. Add a `data-netlify-recaptcha="true"` attribute to your `<form>` tag.
> 2. In the place where you'd like the CAPTCHA to appear, add an empty `<div>` element inside your form with the same `data-netlify-recaptcha="true"` attribute.

However, **this won't work** with Nuxt because of what we touched upon earlier: hydration. Netlify Forms will change that empty `<div>` element into a reCAPTCHA widget but Nuxt still thinks it's an empty `<div>`, so it can't hydrate the page.

Instead, we can follow the [custom reCAPTCHA 2](https://docs.netlify.com/forms/spam-filters/#custom-recaptcha-2) documentation:

> To set up a custom reCAPTCHA:
>
> 1. [Sign up for a reCAPTCHA API key pair](http://www.google.com/recaptcha/admin) and follow the instructions for adding reCAPTCHA to your site.
>
> 2. [Log in to Netlify](https://app.netlify.com/) and add the following environment variables to the **Site settings > Build & deploy > Environment > Environment variables** panel:
>
>    - `SITE_RECAPTCHA_KEY` with the reCAPTCHA API site key.
>    - `SITE_RECAPTCHA_SECRET` with the reCAPTCHA API secret key.
>
> 3. Add a `data-netlify-recaptcha="true"` attribute to the HTML form that has the custom reCAPTCHA widget.

### Getting a Site Key and Secret Key

Firstly, let's create a new site in the Google reCAPTCHA console:

1. Go to [the page to create a new reCAPTCHA](https://www.google.com/recaptcha/admin/create)
2. Make a label for your reCAPTCHA site, I set mine as `gregives.co.uk`
3. Select `reCAPTCHA v2` for the reCAPTCHA type, Netlify doesn't support v3 yet
4. Select `Invisible reCAPTCHA badge` (we'll make the reCAPTCHA widget invisible later)
5. Add your domains, for example, `gregives.co.uk` **and `localhost` for testing**
6. Add any other owners and accept the reCAPTCHA Terms of Service

### Setting up the Environment Variables

Secondly, let's add the reCAPTCHA site key and secret key to Netlify and a `.env` file:

1. [Log in to Netlify](https://app.netlify.com/), click on the site you want to add your form to
2. Go to the **Site settings > Build & deploy > Environment > Environment variables** panel
3. Add the site key as `SITE_RECAPTCHA_KEY`
4. Add the secret key as `SITE_RECAPTCHA_SECRET`
5. We'll also put these in a `.env` file so they work when we run the Nuxt application locally. Create a file named `.env` in the root of your Nuxt application and put the site key and secret key inside it:

   ```env
   SITE_RECAPTCHA_KEY=XXXXXXXXXXXXXXXX
   SITE_RECAPTCHA_SECRET=XXXXXXXXXXXXXXXX
   ```

### Adding the reCAPTCHA Widget

And lastly, let's add the reCAPTCHA widget to our form. We'll use the [`@nuxtjs/recaptcha` module](https://github.com/nuxt-community/recaptcha-module) to make it easy for us.

```sh
npm install --save @nuxtjs/recaptcha
# Or with Yarn
yarn add @nuxtjs/recaptcha
```

Add `@nuxtjs/recaptcha` to the modules section of your `nuxt.config.js` and add top-level `recaptcha` options:

```js {4,6-11}
export default {
  modules: [
    // You may already have some modules here
    '@nuxtjs/recaptcha'
  ],
  recaptcha: {
    hideBadge: false,
    siteKey: process.env.SITE_RECAPTCHA_KEY,
    size: 'normal',
    version: 2
  }
}
```

Now we can add the `data-netlify-recaptcha="true"` attribute to our form and use the `<recaptcha />` component that `@nuxtjs/recaptcha` registers.

<!-- prettier-ignore-start -->
```vue {2,8}
<template>
  <form name="contact" method="POST" action="/success" data-netlify="true" data-netlify-recaptcha="true">
    <input type="hidden" name="form-name" value="contact" />
    <label>
      Your Name:
      <input type="text" name="name" />
    </label>
    <recaptcha />
    <button type="submit">Send</button>
  </form>
</template>
```
<!-- prettier-ignore-end -->

<netlify-form :step="3"></netlify-form>

We've now created a form using Netlify Forms and reCAPTCHA in our Nuxt application! Carry on reading if you want to make the reCAPTCHA invisible and send your form using AJAX...

## Making the reCAPTCHA Widget Invisible

Now that we have a working form with reCAPTCHA, it shouldn't be too difficult to make the reCAPTCHA invisible; the `@nuxt/recaptcha` module should do most of the work for us.

```js {9}
export default {
  modules: [
    // You may already have some modules here
    '@nuxtjs/recaptcha'
  ],
  recaptcha: {
    hideBadge: false,
    siteKey: process.env.SITE_RECAPTCHA_KEY,
    size: 'invisible',
    version: 2
  }
}
```

Users won't have a widget to click on, so reCAPTCHA needs to know when to generate a token. The [`@nuxt/recaptcha` documentation](https://github.com/nuxt-community/recaptcha-module#recaptcha-v2) tells us to call `getResponse` in order to get the reCAPTCHA token. We don't need to assign this token to a variable though: the invisible reCAPTCHA widget contains an input with this value.

We'll move each of the `<form>` attributes onto a new line, just so we can see them easier!

```vue {8,20-32}
<template>
  <form
    name="contact"
    method="POST"
    action="/success"
    data-netlify="true"
    data-netlify-recaptcha="true"
    @submit.prevent="onSubmit"
  >
    <input type="hidden" name="form-name" value="contact" />
    <label>
      Your Name:
      <input type="text" name="name" />
    </label>
    <recaptcha />
    <button type="submit">Send</button>
  </form>
</template>

<script>
export default {
  methods: {
    async onSubmit(event) {
      // Wait for the reCAPTCHA token
      await this.$recaptcha.getResponse()

      // Submit the form
      event.target.submit()
    }
  }
}
</script>
```

**The reCAPTCHA widget should now be invisible!** Although, you'll notice that a badge has appeared in the bottom right of the page; if you want to, [Google's documentation says](https://developers.google.com/recaptcha/docs/faq#id-like-to-hide-the-recaptcha-badge.-what-is-allowed) you can remove this badge "as long as you include the reCAPTCHA branding visibly in the user flow".

```vue {16-20,39-43}
<template>
  <form
    name="contact"
    method="POST"
    action="/success"
    data-netlify="true"
    data-netlify-recaptcha="true"
    @submit.prevent="onSubmit"
  >
    <input type="hidden" name="form-name" value="contact" />
    <label>
      Your Name:
      <input type="text" name="name" />
    </label>
    <recaptcha />
    <small>
      This site is protected by reCAPTCHA and the Google
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </small>
    <button type="submit">Send</button>
  </form>
</template>

<script>
export default {
  methods: {
    async onSubmit(event) {
      // Wait for the reCAPTCHA token
      await this.$recaptcha.getResponse()

      // Submit the form
      event.target.submit()
    }
  }
}
</script>

<style>
.grecaptcha-badge {
  visibility: hidden;
}
</style>
```

<netlify-form :step="4"></netlify-form>

Personally, I like this method because I can style the message to match the website's branding and design guidelines. It also doesn't get in the way of any other fixed elements, such as a floating action button.

## Sending the Form Using AJAX

If you've followed up to this point, you've built a form with an invisible reCAPTCHA challenge using Netlify Forms. Let's take this one step further and send the form data using AJAX so that the user isn't redirected away from the page when they click the submit button. We'll use the global [`fetch()` method](https://developer.mozilla.org/en-US/docs/Web/API/fetch) to send the form data, no need to use an npm package for this!

```vue {22,28-32,35-59}
<template>
  <form
    name="contact"
    method="POST"
    action="/success"
    data-netlify="true"
    data-netlify-recaptcha="true"
    @submit.prevent="onSubmit"
  >
    <input type="hidden" name="form-name" value="contact" />
    <label>
      Your Name:
      <input type="text" name="name" />
    </label>
    <recaptcha />
    <small>
      This site is protected by reCAPTCHA and the Google
      <a href="https://policies.google.com/privacy">Privacy Policy</a> and
      <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </small>
    <button type="submit">Send</button>
    <p v-if="message">{{ message }}</p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: null
    }
  },
  methods: {
    async onSubmit(event) {
      try {
        // Wait for the reCAPTCHA token
        await this.$recaptcha.getResponse()

        // Submit the form to Netlify
        const response = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams(new FormData(event.target)).toString()
        })

        // Throw an error if the response was not successful
        if (!response.ok) {
          throw new Error('Response was not successful')
        }

        // Say thank you and reset reCAPTCHA
        this.message = 'Thanks!'
        await this.$recaptcha.reset()
      } catch {
        // Error message if something goes wrong
        this.message = 'Something went wrong, please try again.'
      }
    }
  }
}
</script>

<style>
.grecaptcha-badge {
  visibility: hidden;
}
</style>
```

<netlify-form :step="5"></netlify-form>

There we go! You can play around with the feedback message to make it a bit more fun, <nuxt-link to="/contact/">my contact form</nuxt-link> throws a little paper plane.

I hope this blog post has helped you to implement Netlify Forms in your Nuxt application with reCAPTCHA. If you've got any questions, feel free to fill out <nuxt-link to="/contact/">my contact form</nuxt-link> or find me on social media!
