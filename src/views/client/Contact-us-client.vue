<template>
  <div class="Product-details-client">

    <!--    顶部导航-->
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="sub_nav">
      <ul>
        <li @click="goTo">主页</li>
        <li @click="toOrderList" style="cursor: pointer">订单</li>
        <li @click="toActivity" style="cursor: pointer">活动</li>
        <li @click="toAbout" style="cursor: pointer">关于</li>
        <li @click="" style="background-color: #b8cb37;cursor: pointer">联系我们</li>
      </ul>
    </div>
    <div class="title">
      店铺信息和联系方式
    </div>
    <div class="main">
      <div class="head">
        <span>门店</span>
        <span>门店名称</span>
        <span>门店地址</span>
        <span>联系方式</span>
      </div>
      <ul>
        <li v-for="(s,index) of store" :key="index">
          <span><img :src="s.sto_photo" :alt="s.sto_name" :title="s.sto_name"></span>
          <span>{{ s.sto_name }}</span>
          <span>{{ s.province }}{{ s.city }}{{ s.area }}{{ s.datail }}</span>
          <span>{{ s.sto_phone }}</span>
        </li>

      </ul>
    </div>





  </div>
</template>

<script>
import Nav from '@/components/nav-client'

export default {
  name: "contact-us-client",
  data() {
    return {
      store: [],
    }
  },
  methods: {
    toActivity(){
      this.$router.replace('/activity_client')
    },
    toAbout(){
      this.$router.replace('/about_client')
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
    showMsg() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/store/search',
        headers: {"Content-Type": "application/json"},
        data: {}

      })
        .then(res => {
          res.data.forEach(item=>{
            this.store.push(item);
          })
          console.log(this.store)

        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  created() {
    this.showMsg();
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

.Product-details-client {
  width: 100vw;
  /*height: 100vh;*/
  background-color: antiquewhite;
  min-height: 1700px;
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
  margin: 20px auto;;
  width: 80%;
  min-height: 300px;
  /*background-color: red;*/
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.title {
  height: 50px;
  width: 350px;
  margin: 30px auto;
  /*background-color: red;*/
  font-size: 2rem;
  text-align: justify;
  text-align-last: justify;
  font-weight: 700;
  background-color: #fad0d0;
}

.head {
  display: flex;
  justify-content: space-around;
  margin: 20px 20px;
  padding: 20px;
  height: 120px;
  background-color: #7fd299;
  border-radius: 30px;
  font-weight: 700;
}

.main ul > li {

  display: flex;
  justify-content: space-around;
  margin: 10px 20px;
  padding: 20px;
  height: 200px;
  background-color: #c9e7d5;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

}

.head span {
  height: 80px;
  line-height: 80px;
}

span {
  display: inline-block;

  height: 160px;
  /*background-color: rebeccapurple;*/
  line-height: 160px;
  text-align: center;
  font-size: 1.5rem;
}

span:nth-child(1) {
  flex: 1;
}

span:nth-child(2n) {
  flex: 2;
}

span:nth-child(3) {
  flex: 3;

}

span > img {
  height: 160px;
  width: 160px;
  border-radius: 20px;
}


</style>
