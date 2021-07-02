<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      :show-close="false"
      class="excel_dialog"
    >
      <span slot="footer" class="dialog-footer">
        <el-form
          label-width="80px"
          :model="formData"
          :rules="rules"
          ref="ruleData"
        >
          <el-form-item label="名称:" prop="goodsName">
            <el-input v-model.trim="formData.goodsName"></el-input>
          </el-form-item>
          <el-form-item label="原价:" prop="oriPrice">
            <el-input v-model.number="formData.oriPrice"></el-input>
          </el-form-item>
          <el-form-item label="现价:" prop="presentPrice">
            <el-input v-model.number="formData.presentPrice"></el-input>
          </el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSave">确 定</el-button>
        </el-form>
      </span>
    </el-dialog>
    <el-col :span="7" class=" m-b10">
      <el-input
        v-model="search"
        placeholder="请输入您想搜索的商品名称"
      ></el-input>
    </el-col>
    <template>
      <el-table :data="tableDataSlice()" style="width: 100%">
        <el-table-column prop="NAME" label="名称" width="380" align="center">
        </el-table-column>
        <el-table-column
          prop="GOODS_SERIAL_NUMBER"
          label="商品编号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ORI_PRICE"
          label="原价"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="PRESENT_PRICE"
          label="现价"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="edit(scope.$index, scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.$index, scope.row)"
              >删除</el-button
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
      <div class="m-t10 flex">
        <jsonExcel :data="tableDataSlice()" name="goods.xls" type="xls">
          <el-button type="primary" size="small">导出xls</el-button>
        </jsonExcel>
        <jsonExcel
          :data="tableDataSlice()"
          name="goods.csv"
          class="m-l10"
          type="csv"
        >
          <el-button type="primary" size="small">导出csv</el-button>
        </jsonExcel>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import jsonExcel from "vue-json-excel";
export default {
  name: "",
  props: {},
  data() {
    return {
      dialogVisible: false,
      formData: {
        goodsName: "",
        presentPrice: 0,
        oriPrice: 0
      },
      pageSizes: [10, 100, 200],
      pageSize: 10,
      currentPage: 1,
      search: "",
      tableData: [],
      list: [],
      activeIndex: -1,
      rules: {
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        oriPrice: [{ required: true, message: "请输入原价", trigger: "blur" }],
        presentPrice: [
          { required: true, message: "请输入现价", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    jsonExcel
  },
  methods: {
    //获取分页后的数据
    tableDataSlice() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    //获取数据
    getData() {
      axios
        .get("/api/tableData")
        .then(res => {
          if (res.data.code === 0) {
            if (res.data.data.length != 0) {
              this.tableData = res.data.data;
              this.list = res.data.data;
            }
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
      this.currentPage = val;
    },
    //修改
    edit(index, row) {
      this.activeIndex = index;
      this.dialogVisible = true;
      this.formData.goodsName = row.NAME;
      this.formData.oriPrice = row.ORI_PRICE;
      this.formData.presentPrice = row.PRESENT_PRICE;
    },
    //确定修改
    editSave() {
      this.$refs.ruleData.validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          let activeItem = this.tableData[this.activeIndex];
          activeItem.NAME = this.formData.goodsName;
          activeItem.ORI_PRICE = this.formData.oriPrice;
          activeItem.PRESENT_PRICE = this.formData.presentPrice;
          this.$message.success("修改成功!");
        } else {
          this.$message.error("表单信息输入有误...");
          return;
        }
      });
    },
    //删除
    del(index, row) {
      this.$confirm("是否确定删除该条数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message.success("删除成功!");
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
  watch: {
    search(val1, val2) {
      if (!val2) {
        this.tableData = this.tableData.filter(item => {
          return item.NAME.includes(val1);
        });
      } else {
        this.tableData = this.list;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
</style>