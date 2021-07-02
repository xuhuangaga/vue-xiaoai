<template>
  <div class="p-10">
    <div ref="main" style="width:360px;height:300px;font-size:10px"></div>
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
      date: [],
      data: [],
      titleArry:[]
    };
  },
  components: {},
  methods: {
    bindEchars() {
      let myEchars = echarts.init(this.$refs.main);
      let option = {
        color:['#19D4AE','#5AB1EF'],
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["week", this.titleArry[1], this.titleArry[2]],
           source: this.data,
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [
          {
            type: "bar"
          },
          { type: "bar" }
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
              this.titleArry =Object.keys(res.data.data[0])
              res.data.data.map(item => {
                this.date.push(item.date);
                this.data.push({
                  week: item.date,
                  expected: item.expected,
                  actual: item.actual
                });
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