<template>
  <div class="searchDetails">

    <!--    顶部导航-->
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="activityMsg">
<!--      <img src="https://img1.baidu.com/it/u=3170197035,2043669548&fm=253&fmt=auto&app=138&f=JPEG?w=732&h=500">-->
      <img src="https://img0.baidu.com/it/u=3523049265,2248511995&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=212">
      <div class="msg1">
        <ul>
          <li>活动名称：<span>{{ activity.act_name }}</span></li>
          <li>活动地址：<span>{{ activity.province }} {{activity.city}} {{activity.area}} {{activity.detail}}</span></li>
        </ul>
      </div>
      <div class="msg2">
        <ul>
          <li>活动时间：<span>{{ activity.begin }}</span>--<span>{{ activity.end }}</span></li>
          <li>活动折扣：全场<span>{{ activity.discount * 10 }}</span>折</li>
          <li>活动商品：共<span>{{ product.length }}</span>件活动商品</li>
        </ul>
      </div>
      <button @click="toActivity">返回</button>
    </div>


    <hr>
    <hr>
    <el-select v-model="value" filterable placeholder="所有种类" style="width: 200px; margin: 20px 0 0 0px;">
      <el-option style="text-align: center"
                 v-for="(item,index) of options"
                 :key="index"
                 :label="item.class_name"
                 :value="item.class_id">
      </el-option>
    </el-select>


    <div class="box">
      <ul>
        <ul>
          <li v-for="(p,index) of showProduct" :key="index" @click="toDetail(index)">
            <img :src="p.pro_image" :alt="p.pro_name">
            <h4>￥{{ parseFloat(p.price).toFixed(2) }}</h4>
            <h4>{{ p.pro_name }}</h4>
          </li>

        </ul>
      </ul>

    </div>
    <div class="nav_bottom">
      <div class="pagination-bar">
        <ul>
          <li class="page-prev disabled">&lt;</li>
          <li class="disabled selected">1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li style="background-color: antiquewhite; border: 0;"><span>. . .</span></li>
          <li>49</li>
          <li>50</li>
          <li class="page-next">&gt;</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav-client'

export default {
  name: "Favorite",
  data() {
    return {
      options: [
        {
          class_id: -1,
          class_code: -1,
          class_name: '所有种类'
        }
      ],
      activity: {},
      class_id: -1,
      showProduct: [],

      product: [],
      value: '',
      // searchValue: ''
    }
  },
  methods: {
    showMsg() {
      const self = this;
      console.log(this.activity);
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/activity/inquire',
        headers: {"Content-Type": "application/json"},
        data: {
          "act_id": this.activity.act_id
        }

      })
        .then(res => {
          // console.log(res);
          res.data.forEach(item => {
            this.product.push(item);
          })
          // console.log(this.product);

        })
        .catch(err => {
          console.log(err);
        })
    },
    getCalsses() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/class/search',
        headers: {"Content-Type": "application/json"},

      })
        .then(res => {
          res.data.forEach(item => {
            this.options.push(item);
          });
        })
        .catch(err => {
          console.log(err);
        })
    },
    toDetail(index) {
      // console.log(this.showProduct[index]);
      sessionStorage.setItem('CurProduct',JSON.stringify(this.showProduct[index]));
      this.$router.replace('/pro_datails')
    },
    toActivity() {
      this.$router.replace('/activity_client')
    },
    addCart() {
      const self = this;
      self.$notify({
        title: '成功',
        message: '成功加入购物车！',
        type: 'success'
      });
    },
    removeFavorite() {
      const self = this;
      self.$notify({
        title: '成功',
        message: '取消收藏了该商品',
        type: 'warning'
      });
    },

  },
  components: {
    Nav
  },
  watch: {
    value(val) {
      if (val == -1) this.showProduct = this.product;
      else {
        this.showProduct = [];
        this.product.forEach(item => {
          if (item.class_id == val) this.showProduct.push(item);
        })
      }

    },
  },
  created() {
    this.getCalsses();

    this.activity = JSON.parse(sessionStorage.getItem('activity'));
    this.showProduct = this.product;
    this.showMsg();
  },
  beforeDestroy() {
    this.activity = {},
      sessionStorage.removeItem('activity');
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

.searchDetails {
  width: 100%;
  height: 100%;
  margin: 0;
  min-height: 100vh;
  min-width: 1400px;
  background-color: antiquewhite;
}

.maindiv {
  height: 63px;
}

.activityMsg {
  position: relative;
  min-width: 1300px;
  display: flex;
  height: 300px;
  width: 100%;
  background: linear-gradient(to right, #e59292, #90ED5A, #889ce5);
}

.activityMsg img {

  height: 100%;
  max-width: 500px;
}

.msg1 {
  flex: 1;
  height: 100%;
  /*background-color: #e74e4e;*/
}

.msg2 {
  height: 100%;
  flex: 1;
  /*background-color: #39885e;*/
}

.activityMsg .msg1 ul, .activityMsg .msg2 ul {
  height: 100%;
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
}

.activityMsg ul > li {
  /*height: 10px;*/
  /*display: inline-block;*/

  flex: 1;
  margin: 20px;
  /*background-color: #1f66c2;*/
  line-height: 100%;
}

.activityMsg button {
  bottom: 10px;
  right: 20px;
  position: absolute;
  background-color: #ef9971;
  width: 100px;
  height: 50px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
}

.activityMsg .msg1 ul > li {
  line-height: 25px;
  padding: 20px 0;
  font-size: 25px;
}

.activityMsg .msg2 ul > li {
  line-height: 15px;
  padding: 15px 0;
  font-size: 20px;
}

.msg1 span {
  padding: 0 2px;
  color: blue;
  font-size: 1em;
}

.msg2 span {
  padding: 0 2px;
  color: #e70d0d;
  font-size: 1.2em;
}


.box {
  background-color: antiquewhite;
}

.box ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.box ul li {
  position: relative;
  width: 200px;
  height: 270px;
  float: left;
  cursor: pointer;
  background-color: antiquewhite;
  margin: 50px;
}

.box ul li > img {
  width: 100%;
  height: 75%;
  margin-bottom: 20px;
}

.box ul li span {

  position: absolute;
  display: inline-block;
  bottom: 0px;
  right: 1px;
  width: 30px;
  height: 60px;
}

.box ul li h4 {
  margin-left: 45px;
  font-size: 16px;
  color: #050505;
  font-weight: 400;
}

.box ul li h4:nth-of-type(1) {
  color: red;
  margin-bottom: 5px;
}

.nav_bottom {
  width: 100%;
  height: 80px;
  background-color: antiquewhite;

}

.pagination-bar {
  padding: 20px 0;
  text-align: center;
}

.nav_bottom .pagination-bar .selected {
  background-color: #1684FC;
  color: white;
  font-weight: 600;
}

.pagination-bar ul li {
  display: inline-block;
  padding: 5px 8px;
  margin: 0 6px;
  text-decoration: none;
  min-width: 45px;
  font-size: 16px;
  transition: all .4s;
  background-color: #FFF;
  color: #666;
  border: 1px solid #BBBBBB;
}

.nav_bottom .pagination-bar ul li:hover {
  transform: scale(1.2);
  border: 2px solid #1684FC;
  color: black;
}

.pagination-bar ul li:not(.disabled) {
  cursor: pointer;
}

.pagination-bar ul li.disabled {
  cursor: auto;
}

.page-prev {
  border-radius: 15px 0 0 15px;
}

.page-next {
  border-radius: 0 15px 15px 0;
}

.nav_bottom .pagination-bar ul li span {
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}

.nav_bottom .pagination-bar ul li span:hover {
  transform: scale(1.2);
  color: #1684FC;
}
</style>
