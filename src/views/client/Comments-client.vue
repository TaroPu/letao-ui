<template>
  <div class="comments">
    <div class="maindiv"><Nav></Nav></div>
    <div class="commodity_comments">
      <div class="title">
        <h3 style="display: inline"><img src="../../assets/Images/Home/goods.png"> 商品</h3>
        <h3 style="display: inline; margin-left: 36%"><img src="../../assets/Images/Home/satisfy.png"> 商品与描述相符</h3>
      </div>
      <ul class="a_commodity" v-for="(p, index) of comment_of_oneList" :key="index">
        <li>
          <h4>{{ p.pro_name }}</h4>
          <img :src="p.pro_image">
        </li>
        <li>
          <ul class="a_comment">
            <li class="score">
              <span>商品评分：</span>
              <el-rate
                v-model="com_star[index]"
                :colors="colors"
                style="width: 300px; display: inline">
              </el-rate>
            </li>
            <li><textarea class="text" placeholder="还可以输入200字" v-model="comment[index]"></textarea></li>
          </ul>
        </li>
      </ul>
      <div style="clear: both"></div>
    </div>
    <div class="store_comments">
      <div class="title">
        <h3><img src="../../assets/Images/Home/shop.png"> 店铺动态评分</h3>
      </div>
      <ul>
        <li>
          <span>卖家的服务态度：</span>
          <el-rate
            v-model="value2"
            show-text
            style="width: 300px; display: inline">
          </el-rate>
        </li>
        <li>
          <span>卖家发货的速度：</span>
          <el-rate
            v-model="value3"
            show-text
            style="width: 300px; display: inline">
          </el-rate>
        </li>
      </ul>
    </div>
    <div class="submit">
      <button @click="comments">发表评价</button>
      <button style="background-color: gray; color: white; margin-left: 36%" @click="order_list">返回</button>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav-client'
export default {
  name: "Comments-client",
  components:{
    Nav
  },
  data() {
    return {
      com_star: [5,5],
      value2: 5,
      value3: 5,
      colors: ['#6C6657', '#F7BA2A', '#FF9900'],
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      curUser: {},
      comment: {},
      comment_of_oneList: [],
      ord_id: '',
    }
  },
  methods:{
    order_list(){
      this.$router.replace({path:"/order_list"});
    },
    comments() {
      for(let i=0; i< this.comment_of_oneList.length; i++){
        Object.defineProperties(this.comment_of_oneList[i], {
          com_star: {
            value: this.com_star[i],
            writable: true
          },
          com_sth: {
            value: this.comment[i],
            writable: true
          },
        });
      }
      console.log(this.comment_of_oneList);


      const self = this;
      //console.log(this.comment);
      //console.log(this.com_star);
      // let a = this.comment_of_oneList
      for (let i of this.comment_of_oneList) {
        self.$axios({
          method: 'post',
          url: 'http://127.0.0.1:8080/corder/writecomment',
          headers: {"Content-Type": "application/json"},
          data: {
            "user_id": this.curUser.user_id,
            "com_star": i.com_star,
            "pro_id": i.pro_id,
            "com_sth": i.com_sth,
            //  "list2": this.comment,
            //  "list3": this.com_star,
          },
        }).catch(err => {
          console.log(err)
        })

        this.$message({
          type: 'success',
          message: '评价成功！',
        });
      }

      this.$router.replace({path:"/order_list"});
    },
  },
  created() {
    this.curUser = JSON.parse(sessionStorage.getItem('user'));
    this.comment_of_oneList = JSON.parse(sessionStorage.getItem('comment'));
    this.ord_id = sessionStorage.getItem('key');
    let i = this.comment_of_oneList.length;
    this.com_star = [];
    for(let a = 0;a<i;a++){
      this.com_star.push(5);
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

li{
  list-style: none;
}

.comments{
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
  padding-bottom: 50px;
}

.maindiv{
  height: 63px;
}

.commodity_comments{
  width: 70%;
  margin-left: 15%;
  margin-top: 66px;
}

.title{
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 18%;
  line-height: 50px;
  border: 4px solid #CBE457;
}

.title h3{
  font-size: 20px;
  margin-left: 16%;
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
}

h3 img{
  height: 36px;
  width: 36px;
  vertical-align: middle;
}

.a_commodity{
  display: flex;
  justify-content: space-around;
  float: left;
  width: 100%;
  margin: 20px auto;
  border-radius: 18%;
  background-color: white;
  padding: 10px;
  border: 4px solid #CBE457;
}

.a_commodity h4{
  height: 42px;
  width: 150px;
  font-size: 18px;
  line-height: 42px;
  text-align: center;
}

.a_commodity img{
  width: 150px;
  height: 120px;
}

.score{
  padding: 10px;
}

.text{
  width: 400px;
  height: 140px;
  resize: none;
  padding: 10px;
  font-size: 16px;

}

.store_comments{
  width: 70%;
  margin-left: 15%;
  margin-top: 30px;
}

.store_comments h3{
  text-align: center;
  margin-left: 0;
}

.store_comments ul{
  width: 100%;
  margin: 20px auto;
  border-radius: 18%;
  background-color: white;
  padding: 10px;
  border: 4px solid #CBE457;
  text-align: center;
}

.store_comments li{
  text-align: center;
  margin: 10px 0;
}

.submit{
  width: 70%;
  margin-left: 15%;
  margin-top: 30px;
  text-align: center;
}

button{
  width: 125px;
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
}

</style>
