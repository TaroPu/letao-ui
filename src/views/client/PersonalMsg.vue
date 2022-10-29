<template>
  <div class="person">
    <div class="maindiv">
      <Nav v-if="this.curUser.iden_id == 0"></Nav>
      <Nav1 v-else></Nav1>
    </div>

    <!--    头像和用户名-->

    <div class="base-msg">

      <div class="photo">
        <img :src="curUser.user_photo" style="width: 100% ;height:100%;border-radius: 50%; border: solid 3px darkgray"
             @click="toLoad">
        <input type="file" class="upinput" ref="file" @change="showimg('file')">
      </div>

      <input placeholder="用户ID" v-model="curUser.user_id" disabled></input>
      <input placeholder="用户名" v-model="curUser.user_name"></input>

    </div>
<!--    <el-upload accept=".png,.jpg" style="margin-bottom: 30px;width: 150px" class="upload-demo" drag action="#" :auto-upload="false" :multiple='false'-->
<!--               :on-change="onch" :file-list="fileList">-->
<!--      <i class="el-icon-upload"></i>-->
<!--      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
<!--      <div class="el-upload__tip" slot="tip">只能上传单个jpg/png文件，且不超过20MB</div>-->
<!--    </el-upload>-->

    <!--    详细信息-->
    <div class="details-msg">
      <ul>
        <li>
          <span>性别</span>
          <select class="sex" v-model="curUser.user_sex">
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </li>
        <li>
          <span>生日</span>
          <input type="date" v-model="curUser.user_date">
        </li>
        <li>
          <span>手机号</span>
          <input type="tel" v-model="curUser.user_phone" placeholder="手机号码">
        </li>
        <li class="address">
          <span>所在地区</span>

          <a v-if="!isEdit">
            <input v-model="theaddress" disabled></input>
            <button @click="isEdit = true">编辑</button>
          </a>
          <a v-else-if="isEdit">
            <select v-model="selProvinceIndex">
              <option v-for="(value,index) in cities" :key="index" :value="index">{{ value.name }}</option>
            </select>
            <select v-model="selCityIndex">
              <option v-for="(value,index) in optionCity" :key="index" :value="index">{{ value.name }}</option>
            </select>
            <select v-model="curUser.area">
              <option v-for="(value,index) in optionArea" :key="index" :value="value">{{ value }}</option>
            </select>

          </a>


        </li>
        <li>
          <span>详细地址</span>
          <input v-model="curUser.detail" placeholder="详细地址">

        </li>
      </ul>

      <!--    按钮-->
      <div class="btn">
        <!--        <button @click="submit">提交</button>-->
        <el-button
          plain
          @click="submit()">
          提交
        </el-button>
        <button @click="topassword">修改密码</button>
        <button @click="toLogoff" v-if="curUser.iden_id==0 ||curUser.iden_id === 3">注销账号</button>
      </div>

    </div>


  </div>
</template>

<script>
import Nav from '@/components/nav-client'
import Nav1 from '@/components/nav-service'
import * as city from '@/components/data/address.js'

export default {
  name: "Retrieve-password-client"
  ,
  data() {
    return {
      fileList:[],
      theaddress: '',
      isEdit: false,
      name: '找回密码',

      isErr: false,
      cities: city.address,

      selProvince: '',
      selCity: '',
      selArea: '',
      detail_address: '',


      selProvinceIndex: '',
      selCityIndex: "",
      optionCity: '',
      optionArea: '',

      curUser: {},

    }
  },
  components: {
    Nav,Nav1
  },
  methods: {
    // 预览图片
    showimg(filename) {
      const self = this;
      var fr = new FileReader()
      fr.readAsDataURL(self.$refs[filename].files[0])
      console.log(  fr);
      fr.onload = function () {
        self.curUser.user_photo = fr.result
      }

      let file = self.$refs['file'].files[0];
      let formData = new FormData();
      formData.append("user_id",this.curUser.user_id);
      formData.append("user_photo",file);


      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/image',
        headers: {"Content-Type": "application/json;charset=utf-8"},
        // data: {
        //   "user_id": this.curUser.user_id,
        //   "user_photo": file
        // }
        data:formData


      })
        .then(res => {
          switch (res.data) {
            case 666:
              self.opensucess();
              this.isEdit = false;
              sessionStorage.setItem('user', JSON.stringify(this.curUser));
              location.reload();
              this.selectMsg();
              break;
            default:
              self.openFail();
              this.isErr = true;
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })



    },

    toLoad() {
      this.isClick = !this.isClick;
    },
    opensucess() {
      const self = this;
      self.$notify({
        title: '成功',
        message: '信息编辑提交成功！',
        type: 'success'
      });
    },
    openFail() {
      const self = this;
      self.$notify({
        title: '成功',
        message: '操作失败！',
        type: 'success'
      });
    },
    openEmpty() {
      const self = this;
      self.$notify({
        title: '提示',
        message: '生日不能为空！',
        type: 'warning'
      });
    },
    submit() {

      const self = this;
      const file = this.$refs['file'].files[0]
      if (this.curUser.user_date == null) {
        self.openEmpty();
      } else {
        console.log("提交的信息：");
        // console.log("头像：", file);
        console.log("头像：", this.curUser.user_photo);
        console.log("用户名：", this.curUser.user_id);
        console.log("性别：", this.curUser.user_sex);
        console.log("生日：", this.curUser.user_date);
        console.log("手机号：", this.curUser.user_phone);
        console.log("地区：", this.selProvince, this.selCity, this.selArea);
        console.log("详细地址：", this.curUser.detail);

        self.$axios({
          method: 'post',
          url: 'http://127.0.0.1:8080/user/manage',
          headers: {"Content-Type": "application/json"},
          data: {
            "user_id": this.curUser.user_id,
            "user_name": this.curUser.user_name,
            "user_sex": this.curUser.user_sex,
            "user_date": this.curUser.user_date,
            "user_phone": this.curUser.user_phone,
            "province": this.curUser.province,
            "city": this.curUser.city,
            "area": this.curUser.area,
            "detail": this.curUser.detail,
            // "user_photo":file
            // "user_photo":this.curUser.user_photo


          }

        })
          .then(res => {
            switch (res.data) {
              case 666:

                self.opensucess();
                this.isEdit = false;
                sessionStorage.setItem('user', JSON.stringify(this.curUser));
                location.reload();
                this.selectMsg();

                break;
              default:
                self.openFail();
                this.isErr = true;
                break;
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    selectMsg() {
      var user_id = parseInt(this.curUser.user_id);
      const self = this;
      self.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8080/user/inquire',
        headers: {"Content-Type": "application/json"},
        data: {
          "user_id": user_id
        }

      })
        .then(res => {
          switch (res.data.code) {
            case 666:
              this.curUser = res.data.user;
              // this.username = res.data.user.user_name;
              // this.sex = res.data.user.user_sex;
              // this.tel = res.data.user.user_phone;
              // this.birthday = res.data.user.user_date;
              // this.selProvince = res.data.user.province;
              // this.selCity = res.data.user.city;
              // this.selArea = res.data.user.area;
              // if (res.data.user.detail != '') this.detail_address = res.data.user.detail;
              // console.log(this.detail_address == null)
              this.theaddress = this.curUser.province + ' ' + this.curUser.city + " " + this.curUser.area;


              //TODO 用户头像
              break;

            case 701:
              self.openFail();
              // this.isErr = true;
              break;
          }
        })
        .catch(err => {
          console.log(err);
        })

    },
    topassword() {
      this.$router.replace('/rePassword');
    },
    toLogoff() {
      this.$router.replace('/logoff');
    }

  },
  created() {
    this.curUser = JSON.parse(sessionStorage.getItem('user'));
    // console.log(this.curUser);
    // this.userID = this.curUser.user_id;
    // this.username = this.curUser.user_name;
    this.selectMsg();
  },
  watch: {
    selProvinceIndex(value) {
      this.optionCity = this.cities[value].cityList;
      this.curUser.province = this.cities[value].name;
      this.optionArea = ''

    },
    selCityIndex(value) {
      this.optionArea = this.optionCity[value].areaList;
      this.curUser.city = this.optionCity[value].name;

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

.person {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 666px;
  margin: 0 auto;
  background-color: #F1E1CE;
}

.maindiv {
  height: 63px
}

.base-msg {
  flex: 1;
  width: 80%;
  margin: 36px auto;
  /*background-color: #baf12b;*/
}

.base-msg img {
  /*margin-left: 10%;*/
  /*height: 150px;*/
  vertical-align: middle;
}

.base-msg input {
  vertical-align: middle;
  /*width: 60vw;*/
  height: 50px;
  width: 200px;
  border-radius: 10px;
  margin: 0 20px;
  text-align: center;
  font-size: 1.5rem;
}

.base-msg .photo .upinput {
  opacity: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;


}

.photo {
  margin-left: 150px;
  display: inline-block;
  position: relative;
  padding: 0;
  width: 150px;
  height: 150px;
}

.details-msg {
  flex: 5;

  width: 50%;
  margin: 0 auto;

  /*background-color: #dc830c;*/
  /*font-size: 1.5rem;*/
}

a button {
  border-radius: 10px;
  border: solid 2px transparent;
  height: 100%;
  width: 5%;
}

span {
  padding: 10px 10px;
  margin-right: 15px;
  display: inline-block;
  text-align: justify;
  /*text-justify:distribute-all-lines; // 这行必加，兼容ie浏览器*/
  text-align-last: justify;
  width: 20%;
  height: 100%;
  background-color: #c2bfbf;
  border-radius: 20px;
  font-weight: 700;


}

ul {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 70%;
  background-color: #f3cb9e;
  border-radius: 30px;
}

li {

  width: 80%;
  height: 10%;
  /*line-height: 10%;*/
  /*margin: 2% auto;*/
  /*background-color: #fff;*/

}

li input, select {
  /*height: 80%;*/
}

.address select {
  width: 16%;
  height: 100%;
  vertical-align: bottom;
  border-radius: 10px;
}

.btn {
  height: 30%;
  /*line-height: 20%;*/
  display: flex;
  align-items: center;
  justify-content: space-around;
  /*flex-direction: column;*/
}

.btn button {
  width: 25%;
  height: 30%;
  border-radius: 20px;

}

.details-msg input, .sex {
  width: 50%;
  vertical-align: bottom;
  height: 100%;
  border-radius: 10px;
}

button {
  cursor: pointer;
}


</style>
