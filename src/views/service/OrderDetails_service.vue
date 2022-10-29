<template>
  <div class="orderDetails">

    <div class="maindiv">
      <Nav></Nav>
    </div>

    <div class="showOrderId">
      <ul style="height: 88px; line-height: 50px">
        <li><img src="../../assets/Images/Orders/order.png"> 订单编号： {{orderId}}</li>
        <li v-if="state != '待发货' && delivery != '门店自取'"><img src="../../assets/Images/Orders/delivery.png"> 物流单号： {{logisticsId}}</li>
      </ul>
    </div>

    <div class="littleNav">
      <ul style="height: 50px; line-height: 50px">
        <li>商品图片</li>
        <li>商品编号</li>
        <li>商品名称</li>
        <li>商品价格</li>
        <li>购买数量</li>
        <li>商品库存</li>
      </ul>
    </div>

    <div class="goods">
      <ul v-for="(p, index) of oneOrder" :key="index">
        <li><img :src="p.pro_image"></li>
        <li>{{ p.pro_id }}</li>
        <li>{{ p.pro_name }}</li>
        <li ><span>¥ {{parseFloat(p.price).toFixed(2)}}</span><span> / </span><s>¥ {{ parseFloat(p.zprice).toFixed(2) }}</s></li>
        <li>{{ p.number }}</li>
        <li>{{ p.pro_num }}</li>
      </ul>
    </div>

    <div class="someDetails">
      <p>用 户 备 注 ： <span  style="color: #46a1ef; font-size: 24px; font-weight: 600">{{remark}}</span></p>
      <p>配 送 方 式 ： <span>{{delivery}}</span></p>
      <p>支 付 方 式 ： <span style="color: red; font-size: 24px; font-weight: 600">{{payType}}</span></p>
      <p>实 付 金 额 ： <span style="color: red; font-size: 24px; font-weight: 600">¥ {{ parseFloat(total).toFixed(2) }}</span></p>
      <p>收 货 信 息 ： <span>{{ userName }}, 86 - {{ userPhone }}</span></p>
      <p>收 货 地 址 ： <span>{{ addressUser }}</span></p>
      <p>订 单 编 号 ： <span>{{ orderId }}</span></p>
      <p>交 易 时 间 ： <span>{{ orderTime }}</span></p>
      <p>订 单 状 态 ： <span style="color: red; font-size: 24px; font-weight: 600">{{ state }}</span></p>
      <p>门 店 地 址 ： <span>{{ shop }}</span></p>
      <p v-if="state == '已发货' || state == '已取货'">发 货 时 间 ： <span>{{ deliveryTime }}</span></p>
      <p v-if="delivery != '门店自取' && (state == '已发货' || state == '已取货')">物 流 单 号 ： <span>{{ logisticsId }}</span></p>
      <button class="return" @click="returnList">返 回</button>
    </div>



  </div>
</template>

<script>
import Nav from '@/components/nav-service'
export default {
  name: "OrderDetails_service",
  components: {
    Nav
  },
  data(){
    return{
      oneOrder: [],
      // 订单状态
      state:'待发货',
      // 配送方式
      delivery:'门店自取',
      // 配送费信息
      a_method: '0.00',
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
      // 门店
      shop: '',
      // 收货地址
      addressUser: '',
      // 付款方式
      payType: '',
      type: 0,
      // 备注
      remark: '',
      userName: '',
      userPhone: '',
    }
  },
  methods:{
    returnList(){
      sessionStorage.removeItem('moreMess');
      this.$router.replace('/retrieveOrder_service');
    }

  },
  created() {

    this.oneOrder = JSON.parse(sessionStorage.getItem('moreMess'));
    this.delivery = this.oneOrder[0].delivery;
    this.total = this.oneOrder[0].total;
    this.orderId = this.oneOrder[0].order_id;
    this.logisticsId = this.oneOrder[0].delivery_id;
    this.orderTime = this.oneOrder[0].ord_time;
    this.shop = this.oneOrder[0].sto_name;
    this.orderTime = this.oneOrder[0].ord_time;
    this.deliveryTime = this.oneOrder[0].delivery_time;
    this.addressUser = this.oneOrder[0].province + ' ' + this.oneOrder[0].city + ' ' + this.oneOrder[0].area + ' ' + this.oneOrder[0].detail;
    this.type = this.oneOrder[0].paytype;
    this.remark = this.oneOrder[0].remark;
    this.state = this.oneOrder[0].ord_state;
    this.userName = this.oneOrder[0].user_name;
    this.userPhone = this.oneOrder[0].user_phone;

    if (this.delivery === '乐淘直送') {
      this.a_method = '12.00';
    } else if (this.delivery === '普通配送') {
      this.a_method = '6.00';
    } else this.a_method = '0.00';

    if (this.type === '1') {
      this.payType = '银联支付';
    } else if (this.type === '2') {
      this.payType = '支付宝';
    } else if (this.type === '3') {
      this.payType = '微信支付';
    } else if (this.type === '4') {
      this.payType = 'applePay';
    }

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

.orderDetails {
  width: 100vw;
  /*height: 100vh;*/
  background-color: antiquewhite;
  min-height: 1300px;
}

.showOrderId ul{
  display: flex;
  justify-content: space-around;
  float: left;
  width: 100%;
  margin: 20px auto;
  font-size: 21px;
}

.showOrderId ul li{
  width: 45%;
  background-color: #FFFFFF;
  height: 88px;
  line-height: 88px;
  text-align: center;
  border-radius: 50%;
  font-size: 21px;
  vertical-align: middle;
}

.showOrderId img{
  width: 50px;
  height: 50px;
  vertical-align: middle;
}

.maindiv {
  height: 63px;
}

.littleNav, .showOrderId{
  width: 80%;
  margin: 0 auto;
}

.littleNav ul li {
  font-weight: 600;
}

.goods{
  flex:1;
  width: 80%;
  margin: 0 auto 150px auto;
}

.goods ul, .littleNav ul{
  display: flex;
  justify-content: space-around;
  float: left;
  width: 100%;
  margin: 20px auto;
  background-color: #FFFFFF;
  font-size: 21px;
}

.littleNav ul li, .goods ul li{
  float: left;
  width: 14%;
  text-align: center;
  color: black;
  list-style: none;
}

.goods ul li{
  height: 120px;
  width: 150px;
  line-height: 120px;
}

.goods ul li:nth-of-type(1){
  line-height: 120px;
}

.goods ul li:nth-of-type(4), .littleNav ul li:nth-of-type(4){
  width: 20%;
}

.goods ul li:nth-of-type(2), .littleNav ul li:nth-of-type(2){
  width: 20%;
}

.goods ul li:nth-of-type(2){
  color: #7169e7;
  font-size: 24px;
  font-weight: 600;
  line-height: 120px;
}

.goods ul li:nth-of-type(5){
  color: #f58e40;
  font-size: 24px;
  font-weight: 600;
  line-height: 120px;
}

.goods ul li:nth-of-type(6){
  color: red;
  font-size: 28px;
  font-weight: 600;
  line-height: 120px;
}

li img{
  width: 100%;
  height: 100%;
}

.someDetails{
  width: 70%;
  margin-left: 15%;
  font-size: 24px;
  font-weight: 400;
}

.someDetails p{
  margin: 15px auto;
}

.return {
  margin: 50px auto 0 90%;
  width: 100px;
  height: 66px;
  border-radius: 50%;
  background-color: #ff5000;
  color: white;
  font-size: 21px;
  cursor: pointer;
  border: 1px solid gray;
}
</style>
