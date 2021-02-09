/*
 * @Author: your name
 * @Date: 2021-02-09 11:32:33
 * @LastEditTime: 2021-02-09 13:59:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\api\tag.js
 */
import request from "@/http";

// 提交标签信息
export function postTagsInfo(tagsInfo) {
  return request({
    url: "/admin/postTagsInfo",
    method: "post",
    data: {
      tagsInfo
    }
  })
}

// 获得标签信息
export function getTagsInfo() {
  return request({
    url: "/admin/getTagsInfo",
  })
}

// 删除标签信息
export function deleteTagsInfo(name) {
  return request({
    url: "/admin/deleteTagsInfo",
    method: "post",
    data: {
      name
    }
  })
}