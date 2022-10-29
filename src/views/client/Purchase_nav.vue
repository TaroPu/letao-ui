<template>
  <div class="purchase_nav">

    <!--    顶部导航-->
    <div class="maindiv">
      <Nav></Nav>
    </div>

    <!--    中间内容-->
    <div class="nav_top">

      <!--      侧边导航-->
      <div class="side_nav">
        <!--        所有商品-->
<!--        <div class="all_sorts selected" @click="select">所有商品</div>-->

        <!--        分类-->
        <div class="details">
          <div @click="select(index)"v-for="(o,index) of options" :key="index">{{ o.class_name}}</div>

        </div>
      </div>

      <!--      推荐内容-->
      <div class="recommend">
        <div class="box">
          <ul>
            <li>
              <img src="../../assets/Images/some_goods/strawberry.png" alt="丹东原产草莓">
              <h4>¥ 30.00</h4>
              <h4>丹东原产草莓</h4>
            </li>

          </ul>
        </div>
      </div>
    </div>


    <!--    底部分页-->
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
  name: "Purchase_nav",
  data() {
    return {
      options:[
        {
          class_id: -1,
          class_code: -1,
          class_name: '所有种类'
        }
      ],
    }
  },
  methods: {
    select(index,e) {
      // 选中后的元素变为蓝色
      // console.log(this.options[index]);
      console.log(index)
      // let total = document.querySelector('all_sorts');
      let menuItem = document.querySelectorAll('.details>div');
      menuItem.forEach(item=>{
        item.classList.remove('selected');
      })
      menuItem[index].classList.add('selected');
      //刷新推荐区域的内容
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
  },
  created() {
    this.getCalsses();
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

.purchase_nav {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: antiquewhite;
}

.maindiv {
  height: 63px;
}

/*-----------------*/
/*中间*/
.nav_top {
  width: 100%;
  height: 90%;
  margin: 0;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
}

/*侧栏*/
.side_nav {
  width: 15%;
  height: 100%;
  position: relative;
  cursor: pointer;
}

.side_nav .selected {
  background-color: #E6F7FF;
  color: #1684FC;
  font-weight: 600;
}

/*所有商品*/
.all_sorts {
  width: 100%;
  height: 60px;
  background-color: #FFFFFF;
  text-align: center;
  font-size: 18px;
  line-height: 60px;
  color: #415058;
  padding-right: 20px;
}

.all_sorts:hover {
  background-color: #E6F7FF;
  color: #415058;
}

/*分类*/
.details {
  width: 100%;
  height: 87.5%;
  background-color: #FFFFFF;
}

.details div {
  width: 100%;
  height: 60px;
  left: 50%;
  text-align: center;
  line-height: 60px;
}

.details div:hover {
  background-color: #E6F7FF;
  color: #415058;
}

.details div span {
  float: right;
  padding-right: 20px;
  text-align: center;
  color: #415058;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
}

/*.details div span::after {*/
/*  content: "∨";*/
/*}*/

/*.details .collapsed span::after {*/
/*  content: "∧";*/
/*}*/

.details div.collapsed + ul {
  height: 0;
  transition: height 0.5s ease-out;
  display: none
}

.details ul {
  height: 120px;
  transition: height 0.5s ease-in;
}

.details ul li {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  padding-right: 20px;
  background-color: #F7F7F7;
}

.details ul li:hover {
  background-color: #E6F7FF;
}

/*推荐内容*/
.recommend {
  position: relative;
  width: 85%;
  height: 100%;
}

.box {
  background-color: antiquewhite;
  margin: 50px;
}

.box ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.box ul li {
  width: 200px;
  height: 270px;
  cursor: pointer;
  float: left;
  background-color: antiquewhite;
  margin: 40px;
}

.box ul li img {
  width: 100%;
  height: 75%;
  margin-bottom: 20px;
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
