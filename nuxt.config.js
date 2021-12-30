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
import { openGraphTags } from './config/opengraph'

// Load primary color from sass
const [, primaryColor] = fs
  .readFileSync(path.join(__dirname, 'assets', 'scss', '_variables.scss'), {
    encoding: 'utf8'
  })
  .match(/\$color__primary:\s*([^;]+);/)

export default {
  target: 'static',
  // Content of page head
  head: {
    title: 'Freelance Developer',
    titleTemplate: '%s • Greg Ives',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Personal site and portfolio of freelance developer Greg Ives.'
      },
      { name: 'msapplication-TileColor', content: '#3355ff' },
      { hid: 'theme-color', name: 'theme-color', content: '#3355ff' },
      ...openGraphTags
    ],
    link: [
      { rel: 'preconnect', href: 'https://www.google-analytics.com' },
      { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
      { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#3355ff' }
    ],
    noscript: [
      { innerHTML: '<style>.lazy>picture>img{display:none;}</style>' }
    ],
    __dangerouslyDisableSanitizers: ['noscript']
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
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa'
  ],
  // Nuxt.js modules
  modules: ['@nuxtjs/recaptcha', '@nuxtjs/sitemap'],
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
  recaptcha: {
    hideBadge: false,
    siteKey: process.env.SITE_RECAPTCHA_KEY,
    size: 'invisible',
    version: 2
  },
  // Nuxt.js PWA configuration
  pwa: {
    icon: false,
    meta: false,
    manifest: false
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
    routes: [
      ...routes,
      '/blog/nuxt-netlify-forms-and-recaptcha/',
      '/meta/',
      ...routes.map((route) => `/meta${route}`)
    ]
  },
  // Add trailing slashes to match Netlify
  router: {
    trailingSlash: true
  },
  // Renderer options for preloading
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        // Preload woff2 fonts
        if (type === 'font') return /\.woff2$/.test(file)
        return ['script', 'style'].includes(type)
      }
    }
  },
  // Build configuration
  build: {
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : '[contenthash:7].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[contenthash:7].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : '[contenthash:7].css'),
      img: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    html: {
      minify
    },
    postcss: null,
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
      config.module.rules.forEach((rule) => {
        if (rule.test.test('.png')) {
          rule.use = [
            {
              loader: path.resolve(__dirname, 'loaders', 'sharp'),
              options: {
                quality: 50
              }
            }
          ]
        }
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
