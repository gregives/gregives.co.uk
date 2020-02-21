const {
  getOptions,
  interpolateName,
  parseQuery,
  stringifyRequest
} = require('loader-utils')

const sharp = require('sharp')

const defaultOptions = {
  quality: 80,
  sizes: [320, 640, 1280, 1920]
}

module.exports = function(source) {
  const callback = this.async()
  const params = this.resourceQuery ? parseQuery(this.resourceQuery) : {}
  const options = Object.assign({}, defaultOptions, getOptions(this))

  let images = [sharp(source)]

  images[0].metadata().then((metadata) => {
    const format = params.format || metadata.format

    // Generate srcset
    if (params.srcset) {
      images = options.sizes.map((size) => {
        return images[0].resize(parseInt(size), null, {
          withoutEnlargement: true
        })
      })
    } else if (params.size && !Number.isNaN(parseInt(params.size))) {
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

    // Convert to given format
    if (params.format) {
      images = images.map((image) => {
        return image.toFormat(params.format)[params.format]({
          quality: params.quality || options.quality
        })
      })
    }

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
        const paths = buffers.map((buffer) => {
          const url = interpolateName(this, name, { content: buffer })
          this.emitFile(url, buffer)
          const urlString = stringifyRequest(this, url)
          return `__webpack_public_path__ + ${urlString}`
        })

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
