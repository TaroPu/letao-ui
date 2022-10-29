<template>
  <div class="cart">

    <div class="maindiv"><Nav></Nav></div>

    <div class="cart_box">
      <div class="head"><img src="../../assets/Images/Home/cart.png">购物车（ 全部 <span style="color: red">{{ cart.length }}</span> ）</div>
      <div class="body_nav">
        <ul>
          <li><input type="checkbox" id="box" @click="checkAll"></input> 全选</li>
          <li>商品信息</li>
          <li>单价</li>
          <li>数量</li>
          <li>操作</li>
        </ul>
      </div>
      <div class="body">
        <ul v-for="(p, index) of cart" :key="index">
          <li><input type="checkbox" name="checkOne" @click="check"></input> <span>{{ p.pro_name }}</span></li>
          <li><img :src="p.pro_image" @click="toDetail(index)"></li>
          <li><span>¥ {{parseFloat(p.price).toFixed(2)}}</span><span> / </span><s>¥ {{ parseFloat(p.zprice).toFixed(2) }}</s></li>
          <li>
            <button :name="index" @click="num_min">-</button><input v-model="p.number"></input><button :name="index" @click="num_max">+</button>
          </li>
          <li>
            <h5 style="color: red" @click="delete_one(index)" :name="index"><img src="../../assets/Images/Home/delete.png"> 删除</h5>
          </li>
        </ul>
      </div>
      <div class="foot">
        <ul>
          <li>已选 <span>{{ checkNum }}</span> 件商品</li>
          <li>合计 <span>{{ parseFloat(total).toFixed(2) }}</span> 元</li>
          <li><button @click="toPay">结算</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav-client'
export default {
  name: "Shopping_Cart",
  data(){
    return {
      cart: [],
      curUser: {},
      checkNum: 0,
      total: 0,
      order: [],
    }
  },
  methods:{
    checkAll(){
      this.total = 0;
      // 获取编号前面的复选框
      let checkAllEle = document.getElementById("box");
      // 对编号前面复选框的状态进行判断
      if(checkAllEle.checked==true){
        // 获取下面所有的复选框
        let checkOnes = document.getElementsByName("checkOne");
        // 对获取的所有复选框进行遍历
        for(let i=0;i<checkOnes.length;i++){
          // 拿到每一个复选框，并将其状态置为选中
          checkOnes[i].checked=true;
          this.total = (this.cart[i].price - 0) * this.cart[i].number  + this.total;
        }
        this.checkNum = checkOnes.length;
      }else{
        // 获取下面所有的复选框
        let checkOnes = document.getElementsByName("checkOne");
        // 对获取的所有复选框进行遍历
        for(let i=0;i<checkOnes.length;i++){
          // 拿到每一个复选框，并将其状态置为未选中
          checkOnes[i].checked=false;
        }
        this.checkNum = 0;
      }
    },
    check(){
      this.checkNum = 0;
      this.total = 0;
      // 获取编号前面的复选框
      let checkOnes = document.getElementsByName("checkOne");
      // 获取全选框的状态
      let checkAllEle = document.getElementById("box");
      // 获取下面所有的复选框
      for(let i=0;i<checkOnes.length;i++){
        // 如果复选框的状态是未选中
        if(checkOnes[i].checked==false){
          // 设置全选框的状态为未选中
          checkAllEle.checked=false;
        }
        else{
          this.checkNum++;
          this.total = (this.cart[i].price - 0) * this.cart[i].number + this.total;
        }
      }
      // 判断计数器是否与复选框的的数量相等
      if(this.checkNum==checkOnes.length){
        // 如果相等则设置全选框的状态为已选中
        checkAllEle.checked=true;
      }
    },
    toPay(){
      let a = 0;
      let checkOnes = document.getElementsByName("checkOne");
      // 对获取的所有复选框进行遍历
      for(let i=0;i<checkOnes.length;i++){
        if(checkOnes[i].checked == true){
          this.order[a] = this.cart[i];
          a++;
        }
      }
      if(a != 0){
        sessionStorage.setItem('order', JSON.stringify(this.order));
        sessionStorage.setItem('num', JSON.stringify(this.checkNum));
        sessionStorage.setItem('total', JSON.stringify(this.total));
        this.$router.replace('/settlement');
      }
      else{

      }
    },
    num_max(e){
      let checkOnes = document.getElementsByName("checkOne");
      let i = e.target.getAttribute('name');
      this.cart[i - 0].number++;
      if(this.cart[i - 0].number < 1) {
        this.cart[i - 0].number = Math.max(1, this.cart[i - 0].number);
        this.$message.info('不能再减少啦！');
      }
      else {
        this.cart[i - 0].number=Math.max(1,this.cart[i - 0].number);
        if(checkOnes[i - 0].checked==true){
          this.total = this.total +  this.cart[i - 0].price;
        }
        const self = this;
        self.$axios({
          method: 'post',
          url: 'http://127.0.0.1:8080/shop/change',
          headers: {"Content-Type": "application/json"},
          data: {
            "shop_id": this.cart[i - 0].shop_id,
            "number": this.cart[i - 0].number,
          },
        }).catch(err =>{
          console.log(err)
        })
      }
    },
    num_min(e){
      let checkOnes = document.getElementsByName("checkOne");
      let i = e.target.getAttribute('name');
      this.cart[i - 0].number--;
      if(this.cart[i - 0].number < 1) {
        this.cart[i - 0].number = Math.max(1, this.cart[i - 0].number);
        this.$message.info('不能再减少啦！');
      }
      else {
        this.cart[i - 0].number=Math.max(1,this.cart[i - 0].number);
        if(checkOnes[i - 0].checked==true){
          this.total = this.total -  this.cart[i - 0].price;
        }
        const self = this;
        self.$axios({
          method: 'post',
          url: 'http://127.0.0.1:8080/shop/change',
          headers: {"Content-Type": "application/json"},
          data: {
            "shop_id": this.cart[i - 0].shop_id,
            "number": this.cart[i - 0].number,
          },
        }).catch(err =>{
          console.log(err)
        })
      }
    },
    toDetail(index){
      sessionStorage.setItem('isFromCart',"true");
      sessionStorage.setItem('CurProduct',JSON.stringify(this.cart[index]));
      this.$router.replace('/pro_datails')
    },
    showMsg(){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/shop/search',
        headers: {"Content-Type": "application/json"},
        data: {
          "user_id": this.curUser.user_id,
        },
      }).then(res => {
        res.data.forEach(item=>{
          this.cart.push(item);
        })
        console.log(this.cart);
      }).catch(err =>{
        console.log(err)
      })
    },
    delete_one(index){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/shop/delete',
        headers: {"Content-Type": "application/json"},
        data: {
          "shop_id": this.cart[index].shop_id,
        },
      }).catch(err =>{
        console.log(err)
      })
      this.cart.splice(index,1);
    }
  },
  created(){
    this.curUser = JSON.parse(sessionStorage.getItem('user'))
    this.showMsg();
  },
  components:{
    Nav
  },
}
</script>

<style scoped>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.cart{
  width: 100%;
  min-height: 100vh;
  background-color: antiquewhite;
  padding-bottom: 50px;
}

.maindiv{
  height: 63px;
}

.cart_box{
  background-color: antiquewhite;
  display: flex;
  position: relative;
  flex-direction: column;
}

.head{
  color: black;
  font-size: 28px;
  font-weight: 600;
  margin-left: 11%;
  width: 400px;
  margin-bottom: 20px;
  padding-top: 15px;
}

.head img{
  width: 50px;
  height: 50px;
}

.body_nav{
  width: 80%;
  margin: 0 auto;
}

.body_nav ul li {
  font-weight: 600;
}

.body{
  flex:1;
  width: 80%;
  margin: 0 auto 150px auto;
}

.body ul, .body_nav ul{
  display: flex;
  justify-content: space-around;
  float: left;
  width: 100%;
  margin: 20px auto;
  background-color: #EEE0BA;
  font-size: 21px;
  border-radius: 2%;
}

.body_nav ul li, .body ul li{
  float: left;
  width: 14%;
  text-align: center;
  color: black;
  list-style: none;
}

.body ul li{
  height: 120px;
  width: 150px;
}

.body_nav li input{
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.body li:nth-of-type(1) input{
  cursor: pointer;
  width: 18px;
  height: 18px;
}

.body ul li:nth-of-type(1){
  line-height: 120px;
}

.body ul li:nth-of-type(2){
  cursor: pointer;
}

.body ul li:nth-of-type(3), .body_nav ul li:nth-of-type(3){
  width: 20%;
}

.body ul li:nth-of-type(3) span:nth-of-type(1){
  color: red;
  font-size: 24px;
  font-weight: 600;
  line-height: 120px;
}

.body ul li:nth-of-type(4) button{
  display: inline;
  width: 30px;
  height: 30px;
  font-size: 20px;
  font-weight: 600;
  border: 1px solid white;
  background-color: white;
  cursor: pointer;
  border-radius: 20%;
}

.body ul li:nth-of-type(4) input{
  display: inline;
  border-radius: 25%;
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  margin: 42px 15px;
  font-size: 18px;
}

.body ul li:nth-of-type(5){
  padding: 10px;
}

.body ul li:nth-of-type(5) h5{
  display: inline;
  border-radius: 25%;
  width: 100px;
  height: 120px;
  text-align: center;
  line-height: 120px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
}

.body ul li h5 img{
  width: 40px;
  height: 40px;
  display: inline;
}

li img{
  width: 100%;
  height: 100%;
}

.foot{
  position: absolute;
  color: black;
  font-weight: 600;
  width: 60%;
  right: 10vw;
  bottom: 2vh;
}

.foot ul{
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 20px auto;
  background-color: #EEE0BA;
  font-size: 20px;
  border-radius: 2%;
}

.foot ul li{
  width: 18%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: black;
  list-style: none;
}

.foot ul li:nth-of-type(1), .foot ul li:nth-of-type(2){
  width: 30%;
}

.foot ul li span{
  color: red;
  font-size: 24px;
}

.foot ul li button{
  width: 70px;
  height: 45px;
  font-size: 18px;
  border-radius: 25%;
  background-color: #CBE457;
  border: 1px solid gray;
  cursor: pointer;
}
</style>
