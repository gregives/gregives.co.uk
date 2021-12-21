<template>
  <li class="post-card">
    <div class="post-card__content">
      <h2 class="post-card__title">
        <nuxt-link :to="post.link" class="post-card__link">
          {{ post.title }}
        </nuxt-link>
      </h2>
      <small class="post-card__details">
        {{ date }} &bull; {{ post.mins }} minute read
      </small>
      <p class="post-card__description">{{ post.description }}</p>
    </div>
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
  background-color: $color__body--overlay;
  border: $border-weight solid $color__primary--muted;
  border-radius: $border-radius;
  box-shadow: $box-shadow--small;
  position: relative;
  transition: box-shadow 150ms $transition__normal,
    border-color 150ms $transition__normal;

  &:hover {
    border: $border-weight solid $color__primary;
    box-shadow: $box-shadow;
  }

  &::before {
    background-image: linear-gradient(
      to right,
      $color__body 2rem,
      $color__transparent
    );
    border-radius: $border-radius;
    content: '';
    height: calc(100% + 2rem);
    left: -1rem;
    pointer-events: none;
    position: absolute;
    top: -1rem;
    width: calc(100% + 1rem);
  }
}

.post-card__content {
  padding: 1.5rem;
  padding-top: 1rem;
  padding-left: 0;
  position: relative;
}

.post-card__title {
  @include h3;

  margin-bottom: 0.5rem;
}

.post-card__link {
  @include link($heading: true);

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
