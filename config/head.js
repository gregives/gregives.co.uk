const head = function () {
  // Disable install prompt for PWA
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
  })

  const redirect = localStorage.getItem('redirect')
  if (redirect !== null) {
    localStorage.removeItem('redirect')

    // Keep the same hash during redirect
    const url = new URL(window.location.hash, redirect)
    window.location.replace(url)
  }

  // Set theme and theme-color as soon as possible
  const theme = localStorage.getItem('theme') || 'dark'
  document.documentElement.dataset.theme = theme

  const color = getComputedStyle(document.documentElement).getPropertyValue(
    theme === 'light' ? '--color__primary' : '--color__body--overlay'
  )
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', color.trim())

  // Remove data-n-head
  delete document.documentElement.dataset.nHead
}

export default `(${head.toString()})()`
