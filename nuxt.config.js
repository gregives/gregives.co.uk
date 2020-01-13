import fs from 'fs'
import path from 'path'

// Modes for frontmatter-markdown-loader
import Mode from 'frontmatter-markdown-loader/mode'

// Load routes for dynamic content
import routes from './contents/routes'

// Load primary color from sass
const [, primaryColor] = fs
  .readFileSync(path.join(__dirname, 'assets', 'scss', '_variables.scss'), {
    encoding: 'utf8'
  })
  .match(/\$color__primary:\s*([^;]+);/)

export default {
  mode: 'universal',
  // Content of page head
  head: {
    title: 'Software Engineer',
    titleTemplate: '%s | Greg Ives',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Personal site and portfolio of software engineer Greg Ives. Currently in his final year studying Computer Science at the University of Sheffield, Greg is looking for an opportunity in software engineering from June 2020.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://www.google-analytics.com',
        crossorigin: true
      },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' }
    ]
  },
  // Loading bar
  loading: {
    color: primaryColor,
    duration: 3000
  },
  // Global CSS
  css: ['~/assets/scss/default.scss'],
  // Plugins to load before mounting the app
  plugins: [
    '~/plugins/lazysizes.client.js',
    '~/plugins/tabbing.client.js',
    '~/plugins/components.js'
  ],
  // Nuxt.js build modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/google-analytics'],
  // Nuxt.js modules
  modules: [
    'vue-scrollto/nuxt',
    '@bazzite/nuxt-optimized-images',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/sitemap'
  ],
  // Instead of importing into every component
  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_mixins.scss',
      '~/assets/scss/_typography.scss'
    ]
  },
  // Google Analytics configuration
  googleAnalytics: {
    id: 'UA-115006226-1'
  },
  // Optimized images configuration
  optimizedImages: {
    responsiveImagesName({ isDev }) {
      return isDev
        ? '[path][name]--[width][hash:optimized].[ext]'
        : 'img/[hash:7].[ext]'
    },
    // Sizes of responsive image to generate
    responsive: {
      sizes: [320, 640, 1280, 1920],
      placeholder: true
    }
  },
  // Nuxt.js PWA configuration
  pwa: {
    meta: {
      name: 'Greg Ives',
      ogHost: 'https://gregives.co.uk',
      ogImage: {
        path: '/og.png',
        width: 1910,
        height: 1000,
        type: 'image/png'
      },
      twitterCard: 'summary_large_image'
    },
    manifest: {
      name: 'Greg Ives',
      short_name: 'Greg Ives'
    },
    // Use googleapis.com CDN for Workbox
    workbox: {
      workboxURL:
        'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
    }
  },
  // Generate sitemap
  sitemap: {
    hostname: 'https://gregives.co.uk',
    gzip: true
  },
  // Generate dynamic routes and 404 fallback
  generate: {
    fallback: true,
    routes
  },
  // Build configuration
  build: {
    html: {
      // Configuration for minifying HTML
      minify: {
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    },
    extend(config, { isClient, loaders: { vue } }) {
      // Make sure Vue knows about lazy loaded images
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }

      // Resolve path to material design icons
      config.resolve.alias.icons = path.resolve(
        __dirname,
        'node_modules/vue-material-design-icons'
      )

      // Configuration for Markdown formatter
      const hljs = require('highlight.js')
      const markdown = require('markdown-it')({
        html: true,
        xhtmlOut: false,
        breaks: false,
        typographer: true,
        highlight(str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return `<pre class="hljs"><code>${
                hljs.highlight(lang, str, true).value
              }</code></pre>`
            } catch (e) {}
          }

          return `<pre class="hljs"><code>${markdown.utils.escapeHtml(
            str
          )}</code></pre>`
        }
      })
        .use(require('markdown-it-anchor'), {
          permalink: true,
          permalinkSymbol: '#',
          permalinkSpace: false
        })
        .use(require('markdown-it-task-lists'), {
          label: true
        })
        .use(require('markdown-it-abbr'))
        .use(require('markdown-it-sup'))
        .use(require('markdown-it-sub'))
        .use(require('markdown-it-mark'))
        .use(require('markdown-it-ins'))

      // Markdown loader
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [Mode.VUE_RENDER_FUNCTIONS],
          vue: {
            root: 'markdown'
          },
          markdown(body) {
            return markdown.render(body)
          }
        }
      })
    }
  }
}
