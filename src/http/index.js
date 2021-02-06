/*
 * @Author: your name
 * @Date: 2021-02-06 14:08:44
 * @LastEditTime: 2021-02-06 17:17:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\http\index.js
 */
import axios from "axios";

const service = axios.create({
  baseURL: "/reactBlogApi",
  timeout: 5000000
});

// axios
service.interceptors.request.use(
  config => {
    console.log(config);
    return config;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  config => {
    console.log(config);
    return config;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default service;
