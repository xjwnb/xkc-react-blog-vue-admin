/*
 * @Author: your name
 * @Date: 2021-02-06 12:51:52
 * @LastEditTime: 2021-02-19 22:37:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Layout from "@/layout/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    /* path: '/',
    name: 'Home',
    component: Home */
    path: "/",
    redirect: "/user",
    component: Layout,
    children: [
      {
        path: "/user",
        name: "User",
        meta: {
          title: "用户管理"
        },
        component: () =>
          import(/* webpackChunkName: "User" */ "@/views/User/index.vue")
      },
      {
        path: "/blogInfo",
        name: "BlogInfo",
        meta: {
          title: "发布文章"
        },
        component: () =>
          import(
            /* webpackChunkName: "BlogInfo" */ "@/views/BlogInfo/index.vue"
          )
      },
      {
        path: "/tags",
        name: "Tags",
        meta: {
          title: "标签"
        },
        component: () =>
          import(/* webpackChunkName: "Tags"*/ "@/views/Tags/index.vue")
      },
      {
        path: "/blogAdmin",
        name: "BlogAdmin",
        meta: {
          title: "文章管理"
        },
        component: () =>
          import(/* webpackChunkName: "Tags"*/ "@/views/BlogAdmin/index.vue")
      },
      {
        path: "/aboutInfo",
        name: "AboutInfo",
        meta: {
          title: "关于"
        },
        component: () =>
          import(
            /* webpackChunkName: "AboutInfo" */ "@/views/AboutInfo/index.vue"
          )
      },
      {
        path: "/linksAdmin",
        name: "LinksAdmin",
        meta: {
          title: "友链管理"
        },
        component: () =>
          import(
            /* webpackChunkName: "LinksAdmin" */ "@/views/LinksAdmin/index.vue"
          )
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "@/views/login/index.vue")
  }
];

// 解决重复点击同一路由报错问题。
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
