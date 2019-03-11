<template>
  <div class="z-content">
    <header-nav :headerNavTitle=headerNavTitle />
    <div class="address-edit-wrap">
      <x-input
        title="姓名"
        :show-clear="true"
        is-type="china-name"
        :value="addressObj.name"
        required
        @on-change="changeName"
        placeholder="姓名">
      </x-input>
      <x-input
        title="电话"
        :show-clear="true"
        is-type="china-mobile"
        keyboard="number"
        type="tel"
        :value="addressObj.mobile"
        required
        @on-change="changeMobile"
        placeholder="手机号码">
      </x-input>
      <x-address
        :title="'地区'"
        v-model="value"
        :list="addressData"
        placeholder="请选择地址">
      </x-address>
      <x-textarea
        :max="50"
        :height="100"
        :value="addressObj.detail"
        @on-change="changeAddress"
        :show-counter="false"
        placeholder="请填写详细地址">
      </x-textarea>
      <div
        class="vux-cell-box set-default-wrap"
        :class="addressObj.isDefault ? 'active' : '' "
        @click="toggleDefault">
        <icon
          class="icon"
          :type="addressObj.isDefault ? 'success' : 'circle'">
        </icon>
        {{addressObj.isDefault ? '默认地址' : '设为默认'}}
      </div>
    </div>
    <div
      class="address-edit-btn"
      @click="submitHandle(addressObj.index)">保存</div>
  </div>
</template>
<script>
  import './addressEdit.less'
  import HeaderNav from '../../components/HeaderNav'
  import {XInput,XAddress,ChinaAddressData,XTextarea, Icon} from 'vux'
  import {editAddress} from '../../api'

  export default {
    name: 'AddressEdit',
    components: {
      XInput,
      XAddress,
      XTextarea,
      HeaderNav,
      Icon
    },
    data() {
      return {
        addressObj: {
          isDefault: 0
        },
        value: [],
        addressData: ChinaAddressData
      }
    },
    computed: {
      hasSave() {
        return this.$store.getters.hasSave
      },
      headerNavTitle() {
        if (this.addressObj.name) {
          return '编辑'
        } else {
          return '添加'
        }
      }
    },
    watch: {
      hasSave: function(val, oldVal) {
        // 数据没变化时，不会触发改方法
        console.log(val, oldVal)
        if(val){
          this.$store.dispatch({
            type: 'changeHasSave'
          })
          this.$router
            ? this.$router.back()
            : window.history.back()
        }
      },
      value: function (val, oldVal) {
        let that = this
        if (val) {
          this.addressData.forEach((item, city) => {
            if (item.value == val[0]) {
              that.addressObj.province = item.name
            }
          })

          this.addressData.forEach((item, city) => {
            if (item.value == val[1]) {
              that.addressObj.city = item.name
            }
          })

          this.addressData.forEach((item, city) => {
            if (item.value == val[2]) {
              that.addressObj.district = item.name
            }
          })
        }
      },
      '$route'() {
        this.addressObj = this.$store.state.address.addressObj || {isDefault: 0}
      }
    },
    created(){

    },
    methods: {
      changeName (val) {
        this.addressObj.name = val
      },
      changeMobile (val) {
        this.addressObj.mobile = val
      },
      changeAddress (val) {
        this.addressObj.detail = val
      },
      submitHandle(argIndex){
        let that = this
        let token = window.sessionStorage.getItem('token')
        let addressObj = this.addressObj
        let index = argIndex != null ? argIndex : -1
        console.log('index', index)
        if (token != null) {
          editAddress(token, index, addressObj, data => {
             if (!data.errcode) {
               that.$vux.toast.show({
                 text: `保存成功`
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
      toggleDefault () {
        let isDefault = this.addressObj.isDefault
        if (isDefault == 0) {
          this.addressObj.isDefault = 1
        } else {
          this.addressObj.isDefault = 0
        }
        // this.addressObj.isDefault = !this.addressObj.isDefault
      }
    }
  }
</script>
