<template>
  <div class="reg flex-j-center a-center">
    <el-card class="box-card">
      <div slot="header" class="clearfix  t-a-center">
        <span class=" t-a-center">欢迎来到小爱后台管理系统</span>
      </div>
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleData"
        label-width="100px"
        class="demo-ruleForm reg-el-form-item-label"
      >
        <el-form-item label="请输入用户名" prop="username">
          <el-col :span="18">
            <el-input v-model.trim="formData.username"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-col :span="18">
            <el-input v-model.trim="formData.password" show-password></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="请输入验证码" prop="code">
          <el-col :span="18" class="flex">
            <el-input v-model.trim="formData.code"></el-input>
            <div v-html="codeData" @click="change"></div>
          </el-col>
        </el-form-item>
        <el-form-item class=" reg-el-form-item-content">
          <el-button type="primary" @click="login">立即登录</el-button>
          <el-button type="primary" @click="reg">立即注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: {},
  data() {
    return {
      codeData: "",
      formData: {
        username: "",
        password: "",
        code: ""
      },
      rules: {
        username: [
          //自定义验证用户名
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 7, message: "密码长度必须大于6位数" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    //更换验证码
    change(){
      this.getCode()
    },
    //点击注册
    reg() {
      this.$router.push("/register");
    },
    //获取验证码
    getCode() {
      axios
        .get("/api/captcha")
        .then(res => {
          if (res.status === 200) {
            this.codeData = res.data;
          }
        })
        .catch(erro => {});
    },
    //点击登录
    login() {
      //判断是否验证通过  通过就进行注册操作
      this.$refs.ruleData.validate(valid => {
        if (valid) {
          axios
            .post("/api/user/login", {
              username: this.formData.username,
              password: this.formData.password,
              code: this.formData.code
            })
            .then(res => {
              // console.log(res);
              if (res.data.code === 200) {
                this.$message.success('登录成功')
                //存储数据
                localStorage.setItem(
                  "xa_user",
                  JSON.stringify(res.data.data[0])
                );
                //跳转到首页
                this.$router.push("/");
              } else {
                this.$message.error(res.data.message)
              }
            })
            .catch(erro => {
              console.log(`请求失败.${erro}`);
            });
        } else {
          this.$message.error("表单信息输入有误...");
          return;
        }
      });
    }
  },
  mounted() {
    //获取验证码
    this.getCode();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.reg {
  background: rgb(195, 233, 236);
  min-height: 577px;
  .box-card {
    height: 350px;
    width: 600px;
  }
  .el-form-item__label {
    width: 120px;
  }
}
</style>