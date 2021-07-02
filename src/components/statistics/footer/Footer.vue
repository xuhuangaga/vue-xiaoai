<template>
  <div>
    <div ref="main" style="width:100%;height:400px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
import lodash from "lodash";
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      //显示的数据
      data: [],
      keys: [],
      //留白的数据
      data1: []
    };
  },
  components: {},
  methods: {
    bindEcharts() {
      let myEcharts = echarts.init(this.$refs.main);
      let option = {
        color: ["#5AB1EF"],
        title: {
          text: "    ",
          subtext: "           数量",
          subtextStyle: {
            fontSize: 12,
            color: "black"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var tar = params[1];
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: this.keys
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)"
            },
            emphasis: {
              itemStyle: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)"
              }
            },
            data: this.data1
          },
          {
            name: "总量",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "top",
              color: "#5AB1EF"
            },
            data: this.data
          }
        ]
      };
      myEcharts.setOption(option);
    },
    getData() {
      axios
        .get("/api/article/allArticle")
        .then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            if (res.data.data.length > 0) {
              let arr = lodash.groupBy(res.data.data, "date");
              let total = 0;
              for (let i in arr) {
                //如果时间包含年月日就做截取操作  只要年月日 不要时分秒
                if (i.includes("Z")) {
                  let temp = dayjs(i).format("YYYY年MM月DD日");
                  this.keys.push(temp);
                }else
                {
                   this.keys.push('');
                }
                this.data.push(arr[i].length);
                total += arr[i].length;
              }
              this.keys.unshift("总计");
              let num = total;
              this.data.map(item => {
                this.data1.push(num - item);
                num = num - item;
              });
              this.data.unshift(total);
              this.data1.unshift(0);
              this.bindEcharts();
            } else {
              this.$refs.main = "暂无数据";
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