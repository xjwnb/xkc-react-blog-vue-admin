/*
 * @Author: your name
 * @Date: 2021-02-10 02:29:11
 * @LastEditTime: 2021-02-10 02:30:14
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