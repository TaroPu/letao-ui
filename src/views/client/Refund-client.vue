<template>
  <div class="refund">
    <div class="maindiv"><Nav></Nav></div>
    <div class="title" @click="order">< <button>批量退款</button></div>
    <div class="order_details">
      <ul>
        <li><input type="radio"></input> <span>牛油果</span></li>
        <li><img src="src/assets/Images/some_goods/avocado.png"></li>
        <li><span>¥ 30.00</span><span> / </span><s>¥ 30.00</s></li>
        <li>× <span>1</span></li>
      </ul>
      <div></div>
    </div>
    <div class="operation">
      <input type="radio"></input> <span>全选</span>
      <button @click="confirm">确认</button>
      <button style="background-color: gray; color: white" @click="order">取消</button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav-client'
export default {
  name: "Refund",
  components:{
    Nav
  },
  methods:{
    order(){
      this.$router.replace({path:"/order"})
    },
    confirm() {
      this.$alert('退货退款申请已提交，请等待工作人员审核。', '退款申请', {
        confirmButtonText: '确定',
        showClose:false,
        callback: action => {
          this.$message({
            type: 'success',
            message: `action: ${ action }`
          });
        }
      });
      this.$router.replace({path:"/order"})
    }
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.refund{
  width: 100%;
  background-color: antiquewhite;
  padding-bottom: 50px;
  min-height: 100vh;
}

.maindiv{
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

.order_details{
  flex:1;
  width: 70%;
  margin-left: 15%;
}

.order_details ul{
  display: flex;
  justify-content: space-around;
  float: left;
  width: 100%;
  margin: 20px auto;
  background-color: #EEE0BA;
  font-size: 21px;
  border-radius: 18%;
}

.order_details ul li{
  float: left;
  width: 14%;
  text-align: center;
  color: black;
  list-style: none;
}

.order_details ul li{
  height: 120px;
  width: 150px;
  line-height: 120px;
}

.order_details ul li:nth-of-type(2){
  cursor: pointer;
}

.order_details ul li:nth-of-type(3) span:nth-of-type(1){
  color: red;
  font-size: 24px;
  font-weight: 600;
}

.order_details ul li:nth-of-type(3){
  width: 20%;
}

li img{
  width: 100%;
  height: 100%;
}

.operation{
  width: 70%;
  margin-left: 15%;
}

.operation input{
  margin-left: 8%;
}

.operation span{
  margin-right: 60%;
}

.operation button{
  width: 80px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 25%;
  background-color: #CBE457;
  color: gray;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
  border: 1px solid gray;
  margin-right: 3%;
}

</style>
