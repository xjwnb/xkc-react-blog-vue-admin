/*
 * @Author: your name
 * @Date: 2021-02-06 12:51:52
 * @LastEditTime: 2021-02-19 22:40:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// token util
import { getToken } from "@/utils/token";

// plugin
// element-ui
import element from "@/plugin/element";
Vue.use(element);

// mavonEditor
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
Vue.use(mavonEditor);

// markdown 高亮

// moment
import moment from "moment";
Vue.prototype.$moment = moment;

// 原型
Vue.prototype.$store = store;
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

// 全局路由
router.beforeEach((to, from, next) => {
  document.title = to.meta.title + " | vue-blog-admin";
  const toPath = to.path;
  let token = getToken();
  if (toPath !== "/login") {
    if (!token) return next("/login");
    return next();
  } else {
    if (!token) return next();
    return next("/");
  }
});



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
