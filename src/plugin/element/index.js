/*
 * @Author: your name
 * @Date: 2021-02-06 15:30:59
 * @LastEditTime: 2021-02-06 16:27:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\plugin\element\index.js
 */
import {
  Button,
  Input,
  Form,
  FormItem,
} from "element-ui";

const element = {
  install: Vue => {
    Vue.use(Button);
    Vue.use(Input);
    Vue.use(Form);
    Vue.use(FormItem);
  }
};

export default element;