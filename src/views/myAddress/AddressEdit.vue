<template>
  <div class="z-content">
    <header-nav :headerNavTitle="headerNavTitle" @on-back="handleBack"/>
    <div class="address-edit-wrap">
      <x-input
        title="姓名"
        :show-clear="true"
        is-type="china-name"
        :value="addressObj.name"
        required
        @on-change="changeName"
        placeholder="姓名"
      ></x-input>
      <x-input
        title="电话"
        :show-clear="true"
        is-type="china-mobile"
        keyboard="number"
        type="tel"
        :value="addressObj.mobile"
        required
        @on-change="changeMobile"
        placeholder="手机号码"
      ></x-input>
      <x-address :title="'地区'" v-model="value" :list="addressData" :placeholder="address"></x-address>
      <x-textarea
        :max="50"
        :height="100"
        :value="addressObj.detail"
        @on-change="changeAddress"
        :show-counter="false"
        placeholder="请填写详细地址"
      ></x-textarea>
        <x-switch :title="isDefault ? '默认地址':'设为默认'" v-model="isDefault"></x-switch>

     <!-- <div
        class="vux-cell-box set-default-wrap"
        :class="addressObj.isDefault === 1 ? 'active' : '' "
        @click="toggleDefault"
      >
        <icon class="icon" :type="addressObj.isDefault === 1 ? 'success' : 'circle'"></icon>
        {{addressObj.isDefault === 1 ? '默认地址' : '设为默认'}}
      </div>-->
    </div>
    <div class="address-edit-btn" @click="submitHandle(addressObj.index)">保存</div>
    <confirm
      title="是否保存本次修改？"
      :value="show"
      confirm-text="保存"
      cancel-text="不保存"
      @on-cancel="goBack"
      @on-confirm="submitHandle(addressObj.index)"
    ></confirm>
  </div>
</template>
<script>
  import "./addressEdit.less";
  import HeaderNav from "../../components/HeaderNav";
  import {XInput, XAddress, ChinaAddressData, XTextarea, Icon, Confirm, XSwitch, Group} from "vux";
  import {editAddress, isEquivalent, handleGetAddress} from "../../api";

  export default {
    name: "AddressEdit",
    components: {
      XInput,
      XAddress,
      XTextarea,
      HeaderNav,
      Icon,
      Confirm,
      XSwitch,
      Group
    },
    data() {
      return {
        value: [],
        addressData: ChinaAddressData,
        show: false,
        isDefault: false,
        addressObj: this.$store.state.address.addressObj,
        save: false
      }
    },
    computed: {
      headerNavTitle() {
        if (this.addressObj.name) {
          return "编辑";
        } else {
          return "添加";
        }
      },
      defIndex() {
        return this.$store.state.address.defIndex
      },
      address() {
        return this.addressObj.province ? `${this.addressObj.province} ${this.addressObj.city} ${this.addressObj.district}` : '请选择'
      },
      // addressObj() {
      //   return this.$store.state.address.addressObj
      // }
    },
    watch: {
      value: function (val, oldVal) {
        let that = this;
        if (val) {
          if (this.save){
            this.addressData.forEach(item => {
              if (item.value === val[0]) {
                this.addressObj.province = item.name;
              }
            });

            this.addressData.forEach(item => {
              if (item.value === val[1]) {
                this.addressObj.city = item.name;
              }
            });

            this.addressData.forEach(item => {
              if (item.value === val[2]) {
                this.addressObj.district = item.name;
              }
            });
          }
        }
      },
      $route(val, oldVal) {
        if (val) {
          let addressObj = this.$store.state.address.addressObj
          if (addressObj) {
            this.addressObj = addressObj;
            this.isDefault = this.addressObj.isDefault === 1 ? true : false
            console.log('value', this.value);
            this.value[0] = this.addressObj.province
            this.value[1] = this.addressObj.city
            this.value[2] = this.addressObj.district
            window.sessionStorage.setItem("initialAddress", JSON.stringify(this.addressObj))
          } else {
            window.sessionStorage.removeItem("initialAddress")
          }
        }
      },
      isDefault(newVal, oldVal) {
        if(newVal === true) {
          this.addressObj.isDefault = 1
        } else {
          this.addressObj.isDefault = 0
        }
      }
    },
    created() {
      // 第一次进入路由时 watch 不到$route
      // this.addressObj = this.$store.state.address.addressObj;
      // console.log(this.addressObj);
      if(this.addressObj.isDefault === 1) {
        this.isDefault = true
      } else if(this.addressObj.isDefault === 0) {
        this.isDefault = false
      }
      window.sessionStorage.setItem(
        "initialAddress",
        JSON.stringify(this.addressObj)
      );
    },
    methods: {
      changeName(val) {
        this.addressObj.name = val;
      },
      changeMobile(val) {
        this.addressObj.mobile = val;
      },
      changeAddress(val) {
        this.addressObj.detail = val;
      },
      submitHandle(argIndex) {
        let token = window.sessionStorage.getItem("token");
        let addressObj = this.addressObj;
        if(this.isDefault) {
          addressObj.isDefault = 1
        } else {
          addressObj.isDefault = 0
        }
        let index = argIndex ? argIndex : -1;
        console.log("index", index);
        console.log(addressObj);
        if (token) {
          editAddress(token, index, addressObj, data => {
            if (!data.errcode) {
              this.$vux.toast.show({
                text: `保存成功`
              });
              this.save = true
              handleGetAddress(this);
              this.$router.replace("/mine/address");
              // that.$router.replace('/mine/address')
            } else {
              this.$vux.alert.show({
                title: "提示",
                content: data.errmsg,
                buttonText: "知道了"
              });
            }
          });
        }
      },
      handleBack() {
        // 比较地址对象转化为字符串进行比较
        let initialAddress = window.sessionStorage.getItem("initialAddress");
        let currentAddress = JSON.stringify(this.addressObj);
        console.log(initialAddress);
        console.log(currentAddress);
        if (initialAddress === currentAddress) {
          this.$router.go(-1);
        } else {
          this.show = !this.show;
        }
      },
      goBack() {
        this.save = false
        this.show = !this.show;
        this.$router.go(-1);
      }
    }
  };
</script>
