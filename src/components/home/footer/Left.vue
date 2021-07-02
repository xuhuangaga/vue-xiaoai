<template>
  <div class="p-10">
    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="num" label="Order_No" width="280" align="center">
        </el-table-column>
        <el-table-column prop="price" label="Price" align="center">
        </el-table-column>
        <el-table-column label="Status" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="danger">pending</el-tag>
            <el-tag v-else type="success">success</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      tableData: []
    };
  },
  components: {},
  methods: {
    getData() {
      axios
        .get("/api/orderData")
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            this.tableData = res.data.data;
          }
        })
        .catch(error => {
          console.log(`请求失败.${error}`);
        });
    }
  },
  mounted() {
    //请求数据
    this.getData();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>