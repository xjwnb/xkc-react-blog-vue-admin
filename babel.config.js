/*
 * @Author: your name
 * @Date: 2021-02-06 12:51:51
 * @LastEditTime: 2021-02-06 15:30:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\babel.config.js
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
};
