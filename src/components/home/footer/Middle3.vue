<template>
  <div>
    <div class=" flex-j-between a-center p-10">
      <div><i class="iconfont icon-xiangxia"></i></div>
      <div class=" f-size14 todolist">Todo List</div>
    </div>
    <div class="check_dv p-10">
      <div>
        <div>
          <div class=" t-a-center f-size14" v-if="newList.length === 0">
            暂无数据...
          </div>
          <template v-else>
            <div
              class="check_el_checkbox check_dvs"
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="flex-j-between a-center">
                <div>
                  <el-checkbox
                    @change="change(item, index)"
                    :label="item.name"
                    v-model="item.checked"
                    :indeterminate="false"
                  ></el-checkbox>
                </div>
                <div class="del f-size12" @click="del(item, index)">X</div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="flex-j-between footer f-size12 m-t10 p-t10 a-center">
        <div>{{ num.length }} items left</div>
        <div class="all" @click="all">All</div>
        <div @click="active">Active</div>
        <div @click="completed">Completed</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      //未完成数据
      activeList: [],
      //已完成数据
      completeList: [],
      //全部数据
      newList: [
        { name: "vue", selected: false },
        { name: "vue-admin", checked: false },
        { name: "axios", checked: false },
        { name: "element-ui", checked: false },
        { name: "react", checked: false },
        { name: "webpack", checked: false },
        { name: "vue-x", checked: false },
        { name: "fllow author", checked: false },
        { name: "star this responsitory", checked: true },
        { name: "fork this responsitory", checked: true }
      ],
      list: [],
      activeIndex: 1
    };
  },
  components: {},
  methods: {
    //删除
    del(item, index) {
      //删除全部数据中的数据
      this.newList = this.newList.filter(item1 => {
        return item1.name !== item.name;
      });
      //删除未完成数据中的数据
      this.activeList = this.activeList.filter(item1 => {
        return item1.name !== item.name;
      });
      //删除已完成数据中的数据
      this.completeList = this.completeList.filter(item1 => {
        return item1.name !== item.name;
      });
      switch (this.activeIndex) {
        case 1:
          this.list = this.newList;
          break;
        case 2:
          this.list = this.activeList;
          break;
        default:
          this.list = this.completeList;
          break;
      }
    },
    //点击全部
    all() {
      this.activeIndex = 1;
      //显示未完成的数据
      this.list = this.newList;
    },
    //点击未完成
    active() {
      this.activeIndex = 2;
      //显示未完成的数据
      this.list = this.activeList;
    },
    //点击已完成
    completed() {
      this.activeIndex = 3;
      //显示已完成的数据
      this.list = this.completeList;
    },
    //选择checkbox的事件
    change(item, index) {
      // 如果是选中状态 删除未完成数据 给已完成数组加一条数据
      if (item.checked) {
        this.completeList.push(item);
        this.activeList=this.activeList.filter(item=>{
          return !item.checked
        })
      } else {
        this.activeList.push(item);
        this.completeList=this.completeList.filter(item=>{
          return item.checked
        })
      }
      switch (this.activeIndex) {
        case 1:
          this.list = this.newList;
          break;
        case 2:
          this.list = this.activeList;
          break;
        default:
          this.list = this.completeList;
          break;
      }
    }
  },
  mounted() {
    this.activeList=this.newList.filter(item=>{
      return !item.checked
    })
     this.completeList=this.newList.filter(item=>{
      return item.checked
    })
    this.list = this.newList;
  },
  computed: {
    num() {
      return this.activeList;
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.todolist,
.icon-xiangxia,
.check_dvs,
.footer {
  color: rgb(96, 98, 102);
}
.check_dv {
  border-top: 1px solid #ccc;
  .check_dvs {
    padding: 5px 0px;
    &:hover {
      .del {
        display: block;
      }
    }
  }
  .del {
    cursor: pointer;
    color: rgb(246, 108, 108);
    display: none;
  }
}
.footer {
  border-top: 1px solid #ccc;
  div {
    cursor: pointer;
  }
  .all {
    border: 1px solid #ccc;
    padding: 3px 10px;
  }
}
</style>