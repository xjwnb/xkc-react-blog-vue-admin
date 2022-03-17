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
    <el-button type="text" @click="handleAdd">新增标签</el-button>
    <el-table v-loading="loading" :data="tagsInfo" style="width: 100%">
      <el-table-column label="id" width="180" prop="id"> </el-table-column>

      <el-table-column label="名称" prop="name"> </el-table-column>

      <el-table-column label="颜色">
        <template slot-scope="scope">
          <el-tag :color="scope.row.color">{{ scope.row.color }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            style="color: #f56c6c"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="tags-div" v-if="tagsInfo">
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
    </div> -->

    <!-- 新增标签对话框 -->
    <el-dialog title="新增标签" :visible.sync="isShowAddDialog">
      <!-- <div class="tags-form" v-if="tagForm"> -->
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
            >确定</el-button
          >
        </el-form-item>
      </el-form>
      <!-- </div> -->
    </el-dialog>

    <!-- 编辑标签对话框 -->

    <el-dialog title="标签标签" :visible.sync="isShowEditDialog">
      <el-form
        label-width="100px"
        :model="editTagForm"
        :rules="editTagRules"
        ref="tagForm"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="editTagForm.name"></el-input>
        </el-form-item>
        <el-form-item label="标签颜色" prop="color">
          <el-color-picker v-model="editTagForm.color"></el-color-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleEditSubmit('tagForm')"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 请求
import {
  postTagsInfo,
  getTagsInfo,
  deleteTagsInfo,
  updateTagsInfo,
} from "@/api/tag";

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
      isShowAddDialog: false,
      isShowEditDialog: false,
      // 编辑标签信息
      editTagForm: {
        id: "",
        name: "",
        color: "",
      },

      // 编辑标签表单信息
      editTagRules: {
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
      loading: true,
    };
  },
  created() {},
  mounted() {
    // 获取标签信息
    this.handleGetData();
  },
  methods: {
    /**
     * 请求获取标签数据
     */
    async handleGetData() {
      this.loading = true;
      try {
        let tagInfoResult = await this.getTagInfo();
        this.tagsInfo = tagInfoResult;
        this.loading = false;
      } catch (err) {
        this.$message({
          type: "warning",
          message: err,
        });
      }
    },

    // 提交事件
    tagFormSubmitHandle(formName) {
      let { name } = this.tagForm;
      let hasSameName = this.tagsInfo.some(
        (tag) => tag.name.toLowerCase() === name.toLowerCase()
      );
      // if (hasSameName) {
      // this.$message({
      //   type: "warning",
      //   message: "该标签已存在",
      // });

      // this.isShowAddDialog = false;
      // return;
      // } else {
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
                this.isShowAddDialog = false;
              }
            })
            .catch((err) => {
              console.log(err);
              this.isShowAddDialog = false;
            });
        } else {
          this.$message({
            type: "warning",
            message: "表单不合理",
          });
          this.isShowAddDialog = false;
          return;
        }
      });
      // }
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
    // 删除 tag - 请求
    async handleTagDelete(tagData) {
      return new Promise((resolve, reject) => {
        console.log(tagData);
        let { id } = tagData;
        // let taginfo = this.tagsInfo.filter((tag) => tag.name !== tagData.name);
        // this.tagsInfo = taginfo;
        // 提交删除标签信息
        deleteTagsInfo(id)
          .then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              resolve();
            }
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },

    /**
     * 编辑
     */
    async handleEdit(row) {
      console.log(row);

      this.isShowEditDialog = true;
      this.editTagForm = JSON.parse(JSON.stringify(row));

      // try {
      //   const result = await updateTagsInfo(row);
      //   console.log(result);
      //   // this.handleGetData();
      // } catch (err) {
      //   console.log(err);
      // }
    },

    /**
     * 删除
     */
    handleDelete(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该标签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        showClose: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        distinguishCancelAndClose: true,
      })
        .then(async () => {
          // 请求删除
          await this.handleTagDelete(row);
          // 更新数据
          this.handleGetData();
        })
        .catch(() => {});

      return;
    },

    /**
     * 新增标签按钮
     */
    handleAdd() {
      this.isShowAddDialog = true;
    },

    /**
     * 编辑标签 - 确认修改
     */
    handleEditSubmit(formName) {
      console.log(this.editTagForm);

      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let result = await updateTagsInfo(this.editTagForm);
          console.log(result);
          if (result.code === 200) {
            this.$message({
              type: "success",
              message: result.data.msg,
            });
            // 获取最新数据
            this.handleGetData();
          }
          this.isShowEditDialog = false;
        }
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