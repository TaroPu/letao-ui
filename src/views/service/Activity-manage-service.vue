<template>
  <div class="Activity-manage-service">
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="mian">


      <img src="../../assets/Images/Service/act.png" width="88px;"style="vertical-align: bottom">
      <el-button type="primary" icon="el-icon-plus" style="width: 80px;height: 35px;margin: 25px 20px;vertical-align: bottom" @click="toAdd">新增
      </el-button>

      <!--      活动列表-->
      <el-table
        :data="Activity"
        :header-cell-style="{textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
        :stripe=true
        border
        style="width: 100%;">

        <el-table-column
          fixed
          prop="act_id"
          label="活动编号"
          width="160">
        </el-table-column>


        <el-table-column
          prop="act_name"
          label="活动名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="负责人"
          width="140">
        </el-table-column>
        <el-table-column
          prop="act_status"
          label="活动状态"
          width="140">
        </el-table-column>

        <el-table-column
          prop="sto_name"
          label="活动店铺"
          width="200">
        </el-table-column>

        <el-table-column
          prop="begin"
          label="开始时间"
          width="140">
        </el-table-column>

        <el-table-column
          prop="end"
          label="结束时间"
          width="140">
        </el-table-column>

        <el-table-column
          prop="discount"
          label="折扣"
          width="140">
        </el-table-column>



        <el-table-column
          prop="act_sth"
          label="其他信息"
          width="140">
        </el-table-column>


        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="width: 70px;height: 30px"
              @click="toEdit(scope.$index, Activity)">编辑
            </el-button>
            <el-button
              size="mini"
              style="width: 70px;height: 30px"
              type="danger"
              @click="removeActivity(scope.$index,Activity)">删除
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
      <!--      :before-close="handleClose"-->
      <!--      新增-->

      <el-dialog
        title="新增/修改活动信息"
        :visible.sync="addVisible"
        width="750px"
        top="50px">
        <div class="add">


          <el-form :model="form" label-width="80px" style="width: 100%" class="demo-ruleForm">


                        <el-row style="margin: 20px 50px 20px 130px">
                          <el-col :span="8">
                            <el-select v-model="form.sto_id" filterable placeholder="店铺地址"
                                       style="width: 200px; margin: 20px 0 0 0px;">
                              <el-option style="text-align: center"
                                         v-for="(item,index) of Store"
                                         :key="index"
                                         :label="item.sto_name"
                                         :value="item.sto_id">
                              </el-option>
                            </el-select>
                          </el-col>
                        </el-row>


            <el-row style="margin: 20px 50px">
              <el-col :span="12">
                <el-form-item label="活动名称">
                  <el-input v-model="form.act_name" placeholder="活动名称"></el-input>
                </el-form-item>
              </el-col>

            </el-row>


            <el-row style="margin: 20px 50px">
              <el-col :span="10">
                <el-form-item label="开始时间">

                  <el-date-picker type="date" placeholder="开始日期" v-model="form.begin" style="width: 100%;"></el-date-picker>

                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="结束时间">
                  <el-date-picker type="date" placeholder="结束日期" v-model="form.end" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin: 20px 50px">
              <el-col :span="8">
                <el-form-item label="折扣">
                  <el-input v-model="form.discount" placeholder="折扣"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin: 20px 50px">
              <el-col :span="15">
                <el-form-item label="详情">
                  <el-input type="textarea" v-model="form.act_sth" placeholder="其他信息"></el-input>
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
  name: "Activity-manage-service",
  components: {
    Nav
  },
  data() {
    return {
      // bool值
      addVisible: false,
      isAdd: false,

      page: 1,
      form: {
        pro_id: '',
        act_name: '',
        begin: '',
        end: '',
        discount: '',
        user_id: '',
        act_sth: '',
        sto_id: '',
      },
      newform: {
        pro_id: '',
        act_name: '',
        begin: '',
        end: '',
        discount: '',
      },


      type: '',
      Store: [],
      Activity: [],

      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]


    }
  },
  methods: {
    onSubmit() {
      this.addVisible = false;
      this.form.user_id = JSON.parse(sessionStorage.getItem('user')).user_id;
      if (this.isAdd) this.addActivity();
      else this.editActivity();
      this.form={
        pro_id: '',
          act_name: '',
          begin: '',
          end: '',
          discount: '',
      };
    },

    addActivity() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/activity/add',
        headers: {"Content-Type": "application/json"},
        data: this.form
        // data:{
        //   "class_id": this.form.class_id,
        //   "pro_name": this.form.pro_name,
        //   "pro_id":this.form.pro_id,
        //   "price": this.form.price,
        //   "pro_num": this.form.pro_num,
        //   "domestic": this.form.domestic,
        //   "act_id": this.form.act_id,
        //   "zprice": this.form.zprice,
        //   "detailmoney": this.form.detailmoney,
        //   "pro_weight": this.form.pro_weight,
        //   "pro_place": this.form.pro_place,
        //   "pro_brand": this.form.pro_brand,
        //   "pro_image":this.form.pro_image,
        //   "sale":this.form.sale.sale
        // }

      })
        .then(res => {
          if (res.data == 666) {
            self.$notify({
              title: '成功',
              message: '新增成功！',
              type: 'success'
            });
            this.getActivity();
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    editActivity() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/activity/change',
        headers: {"Content-Type": "application/json"},
        data: this.form
        // data:{
        //   "class_id": this.form.class_id,
        //   "pro_name": this.form.pro_name,
        //   "pro_id":this.form.pro_id,
        //   "price": this.form.price,
        //   "pro_num": this.form.pro_num,
        //   "domestic": this.form.domestic,
        //   "act_id": this.form.act_id,
        //   "zprice": this.form.zprice,
        //   "detailmoney": this.form.detailmoney,
        //   "pro_weight": this.form.pro_weight,
        //   "pro_place": this.form.pro_place,
        //   "pro_brand": this.form.pro_brand,
        //   "pro_image":this.form.pro_image,
        //   "sale":this.form.sale.sale
        // }

      })
        .then(res => {
          if (res.data == 666) {
            self.$notify({
              title: '成功',
              message: '编辑成功！',
              type: 'success'
            });
            this.getActivity();
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    removeActivity(row,tableData) {
      // console.log(tableData[row].pro_id);
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/activity/delete',
        headers: {"Content-Type": "application/json"},
        data: {
          "act_id": tableData[row].act_id
        }

      })
        .then(res => {
          tableData.splice(row, 1);

        })
        .catch(err => {
          console.log(err);
        })
    },

    getActivity() {
      const self = this;
      this.Activity = [],
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/activity/searchadmin',
        headers: {"Content-Type": "application/json"},
        data: {}

      })
        .then(res => {
          let status=['审核中','未通过','未开始','进行中','已结束'];
          res.data.forEach(item => {
            item.act_status = status[item.act_status];
            this.Activity.push(item);
          })
          // console.log(this.Activity)

        })
        .catch(err => {
          console.log(err);
        })
    },

    getStore(){
      const self = this;
      this.Store = [],
        self.$axios({
          method: 'post',
          url: 'http://127.0.0.1:8080/store/search',
          headers: {"Content-Type": "application/json"},
          data: {}

        })
          .then(res => {
            // console.log(res);
            res.data.forEach(item => {
              this.Store.push(item);
            })

          })
          .catch(err => {
            console.log(err);
          })
    },


    handleAvatarSuccess(res, file) {
      this.form.pro_image = URL.createObjectURL(file.raw);
      console.log(this.form.pro_image);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    toAdd() {
      this.form = this.newform;
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
    this.getActivity();
    this.getStore();
  },
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

.Activity-manage-service {
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

.add {
  display: flex;
  width: 700px;
  height: 350px;
}

el-input {
  width: 50%;
}

el-form {
  display: flex;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}


</style>
