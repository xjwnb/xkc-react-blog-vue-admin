<!--
 * @Author: your name
 * @Date: 2021-02-17 21:08:35
 * @LastEditTime: 2021-02-17 22:57:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\views\AboutInfo\index.vue
-->


<template>
  <div class="about-info">
    <mavon-editor
      class="mavonEditor-class"
      :toolbars="toolbars"
      v-model="aboutInfo.content"
      ref="mavonEditor"
      @imgAdd="mavonEditorImgAdd"
      @change="mavonChangeHandle"
    />
    <el-button type="primary" @click="submitAboutInfoHandle">提交</el-button>
  </div>
</template>

<script>
// 常量
import { action } from "@/const/oss/ossData";
// oss
import { client } from "@/utils/oss";
// utils
import { getFileName } from "@/utils/fileName";
import toolbars from "@/const/markdown/mavonEditorToolbars";
import hljs from "highlight.js";
import "highlight.js/styles/arduino-light.css";
hljs.highlightAll();
// 请求
import { getAboutInfo, postAboutInfo } from "@/api/about";

export default {
  name: "AboutInfo",
  data() {
    return {
      toolbars: toolbars, // 编辑器功能栏
      aboutInfo: {
        content: "", // 编辑器内容

        htmlContent: "", // 编辑器 html 内容
      },
    };
  },
  created() {},
  async mounted() {
    let aboutInfo;
    try {
      // 获取关于信息
      aboutInfo = await this.getAboutInfoData();
      this.aboutInfo.content = aboutInfo.content;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    // 上传图片
    async mavonEditorImgAdd(pos, file) {
      console.log(pos, file);
      let name = file.name;
      const fileName = getFileName("blog_pricture", name);
      try {
        const putFileResult = await client.put(fileName, file);
        this.$refs.mavonEditor.$img2Url(pos, putFileResult.url);
      } catch (err) {
        console.log(err);
      }
    },
    // mavon Change 事件
    mavonChangeHandle(val, render) {
      this.aboutInfo.htmlContent = render;
    },

    // 获取 about 关于信息
    getAboutInfoData() {
      return new Promise((resolve, reject) => {
        getAboutInfo()
          .then((res) => {
            if (res.code === 200) {
              resolve(res.data.aboutInfo);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    // 提交 about 关于信息
    submitAboutInfoHandle() {
      postAboutInfo(this.aboutInfo)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


<style lang="less" scoped>
.about-info {
  .mavonEditor-class {
    height: 700px;
  }
}
</style>