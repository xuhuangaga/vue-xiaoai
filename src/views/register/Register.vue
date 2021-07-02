<template>
  <div class="reg flex-j-center a-center">
    <el-card class="box-card">
      <div slot="header" class="clearfix  t-a-center">
        <span class=" t-a-center">欢迎来到小爱后台管理系统</span>
      </div>
      <el-form
        :model="data"
        :rules="rules"
        ref="ruleData"
        label-width="100px"
        class="demo-ruleForm reg-el-form-item-label"
      >
        <el-form-item label="请输入用户名" prop="username">
          <el-col :span="18">
            <el-input v-model.trim="data.username"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-col :span="18">
            <el-input v-model.trim="data.password" show-password></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="请输入确认密码" prop="rePassword" required>
          <el-col :span="18">
            <el-input v-model.trim="data.rePassword" show-password></el-input>
          </el-col>
        </el-form-item>
        <el-form-item class=" reg-el-form-item-content">
          <el-button type="primary" @click="reg">立即注册</el-button>
          <el-button type="primary" @click="login">立即登录</el-button>
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
    //验证用户名
    let checkUserName = (rule, value, callback) => {
      let regex = /^[a-zA-Z0-9_-]{4,16}$/;
      if (!regex.test(value)) {
        return callback(new Error("请输入4到16位（字母，数字，下划线，减号）"));
      } else {
        return callback();
      }
    };
    //验证确认密码
    let checkRePassword = (rule, value, callback) => {
      if (value != this.data.password) {
        return callback(new Error("确认密码和密码必须输入一致"));
      } else {
        return callback();
      }
    };
    return {
      data: {
        username: "",
        password: "",
        rePassword: ""
      },
      rules: {
        username: [
          //自定义验证用户名
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: checkUserName, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 7, message: "密码长度必须大于6位数" }
        ],
        //自定义验证确认密码
        rePassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: checkRePassword, trigger: "blur" },
          { min: 7, message: "确认密码长度必须大于6位数" }
        ]
      }
    };
  },
  components: {},
  methods: {
    //点击注册
    reg() {
      //判断是否验证通过  通过就进行注册操作
      this.$refs.ruleData.validate(valid => {
        if (valid) {
          axios
            .post("/api/user/register", {
              username: this.data.username,
              password: this.data.password
            })
            .then(res => {
              //  console.log(res);
              if (res.data.code === 200) {
                this.$message.success('注册成功,请登录')
                this.$router.push("/login");
              } else {
                this.$message.error(res.data.message)
              }
            })
            .catch(erro => {
              console.log(`请求失败.${erro}`);
            });
        }else
        {
           this.$message.error('表单信息输入有误...')
           return 
        }
      });
    },
    //点击登录
    login() {
      this.$router.push("/login");
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.reg {
  background: rgb(195, 233, 236);
  height: 577px;
  .box-card {
    height: 350px;
    width: 600px;
  }
  .el-form-item__label {
    width: 120px;
  }
}
</style>