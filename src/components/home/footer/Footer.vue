<template>
  <div>
    <div class="m-t20">
    <el-row :gutter="20">
      <el-col :span="11">
        <div class="grid-content bg-purple">
          <Left></Left>
        </div>
      </el-col>
       <el-col :span="6"  style="padding-left:0px">
        <div class="grid-content bg-purple">
          <Middle></Middle>
        </div>
      </el-col>
      <el-col :span="7"  style="padding-left:0px">
        <div class="grid-content bg-purple">
          <Right></Right>
        </div>
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import Left from './Left'
import Middle from './Middle'
import Right from './Right'
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {
    Left,
    Middle,
    Right
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #fff;
}
.bg-purple {
  background: #fff;
}
.bg-purple-light {
  background: #fff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.radar_dv {
  background: #fff;
  border-radius: 4px;
  padding-top: 10px;
}
</style>