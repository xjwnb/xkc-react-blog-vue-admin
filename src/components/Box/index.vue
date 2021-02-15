<!--
 * @Author: your name
 * @Date: 2021-02-12 23:31:15
 * @LastEditTime: 2021-02-12 23:34:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog\src\components\Box\index.vue
-->

<template>
  <div class="box">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Box",
}
</script>

<style>
.box {
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>