<template>
  <ol class="comments">
    <li v-for="comment in sortedComments" :key="comment.date" class="comment">
      <div class="comment__avatar"><account-icon :size="55" /></div>
      <article class="comment__message">
        <div class="comment__heading">
          <strong>{{ comment.name }}</strong> commented
          <time :datetime="comment.date" :title="fullDate(comment.date)">
            {{ formatDate(comment.date) }}
          </time>
        </div>
        <p class="comment__text">
          {{ comment.text }}
        </p>
      </article>
    </li>
    <li class="comment">
      <div class="comment__avatar"><account-icon :size="55" /></div>
      <comments-form @refresh="refreshComments" />
    </li>
  </ol>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import AccountIcon from 'icons/Account'
import { hydrateWhenVisible } from 'vue-lazy-hydration'

TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

export default {
  components: {
    AccountIcon,
    CommentsForm: hydrateWhenVisible(() => import('~/components/CommentsForm'))
  },
  data() {
    return {
      comments: []
    }
  },
  computed: {
    sortedComments() {
      return this.comments
        .slice()
        .sort((a, b) => new Date(a.date) - new Date(b.date))
    }
  },
  mounted() {
    this.refreshComments()
  },
  methods: {
    refreshComments(newComment) {
      try {
        // Update the comments when mounted
        this.comments = JSON.parse(localStorage.getItem('pages'))[
          this.$route.path
        ].comments
      } catch {
        this.comments = []
      } finally {
        // Optimistically add new comment
        if (newComment) {
          const { name, text, url, date = Date.now() } = newComment
          this.comments.push({ name, text, url, date })
        }
      }
    },
    formatDate(date) {
      const timeAgo = new TimeAgo('en-US')
      const [formattedDate, timeToNextUpdate] = timeAgo.format(new Date(date), {
        getTimeToNextUpdate: true
      })

      // Force component to refresh when formatted date changes
      if (timeToNextUpdate && timeToNextUpdate < 24 * 60 * 60 * 1000)
        setTimeout(this.$forceUpdate, timeToNextUpdate)

      return formattedDate
    },
    fullDate(date) {
      return new Date(date).toLocaleString()
    }
  }
}
</script>

<style lang="scss">
.comments {
  display: grid;
  gap: 1rem;
  grid-template-columns: 100%;
}

.comment {
  display: flex;
  flex-direction: row;
}

.comment__avatar {
  align-items: center;
  background-color: $color__primary--muted;
  border-radius: $border-radius;
  color: $color__primary;
  display: flex;
  flex-shrink: 0;
  height: 2.5rem;
  justify-content: center;
  overflow: hidden;
  width: 2.5rem;

  .material-design-icon {
    margin-bottom: -0.75rem;
  }
}

.comment__message,
.comment__form {
  background-color: $color__body--overlay;
  border: $border-weight solid $color__primary--muted;
  border-radius: $border-radius;
  box-shadow: $box-shadow--small;
  flex-grow: 1;
  margin-left: 1rem;
  position: relative;

  &::after {
    background-color: $color__body;
    border-left: $border-weight solid $color__primary--muted;
    border-bottom: $border-weight solid $color__primary--muted;
    content: '';
    height: 0.75rem;
    left: 0;
    position: absolute;
    top: 1.25rem;
    transform: translate(calc(-50% - $border-weight), -50%) rotate(45deg);
    width: 0.75rem;
  }
}

.comment__heading {
  background-color: $color__body;
  border-bottom: $border-weight solid $color__primary--muted;
  border-top-left-radius: $border-radius;
  border-top-right-radius: $border-radius;
  font-size: 90%;
  padding: 0.5rem 1rem;
}

.comment__text {
  padding: 0.75rem 1rem;
}
</style>
