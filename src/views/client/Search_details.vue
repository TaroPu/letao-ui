<template>
  <div class="searchDetails">

    <!--    顶部导航-->
    <div class="maindiv"><Nav></Nav></div>

    <div class="box">
      <ul>
        <li v-for="(p,index) of product" :key="index" @click="toProdetails(index)" >
          <img :src="p.pro_image" :alt="p.pro_name">
          <h4>￥{{parseFloat(p.price).toFixed(2)}}</h4>
          <h4>{{p.pro_name}}</h4>
        </li>

      </ul>
    </div>
    <div class="nav_bottom">
      <div class="pagination-bar">
        <el-pagination
          background
          layout="prev, pager, next"
          style="margin-top: 50px"
          current-page.sync="page"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav-client'
export default {
  name: "Search_details",
  data(){
    return{
      product:[],
      page:1,
    }
  },
  components:{
    Nav
  },
  methods:{
    toProdetails(index) {
      sessionStorage.setItem('CurProduct',JSON.stringify(this.product[index]));
      this.$router.replace('/pro_datails')
    },
    search(){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/cproduct/csearch',
        headers: {"Content-Type": "application/json"},
        data:{
          "class_id":this.classType,
          "pro_name":this.searchValue,
          "page_id":this.page
        }

      })
        .then(res => {
          console.log(res.data);
          res.data.forEach(item => {
            this.product.push(item);
          });
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  created() {
    this.classType = sessionStorage.getItem('classtype')
    this.searchValue = sessionStorage.getItem('searchvalue')
    console.log('classtype:',this.classType)
    console.log('searchValue:',this.searchValue)
    this.search();
  },
}
</script>

<style scoped>
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

li{
  list-style: none;
}

.searchDetails{
  width: 100%;
  min-height: 100vh;
  margin: 0;
  background-color: antiquewhite;
}
.maindiv {
  height: 63px;
}

.box{
  background-color: antiquewhite;
}

.box ul{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.box ul li{
  width: 200px;
  height: 270px;
  float: left;
  background-color: antiquewhite;
  margin: 50px;
}

.box ul li img{
  width: 100%;
  height: 75%;
  margin-bottom: 20px;
}

.box ul li h4{
  margin-left: 45px;
  font-size: 16px;
  color: #050505;
  font-weight: 400;
}

.box ul li h4:nth-of-type(1){
  color: red;
  margin-bottom: 5px;
}

.nav_bottom{
  width: 100%;
  height: 80px;
  background-color: antiquewhite;

}

.pagination-bar {
  padding: 20px 0;
  text-align: center;
}

.nav_bottom .pagination-bar .selected{
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

.nav_bottom .pagination-bar ul li:hover{
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

.nav_bottom .pagination-bar ul li span:hover{
  transform: scale(1.2);
  color: #1684FC;
}
</style>
