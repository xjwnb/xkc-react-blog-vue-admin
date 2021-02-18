/*
 * @Author: your name
 * @Date: 2021-02-18 17:12:13
 * @LastEditTime: 2021-02-18 21:06:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\api\links.js
 */
import request from "@/http";

// 获取友链信息
export function getLinksInfo() {
  return request({
    url: "/admin/getLinksInfo",
  })
}

// 更新友链信息
export function updateLinksInfo(linksInfo) {
  return request({
    url: "/admin/updateLinksInfo",
    method: "post",
    data: {
      linksInfo
    }
  })
}

// 删除友链信息
export function deleteLinksInfo(id) {
  return request({
    url: "/admin/deleteLinksInfo",
    method: "post",
    data: {
      id
    }
  })
}