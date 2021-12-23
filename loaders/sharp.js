const {
  getOptions,
  interpolateName,
  parseQuery,
  stringifyRequest
} = require('loader-utils')

const sharp = require('sharp')

module.exports = function (source) {
  const callback = this.async()
  const params = this.resourceQuery ? parseQuery(this.resourceQuery) : {}

  // Override default options
  const options = Object.assign(
    {},
    {
      disable: this.mode === 'development',
      quality: 80,
      sizes: [320, 640, 1280, 1920]
    },
    getOptions(this)
  )

  // Helper function to emit files
  const emitFile = (name, content) => {
    const url = interpolateName(this, name, {
      content,
      context: this.rootContext
    })
    this.emitFile(url, content)
    const path = stringifyRequest(this, url)
    return `__webpack_public_path__ + ${path}`
  }

  // Disable in development
  if (options.disable && !params.meta) {
    const name = `[path][name].[ext]`
    const path = emitFile(name, source)
    callback(null, `module.exports = ${path}`)
    return
  }

  let images = [sharp(source)]

  images[0].metadata().then((metadata) => {
    const format = params.format || metadata.format

    if (params.meta) {
      const meta = {
        format: `image/${format}`,
        width: metadata.width,
        height: metadata.height
      }
      callback(null, `module.exports = ${JSON.stringify(meta)}`)
      return
    }

    // Generate srcset
    if (params.srcset) {
      images = options.sizes.map((size) => {
        return images[0].clone().resize(parseInt(size), null, {
          withoutEnlargement: true
        })
      })
    } else if (params.size) {
      images = images.map((image) =>
        image.resize(parseInt(params.size), null, {
          withoutEnlargement: true
        })
      )
    }

    // Blur image
    if (params.blur) {
      images = images.map((image) => image.blur())
    }

    // Convert to given format and quality
    images = images.map((image) => {
      return image.toFormat(format)[format]({
        quality: parseInt(params.quality) || options.quality
      })
    })

    // Convert to buffers
    Promise.all(images.map((image) => image.toBuffer())).then((buffers) => {
      if (params.inline && !params.srcset) {
        // Output inline base64
        const base64 = buffers[0].toString('base64')
        const result = `data:image/${format};base64,${base64}`

        callback(null, `module.exports = "${result}";`)
      } else {
        // Emit files
        const name = `img/[contenthash:8].${format}`
        const paths = buffers.map((buffer) => emitFile(name, buffer))

        // Output srcset or individual path
        if (params.srcset) {
          const srcset = paths.map((path, index) => {
            return `${path} + " ${options.sizes[index]}w"`
          })

          callback(null, `module.exports = ${srcset.join(' + "," + ')}`)
        } else {
          callback(null, `module.exports = ${paths[0]}`)
        }
      }
    })
  })
}

module.exports.raw = true
