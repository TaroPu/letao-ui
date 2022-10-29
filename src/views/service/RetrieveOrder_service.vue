<template>
  <div class="retrieve_order">
    <div class="maindiv">
      <Nav></Nav>
    </div>
    <div>

    </div>
    <div>

      <el-input v-model="input" style="width: 250px;height: 50px; margin-left: 10%; margin-top: 50px"
                placeholder="请输入订单编号"></el-input>
      <el-button type="primary" icon="el-icon-search" style="width: 80px;height: 35px" @click="getOrder">搜索</el-button>

      <el-table
        :data="orderList"
        style="width: 80%; margin-left: 10%; margin-top: 50px"
        :header-cell-style="{textAlign:'center'}"
        :cell-style="{textAlign:'center',}"
        ref="filterTable"
        stripe
      >


        <el-table-column
          prop="ord_time"
          label="下单日期"
          width="240">
        </el-table-column>
        <el-table-column
          prop="user_id"
          label="用户ID"
          width="120">
        </el-table-column>
        <el-table-column
          prop="order_id"
          label="订单号"
          width="240">
        </el-table-column>
        <el-table-column
          prop="ord_state"

          label="订单状态"
          :filters="[{ text: '待发货', value: '待发货' },{ text: '已发货', value: '已发货' }, { text: '已取货', value: '已取货' }]"
          :filter-method="filterTag"
          width="120">
          <template slot-scope="scope">
            <el-tag
              :type="setTag(scope.row.ord_state)"
              disable-transitions>{{ scope.row.ord_state }}
            </el-tag>
          </template>

        </el-table-column>
        <el-table-column
          prop="delivery"
          label="配送方式"
          width="120">
        </el-table-column>
        <el-table-column
          label="更多信息"
          width="125">
          <template slot-scope="key">
            <el-link style="color: dodgerblue" @click="moreMess(key.$index)">更多信息<i
              class="el-icon-view el-icon--right"></i></el-link>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="260">
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="width: 100px;height: 30px"
              @click="getOneOrderId(scope.$index)"
              v-if="orderList[scope.$index].ord_state === '待发货' && orderList[scope.$index].delivery != '门店自取'">填写物流单号
            </el-button>
            <el-dialog
              title="填写物流单号"
              :visible.sync="stateVisible"
              width="30%"
              :before-close="handleClose"
              class="control">
              <div>订单编号：<input v-model="oneOrderId"></input></div>
              <div style="margin-top: 20px">物流单号：<input v-model="oneOrderDelivery" placeholder="请输入物流单号"></input></div>
              <span slot="footer" class="dialog-footer">
                <button @click="stateVisible = false">取 消</button>
                <button @click="controlOrder(scope.$index)">提 交</button>
              </span>
            </el-dialog>
            <el-button
              size="mini"
              style="width: 70px;height: 30px"
              type="danger"
              @click="removeOrder(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import Nav from '@/components/nav-service'

export default {
  name: "RetrieveOrder_service",

  components: {
    Nav
  },

  data() {
    return {
      input: '',
      orderList: [],
      stateVisible: false,
      oneOrderId: '',
      oneOrderDelivery: '',
      oneOrderMess: [],
    }
  },

  methods: {
    setTag(value) {
      if (value === '待发货') {
        return 'danger';
      } else if (value === '已发货') {
        return 'primary';
      } else {
        return 'success'
      }

    },
    // resetDateFilter() {
    //   this.$refs.filterTable.clearFilter('date');
    // },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.ord_state;
    },
    filterTag(value, row) {
      return row.ord_state === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    // resetDateFilter() {
    //   this.$refs.filterTable.clearFilter('date');
    // },
    // clearFilter() {
    //   this.$refs.filterTable.clearFilter();
    // },
    // formatter(row, column) {
    //   return row.address;
    // },
    // filterTag(value, row) {
    //   return row.tag === value;
    // },
    // filterHandler(value, row, column) {
    //   const property = column['property'];
    //   return row[property] === value;
    // },
    // tableRowClassName({row, rowIndex}) {
    //   if(row.ord_state == '待发货'){
    //     console.log("第",rowIndex+1,"行是待发货")
    //     return 'warning';
    //   }else if(row.ord_state == '已取货'){
    //     return 'success';
    //   }
    // },


    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },

    // 获取当前订单号
    getOneOrderId(index) {
      this.stateVisible = true;
      this.oneOrderId = this.orderList[index].order_id;
    },

    // 搜索订单编号
    getOrder() {
      let a = 0;

      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/order/details',
        headers: {"Content-Type": "application/json"},
        data: {
          "order_id": this.input,
        },
      }).then(res => {
        res.data.forEach(item => {
          this.oneOrderMess.push(item);
        })

        sessionStorage.setItem('moreMess', JSON.stringify(this.oneOrderMess));
        for (let i = 0; i < this.orderList.length; i++) {
          if (this.input == this.orderList[i].order_id) {
            a = 1;
            this.$router.replace('/orderDetails_service');
          }
        }

        if (a === 0) {
          this.$message({
            type: 'info',
            message: '未查询到该订单!'
          });
        }

      }).catch(err => {
        console.log(err);
      })
    },

    //获取订单更多信息
    moreMess(index) {

      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/order/details',
        headers: {"Content-Type": "application/json"},
        data: {
          "order_id": this.orderList[index].order_id,
        },
      }).then(res => {
        res.data.forEach(item => {
          this.oneOrderMess.push(item);
        })
        sessionStorage.setItem('moreMess', JSON.stringify(this.oneOrderMess));
        this.$router.replace('/orderDetails_service')
      }).catch(err => {
        console.log(err);
      })

    },

    // 控制订单状态
    controlOrder(index) {
      if(this.oneOrderDelivery == ''){
        this.$message({
          type: 'info',
          message: '物流单号不能为空!'
        });
        this.stateVisible = true;
      }else{
        this.stateVisible = false;
        const self = this;
        self.$axios({
          method: 'post',
          url: 'http://127.0.0.1:8080/order/deliver',
          headers: {"Content-Type": "application/json"},
          data: {
            "order_id": this.oneOrderId,
            "delivery_id": this.oneOrderDelivery,
          },
        }).then(res => {
          this.orderList[index].ord_state = '已发货';
          location.reload();
        }).catch(err => {
          console.log(err);
        })
      }
    },

    // 删除某个订单
    removeOrder(row) {
      this.$confirm('此操作将永久删除该订单及其相关信息， 是否继续？', '提示', {
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
          url: 'http://127.0.0.1:8080/order/delete',
          headers: {"Content-Type": "application/json"},
          data: {
            "order_id": row.order_id,
          },
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
        url: 'http://127.0.0.1:8080/order/sort',
        headers: {"Content-Type": "application/json"},
        data: {},
      })
        .then(res => {
          res.data.forEach(item => {
            this.orderList.push(item);
          })
          console.log(this.orderList);
        }).catch(err => {
        console.log(err);
      })
    },

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

.retrieve_order {
  width: 100vw;
  /*height: 100vh;*/
  background-color: antiquewhite;
  min-height: 800px;

}

.maindiv {
  height: 63px;
}

.control input {
  width: 250px;
  height: 40px;
  padding: 5px;
}

.control button {
  margin: 0 1% 0 1%;
  width: 81px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 50%;
  background-color: #CBE457;
  color: gray;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid gray;
}

.warning {
  background: oldlace;
}

.success {
  background: #f0f9eb;
}

</style>
