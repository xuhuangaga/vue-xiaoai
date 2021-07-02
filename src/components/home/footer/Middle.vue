<template>
  <div>
    <div class=" flex-j-between a-center p-10">
      <div><i class="iconfont icon-xiangxia"></i></div>
      <div class=" f-size14 todolist">Todo List</div>
    </div>
    <div class="check_dv p-10">
      <div>
        <div>
          <template v-if="activeIndex === 1">
            <div
              class="check_el_checkbox check_dvs"
              v-for="(item, index) in list"
              :key="item.id"
            >
              <div class="flex-j-between a-center">
                <div>
                  <el-checkbox
                    :label="item.name"
                    v-model="item.checked"
                    :indeterminate="false"
                  ></el-checkbox>
                </div>
                <div class="del f-size12" @click="del(item, index)">X</div>
              </div>
            </div>
          </template>
          <template v-else-if="activeIndex === 2">
            <div
              class="check_el_checkbox check_dvs"
              v-for="(item, index) in list.filter(item => {
                return !item.checked;
              })"
              :key="item.id"
            >
              <div class="flex-j-between a-center">
                <div>
                  <el-checkbox
                    :label="item.name"
                    v-model="item.checked"
                    :indeterminate="false"
                  ></el-checkbox>
                </div>
                <div class="del f-size12" @click="del(item, index)">X</div>
              </div>
            </div>
          </template>
          <template v-else>
            <div
              class="check_el_checkbox check_dvs"
              v-for="(item, index) in list.filter(item => {
                return item.checked;
              })"
              :key="item.id"
            >
              <div class="flex-j-between a-center">
                <div>
                  <el-checkbox
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
        <div @click="activeItem(1)" :class="{ 'activeItem': activeIndex === 1 }">All</div>
        <div @click="activeItem(2)" :class="{ 'activeItem': activeIndex === 2 }">
          Active
        </div>
        <div @click="activeItem(3)" :class="{ 'activeItem': activeIndex === 3 }">
          Completed
        </div>
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
      //全部数据
      list: [
        { name: "vue", selected: false,id:1 },
        { name: "vue-admin", checked: false ,id:2},
        { name: "axios", checked: false,id:3 },
        { name: "element-ui", checked: false ,id:4},
        { name: "react", checked: false,id:5 },
        { name: "webpack", checked: false,id:6 },
        { name: "vue-x", checked: false,id:7 },
        { name: "fllow author", checked: false,id:8 },
        { name: "star this responsitory", checked: true ,id:9},
        { name: "fork this responsitory", checked: true ,id:10}
      ],
      activeIndex: 1
    };
  },
  components: {},
  methods: {
    //删除
    del(item, index) {
      //删除全部数据中的数据
      this.list = this.list.filter(item1 => {
        return item1.name !== item.name;
      });
    },
    //点击下面的选项卡
    activeItem(index) {
      this.activeIndex = index;
    }
  },
  mounted() {
  },
  computed: {
    num() {
      return this.list.filter(item=>{
        return !item.checked
      });
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
  .activeItem {
    border: 1px solid #ccc;
    padding: 3px 10px;
  }
}
</style>