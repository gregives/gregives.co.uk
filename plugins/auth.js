import GoTrue from 'gotrue-js'
import Vue from 'vue'

const auth = new GoTrue({
  APIUrl: 'https://gregives.co.uk/.netlify/identity',
  setCookie: true
})

function transformUser(user) {
  if (user === null) {
    return null
  }

  return {
    name: user.user_metadata?.full_name,
    avatar: user.user_metadata?.avatar_url
  }
}

const state = {
  user: null,
  login() {
    localStorage.setItem('redirect', window.location.href)
    window.location.href = auth.loginExternalUrl('github')
  },
  logout() {
    auth.currentUser().logout().then(() => {
      state.user = transformUser(auth.currentUser())
    })
  }
}

if (process.client) {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.hash.slice(1))

  if (params.get('access_token')) {
    auth.createUser(Object.fromEntries(params), true).then(() => {
      state.user = transformUser(auth.currentUser())
    })

    window.location.hash = 'bottom'
  } else {
    setTimeout(() => {
      state.user = transformUser(auth.currentUser())
    }, 0)
  }
}

export default (_context, inject) => {
  inject('auth', Vue.observable(state))
}
