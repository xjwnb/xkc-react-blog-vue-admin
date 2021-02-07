/*
 * @Author: your name
 * @Date: 2021-02-06 14:47:34
 * @LastEditTime: 2021-02-06 23:19:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\api\login.js
 */
import request from "@/http";

export function login(data) {
  return request({
    url: "/admin/login",
    method: "post",
    data
  })
}