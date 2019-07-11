import axios from 'axios'

let url = '/mx/api/1/' // 生产环境
// let url = 'http://www.stemtherapy.cn/mx/api/1'  // 开发环境
axios.defaults.baseURL = url
axios.defaults.timeout = 5 * 1000
axios.defaults.headers.post['Content-Type'] = 'application/json'


// 可以考虑给接口加上时间戳 eg: '/api/queryOrder?timestamp=' + new Date.getTime()
export const queryProduct = (token, successCb) => {
  // 获取商品信息  queryProduct (token)  返回 {id: , detailUrl: , imgUrl: , name: , price: , oriPrice: , inventory: } 的数组
  let formData = { token }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'queryProduct'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}

export const editAddress = (token, index, addressObj, successCb) => {
  // 编辑收货地址 editAddress(token, index, isDefault, name, mobile, province, city, district, detail)  注意： index:-1 代表新增, index: 非-1 代表修改(编辑)
  let preData = { token, index }
  let formData = Object.assign(preData, addressObj)
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'editAddress'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}

export const setDefaultAddress = (token, index, successCb) => {
  // 设置默认地址 setDefaultAddress(token, index)  返回{errcode: ,errmsg: }
  let formData = { token, index }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'setDefaultAddress'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}

export const delAddress = (token, index, defIndex, successCb) => {
  // 删除地址 delAddress(token, index, defIndex) 返回{errcode: , errmsg: }
  let formData = { token, index, defIndex }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'delAddress'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}
const queryAddress = (token, successCb) => {
  // 获取收货地址 queryAddress(token)  返回{index: , name: , mobile: , province: , city: , district: , detail: } 的数组
  let formData = { token }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'queryAddress'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}


export const handleGetAddress = self => {
  const token = window.sessionStorage.getItem('token')
  if (token !== null) {
    queryAddress(token, data => {
      if (!data.errcode) {
        if (data.length !== 0) {
          self.$store.commit('address/setAddressList', data)
          // that.address = data.length > 0 ? data : [];
          self.$store.commit('address/setDefIndex', data[0].index)
        }
      } else {
        self.$vux.alert.show({
          title: "提示",
          content: data.errmsg,
          buttonText: "知道了"
        });
      }
    });
  }
}


export const querySummary = (token, successCb) => {
  // 获取摘要信息 querySummary(token)
  // 返回{headImgUrl: , customerID: ,nickname: ,buyAmount: , marketAmount: ,commission: ,unpaidOrderNum: , finishedOrderNum: , introducer: ,followTime: }
  let formData = { token }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'querySummary'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}

export const handleGetsummary = (self) => {
  const token = window.sessionStorage.getItem('token')
  querySummary(token, data => {
    if(!data.errcode) {
      self.$store.commit('summary/set', data)
    } else {
      self.$vux.alert.show({
        title: "提示",
        content: data.errmsg,
        buttonText: "知道了"
      });
    }
  })
}

export const createOrder = (token, products, amount, addressIndex, points, successCb) => {
  // 支付订单 （eg:微信支付） createOrder(token, products, amount, addressIndex)  其中 products是{productID: , price: , num: ,}的数组， amount是总金额
  let formData = { token, products, amount, addressIndex }
  if (points) formData.points = points
  const options = {
    method: 'POST',
    data: formData,
    url: 'createOrder'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}

const queryPurchaseOrder = (token, type, page, successCb) => {
  // 查询我购买的订单 type：1- 待发货， 2- 已发货待收货，3- 确认收货待评价， 不传为所有订单
  let formData = { token, page }
  if (type) formData.type = type
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'queryPurchaseOrder'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    console.error(error)
  })
}

export const handleGetPurchaseOrder = (self, type, page) => {
  const token = window.sessionStorage.getItem('token')
  queryPurchaseOrder(token, type, page, data => {
    if (!data.errcode) {
      // for(var i =0; i<data.length; i++){
      //   self.$store.state.order.purchaseOrderList.push(data[i]);
      // }
      self.$store.commit('order/setPurchaseOrder', data)
      if (data.length < 10) {
        self.$store.commit('order/setHasMore', false)
      } else {
        self.$store.commit('order/setHasMore', true)
      }
    } else {
      self.$vux.alert.show({
        title: "提示",
        content: data.errmsg,
        buttonText: "知道了"
      })
    }
  })
}

const querySoldOrder = (token, type, page, successCb) => {
  // 查询我出售的订单 type：1- 待发货， 2- 已发货待买家收货，3- 确认收货待评价， 不传为所有订单
  let formData = { token, page }
  if (type) formData.type = type
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'querySoldOrder'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    console.error(error)
  })
}

export const handleGetSoldOrder = (self, type, page) => {
  const token = window.sessionStorage.getItem('token')
  querySoldOrder(token, type, page, data => {
    if (!data.errcode) {
      self.$store.commit('order/setSoldOrder', data)
      if (data.length < 10) {
        self.$store.commit('order/setHasMore', false)
      } else {
        self.$store.commit('order/setHasMore', true)
      }
    } else {
      self.$vux.alert.show({
        title: "提示",
        content: data.errmsg,
        buttonText: "知道了"
      })
    }
  })
}

export const confirmReceipt = (token, orderID, successCb) => {
  // 确认订单
  let formData = { token, orderID }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'confirmReceipt'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
  })
  console.error(errot)
}

export const delivery = (token, orderID, expressCompany, expressNo, successCb) => {
  // 发货
  let formData = { token, orderID, expressCompany, expressNo }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'delivery'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    console.error(error)
  })
}

export const comment = (token, orderID, productID, star, desc, successCb) => {
  // 评价订单
  let formData = { token, orderID, productID, star, desc }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'comment'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    console.error(error)
  })
}


export const addToCart = (token, productID, successCb) => {
  // 加入购物车  addToCart (token, productID) 返回 {errcode: , errmsg: }
  let formData = { token, productID }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'addToCart'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}

export const editCartProduct = (token, products, successCb) => {
  // 编辑购物车商品(修改数量) editCartProduct(token, products)  其中 products是{id:productID, num: num}的数组
  // 返回 {errcode: , errmsg: }
  let formData = { token, products }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'editCartProduct'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}

export const delCartProduct = (token, productIDs, successCb) => {
  // 删除购物车商品 delCartProduct(token, productIDs) 其中productIDs 是选择要删除的productID的数组
  // 返回 {errcode: , errmsg: }
  let formData = { token, productIDs }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'delCartProduct'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}


const queryCart = (token, successCb) => {
  // 查看购物车 queryCart(token)  返回 {productID: , price: , oriPrice: , num: , headImgUrl: ,name: } 的数组
  let formData = { token }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'queryCart'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}


export const handleGetCart = self => {
  const token = window.sessionStorage.getItem('token')
  if (token !== null) {
    queryCart(token, data => {
      if (!data.errcode) {
        if (data.length != 0) {
          let tmp = [];
          for (var i = 0; i < data.length; i++) {
            data[i].selected = false;
            tmp.push(data[i])
          }
          self.$store.commit("cart/setCartList", tmp)
        }
      } else {
        self.$vux.alert.show({
          title: "提示",
          content: data.errmsg,
          buttonText: "知道了"
        })
      }
    })
  }
}


export const getSDKConfig = (url, successCb) => {
  let formData = { url }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'getSDKConfig'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    console.error(error)
  })
}

const queryLower = (token, page, successCb) => {
  // 查看我的推广（下级） queryLower(token)
  // 返回{levelName: , paid: , unpaid: ,num: }
  let formData = { token, page }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'queryLower'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    console.error(error)
  })
}

export const handleQueryLower = (self, page) => {
  const token = window.sessionStorage.getItem('token')
  if (token) {
    queryLower(token, page, data => {
      if (!data.errcode) {
        self.$store.commit('lower/set', data)
        if (data.length < 10) {
          self.hasMore = false
        } else {
          self.hasMore = true
        }
      } else {
        self.$vux.alert.show({
          title: "提示",
          content: data.errmsg,
          buttonText: "知道了"
        })
      }
    })
  }
}


export const getAgencyLevel = (token, successCb) => {
  let formData = { token }
  const options = {
    method: 'POST',
    data: JSON.stringify(formData),
    url: 'getAgencyLevel'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    console.error(error)
  })
}

export const isEquivalent = (a, b) => {
  var aProps = Object.getOwnPropertyNames(a)
  var bProps = Object.getOwnPropertyNames(b)
  if (aProps.length != bProps.length) {
    return false
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i]
    if (a[propName] !== b[propName]) {
      return false
    }
  }
  return true
}
