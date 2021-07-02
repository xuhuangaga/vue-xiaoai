<template>
  <div>
    <div class="title_dv flex-j-end m-b10">
      <!-- <el-button size="mini" type="danger">查看</el-button> -->
      <el-button size="mini" type="primary" @click="publish">发布</el-button>
    </div>
    <el-form
      :model="data"
      :rules="rules"
      ref="ruleData"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model.trim="data.title"></el-input>
      </el-form-item>
      <el-form-item label="文章摘要" prop="abstract">
        <el-input v-model.trim="data.abstract"></el-input>
      </el-form-item>
      <div class="flex-j-around">
        <div>
          <el-form-item label="作者" prop="author">
            <el-input v-model.trim="data.author"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="类目" prop="category">
            <el-select v-model="data.category" placeholder="请选择">
              <el-option label="Vue" value="Vue"></el-option>
              <el-option label="React" value="React"></el-option>
              <el-option label="Node.js" value="Node.js"></el-option>
              <el-option label="性能优化" value="性能优化"></el-option>
              <el-option label="JaveScript" value="JaveScript"></el-option>
              <el-option label="小程序" value="小程序"></el-option>
              <el-option label="工具类" value="工具类"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="来源" prop="source">
            <el-select v-model="data.source" placeholder="请选择">
              <el-option label="原创" value="原创"></el-option>
              <el-option label="转载" value="转载"></el-option>
              <el-option label="与他人合作" value="与他人合作"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="重要性" prop="star">
            <el-select v-model="data.star" placeholder="请选择">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="发布时间">
            <el-col>
              <el-form-item>
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="data.date"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>
      </div>
      <mavon-editor v-model.trim="data.text" />
      <div class="publich_el-form-item__content">
        <el-form-item class="t-a-center" style="margin-left:0px">
          <el-button type="primary" size="mini" @click="publish"
            >发布</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  props: {},
  data() {
    return {
      data: {
        title: "",
        abstract: "",
        author: "",
        category: "",
        source: "",
        star: "",
        date: "",
        text: ""
      },
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        abstract: [
          { required: true, message: "请输入文章摘要", trigger: "blur" }
        ],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        category: [
          { required: true, message: "请选择类目", trigger: "change" }
        ],
        source: [{ required: true, message: "请选择来源", trigger: "change" }],
        star: [{ required: true, message: "请选择重要性", trigger: "change" }]
      }
    };
  },
  components: {},
  methods: {
    //发布文章
    publish() {
      this.$refs.ruleData.validate(valid => {
        if (valid) {
          // console.log(this.data.date);
          if (!this.data.text) {
            this.$message.error("请输入文章内容");
          } else {
            axios
              .post("/api/article/create", {
                title: this.data.title,
                abstract: this.data.abstract,
                author: this.data.author,
                category: this.data.category,
                source: this.data.source,
                star: this.data.star,
                text: this.data.text,
                date: this.data.date
              })
              .then(res => {
                // console.log(res);
                if (res.data.code === 200) {
                  this.$message.success("发布成功");
                  this.$router.push('/')
                } else {
                  this.$message.error('发布失败');
                }
              })
              .catch(erro => {
                console.log(`请求失败.${erro}`);
              });
          }
        }else {
          this.$message.error("表单信息输入有误...");
          return;
        }
      });
    }
  },
  mounted() {
    
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.title_dv {
  background: #59a586;
  padding: 5px 20px;
}
</style>