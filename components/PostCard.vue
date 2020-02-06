<template>
  <li class="post-card">
    <h3 class="post-card__title">
      <nuxt-link :to="post.link" class="post-card__link">
        {{ post.title }}
      </nuxt-link>
    </h3>
    <small class="post-card__details">
      {{ date }} &mdash; {{ post.mins }} minute read
    </small>
    <p class="post-card__description">{{ post.description }}</p>
  </li>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    date() {
      return this.post.date.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  }
}
</script>

<style lang="scss">
.post-card {
  background: linear-gradient(to right, $color__body, transparent),
    linear-gradient(transparent 75%, #{transparentize(black, 0.95)}),
    $color__body--overlay;
  border-radius: $border-radius;
  padding: 1.5rem;
  padding-top: 1rem;
  padding-left: 0;
  position: relative;

  &::before {
    background-color: $color__body;
    box-shadow: $box-shadow--small;
    border: $border-weight solid $color__primary--muted;
    border-radius: $border-radius;
    content: '';
    height: calc(100% + #{2 * $border-weight});
    left: 0;
    position: absolute;
    top: -$border-weight;
    transition: box-shadow 150ms ease-out, border-color 150ms ease-out;
    width: calc(100% + #{$border-weight});
    z-index: -1;
  }

  &::after {
    background: linear-gradient(to right, $color__body 2rem, transparent);
    content: '';
    height: calc(100% + 2rem);
    left: -2rem;
    position: absolute;
    top: -1rem;
    width: calc(100% + 2rem);
    z-index: -1;
  }

  &:hover::before {
    border-color: $color__primary;
    box-shadow: $box-shadow;
  }
}

.post-card__title {
  margin-bottom: 0.5rem;
}

.post-card__link {
  @include link;

  &::after {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    content: '';
    top: 0;
  }
}

.post-card__details {
  color: $color__text--muted;
  display: block;
  margin-bottom: 0.5rem;
}
</style>
