<template>
  <div>
    <template>
      <el-table
        :data="tableDataSlice()"
        style="width: 100%"
        border
        highlight-current-row
      >
        <el-table-column type="index" label="#" align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" width="200" align="center">
        </el-table-column>
        <el-table-column prop="author" label="作者" align="center">
        </el-table-column>
        <el-table-column prop="category" label="类目" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.category === 'Vue'">{{
              scope.row.category
            }}</el-tag>
            <el-tag type="info" v-else-if="scope.row.category === 'React'">{{
              scope.row.category
            }}</el-tag>
            <el-tag
              type="warning"
              v-else-if="
                scope.row.category === 'Node.js' ||
                  scope.row.category === '小程序'
              "
              >{{ scope.row.category }}</el-tag
            >
            <el-tag
              type="danger"
              v-else-if="
                scope.row.category === '性能优化' ||
                  scope.row.category === '工具类'
              "
              >{{ scope.row.category }}</el-tag
            >
            <el-tag v-else-if="scope.row.category === 'JaveScript'">{{
              scope.row.category
            }}</el-tag>
            <el-tag type="success" v-else>{{ scope.row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="source" label="来源" align="center">
        </el-table-column>
        <el-table-column label="重要性" align="center" width="150">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.starNum" disabled text-color="#ff9900">
            </el-rate>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center">
          <template slot-scope="scope">
            {{ getDate(scope.row.date) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="210">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="goto('/edit',scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="del(scope.row)"
              >删除</el-button
            >
            <el-button type="success" size="mini" @click="goto('/details',scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        class=" m-t10"
      >
      </el-pagination>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      pageSizes: [10, 100, 200],
      pageSize: 10,
      currentPage: 1,
      tableData: []
    };
  },
  components: {},
  methods: {
    //获取分页后的数据
    tableDataSlice() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    //根据传入的时间 转成年月日时分秒格式
    getDate(date) {
      if (String(date).includes("Z"))
        return dayjs(date).format("YYYY年MM月DD日HH时mm分ss秒");
      else return date;
       return dayjs(date).format("YYYY年MM月DD日HH时mm分ss秒");
    },
    //获取数据
    getData() {
      axios
        .get("/api/article/allArticle ")
        .then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            this.tableData = res.data.data;
            this.tableData.map(item => {
              return this.$set(item, "starNum", Number(item.star));
            });
          }
        })
        .catch(erro => {
          console.log(`请求失败.${erro}`);
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
    },
    //跳转页面
    goto(path,row) {
      this.$router.push({
        path:path,
        query: {
          id: row._id
        }
      });
    },
    //删除
    del(row) {
      this.$confirm("是否确定删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .post("/api/article/delete", {
              _id: row._id
            })
            .then(res => {
              console.log(res);
              if (res.data.code === 200) {
                this.$message.success("删除成功!");
                this.getData();
              } else {
                this.$message.error("删除失败!");
              }
            })
            .catch(error => {
              console.log(`请求失败.${error}`);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>