<template>
  <li class="watch-card" :class="{ 'watch-card--hero': hero }">
    <div class="watch-card__image">
      <lazy-image
        :src="watch.image"
        :alt="title"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
    </div>
    <div class="watch-card__content">
      <h2 class="watch-card__title">
        <nuxt-link :to="watch.link" class="watch-card__link">
          {{ title }}
        </nuxt-link>
      </h2>
      <div class="watch-card__specs">
        <small>RRP {{ watch.specs['RRP'] }}</small>
        <small>Lug-lug {{ watch.specs['Lug-to-lug'] }}</small>
        <small>{{ watch.specs['My verdict'] }}</small>
      </div>
      <p class="watch-card__description">{{ watch.description }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    hero: {
      type: Boolean,
      default: false
    },
    watch: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return this.watch.titleShort || this.watch.title
    }
  }
}
</script>

<style lang="scss">
.watch-card {
  display: flex;
  flex-direction: column;
  position: relative;
}

.watch-card__image {
  background-color: $color__body;
  box-shadow: $box-shadow--small;
  overflow: hidden;
  padding-bottom: calc(75% - 0.75 * 1.5rem);
  position: absolute;
  width: calc(100% - 1.5rem);

  .lazy {
    inset: 0;
    position: absolute;

    picture {
      border-bottom-left-radius: 0;
      height: 100%;
      padding-bottom: 0;
      width: 100%;
    }
  }
}

.watch-card__content {
  background-color: $color__body--overlay;
  border: $border-weight solid $color__primary--muted;
  border-radius: $border-radius;
  box-shadow: $box-shadow--small;
  flex-grow: 1;
  margin-top: 1.5rem;
  padding: 1.5rem;
  padding-top: calc(75% - 0.75 * 1.5rem);
  transition: box-shadow 150ms $transition__normal,
    border-color 150ms $transition__normal;

  &:hover {
    border-color: $color__primary;
    box-shadow: $box-shadow;
  }
}

.watch-card__title {
  @include h3;

  display: inline-block;
  margin-bottom: 0.5rem;
}

.watch-card__link {
  @include link($color__body--overlay, $heading: true);

  &::after {
    content: '';
    inset: 0;
    position: absolute;
  }
}

.watch-card__specs {
  margin: 0.25rem 0 0.5rem;

  > small {
    border-radius: $border-radius;
    border: $border-weight solid $color__primary;
    display: inline-block;
    font-variant: small-caps;
    margin-bottom: 1rem;
    padding: 0.125rem 0.25rem;
    position: relative;

    &:not(:last-child)::before {
      border-radius: $border-radius;
      box-shadow: $box-shadow--primary-small;
      content: '';
      inset: 0;
      opacity: 0.5;
      position: absolute;
    }

    &:not(:first-child):not(:last-child) {
      margin-left: 0.25rem;
      margin-right: 0.5rem;
    }

    &:last-child {
      border: none;
      box-shadow: none;
      color: $color__primary;
      font-size: 150%;
      line-height: 0;
      margin-left: -0.25rem;
      vertical-align: -webkit-baseline-middle;
    }
  }
}

.watch-card__description {
  // stylelint-disable-next-line value-no-vendor-prefix
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
}

@media (min-width: $breakpoint--md) {
  .watch-card--hero {
    display: block;
    grid-column: 1 / 3;

    .watch-card__image {
      float: left;
      margin-right: 1.5rem;
      margin-bottom: 0.75rem;
      padding-bottom: 37.5%;
      position: relative;
      width: 50%;
    }

    .watch-card__content {
      padding-top: 1.5rem;
    }

    .watch-card__description {
      display: inline;
      -webkit-box-orient: unset;
      -webkit-line-clamp: unset;

      &::after {
        content: '\2026';
      }
    }
  }
}
</style>
