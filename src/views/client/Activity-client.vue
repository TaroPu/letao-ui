<template>
  <div class="Activity-client">

    <!--    顶部导航-->
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="sub_nav">
      <ul>
        <li @click="goTo">主页</li>
        <li @click="toOrderList" style="cursor: pointer">订单</li>
        <li @click="" style="cursor: pointer;background-color: #b8cb37;">活动</li>
        <li @click="toAbout" style="cursor: pointer;">关于</li>
        <li @click="toCantact" style="cursor: pointer">联系我们</li>
      </ul>
    </div>
    <div class="title">
      最新活动列表
    </div>
    <div class="main">
      <div class="head">
        <span>活动名称</span>
        <span>活动地址</span>
        <span>活动时间</span>
        <span>折扣</span>
        <span>活动介绍</span>
      </div>
      <ul>
        <li v-for="(a,index) of activity" :key="index">
          <span>{{ a.act_name }}</span>
          <span>{{ a.province }} {{a.city}} {{a.area}} {{a.detail}}</span>
          <span>{{ a.begin }}--{{ a.end }}</span>
          <span>{{ a.discount }}</span>
          <span>{{ a.act_sth }}</span>
          <a class="btn" @click="toGetActive(index)"><img src="../../assets/Images/Home/getMore.png" width="40px" height="40px">查看详情</a>
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
      activity: [],
    }
  },
  methods: {
    toGetActive(index){
      // console.log(index);
      // console.log(this.activity[index])this.activity[index]
      sessionStorage.setItem('activity',JSON.stringify(this.activity[index]));
      // console.log(this.activity[index]);
      this.$router.replace('/activity_details')
    },
    toAbout() {
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
        url: 'http://127.0.0.1:8080/activity/search',
        headers: {"Content-Type": "application/json"},
        data: {}

      })
        .then(res => {
          // console.log(res);
          res.data.forEach(item => {
            this.activity.push(item);
          })
          console.log(this.activity)

        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  created() {
    this.showMsg();  //TODO 这里打开与后端连接
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


.Activity-client {
  width: 100vw;
  /*height: 100vh;*/
  min-width: 1700px;
  min-height: 100vh;
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
}


.main {
  margin: 20px auto;;
  width: 100%;
  min-width: 1400px;
  height: 100%;
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
  background-color: #d9d4d4;
}

.head {
  display: flex;
  justify-content: space-around;
  margin: 20px 20px;
  padding: 20px;
  height: 120px;
  background-color: #e0b574;
  border-radius: 30px;
  font-weight: 700;
}

.main ul > li {
  position: relative;
  display: flex;
  justify-content: space-around;
  margin: 35px 20px;
  padding: 20px;
  height: 200px;
  background-color: #c6c9bc;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

}

.main .head span {
  height: 80px;
  line-height: 80px;
}

span {
  display: inline-block;
  height: 160px;
  /*background-color: rebeccapurple;*/
  line-height: 160px;
  text-align: center;
  font-size: 1.2rem;
}


span:nth-child(1) {
  flex: 2;
}

span:nth-child(2) {
  flex: 4;
}

span:nth-child(3) {
  flex: 2;
  font-weight: 700;
  color: red;
}

span:nth-child(4) {
  color: blue;
  font-weight: 700;
  flex: 1;
}

span:nth-child(5) {
  flex: 3;

}

.main > ul li > span:nth-child(5) {
  text-align: left;
  text-indent: 2em;
  font-size: 1em;
  flex: 3;
  font-size: 1rem;
  line-height: 1.6em;
  background-color: #aedacf;
  padding: 5px;
}

/*span:nth-child(3) {*/
/*  flex: ;*/

/*}*/
a {
  display: flex;
  align-items: center;
  border-style: dashed;
  border-radius: 10px;
}

span > img {
  height: 160px;
  width: 160px;
  border-radius: 20px;
  line-height: 50px;

}

.btn {
  position: absolute;
  width: 160px;
  bottom: 2px;
  font-size: 1.2rem;
  line-height: 40px;
  color: #08b5f5;
  cursor: pointer;

}

</style>
