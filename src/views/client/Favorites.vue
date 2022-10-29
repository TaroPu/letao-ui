<template>
  <div class="searchDetails">

    <!--    顶部导航-->
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <img width="30px" src="../../assets/Images/Home/my_favorites.png" style="margin-left: 60px;vertical-align: center;">
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
        <li v-for="(p,index) of showProduct" :key="index" @click="toProdetails(index)">

          <img :src="p.pro_image" :alt='p.alt'>
          <h4>￥{{ parseFloat(p.price).toFixed(2) }}</h4>
          <h4>{{ p.pro_name }}</h4>
          <span><img width="30px" src="../../assets/Images/Home/my_favorites.png"
                     @click.stop="removeFavorite(index)"> <img
            width="30px" src="../../assets/Images/Home/cart.png" @click.stop="addCart(index)"></span>
        </li>
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
      product: [],
      showProduct:[],
      value: '',
      curUser: {}
      // searchValue: ''
    }
  },
  methods: {
    getFavorite() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/collect/search',
        headers: {"Content-Type": "application/json"},
        data: {
          "user_id": this.curUser.user_id
        }

      })
        .then(res => {
          this.product = [];
          res.data.forEach(item => {
            this.product.push(item);
          });
          this.showProduct = this.product;
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
    toProdetails(index) {
      sessionStorage.setItem('CurProduct', JSON.stringify(this.showProduct[index]));

      this.$router.replace('/pro_datails')
    },
    addCart(index) {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/shop/add',
        headers: {"Content-Type": "application/json"},
        data: {
          "user_id": this.curUser.user_id,
          "pro_id": this.showProduct[index].pro_id,
          "number": 1
        }

      })
        .then(res => {
          switch (res.data) {
            case 666:
              self.$notify({
                title: '成功',
                message: '成功增加到购物车',
                type: 'success'
              });
              break;
            defaults:
              self.$notify({
                title: '失败',
                message: '操作失败',
                type: 'error'
              });
              break
          }

        })
        .catch(err => {
          console.log(err);

        })
    },
    removeFavorite(index) {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/collect/delete',
        headers: {"Content-Type": "application/json"},
        data: {
          "user_id": this.curUser.user_id,
          "pro_id": this.showProduct[index].pro_id
        }

      })
        .then(res => {
          console.log(res.data);
          switch (res.data) {
            case 666:
              self.$notify({
                title: '成功',
                message: '取消收藏了该商品',
                type: 'warning'
              });
              // this.showProduct.splice(index, 1);
              this.getFavorite();
              break;
            case 700:
              self.$notify({
                title: '失败',
                message: '操作失败',
                type: 'error'
              });
              break
          }

        })
        .catch(err => {
          console.log(err);

        })

    },
  },
  components: {
    Nav
  },
  created() {
    this.curUser = JSON.parse(sessionStorage.getItem('user'));
    this.getCalsses();
    this.getFavorite();
    // console.log(this.showProduct)

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
      console.log(this.showProduct);

    },
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
  min-height: 100vh;
  margin: 0;
  background-color: antiquewhite;
}

.maindiv {
  height: 63px;
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
