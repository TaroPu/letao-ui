<template>
  <div class="Product-details-client">

    <!--    顶部导航-->
    <div class="maindiv">
      <Nav></Nav>
    </div>

    <div class="basic">

      <div class="picture">
        <img :src="product.pro_image">
      </div>


      <div class="basic_message">

        <div class="name">
          <h2>{{ product.pro_name }} </h2>
          <!--          <h3>2个装 新鲜包甜</h3>-->
        </div>


        <!--        销量-->
        <div class="sales">
          <div class="price">
            <label for="price">价格:</label>
            <span id="price" style="font-size: 2rem;color: #ff0116">￥{{ parseFloat(product.price).toFixed(2) }}</span>
            /
            <span style="text-decoration: line-through">{{ parseFloat(product.zprice).toFixed(2) }}</span>
          </div>

          <div class="salesMonth">

            <label for="sales">月销量:</label>
            <span id="sales">{{ product.sale }}</span>

          </div>


        </div>

        <!--        数量-->
        <div class="count">
          <span>数量：</span>
          <button @click="subCount">-</button>
          <input type="number" v-model="count"></input>
          <button @click="plusCount">+</button>
        </div>


        <!--        操作-->
        <div class="operate">
          <ul>
            <li><img src="../../assets/Images/Home/Customer_service.png" @click="toCantact"></li>
            <li><img src="../../assets/Images/Home/cart.png" @click="AddShop"></li>
            <li><img src="../../assets/Images/Home/favorites.png" @click="AddFavorites"></li>
            <li>
              <button @click="toPay">结算</button>
            </li>
          </ul>
        </div>


      </div>
    </div>

    <div class="otherMsg">
      <ul>
        <li @click="checkDetails">商品详情</li>
        <li @click="checkComment">评价<span v-if="comments.length != 0">（{{ comments.length }})</span></li>
        <div></div>
      </ul>
      <br>
      <div class="message">
        <div class="detail" style="display: block">
          <ul>
            <li><span>商品名称</span>：{{ product.pro_name }}</li>
            <li><span>商品编号</span>：{{ product.pro_id }}</li>
            <li><span>毛重</span>：{{ product.pro_weight }}</li>
            <li><span>产地</span>：{{ product.pro_place }}</li>
            <li><span>类型</span>：{{ product.pro_type }}</li>
            <li><span>商品品牌</span>：{{ product.pro_brand }}</li>
            <li><span>国产/进口</span>：{{ product.domestic }}</li>

          </ul>
        </div>


        <div class="comment" style="display: none">
          <ul>
            <li v-for="(com,index) of comments" :key="index">
              <hr>
              <img class="photo" :src="com.user_photo">
              <span class="usermessage">
                <div style="font-size: 1.1rem;height: 40%">{{ com.user_name }}</div>
                <el-rate
                  disabled
                  v-model="com.com_star" show-text>
              </el-rate>
              </span>
              <span class="content">{{ com.com_sth }}</span>
            </li>

          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav-client'

export default {
  name: "Product-details-client",
  data() {
    return {
      count: 1,
      isFromCart:false,
      // commentCount:0,
      comments: [],
      product:{},
      Curuser:{},


    }
  },


  methods: {
    removeShop(){
      this.opensucess2();
    },
    AddShop(){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/shop/add',
        headers: {"Content-Type": "application/json"},
        data: {
          "pro_id":this.product.pro_id,
          "user_id":this.Curuser.user_id,
          "number":this.count
        }

      })
        .then(res => {
          console.log(res.data)
          switch (res.data){
            case 666:
              self.opensucess();
              break;
            case 700:
              console.log(12345678);
              this.removeShop();
              break;
          }

        })
        .catch(err => {
          console.log(err);
        })
    },
    AddFavorites(){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/collect/add',
        headers: {"Content-Type": "application/json"},
        data: {
          "pro_id":this.product.pro_id,
          "user_id":this.Curuser.user_id,
        }

      })
        .then(res => {
          if(res.data == 666){
            self.opensucess1();
          }
          else if(res.data == 700){
            this.removeShop()
          }

        })
        .catch(err => {
          console.log(err);
        })
    },
    getComment(){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/cproduct/comment',
        headers: {"Content-Type": "application/json"},
        data: {
          "pro_id":this.product.pro_id,
          // "user_id":this.Curuser.user_id,
        }

      })
        .then(res => {
          // if(res.data == 666){
          //   self.opensucess1();
          // }
          console.log(res)
          this.comments = res.data;


        })
        .catch(err => {
          console.log(err);
        })
    },
    opensucess() {
      const self = this;
      self.$notify({
        title: '成功',
        message: '成功增加到购物车！',
        type: 'success'
      });
    },
    opensucess1() {
      const self = this;
      self.$notify({
        title: '成功',
        message: '收藏成功！',
        type: 'success'
      });
    },
    opensucess2() {
      const self = this;
      self.$notify({
        title: '成功',
        message: '取消收藏！',
        type: 'warning'
      });
    },
    toCantact() {
      this.$router.replace('/contact_us');
    },
    toAbout() {
      this.$router.replace('/about_client')
    },
    toPay() {
      sessionStorage.setItem('order', JSON.stringify(this.product));

      // console.log(this.product.number);
      sessionStorage.setItem('isFromDetails',"true");
      sessionStorage.setItem('total', JSON.stringify(this.product.price * this.count));
      sessionStorage.setItem('count',this.count);
      this.$router.replace('settlement')
    },
    subCount() {
      this.count--;
      console.log(this.count)
      this.count = Math.max(1, this.count);
      console.log(this.count)
    },
    plusCount() {
      this.count++;
      this.count = Math.min(99, this.count);
    },
    checkDetails() {
      document.querySelector('.detail').style.display = 'block';
      document.querySelector('.comment').style.display = 'none';
      document.querySelector('.otherMsg ul>li:nth-child(1)').style.backgroundColor = '#7fdc31'
      document.querySelector('.otherMsg ul>li:nth-child(2)').style.backgroundColor = '#bbbdb9'

    },
    checkComment() {
      this.getComment();  //TODO 打开获取评论

      document.querySelector('.detail').style.display = 'none';
      document.querySelector('.comment').style.display = 'block';
      document.querySelector('.otherMsg ul>li:nth-child(2)').style.backgroundColor = '#7fdc31'
      document.querySelector('.otherMsg ul>li:nth-child(1)').style.backgroundColor = '#bbbdb9'
    },
    getDetail(){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/cproduct/cdetail',
        headers: {"Content-Type": "application/json"},
        data: {
          "pro_id":this.product.pro_id,
        }

      })
        .then(res => {

          console.log(res)
          this.product = res.data;

        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  ,
  components: {
    Nav
  }
  ,
  created() {
    this.product = JSON.parse(sessionStorage.getItem('CurProduct'));
    this.isFromCart = sessionStorage.getItem('isFromCart');
    this.Curuser = JSON.parse(sessionStorage.getItem('user'));
    // console.log(this.product)
    if(this.isFromCart) this.getDetail();

  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  /*overflow-x: auto;*/
  /*overflow-y: hidden;*/
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}


.maindiv {
  height: 63px;
}

.Product-details-client {
  background-color: antiquewhite;
  width: 100vw;
  /*height: 100vh;*/
}

/*基本信息*/
.basic {
  margin: 40px auto;
  display: flex;
  height: 400px;
  width: 70vw;

}

.picture {
  /*width: 300px;*/
  /*height: 300px;*/
  height: 100%;
  /*background-color: #37d02b;*/
}

.picture img {
  /*width: 300px;*/
  /*height: 300px;*/
  height: 100%;
  /*background-color: #37d02b;*/
}

.basic_message {
  flex: 1;
  position: relative;
  background-color: #dae0df;
  border-top-right-radius: 40px;
}

.name {
  margin-top: 20px;
  width: 100%;
  height: 80px;
  text-align: center;
}


.sales {
  display: flex;
  justify-content: space-around;
  height: 100px;
  width: 600px;
  font-size: 20px;
  /*background-color: #efcc1a;*/
}

.sales .price {
  width: 350px;
  height: 100%;
  /*background-color: #cc5858;*/
  line-height: 100px;
}

.sales .salesMonth {
  display: inline-block;
  width: 150px;
  height: 100%;
  line-height: 100px;
  /*background-color: #2c9f3f;*/
}


.count {
  width: 250px;
  height: 100px;
  margin-left: 30px;
  /*background-color: #74bd30;*/
  line-height: 100px;
  font-size: 1.5rem;

}

.count button {
  width: 40px;
  height: 40px;
  font-size: 2rem;
}

.count button :hover {
  background-color: #6269ff;

}

.count input {
  -moz-appearance: none;
  width: 60px;
  height: 40px;
  text-align: center;
  font-size: 2rem;
  color: #989f10;
  font-weight: 700;
  border: none;
  background: none;
}


.operate {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 450px;
  height: 100px;
  /*background-color: #39e86b;*/
}

.operate > ul > li {
  float: left;
  height: 100%;
}

.operate > ul > li img {
  height: 50px;
  margin: 25px 10px;
  cursor: pointer;

}

.operate > ul > li button {
  height: 50px;
  width: 120px;
  margin: 25px;
  border-radius: 15px;
  border: none;
  background-color: #03f1fd;
  cursor: pointer;
}


/*--------------------*/
.otherMsg {
  /*overflow: hidden;*/
  border: solid 5px #d7d4d4;
  /*position: relative;*/
  width: 80%;
  min-height: 200px;
  min-width: 800px;
  /*max-height: 500px;*/
  margin: 0 auto;
  padding-bottom: 50px;
  border-right: none;
  border-bottom: none;
}

.otherMsg > ul > div {
  clear: both;
}

.otherMsg > ul > li {
  float: left;
  width: 120px;
  height: 50px;
  background-color: #bbbdb9;

  cursor: default;
}

.otherMsg > ul > li:nth-child(1) {
  background-color: #7fdc31;
}

.message {
  /*position: absolute;*/
  width: 100%;
  min-height: 145px;
  /*top: 50px;*/
  /*background-color: #e53b3b;*/
}

.message .detail {
  width: 600px;
  min-height: 200px;

}

.detail > ul {
  width: 80%;
  padding-left: 20px;
  font-size: 20px;
  line-height: 40px;
}

.detail > ul > li > span {
  display: inline-block;
  text-align: justify;
  text-align-last: justify;
  width: 100px;
  font-weight: 700;
}


/*------------------*/

.comment > ul > li {
  display: flex;
  width: 100%;
  height: 100px;
  margin: 10px 30px;
}

.comment > ul > li img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.comment > ul > li .usermessage {
  width: 200px;
  height: 100px;
  /*background-color: #1e7044;*/
  text-align: center;
  padding: 10px 2px;

}

.comment > ul > li .content {
  flex: 7;
  background-color: #e7e7e4;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px;
  text-overflow: ellipsis;
}


</style>
