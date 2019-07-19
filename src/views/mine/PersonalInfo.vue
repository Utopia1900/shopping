<template>
  <div class="z-page">
    <header-nav :headerNavTitle="headerNavTitle" @on-back="handleBack" />

    <span class="info-edit" @click="toggleEdit">{{!isEditing? '編輯':'完成'}}</span>

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
        <li>
          <label for="province">所在省份</label>
          <input type="text" v-model="province" id="province" placeholder="请选择" />
        </li>
        <li>
          <label for="city">所在城市</label>
          <input type="text" v-model="city" id="city" placeholder="请选择" />
        </li>

        <popup-radio title="性别" :options="options1" v-model="sex"></popup-radio>

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
  </div>
</template>
<script>
import HeaderNav from "../../components/HeaderNav";
import { Group, PopupRadio } from "vux";
import { updatePersonalInfo } from "../../api";
import { format } from "path";
import { setTimeout } from "timers";
export default {
  name: "PersonalInfo",
  components: {
    HeaderNav,
    Group,
    PopupRadio
  },
  data() {
    return {
      headerNavTitle: "个人资料",
      isEditing: false,
      options1: ["请选择", "男", "女"],
      name: "",
      mobile: "",
      city: "",
      sex: "",
      province: "",
      birthday: ""
    };
  },
  computed: {
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
    handleBack() {
      this.isEditing = false;
      this.$router.go(-1);
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
    }
  }
};
</script>
<style>
.info-edit {
  position: fixed;
  top: 0;
  right: 0;
  display: inline-block;
  z-index: 99;
  color: #fff;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  padding-right: 5px;
}
.personal-info-edit {
  background-color: #fff;
  color: #404040;
  margin-top: 50px;
}
ul li {
  border-bottom: 1px solid #eeeeee;
  padding: 10px 16px;
}
label {
  width: 80px;
  display: inline-block;
  font-size: 16px;
}
.personal-info-edit ul li label {
  color: #404040;
}
.personal-info-list {
  background-color: #fff;
  color: #888888;
  margin-top: 50px;
}
.personal-info-list ul li label {
  color: #888888;
}
.personal-info-list ul li span {
  color: #000000;
}
ul li input {
  height: 25px;
  border: none;
  outline: none;
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
</style>
