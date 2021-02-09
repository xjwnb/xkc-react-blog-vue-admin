<!--
 * @Author: your name
 * @Date: 2021-02-08 22:28:34
 * @LastEditTime: 2021-02-09 14:13:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\views\Tags\index.vue
-->
<template>
  <div>
    <div class="tags-div" v-if="tagsInfo">
      <el-tag
        v-for="tag in tagsInfo"
        :key="tag.id"
        :color="tag.color"
        effect="dark"
        closable
        @close="handleTagClose(tag)"
      >
        {{ tag.name }}
      </el-tag>
    </div>
    <div class="tags-form" v-if="tagForm">
      <el-form
        label-width="100px"
        :model="tagForm"
        :rules="tagRules"
        ref="tagForm"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="tagForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标签颜色" prop="color">
          <el-color-picker v-model="tagForm.color"></el-color-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tagFormSubmitHandle('tagForm')"
            >新增标签</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 请求
import { postTagsInfo, getTagsInfo, deleteTagsInfo } from "@/api/tag";

export default {
  name: "Tags",
  data() {
    return {
      tagForm: {
        name: "",
        color: "#409EFF",
      }, // 标签表单信息
      tagRules: {
        name: {
          required: true,
          message: "标签名称不能为空",
          trigger: "blur",
        },
        color: {
          required: true,
          message: "标签名称不能为空",
          trigger: "blur",
        },
      },
      tagsInfo: [],
    };
  },
  created() {},
  async mounted() {
    // 获取标签信息
    try {
      let tagInfoResult = await this.getTagInfo();
      this.tagsInfo = tagInfoResult;
    } catch (err) {
      this.$message({
        type: "warning",
        message: err,
      });
    }
  },
  methods: {
    // 提交事件
    tagFormSubmitHandle(formName) {
      let { name } = this.tagForm;
      let hasSameName = this.tagsInfo.some(
        (tag) => tag.name.toLowerCase() === name.toLowerCase()
      );
      if (hasSameName) {
        this.$message({
          type: "warning",
          message: "该标签已存在",
        });
        return;
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            postTagsInfo(this.tagForm)
              .then((res) => {
                if (res.code === 200) {
                  this.$message({
                    type: "success",
                    message: res.data.msg,
                  });

                  console.log({ ...this.tagForm, id: Date.now() });
                  this.tagsInfo.push({ ...this.tagForm, id: Date.now() });
                  // 重置
                  this.resetTagForm();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.$message({
              type: "warning",
              message: "表单不合理",
            });
            return;
          }
        });
      }
    },
    // 重置 tagform
    resetTagForm() {
      this.tagForm = {
        name: "",
        color: "#409EFF",
      };
    },
    // 获取标签信息
    getTagInfo() {
      return new Promise((resolve, reject) => {
        getTagsInfo()
          .then((res) => {
            if (res.code === 200) {
              // this.tagsInfo = res.data.data.tagsInfo;
              resolve(res.data.data.tagsInfo);
            }
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    // 删除 tag
    handleTagClose(tagData) {
      console.log(tagData);
      let { name } = tagData;
      let taginfo = this.tagsInfo.filter((tag) => tag.name !== tagData.name);
      this.tagsInfo = taginfo;
      // 提交删除标签信息
      deleteTagsInfo(name)
        .then((res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.data.msg
            })
          }
        })
        .catch((err) => {
          console.log(err);
          
        });
    },
  },
};
</script>
<style scoped>
.tags-div {
  margin: 20px;
}
</style>