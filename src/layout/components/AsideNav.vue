<!--
 * @Author: your name
 * @Date: 2021-02-07 17:22:34
 * @LastEditTime: 2021-02-07 18:36:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\layout\components\aside.vue
-->
<template>
  <div>
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
<style scoped>
</style>