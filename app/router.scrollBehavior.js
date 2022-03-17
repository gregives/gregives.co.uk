export default function (to, from, savedPosition) {
  // Scrolling on same page handled natively
  if (to.path === from.path) {
    return false
  }

  const nuxt = this.app

  // Trigger scroll on initial load
  if (to === from) {
    nuxt.$nextTick(() => nuxt.$emit('triggerScroll'))
  }

  // Disable smooth scrolling between pages
  document.documentElement.style.scrollBehavior = 'auto'

  return new Promise((resolve) => {
    nuxt.$once('triggerScroll', () => {
      nuxt.$nextTick(() => {
        nuxt.$nextTick(() => {
          // Re-enable smooth scrolling on page
          document.documentElement.style.scrollBehavior = 'smooth'
        })
      })

      if (to.hash) {
        let hash = to.hash

        // CSS.escape() is not supported with IE and Edge
        if (
          typeof window.CSS !== 'undefined' &&
          typeof window.CSS.escape !== 'undefined'
        ) {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }

        if (document.querySelector(hash)) {
          resolve(false)
          window.location.href = hash
        }
      }

      resolve(savedPosition || { x: 0, y: 0 })
    })
  })
}
