<template>
  <div class="flex-j-between f-c-w">
    <div class="f-size14">欢迎{{ username }}来到小爱后台管理系统</div>
    <div class="flex f-size12">
      <div>{{greet}},亲爱的 {{ username }}</div>
      <div class=" m-l10">上次登录时间:{{ lastLoginDate }}</div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
      username: "",
      lastLoginDate: "",
      greet: ""
    };
  },
  components: {},
  methods: {},
  mounted() {
    let user = localStorage.getItem("xa_user");
    //  console.log(user);
    if (user !== null) {
      user = JSON.parse(user);
      this.username = user.username;
      this.lastLoginDate = dayjs(user.date).format(
        "YYYY年MM月DD日HH时mm分ss秒"
      );
      //获取小时
      let hour = dayjs().hour();
      if (hour >= 6 && hour < 12) {
        this.greet = "早上好";
      } else if (hour >= 12 && hour < 14) {
        this.greet = "中午好";
      } else if (hour >= 14 && hour < 18) {
        this.greet = "下午好";
      } else if (hour >= 18 && hour < 24) {
        this.greet = "晚上好";
      } else {
        this.greet = "该睡觉了";
      }
      // console.log(hour);
    }
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>