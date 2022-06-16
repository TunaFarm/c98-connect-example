/* webpack.config.js */

module.exports = {
  webpack: {
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        path: require.resolve('path-browserify')
      }
    }
  }
}
