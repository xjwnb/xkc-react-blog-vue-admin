/*
 * @Author: your name
 * @Date: 2021-02-10 02:29:11
 * @LastEditTime: 2021-02-11 23:13:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\api\blog.js
 */
import request from "@/http";

// 提交博客信息
export function postBlogInfo(blogInfo) {
  return request({
    url: "/admin/postBlogInfo",
    method: "post",
    data: {
      blogInfo
    }
  })
}

// 获取博客信息
export function getBlogInfo(offset = 0) {
  return request({
    url: "/admin/getBlogInfo",
    params: {
      offset
    }
  })
}

// 更新博客内容
export function updateBlogInfo(blogInfo) {
  return request({
    url: "/admin/updateBlogInfo",
    method: "post",
    data: {
      blogInfo
    }
  })
}