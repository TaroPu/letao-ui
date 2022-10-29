<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{active:isLogin}">
        <div class="big-contain" key="bigContainLogin" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <input type="email" placeholder="账户名" autofocus v-model="form.username">
            <!--						<span class="errTips" v-if="userNameError">* 用户名填写错误 *</span>-->
            <input type="password" placeholder="密码" v-model="form.userpwd">
            <span class="errTips" v-if="Errormsg">{{ errTips }}</span>
          </div>
          <button class="bbutton" @click="login">登录</button>
          <button class="bbutton" @click="getpassword">忘记密码</button>
        </div>


        <div class="big-contain" key="bigContainRegister" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">

            <input type="email" placeholder="手机号" v-model="form.telenumber">

            <input type="text" placeholder="用户名" v-model="form.username">


            <input type="password" placeholder="密码" v-model="form.userpwd">
            <input type="password" placeholder="确认密码" v-model="form.comfiruserpwd">
            <span class="errTips" v-if="Errormsg">{{ errTips }}</span>
          </div>
          <button class="bbutton" @click="register">注册</button>
        </div>
      </div>
      <div class="small-box" :class="{active:isLogin}">
        <div class="small-contain" key="smallContainRegister" v-if="isLogin">
          <div class="stitle">你好，朋友!</div>
          <p class="scontent">开始注册，和我们一起买买买</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" key="smallContainLogin" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">与我们保持联系，请登录你的账户</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-register',
  data() {
    return {
      isLogin: true,
      // userNameError: false,
      passwordError: false,
      existed: false,
      Errormsg: false,
      notErr: false,
      msg: '',
      errTips: '',
      form: {
        username: '',
        telenumber: '',
        userpwd: '',
        comfiruserpwd: ''
      },
      user: ''
    }
  },
  methods: {
    watchEnter(e) {
      var keyNum = window.event ? e.keyCode : e.which; //获取被按下的键值
      //判断如果用户按下了回车键（keycody=13）
      if (keyNum == 13) this.operateKey(e)
    },

    operateKey() {
      if (this.isLogin) this.login();
      else this.register();
    },

    changeType() {
      this.isLogin = !this.isLogin
      this.form.username = ''
      this.form.telenumber = ''
      this.form.userpwd = ''
    },
    login() {
      const self = this;
      if (self.form.username != "" && self.form.userpwd != "") {
        self.$axios({
          method: 'post',
          url: 'http://127.0.0.1:8080/user/login',
          headers: {"Content-Type": "application/json"},
          data: {
            "user_name": self.form.username,
            "user_password": self.form.userpwd
          }
        })
          .then(res => {
            switch (res.data.code) {
              case 666:
                self.$notify({
                  title: '成功',
                  message: '登录成功！',
                  type: 'success'
                });
                setTimeout(() => {
                  // sessionStorage.setItem("username",res.data.user.user_name);
                  // sessionStorage.setItem("userid",res.data.user.user_id);
                  sessionStorage.setItem("isLogin", this.isLogin);
                  // sessionStorage.setItem("identity",res.data.user.iden_id);
                  let arr = ['用户', '店面经理', '仓库管理员', '系统管理员'];
                  sessionStorage.setItem('identityname', arr[res.data.user.iden_id]);


                  sessionStorage.setItem('user', JSON.stringify(res.data.user));
                  //
                  // var getItem= JSON.parse(sessionStorage.getItem('user'));
                  // console.log(getItem.user_name);

                  if(res.data.user.iden_id == 0) this.$router.replace({path: "/"});
                  else {
                    sessionStorage.setItem('index','1');
                    this.$router.replace({path: "/home_service"})
                  }
                }, 300);
                break;


              case 700:
                this.errTips = '用户名或密码错误!';
                this.Errormsg = true;
                break;
            }
          })
          .catch(err => {
            self.$message({message: '网络错误！', type:'warning'});
            console.log(err);
          })
      } else {
        alert("填写不能为空！");
        this.errTips = '填写不能为空!';
        this.passwordError = true;
      }
    },
    getpassword() {
      this.$router.replace({path: "/rePassword"})
    },
    register() {
      const self = this;
      if (self.form.username != "" && self.form.telenumber != "" && self.form.userpwd != "" && self.form.comfiruserpwd != "") {
        if (self.form.userpwd == self.form.comfiruserpwd) {
          self.$axios({
            method: 'post',
            url: 'http://127.0.0.1:8080/user/register',
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
                  alert("注册成功！");
                  this.isLogin = true;
                  this.Errormsg = false;

                  // this.login();
                  break;
                case 700:
                  // alert("用户名已存在！");
                  this.errTips = '用户名已存在';
                  this.Errormsg = true;
                  break;

                case 701:
                  // alert("注册失败");
                  this.errTips = '注册失败';
                  this.Errormsg = true;
                  break;


              }
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          alert("两次密码不一致！");
          // this.errTips = '两次密码不一致';
          // this.passwordError = true;

        }
      } else {
        alert("填写不能为空！");
        // this.errTips = '填写不能为空';
        // this.passwordError = true;

      }
    }
  },
  created() {
    var self = this;
    document.addEventListener("keyup", self.watchEnter);
  },
  destroyed() {
    //移除监听回车按键
    var self = this;
    document.removeEventListener("keyup", self.watchEnter);
  },
}
</script>

<style scoped="scoped">
.login-register {
  width: 100%;
  height: 92vh;
  box-sizing: border-box;
}

.contain {
  width: 35%;
  height: 50%;
  position: relative;
  top: 55%;
  left: 25%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
  0 0 6px #f0f0f0;
}

.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}

.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}

.bform {
  width: 100%;
  height: 50%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}

.bform .msg {
  display: block;
  width: 50%;
  text-align: left;
  color: #00ff15;
  font-size: 0.7em;
  margin-left: 1em;
}

.bform input {
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}

.bbutton {
  width: 30%;
  height: 40px;
  border-radius: 24px;
  margin-bottom: 10px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}

.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 2em;
  line-height: 1.7em;
}

.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}

.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>
