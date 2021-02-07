/*
 * @Author: your name
 * @Date: 2021-02-06 22:02:07
 * @LastEditTime: 2021-02-06 22:05:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\utils\cookie.js
 */

import Cookies from "js-cookie";

const TOKEN_KEY = "Admin_Token";

// 获取 Token
export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

// 修改 Token
export function setToken(newToken) {
  return Cookies.set(TOKEN_KEY, newToken);
}

// 删除 Token
export function removeToken() {
  return Cookies.remove(TOKEN_KEY);
}
