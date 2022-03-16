<template>
  <div class="comments">
    <hr v-if="!guestbook" />
    <h2 v-if="!guestbook" class="comments__header">
      {{ sortedComments.length }}
      comment{{ sortedComments.length === 1 ? '' : 's' }}
    </h2>
    <ol class="comments__list">
      <li v-for="comment in sortedComments" :key="comment.date" class="comment">
        <div class="comment__avatar"><account-icon :size="55" /></div>
        <article class="comment__message">
          <div class="comment__heading">
            <strong>{{ comment.name }}</strong>
            {{ guestbook ? 'was here' : 'commented' }}
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
        <comments-form @submit="addNewComment" />
      </li>
    </ol>
  </div>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import AccountIcon from 'icons/Account'
import CommentsForm from '~/components/CommentsForm'

TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

export default {
  components: {
    AccountIcon,
    CommentsForm
  },
  props: {
    guestbook: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      comments: [],
      newComments: []
    }
  },
  async fetch() {
    const { comments } = await this.$dynamic(this.$route.path)
    this.comments = comments
    this.newComments = []
  },
  computed: {
    sortedComments() {
      return [...this.comments, ...this.newComments].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      )
    }
  },
  watch: {
    $route: '$fetch'
  },
  methods: {
    addNewComment(newComment) {
      this.newComments.push({ ...newComment, date: Date.now() })
    },
    formatDate(date) {
      const timeAgo = new TimeAgo('en-US')
      const [formattedDate, timeToNextUpdate] = timeAgo.format(new Date(date), {
        getTimeToNextUpdate: true
      })

      // Re-render comments when formatted date changes
      if (timeToNextUpdate && timeToNextUpdate < 24 * 60 * 60 * 1000) {
        setTimeout(() => {
          this.comments = [...this.comments]
          this.newComments = [...this.newComments]
        }, timeToNextUpdate)
      }

      return formattedDate
    },
    fullDate(date) {
      return new Date(date).toLocaleString()
    }
  }
}
</script>

<style lang="scss">
.comments__header {
  @include h3;
}

.comments__list {
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
