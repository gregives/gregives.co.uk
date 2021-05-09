---
title: Interpolating Colour with CSS
date: 2021-05-09
description: Different methods of interpolating colour in CSS including negative animation‑delay
tags: []
---

"How to interpolate colour CSS", I typed into Google. Surely there's an easy way to interpolate colour in CSS, given that the browser natively interpolates colour in gradients and animation? The first result is the [color-interpolate](https://www.npmjs.com/package/color-interpolate) package on npm, not a very good start.

I wanted to create a progress bar which transitions from red at 0% to green at 100%. The [meter HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) was an option but I really wanted the colour to smoothly transition from red to green.

## Using CSS Variables

While searching for a solution, it was apparent _a lot_ of people had resorted to using JavaScript to interpolate colour. However, I came across a great [suggestion](https://stackoverflow.com/a/59663662) to vary the hue of the [CSS `hsl()` function](<https://developer.mozilla.org/docs/Web/CSS/color_value/hsl()>).

We could implement interpolation between red and green using a single `progress` CSS variable (otherwise known as a _custom property_):

```html
<div class="progress" style="--progress: 40"></div>
```

```css
.progress {
  background-color: hsl(calc(var(--progress) * 1.2), 100%, 50%);
}
```

<interpolation :step="1" />

This is okay but there's an arbitrary `1.2` which controls the hue: when the progress is 0%, the hue will be 0; when the progress is 100%, the hue will be 120 which corresponds to lime green.

Let's change that so we can specify the start and end hue. To calculate the colour for the current progress, we can use the following formula:

```
start + (end - start) * (progress / 100)
```

We can implement this in CSS using two additional `start` and `end` variables:

```css
.progress {
  --start: 0;
  --end: 120;
  background-color: hsl(
    calc(var(--start) + (var(--end) - var(--start)) * var(--progress) / 100),
    100%,
    50%
  );
}
```

<interpolation :step="2" />

### Interpolating Between Any Two Colours

You might be able to see where this is going... if we use 7 CSS variables, we can finally interpolate between any two colours represented by their `hsl()` value. Here's what this looks like:

<!-- prettier-ignore-start -->
```css
.progress {
  --h-start: 0;
  --s-start: 100;
  --l-start: 50;
  --h-end: 120;
  --s-end: 100;
  --l-end: 50;
  background-color: hsl(
    calc(var(--h-start) + (var(--h-end) - var(--h-start)) * var(--progress) / 100),
    calc(var(--s-start) + (var(--s-end) - var(--s-start)) * var(--progress) / 100),
    calc(var(--l-start) + (var(--l-end) - var(--l-start)) * var(--progress) / 100)
  );
}
```
<!-- prettier-ignore-end -->

<interpolation :step="3" />

## Interpolating Colour Using Animation

So far, we've calculated the interpolation ourselves using this formula:

```
start + (end - start) * (progress / 100)
```

However, the browser can calculate interpolation itself, which you may (or may not) have realised if you've animated colour before or used gradient backgrounds. If we wanted to animate colour between red and green, we would do something like this:

```css
@keyframes progress {
  from {
    background-color: red;
  }

  to {
    background-color: lime;
  }
}

.progress {
  animation: 3s linear infinite alternate progress;
}
```

<interpolation :step="4" />

### Negative `animation-delay`

The magic to interpolating colour using animation is a negative `animation-delay` property. From the [CSS Animations Level 1](https://drafts.csswg.org/css-animations-1/#animation-delay) specification:

> A negative delay is **valid**. Similar to a delay of 0s, it means that the animation executes immediately, but is automatically progressed by the absolute value of the delay, as if the animation had started the specified time in the past, and so it appears to start partway through its [active duration](https://drafts.csswg.org/css-animations-1/#animation-iteration-count). If an animation's keyframes have an implied starting value, the values are taken from the time the animation starts, not some time in the past.

If we want to set the background colour to the midpoint of red and green, we would need to set the `animation-delay` to half the duration of the animation. We can again implement this with a single `progress` CSS variable:

```css
@keyframes progress {
  from {
    background-color: red;
  }

  to {
    background-color: lime;
  }
}

.progress {
  animation: 100s linear calc(-1s * var(--progress)) paused progress;
}
```

<interpolation :step="5" />

Now the browser is doing all the hard work, we just specify the colours we want to interpolate and the browser does the rest. **But hang on!** In this last demonstration, the midpoint of red and green appears to be brown, whereas previously the midpoint was yellow. That's because the browser interpolates colour in the [alpha-premultiplied sRGBA colour space](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#interpolation) "to prevent unexpected gray colours from appearing".

We can circumvent this by adding more colours into our animation. Because we're using animation to interpolate the colours, we can also make use of different easing functions such as `ease-in-out`.

```css
@keyframes progress {
  0% {
    background-color: red;
  }

  32.5% {
    background-color: orange;
  }

  50% {
    background-color: yellow;
  }

  100% {
    background-color: lime;
  }
}

.progress {
  animation: 100s ease-in-out calc(-1s * var(--progress)) paused progress;
}
```

<interpolation :step="6" />

## Combining CSS Variables and Animation

By combining the use of CSS variables and animation, we can interpolate colour in the HSL colour space whilst getting the browser to do the interpolation for us. This gives us the best of both worlds! **However**, by default, browsers don't know how to interpret custom properties and so can't interpolate them --- we need to tell the browser what each custom property means. We can do this using the `@property` rule [defined by CSS Houdini](https://drafts.css-houdini.org/css-properties-values-api-1/#at-property-rule).

<post-aside type="warning">

Your browser [might not support](https://caniuse.com/mdn-css_at-rules_property) the `@property` rule, so the following demonstration **might just switch straight from red to green**. This is what happens when the browser doesn't know how to interpolate a custom property!

</post-aside>

We can define our CSS variables inside the `@keyframes` rule like so:

```css
@keyframes progress {
  from {
    --hue: 0;
    --saturation: 100%;
    --lightness: 50%;
  }

  to {
    --hue: 120;
    --saturation: 100%;
    --lightness: 50%;
  }
}

@property --hue {
  syntax: '<number> | <angle>';
  inherits: false;
  initial-value: 0;
}

@property --saturation {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 100%;
}

@property --lightness {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 50%;
}

.progress {
  animation: 100s linear calc(-1s * var(--progress)) paused progress;
  background-color: hsl(var(--hue), var(--saturation), var(--lightness));
}
```

<interpolation :step="7" />

## Which Method Is Best?

It depends! Each method has advantages and disadvantages, let's take a look at which might be the most appropriate for different situations.

Use a single CSS variable to vary the hue of the `hsl()` function if:

- You need to interpolate the hue, but not saturation or lightness
- You only need linear interpolation

Use multiple CSS variables to vary the hue, saturation and/or lightness of the `hsl()` function if:

- You need to interpolate between arbitrary colours in the HSL colour space
- You only need linear interpolation
- You're okay with using many CSS variables

Use animation with a negative `animation-delay` if:

- You want to interpolate between two or more colours easily
- You don't mind that the colours are interpolated in an RGB colour space
- You want to use non-linear interpolation such as `ease`

Use a combination of CSS variables and a negative `animation-delay` if:

- You want to interpolate between two or more colours easily in the HSL colour space
- You don't need to support older browsers
