/*
 * @Author: your name
 * @Date: 2021-02-06 12:51:52
 * @LastEditTime: 2021-02-07 18:07:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from "@/layout/index.vue";

Vue.use(VueRouter)

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
        component: () => import(/* webpackChunkName: "User" */ "@/views/User/index.vue")
      },
      {
        path: "/blogInfo",
        name: "BlogInfo",
        component: () => import(/* webpackChunkName: "BlogInfo" */ "@/views/BlogInfo/index.vue")
        
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "@/views/login/index.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
