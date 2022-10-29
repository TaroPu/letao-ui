
<template>
  <div class="login-client">
    <div class="nav">
      <button @click="home">首页</button>
    </div>
    <img src="src/assets/Images/Home/logo.png" width="300px" style="margin-top: 63px">


      <Login></Login>


  </div>
</template>

<script>
import Login from '@/components/loginRegister'
export default {
  name: 'Login-User',
  props: {
    msg: String
  },
  components:{
    Login,
  },
  data(){
    return{
      name:'用户登录',
      formValidate:{
        userName:'',
        password:''
      },
      ruleValidate: {
        userName: [
          { required: true, message: '账号名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
    }
  },
  methods:{
    home(){
      this.$router.replace({path:"/",query:{keyword:'cc'}})
    },
    submit(){
        alert('兄弟你要登录啊');
    },
    register(){
      alert('来了来了，靓仔要注册了');
    },
    getpassword(){
      alert('你怎么又忘记密码了');
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.login-client{
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/Images/Background/login.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.nav{
  position: relative;
  height: 60px;
  background-color: #b3da72;
}
.nav button{
  /*position: relative;*/
  position: absolute;
  top: 10px;
  right: 30px;
  width: 80px;
  height: 40px;
  border-radius: 10px;
  font-size: 25px;
  background-color: #7bc72d;
  border:solid 2px transparent;
}
/*.name {*/
/*  font-size: 25px;*/
/*  font-weight: 700;*/
/*}*/
/*.contaion{*/
/*  !*position: absolute;*!*/
/*  width: 500px;*/
/*  height: 300px;*/
/*  background-color: #efd5d5;*/
/*  border-radius: 30px;*/
/*  padding-top: 20px;*/
/*  margin-left: 5%;*/

/*}*/
/*.contaion input{*/
/*  width: 300px;*/
/*  height: 40px;*/
/*  margin: 10px 20px;*/
/*}*/
/*.logo{*/
/*  !*position: absolute;*!*/
/*  !*left: 200px;*!*/
/*  margin-left: -700px;*/
/*}*/

/*.contaion button{*/
/*  margin: 10px 10px;*/
/*  width: 80px;*/
/*  height: 30px;*/
/*}*/

/*.contaion .login{*/
/*  width: 250px;*/
/*  height: 40px;*/
/*}*/
/*.main{*/
/*  !*overflow: hidden;*!*/

/*  background-image: url("../assets/login.jpg");*/
/*  background-repeat: no-repeat;*/
/*  background-size: 100% 100%;*/
/*}*/
</style>
