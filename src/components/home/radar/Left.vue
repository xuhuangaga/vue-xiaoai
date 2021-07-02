<template>
  <div class="p-10">
    <div ref="main" style="width:300px;height:300px;font-size:10px"></div>
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
      indicator: [],
      legend: [],
      data1: [],
      data2: [],
      data3: [],
      titleArry:[]
    };
  },
  components: {},
  methods: {
    bindEchars() {
      // console.log(this.titleArry);
      let myEchars = echarts.init(this.$refs.main);
      let option = {
        color:['#19D4AE','#5AB1EF','#FA6E86','#FFB980','#0067A6'],
        title: {},
        legend: {
          data:this.legend
        },
        radar: {
          shape: "circle",
          indicator: this.titleArry,
          center:['50%','60%'],
          radius:'50%'
        },
        series: [
          {
            lineStyle:{
              width:1
            },
            name: "",
            type: "radar",
            data: [
              {
                value: this.data1,
                name: this.legend[0]
              },
              {
                value: this.data2,
                name: this.legend[1]
              },
              {
                 value: this.data3,
                name: this.legend[2]
              }
            ],
             symbolSize:3,
          }
        ]
      };
      myEchars.setOption(option);
    },
    //获取数据
    getData() {
      axios
        .get("/api/radarChat")
        .then(res => {
          if (res.data.code === 0) {
            //  console.log(res);
            if (res.data.data.length > 0) {
              let keys=Object.keys(res.data.data[0])
              // console.log(keys);
              this.titleArry =keys.filter(item=>{return item !=="name"}).map(item=>{
                return {name:item}
              })
              res.data.data.map(item => {
                this.legend.push(item.name);
                switch (item.name) {
                  case "Allocated Budget":
                    this.data1.push(item.sales);
                    this.data1.push(item.ministration);
                    this.data1.push(item.techology);
                    this.data1.push(item.marketing);
                    this.data1.push(item.delelopmer);
                    break;
                  case "Expected Spending":
                    this.data2.push(item.sales);
                    this.data2.push(item.ministration);
                    this.data2.push(item.techology);
                    this.data2.push(item.marketing);
                    this.data2.push(item.delelopmer);
                    break;
                  default:
                    this.data3.push(item.sales);
                    this.data3.push(item.ministration);
                    this.data3.push(item.techology);
                    this.data3.push(item.marketing);
                    this.data3.push(item.delelopmer);
                    break;
                }
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