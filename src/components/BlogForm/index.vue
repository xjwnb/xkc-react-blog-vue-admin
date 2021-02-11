<!--
 * @Author: your name
 * @Date: 2021-02-11 14:30:32
 * @LastEditTime: 2021-02-11 15:16:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\views\BlogAdmin\components\BlogForm\index.vue
-->
<template>
  <div class="blog-form">
    BlogForm
    <el-form
      v-if="blogForm"
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
export default {
  name: "BlogForm",
  props: {
    blogForm: Object, // 博客内容
    blogRules: Object, // 博客规则
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    // 修改时间事件
    changeTimeHandle(time) {
      this.$emit("change-time", time);
    },
    // 头像上传成功事件
    pictureSuccessHandle(res, file) {
      this.$emit("picture-success", res, file);
    },
    // 背景图片发送之前
    beforePictureUploadHandle(file) {
      this.$emit("before-picture-upload", file);
    },
    // 自定义上传事件
    uploadPictureFileHandle(file) {
      this.$emit("upload-picture-file", file);
    }
  }
};
</script>
<style scoped>
</style>