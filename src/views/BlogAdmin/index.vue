<!--
 * @Author: your name
 * @Date: 2021-02-10 21:25:45
 * @LastEditTime: 2021-02-12 19:31:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\views\BlogAdmin\index.vue
-->
<template>
  <div>
    <el-table :data="blogInfo" style="width: 100%">
      <el-table-column prop="id" label="id" width="70px"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="name" label="作者"> </el-table-column>
      <el-table-column prop="time" label="时间" width="180"> </el-table-column>
      <el-table-column prop="description_info" label="描述信息">
      </el-table-column>
      <el-table-column prop="picture" label="picture">
        <template slot-scope="scope">
          <el-image
            style="width: 200px; height: 100px"
            :src="scope.row.picture"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="tag" label="标签" width="180">
        <template slot-scope="scope">
          <el-tag
            v-for="taginfo in scope.row.tag"
            :key="taginfo.id"
            :color="taginfo.color"
            effect="dark"
          >
            {{ taginfo.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="blogInfoCount"
      :page-size="10"
      :current-page.sync="currentPage"
      @current-change="currentPageChangehandle"
    >
    </el-pagination>
    <!-- 编辑抽屉 -->
    <el-drawer
      title="编辑博客"
      :visible.sync="isShowDrawer"
      size="90vw"
      :with-header="false"
    >
      <el-form
        label-width="100px"
        :model="currentEditBlogInfo"
        :rules="blogRules"
        ref="blogForm"
      >
        <!-- 标题 -->
        <el-form-item label="标题" prop="title">
          <el-input
            placeholder="标题"
            v-model="currentEditBlogInfo.title"
          ></el-input>
        </el-form-item>
        <!-- 作者 -->
        <el-form-item label="作者" prop="name">
          <el-input
            placeholder="作者"
            v-model="currentEditBlogInfo.name"
          ></el-input>
        </el-form-item>
        <!-- 发布时间 -->
        <el-form-item label="发布时间" prop="time">
          <el-date-picker
            v-model="currentEditBlogInfo.time"
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
            v-model="currentEditBlogInfo.description_info"
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
            <el-image
              v-if="currentEditBlogInfo.picture"
              :src="currentEditBlogInfo.picture"
              class="avatar"
            ></el-image>
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
              v-for="tag in tagInfo"
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
            v-model="currentEditBlogInfo.content"
            ref="mavonEditor"
            @imgAdd="mavonEditorImgAdd"
            @change="mavonChangeHandle"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitBlogInfoHandle('blogForm')"
            >确定修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
// 请求
import {
  getBlogInfo,
  postBlogInfo,
  updateBlogInfo,
  getBlogInfoCount,
  deleteBlogInfo,
} from "@/api/blog";
import { getTagsInfo } from "@/api/tag";
import { userinfo, postUserInfo } from "@/api/user";
// 常量
import { action } from "@/const/oss/ossData";
// oss
import { client } from "@/utils/oss";
// 文件名称
import { getFileName } from "@/utils/fileName";
import toolbars from "@/const/markdown/mavonEditorToolbars";

export default {
  name: "BlogAdmin",
  data() {
    return {
      blogInfo: [], // 博客信息
      tagInfo: [], // 标签信息
      isShowDrawer: false, // 是否展示抽屉
      currentEditBlogInfo: {}, // 当前需要编辑的博客信息
      tag: [], // 选中的标签
      selectedTagInfo: [], // 被选中的tag对象
      toolbars: toolbars, // 编辑器工具栏
      action: action,
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
      picture: "", // 背景图片
      blogInfoCount: 0, // 博客表数据
      currentPage: 1, // 当前页
    };
  },
  watch: {
    isShowDrawer(newVal) {
      if (!newVal) {
        this.currentEditBlogInfo = {};
      } else {
        this.$nextTick(() => {
          this.selectedTagInfo = this.currentEditBlogInfo.tag;
          if (!this.currentEditBlogInfo) {
            this.tag = [];
          } else {
            this.tag = this.currentEditBlogInfo.tag.map((tag) => {
              return tag.name;
            });
          }
        });
      }
    },
  },
  computed: {
    /* tagValueArr() {
      
    }, */
  },
  filters: {},
  created() {},
  async mounted() {
    let blogInfoResult;
    let tagInfoResult;
    let blogInfoCount;
    // 获取博客信息 和 标签信息
    try {
      // 标签数据
      tagInfoResult = await this.getTagsInfoData();
      this.tagInfo = tagInfoResult.tagsInfo;
      // 博客数据
      blogInfoResult = await this.getBlogInfoData(0);
      // 博客数据数量
      blogInfoCount = await this.getBlogInfoDataCount();
      this.blogInfoCount = blogInfoCount;
      // this.blogInfo = blogInfoResult.blogInfo;
      let changeBlogInfoResult = this.changeBlogTagInfo(
        blogInfoResult.blogInfo
      );
      this.blogInfo = changeBlogInfoResult;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    // 获取博客信息
    async getBlogInfoData(offset = 0) {
      return new Promise((resolve, reject) => {
        getBlogInfo(offset)
          .then((res) => {
            if (res.code === 200) {
              resolve(res.data);
            }
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    // 获取标签信息
    async getTagsInfoData() {
      return new Promise((resolve, reject) => {
        getTagsInfo()
          .then((res) => {
            if (res.code === 200) {
              resolve(res.data.data);
            }
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject(err);
          });
      });
    },
    //
    tableTagArr(tagStr) {
      let tagArr = tagStr.split(",");
      let tagResult = tagArr.map((tag) => {
        return this.tagInfo.filter((taginfo) => taginfo.name === tag)[0];
      });
      return tagResult;
    },
    // 修改blog 中的 tag
    changeBlogTagInfo(blogsInfo) {
      let newTag;
      let newBloginfoArr = blogsInfo.map((blog) => {
        if (!blog) return;
        let { tag, time } = blog;
        if (typeof tag === "string") {
          newTag = this.tableTagArr(tag);
          return {
            ...blog,
            tag: newTag,
            time: this.$moment(Date.parse(String(time))).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
          };
        }
        return {
          ...blog,
          time: this.$moment(Date.parse(String(time))).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        };
      });
      return newBloginfoArr;
    },
    // 点击编辑事件事件
    handleEdit(index, rowData) {
      this.isShowDrawer = true;
      let currentBlogInfo = JSON.parse(JSON.stringify(rowData));
      this.currentEditBlogInfo = currentBlogInfo;
    },
    // 删除事件
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm(
        `此操作将永久删除 id 为${row.id}的文件, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteBlogInfo(row.id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.blogInfo = this.blogInfo.filter(blog => blog.id !== row.id);
            }
          });
        })
        .catch(() => {
          /*           this.$message({
            type: "info",
            message: "已取消删除",
          }); */
        });
    },
    // 提交事件
    submitBlogInfoHandle(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let blogInfo = {
            ...this.currentEditBlogInfo,
            tag: this.tag.join(","),
          };
          updateBlogInfo(blogInfo)
            .then((res) => {
              if (res.code === 200) {
                this.$message({
                  type: "success",
                  message: res.data.msg,
                });
                let blogInfoCopy = JSON.parse(JSON.stringify(blogInfo));
                let blogInfoDataCopy = JSON.parse(
                  JSON.stringify(this.blogInfo)
                );
                this.blogInfo = blogInfoDataCopy.map((blog) => {
                  if (blog.id === blogInfoCopy.id) {
                    return {
                      ...blogInfoCopy,
                      tag: this.selectedTagInfo,
                    };
                  }
                  return blog;
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
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
      this.currentEditBlogInfo.content = htmlResult;
    },
    // editor html
    getHtml() {
      let html = this.$refs.toastuiEditor.invoke("getHtml");
      return html;
    },
    // 修改选中标签事件
    changeTagHandle(tagInfo) {
      let tagForm = tagInfo.join(",");
      this.currentEditBlogInfo.tag = tagForm;
      let selectTagsInfo = tagInfo.map((tagName) => {
        let filterTagInfo = this.tagInfo.filter(
          (tags) => tags.name === tagName
        );
        return filterTagInfo[0];
      });
      this.selectedTagInfo = selectTagsInfo;
    },
    // 修改时间事件
    changeTimeHandle(time) {
      let timeFormat = this.$moment(Date.parse(time)).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.currentEditBlogInfo.time = timeFormat;
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
        this.currentEditBlogInfo.picture = putFileResult.url;
      } catch (err) {
        console.log(err);
      }
    },
    // mavon Change 事件
    mavonChangeHandle(val, render) {
      this.currentEditBlogInfo.htmlContent = render;
    },

    // 查询博客表数据条数
    getBlogInfoDataCount() {
      return new Promise((resolve, reject) => {
        getBlogInfoCount()
          .then((res) => {
            if (res.code === 200) {
              resolve(res.data.count);
            }
            resolve();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    // 分页变化事件
    async currentPageChangehandle(val) {
      console.log(val);
      this.currentPage = val;
      let blogInfoDataByPage;
      try {
        blogInfoDataByPage = await getBlogInfoData(10 * (val - 1));
      } catch (err) {
        console.log(err);
      }
      let changeBlogInfoResult = this.changeBlogTagInfo(
        blogInfoResult.blogInfo
      );
      this.blogInfo = changeBlogInfoResult;
    },
  },
};
</script>


<style lang="less" scoped>
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
  height: auto;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/ .el-drawer__body {
  padding: 30px;
}
</style>