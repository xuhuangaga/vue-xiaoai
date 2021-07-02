<template>
  <div class="welcome t-a-center">
    <div class=" f-size20 f-w-bold  ">期待您的下次光临</div>
    <div><el-button @click="signOut" type="primary">确定退出</el-button></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    signOut() {
      axios
        .get("/api/user/logout")
        .then(res => {
          // console.log(res);
          if (res.data.code === 0) {
            localStorage.removeItem("xa_user");
            this.$router.push("/login");
          }
        })
        .catch(erro => {
          console.log(`请求失败.${error}`);
        });
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.welcome {
  margin-top: 60px;
  .el-button {
    margin-top: 10px;
  }
}
</style>