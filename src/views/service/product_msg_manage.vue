<template>
  <div class="Product_msg_manage">
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="mian">
      <el-select v-model="type" filterable placeholder="所有种类" style="width: 200px; margin: 20px 0 0 0px;">
        <el-option style="text-align: center"
                   v-for="(item,index) of options"
                   :key="index"
                   :label="item.class_name"
                   :value="item.class_id">
        </el-option>
      </el-select>


      <el-input v-model="input" style="width: 250px;height: 50px" placeholder="请输入商品名称"></el-input>
      <el-button type="primary" icon="el-icon-search" style="width: 80px;height: 35px" @click="getProducts">搜索
      </el-button>
      <el-button type="primary" icon="el-icon-plus" style="width: 80px;height: 35px" @click="toAdd">新增
      </el-button>

      <!--      商品列表-->
      <el-table
        :data="products"
        :header-cell-style="{textAlign:'center'}"
        :cell-style="{textAlign:'center'}"
        :stripe = true
        border
        style="width: 100%;">
        <el-table-column
          fixed
          prop="pro_type"
          label="商品类别"
          width="160">
        </el-table-column>

        <el-table-column
          prop="pro_id"
          label="商品编号"
          width="200">
        </el-table-column>

        <el-table-column
          prop="pro_name"
          label="商品名称"
          width="300">
        </el-table-column>

        <el-table-column
          prop="price"
          label="价格（元）"
          width="140">
        </el-table-column>

        <el-table-column
          prop="pro_num"
          label="库存（件）"
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
              @click="toEdit(scope.$index, products)">编辑
            </el-button>
            <el-button
              size="mini"
              style="width: 70px;height: 30px"
              type="danger"
              @click="removeProduct(scope.$index,products)">删除
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
        title="新增/修改商品信息"
        :visible.sync="addVisible"
        width="750px"
        top="50px">
        <div class="add">


          <el-form :model="form" label-width="80px" style="width: 100%" class="demo-ruleForm">

            <el-row style="margin: 15px">

              <el-col :span="8">
                <el-select v-model="form.class_id" filterable placeholder="所有种类"
                           style="width: 200px; margin: 20px 0 0 0px;">
                  <el-option style="text-align: center"
                             v-for="(item,index) of options"
                             :key="index"
                             :label="item.class_name"
                             :value="item.class_id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select v-model="form.domestic" filterable placeholder="进口/国产"
                           style="width: 200px; margin: 20px 0 0 0px;">
                  <el-option label="进口" value="进口"></el-option>
                  <el-option label="国产" value="国产"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select v-model="form.act_id" filterable placeholder="活动"
                           style="width: 200px; margin: 20px 0 0 0px;">
                  <el-option style="text-align: center"
                             v-for="(item,index) of activity"
                             :key="index"
                             :label="item.act_name"
                             :value="item.act_id">
                  </el-option>
                </el-select>
              </el-col>

            </el-row>

            <el-row style="margin: 20px 50px">
              <el-col :span="12">
                <el-form-item label="商品名称">
                  <el-input v-model="form.pro_name" placeholder="商品名称"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="商品编号">
                  <el-input v-model="form.pro_id" placeholder="商品编号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row style="margin: 20px 50px">
              <el-col :span="8">
                <el-form-item label="价格">

                  <el-input v-model="form.price" placeholder="商品价格（元）"></el-input>

                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="折扣价">
                  <el-input v-model="form.zprice" placeholder="折扣价格（元）"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="折扣">
                  <el-input v-model="form.detailmoney" placeholder="折扣"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row style="margin: 20px 50px">
              <el-col :span="8">
                <el-form-item label="商品库存">
                  <el-input v-model="form.pro_num" placeholder="商品库存"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="销量">
                  <el-input v-model="form.sale" placeholder="商品销量"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="重量">
                  <el-input v-model="form.pro_weight" placeholder="重量"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row style="margin: 20px 30px">
            <el-col :span="10">
              <el-form-item label="产地">
                <el-input v-model="form.pro_place" placeholder="产地"></el-input>
              </el-form-item>
            </el-col>



              <el-col :span="10">
                <el-form-item label="商品品牌">
                  <el-input v-model="form.pro_brand" placeholder="商品品牌"></el-input>
                </el-form-item>
              </el-col>


            </el-row>

            <el-row style="margin: 40px 60px">
              <el-col :span="8">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.pro_image" :src="form.pro_image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
      isAdd: false,

      page: 1,
      form: {
        class_id: '',
        pro_name: '',
        pro_id: '',
        price: '',
        pro_num: "",
        domestic: "",
        act_id: "",
        zprice: '',
        detailmoney: '',
        pro_weight: '',
        pro_place: '',
        pro_brand: '',
        pro_image: '',
        sale: 0
      },
      newform: {
        class_id: '',
        pro_name: '',
        pro_id: '',
        price: '',
        pro_num: "",
        domestic: "",
        act_id: "",
        zprice: '',
        detailmoney: '',
        pro_weight: '',
        pro_place: '',
        pro_brand: '',
        pro_image: '',
        sale: 0
      },

      type: '',
      input: '',
      options: [
        {
          class_id: -1,
          class_code: -1,
          class_name: '所有种类'
        }
      ],
      products: [],
      activity: [],
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]


    }
  },
  methods: {
    onSubmit() {
      this.addVisible = false;
      if (this.isAdd) this.addProduct();
      else this.editProduct();
    },
    addProduct() {
      const self = this;
      console.log(this.form);
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/product/add',
        headers: {"Content-Type": "application/json"},
        data:{
          "class_id": this.form.class_id,
          "pro_name": this.form.pro_name,
          "pro_id":this.form.pro_id,
          "price": this.form.price,
          "pro_num": this.form.pro_num,
          "domestic": this.form.domestic,
          "act_id": this.form.act_id,
          "zprice": this.form.zprice,
          "detailmoney": this.form.detailmoney,
          "pro_weight": this.form.pro_weight,
          "pro_place": this.form.pro_place,
          "pro_brand": this.form.pro_brand,
          "pro_image":this.form.pro_image,
          "sale":this.form.sale.sale
        }
        // data: this.form

      })
        .then(res => {
          if (res.data == 666) {
            self.$notify({
              title: '成功',
              message: '新增成功！',
              type: 'success'
            });
            this.getProducts();
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    editProduct() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/product/update',
        headers: {"Content-Type": "application/json"},
        // data: this.form
        data:{
          "class_id": this.form.class_id,
          "pro_name": this.form.pro_name,
          "pro_id":this.form.pro_id,
          "price": this.form.price,
          "pro_num": this.form.pro_num,
          "domestic": this.form.domestic,
          "act_id": this.form.act_id,
          "zprice": this.form.zprice,
          "detailmoney": this.form.detailmoney,
          "pro_weight": this.form.pro_weight,
          "pro_place": this.form.pro_place,
          "pro_brand": this.form.pro_brand,
          "pro_image":this.form.pro_image,
          "sale":this.form.sale.sale
        }

      })
        .then(res => {
          if (res.data == 666) {
            self.$notify({
              title: '成功',
              message: '新增成功！',
              type: 'success'
            });
            this.getProducts();
          }
        })
        .catch(err => {
          console.log(err);
        })

    },

    getAProdect(pro_id) {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/cproduct/cdetail',
        headers: {"Content-Type": "application/json"},
        data: {
          "pro_id": pro_id
        }

      })
        .then(res => {
          // console.log(res);
          this.form = res.data;

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


    getActivity() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/activity/search',
        headers: {"Content-Type": "application/json"},
        data: {}

      })
        .then(res => {
          // console.log(res);
          res.data.forEach(item => {
            this.activity.push(item);
          })
          console.log(this.activity)

        })
        .catch(err => {
          console.log(err);
        })
    },

    removeProduct(row, tableData) {

      console.log(tableData[row].pro_id);
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/product/delete',
        headers: {"Content-Type": "application/json"},
        data: {
          "pro_id": tableData[row].pro_id
        }

      })
        .then(res => {
          tableData.splice(row, 1);

        })
        .catch(err => {
          console.log(err);
        })

    },

    getProducts() {
      const self = this;
      if (this.type == '') this.type = -1;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/cproduct/csearch',
        headers: {"Content-Type": "application/json"},
        data: {
          "class_id": this.type,
          "pro_name": this.input,
          "page_id": this.page
        }

      })
        .then(res => {
          this.products = [];
          res.data.forEach(item => {
            this.products.push(item);
          });
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
    }, toAdd() {
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
    this.getCalsses();
    this.getProducts();
    this.getActivity();
  },
  watch: {
    type() {
      this.getProducts();
    },
    input() {
      this.getProducts();
    },
    page(v){
      console.log(v)
      this.getProducts();
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

.add {
  display: flex;
  width: 700px;
  height: 550px;
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
