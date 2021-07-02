<template>
  <div>
    <el-container>
      <el-header><Top></Top></el-header>
      <el-container>
        <el-aside width="200px" class="left_el-aside"><Left></Left></el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Top from "../../components/top/Top";
import Left from "../../components/left/Left";
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    Top,
    Left
  },
  methods: {},
  mounted() {
    
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.el-header {
  background: rgb(46, 94, 133);
  line-height: 60px;
}
.el-main {
  margin-left: -50px;
}
.el-main {
  background: rgb(240,242,245);
}
</style>