<template>
  <div class="store">
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="title">
      店铺信息和联系方式
    </div>
    <div class="main">
      <div class="head">
        <span>门店</span>
        <span style="margin-left: 25px">门店名称</span>
        <span>门店地址</span>
        <span style="margin-right: 60px">联系方式</span>
        <span>
          <el-button type="text" @click="empty">
              <img src="../../assets/Images/Service/store_add.png" class="add">
          </el-button>
          <el-dialog title="增加门店信息" :visible.sync="addVisible" width="60%" :before-close="handleClose">
            <div class="mess"><span>门店名称：<input v-model="sto_name"></input></span><span style="margin-left: 42px">门店编号：<input v-model="sto_code"></input></span></div>
            <div class="mess">联系方式：<input v-model="sto_phone" style="width: 470px;"></input></div>
            <div class="mess">门店地址：<input v-model="province" placeholder="省"></input> <input v-model="city" placeholder="市"> </input> <input v-model="area" placeholder="县/区"></input></div>
            <div class="mess">详细地址：<input style="width: 470px;" v-model="detail"></input></div>
            <div class="some_btn">
              <button @click="addVisible = false">返 回</button>
              <button @click="add_one" style="margin-left: 200px">提 交</button>
            </div>
          </el-dialog>
          <el-dialog title="修改门店信息" :visible.sync="changeVisible" width="60%" :before-close="handleClose">
            <div class="mess"><span>门店名称：<input v-model="sto_name"></input></span><span style="margin-left: 42px">门店编号：<input v-model="sto_code"></input></span></div>
            <div class="mess">联系方式：<input v-model="sto_phone" style="width: 470px;"></input></div>
            <div class="mess">门店地址：<input v-model="province" placeholder="省"></input> <input v-model="city" placeholder="市"> </input> <input v-model="area" placeholder="县/区"></input></div>
            <div class="mess">详细地址：<input style="width: 470px;" v-model="detail"></input></div>
            <div class="some_btn">
              <button @click="changeVisible = false">返 回</button>
              <button @click="changeVisible = false, change_one(key)" style="margin-left: 200px">提 交</button>
            </div>
          </el-dialog>
        </span>
      </div>
      <ul>
        <li v-for="(s,index) of store" :key="index">
          <span><img :src="s.sto_photo" :alt="s.sto_name" :title="s.sto_name"></span>
          <span>{{ s.sto_name }}</span>
          <span>{{ s.province }} {{ s.city }} {{ s.area }} {{ s.detail }}</span>
          <span>{{ s.sto_phone }}</span>
          <span>
            <el-button type="text"  @click="changeVisible = true, tellKey(index)">
              <img src="../../assets/Images/Service/store_change.png" class="change">
            </el-button>
            <el-button type="text" @click="delete_one(index)">
              <img src="../../assets/Images/Service/store_delete.png" class="delete">
            </el-button>
          </span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import Nav from '@/components/nav-service'
export default {
  name: "Store_service",
  data() {
    return {
      store: [],
      addVisible: false,
      changeVisible: false,
      key: 0,
      // 门店名称
      sto_name: '',
      // 门店编号
      sto_code: '',
      // 省
      province: '',
      // 市
      city: '',
      // 县/区
      area: '',
      // 详细地址
      detail: '',
      // 联系方式
      sto_phone: '',
      // 门店图片
      sto_photo: '',

    }
  },
  components: {
    Nav
  },
  methods:{

    empty(){
      this.addVisible = true;
      this.sto_name = '';
      this.sto_code = '';
      this.sto_phone = '';
      this.province = '';
      this.city = '';
      this.area = '';
      this.detail = '';
    },

    tellKey(index){
      this.key = index;
      this.sto_name = this.store[index].sto_name;
      this.sto_code = this.store[index].sto_code;
      this.sto_phone = this.store[index].sto_phone;
      this.province = this.store[index].province;
      this.city = this.store[index].city;
      this.area = this.store[index].area;
      this.detail = this.store[index].detail;
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    add_one(){
      this.addVisible = false;
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/store/add',
        headers: {"Content-Type": "application/json"},
        data: {
          "sto_code": this.sto_code,
          "sto_name": this.sto_name,
          "province": this.province,
          "city": this.city,
          "area": this.area,
          "detail": this.detail,
          "sto_phone": this.sto_phone,
          // "sto_photo": this.sto_photo,
        },
      }).then(res => {
        console.log(res);
        location.reload();
      }).catch(err => {
        console.log(err);
      })

      this.$message({
        type: 'success',
        message: '新增门店信息成功!'
      });

    },

    change_one(key){

      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/store/change',
        headers: {"Content-Type": "application/json"},
        data: {
          "sto_id": this.store[key].sto_id,
          "sto_code": this.sto_code,
          "sto_name": this.sto_name,
          "province": this.province,
          "city": this.city,
          "area": this.area,
          "detail": this.detail,
          "sto_phone": this.sto_phone,
          // "sto_photo": this.sto_photo,
        }

      }).then(res => {
        console.log(res);
        location.reload();
      }).catch(err => {
        console.log(err);
      })

      this.$message({
        type: 'success',
        message: '修改门店信息成功!'
      });

    },

    delete_one(index){
      this.$confirm('此操作将永久删除该门店及其相关信息， 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });

        const self = this;
        self.$axios({
          method: 'post',
          url: 'http://127.0.0.1:8080/store/delete',
          headers: {"Content-Type": "application/json"},
          data: {
            "sto_id": this.store[index].sto_id,
          }
        }).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        })

        location.reload();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    showMsg() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/store/search',
        headers: {"Content-Type": "application/json"},
        data: {}

      })
        .then(res => {
          console.log(res);
          res.data.forEach(item=>{
            this.store.push(item);
          })
        }).catch(err => {
          console.log(err);
        })
    }
  },

  created() {
    this.showMsg();
  },

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

.store {
  width: 100vw;
  /*height: 100vh;*/
  background-color: antiquewhite;
  min-height: 1650px;

}

.maindiv {
  height: 63px;
}

.main {
  margin: 20px auto;;
  width: 88%;
  min-height: 300px;
  /*background-color: red;*/
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.add{
  width: 50px;
  height: 50px;
  margin-top: 15px;
  margin-right: 95px;
  cursor: pointer;
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
  background-color: #fad0d0;
}

.head {
  display: flex;
  justify-content: space-around;
  margin: 20px 20px;
  padding: 20px;
  height: 120px;
  background-color: #7fd299;
  border-radius: 30px;
  font-weight: 700;
}

.main ul > li {

  display: flex;
  justify-content: space-around;
  margin: 10px 20px;
  padding: 20px;
  height: 200px;
  background-color: #c9e7d5;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

}

.head span {
  height: 80px;
  line-height: 80px;
}

span {
  display: inline-block;

  height: 160px;
  /*background-color: rebeccapurple;*/
  line-height: 160px;
  text-align: center;
  font-size: 1.5rem;
}

span:nth-child(1) {
  flex: 1;
}

span:nth-child(2n) {
  flex: 2;
}

span:nth-child(3) {
  flex: 3;

}

span > img {
  height: 160px;
  width: 160px;
  border-radius: 20px;
}

.change, .delete{
  width: 55px;
  height: 55px;
  margin-top: 50px;
  margin-right: 35px;
  cursor: pointer;
}

.mess{
  font-size: 23px;
  color: gray;
}

.mess input{
  width: 150px;
  height: 30px;
  padding: 3px;
}

.some_btn button{
  width: 70px;
  height: 45px;
  font-size: 18px;
  border-radius: 25%;
  background-color: #CBE457;
  border: 1px solid gray;
  cursor: pointer;
}
</style>
