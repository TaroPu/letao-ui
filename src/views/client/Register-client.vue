<template>
  <div class="login-client">
    <div class="nav">
      <button @click="toHome">首页</button>
    </div>
    <div class="main">


      <div class="logo"><img src="src/assets/Images/Home/logo.png"></div>
      <div class="contaion">
        <div class="name">{{name}}</div>
        手机号
  <!--      <input type="">-->

        <input placeholder="手机号"><br>
        用户名<input placeholder="用户名"><br>
        密码<input type="password" placeholder="密码"><br>
        确认密码<input type="password" placeholder="确认密码"><br>
        <button class="register">注册</button>
        <button class="cancel">取消</button><br>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Regist-User',
  props: {
    msg: String,


  },
  data(){
    return{
      name:'用户注册'
    }
  },
  methods:{
    toHome(){
      this.$router.replace({path:"/"})
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing: border-box;
  margin: 0;
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
 .name {
   font-size: 25px;
   font-weight: 700;
 }
 .contaion{
   /*position: absolute;*/
   width: 600px;
   height: 350px;
   background-color: #efd5d5;
   border-radius: 30px;
   /*padding-top: 20px;*/
   margin-left: 80px;

 }
 .contaion input{
   width: 300px;
   height: 40px;
   margin: 10px 20px;
 }
 .logo{
   /*position: absolute;*/
   /*left: 200px;*/
   margin-left: -700px;
 }

.contaion button{
  margin: 10px 10px;
  width: 100px;
  height: 30px;
}
.main{
  /*overflow: hidden;*/
  width: 100%;
  height: 700px;
  /*background-image: url("src/assets/register.jpg");*/
  background-repeat: no-repeat;
  background-size: cover;

}

</style>
