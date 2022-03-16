import lazySizes from 'lazysizes'

lazySizes.cfg.lazyClass = 'lazy__image--load'
lazySizes.cfg.loadingClass = 'lazy__image--loading'
lazySizes.cfg.loadedClass = 'lazy__image--loaded'
lazySizes.cfg.preloadClass = 'lazy__image--preload'

document.addEventListener('lazyloaded', (event) => {
  event.target.parentNode.parentNode.classList.add('lazy--loaded')
})

export default lazySizes
