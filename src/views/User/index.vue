<!--
 * @Author: your name
 * @Date: 2021-02-07 10:35:22
 * @LastEditTime: 2021-02-08 20:31:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\views\User\index.vue
-->
<template>
  <div>
    <user-form
      v-if="userForm"
      :userForm="userForm"
      :action="actionUrl"
      @avatar-success="avatarSuccessHandle"
      @before-avatar-upload="beforeAvatarUploadHandle"
      @upload-avatarFile="uploadAvatarFileHandle"
      @url-success="urlSuccessHandle"
      @before-url-upload="beforeUrlUploadHandle"
      @upload-urlFile="uploadUrlFileHandle"
      @user-form-submit="userFormSubmitHandle"
    />
  </div>
</template>

<script>
// 请求
import { userinfo, postUserInfo } from "@/api/user";
// 组件
import { UserForm } from "./components";
// 常量
import { action } from "@/const/oss/ossData";
// oss
import { client } from "@/utils/oss";
// 文件名称
import { getFileName } from "@/utils/fileName";

export default {
  name: "User",
  components: {
    UserForm,
  },
  data() {
    return {
      userForm: null,
      actionUrl: action,
      avatarUrl: "",
      bgUrl: "",
    };
  },
  created() {},
  async mounted() {
    let _this = this;
    await _this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        userinfo()
        .then((res) => {
          if (res.code === 200) {
            let userinfoData = JSON.parse(
              JSON.stringify(res.data.userinfoData)
            );
            this.userForm = userinfoData[0];
          }
          resolve();
        })
        .catch((err) => {
          console.log("userinfo", err);
          reject(err);
        });
      })
    },
    // 头像成功
    avatarSuccessHandle(res, file) {
      console.log(res, file);
    },
    // 头像发送之前
    beforeAvatarUploadHandle(file) {
      this.avatarUrl = file.name;
    },
    // 自定义头像发送
    async uploadAvatarFileHandle(file) {
      const fileName = getFileName("avatar", this.avatarUrl);
      try {
        const putFileResult = await client.put(fileName, file.file);
        this.userForm.avatarUrl = putFileResult.url;
      } catch (err) {
        console.log(err);
      }
    },

    // 背景图片事件
    // 头像成功
    urlSuccessHandle(res, file) {
      console.log(res, file);
    },
    // 背景图片发送之前
    beforeUrlUploadHandle(file) {
      this.bgUrl = file.name;
    },
    // 自定义背景图片发送
    async uploadUrlFileHandle(file) {
      const fileName = getFileName("bgUrl", this.bgUrl);

      try {
        const putFileResult = await client.put(fileName, file.file);
        this.userForm.bgUrl = putFileResult.url;
      } catch (err) {
        console.log(err);
      }
    },

    // 表单提交事件
    userFormSubmitHandle(valid) {
      if (valid) {
        postUserInfo(this.userForm)
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
      }
    },
  },
};
</script>
<style scoped>
</style>