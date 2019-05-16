const path = require('path')

const env = process.env.NODE_ENV

module.exports = {
  entry: './_assets/javascript/index.js',
  output: {
    path: path.resolve(__dirname, '_site/javascript'),
    filename: 'main.js',
  },
  mode: env || 'development',
}
