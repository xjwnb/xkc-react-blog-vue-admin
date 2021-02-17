/*
 * @Author: your name
 * @Date: 2021-02-17 21:52:26
 * @LastEditTime: 2021-02-17 21:54:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\api\about.js
 */
import request from "@/http";

// 获取关于信息
export function getAboutInfo() {
  return request({
    url: "/admin/getAboutInfo"
  });
}

// 提交关于信息 
export function postAboutInfo(aboutInfo) {
  return request({
    url: "/admin/postAboutInfo",
    method: "post",
    data: {
      aboutInfo
    }
  });
}
