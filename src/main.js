/*
 * @Author: your name
 * @Date: 2021-02-06 12:51:52
 * @LastEditTime: 2021-02-07 15:46:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// token util
import { getToken } from "@/utils/token"

// plugin
// element-ui
import element from "@/plugin/element";
Vue.use(element);

// 原型
Vue.prototype.$store = store;
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;


// 全局路由
router.beforeEach((to, from , next) => {
  const toPath = to.path;
  let token = getToken();
  if (toPath !== "/login") {
    if (!token) return next("/login");
    return next();
  } else {
    if (!token) return next();
    return next("/");
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
