<template>
  <div class="Product_msg_manage">
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div class="title" style="margin: 30px 80px"><img src="../../assets/Images/Service/preActivity.png" width="88px" style="vertical-align: middle">
      <span style="font-size: 40px;font-weight: 700;color: #097aa4;vertical-align: middle;" >活动信息审核</span></div>
    <div class="mian">
<!--            <el-select v-model="type" filterable placeholder="所有种类" style="width: 200px; margin: 20px 0 0 0px;">-->
<!--              <el-option style="text-align: center"-->
<!--                         v-for="(item,index) of Status"-->
<!--                         :key="index"-->
<!--                         :label="item.class_name"-->
<!--                         :value="item.class_id">-->
<!--              </el-option>-->
<!--            </el-select>-->

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
          prop="sto_name"
          label="活动店铺"
          width="300">
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
              @click="Check(scope.$index, Activity,2)">通过
            </el-button>
            <el-button
              size="mini"
              style="width: 70px;height: 30px"
              type="danger"
              @click="Check(scope.$index,Activity,1)">不通过
            </el-button>
          </template>
        </el-table-column>
      </el-table>


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


      type: '',
      input: '',

      Activity: [],


    }
  },
  methods: {

    Check(row, tableData,status) {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/activity/check',
        headers: {"Content-Type": "application/json"},
        data: {
          "act_id": tableData[row].act_id,
          "act_status": status
        }

      })
        .then(res => {
          if (res.data == 666) {
            self.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            });
            this.getActivity()
          }
        })
        .catch(err => {
          console.log(err);
        })
    },
    getActivity() {
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/activity/searchcheck',
        headers: {"Content-Type": "application/json"},
        data: {
          "act_status": -1

        }

      })
        .then(res => {
          this.Activity = [];
          res.data.forEach(item=>{
            this.Activity.push(item);
          })
        })
        .catch(err => {
          console.log(err);
        })
    }

  },
  created() {
    this.getActivity()
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
