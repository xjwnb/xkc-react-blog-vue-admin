/*
 * @Author: your name
 * @Date: 2021-02-06 15:30:59
 * @LastEditTime: 2021-02-18 20:16:42
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
  DatePicker,
  Select,
  Option,
  Table,
  TableColumn,
  Image,
  Drawer,
  Pagination,
  TabPane,
  Tabs,
  Dialog,
  Switch,

  // plugin
  Message,
  MessageBox,
  Loading
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
    Vue.use(DatePicker);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Image);
    Vue.use(Drawer);
    Vue.use(Pagination);
    Vue.use(TabPane);
    Vue.use(Tabs);
    Vue.use(Dialog);
    Vue.use(Switch);

    Vue.use(Loading.directive);

    Vue.prototype.$loading = Loading.service;

    // plugin
    Vue.prototype.$message = Message;
    Vue.prototype.$confirm = MessageBox.confirm;
  }
};

export default element;
