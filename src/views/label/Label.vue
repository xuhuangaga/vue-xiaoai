<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane :label="unread" name="first">
        <div class=" bc-w p-10">
          <el-table
            :data="unreadMeth()"
            label="tableData"
            style="width: 100%"
            :show-header="false"
            :stripe="false"
          >
            <el-table-column prop="title" width="720"> </el-table-column>
            <el-table-column prop="date" width="180"> </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button plain @click="changeRead(scope.row)" size="mini"
                  >标为已读</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="m-t20">
            <el-button type="primary" size="small" @click="readAll"
              >全部标为已读</el-button
            >
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="read" name="second">
        <div class=" bc-w p-10">
          <el-table
            :data="readMeth()"
            label="tableData"
            style="width: 100%"
            :show-header="false"
            :stripe="false"
          >
            <el-table-column prop="title" width="720"> </el-table-column>
            <el-table-column prop="date" width="180"> </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button plain @click="del(scope.row)" size="mini"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="m-t20">
            <el-button type="danger" size="small" @click="delAll"
              >删除全部</el-button
            >
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="recycleBin" name="third">
        <div class=" bc-w p-10">
          <el-table
            :data="recycleBinMeth()"
            label="tableData"
            style="width: 100%"
            :show-header="false"
            :stripe="false"
          >
            <el-table-column prop="title" width="720"> </el-table-column>
            <el-table-column prop="date" width="180"> </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  type="warning"
                  size="mini"
                  @click="reduction(scope.row)"
                  >还原</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="m-t20">
            <el-button type="info" size="small" @click="emptyAll"
              >清空回收站</el-button
            >
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          title: "今晚吃鸡",
          date: "2019-06-07 23:00:10",
          isRead: false,
          isDelete: false
        },
        {
          title: "今晚12点整发大红包,先到先得",
          date: "2020-06-12 12:00:10",
          isRead: true,
          isDelete: false
        },
        {
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          date: "2018-01-09 09:23:12",
          isRead: false,
          isDelete: false
        },
        {
          title: "【系统通知】您的优惠券已过期",
          date: "2018-01-09 09:23:12",
          isRead: false,
          isDelete: true
        }
      ]
    };
  },
  components: {},
  methods: {
    //标为已读
    changeRead(row) {
      row.isRead = true;
    },
    //删除
    del(row) {
      row.isDelete = true;
    },
    //还原
    reduction(row) {
      row.isDelete = false;
    },
    //全部标为已读
    readAll() {
      this.tableData.map(item => {
        item.isRead = true;
      });
    },
    //全部删除
    delAll() {
      this.tableData.map(item => {
        item.isDelete = true;
      });
    },
    //清空回收站
    emptyAll() {
      this.tableData = this.tableData.filter(item => {
        return !item.isDelete;
      });
    },
    //过滤已读消息
    unreadMeth() {
      let arr = this.tableData.filter(item => {
        return !item.isRead && !item.isDelete;
      });
      return arr;
    },
    //过滤未读消息
    readMeth() {
      return this.tableData.filter(item => {
        return item.isRead && !item.isDelete;
      });
    },
    //过滤回收站消息
    recycleBinMeth() {
      return this.tableData.filter(item => {
        return item.isDelete;
      });
    }
  },
  mounted() {},
  computed: {
    //计算未读
    unread() {
      return `未读消息(${this.unreadMeth().length})`;
    },
    //计算已读
    read() {
      return `已读消息(${this.readMeth().length})`;
    },
    //计算回收站
    recycleBin() {
      return `回收站(${this.recycleBinMeth().length})`;
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>