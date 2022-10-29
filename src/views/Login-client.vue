
<template>
  <div class="login-client">

    <Nav></Nav>
    <img class="logo" src="../assets/Images/Home/logo.png" width="300px">

      <Login></Login>


  </div>
</template>



<script>
import Login from '@/components/loginRegister'
import Nav from '@/components/nav-client'
export default {
  name: 'Login-User',
  props: {
    msg: String
  },
  components:{
    Login,
    Nav
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
  /*float: left;*/
  position: relative;
  height: 8vh;
  background-color: #b3da72;
}
.nav button{
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
.logo {
  position: absolute;
  margin-top: 63px;
  left: 10%;
  width: 30%;
  /*height: 12vh;*/
}

</style>
