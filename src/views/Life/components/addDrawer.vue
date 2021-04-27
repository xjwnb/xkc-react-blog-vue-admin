<!--
 * @Author: your name
 * @Date: 2021-04-27 14:54:52
 * @LastEditTime: 2021-04-27 14:57:31
 * @LastEditors: Please set LastEditors
 * @Description: 添加的生活区抽屉
 * @FilePath: \xkc-react-blog-vue-admin\src\views\Life\components\addDrawer.vue
-->
<template>
  <el-drawer
    title="我是标题"
    :size="size"
    :visible="isShowAddDrawer"
    :with-header="false"
    @close="handleClose"
  >
    <div class="drawer-container">
      <el-form
        label-width="100px"
        :model="lifeInfo"
        :rules="blogRules"
        ref="blogForm"
      >
        <!-- 标题 -->
        <el-form-item label="标题" prop="title">
          <el-input placeholder="标题" v-model="lifeInfo.title"></el-input>
        </el-form-item>
        <!-- 发布时间 -->
        <el-form-item label="发布时间" prop="time">
          <el-date-picker
            v-model="lifeInfo.time"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
            @change="changeTimeHandle"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 描述信息 -->
        <el-form-item label="描述信息" prop="description_info">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="描述信息"
            v-model="lifeInfo.description_info"
          >
          </el-input>
        </el-form-item>
        <!-- 描述图片 -->
        <el-form-item label="描述图片" prop="description_img">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="pictureSuccessHandle"
            :before-upload="beforePictureUploadHandle"
            :http-request="uploadPictureFileHandle"
          >
            <el-image
              v-if="lifeInfo.description_img"
              :src="lifeInfo.description_img"
              class="avatar"
            ></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 内容 -->
        <!-- <el-form-item label="内容" prop="content">
        <editor
          ref="toastuiEditor"
          height="500px"
          initialEditType="wysiwyg"
          previewStyle="vertical"
          @change="changeEditorHandle"
          language="zh-CN"
        />
      </el-form-item> -->
        <el-form-item label="内容" prop="content">
          <mavon-editor
            class="mavonEditor-class"
            :toolbars="toolbars"
            v-model="lifeInfo.content"
            ref="mavonEditor"
            @imgAdd="mavonEditorImgAdd"
            @change="mavonChangeHandle"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitBlogInfoHandle('blogForm')"
            >提 交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>


<script>
// 请求
import { updateLifeInfo } from "@/api/life";
// 常量
import { action } from "@/const/oss/ossData";
// oss
import { client } from "@/utils/oss";
// 文件名称
import { getFileName } from "@/utils/fileName";
import toolbars from "@/const/markdown/mavonEditorToolbars";
import hljs from "highlight.js";
import "highlight.js/styles/arduino-light.css";
hljs.highlightAll();
export default {
  name: "Drawer",
  props: {
    // 是否展示抽屉
    isShowAddDrawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 抽屉大小
      size: "90vw",
      // 编辑器工具栏
      toolbars: toolbars,
      action: action,
      blogRules: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur",
          },
        ],
        time: [
          {
            required: true,
            message: "发布时间不能为空",
            trigger: "blur",
          },
        ],
        description_info: [
          {
            required: true,
            message: "描述信息不能为空",
            trigger: "blur",
          },
        ],
        description_img: [
          {
            required: true,
            message: "图片不能为空",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "文章不能为空",
            trigger: "blur",
          },
        ],
      },
      // picture;
      picture: "",
      lifeInfo: {},
    };
  },
  watch: {
  },
  created() {},
  methods: {
    // 关闭回调
    handleClose() {
      this.$emit("update:isShowDrawer", false);
    },
    // 修改时间事件
    changeTimeHandle(time) {
      let timeFormat = this.$moment(Date.parse(time)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.lifeInfo.time = timeFormat;
      // console.log(this.$moment('Wed Feb 10 2021 01:20:19 GMT+0800 (中国标准时间)').format('YYYY-MM-DD HH:mm:ss'))
    },
    // 背景图片事件
    // 头像成功
    pictureSuccessHandle(res, file) {
      console.log(res, file);
    },
    // 背景图片发送之前
    beforePictureUploadHandle(file) {
      this.picture = file.name;
    },
    // 自定义背景图片发送
    async uploadPictureFileHandle(file) {
      const fileName = getFileName("descriptionPicture", this.picture);

      try {
        const putFileResult = await client.put(fileName, file.file);
        this.lifeInfo.description_img = putFileResult.url;
      } catch (err) {
        console.log(err);
      }
    },
    // mavon Change 事件
    mavonChangeHandle(val, render) {
      this.lifeInfo.htmlContent = render;
    },
    // 编辑器上传图片
    async mavonEditorImgAdd(pos, file) {
      let name = file.name;
      const fileName = getFileName("blog_pricture", name);
      try {
        const putFileResult = await client.put(fileName, file);
        this.$refs.mavonEditor.$img2Url(pos, putFileResult.url);
      } catch (err) {
        console.log(err);
      }
    },

    // markdown change 事件
    changeEditorHandle() {
      let htmlResult = this.getHtml();
      this.lifeInfo.content = htmlResult;
    },
    // editor html
    getHtml() {
      let html = this.$refs.toastuiEditor.invoke("getHtml");
      return html;
    },

    // 提交事件
    submitBlogInfoHandle(formName) {
      this.$refs[formName].validate((valid) => {
        let lifeInfo = {
          ...this.lifeInfo,
          time: this.$moment(Date.parse(String(this.lifeInfo.time))).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        };
        this.lifeInfo = lifeInfo;
        this.$emit("handleUpdateSubmit", valid, lifeInfo);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.drawer-container {
  padding: 30px;
}
</style>