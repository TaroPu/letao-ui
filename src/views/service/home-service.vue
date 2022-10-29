<template>
  <div class="home" v-if="isLogined" style="background-color: #F9F6F3">
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="main">
      <div class="saleData" style="padding: 15px">
        <h3 style="margin-bottom: 40px; background-color: #cbcaca; cursor: pointer" @click="toSaleData">查询销售数据</h3>
        <div id="graph1" style="cursor: pointer" @click="toSaleData"></div>
      </div>

      <div class="goodsControl" style="text-align: center; padding: 15px">
        <h3 style="margin-bottom: 66px; background-color: #a5a5a5; cursor: pointer" @click="toProduct_msg_manage">商品管理</h3>
        <img src="../../assets/Images/Service/nav.png" style="margin-bottom: 10px; cursor: pointer" @click="toProduct_msg_manage">
        <div class="box" style="margin-left: 6%; cursor: pointer"  @click="toProduct_msg_manage">
          <span><img src="../../assets/Images/some_goods/cherry.png"></span>
          <span style="margin-left: 3%"><img src="../../assets/Images/some_goods/broccoli.png"></span>
          <span style="margin-left: 3%"><img src="../../assets/Images/some_goods/beef.png"></span>
          <span style="margin-left: 3%"><img src="../../assets/Images/some_goods/avocado.png"></span>
        </div>
      </div>

      <div class="activity" style="text-align: center;margin-top: 63px; padding: 15px">
        <h3 style="margin-bottom: 40px; background-color: #a5a5a5; cursor: pointer" @click="toActivity_manage_service">活动模块</h3>
        <img src="../../assets/Images/Service/activity.png" style="margin-bottom: 20px; cursor: pointer" @click="toActivity_manage_service">
      </div>

      <div class="orderControl" style="text-align: center;margin-top: 63px; padding: 15px">
        <h3 style="margin-bottom: 40px; background-color: #cbcaca; cursor: pointer" @click="toRetrieveOrder">订单管理</h3>
        <img src="../../assets/Images/Service/order.png" style="margin-bottom: 20px; cursor: pointer" @click="toRetrieveOrder">
      </div>

    </div>
  </div>
</template>

<script>  //引入基本模块
import Nav from '@/components/nav-service'
let echarts = require('echarts/lib/echarts')
// 引入饼状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: "home-service",
  data(){
    return {
      isLogined: false,
      CurUser:{},
      opinionData1: [{name:"零食", value:"126"},
        {name:"海鲜", value:"176"},
        {name:"水果", value:"180"},
        {name:"酒水", value:"50"},
        {name:"蔬菜", value:"250"},
        {name:"日常用品", value:"100"}],

    }
  },
  components: {
    Nav
  },
  created() {
    this.isLogined = sessionStorage.getItem('isLogin');
    var a;
    let url = this.axios.urls.SYSTEM_tongjibaobiao_list2;
    this.axios.post(url, {}).then((response) => {
      console.log(response);
      console.log(response.data.data);
      a=response.data.data;
      this.opinionData1 =a;
      this.initData();
    }).catch(function(error) {
      console.log(error);
    });
    this.showMsg();
  },
  mounted(){
   this.initData();
   this.CurUser = JSON.parse(sessionStorage.getItem('user'));
 },
  methods: {

    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('graph1'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: '销售数据扇形图分析',//主标题
          subtext: '乐淘电子商务系统',//副标题
          x: 'center',//x轴方向对齐方式
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          bottom: 'bottom',
          data: ['用户总资金', '公司总资金', '公司总借款', '用户总还款', '用户总投资']
        },
        series: [
          {
            name: '数据来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.opinionData1,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    showMsg() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/cproduct/corder',
        headers: {"Content-Type": "application/json"},
        data: {},
      }).then(res => {
        res.data.forEach(item => {
          this.hot_products.push(item);
        })
        // console.log(this.hot_products)
      }).catch(err => {
        console.log(err)
      })
    },

    toProduct_msg_manage(){
      if(this.CurUser.iden_id != 1) this.$router.replace('/product_msg_manage');
    },

    toActivity_manage_service() {
      if(this.CurUser.iden_id != 2) this.$router.replace('/activity_manage_service');
    },

    toRetrieveOrder(){
      this.$router.replace('/retrieveOrder_service');
    },

    toSaleData() {
      this.$router.replace('/saleData_service');
    },
  },

}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.maindiv {
  height: 63px;
}
.home {
  width: 100vw;
  height: 100vh;
  min-height: 900px;
}

.home .title {
    width: 700px;
    height: 50px;
    padding: 50px;
    margin:  auto ;
    font-size: 30px;
  }

.main {
  margin: 50px;
  height: 800px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 40% 40%;
  text-align: center;
  grid-template-areas:
    "saleData goodsControl"
    "activity orderControl";
}

#graph1{
  width: 100%;
  height: 100%;
}

.goodsControl img{
  height: 66px;
  width: 92%;
}

.goodsControl span {
  float: left;
  width: 21%;
  height: 180px;
}

.goodsControl span img {
  width: 100%;
  height: 75%;
}

.activity img{
  width: 100%;
  height: 100%;
}

.orderControl img{
  width: 100%;
  height: 100%;
}

</style>
