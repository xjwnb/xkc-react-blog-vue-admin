<!--
 * @Author: your name
 * @Date: 2021-02-07 16:34:32
 * @LastEditTime: 2021-02-07 17:14:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\layout\components\Logout.vue
-->
<template>
  <div class="logout">
    <el-button @click="logoutHandle">退出登录</el-button>
  </div>
</template>

<script>
import { LOGOUT } from "@/const/store/actions/user";

export default {
  name: "Logout",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    // 退出登录
    logoutHandle() {
      this.$store.dispatch(`user/${LOGOUT}`);
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style scoped>
</style>