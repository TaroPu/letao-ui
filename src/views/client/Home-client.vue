<template>
  <div class="home">
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="sub_nav">
      <ul>
        <li @click="" style="cursor: pointer;background-color: #b8cb37;">主页</li>
        <li @click="toOrderList" style="cursor: pointer">订单</li>
        <li @click="toActivity" style="cursor: pointer">活动</li>
        <li @click="toAbout" style="cursor: pointer">关于</li>
        <li @click="toCantact" style="width: 90px; cursor: pointer">联系我们</li>
      </ul>
    </div>
    <div class="main">
      <div class="main_des">
        <img src="../../assets/Images/Home/main_href.png">
        <button @click="toDetail" style="cursor: pointer">现在购买</button>
      </div>

      <div class="main_img" style="z-index: 0">
        <el-carousel :interval="3000" arrow="always" height="500px">
          <el-carousel-item v-for="(img,index) of main_ing" :key="index">
            <img class="img" :src="img">
          </el-carousel-item>
        </el-carousel>
      </div>


    </div>
    <div class="recommend">
      <div class="box_hd">
        <h3><img src="../../assets/Images/Home/hot.png">热门推荐</h3>
        <a href="#" @click="toDetail">查看全部</a>
      </div>
      <div class="box_bd">
        <ul>
          <li v-for="(p,index) of hot_products" :key="index" @click="toProdetails(index)">
            <img :src="p.pro_image" :alt="p.pro_name">
            <h4>￥{{ parseFloat(p.price).toFixed(2) }}</h4>
            <h4>{{ p.pro_name }}</h4>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav-client'

export default {
  name: "Home-client",
  data() {
    return {
      main_ing: [
        require('../../assets/Images/Hotspot/vegetables.png'),
        require('../../assets/Images/Hotspot/fruits.png'),
        'https://img1.baidu.com/it/u=3881065227,78693621&fm=253&fmt=auto&app=138&f=JPG?w=594&h=421',
        'https://img1.baidu.com/it/u=669299592,2455089618&fm=253&fmt=auto&app=120&f=JPEG?w=600&h=400',
        'https://img2.baidu.com/it/u=3691614281,658440342&fm=253&fmt=auto&app=138&f=PNG?w=499&h=333',
      ],
      hot_products: [],
    }
  },
  methods: {
    toActivity(){
      this.$router.replace('/activity_client')
    },
    toProdetails(index) {
      sessionStorage.setItem('CurProduct',JSON.stringify(this.hot_products[index]));
      this.$router.replace('/pro_datails')
    },
    toAbout() {

      this.$router.replace('/about_client')
    },
    toOrderList() {
      this.$router.replace('/order_list')
    },
    // goTo() {
    //   //直接跳转
    //   this.$router.replace('/');
    // },
    toDetail() {
      // if(!this.value) this.value = -1;
      sessionStorage.setItem('classtype',-1);
      sessionStorage.setItem('searchvalue','');
      // if (this.$route.path !== '/search') {
        this.$router.push({ path: '/search' })
      // }else location.reload()
    },
    toCantact() {
      this.$router.replace('/contact_us');
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

        console.log(this.hot_products)
      }).catch(err => {
        console.log(err)
      })
    },
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

.home {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: antiquewhite;
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
}

.main_des {
  width: 20%;
  background-color: #EEE0BA;
  position: relative;
}

.main_des img {
  width: 100%;
  position: absolute;
  top: 30%;
}

.main_des button {
  position: absolute;
  top: 55%;
  right: 15%;
  background-color: #CBE408;
  font-size: 14px;
  width: 80px;
  height: 36px;
  color: #6F0000;
  border: 1px solid #CBE457;

}

/*--------------------*/
.main_img {
  width: 50%;
  height: 100%;
  background-color: #CBE457;
  position: relative;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.img {
  width: 100%;
  height: 100%;
}

/*.main_img img{*/
/*  width: 100%;*/
/*  height: 100%;*/

/*}*/

/*.prev, .next{*/
/*  width: 40px;*/
/*  height: 60px;*/
/*  top: 50%;*/
/*  position: absolute;*/
/*  background: rgba(0,0,0,.3);*/
/*  margin-top: -30px;*/
/*  text-align: center;*/
/*  line-height: 60px;*/
/*  font-size: 30px;*/
/*  color: #fff;*/
/*  text-decoration: none;*/
/*}*/

/*.prev{*/
/*  left: 0;*/
/*  border-bottom-right-radius: 30px;*/
/*  border-top-right-radius: 30px;*/
/*}*/

/*.next{*/
/*  right: 0;*/
/*  text-decoration: none;*/
/*  border-bottom-left-radius: 30px;*/
/*  border-top-left-radius: 30px;*/
/*}*/

/*.main_nav{*/
/*  position: absolute;*/
/*  bottom: 5px;*/
/*  left: 50%;*/
/*  width: 140px;*/
/*  height: 20px;*/
/*  display: flex;*/
/*  justify-content: space-around;*/

/*  margin-left: -70px;*/
/*  background: rgba(255,255,255,.3);*/
/*  border-radius: 10px;*/
/*}*/


/*.main_nav li{*/
/*  margin-top: 4px;*/
/*  width: 12px;*/
/*  height: 12px;*/
/*  background-color: #fff;*/
/*  border-radius: 50%;*/
/*  float: left;*/
/*}*/

/*.main_nav .selected{*/
/*  background-color: #ff5000;*/
/*}*/


/*--------------------------*/
.recommend {
  margin-top: 15px;
}

.box_hd {
  height: 60px;
}

.box_hd h3 {
  float: left;
  font-size: 20px;
  color: #494949;
  margin-left: 200px;
}

.box_hd a {
  float: right;
  font-size: 16px;
  color: #a5a5a5;
  margin-right: 200px;
  margin-top: 25px;
  text-decoration: none;
}

.box_bd {
  margin-left: 12%;
  margin-right: 6%;
  background-color: antiquewhite;
}

.box_bd ul li {
  width: 200px;
  height: 270px;
  float: left;
  margin-right: 90px;
  margin-bottom: 60px;
  background-color: antiquewhite;
}

.box_bd ul li img {
  width: 100%;
  height: 75%;
  margin-bottom: 10px;
}

.box_bd ul li h4 {
  margin-left: 45px;
  font-size: 16px;
  color: #050505;
  font-weight: 400;
}

.box_bd ul li h4:nth-of-type(1) {
  color: red;
  margin-bottom: 5px;
}


</style>
