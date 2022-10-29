<template>
  <div class="Product_type_manage">
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="mian">


      <el-input v-model="input" style="width: 250px;height: 50px" placeholder="请输入类别名称"></el-input>
      <el-button type="primary" icon="el-icon-search" style="width: 80px;height: 35px" @click="getCalsses">搜索
      </el-button>
      <el-button type="primary" icon="el-icon-plus" style="width: 80px;height: 35px" @click="toAdd">新增
      </el-button>

      <!--      商品列表-->
      <el-table
        :data="productType"
        :header-cell-style="{textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
        :stripe = true
        border

        style="width: 100%;">
        <el-table-column
          fixed
          prop="class_code"
          label="商品编号"
          width="160">
        </el-table-column>

        <el-table-column
          prop="class_name"
          label="类型名称"
          width="200">
        </el-table-column>


        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="width: 70px;height: 30px"
              @click="toEdit(scope.$index, productType)">编辑
            </el-button>
            <el-button
              size="mini"
              style="width: 70px;height: 30px"
              type="danger"
              @click="removeProductType(scope.$index,productType)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="新增/修改商品类型"
        :visible.sync="addVisible"
        width="750px"
        top="50px">
        <div class="add">


          <el-form :model="form" label-width="80px" style="width: 100%" class="demo-ruleForm">



            <el-row style="margin: 20px 50px">
              <el-col :span="12">
                <el-form-item label="类别编号">
                  <el-input v-model="form.class_code" placeholder="类别编号"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="类别名称">
                  <el-input  v-model="form.class_name" placeholder="类别编号"></el-input>
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
  name: "Product_type_manage",
  components: {
    Nav
  },
  data() {
    return {
      // bool值
      addVisible: false,
      isAdd:false,

      form: {
        class_id:0,
        class_code:'',
        chass_name:"",
      },


      input: '',

      productType: [],

      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]


    }
  },
  methods: {
    onSubmit(){
      this.addVisible = false;
      if(this.isAdd) this.addProductType()
      else this.editProductType()
    },

    // TODO 已完成接口
    addProductType(){
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/class/add',
        headers: {"Content-Type": "application/json"},
        // data:{
        //   "class_name":this.input
        // }
        data:this.form

      })
        .then(res => {
          if(res.data == 666){
            self.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.getCalsses();
          }
        })
        .catch(err => {
          console.log(err);
        })
      this.form = {
        class_code:'',
        chass_name:"",
      };
    },

    // TODO 未完成接口
    editProductType(){
      const self = this;
      console.log(this.form);
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/class/change',
        headers: {"Content-Type": "application/json"},
        // data:{
        //   "class_name":this.input
        // }
        data:this.form

      })
        .then(res => {
          if(res.data == 666){
            self.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.getCalsses();
          }

        })
        .catch(err => {
          console.log(err);
        })

      this.form = {
        class_code:'',
        chass_name:"",
      };

    },

    // TODO 未完成接口
    removeProductType(row, tableData) {
      const self = this;
      // console.log(tableData);
      console.log(tableData[row].class_id);
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/class/delete',
        headers: {"Content-Type": "application/json"},
        data: {
          "class_id":tableData[row].class_id
        }

      })
        .then(res => {
          if(res.data == 666){
            tableData.splice(row, 1);
            self.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.getCalsses();
          }

        })
        .catch(err => {
          console.log(err);
        })

    },

    // TODO 未完成接口
    getCalsses() {
      const self = this;
      this.productType = [];
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/class/inquire',
        headers: {"Content-Type": "application/json"},
        data:{
          "class_name":this.input
        }

      })
        .then(res => {
          res.data.forEach(item => {
            this.productType.push(item);
          });

        })
        .catch(err => {
          console.log(err);
        })
    },
    toAdd(){
      this.form = {
        class_code:'',
        chass_name:"",
      };
      this.isAdd = true;
      this.addVisible = true
    },
    toEdit(row,tableData){
      this.form = tableData[row];
      this.isAdd = false;
      this.addVisible = true;
    },
  },


  created() {
    this.getCalsses();

  },
  watch: {

    input() {
      this.getCalsses();
    }
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

.Product_type_manage {
  min-height: 100vh;
  width: 100%;
}

.mian {
  /*width: 80%;*/
  max-width: 700px;
  min-width: 600px;
  margin-left: 80px;
  margin-top: 30px;
  align-items: center;
}

.add {
  display: flex;
  width: 700px;
  height: 200px;
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
