<template>
  <div class="retrieve-pwd">
    <div class="maindiv">

      <Nav v-if="this.isnull"></Nav>
      <Nav v-else-if="this.curUser.iden_id == 0"></Nav>
      <Nav1 v-else></Nav1>
    </div>

    <div class="main">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户ID">
          <el-input v-if="isnull"  v-model="form.user_id"></el-input>
          <el-input v-else disabled v-model="curUser.user_id"></el-input>
        </el-form-item>

        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.telenumber"></el-input>
        </el-form-item>

        <el-form-item label="设置密码">
          <br>
          <el-form-item label="新密码">
            <el-input v-model="form.userpwd"></el-input>
          </el-form-item>

          <el-form-item label="确认密码">
            <el-input v-model="form.confirmuserpwd"></el-input>
          </el-form-item>
        </el-form-item>

        <el-form-item label="确认修改">
          <el-switch v-model="form.confirm"></el-switch>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即设置</el-button>
          <el-button @click="Cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>


  </div>
</template>

<script>
import Nav from '@/components/nav-client'
import Nav1 from '@/components/nav-service'

export default {
  name: "Retrieve-password-client"
  ,
  data() {
    return {
      curUser: {iden_id :0},
      name: '找回密码',
      form: {
        user_id:'',
        username: '',
        telenumber: '',
        userpwd: '',
        confirmuserpwd: '',
        confirm: false,
      },

      isErr: false,
      isnull:false,

    }
  },
  methods: {
    toLogin() {
      this.$router.replace('/login');
    },
    Cancel() {
      if(this.isnull) this.$router.replace('/login');
      else this.$router.replace({path:"/personalMsg"})
    },

    toHome() {
      this.$router.replace({path: "/"})
    },
    onSubmit() {
      console.log(this.form.confirm);
      const self = this;


      if (self.form.username != "" && self.form.telenumber != "" && self.form.userpwd != "" && self.form.confirmuserpwd != "") {
        if (self.form.userpwd == self.form.confirmuserpwd) {
          if (self.form.confirm) {
            self.$axios({
              method: 'post',
              url: 'http://127.0.0.1:8080/user/change',
              headers: {"Content-Type": "application/json"},
              data: {
                "user_name": self.form.username,
                "user_password": self.form.userpwd,
                "user_phone": self.form.telenumber,
              }

            })
              .then(res => {
                switch (res.data) {
                  case 666:
                    self.Sess();
                    setTimeout(() => {
                      self.$router.replace('/login');
                    }, 1000);

                    break;
                  case 700:
                    self.msgErr();
                    break;
                }
              })
              .catch(err => {
                console.log(err);
              })
          } else {
            self.confirmErr();
          }
        } else {
          self.pwdErr();
        }
      } else {
        self.writeErr();
      }
    },
    pwdErr() {
      this.$notify({
        title: '警告',
        message: '密码不一致',
        type: 'warning'
      });
    },
    writeErr() {
      this.$notify({
        title: '警告',
        message: '填写不能为空!',
        type: 'warning'
      });
    },
    confirmErr() {
      this.$notify({
        title: '警告',
        message: '请选择确认修改',
        type: 'warning'
      });
    },
    msgErr() {
      this.$notify.error({
        title: '错误',
        message: '验证信息填写错误！'
      });
    },
    Sess() {
      this.$notify({
        title: '成功',
        message: '密码设置成功！',
        type: 'success'
      });
    }


  },
  created() {
    this.curUser = JSON.parse(sessionStorage.getItem('user'));
    if(!this.curUser) this.isnull = true;
  },
  components: {
    Nav,Nav1
  }
}
</script>

<style scoped>
.maindiv {
  height: 63px;
}

.main {
  margin: 50px auto;
  width: 50vw;
  height: 50vh;
  background-color: #d9d3d3;
  padding: 100px;
}

.retrieve-pwd {
  background-color: #F1E1CE;
  height: 100vh;
  width: 100vw;
}

</style>
