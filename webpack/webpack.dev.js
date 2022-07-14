const webpackCommonConfig = require("./webpack.common.js")("development");

module.exports = {
  devServer: {
    host: "localhost",
    port: 3000,
    open: true, // Open the browser automatically
    hot: true, // Enable hot module replacement
    historyApiFallback: true, // Redirect to the index page if the browser doesn't support history API
    compress: true, // Enable gzip compression
    https: false, // Enable HTTPS/SSL
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  ...webpackCommonConfig,
};
