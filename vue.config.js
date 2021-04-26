/*
 * @Author: your name
 * @Date: 2021-02-06 13:56:15
 * @LastEditTime: 2021-02-19 23:33:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\vue.config.js
 */
module.exports = {
  publicPath: "/blogAdmin",
  lintOnSave: false,
  configureWebpack: {
    devServer: {
      proxy: {
        "/reactBlogApi": {
          target: "http://127.0.0.1:1111",
          changeOrigin: true,
          pathRewrite: {
            "^/reactBlogApi": ""
          }
        },
      }
    }
  }
}