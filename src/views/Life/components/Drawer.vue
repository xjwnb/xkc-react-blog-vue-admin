<!--
 * @Author: your name
 * @Date: 2021-04-27 11:16:03
 * @LastEditTime: 2021-04-28 18:14:39
 * @LastEditors: Please set LastEditors
 * @Description: 抽屉组件
 * @FilePath: \xkc-react-blog-vue-admin\src\views\Life\components\Drawer.vue
-->

<template>
  <el-drawer
    title="我是标题"
    :size="size"
    :visible="isShowDrawer"
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
        <!-- 置顶 -->
        <el-form-item label="是否置顶" prop="isTop">
          <el-select v-model="lifeInfo.isTop" placeholder="请选择置顶状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
          <el-button
            v-if="status === 0"
            type="primary"
            @click="submitBlogInfoHandle('blogForm')"
            >确定修改</el-button
          >
          <el-button
            v-else
            type="primary"
            @click="handlePublishLifeInfo('blogForm')"
            >发表</el-button
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
    isShowDrawer: {
      type: Boolean,
      default: false,
    },
    // 数据
    value: {
      type: Object,
    },
    // 状态 0/1，0：编辑，1：添加
    status: 0,
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
        isTop: [
          {
            required: true,
            message: "请选择置顶状态",
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
      // 选择器
      options: [
        {
          value: 1,
          label: "置顶",
        },
        {
          value: 0,
          label: "未置顶",
        },
      ],
    };
  },
  watch: {
    isShowDrawer(newVal) {
      if (newVal && this.status === 0) {
        this.lifeInfo = this.value;
      } else {
        this.lifeInfo = {};
      }
    },
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

    // 确定修改事件
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

    // 发表事件
    handlePublishLifeInfo(formName) {
      this.$refs[formName].validate((valid) => {
        let lifeInfo = {
          ...this.lifeInfo,
          time: this.$moment(Date.parse(String(this.lifeInfo.time))).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        };
        this.lifeInfo = lifeInfo;
        this.$emit("handlePublishLifeInfo", valid, lifeInfo, () => {
          this.$refs[formName].resetFields();
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.drawer-container {
  padding: 30px;
}

/deep/ .el-drawer {
  overflow: auto;
  overflow-y: scroll;
}
/deep/ .el-drawer__body {
  overflow: auto;
  /* overflow-x: auto; */
}

.avatar-uploader {
  width: 200px;
  min-height: 200px;
  height: auto;
  border: 1px dashed #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>