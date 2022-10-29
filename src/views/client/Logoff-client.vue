<template>
  <div class="retrieve-pwd">
    <div class="maindiv">
      <Nav v-if="curUser.iden_id == 0"></Nav>
      <Nav1 v-else></Nav1>
    </div>

    <div class="main">

      <!--      v-if="identity == 0"-->

      <!--      如果是用户-->
      <div v-if="curUser.iden_id == 0">
        填写并验证需注销的账号信息：
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户ID" style="width: 70%;">
            <el-input disabled v-model="curUser.user_id"></el-input>
          </el-form-item>

          <el-form-item label="用户名">
            <el-input v-model="curUser.user_name" disabled style="width: 70%;"></el-input>
          </el-form-item>

          <el-form-item label="手机号">
            <el-input v-model="form.telenumber" style="width: 70%;"></el-input>
          </el-form-item>


          <el-form-item label="密码">
            <el-input v-model="form.userpwd" style="width: 70%;"></el-input>
          </el-form-item>


          <el-form-item label="确认注销">
            <el-switch v-model="form.confirm"></el-switch>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即注销</el-button>
            <el-button @click="Cancel">取消</el-button>
          </el-form-item>
        </el-form>

      </div>

      <!--      管理员-->
      <div v-else-if="curUser.iden_id == 3">
        <span style="font-size: 1.5rem;display:inline-block;margin: 0 0 25px 10px">用户信息：</span>
        <el-table
          :data="userData"
          style="width: 100%; "
          max-height="500">
          <el-table-column
            fixed
            prop="user_id"
            label="ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="用户名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="user_phone"
            label="手机号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="user_sex"
            label="性别 "
            width="120">
          </el-table-column>

          <el-table-column
            prop="province"
            label="省份"
            width="100">
          </el-table-column>
          <el-table-column
            prop="city"
            label="城市"
            width="100">
          </el-table-column>
          <el-table-column
            prop="area"
            label="区域"
            width="100">
          </el-table-column>
          <el-table-column
            prop="detail"
            label="地址"
            width="300">
          </el-table-column>

          <el-table-column
            prop="birthday"
            label="生日"
            width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <!--            <el-button-->
              <!--              @click="deleteRow(scope.$index, userData)"-->
              <!--              type="text"-->
              <!--              size="small">-->
              <!--              注销账号-->
              <!--            </el-button>-->
              <el-popconfirm
                confirm-button-text='确定'
                cancel-button-text='取消'
                icon="el-icon-info"
                icon-color="red"
                title="确定要将该用户账号注销吗？"
                @confirm="deleteUser(scope.$index, userData)"
              >
                <!--              @confirm="deleteRow(scope.$index, userData)"-->

                <el-button slot="reference">注销账号</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      userData: [],
      name: '找回密码',
      form: {
        username: '',
        telenumber: '',
        userpwd: '',
        confirm: false,
      },
      identity: '',
      userid: '',
      username: '',
      curUser: {}
    }
  },
  methods: {
    showUser() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/search',
        headers: {"Content-Type": "application/json"},
        // data: {
        //
        // }

      })
        .then(res => {
          // console.log(res.data);
          res.data.forEach(item => {
            this.userData.push(item);
          });
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    deleteUser(index, rows) {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/deleteadmin',
        headers: {"Content-Type": "application/json"},
        data: {
          "user_id": rows[index]["user_id"]
        }

      })
        .then(res => {
          switch (res.data) {
            case 666:
              self.Sess();
              self.deleteRow(index, rows);
              break;
            case 700:
              self.msgErr();
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    Cancel() {
      this.$router.replace({path: "/personalMsg"})
    },

    toHome() {
      this.$router.replace({path: "/"})
    },
    onSubmit() {
      const self = this;

      if (self.form.telenumber != "" && self.form.userpwd != "") {
        if (self.form.confirm) {
          let user = JSON.parse(sessionStorage.getItem('user'));
          console.log(user)
          self.$axios({
            method: 'post',
            url: 'http://127.0.0.1:8080/user/deleteuser',
            headers: {"Content-Type": "application/json"},
            data: {
              "user_id": user.user_id,
              "user_password": self.form.userpwd,
              "user_phone": self.form.telenumber,
            }

          })
            .then(res => {
              switch (res.data) {
                case 666:
                  self.Sess();
                  break;
                case 700:
                  self.msgErr();
                  break;
                case 701:
                  self.msgErr1();
                  break;
                case 702:
                  self.msgErr2();
                  break;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          self.confirmErr();
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
        message: '请选择确认注销',
        type: 'warning'
      });
    },
    msgErr() {
      this.$notify.error({
        title: '错误',
        message: '注销失败！'
      });
    },
    msgErr1() {
      this.$notify.error({
        title: '错误',
        message: '注销失败！存在未完成的订单。'
      });
    },
    msgErr2() {
      this.$notify.error({
        title: '错误',
        message: '密码或电话验证错误。'
      });
    },
    Sess() {
      this.$notify({
        title: '成功',
        message: '账号注销成功！',
        type: 'success'
      });
    }


  },
  components: {
    Nav,Nav1
  },
  created() {
    this.curUser = JSON.parse(sessionStorage.getItem('user'));
    // this.identity = this.curUser.identity;
    // this.userid=this.curUser.user_id;
    // this.username = this.curUser.user_name;
    console.log("账号类型:",this.curUser.iden_id);
    console.log('用户', this.curUser);
    if (this.curUser.iden_id != 0) {

      this.showUser();
    }
  }
}
</script>

<style scoped>
* {

}

.maindiv {
  height: 63px;
}

.main {
  margin: 40px auto;
  width: 60vw;
  height: 60vh;
  background-color: #d9d3d3;
  padding: 100px;
}

.retrieve-pwd {
  background-color: #F1E1CE;
  height: 100vh;
  width: 100vw;
}


</style>
