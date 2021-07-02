<template>
  <div>
    <div ref="main" style="width:450px;height:400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
import lodash from "lodash";
export default {
  name: "",
  props: {},
  data() {
    return {
      data: []
    };
  },
  components: {},
  methods: {
    bindEcharts() {
      let myEcharts = echarts.init(this.$refs.main);
      let option = {
        color:['#19D4AE','#5AB1EF','#FA6E86','#FFB980','#0067A6','#8975A3','#FFD700'],
        title: {
          left: "center"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {},
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: this.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      myEcharts.setOption(option);
    },
    getData() {
      axios
        .get("/api/article/allArticle")
        .then(res => {
           console.log(res);
          if (res.data.code === 200) {
            if (res.data.data.length > 0) {
              let arr = lodash.groupBy(res.data.data, "category");
              console.log(arr);
              for (let i in arr) {
                this.data.push({ name: i, value: arr[i].length });
              }
              this.bindEcharts();
            } else {
              this.$refs.main.innerText = "暂无数据";
            }
          }
        })
        .catch(error => {
          console.log(`请求失败.${error}`);
        });
    }
  },
  mounted() {
    //获取数据
    this.getData();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>