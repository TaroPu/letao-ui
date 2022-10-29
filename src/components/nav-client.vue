<template>
  <div class="nav">
    <div class="logo" @click="toHome" style="cursor: pointer">
      <img src="../assets/Images/Home/logo.png" style="width: 171px" alt="炫酷乐淘">
    </div>
    <div class="search">
      <ul>
        <li>
          <el-select v-model="value" filterable placeholder="所有种类" style="width: 150px">
            <el-option style="text-align: center"
                       v-for="(item,index) of options"
                       :key="index"
                       :label="item.class_name"
                       :value="item.class_id">
            </el-option>
          </el-select>
        </li>
        <li>
          <el-input placeholder="丹东大草莓" v-model="searchValue" style="width: 250px">
            <el-button @click="search" slot="append" icon="el-icon-search"
                       style="font-size: 25px;padding:10px 10px"></el-button>
          </el-input>
        </li>
      </ul>
    </div>

    <div class="btn">
      <ul v-if="!isLogined">
        <li>您好，请<a style="color: red; display: inline; cursor: pointer" @click="login">登录</a></li>
        <li style="margin-top: 10px">免费<a style="color: red; display: inline; cursor: pointer" @click="login">注册</a>
        </li>
      </ul>
      <a v-if="isLogined" style="display: inline-block; margin-top: 10px">
        欢迎
        {{ identityname }}, <span style="color: mediumvioletred">{{ Curuser.user_name }}</span>
        <button style="background-color: #ef3281; border:none; border-radius: 6px;cursor: pointer" @click="logout">退出
        </button>
      </a>
    </div>


    <div class="icon" v-if="isLogined">
      <ul>
        <li><img src="../assets/Images/Home/user_mess.png" alt="个人信息" @click="person" style="width: 45px"></li>
        <li><img src="../assets/Images/Home/cart.png" alt="购物车" @click="cart" style="width: 45px; "></li>
        <li><img src="../assets/Images/Home/favorites.png" alt="收藏夹" @click="toFavorite" style="width: 45px"></li>
      </ul>
    </div>


  </div>

</template>

<script>
export default {
  name: "MainPage",
  data() {
    return {
      isLogined: '',
      identity: '',
      username: '',
      identityname: '',
      Curuser: {},

      options: [
        {
          class_id: -1,
          class_code:-1,
          class_name: '所有种类'
      }
      ],
      value: '',
      searchValue: ''
    }
  },
  methods: {
    search() {
      if(!this.value) this.value = -1;
      sessionStorage.setItem('classtype',this.value);
      sessionStorage.setItem('searchvalue',this.searchValue);
      if (this.$route.path !== '/search') {
        this.$router.push({ path: '/search' })
      }else location.reload()
      // this.$router.replace({path: "/search"})


    },
    getCalsses(){
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
    },

    cart() {
      // this.$router.replace('/shopping_cart');
      if (this.$route.path !== '/shopping_cart') {
        this.$router.push({ path: '/shopping_cart' })
      }else location.reload()
    },
    toHome() {
      // this.$router.replace({path: "/"})
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' })
      }else location.reload()
    },
    login() {
      // this.$router.replace({path: "/login"})
      if (this.$route.path !== '/login') {
        this.$router.push({ path: '/login' })
      }else location.reload()
    },
    toFavorite() {
      // this.$router.replace({path: "/favorites"})
      if (this.$route.path !== '/favorites') {
        this.$router.push({ path: '/favorites' })
      }else location.reload()
    },
    logout() {
      if (confirm('温馨提示：退出登录将不会保存操作，影响浏览体验哦~')) {
        sessionStorage.removeItem('isLogin');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('identity');
        this.isLogined = false;
        // this.$router.replace({path: "/"})
        if (this.$route.path !== '/') {
          this.$router.push({ path: '/' })
        }else location.reload()
      }


    },
    person() {
      // this.$router.replace({path: "/personalMsg"})
      if (this.$route.path !== '/personalMsg') {
        this.$router.push({ path: '/personalMsg' })
      }else location.reload()
    },
  },
  created() {
    this.Curuser = JSON.parse(sessionStorage.getItem('user'));
    this.isLogined = sessionStorage.getItem('isLogin');
    this.identityname = sessionStorage.getItem('identityname');
    this.getCalsses();

  },
  watch:{
    value(){
      this.search();
    }
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
  height: 63px;
  width: 100%;
  min-width: 1000px;
  background-color: #b3da72;
  z-index: 1;
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
