<template>
  <div class="order_list">
    <!--    顶部导航-->
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="sub_nav">
      <ul>
        <li @click="goTo" style="cursor: pointer">主页</li>
        <li @click="" style="cursor: pointer; background-color: #b8cb37">订单</li>
        <li @click="toActivity" style="cursor: pointer">活动</li>
        <li @click="toAbout" style="cursor: pointer">关于</li>
        <li @click="toCantact" style="width: 90px; cursor: pointer">联系我们</li>
      </ul>
    </div>
    <div class="list" v-for="(p, key) of orderList" :key="key">
      <div class="one_list" @click="order(key)">
        <img src="../../assets/Images/Home/shop.png" style="margin-left: 2%"> <span>{{ p[0].sto_name }}</span> > <span class="state">{{ p[0].ord_state }}</span>
        <ul v-for="(q, index) of p" :key="index">
          <li><img :src="q.pro_image"></li>
          <li>
            <h3>{{ q.pro_name }}</h3>
            <h3><span>¥ {{ parseFloat(q.price).toFixed(2) }}</span><span> / </span><s>¥ {{ parseFloat(q.zprice).toFixed(2) }}</s></h3>
          </li>
          <li>× <span>{{ q.number }}</span></li>
        </ul>
        <p>实付款： <span>¥ {{ p[0].total }}</span></p>
        <div class="some_btn">
          <button v-if="p[0].ord_state == '已发货'" @click.stop="finish(key)">确认收货</button>
          <button v-if="p[0].ord_state == '已取货'" @click.stop="comments(key)">评价</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav-client'

export default {
  name: "Orderlist-client",
  components: {
    Nav
  },
  data(){
    return{
      curUser: {},
      orderList: [],
    }
  },
  methods: {
    finish(key){

      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/corder/shouhuo',
        headers: {"Content-Type": "application/json"},
        data: {
          "order_id": this.orderList[key][0].order_id,
        },
      }).catch(err => {
        console.log(err)
      })
      this.orderList[key][0].ord_state = '已取货';
    },
    toActivity(){
      this.$router.replace('/activity_client')
    },
    toAbout(){
      this.$router.replace('/about_client')
    },
    goTo() {
      //直接跳转
      this.$router.replace('/');
    }, toCantact() {
      this.$router.replace('/contact_us');
    },
    comments(key){
      sessionStorage.setItem('key', key);
      sessionStorage.setItem('comment', JSON.stringify(this.orderList[key]));
      this.$router.replace({path:"/comments"})
    },
    order(key) {
      sessionStorage.setItem('isFromList',"true");
      sessionStorage.setItem('list_to_oneOrder', JSON.stringify(this.orderList[key]));
      this.$router.replace({path: "/order"});
    },
    showMsg() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/corder/userorder',
        headers: {"Content-Type": "application/json"},
        data: {
          "user_id": this.curUser.user_id,
        },
      }).then(res => {
        self.orderList = res.data;
        console.log(self.orderList);
      }).catch(err => {
        console.log(err)
      })
    },
  },
  created() {
    this.curUser = JSON.parse(sessionStorage.getItem('user'));
    this.showMsg();
  },

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

.order_list {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: antiquewhite;
  padding-bottom: 50px;
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

.one_list {
  width: 80%;
  margin-left: 10%;
  margin-top: 80px;
  background-color: #EEE0BA;
  border-radius: 2%;
  cursor: pointer;
  padding: 20px;
}

.one_list span {
  font-size: 24px;
  text-align: left;
}

.state {
  height: 50px;
  float: right;
  text-align: center;
  line-height: 50px;
  margin-right: 13%;
  color: #ff5000;
  font-weight: 600;
}

.one_list img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}

.one_list ul {
  display: flex;
  justify-content: space-around;
  float: left;
  width: 100%;
  margin: 20px auto;
  background-color: pink;
  border-radius: 2%;
}

.one_list ul li:nth-of-type(1), .one_list ul li:nth-of-type(3) {
  float: left;
  text-align: center;
  height: 120px;
  width: 150px;
  line-height: 120px;
  font-weight: 600;
  color: dimgray;
}

.one_list ul li:nth-of-type(2) {
  font-size: 14px;
  color: dimgray;
  padding: 20px;
}

.one_list ul:nth-of-type(3) {
  margin-bottom: 66px;
}

.one_list ul li h3 {
  height: 30px;
  text-align: center;
  line-height: 30px;
}

.one_list ul li h3:nth-of-type(2) {
  margin-top: 20px;
}

.one_list ul li h3 span:nth-of-type(1) {
  color: red;
  font-size: 20px;
}

.one_list ul li img {
  width: 100%;
  height: 100%;
}

.one_list p {
  text-align: right;
  font-size: 18px;
  margin-right: 6%;
}

.one_list p span {
  color: red;
  font-size: 24px;
  font-weight: 600;
}

.some_btn {
  width: 90%;
  margin-left: 5%;
  text-align: right;
  margin-top: 40px;
}

.some_btn button {
  margin: 0 1% 0 1%;
  width: 81px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 25%;
  background-color: #CBE457;
  color: gray;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid gray;
}
</style>
