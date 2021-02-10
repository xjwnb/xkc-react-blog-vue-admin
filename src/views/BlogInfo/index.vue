<!--
 * @Author: your name
 * @Date: 2021-02-07 18:07:18
 * @LastEditTime: 2021-02-10 21:22:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\views\BlogInfo\index.vue
-->
<template>
  <div>
    <el-form
      label-width="100px"
      :model="blogForm"
      :rules="blogRules"
      ref="blogForm"
    >
      <!-- 标题 -->
      <el-form-item label="标题" prop="title">
        <el-input placeholder="标题" v-model="blogForm.title"></el-input>
      </el-form-item>
      <!-- 作者 -->
      <el-form-item label="作者" prop="name">
        <el-input placeholder="作者" v-model="blogForm.name"></el-input>
      </el-form-item>
      <!-- 发布时间 -->
      <el-form-item label="发布时间" prop="time">
        <el-date-picker
          v-model="time"
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
          v-model="blogForm.description_info"
        >
        </el-input>
      </el-form-item>
      <!-- 描述图片 -->
      <el-form-item label="描述图片" prop="picture">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="pictureSuccessHandle"
          :before-upload="beforePictureUploadHandle"
          :http-request="uploadPictureFileHandle"
        >
          <img v-if="blogForm.picture" :src="blogForm.picture" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- 标签 -->
      <el-form-item label="标签" prop="tag">
        <el-select
          v-model="tag"
          multiple
          filterable
          default-first-option
          placeholder="选择文章标签"
          @change="changeTagHandle"
          collapse-tags
        >
          <el-option
            v-for="tag in tagsInfo"
            :key="tag.id"
            :label="tag.name"
            :value="tag.name"
            :style="{ backgroundColor: tag.color, color: '#ffffff' }"
          >
          </el-option>
        </el-select>
        <el-tag
          v-for="tag in selectedTagInfo"
          :key="tag.id"
          :color="tag.color"
          effect="dark"
        >
          {{ tag.name }}
        </el-tag>
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
          v-model="blogForm.content"
          ref="mavonEditor"
          @imgAdd="mavonEditorImgAdd"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitBlogInfoHandle('blogForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 请求
import { userinfo, postUserInfo } from "@/api/user";
import { getTagsInfo } from "@/api/tag";
import { postBlogInfo } from "@/api/blog";
// 常量
import { action } from "@/const/oss/ossData";
// oss
import { client } from "@/utils/oss";
// 文件名称
import { getFileName } from "@/utils/fileName";
import toolbars from "@/const/markdown/mavonEditorToolbars";
// vue-editor
// import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight";
/* import "highlight.js/styles/github.css";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import hljs from "highlight.js";
import "tui-color-picker/dist/tui-color-picker.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import "highlight.js/styles/github.css";
import { Editor } from "@toast-ui/vue-editor"; */

export default {
  name: "BlogInfo",
  components: {
    // Editor,
  },
  data() {
    return {
      action: action,
      blogForm: {
        title: "",
        name: "",
        time: "",
        description_info: "",
        picture: "",
        tag: [],
        content: "",
      },
      blogRules: {
        title: [
          {
            required: true,
            message: "标题不能为空",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "作者不能为空",
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
        picture: [
          {
            required: true,
            message: "图片不能为空",
            trigger: "blur",
          },
        ],
        tag: [
          {
            required: true,
            message: "标签不能为空",
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
      picture: "",
      tagsInfo: [],
      selectedTagInfo: "",
      defaultOptions: {
        minHeight: "200px",
        language: "zh-CN",
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        hideModeSwitch: false,
      },
      editorText: "",
      /* editorOptions: {
        hideModeSwitch: true,
      }, */
      time: "",
      tag: [],
      html: "",
      markdownContent: "",
      toolbars: toolbars,
    };
  },
  watch: {},
  computed: {
    language() {
      return this.languageTypeList["zh"];
    },
  },
  created() {},
  async mounted() {
    let tagsInfo;
    // 获取标签信息
    try {
      tagsInfo = await this.getTagInfoData();
      this.tagsInfo = tagsInfo;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
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
        this.blogForm.picture = putFileResult.url;
      } catch (err) {
        console.log(err);
      }
    },
    // 获取标签
    getTagInfoData() {
      return new Promise((resolve, reject) => {
        getTagsInfo()
          .then((res) => {
            if (res.code === 200) {
              resolve(res.data.data.tagsInfo);
            }
          })
          .catch((err) => {
            console.log(err);
            resolve(err);
          });
      });
    },
    // 修改选中标签事件
    changeTagHandle(tagInfo) {
      let tagForm = tagInfo.join(",");
      this.blogForm.tag = tagForm;
      let selectTagsInfo = tagInfo.map((tagName) => {
        let filterTagInfo = this.tagsInfo.filter(
          (tags) => tags.name === tagName
        );
        return filterTagInfo[0];
      });
      this.selectedTagInfo = selectTagsInfo;
    },

    // markdown change 事件
    changeEditorHandle() {
      let htmlResult = this.getHtml();
      this.blogForm.content = htmlResult;
    },
    // editor html
    getHtml() {
      let html = this.$refs.toastuiEditor.invoke("getHtml");
      return html;
    },

    // 表单提交事件
    submitBlogInfoHandle(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.blogForm);
          postBlogInfo(this.blogForm)
            .then((res) => {
              if (res.code === 200) {
                this.$message({
                  type: "success",
                  message: res.data.msg,
                });
                this.blogForm = {
                  title: "",
                  name: "",
                  time: "",
                  description_info: "",
                  picture: "",
                  tag: [],
                  content: "",
                };
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                type: "warning",
                message: err,
              });
            });
        }
      });
    },

    // 修改时间事件
    changeTimeHandle(time) {
      let timeFormat = this.$moment(Date.parse(time)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.blogForm.time = timeFormat;
      // console.log(this.$moment('Wed Feb 10 2021 01:20:19 GMT+0800 (中国标准时间)').format('YYYY-MM-DD HH:mm:ss'))
    },
    // getMarkdownHtml
    getMarkdownHtml() {
      this.html = this.$refs.markdownEditor.getHtml();
      console.log(this.html);
    },
    subMarkdownHandle() {
      console.log(this.$refs.blogMarkdown.getHtml());
    },
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
  },
};
</script>
<style scoped>
.avatar-uploader {
  width: 180px;
  height: 180px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

/* 编辑器 */
.mavonEditor-class {
  min-height: 600px;
}
</style>