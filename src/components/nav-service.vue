<template>
  <div class="nav">
    <div class="logo" @click="toHome" style="cursor: pointer">
      <img src="../assets/Images/Home/logo.png" style="width: 150px;margin-top: 7px" alt="炫酷乐淘">
    </div>
    <div class="service_nav" style="min-width: 795px">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#C6D9B2"
        text-color="#000000"
        active-text-color="#ffffff">
        <el-menu-item index="1" style="margin-right: 55px" @click="toHome">
          <template slot="title">主页</template>
        </el-menu-item>
        <el-menu-item index="2" style="margin-right: 55px" @click="toStore" v-if="Curuser.iden_id != 2">
          <template slot="title">门店管理</template>
        </el-menu-item>
        <el-menu-item index="3" style="margin-right: 36px" @click="toSaleData">
          <template slot="title">查询销售数据</template>
        </el-menu-item>
        <el-submenu index="4" v-if="Curuser.iden_id != 1">
          <template slot="title">商品管理</template>
          <el-menu-item index="4-1" @click="toProduct_type_manage">商品类别管理</el-menu-item>
          <el-menu-item index="4-2" @click="toProduct_msg_manage">商品信息管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="5" style="margin-right: 36px;margin-left: 24px;" @click="toRetrieveOrder">
          <template slot="title">订单管理</template>
        </el-menu-item>
        <el-submenu index="6" style="margin-right: 20px" v-if="Curuser.iden_id != 2">
          <template slot="title">活动模块管理</template>
          <el-menu-item index="6-1" @click="toActivity_manage_service" v-if="Curuser.iden_id != 2">活动信息管理</el-menu-item>
          <el-menu-item index="6-2" @click="toActivity_status_manage" v-if="Curuser.iden_id == 3">活动信息审核</el-menu-item>
        </el-submenu>
        <el-menu-item index="7" @click="toUser_manage_Client" v-if="Curuser.iden_id == 3">
          <template slot="title">账号信息管理</template>
        </el-menu-item>
      </el-menu>

    </div>
    <div class="btn">
      <a style="display: inline-block; margin-top: 10px">
        欢迎
        {{ identityname }}, <span style="color: mediumvioletred">{{ Curuser.user_name }}</span>
        <button style="background-color: #ef3281; border:none; border-radius: 6px;cursor: pointer" @click="logout">退出
        </button>
      </a>
    </div>
    <div class="icon">
      <ul>
        <li><img src="../assets/Images/Home/user_mess.png" alt="个人信息" @click="person" style="width: 45px"></li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: "MainPage",
  data() {
    return {
      activeIndex2: '1',

      isLogined: '',
      identity: '',
      username: '',
      identityname: '',
      Curuser: {},

      options: [
        {
          class_id: -1,
          class_code: -1,
          class_name: '所有种类'
        }
      ],
      value: '',
      searchValue: ''
    }
  },
  // props: {
  //   nav_index: String,
  //   required: true
  // },

  methods: {

    toSaleData() {
      sessionStorage.setItem('index', '3');
      if (this.$route.path !== '/saleData_service') {
        this.$router.push({path: '/saleData_service'})
      } else location.reload();
    },

    toUser_manage_Client() {
      sessionStorage.setItem('index', '7');
      if (this.$route.path !== '/user_manage_service') {
        this.$router.push({path: '/user_manage_service'})
      } else location.reload();
    },

    toActivity_status_manage() {
      sessionStorage.setItem('index', '6-2');
      if (this.$route.path !== '/activity_status_manage') {
        this.$router.push({path: '/activity_status_manage'})
      } else location.reload();
    },

    toActivity_manage_service() {
      sessionStorage.setItem('index', '6-1');
      if (this.$route.path !== '/activity_manage_service') {
        this.$router.push({path: '/activity_manage_service'})
      } else location.reload();
    },

    toProduct_type_manage() {
      sessionStorage.setItem('index', '4-1');
      if (this.$route.path !== '/product_type_manage') {
        this.$router.push({path: '/product_type_manage'})
      } else location.reload();
    },

    toStore() {
      sessionStorage.setItem('index', '2');
      if (this.$route.path !== '/store_service') {
        this.$router.push({path: '/store_service'})
      } else location.reload();
    },

    toRetrieveOrder() {
      sessionStorage.setItem('index', '5');
      if (this.$route.path !== '/retrieveOrder_service') {
        this.$router.push({path: '/retrieveOrder_service'})
      } else location.reload();
    },

    toProduct_msg_manage() {
      sessionStorage.setItem('index', '4-2');
      if (this.$route.path !== '/product_msg_manage') {
        this.$router.push({path: '/product_msg_manage'})
      } else location.reload();
    },

    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },

    toHome() {
      sessionStorage.setItem('index', '1');
      if (this.$route.path !== '/home_service') {
        this.$router.push({path: '/home_service'})
      } else location.reload();
    },


    person() {
      sessionStorage.setItem('index', '0');
      // this.$router.replace({path: "/personalMsg"})
      if (this.$route.path !== '/personalMsg') {
        this.$router.push({path: '/personalMsg'})
      } else location.reload();
    },

    logout() {
      this.activeIndex2 = 0;
      if (confirm('温馨提示：退出登录将不会保存操作，影响浏览体验哦~')) {
        sessionStorage.removeItem('isLogin');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('identity');
        this.isLogined = false;
        this.$router.replace({path: "/login"});
      }
    },
  },
  watch: {
    value() {
      this.search();
    },

  },
  created() {
    this.Curuser = JSON.parse(sessionStorage.getItem('user'));
    this.isLogined = sessionStorage.getItem('isLogin');
    this.identityname = sessionStorage.getItem('identityname');
    this.activeIndex2 = sessionStorage.getItem('index');
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.nav {
  position: fixed;
  display: flex;
  justify-content: space-between;
  min-width: 1270px;
  height: 63px;
  width: 100%;
  background-color: #C6D9B2;
  z-index: 10;
}

/*logo*/
.logo {
  margin-left: 2vw;
  height: 63px;
  float: left;
}

/*------------------------*/
/*search*/
.search {
  margin-top: 10px;
}

.search ul {
  list-style: none;
}

.search ul li {
  float: left;
}

/*--------------------------*/
/*btn*/

.btn {
  float: left;
  margin-right: 2vw;
  padding-top: 10px;
}

.btn ul {
  list-style: none;
  font-size: 12px;
  list-style: none;
}

/*----------------------------*/
/*icon*/
.icon {
  height: 63px;
  padding-top: 10px;
  float: left;
}

.icon ul {
  list-style: none;
  float: left;
}

.icon ul li {
  float: left;
}

li img {
  cursor: pointer;
}

</style>
