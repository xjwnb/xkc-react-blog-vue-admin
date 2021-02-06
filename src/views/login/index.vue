<!--
 * @Author: your name
 * @Date: 2021-02-06 13:57:34
 * @LastEditTime: 2021-02-06 17:17:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\views\login\index.vue
-->
<template>
  <div class="login-div">
    <div class="login-form">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 请求
import { login } from "@/api/login";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空！"));
      }
      callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空！"));
      }
      callback();
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            validator: validateUsername,
            trigger: "blur",
          },
        ],
        password: [
          {
            validator: validatePassword,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.loginForm).then(res => {
            console.log(res);
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  .login-form {
    width: 500px;
  }
}
@media screen and (max-width: 600px) {
  .login-div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #3acae4;
    border-radius: 5px;
    box-sizing: border-box;
    .login-form {
      width: 100vw;
    }
  }
}
</style>