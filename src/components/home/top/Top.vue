<template>
  <div class="m-t20">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple flex-j-between p-10 a-center">
          <div><i class="iconfont icon-yonghu"></i></div>
          <div class="f-size12">
            <div class="color_c">New Visits</div>
            <div class="f-size14  color_e m-t10">
              <CountTo
                :startVal="startVal"
                :endVal="visits"
                :duration="2000"
              ></CountTo>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple flex-j-between p-10 a-center">
          <div><i class="iconfont icon-icon_huabanfuben"></i></div>
          <div class="f-size12">
            <div class="color_c">Message</div>
            <div class="f-size14  color_e m-t10">
              <CountTo
                :startVal="startVal"
                :endVal="messages"
                :duration="2000"
              ></CountTo>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple flex-j-between p-10 a-center">
          <div><i class="iconfont icon-jiage"></i></div>
          <div class="f-size12">
            <div class="color_c">Purchases</div>
            <div class="f-size14 color_e m-t10">
              <CountTo
                :startVal="startVal"
                :endVal="purchases"
                :duration="2000"
              ></CountTo>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple flex-j-between p-10 a-center">
          <div><i class="iconfont icon-gouwuche"></i></div>
          <div class="f-size12">
            <div class="color_c">Shopping</div>
            <div class="f-size14 color_e m-t10">
              <CountTo
                :startVal="startVal"
                :endVal="shopping"
                :duration="2000"
              ></CountTo>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import axios from 'axios'
export default {
  name: "",
  props: {},
  data() {
    return {
      startVal: 0,
      messages: 0,
      purchases:0,
      shopping:0,
      visits:0
    };
  },
  components: { CountTo },
  methods: {
    //请求数据
    getData() {
      axios
        .get("/api/homeData")
        .then(res => {
          // console.log(res);
          if(res.data.code===0){
            this.messages=res.data.data.messages
            this.purchases=res.data.data.purchases
            this.shopping=res.data.data.shopping
            this.visits=res.data.data.visits
          }
        })
        .catch(error => {
          console.log(`请求失败.${erro}`);
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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #fff;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #fff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  height: 60px;
  padding: 5px 20px;
  .color_c {
    color: rgb(158, 158, 158);
  }
  .color_e {
    color: #666;
  }
  .iconfont {
    font-size: 40px;
  }
  .icon-yonghu {
    color: rgb(68, 200, 197);
  }
  .icon-icon_huabanfuben {
    font-size: 45px !important;
    color: rgb(59, 162, 244);
  }
  .icon-jiage {
    color: rgb(243, 93, 117);
  }
  .icon-gouwuche {
    color: rgb(254, 186, 133);
  }
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>