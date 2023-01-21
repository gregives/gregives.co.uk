if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}

export default function (to, from, savedPosition) {
  const nuxt = this.app

  if (to.path === from.path) {
    return false
  }

  return new Promise((resolve) => {
    nuxt.$once('triggerScroll', () => {
      nuxt.$nextTick(() => {
        if (to.hash) {
          resolve(false)
        } else {
          resolve(savedPosition || { x: 0, y: 0 })
        }
      })
    })
  })
}
