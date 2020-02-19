const { interpolateName, parseQuery } = require('loader-utils')
const sharp = require('sharp')

// Sizes of srcset
const SIZES = [320, 640, 1280, 1920]

module.exports = function(source) {
  const callback = this.async()
  const params = parseQuery(this.resourceQuery)

  try {
    if (params.webp) {
      // Convert to webp
      sharp(source)
        .toFormat('webp')
        .toBuffer()
        .then((webp) => {
          callback(null, webp)
        })
    } else if (!params.lazy) {
      // Don't do anything
      callback(null, source)
    } else {
      // Generate lazy image object
      const output = {
        format: false,
        lqip: false,
        srcSet: [],
        webpSrcSet: []
      }

      sharp(source)
        .metadata()
        .then((metadata) => {
          // Store the format, for mime type in srcset
          output.format = metadata.format

          generateLQIP(this, source, output, () => {
            generateSrcSet(this, source, output, (srcSet) => {
              generateWebpSrcSet(this, srcSet, output, () => {
                callback(
                  null,
                  `module.exports = {
                    format: "${output.format}",
                    lqip: "${output.lqip}",
                    srcSet: ${output.srcSet.join(' + ", " + ')},
                    webpSrcSet: ${output.webpSrcSet.join(' + ", " + ')}
                  }`
                )
              })
            })
          })
        })
    }
  } catch (error) {
    callback(null, source)
  }
}

function emitFile(context, content, webp) {
  const name = webp ? '[contenthash:8].webp' : '[contenthash:8].[ext]'
  const url = interpolateName(context, name, { content })
  context.emitFile(url, content)
  const path = `__webpack_public_path__ + ${JSON.stringify(url)}`
  return path
}

// Resize to 40px wide and blur
function generateLQIP(context, source, output, callback) {
  sharp(source)
    .resize(40)
    .blur()
    .toBuffer()
    .then((lqip) => {
      output.lqip = `data:image/${output.format};base64,${lqip.toString(
        'base64'
      )}`
      callback()
    })
}

// Resize source to all sizes in srcset
function generateSrcSet(context, source, output, callback) {
  Promise.all(
    SIZES.map((size) => {
      return sharp(source)
        .resize(size, null, {
          withoutEnlargement: true
        })
        .toBuffer()
    })
  ).then((srcSet) => {
    srcSet.map((src, index) => {
      const path = emitFile(context, src)
      output.srcSet.push(`${path} + " ${SIZES[index]}w"`)
    })
    callback(srcSet)
  })
}

// Convert resized srcset to webp
function generateWebpSrcSet(context, srcSet, output, callback) {
  Promise.all(
    srcSet.map((src) => {
      return sharp(src)
        .toFormat('webp')
        .toBuffer()
    })
  ).then((webpSrcSet) => {
    webpSrcSet.map((webpSrc, index) => {
      const path = emitFile(context, webpSrc, true)
      output.webpSrcSet.push(`${path} + " ${SIZES[index]}w"`)
    })
    callback()
  })
}

module.exports.raw = true
