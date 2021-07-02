<template>
  <div class="m-t20">
    <el-card>
      <div ref="main" style="height:400px" class=" t-a-center"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      date: [],
      expected: [],
      actual: [],
      titleArry:[]
    };
  },
  components: {},
  methods: {
    bindEchars() {
      let myEchars = echarts.init(this.$refs.main);
      // 指定图表的配置项和数据
      let option = {
        color:['#418BF7','#FE5889'],
        tooltip: {},
        legend: {
          data: this.titleArry.filter(item=>{return item !=="date"})
        },
        //显示在底部
        xAxis: {
          type: "category",
          data: this.date
        },
        yAxis: {},
        series: [
          {
            name: "expected",
            type: "line",
            data: this.expected,
            smooth: true
          },
          {
            name: "actual",
            type: "line",
            data: this.actual,
            smooth: true
          }
        ]
      };
      myEchars.setOption(option);
    },
    //获取数据
    getData() {
      axios
        .get("/api/homeChat")
        .then(res => {
          if (res.data.code === 0) {
            if (res.data.data.length > 0) {
              this.titleArry=Object.keys(res.data.data[0])
              res.data.data.map(item => {
                this.date.push(item.date);
                this.expected.push(item.expected);
                this.actual.push(item.actual);
              });
              this.bindEchars();
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
    this.getData();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>