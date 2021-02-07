<!--
 * @Author: your name
 * @Date: 2021-02-07 17:30:45
 * @LastEditTime: 2021-02-07 17:47:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\layout\components\MenuItem.vue
-->
<template>
  <div>
    <template v-for="(menuItem, index) in navbarList" v-key="menuItem.id">
      <!-- 如果导航中有children属性 -->
      <template v-if="menuItem.children">
        <el-submenu :index="menuItem.path">
          <template slot="title">
            <i :class="menuItem.icon"></i>
            <span>{{ menuItem.title }}</span>
          </template>
          <!-- 递归本组件 -->
          <NavItem :navbarList="menuItem.children"></NavItem>
        </el-submenu>
      </template>
      <!-- 如果导航中没有children属性 -->
      <template v-else="!menuItem.children">
        <el-menu-item :index="menuItem.path">
          <i :class="menuItem.icon"></i>
          <span>{{ menuItem.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "NavItem",
  props: {
    navbarList: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
</style>