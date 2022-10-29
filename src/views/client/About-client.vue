<template>
  <div class="About-client">

    <!--    顶部导航-->
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="sub_nav">
      <ul>
        <li @click="goTo">主页</li>
        <li @click="toOrderList" style="cursor: pointer">订单</li>
        <li @click="toActivity" style="cursor: pointer">活动</li>
        <li @click="" style="cursor: pointer;background-color: #b8cb37;">关于</li>
        <li @click="toCantact" style="cursor: pointer">联系我们</li>
      </ul>
    </div>

    <div class="main">
      <div class="logo">
        <img src="../../assets/Images/Home/logo.png">
      </div>

      <div class="message"><span>{{msg}}</span></div>

    </div>
    <div class="div" style="height: 5px"><hr><hr><hr><hr></div>

    <div class="footer">
    <div>{{right}} &copy; {{group}}</div>
    </div>

  </div>
</template>

<script>
import Nav from '@/components/nav-client'

export default {
  name: "contact-us-client",
  data() {
    return {
      // logo:''
      msg:'乐淘电子商务系统将会为消费者提供一个可靠、便利的购物平台，并根据用户的喜好制定专属的商品推荐，提供自取或送货上门等人性化服务，简化商家的管理，拓宽市场和销售渠道，改变人们的消费方式和商户的经营模式，成为国民经济的重要增长点。\n',
      right:'炫酷乐淘电子商务系统 ' ,
      group:'炫酷乐淘第6组'
    }
  },
  methods: {
    toActivity(){
      this.$router.replace('/activity_client')
    },
    toOrderList() {
      this.$router.replace('/order_list')
    },
    goTo() {
      //直接跳转
      this.$router.replace('/');
    },
    toDetail() {
      this.$router.replace('/purchaseNav');
    },
    toCantact() {
      this.$router.replace('/contact_us');
    },

  },
  components: {
    Nav
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.About-client {
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
}


.maindiv {
  height: 63px;
}

.sub_nav {
  position: relative;

  height: 42px;
  width: 100%;
  background-color: #CBE457;
}

.sub_nav ul {
  display: flex;
  justify-content: space-around;
  float: left;
  width: 990px;
  position: absolute;
  left: 50%;
  margin-left: -495px;
  font-size: 21px;
  color: white;
}

.sub_nav ul li {
  float: left;
  width: 10vw;
  text-align: center;
  line-height: 42px;
}

.main {
  display: flex;
  /*flex-direction: column;*/
  width: 1500px;
  margin: 50px auto;
  height: 500px;
  /*background-color: #c24545;*/
}

.logo {
  width: 900px;
  /*background-color: #988b8b;*/
}

.logo img {
  width: 100%;
}

.message {
  width: 600px;
  padding: 50px 20px 5px 20px;
}
.message>span {
  display: inline-block;
  font-size: 30px;
  text-indent: 2em;
  line-height: 2em;
}
.footer {
  flex: 1;
  width: 100%;
  background-color: #e7e1e1;
}

.footer div{
  /*display: inline-block;*/
  width: 600px;
  height: 50px;
  margin: 20px auto;
  font-size: 22px;
  text-align: center;
  line-height: 50px;
}
</style>
