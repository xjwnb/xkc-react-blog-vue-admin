<!--
 * @Author: your name
 * @Date: 2021-04-28 17:37:45
 * @LastEditTime: 2021-04-28 17:52:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\views\Life\components\IsTopStatus.vue
-->
<template>
  <div class="istop-status">
    <div
      :class="['istop-status-icon', status === 0 ? 'istop-no' : 'istop-yes']"
    ></div>
    <div class="istop-status-msg">{{ status === 0 ? "未置顶" : "置顶" }}</div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      // 0/1 0: false（未置顶）, 1:true（置顶）
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
};
</script>


<style lang="less" scoped>
.istop-status {
  display: flex;
  align-items: center;

  .istop-status-icon {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: none;
    margin-right: 5px;
  }

  .istop-no {
    background-color: #c9c9c9;
  }

  .istop-yes {
    background-color: #409eff;
  }

  .istop-status-msg {
    font-size: 14px;
    color: #8e8ca2;
  }
}
</style>