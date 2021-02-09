/*
 * @Author: your name
 * @Date: 2021-02-06 15:30:59
 * @LastEditTime: 2021-02-09 12:40:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\plugin\element\index.js
 */
import {
  Button,
  Input,
  Form,
  FormItem,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Upload,
  ColorPicker,
  Tag,


  // plugin
  Message,
} from "element-ui";

const element = {
  install: Vue => {
    Vue.use(Button);
    Vue.use(Input);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Container);
    Vue.use(Header);
    Vue.use(Aside);
    Vue.use(Main);
    Vue.use(Menu);
    Vue.use(MenuItem);
    Vue.use(MenuItemGroup);
    Vue.use(Submenu);
    Vue.use(Upload);
    Vue.use(ColorPicker);
    Vue.use(Tag);

    // plugin
    Vue.prototype.$message = Message;
  }
};

export default element;