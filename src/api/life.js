/*
 * @Author: your name
 * @Date: 2021-04-27 09:57:14
 * @LastEditTime: 2021-04-27 16:03:01
 * @LastEditors: Please set LastEditors
 * @Description: 生活区 api 请求调用汇总
 * @FilePath: \xkc-react-blog-vue-admin\src\api\life.js
 */

import request from "@/http";

/**
 * 获取生活区信息（分页）limit 10
 */
export function getLifeInfo(offset) {
  return request({
    url: `/admin/getLifeInfo`,
    params: {
      offset
    }
  });
}

/**
 * 更新修改生活区信息
 */
export function updateLifeInfo(data) {
  return request({
    url: "/admin/updateLifeInfo",
    method: "POST",
    data: {
      lifeInfo: data
    }
  });
}

/**
 * 插入新增生活区信息
 */
export function postLifeInfo(data) {
  return request({
    url: "/admin/postLifeInfo",
    method: "POST",
    data: {
      lifeInfo: data
    }
  });
}

/**
 * 删除生活区信息
 */
export function deleteLifeInfo(id) {
  return request({
    url: "/admin/deleteLifeInfo",
    method: "POST",
    data: {
      id
    }
  });
}
