<!--
 * @Author: your name
 * @Date: 2021-02-10 15:11:01
 * @LastEditTime: 2021-02-10 17:15:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\components\Markdown\index.vue
-->
<template>
  <mavon-editor v-model="value"/>
</template>

<script>
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "Markdown",
  components: {
    mavonEditor,
  },
  data() {
    return {
      value: ""
    };
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
</style>