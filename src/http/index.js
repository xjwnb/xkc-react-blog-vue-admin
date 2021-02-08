/*
 * @Author: your name
 * @Date: 2021-02-06 14:08:44
 * @LastEditTime: 2021-02-08 21:06:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\http\index.js
 */
import axios from "axios";
import { Message } from "element-ui";
// token util
import { getToken, setToken, removeToken } from "@/utils/token";
import store from '@/store';
import { REMOVE_TOKEN } from "@/const/store/mutations/user";

const service = axios.create({
  baseURL: "/reactBlogApi",
  timeout: 5000000,
  withCredentials: true
});

// axios
service.interceptors.request.use(
  config => {
    console.log("interceptors.request", config);

    if (config.url === "/admin/login") return config;
    const token = getToken();
    // console.log("request token: ", token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  err => {
    console.log("interceptors.request err", err);
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  config => {
    console.log("interceptors.response", config);
    const data = config.data;
    const code = data.code;
    /* //获取更新的token
    const { authorization } = config.headers;
    //如果token存在则存在localStorage
    authorization && setToken(authorization); */

    if (code && code >= 400 && code < 600) {
      const msg = data.data.msg;
      Message({
        type: "warning",
        message: `${code} —— ${msg}`
      });
    } 
    // token 失效
    if (code && (code === 10011 || code === 10010)){
      // 删除 token
      removeToken();
      store.commit(`user/${REMOVE_TOKEN}`);
      location.reload();
    }
    return config.data;
  },
  err => {
    console.log("interceptors.response err", err);
    return Promise.reject(err);
  }
);

export default service;
