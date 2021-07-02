<template>
  <div class="p-10">
    <div ref="main" style="width:340px;height:300px;font-size:10px"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
export default {
  name: "",
  props: {},
  data() {
    return {
      data:[]
    };
  },
  components: {},
  methods: {
    bindEchars() {
      let myEchars = echarts.init(this.$refs.main);
      let option = {
        color:['#19D4AE','#5AB1EF','#FA6E86','#FFB980','#0067A6'],
        legend: { 
        },
        toolbox: {
          show: true,
          feature: {
          }
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [20, 70],
            center: ["45%", "60%"],
            roseType: "area",
            itemStyle: {
              borderRadius:1
            },
            data: this.data
          }
        ]
      };
      myEchars.setOption(option);
    },
    //获取数据
    getData() {
      axios
        .get("/api/ringChat")
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            if (res.data.data.length > 0) {
              res.data.data.map(item => {
                this.data.push({'name':item.name,'value':item.data})
              });
              this.bindEchars();
            } else {
              this.$refs.main.innerText = "暂无数据";
            }
          }
        })
        .catch(erro => {
          console.log(`请求失败.${erro}`);
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