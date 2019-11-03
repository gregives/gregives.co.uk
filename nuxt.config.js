import fs from 'fs'
import path from 'path'

// Modes for frontmatter-markdown-loader
import Mode from 'frontmatter-markdown-loader/mode'

// Load projects for generate.routes
import projectNames from './contents/projects'

// Load primary color from scss
const primaryColor = fs
  .readFileSync(path.join(__dirname, 'assets', 'scss', '_variables.scss'), {
    encoding: 'utf8'
  })
  .match(/\$color--primary:\s*([^;]+);/)[1]

export default {
  mode: 'universal',
  // Content of page head
  head: {
    title: 'Software Developer',
    titleTemplate: '%s | Greg Ives',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Personal site and portfolio of software developer Greg Ives. Currently in his final year studying Computer Science at the University of Sheffield, Greg is looking for an opportunity in software development from June 2020.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // Progress-bar color and theme color
  loading: {
    color: primaryColor,
    duration: 3000
  },
  // Global CSS
  css: ['~/assets/scss/default.scss'],
  // Plugins to load before mounting the App
  plugins: [
    '~/plugins/tilt.client.js',
    '~/plugins/lazysizes.client.js',
    '~/plugins/tabbing.client.js',
    '~/plugins/components.js'
  ],
  // Nuxt.js dev-modules
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/google-analytics'],
  // Nuxt.js modules
  modules: [
    'vue-scrollto/nuxt',
    '@bazzite/nuxt-optimized-images',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/sitemap'
  ],
  styleResources: {
    scss: ['~/assets/scss/_variables.scss', '~/assets/scss/_mixins.scss']
  },
  googleAnalytics: {
    id: 'UA-115006226-1'
  },
  optimizedImages: {
    responsiveImagesName: ({ isDev }) =>
      isDev
        ? '[path][name]--[width][hash:optimized].[ext]'
        : 'img/[hash:7].[ext]',
    responsive: {
      sizes: [213, 256, 341, 455, 533, 640, 768, 1024, 1366, 1600, 1920]
    }
  },
  sitemap: {
    hostname: 'https://gregives.co.uk',
    gzip: true,
    exclude: ['/resume']
  },
  generate: {
    routes: [].concat(projectNames.map((project) => `/projects/${project}`))
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
      // Lazyloading images
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }

      // Resolve material design icons
      config.resolve.alias.icons = path.resolve(
        __dirname,
        'node_modules/vue-material-design-icons'
      )

      // Markdown formatter
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
          markdown: (body) => {
            return markdown
              .render(body)
              .replace(
                /<h(\d)([^>]*?)>([\s\S]*?)<\/h\1>/g,
                (_substring, header, attrs, inner) => {
                  const newHeader = parseInt(header) + 2
                  return `<h${newHeader}${attrs}>${inner}</h${newHeader}>`
                }
              )
          }
        }
      })
    }
  }
}
