import fs from 'fs'
import path from 'path'

// Modes for frontmatter-markdown-loader
import Mode from 'frontmatter-markdown-loader/mode'

// Load routes for dynamic content
import routes from './contents/routes'

// Import configuration
import markdown from './config/markdown'
import minify from './config/minify'

// Open Graph
import { generateImages, openGraphTags } from './config/opengraph'

// Generate tags for Open Graph
generateImages(routes)

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
        content: 'Personal site and portfolio of software engineer Greg Ives.'
      },
      ...openGraphTags
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://www.google-analytics.com' },
      { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
      { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' }
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
  // Nuxt.js PWA configuration
  pwa: {
    manifest: {
      name: 'Greg Ives',
      short_name: 'Greg Ives',
      start_url: '/'
    }
  },
  // Generate sitemap
  sitemap: {
    gzip: true,
    hostname: 'https://gregives.co.uk',
    routes
  },
  // Generate dynamic routes and 404 fallback
  generate: {
    fallback: true,
    routes: [...routes, ...routes.map((route) => `/meta${route}`)]
  },
  // Build configuration
  build: {
    html: {
      minify
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

      // Replace default image loaders with custom loader
      config.module.rules = config.module.rules.map((rule) => {
        if (String(rule.test) === String(/\.(png|jpe?g|gif|svg|webp)$/i)) {
          rule.use = [
            {
              loader: path.resolve(__dirname, 'loaders', 'sharp'),
              options: {
                quality: 50
              }
            }
          ]
        }
        return rule
      })

      // Markdown loader
      config.module.rules.unshift({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [Mode.BODY, Mode.VUE_RENDER_FUNCTIONS],
          vue: {
            root: 'markdown'
          },
          markdown
        }
      })
    }
  }
}
