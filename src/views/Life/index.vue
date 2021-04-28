<!--
 * @Author: your name
 * @Date: 2021-04-26 16:14:12
 * @LastEditTime: 2021-04-28 17:59:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xkc-react-blog-vue-admin\src\views\Life\index.vue
-->

<template>
  <div class="life">
    <el-button type="primary" @click="handleAddLifeInfo">添加</el-button>
    <div class="life-table">
      <!-- table 表格 -->
      <el-table :data="lifeList" style="width: 100%">
        <el-table-column prop="id" label="id" width="180"> </el-table-column>
        <el-table-column prop="time" label="时间" width="180">
          <template slot-scope="scope">
            <p>
              {{
                $moment(Date.parse(scope.row.time)).format(
                  "YYYY-MM-DD HH:mm:ss"
                )
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="isTop" label="置顶">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.description_img"
              fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="description_img" label="描述图片">
          <template slot-scope="scope">
            <is-top-status :status="scope.row.isTop" />
          </template>
        </el-table-column>
        <el-table-column prop="description_info" label="描述信息">
          <template slot-scope="scope">
            <div class="description-info">
              {{ scope.row.description_info }}
            </div>
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
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPageNum"
      >
      </el-pagination>
    </div>

    <!-- 抽屉 -->
    <Drawer
      :isShowDrawer.sync="isShowDrawer"
      :value="currentLifeData"
      @handleUpdateSubmit="handleUpdateSubmit"
      @handlePublishLifeInfo="handlePublishLifeInfo"
      :status="status"
    ></Drawer>
  </div>
</template>

<script>
// 请求
import {
  getLifeInfo,
  updateLifeInfo,
  postLifeInfo,
  deleteLifeInfo,
} from "@/api/life";
// 组件
import { Drawer, isTopStatus } from "./components";

export default {
  name: "Life",
  components: {
    Drawer,
    isTopStatus,
  },
  data() {
    return {
      // 生活区信息
      lifeList: [],
      // 总数量
      total: 0,
      // 是否展示抽屉
      isShowDrawer: false,
      // 当前需要编辑的life信息
      currentLifeData: {},
      // 当前页
      currentPageNum: 1,
      // 抽屉状态
      status: 0,
    };
  },
  async created() {
    // 获取生活区信息
    let lifeData = await this.getLifeList(0);
    this.lifeList = lifeData.data.lifeList;
    this.total = lifeData.total;
  },
  mounted() {},
  methods: {
    /**
     * 根据 offset 请求获取对应生活区信息
     */
    getLifeList(offset) {
      return new Promise((resolve) => {
        getLifeInfo(offset).then((res) => {
          if (res.code === 200) {
            resolve(res);
          }
        });
      });
    },

    /**
     * 分页点击当前页改变事件
     */
    async handleCurrentChange(val) {
      this.currentPageNum = val;
      this.getList();
    },

    /**
     * 点击编辑事件
     * @param { Number } index 索引
     * @param { Object } row 本行索引
     */
    handleEdit(index, row) {
      this.status = 0;
      this.isShowDrawer = true;
      this.currentLifeData = row;
    },

    /**
     * 点击删除事件
     * @param { Number } index 索引
     * @param { Object } row 本行索引
     */
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let deleteData = await this.deleteInfo(row.id);
          this.$message({
            type: "success",
            message: deleteData.data.msg,
          });
          this.getList();
        })
        .catch(() => {
          /*           this.$message({
            type: "info",
            message: "已取消删除",
          }); */
        });
    },
    // 抽屉确定修改事件
    handleUpdateSubmit(valid, data) {
      if (valid) {
        updateLifeInfo(data).then(async (res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.msg,
            });
            this.getList();
          }
        });
      }
    },
    // 抽屉发表事件
    handlePublishLifeInfo(valid, data, callback) {
      if (valid) {
        postLifeInfo(data).then(async (res) => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: res.data.msg,
            });
            callback();
            this.getList();
          }
        });
      }
    },
    // 添加按钮事件
    handleAddLifeInfo() {
      this.status = 1;
      this.isShowDrawer = true;
    },

    // 获取信息（分页）
    async getList() {
      let lifeData = await this.getLifeList((this.currentPageNum - 1) * 10);
      this.lifeList = lifeData.data.lifeList;
      this.total = lifeData.total;
    },

    // 请求删除生活区信息
    deleteInfo(id) {
      return new Promise((resolve) => {
        deleteLifeInfo(id).then((res) => {
          if (res.code === 200) {
            resolve(res);
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.description-info {
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2; //这里写的数字是几就是超过几行剩余的显示省略号
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>