<template>
  <div class="myaddress-list-wrap">
    <header-nav :headerNavTitle="headerNavTitle" @on-back="goBack"/>
    <empty-view v-if="address.length === 0" :iconCls="'zui-icon-COUPON'" :text="'您还没创建地址'"></empty-view>
    <address-card
      v-else
      v-for="(item,index) in address"
      :key="index"
      @on-address-selected="selectAddress(item.index)"
      @on-address-delete="deleteAddress(item.index, index)"
      :tool="true"
      :data="item"
      :selected="item.index === defIndex"
    ></address-card>
    <span class="address-add-btn" @click="addAddress">添加地址</span>
  </div>
</template>

<script>
  import "./myAddress.less";
  import HeaderNav from "../../components/HeaderNav";
  import EmptyView from "../../components/EmptyView";
  import AddressCard from "../../components/AddressCard";
  import {handleGetAddress, setDefaultAddress, delAddress} from "../../api";

  const token = window.sessionStorage.getItem("token");
  export default {
    components: {
      HeaderNav,
      EmptyView,
      AddressCard
    },
    data() {
      return {
        headerNavTitle: "收货地址",
        index: null
      };
    },
    computed:{
      address:function(){
        return this.$store.state.address.addressList
      },
      defIndex: function () {
        return this.$store.state.address.defIndex
      }
    },
    methods: {
      selectAddress(index) {
        if (token !== null) {
          setDefaultAddress(token, index, data => {
            if (!data.errcode) {
              let address = this.address;
              for (var i = 0; i < address.length; i++) {
                if (address[i].index === index) {
                  address[i].isDefault = 1
                } else {
                  address[i].isDefault = 0
                }
              }
              this.$vux.toast.show({
                text: `设置成功`
              });
              handleGetAddress(this)
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
      deleteAddress(index, listIndex) {
        let defIndex = this.defIndex;
        if (token !== null && defIndex !== null) {
          delAddress(token, index, defIndex, data => {
            if (!data.errcode) {
              let address = this.address;
              for (var i = 0; i < address.length; i++) {
                if (address[i].index === index) {
                  address.splice(listIndex, 1);
                }
              }
              this.$vux.toast.show({
                text: `删除成功`
              });
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
      addAddress() {
        this.$store.commit("address/set", {
          name: '',
          mobile: '',
          detail: '',
          isDefault: 0
        });
        this.$router.push("/mine/address/edit");
      },
      goBack() {
        this.$router.go(-1)
      }
    },
    created() {
      handleGetAddress(this)
    }
  };
</script>
