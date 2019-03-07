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
      v-for="(item,index) in address"
      @on-address-selected="selectAddress(index)"
      @on-address-delete="deleteAddress(item.id,index)"
      :tool="true"
      :data="item"
      :selected=" index === selected ? true : false">
    </address-card>

    <router-link
      class="address-add-btn"
      :to="{name: 'addressEdit'}">
      新建地址
    </router-link>
  </div>
</template>

<script>
  import './myAddress.less'
  import {userAddress} from '../../data/data.js'
  import HeaderNav from '../../components/HeaderNav'
  import EmptyView from '../../components/EmptyView.vue'
  import AddressCard from '../../components/addressCard.vue'

  export default {
    components: {
      HeaderNav,
      EmptyView,
      AddressCard
    },
    data() {
      return {
        headerNavTitle: '收货地址',
        selected: -1,
        address: userAddress
      }
    },
    created(){
      // this.$store.dispatch('getAddress')
    },
    methods: {
      selectAddress(index){
        this.selected = index
      },
      deleteAddress(id,index){

      }
    }
  }
</script>
