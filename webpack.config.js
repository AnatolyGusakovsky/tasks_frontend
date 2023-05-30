module.exports = {
  // ... existing webpack configuration ...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend server URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // Remove the '/api' prefix from the request path
        },
      },
    },
  },
};