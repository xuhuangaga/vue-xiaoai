<template>
  <div class="">
    <el-button type="primary" size="mini" @click="goBack">返回</el-button>
    <div class=" t-a-center f-size20 f-w-bold m-b20">{{title}}</div>
    <div class=" t-a-center f-size16 m-t-b10">摘要:{{abstract}}</div>
    <div class="t-a-center f-size12 date">{{getDate(date)}}</div>
    <div v-html="text" class="content p-10 markdown-body"></div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from 'axios';
export default {
  name: '',
  props:{},
  data () {
    return {
      title:'',
      abstract:'',
      date:'',
      text:'',
      id:''
    }
  },
  components: {},
  methods: { 
    //点击返回
    goBack(){
      this.$router.back()
    },
    //根据传入的时间 转成年月日时分秒格式
    getDate(date) {
      return dayjs(date).format("YYYY年MM月DD日HH时mm分ss秒");
    },
    //获取单个文章的信息
    getData() {
      if (this.id) {
        axios
          .post("/api/article/article", {
            _id: this.id
          })
          .then(res => {
            console.log(res);
            if (res.data.code === 200) {
              let data = res.data.data;
              this.title = data.title;
              this.abstract = data.abstract;
              this.text = data.text;
              this.date = data.date;
            }
          })
          .catch(error => {
            console.log(`请求失败.${error}`);
          });
      }
    }
    },
  mounted() {
    this.id = this.$route.query.id;
    console.log( this.id);
    this.getData()
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
@import '../../styles/github-markdown';
.date {
  color: #ccc;
}
.content {
  border: 1px solid rgb(236,236,236);
  border-radius: 5px;
  background: rgb(251,251,251);
  margin-top: 10px;
  min-height: 300px;
}
</style>