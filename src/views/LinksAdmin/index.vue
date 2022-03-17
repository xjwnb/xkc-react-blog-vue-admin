<!--
 * @Author: your name
 * @Date: 2021-02-18 16:46:05
 * @LastEditTime: 2021-02-18 21:22:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\views\LinksAdmin\index.vue
-->
<template>
  <div class="links-admin">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 已通过 -->
      <el-tab-pane label="已通过" name="first">
        <el-table v-loading="loading" :data="passLinksInfo" border style="width: 100%">
          <el-table-column prop="id" label="id" width="150"> </el-table-column>
          <el-table-column prop="name" label="名称" width="120">
          </el-table-column>
          <el-table-column prop="website" label="网址">
            <template slot-scope="scope">
              <a :href="scope.row.website" target="_blank">{{
                scope.row.website
              }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="logoUrl" label="LOGO" width="120">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.logoUrl"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="tableEditClickHandle(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="deleteLinkInfoHandle(scope.row, true)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 未通过 -->
      <el-tab-pane label="未通过" name="second">
        <el-table :data="notPassLinksInfo" border style="width: 100%">
          <el-table-column prop="id" label="id" width="150"> </el-table-column>
          <el-table-column prop="name" label="名称" width="120">
          </el-table-column>
          <el-table-column prop="website" label="网址">
            <template slot-scope="scope">
              <a :href="scope.row.website" target="_blank">{{
                scope.row.website
              }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="logoUrl" label="LOGO" width="120">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.logoUrl"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="tableEditClickHandle(scope.row)" size="small"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="small"
                @click="deleteLinkInfoHandle(scope.row, false)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- dialog 编辑 -->
    <el-dialog title="编辑友链信息" :visible.sync="dialogFormVisible">
      <el-form :model="editData" :rules="rules">
        <el-form-item
          label="网址名称"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="网址链接"
          prop="website"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editData.website" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="LOGO链接"
          prop="logoUrl"
          :label-width="formLabelWidth"
        >
          <el-input v-model="editData.logoUrl" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          prop="description"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            v-model="editData.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="是否通过"
          prop="is_pass"
          :label-width="formLabelWidth"
        >
          <el-switch
            style="display: block"
            v-model="editData.is_pass"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="已通过"
            inactive-text="未通过"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="changeLinkInfoHandle"
          >确定修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 请求
import { getLinksInfo, updateLinksInfo, deleteLinksInfo } from "@/api/links";
export default {
  name: "LinksAdmin",
  data() {
    return {
      activeName: "first",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      linksInfo: [], // 友链信息 all
      passLinksInfo: [], // 通过的友链信息
      notPassLinksInfo: [], // 未通过的友链信息
      editData: {}, // 编辑的友链信息
      rules: {
        name: [
          { required: true, message: "网址名称不能为空", trigger: "blur" },
        ],
        website: [
          { required: true, message: "网址链接不能为空", trigger: "blur" },
        ],
        logoUrl: [
          { required: true, message: "LOGO网址不能为空", trigger: "blur" },
        ],
        description: [
          { required: true, message: "LOGO网址不能为空", trigger: "blur" },
        ],
        is_pass: [
          { required: true, message: "LOGO网址不能为空", trigger: "blur" },
        ],
      },
      loading: true,
    };
  },
  created() {},
  async mounted() {
    // 请求友链发送
    let linksInfo = await this.getLinksInfoData();
    // 过滤出通过和未通过的友链信息
    let newLinksInfo = linksInfo.map((link) => {
      if (link.is_pass === 0) {
        let notPassLink = {
          ...link,
          is_pass: false,
        };
        this.notPassLinksInfo.push(notPassLink);
        return notPassLink;
      } else {
        let passLink = {
          ...link,
          is_pass: true,
        };
        this.passLinksInfo.push(passLink);
        return passLink;
      }
    });
    this.linksInfo = newLinksInfo;
  },
  methods: {
    // 点击标签
    handleClick(tab, event) {},
    // 点击编辑事件
    tableEditClickHandle(data) {
      this.dialogFormVisible = true;
      let editData = JSON.parse(JSON.stringify(data));
      this.editData = editData;
    },

    // 获取友链信息
    getLinksInfoData() {
      this.loading = true;
      return new Promise((resolve, reject) => {
        getLinksInfo()
          .then((res) => {
            if (res.code === 200) {
              this.loading = false;
              resolve(res.data.linksInfo);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },

    // 确定修改事件
    async changeLinkInfoHandle() {
      console.log(this.editData);

      // 更新网页数据
      let nowLinksInfo = this.linksInfo.map((link) => {
        if (this.editData.id === link.id) {
          return this.editData;
        }
        return link;
      });
      console.log(nowLinksInfo);
      this.linksInfo = nowLinksInfo;
      // 重置通过和未通过数据
      this.notPassLinksInfo = [];
      this.passLinksInfo = [];
      // 更新通过和不通过数据
      this.filterLinksInfoData(nowLinksInfo);
      this.dialogFormVisible = false;
      // 更新数据
      await this.updateLinksInfoData(this.editData);
    },

    // 更新友链
    updateLinksInfoData(linksInfo) {
      return new Promise((resolve, reject) => {
        updateLinksInfo(linksInfo)
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
      });
    },

    // 分类友链信息
    filterLinksInfoData(linksInfo) {
      linksInfo.map((link) => {
        if (link.is_pass) {
          this.passLinksInfo.push(link);
        } else {
          this.notPassLinksInfo.push(link);
        }
      });
    },

    // 点击删除事件
    deleteLinkInfoHandle(row, isPass) {
      console.log(row, isPass);
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
          deleteLinksInfo(row.id).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.data.msg,
              });
              this.linksInfo = this.linksInfo.filter(
                (link) => link.id !== row.id
              );
              if (isPass) {
                this.passLinksInfo = this.passLinksInfo.filter(
                  (link) => link.id !== row.id
                );
              } else {
                this.notPassLinksInfo = this.notPassLinksInfo.filter(
                  (link) => link.id !== row.id
                );
              }
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
  },
};
</script>
<style scoped>
</style>