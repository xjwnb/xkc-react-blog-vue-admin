<!--
 * @Author: your name
 * @Date: 2021-02-07 15:48:50
 * @LastEditTime: 2021-02-12 23:38:47
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
      <!-- <el-container> -->
      <!-- aside -->
      <el-aside width="200px">
        <aside-nav :navbarList="navbarList" />
      </el-aside>
      <el-main>
        <!-- Main -->
        <box>
          <router-view />
        </box>
      </el-main>
      <!-- </el-container> -->
    </el-container>
  </div>
</template>

<script>
// 组件
import { Logo, Logout, AsideNav } from "./components";
import { Box } from "@/components";
// 导航路由信息
import { navbarList } from "@/const/Nav/asideNav";
export default {
  name: "Layout",
  components: {
    Logo,
    Logout,
    AsideNav,
    Box,
  },
  data() {
    return {
      navbarList: navbarList, // 导航路由信息
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
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  /deep/ .is-vertical {
    overflow-y: hidden;
  }
  /deep/ .el-main {
    // position: relative;
    top: 60px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 200px;
    overflow-y: scroll;
  }
  /* main {
    overflow: auto;
    scroll-behavior: smooth;
  } */
}
</style>