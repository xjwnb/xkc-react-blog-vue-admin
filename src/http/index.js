/*
 * @Author: your name
 * @Date: 2021-02-06 14:08:44
 * @LastEditTime: 2021-02-07 13:43:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\http\index.js
 */
import axios from "axios";
import { Message } from 'element-ui';

const service = axios.create({
  baseURL: "/reactBlogApi",
  timeout: 5000000,
  withCredentials: true,
});

// axios
service.interceptors.request.use(
  config => {
    console.log("interceptors.request", config);
    return config;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  config => {
    console.log("interceptors.response", config);
    const data = config.data;
    const code = data.code;
    if (code && code >= 400) {
      const msg = data.data.msg;
      Message({
        type: "warning",
        message: `${code} —— ${msg}`
      })
    }
    return config.data;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default service;
