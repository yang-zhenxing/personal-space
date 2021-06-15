module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/api": {
        target: 'https://maoyan.com/ajax/suggest',
        // pathRewrite: {
        //   '^/api': ''
        // },
        changeOrigin: true
      },
    },
  },
}