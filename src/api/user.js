/*
 * @Author: your name
 * @Date: 2021-02-08 10:21:14
 * @LastEditTime: 2021-02-08 19:23:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\api\user.js
 */
import request from "@/http";

// 获得用户信息
export function userinfo() {
  return request({
    url: "/admin/userinfo",
  })
}

// 提交用户信息
export function postUserInfo(userinfo) {
  return request({
    url: "/admin/postUserInfo",
    method: "post",
    data: {
      userinfo
    }
  })
}