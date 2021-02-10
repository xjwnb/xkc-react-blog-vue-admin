<!--
 * @Author: your name
 * @Date: 2021-02-08 13:29:06
 * @LastEditTime: 2021-02-09 18:55:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\views\User\components\UserForm.vue
-->
<template>
  <div class="user-form">
    <el-form
      :model="userForm"
      status-icon
      :rules="rules"
      ref="userForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="管理员名称" prop="name">
        <el-input v-model="userForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="个人简介" prop="personal_profile">
        <el-input
          v-model="userForm.personal_profile"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatarUrl">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="uploadAvatarFile"
        >
          <img
            v-if="userForm.avatarUrl"
            :src="userForm.avatarUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="背景图片" prop="bgUrl">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :show-file-list="false"
          :on-success="handleUrlSuccess"
          :before-upload="beforeUrlUpload"
          :http-request="uploadUrlFile"
        >
          <img
            v-if="userForm.bgUrl"
            :src="userForm.bgUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')"
          >确定提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserForm",
  props: {
    userForm: {
      type: Object,
    },
    action: String,
  },
  data() {
    return {
      // userForm: {},
      // 规则
      rules: {
        name: [
          { required: true, message: "管理员名称不能为空", trigger: "blur" },
        ],
        personal_profile: [
          { required: true, message: "个人简介不能为空", trigger: "blur" },
        ],
        avatarUrl: [
          { required: true, message: "头像不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    // 头像成功
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit("avatar-success", res, file);
    },
    // 头像发送之前
    beforeAvatarUpload(file) {
      this.$emit("before-avatar-upload", file);
    },
    // 自定义头像上传方法
    uploadAvatarFile(file) {
      this.$emit("upload-avatarFile", file);
    },

    // 背景图片成功
    handleUrlSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit("url-success", res, file);
    },
    // 背景图片发送之前
    beforeUrlUpload(file) {
      this.$emit("before-url-upload", file);
    },
    // 自定义背景图片上传方法
    uploadUrlFile(file) {
      this.$emit("upload-urlFile", file);
    },
    
    // 表单提交
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        this.$emit("user-form-submit", valid);
      });
      
    },
  },
};
</script>
<style scoped>
.user-form {
  width: 500px;
}
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>