/*
 * @Author: your name
 * @Date: 2021-02-06 15:30:59
 * @LastEditTime: 2021-02-06 15:33:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\plugin\element\index.js
 */
import {
  Button,
  Input
} from "element-ui";

const element = {
  install: Vue => {
    Vue.use(Button);
    Vue.use(Input);
  }
};

export default element;