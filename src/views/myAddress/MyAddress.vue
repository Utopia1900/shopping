<template>
  <div class="myaddress-list-wrap">
    <header-nav :headerNavTitle=headerNavTitle />
    <empty-view
      v-if="address.length === 0"
      :iconCls="'zui-icon-COUPON'"
      :text="'您还没创建过地址!'">
    </empty-view>

    <address-card
      v-else
      v-for="(item,key) in address"
      @on-address-selected="selectAddress(item.index)"
      @on-address-delete="deleteAddress(item.index)"
      :tool="true"
      :data="item"
      :selected=" item.isDefault == 1 && item.index == index ? true : false">
    </address-card>
    <span class="address-add-btn" @click="addAddress">
     添加地址
    </span>
  </div>
</template>

<script>
  import './myAddress.less'
  import HeaderNav from '../../components/HeaderNav'
  import EmptyView from '../../components/EmptyView'
  import AddressCard from '../../components/AddressCard'
  import {queryAddress, setDefaultAddress, delAddress} from '../../api'
  // import {userAddress} from '../../data/data'
  const token = window.sessionStorage.getItem('token')
  export default {
    components: {
      HeaderNav,
      EmptyView,
      AddressCard
    },
    data() {
      return {
        headerNavTitle: '收货地址',
        index: null,
        address: [],
        defIndex: null
      }
    },
    methods: {
      selectAddress(index){
        let that = this
        console.log(index)
        if (token != null) {
           setDefaultAddress(token, index, data => {
             if (!data.errcode) {
               that.$vux.toast.show({
                 text: `设置成功`
               })
               that.index = index
             } else {
               that.$vux.alert.show({
                 title: '提示',
                 content: data.errmsg,
                 buttonText: '知道了'
               })
             }
           })
        }

      },
      handleGetAddress () {
        let that = this
        if (token != null) {
          queryAddress(token, data => {
            if (!data.errcode) {
              that.address = (data.length > 0) ? data : []
              that.defIndex = (data.length > 0) ? data[0].index : null
            } else {
              that.$vux.alert.show({
                title: '提示',
                content: data.errmsg,
                buttonText: '知道了'
              })
            }
          })
        }
      },
      deleteAddress(index){
        let that = this
        let defIndex = this.defIndex
        if (token != null && defIndex != null) {
          delAddress(token, index, defIndex, data => {
              if (!data.errcode) {
                that.$vux.toast.show({
                  text: `删除成功`
                })
              } else {
                that.$vux.alert.show({
                  title: '提示',
                  content: data.errmsg,
                  buttonText: '知道了'
                })
              }
          })
        }
      },
      addAddress () {
        this.$store.commit('address/set', null)
        this.$router.push('/mine/address/edit')
      }
    },
    created() {
      this.handleGetAddress()
    }
  }
</script>
