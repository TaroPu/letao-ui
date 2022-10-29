<template>
  <div class="Product_msg_manage">
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="mian">
      <!--      <el-select v-model="type" filterable placeholder="所有种类" style="width: 200px; margin: 20px 0 0 0px;">-->
      <!--        <el-option style="text-align: center"-->
      <!--                   v-for="(item,index) of options"-->
      <!--                   :key="index"-->
      <!--                   :label="item.class_name"-->
      <!--                   :value="item.class_id">-->
      <!--        </el-option>-->
      <!--      </el-select>-->

        <el-select v-model="sex" filterable placeholder="性别"
                   style="width: 200px; margin: 20px 0 0 0px;">
          <el-option label="所有" value="0"></el-option>
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>

      <el-input v-model="name" style="width: 250px;height: 50px" placeholder='姓名'></el-input>
      <el-input v-model="phone" style="width: 250px;height: 50px" placeholder='手机号'></el-input>
      <el-button type="primary" icon="el-icon-search" style="width: 80px;height: 35px" @click="getUser">搜索
      </el-button>
      <el-button type="primary" icon="el-icon-plus" style="width: 80px;height: 35px" @click="toAdd">新增
      </el-button>



      <!--      活动列表-->
      <el-table
        :data="User"
        :header-cell-style="{textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
        :stripe=true
        border
        style="width: 100%;">

        <el-table-column
          fixed
          prop="user_id"
          label="账号名"
          width="160">
        </el-table-column>


        <el-table-column
          prop="iden_name"
          label="账号类型"
          width="200">
        </el-table-column>

        <el-table-column
          prop="user_name"
          label="姓名"
          width="200">
        </el-table-column>

        <el-table-column
          prop="user_sex"
          label="性别"
          width="120">
        </el-table-column>

        <el-table-column
          prop="user_phone"
          label="手机号"
          width="220">
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="220">
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="width: 70px;height: 30px"
              @click="toEdit(scope.$index, User)">修改
            </el-button>
            <el-button
              size="mini"
              style="width: 70px;height: 30px"
              type="danger"
              @click="removeUser(scope.$index,User)">撤销管理员
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="page"
        :total="1000">
      </el-pagination>
      <!--      新增-->
      <el-dialog
        title="新增/修改管理员信息"
        :visible.sync="addVisible"
        width="750px"
        top="50px">
        <div class="add">


          <el-form :model="form" label-width="80px" style="width: 100%" class="demo-ruleForm">

            <el-row style="margin: 15px 20px 15px 80px">

              <el-col :span="8">
                <el-select v-model="form.user_id" @change="getCurUser" filterable placeholder="账号"
                           style="width: 200px; margin: 20px 0 0 0px;">
                  <el-option style="text-align: center"
                             v-for="(item,index) of userID"
                             :key="index"
                             :label="item.user_id"
                             :value="item.user_id">
                  </el-option>
                </el-select>
              </el-col>

              <el-col :span="8">
                <el-select v-model="form.iden_id" filterable placeholder="账号类型"
                           style="width: 200px; margin: 20px 0 0 0px;">
                  <el-option style="text-align: center"
                             v-for="(item,index) of identity"
                             :key="index"
                             :label="item.iden_name"
                             :value="item.iden_id">
                  </el-option>
                </el-select>
              </el-col>

            </el-row>





            <el-row style="margin: 20px 50px 20px 0px">
              <el-col :span="12">
                <el-form-item label="姓名">
                  <el-input v-model="form.user_name" placeholder="姓名"></el-input>
                </el-form-item>
              </el-col>


            </el-row>



          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false" style="height: 35px;width: 80px">取 消</el-button>
       <el-button type="primary" @click="onSubmit" style="height: 35px;width: 80px">确 定</el-button>
         </span>
      </el-dialog>

    </div>

  </div>

</template>

<script>
import Nav from '@/components/nav-service'

export default {
  name: "Product_msg_manage",
  components: {
    Nav
  },
  data() {
    return {
      // bool值
      addVisible: false,
      change : false,


      sex: '',
      name: '',
      phone:'',
      page:1,

      form:{
        user_id:'',
        user_name:'',
        iden_id:''
      },

      identity:[],
      userID:[],
      User:[],
      UserGeted:[],




    }
  },
  methods: {
    onSubmit() {
      this.addVisible = false;
      if (this.isAdd) this.addUser();
      else this.addUser();
    },


    addUser() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/addworker',
        headers: {"Content-Type": "application/json"},
        data: {
          "user_id":this.form.user_id,
          "iden_id":this.form.iden_id
        }

      })
        .then(res => {
          if (res.data == 666) {
            self.$notify({
              title: '成功',
              message: '新增成功！',
              type: 'success'
            });
            this.getUser();
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    // TODO 未实现接口
    editUser() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/add',
        headers: {"Content-Type": "application/json"},
        // data:{
        //   "user_id":tableData[row].user_id
        //
        // }
        data:this.form,

      })
        .then(res => {
          if(res.data == 666){
            self.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.getUser();
          }
        })
        .catch(err => {
          console.log(err);
        })

    },

    // TODO 未实现接口
    removeUser(row,tableData){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/deleteworker',
        headers: {"Content-Type": "application/json"},
        data:{
          "user_id":tableData[row].user_id

        }

      })
        .then(res => {
          if (res.data == 666) {
            self.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.getUser();
          }
        })
    },

    // TODO 未实现接口
    getUser(){
      const self = this;
      console.log(this.page)
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/searchworker',
        headers: {"Content-Type": "application/json"},
        data:{
          "user_name":this.name,
          "user_phone":this.phone,
          "page_num":this.page

        }

      })
        .then(res => {
          this.UserGeted = [];
          res.data.forEach(item=>{
            this.UserGeted.push(item);
          })
          this.User = this.UserGeted;
        })
        .catch(err => {
          console.log(err);
        })
    },


    // TODO 未实现接口
    getUserID(){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/search',
        headers: {"Content-Type": "application/json"},
        data:{

        }

      })
        .then(res => {
          this.userID = [];
          res.data.forEach(item=>{
            this.userID.push(item);
          })
        })
        .catch(err => {
          console.log(err);
        })
    },

    getCurUser(){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/idsearchworker',
        headers: {"Content-Type": "application/json"},
        data:{
          "user_id":this.form.user_id
        }

      })
        .then(res => {
          this.form.user_name = res.data[0].user_name;

        })
        .catch(err => {
          console.log(err);
        })
    },

    // TODO 未实现接口
    getIdentity(){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/identity',
        headers: {"Content-Type": "application/json"},
        data:{

        }

      })
        .then(res => {
          this.identity= [];
          res.data.forEach(item=>{
            this.identity.push(item);
          })
        })
        .catch(err => {
          console.log(err);
        })
    },

    toAdd() {
      this.getUserID();
      this.form = {
        user_id:'',
        user_name:'',
        iden_id:''
      };
      this.isAdd = true;
      this.addVisible = true
    },
    toEdit(row, tableData) {
      this.form = tableData[row];
      this.isAdd = false;
      this.addVisible = true;
    },

  },
  created() {
    this.getUser();
    this.getIdentity();
  },
  watch:{
    sex(value){
      if(value !=0){
      this.User = [];
      this.UserGeted.forEach(item=>{
        if(item.user_sex == value){
          this.User.push(item);
        }
      })
      }else{
        this.User = this.UserGeted;
      }

    },
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  list-style: none;
}

.maindiv {
  height: 63px;
}

.Product_msg_manage {
  min-height: 100vh;
  width: 100%;
}

.mian {
  /*width: 80%;*/
  max-width: 1300px;
  min-width: 800px;
  margin-left: 80px;
  margin-top: 30px;
  align-items: center;
}


</style>
