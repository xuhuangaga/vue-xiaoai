<template>
  <div class="p-10">
    <div class=" m-b20">
      <img src="../../../assets/images/home.png" width="290" />
    </div>
    <div v-for="(item, index) in data" class="m-b10">
      <div class="f-size14">{{ item.name }}</div>
      <el-progress :percentage="item.progress * 100" v-if="item.progress<1"></el-progress>
      <el-progress :percentage="100" v-else status="success"></el-progress>
    </div>
  </div>
</template>

<script>
import axios from "axios";
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
    getData() {
      axios
        .get("/api/progress")
        .then(res => {
          if (res.data.code === 0) {
            this.data = res.data.data;
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
  computed: {
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>