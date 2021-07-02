<template>
  <div>
    <div class=" flex-j-between a-center p-10">
      <div><i class="iconfont icon-xiangxia"></i></div>
      <div class=" f-size14 todolist">Todo List</div>
    </div>
    <div class="check_dv p-10">
      <div>
        <div>
          <!-- 如果newlist和已完成的数据都为空 则显示暂无数据 -->
          <div
            class=" t-a-center f-size14"
            v-if="newList.length === 0 && completeList.length === 0"
          >
            暂无数据...
          </div>
          <template v-else>
            <div
              class="check_el_checkbox check_dvs"
              v-for="(item, index) in newList"
              :key="item.id"
            >
              <div class="flex-j-between a-center">
                <div>
                  <el-checkbox
                    @change="change(item, index)"
                    :label="item.name"
                    v-model="item.checked"
                  ></el-checkbox>
                </div>
                <div class="del f-size12" @click="del(index,false)">X</div>
              </div>
            </div>
            <!-- 如果activeIndex等于1或者3(页面一加载和点击all的情况) 则显示已完成数据  -->
            <!-- 目的是 页面一加载和点击all  newList的数据是未完成的数据  没有已完成数据  所以这里需要把已完成的数据显示出来 -->
            <template v-if="activeIndex === 1">
              <div
                class="check_el_checkbox check_dvs"
                v-for="(item, index) in completeList"
              >
                <div class="flex-j-between a-center">
                  <div>
                    <el-checkbox
                      @change="change(item, index)"
                      :label="item.name"
                      v-model="item.checked"
                      :key="item.id"
                    ></el-checkbox>
                  </div>
                  <div class="del f-size12" @click="del(index,true)">X</div>
                </div>
              </div>
            </template>
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
      activeList: [
        { name: "vue", selected: false,id:1 },
        { name: "vue-admin", checked: false,id:2 },
        { name: "axios", checked: false ,id:3},
        { name: "element-ui", checked: false ,id:4},
        { name: "react", checked: false,id:5 },
        { name: "webpack", checked: false ,id:6},
        { name: "vue-x", checked: false,id:7 },
        { name: "fllow author", checked: false,id:8 }
      ],
      //已完成数据
      completeList: [
        { name: "star this responsitory", checked: true,id:9 },
        { name: "fork this responsitory", checked: true ,id:10}
      ],
      //页面显示数据 新数组
      newList: [],
      //记录选项的值 1:一加载|all  2:未完成  3:已完成
      activeIndex: 1
    };
  },
  components: {},
  methods: {
    //删除
    del(index,flag) {
      if (flag) {
        //删除已完成数据
        this.completeList.splice(index, 1);
      } else {
        //删除未完成数据
        this.activeList.splice(index, 1);
      }
    },
    //点击全部
    all() {
      //将activeIndex设置为1 表示点击的是all
      this.activeIndex = 1;

      //显示未完成的数据
      this.newList = this.activeList;
    },
    //点击未完成
    active() {
      //将activeIndex设置为2 表示点击的是未完成
      this.activeIndex = 2;

      //显示未完成的数据
      this.newList = this.activeList;
    },
    //点击已完成
    completed() {
      //将activeIndex设置为3 表示点击的是已完成
      this.activeIndex = 3;
      //显示已完成的数据
      this.newList = this.completeList;
    },
    //选择checkbox的事件
    change(item, index) {
      // 如果是选中状态 删除未完成数据 给已完成数组加一条数据
      console.log(item.checked);
      if (item.checked) {
        //删除未完成数据
        this.activeList.splice(index, 1);
        //给已完成数组加一条数据
        this.completeList.unshift(item)
      }else {
        //如果没有选中 删除已完成数据 给未完成数组加一条数据
         //删除已完成数据
        //给未完成数组加一条数据
        this.activeList.push(item)
        this.completeList.splice(index, 1);
      }
    }
  },
  mounted() {
    //页面一加载显示未完成的数据
    this.newList = this.activeList;
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