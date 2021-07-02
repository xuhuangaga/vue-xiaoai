<template>
  <div>
    <el-card class="box-card uploadPic_card p-10">
      <div slot="header" class="clearfix">
        <span>支持拖拽</span>
      </div>
      <div class="grid-content bg-purple-dark f-size14 m-b10">
        Element UI自带上传组件
      </div>
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload"
        multiple
        auto-upload
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <div class="tailoring m-t-b10">支持裁剪</div>
      <div class="grid-content bg-purple-dark f-size14 m-b10">
        vue-image-crop-upload
      </div>
      <el-button type="primary" size="mini" @click="toggleShow">上传</el-button>
      <my-upload
        field="file"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        url="/api/upload"
        :params="params"
        :headers="headers"
      ></my-upload>
      <img :src="imgDataUrl" />
    </el-card>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload/upload-2.vue";
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      show: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: ""
    };
  },
  components: { "my-upload": myUpload },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      // console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      // console.log("-------- upload success --------");
      // console.log(jsonData);
      // console.log("field: " + field);
    },
    cropUploadFail(status, field) {
      // console.log("-------- upload fail --------");
      // console.log(status);
      // console.log("field: " + field);
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.grid-content {
  height: 18px;
  background: rgb(238, 238, 238);
  padding: 15px 20px;
  width: 80%;
}
</style>