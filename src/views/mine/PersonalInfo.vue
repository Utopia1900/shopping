<template>
  <div class="z-page">
    <header-nav :headerNavTitle="headerNavTitle" @on-back="handleBack" />
    <div class="edit-tag-container">
      <span class="info-edit" @click="toggleEdit">{{!isEditing? '編輯':'完成'}}</span>
    </div>
    <div class="personal-info-edit" v-if="isEditing">
      <ul style="padding: 15px;">
        <li>
          <label for="name">姓名</label>
          <input type="text" v-model="name" ref="name" placeholder="请输入" />
        </li>
        <li>
          <label for="mobile">电话</label>
          <input type="text" v-model="mobile" id="mobile" placeholder="请输入" />
        </li>
        <popup-radio
          title="所在省份"
          :options="provinceOptions"
          v-model="province"
          style="height:50px;"
         @on-show="hello"></popup-radio>
        <popup-radio title="所在城市" :options="citysOptions" v-model="city" style="height:50px;" @click="hello"></popup-radio>
        <popup-radio title="性别" :options="sexOptions" v-model="sex" style="height:50px;"></popup-radio>
        <li>
          <label for="birthday">生日</label>
          <input type="text" v-model="birthday" id="birthday" />
        </li>
      </ul>
      <div class="address-edit-btn" @click="handleUpdate">保存</div>
    </div>
    <div class="personal-info-list" v-else>
      <ul style="padding: 15px;">
        <li>
          <label for="name">姓名</label>
          <span>{{c_name}}</span>
        </li>
        <li>
          <label for="mobile">电话</label>
          <span>{{c_mobile}}</span>
        </li>
        <li>
          <label for="province">所在省份</label>
          <span>{{c_province}}</span>
        </li>
        <li>
          <label for="city">所在城市</label>
          <span>{{c_city}}</span>
        </li>
        <li>
          <label for="city">性别</label>
          <span>{{c_sex}}</span>
        </li>
        <li>
          <label for="city">生日</label>
          <span>{{c_birthday}}</span>
        </li>
      </ul>
    </div>
    <confirm
      title="是否保存本次修改？"
      :value="show"
      confirm-text="保存"
      cancel-text="不保存"
      @on-cancel="goBack"
      @on-confirm="handleUpdate"
    ></confirm>
  </div>
</template>
<script>
import HeaderNav from "../../components/HeaderNav";
import { Group, PopupRadio, Confirm } from "vux";
import { updatePersonalInfo } from "../../api";
const provinces = require("../../data/province.json");
const citys = require("../../data/city.json");
export default {
  name: "PersonalInfo",
  components: {
    HeaderNav,
    Group,
    PopupRadio,
    Confirm
  },
  data() {
    return {
      headerNavTitle: "个人资料",
      isEditing: false,
      show: false,
      sexOptions: ["请选择", "男", "女"],
      name: "",
      mobile: "",
      city: "",
      sex: "",
      province: "",
      birthday: "",
      province: "",
      citysOptions: [],
      isPopShow: false
    };
  },
  computed: {
    provinceOptions() {
      return provinces.map(item => item["name"]);
    },
    id() {
      return this.$store.state.personal.info.id;
    },
    c_name() {
      return this.$store.state.personal.info.name;
    },
    c_mobile() {
      return this.$store.state.personal.info.mobile;
    },
    c_city() {
      return this.$store.state.personal.info.city;
    },
    c_province() {
      return this.$store.state.personal.info.province;
    },
    c_birthday() {
      return this.$store.state.personal.info.birthday;
    },
    c_sex() {
      // return this.$store.state.personal.info.sex
      let sex = this.$store.state.personal.info.sex;
      return sex === "" ? "请选择" : sex === "0" ? "男" : "女";
    }
  },
  methods: {
    hello(){
      this.isPopShow = true
    },
    handleUpdate() {
      let name = this.name,
        mobile = this.mobile,
        id = this.id,
        province = this.province,
        city = this.city,
        birthday = this.birthday;
      let inputSex = this.sex;
      let sex = inputSex === "请选择" ? "" : inputSex === "男" ? "0" : "1";

      let forms = { id, name, mobile, province, city, sex, birthday };
      updatePersonalInfo(this, forms);
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
      let info = this.$store.state.personal.info;
      window.sessionStorage.setItem("personalInfo", JSON.stringify(info));
      if (this.isEditing) {
        this.name = this.c_name;
        this.mobile = this.c_mobile;
        this.province = this.c_province;
        this.city = this.c_city;
        this.birthday = this.c_birthday;
        this.sex = this.c_sex;
        setTimeout(() => {
          this.$refs.name.focus();
        }, 500);
      }
    },
    handleBack() {
      // 比较地址对象转化为字符串进行比较
      if (this.isEditing) {
        const preInfo = JSON.parse(
          window.sessionStorage.getItem("personalInfo")
        );
        // const id = this.id, name = this.name, mobile = this.mobile, province = this.province, city=this.city, birthday=this.birthday
        const { id, name, mobile, province, city, birthday } = this;
        const inputSex = this.sex;
        const sex = inputSex === "请选择" ? "" : inputSex === "男" ? "0" : "1";
        if (
          preInfo.name !== name ||
          preInfo.mobile !== mobile ||
          preInfo.province !== province ||
          preInfo.city !== city ||
          preInfo.sex !== sex ||
          preInfo.birthday !== birthday
        ) {
          this.show = !this.show;
        } else {
          this.isEditing = false;
          this.$router.go(-1);
        }
      } else {
        this.$router.go(-1);
      }
      this.isPopShow = false
    },
    goBack() {
      this.isEditing = false;
      this.show = !this.show;
      this.$router.go(-1);
    },
    getCitysOptions() {
      this.citysOptions = citys
        .filter(item => item["parent"] === this.province)
        .map(item => item["name"]);
    }
  },
  watch: {
    'province': function(val, oldVale) {
      if(this.isPopShow){
        this.city = ''       
      } else {
        this.city = this.c_city
      }
      this.getCitysOptions();
    }
  }
};
</script>
<style>
.edit-tag-container {
  margin-top: 40px;
  background-color: #ed7a5d;
  height: 50px;
}
.edit-tag-container span {
  line-height: 50px;
  display: block;
  float: right;
  padding-right: 18px;
  color: #ffffff;
}
.personal-info-edit {
  background-color: #fff;
  color: #404040;
}
ul li {
  border-bottom: 1px solid #eeeeee;
  padding: 0 16px;
  height: 50px;
}
.personal-info-edit ul li label,
.personal-info-list ul li label {
  height: 50px;
  line-height: 50px;
  width: 100px;
  display: inline-block;
  font-size: 16px;
  color: #000000;
}
.personal-info-list {
  background-color: #fff;
  color: #888888;
}
ul li input {
  height: 49px;
  display: inline-block;
  border: none;
  outline: none;
  font-size: 18px;
  color: green;
}
ul li span {
  line-height: 50px;
  font-size: 18px;
  display: inline-block;
}

.address-edit-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  line-height: 40px;
  display: block;
  width: 100%;
  background-color: #ed7a5d;
  color: #fff;
  text-align: center;
}
.vux-popup-dialog {
  top: 50%;
}
</style>
