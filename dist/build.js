const fs = require('fs')
const gzip = require('zlib').createGzip()
const babel = require('@babel/core')
const browserify = require('browserify')
const { P } = require('vachan')

const transform = P.vachanify(babel.transformFile)

// Node dist
transform(`./src/index.js`, { presets: ['@babel/preset-env', 'minify'], comments: false })
  .then(result => {
    fs.writeFileSync(`${__dirname}/node/mure.min.js`, result.code)
  })

// Browser dist
browserify([`./src/index.js`], { standalone: 'mure' })
  .bundle()
  .pipe(fs.createWriteStream(`${__dirname}/browser/mure.dist.js`))
  .on('finish', _ => {
    transform(`${__dirname}/browser/mure.dist.js`, { presets: ['@babel/preset-env', 'minify'], comments: false })
      .then(result => {
        fs.writeFileSync(`${__dirname}/browser/mure.dist.min.js`, result.code)
        fs.createReadStream(`${__dirname}/browser/mure.dist.min.js`)
          .pipe(gzip)
          .pipe(fs.createWriteStream(`${__dirname}/browser/mure.dist.min.js.gz`))
      })
  })
