<template>
  <div class="flex-j-center a-center p-t20">
    <div class=" m-r20"><img src="../../assets/404.jpg" title="页面找不到了..." /></div>
    <div>
      <div class="title f-size20 m-b20">抱歉！页面无法访问……</div>
      <div class="content f-size12 f-c-c">
        <div class=" m-b10">可能因为：</div>
        <div class=" flex a-center">
          <div class="content-tips">网址有错误></div>
          <div>请检查地址是否完整或存在多余字符</div>
        </div>
        <div class=" flex a-center">
          <div class="content-tips">网址已失效></div>
          <div>可能页面已删除，活动已下线等</div>
        </div>
        <div class=" flex a-center m-t10">
          <div>或者逛逛：</div>
          <div class="skip" @click="goHome">首页</div>
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
    return {};
  },
  components: {},
  methods: {
    //去首页
    goHome(){
      this.$router.push('/')
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.content-tips {
  color: #666;
}
.skip {
  color: rgb(89,161,211);
  cursor: pointer;
}
</style>