<template>
  <div>
    <el-row>
      <el-col :span="18" class="left_menu">
        <el-menu
          router
          :default-active="$route.meta.index"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/" >
            <i class="iconfont icon-shouye"></i>
            <span slot="title" class=" m-l10">首页</span>
          </el-menu-item>
          <el-menu-item index="/list">
            <i class="iconfont icon-fabu"></i>
            <span slot="title" class=" m-l10">已发布</span>
          </el-menu-item>
          <el-menu-item index="/statistics">
            <i class="iconfont icon-tongji-"></i>
            <span slot="title" class=" m-l10">统计</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="iconfont icon-fabiaowenzhang"></i>
            <span slot="title" class=" m-l10">发表文章</span>
          </el-menu-item>
          <el-menu-item index="/label">
            <i class="iconfont icon-biaoqian"></i>
            <span slot="title" class=" m-l10">标签页</span>
          </el-menu-item>
          <el-menu-item index="/exportexcel">
            <i class="iconfont icon-daochu"></i>
            <span slot="title" class=" m-l10">导出excel</span>
          </el-menu-item>
          <el-menu-item index="/pictureupload">
            <i class="iconfont icon-shangchuan"></i>
            <span slot="title" class=" m-l10">图片上传</span>
          </el-menu-item>
          <el-menu-item index="/signout">
            <i class="iconfont icon-tuichu"></i>
            <span slot="title" class=" m-l10">退出系统</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
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
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>

</style>