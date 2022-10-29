<template>
  <div class="order">
    <!--    顶部导航-->
    <div class="maindiv"><Nav></Nav></div>
    <div class="title" @click="order_list">< <button>订单详情</button></div>
    <div class="details">
      <div class="order_box">
        <div class="goods">
          <ul v-for="(p,index) of order" :key="index">
            <li><img :src="p.pro_image"></li>
            <li>
              <h3>{{ p.pro_name }}</h3>
              <h3><span>¥ {{ p.price }}</span><span> / </span><s>¥ {{ p.zprice }}</s></h3>
            </li>
            <li>× <span>{{ p.number }}</span></li>
          </ul>
        </div>
        <div class="some_mess">
          <p>配送费： <span>¥ {{ a_method }}（{{delivery}}）</span></p>
          <p>商品总价： <span>¥ {{ parseFloat(total).toFixed(2) }}</span></p>
          <p>实付金额： <span style="color: red; font-size: 24px; font-weight: 600">¥ {{ parseFloat(total + (a_method - 0)).toFixed(2) }}</span></p>
          <p>收货信息： <span>{{ curUser.user_name }}, 86 - {{ curUser.user_phone }}</span></p>
          <p>收货地址： <span >{{ curUser.province }} {{ curUser.city }} {{ curUser.area }} {{ curUser.detail }}</span></p>
          <p>订单编号： <span>{{ orderId }}</span></p>
          <p>交易时间： <span>{{ orderTime }}</span></p>
          <p>订单状态： <span style="color: red; font-size: 24px; font-weight: 600">{{ state }}</span></p>
          <p>门店地址： <span v-if="isFromList">{{ shopName }}</span><span v-else>{{ addressShop.province }} {{ addressShop.city }} {{ addressShop.area }} {{ addressShop.detail }}</span></p>
          <p v-if="state == '已发货' || state == '已取货'">发货时间： <span>{{ deliveryTime }}</span></p>
          <p v-if="delivery != '门店自取' && (state == '已发货' || state == '已取货')">物流运单号： <span>{{ logisticsId }}</span></p>
        </div>
        <div class="some_btn">
          <!--          <button v-if="state == '已发货' || state == '已取货'">批量退款</button>-->
          <!--          <button v-if="state == '已发货' || state == '已取货'">申请售后</button>-->
          <!--          <button>查看物流</button>-->
          <button @click="comments" v-if="state == '已取货'">评价</button>
          <button style="background-color: #CBE457; color: gray; font-weight: 600" @click="order_list">返回</button>
        </div>
      </div>
    </div>
    <div style="clear: both"></div>
  </div>
</template>

<script>
import Nav from '@/components/nav-client'

export default {
  name: "Order-client",
  data(){
    return{
      // 订单状态
      state:'待发货',
      // 配送方式
      delivery:'门店自取',
      // 配送费信息
      a_method: '0.00',
      // 目前用户信息
      curUser: {},
      // 订单商品列表
      order: [],
      // 总价（不含配送费）
      total: 0,
      // 订单号
      orderId: '',
      // 下单时间
      orderTime: '',
      // 发货时间
      deliveryTime: '',
      // 物流单号
      logisticsId: '000000',
      // 门店地址
      addressShop: {},
      // 门店名称
      shopName: '',
      // 是否从订单列表跳转
      isFromList: false,
      oneOrder: [],
    }
  },
  components:{
    Nav
  },
  methods:{
    order_list(){
      this.$router.replace({path:"/order_list"})
    },
    comments(){
      sessionStorage.setItem('comment', JSON.stringify(this.oneOrder));
      this.$router.replace({path:"/comments"})
    },
  },
  created() {
    this.curUser = JSON.parse(sessionStorage.getItem('user'));
    this.isFromList = sessionStorage.getItem('isFromList');
    sessionStorage.removeItem('isFromList');

    if(this.isFromList){
      this.oneOrder = JSON.parse(sessionStorage.getItem('list_to_oneOrder'));
      this.order = this.oneOrder;
      this.delivery = this.oneOrder[0].delivery;
      this.total = this.oneOrder[0].total;
      this.orderId = this.oneOrder[0].order_id;
      this.orderTime = this.oneOrder[0].ord_time;console.log(this.oneOrder[0].sto_name);
      this.shopName = this.oneOrder[0].sto_name;
      this.state = this.oneOrder[0].ord_state;
      this.deliveryTime = this.oneOrder[0].delivery_time;
      this.logisticsId = this.oneOrder[0].delivery_id;
      if (this.delivery === '乐淘直送') {
        this.a_method = '12.00';
      } else if (this.delivery === '普通配送') {
        this.a_method = '6.00';
      } else this.a_method = '0.00';
    }
    else{
      this.order = JSON.parse(sessionStorage.getItem('thisOrder'));
      this.a_method = sessionStorage.getItem('delivery');
      this.total = JSON.parse(sessionStorage.getItem('total'));
      this.orderId = sessionStorage.getItem('order_id');
      this.orderTime = sessionStorage.getItem('order_time');
      this.addressShop = JSON.parse(sessionStorage.getItem('shop'));
      if (this.a_method === '12.00') {
        this.delivery = '乐淘直送';
      } else if (this.a_method === '6.00') {
        this.delivery = '普通配送';
      } else this.delivery = '门店自取';
    }
  },
}
</script>

<style scoped>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

li{
  list-style: none;
}

.order{
  width: 100vw;
  height: auto!important;
  background-color: antiquewhite;
  padding-bottom: 50px;
  min-height: 1000px;
}

.maindiv {
  height: 63px;
}

.title{
  width: 15%;
  height: 60px;
  font-size: 24px;
  font-weight: 600;
  margin-left: 10%;
  text-align: center;
  line-height: 60px;
  color: burlywood;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 45px;
}

.title button{
  width: 140px;
  height: 45px;
  font-size: 18px;
  border-radius: 50%;
  background-color: #CBE457;
  border: 1px solid #f3cb9e;
  cursor: pointer;
  color: gray;
}

.details{
  width: 70%;
  margin-left: 15%;
}

.order_box{
  float: left;
  background-color: #EEE0BA;
  font-size: 18px;
  border-radius: 2%;
  width: 100%;
}

.goods{
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
}

.goods ul{
  display: flex;
  justify-content: space-around;
  float: left;
  width: 100%;
  margin: 20px auto;
  background-color: #f3cb9e;
  border-radius: 2%;
}

.goods ul li:nth-of-type(1), .goods ul li:nth-of-type(3){
  float: left;
  text-align: center;
  height: 120px;
  width: 150px;
  line-height: 120px;
  font-weight: 600;
  color: dimgray;
}

.goods ul li:nth-of-type(1){
  cursor: pointer;
}

.goods ul li:nth-of-type(2){
  font-size: 14px;
  color: dimgray;
  padding: 20px;
}

.order_box .goods ul:nth-of-type(3){
  margin-bottom: 66px;
}

.goods h3{
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.goods h3:nth-of-type(2){
  margin-top: 20px;
  cursor: auto;
}

.goods h3 span:nth-of-type(1){
  color: red;
  font-size: 20px;
}

li img{
  width: 100%;
  height: 100%;
}

.some_mess{
  width: 70%;
  margin-left: 15%;
}

.some_mess p{
  margin-top: 25px;
  font-size: 18px;
}

.some_btn{
  width: 70%;
  margin-left: 15%;
  text-align: right;
  margin-top: 40px;
}

.some_btn button{
  margin:0 1% 6% 1%;
  width: 81px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 25%;
  background-color: #ff5000;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid gray;
}

</style>
