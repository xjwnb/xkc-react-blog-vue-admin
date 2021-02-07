/*
 * @Author: your name
 * @Date: 2021-02-06 21:53:30
 * @LastEditTime: 2021-02-07 17:05:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\store\modules\user.js
 */
// 常量
import { TOKEN } from "@/const/store/state/user";
import { SET_TOKEN, REMOVE_TOKEN } from "@/const/store/mutations/user";
import { LOGIN, LOGOUT } from "@/const/store/actions/user";
// 请求
import { login } from "@/api/login";
// token util
import { setToken, removeToken } from "@/utils/token";


const state = {
  [TOKEN]: "", // token 
};

const mutations = {
  // 设置 token
  [SET_TOKEN](state, token) {
    state[TOKEN] = token;
  },
  [REMOVE_TOKEN](state) {
    state[TOKEN] = "";
  }
};


const actions = {
  // 登录
  [LOGIN]({commit}, userinfo) {
    return new Promise((resolve, reject) => {
      login(userinfo).then(res => {
        const { code, data } = res;
        const token = data.token;
        if (code !== 200) return reject(data.msg);
        // 存储 token
        commit(SET_TOKEN);
        setToken(token);
        resolve(data.msg);
      }).catch(err => {
        reject(err);
      })
    })
  },
  // 退出登录
  [LOGOUT]({commit}) {
    removeToken();
    commit(REMOVE_TOKEN);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}