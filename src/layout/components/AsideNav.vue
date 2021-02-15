<!--
 * @Author: your name
 * @Date: 2021-02-07 17:22:34
 * @LastEditTime: 2021-02-12 22:51:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\layout\components\aside.vue
-->
<template>
  <div class="aside-nav">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @select="selectHandle"
      :collapse="isCollapse"
    >
      <NavItem :navbarList="navbarList"></NavItem>
    </el-menu>
  </div>
</template>

<script>
import NavItem from "./NavItem";

export default {
  name: "AsideNav",
  props: {
    navbarList: Array,
  },
  components: {
    NavItem,
  },
  data() {
    return {
      isCollapse: false, // 导航是否展开
    };
  },
  created() {},
  mounted() {},
  methods: {
    selectHandle(path) {
      this.$router.push({ path: path });
    },
  },
};
</script>


<style lang="less" scoped>
/deep/ .el-menu {
  position: absolute;
  width: 200px;
  bottom: 0;
  left: 0;
  top: 60px;
  background-color: #00152A;
}
/deep/ .el-menu-item {
  color: #ffffff;
  &:hover {
    background-color: #35bee7;
  }
}
</style>