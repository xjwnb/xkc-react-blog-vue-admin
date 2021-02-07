<!--
 * @Author: your name
 * @Date: 2021-02-07 15:48:50
 * @LastEditTime: 2021-02-07 18:13:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\layout\index.vue
-->

<template>
  <div class="layout">
    <el-container>
      <!-- header -->
      <el-header>
        <div class="header-content">
          <logo />
          <logout />
        </div>
      </el-header>
      <el-container>
        <!-- aside -->
        <el-aside width="200px">
          <aside-nav :navbarList="navbarList" />
        </el-aside>
        <el-main>
          <!-- Main -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 组件
import { Logo, Logout, AsideNav } from "./components";
// 导航路由信息
import { navbarList } from "@/const/Nav/asideNav";
export default {
  name: "Layout",
  components: {
    Logo,
    Logout,
    AsideNav,
  },
  data() {
    return {
      navbarList: navbarList // 导航路由信息
    };
  },
  created() {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.layout {
  .el-container {
    .el-header {
      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>