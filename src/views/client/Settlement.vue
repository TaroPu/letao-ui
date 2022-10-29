<template>
  <div class="settlement">
    <!--    顶部导航-->
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="title" @click="cart"><
      <button>确认订单</button>
    </div>
    <div class="my_address">
      <ul>
        <li><img src="../../assets/Images/Home/address.png"></li>
        <li>
          <span>所在地区</span>
          <span>
            <input v-model="Province"></input>
            <input v-model="City"></input>
            <input v-model="Area"></input>
          </span>
          <p style="margin-top: 20px">
            <span>详细地址</span>
            <input v-model="detail_address">
          </p>
        </li>
      </ul>
    </div>
    <div class="order_details">
      <ul v-for="(p,index) of order" :key="index">
        <li><img :src="p.pro_image"></li>
        <li>
          <h3>{{ p.pro_name }}</h3>
          <h3><span>¥ {{ p.price }}</span><span> / </span><s>¥ {{ p.zprice }}</s></h3>
        </li>
        <li>× <span>{{ p.number }}</span></li>
      </ul>
      <div style="clear: both"></div>
    </div>
    <div class="order_mess">
      <div class="remarks">
        <span>备注：</span>
        <input type="text" v-model="remark"></input>
      </div>
      <div class="delivery">
        <span>配送方式：</span>
        <input type="radio" name="method" value="12.00" v-model="a_method"></input>乐淘直送 <span>¥ 12.00</span>
        <input type="radio" name="method" value="6.00" v-model="a_method"></input>普通配送 <span>¥ 6.00</span>
        <input type="radio" name="method" value="0.00" v-model="a_method"></input>门店自取 <span>¥ 0.00</span>
        <span>¥ {{ a_method }}</span>
      </div>
      <div class="total">店铺合计（含配送费）： <span>¥ {{ parseFloat(a_method - 0 + this.total).toFixed(2) }}</span></div>
    </div>
    <div class="pay_methods">
      <ul>
        <li>请选择支付方式：</li>
        <li value="1" @click="payMethod"><img src="../../assets/Images/Pay_methods/yin_lian.png" alt="银联支付"></li>
        <li value="2" @click="payMethod"><img src="../../assets/Images/Pay_methods/Alipay.png" alt="支付宝支付"></li>
        <li value="3" @click="payMethod"><img src="../../assets/Images/Pay_methods/Wechat.png" alt="微信支付"></li>
        <li value="4" @click="payMethod"><img src="../../assets/Images/Pay_methods/apple-pay.png" alt="apple-pay"></li>
      </ul>
    </div>
    <div class="confirm">
      共 <span>{{ num }}</span> 件，合计 <span>¥ {{ parseFloat(a_method - 0 + this.total).toFixed(2) }}</span>
      <el-button type="text" @click="open">提交订单</el-button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav-client'

export default {
  name: "Settlement",
  data() {
    return {
      Province: '',
      City: '',
      Area: '',
      detail_address: '',

      curUser: {},
      order: [],
      num: 1,
      total: 0,
      address: {},

      remark: '',
      a_method: '0.00',
      finalPrice: 0,
      pay: 0,
      delivery: '门店自取',
      // 订单编号
      order_id: '',
      // 下单时间
      book_time: '',

      thisShop: {},
      isFromDetails: false,
    }
  },
  components: {
    Nav
  },
  methods: {
    payMethod(e){
      this.pay = e.currentTarget.getAttribute('value');
    },
    cart() {
      this.$router.replace('/shopping_cart');
    },
    open() {

      if(this.pay === 0){
        this.$message.info('请选择付款方式！');
      }
      else{
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let ms =
          new Date().getSeconds() < 10
            ? "0" + new Date().getSeconds()
            : new Date().getSeconds();
        let mf =
          new Date().getMinutes() < 10
            ? "0" + new Date().getMinutes()
            : new Date().getMinutes();

        this.order_id = this.curUser.user_id + '' + yy + mm + dd + hh + mf + ms;
        this.book_time = yy + '-' + mm + '-' +  dd + ' ' + hh + ':' +  mf + ':' +  ms;

        if (this.a_method === '12.00') {
          this.delivery = '乐淘直送';
        } else if (this.a_method === '6.00') {
          this.delivery = '普通配送';
        } else this.delivery = '门店自取';

        this.finalPrice = parseFloat(this.a_method - 0 + this.total).toFixed(2);

        const h = this.$createElement;
        this.$msgbox({
          title: '请扫码支付',
          message: h('p', null, [
            h('span', null, '二维码 '),
            h('i', {style: 'color: teal'}, 'VNode')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '正在支付...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'success',
            message: '支付成功！',
          });
          const self = this;
          self.$axios({
            method: 'post',
            url: 'http://127.0.0.1:8080/corder/xiadan',
            headers: {"Content-Type": "application/json"},
            data: {
              // 用户id
              "user_id": this.curUser.user_id,
              // 订单商品表
              "list": this.order,
              // 备注
              "remark": this.remark,
              // 配送方式
              "delivery": this.delivery,
              // 付款方式
              "paytype": this.pay,
              // 实付金额
              "total": this.finalPrice,
              // 订单编号
              "order_id": this.order_id,
              // 下单时间
              "ord_time": this.book_time,

            },
          }).then(res => {
            self.thisShop = res.data;
            sessionStorage.setItem('shop', JSON.stringify(this.thisShop));
          }).catch(err => {
            console.log(err)
          })
          sessionStorage.setItem('thisOrder', JSON.stringify(this.order));
          sessionStorage.setItem('order_time', this.book_time);
          sessionStorage.setItem('order_id', this.order_id);
          sessionStorage.setItem('delivery', this.a_method);
          this.$router.replace({path: "/order"})
        });
      }
    },
    showMsg() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/corder/getaddress',
        headers: {"Content-Type": "application/json"},
        data: {
          "user_id": this.curUser.user_id,
        },
      }).then(res => {
        self.address = res.data;
        this.Province = this.address.province;
        this.City = this.address.city;
        this.Area = this.address.area;
        this.detail_address = this.address.detail;
      }).catch(err => {
        console.log(err)
      })
    },
  },
  created() {
    this.curUser = JSON.parse(sessionStorage.getItem('user'));
    let p = JSON.parse(sessionStorage.getItem('order'));
    this.isFromDetails = sessionStorage.getItem('isFromDetails') || false;
    sessionStorage.removeItem('isFromDetails');

    if(this.isFromDetails){
      this.num = 1 ;
      let count = sessionStorage.getItem('count');
      Object.defineProperties(p, {
        number: {
          value: count,
          writable: true
        },
      });this.order.push(p);
    }
    else {
      this.order = p;
      this.num = JSON.parse(sessionStorage.getItem('num'));
    }

    this.total = JSON.parse(sessionStorage.getItem('total'));
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

.settlement {
  width: 100%;
  height: auto!important;
  background-color: antiquewhite;
  padding-bottom: 50px;
}

.maindiv {
  height: 63px;
}

.title {
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

.title button {
  width: 140px;
  height: 45px;
  font-size: 18px;
  border-radius: 50%;
  background-color: #EEE0BA;
  border: 1px solid #f3cb9e;
  cursor: pointer;
  color: gray;
}

.my_address {
  width: 70%;
  height: 160px;
  margin-left: 15%;
}

.my_address img {
  height: 80px;
  width: 80px;
  margin: 20px;
}

.my_address ul {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px auto;
  background-color: #EEE0BA;
  font-size: 20px;
  border-radius: 2%;
}

.my_address ul li:nth-of-type(1) {
  height: 120px;
  text-align: center;
  line-height: 120px;
  cursor: pointer;
}

.my_address ul li:nth-of-type(2) {
  width: 600px;
  padding: 20px;
}

.my_address ul li span {
  font-size: 18px;
  color: grey;
  font-weight: 600;
}

.my_address select, input {
  width: 20%;
  height: 30px;
  vertical-align: center;
  border-radius: 10px;
  margin-left: 20px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: dimgray;
}

.my_address ul li p input {
  width: 70%;
}

.order_details {
  width: 70%;
  height: auto !important;
  margin-left: 15%;
}

.order_details ul {
  display: flex;
  justify-content: space-around;
  float: left;
  width: 100%;
  margin: 20px auto;
  background-color: #EEE0BA;
  font-size: 18px;
  border-radius: 2%;
}

.order_details ul li:nth-of-type(1), .order_details ul li:nth-of-type(3) {
  float: left;
  text-align: center;
  height: 120px;
  width: 150px;
  line-height: 120px;
  font-weight: 600;
  color: dimgray;
}

.order_details ul li:nth-of-type(1) {
  cursor: pointer;
}

.order_details ul li:nth-of-type(2) {
  font-size: 14px;
  color: dimgray;
  padding: 20px;
}

.order_details h3 {
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.order_details h3:nth-of-type(2) {
  margin-top: 20px;
  cursor: auto;
}

.order_details h3 span:nth-of-type(1) {
  color: red;
  font-size: 20px;
}

li img {
  width: 100%;
  height: 100%;
}

.order_mess {
  width: 70%;
  height: 300px;
  background-color: #EEE0BA;
  border-radius: 2%;
  margin-left: 15%;
  margin-bottom: 30px;
  padding: 10px;
}

.order_mess div {
  margin: 20px 60px 20px 60px;
  width: 80%;
  height: 60px;
}

.order_mess span {
  font-size: 21px;
  text-align: center;
  line-height: 60px;
}

.remarks input {
  width: 50%;
  height: 40px;
  font-size: 16px;
  text-align: left;
  padding: 0 5px;
  border-radius: 0;
  border: 1px solid gray;
}

.delivery input {
  width: 20px;
  height: 20px;
  margin-right: 1%;
  cursor: pointer;
}

.delivery span:nth-of-type(5) {
  color: red;
  margin-left: 66px;
  font-size: 24px;
  font-weight: 600;
}

.order_mess .total {
  float: right;
  text-align: right;
  font-size: 21px;
}

.total span, .confirm span {
  color: red;
  font-size: 24px;
  font-weight: 600;
}

.pay_methods {
  width: 70%;
  height: 100px;
  margin-left: 15%;
}

.pay_methods ul {
  display: flex;
  justify-content: left;
  float: left;
  width: 100%;
  height: 80px;
  margin: 10px auto;
  background-color: #EEE0BA;
  font-size: 21px;
  border-radius: 2%;
}

.pay_methods ul li {
  float: left;
  width: 50px;
  height: 50px;
  color: black;
  margin-top: 15px;
  margin-right: 6%;
  cursor: pointer;
}

.pay_methods ul li:nth-child(1) {
  width: 200px;
  text-align: center;
  line-height: 50px;
  margin-left: 10%;
  cursor: auto;
}

.confirm {
  width: 70%;
  height: 80px;
  margin: 30px 0 0 15%;
  background-color: #EEE0BA;
  font-size: 18px;
  border-radius: 2%;
  text-align: right;
  line-height: 80px;
}

.confirm button {
  margin: 0 10% 0 6%;
  width: 100px;
  height: 50px;
  border-radius: 25%;
  background-color: #ff5000;
  color: white;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid gray;
}

</style>
