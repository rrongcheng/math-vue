module.exports = {
  // Options for the Vue CLI project
  devServer: {
    // Configuration for the development server
    port: 8080,
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/math-vue/'
    : '/'
  // Other configurations can go here
};