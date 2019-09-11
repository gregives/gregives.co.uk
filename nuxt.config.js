// Load primary color from scss
import fs from 'fs'
import path from 'path'
const scss = fs.readFileSync(
  path.join(__dirname, 'assets', 'sass', '_variables.scss'),
  { encoding: 'utf8' }
)
const primaryColor = scss.match(/\$color-primary:\s?(\w+);/)[1]

export default {
  mode: 'universal',
  // Content of page head
  head: {
    title: 'Software Developer & Designer',
    titleTemplate: 'Greg Ives | %s',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com/',
        crossorigin: true
      }
    ]
  },
  // Progress-bar color and theme color
  loading: { color: primaryColor },
  // Global CSS
  css: ['~/assets/sass/default'],
  // Plugins to load before mounting the App
  plugins: [
    '~/plugins/tilt.client.js',
    '~/plugins/lazysizes.client.js',
    '~/plugins/tabbing.client.js'
  ],
  // Nuxt.js dev-modules
  devModules: ['@nuxtjs/eslint-module'],
  // Nuxt.js modules
  modules: [
    '@nuxtjs/pwa',
    '@bazzite/nuxt-optimized-images',
    'nuxt-webfontloader',
    '@nuxtjs/sitemap'
  ],
  // Options for nuxt-optimized-images
  optimizedImages: {
    optimizeImages: true,
    responsive: {
      sizes: [213, 256, 341, 455, 533, 640, 768, 1024, 1366, 1600, 1920]
    }
  },
  // Options for nuxt-webfontloader
  webfontloader: {
    custom: {
      families: ['Rubik:n4,i4,n5', 'Fira Mono:n5'],
      urls: [
        'https://fonts.googleapis.com/css?family=Rubik:400,400i,500&display=swap',
        'https://fonts.googleapis.com/css?family=Fira+Mono:500&display=swap'
      ]
    }
  },
  // Build configuration
  build: {
    extend(
      config,
      {
        isClient,
        loaders: { vue }
      }
    ) {
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader'
      })
    }
  }
}
