import axios from 'axios'
import config from '../config'

// 可以考虑给接口加上时间戳 eg: '/api/queryOrder?timestamp=' + new Date.getTime()
export const queryProduct = (token, successCb) => {
// 获取商品信息  queryProduct (token)  返回 {id: , detailUrl: , imgUrl: , name: , price: , oriPrice: , inventory: } 的数组
  let formData = {token}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'queryProduct'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const addToCart = (token, productId, successCb) => {
// 加入购物车  addToCart (token, productId) 返回 {errcode: , errmsg: }
  let formData = {token, productId}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'addToCart'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const queryCart = (token, successCb) => {
// 查看购物车 queryCart(token)  返回 {productID: , price: , oriPrice: , num: , headImgUrl: ,name: } 的数组
  let formData = {token}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'queryCart'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const delCartProduct = (token, productIDs, successCb) => {
// 删除购物车商品 delCartProduct(token, productIDs) 其中productIDs 是选择要删除的productID的数组
// 返回 {errcode: , errmsg: }
  let formData = {token, productIDs}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'delCartProduct'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const editCartProduct = (token, products, successCb) => {
// 编辑购物车商品(修改数量) editCartProduct(token, products)  其中 products是{id:productID, num: num}的数组
// 返回 {errcode: , errmsg: }
  let formData = {token, products}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'editCartProduct'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const queryAddress = (token, successCb) => {
// 获取收货地址 queryAddress(token)  返回{index: , name: , mobile: , province: , city: , district: , detail: } 的数组
  let formData = {token}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'queryAddress'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const setDefaultAddress = (token, index, successCb) => {
// 设置默认地址 setDefaultAddress(token, index)  返回{errcode: ,errmsg: }
  let formData = {token}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'setDefaultAddress'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const delAddress = (token, index, defIndex, successCb) => {
// 删除地址 delAddress(token, index, defIndex) 返回{errcode: , errmsg: }
  let formData = {token, index, defIndex}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'delAddress'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const editAddress = (token, index, addressObj, successCb) => {
// 编辑收货地址 editAddress(token, index, isDefault, name, mobile, province, city, district, detail)  注意： index:-1 代表新增, index: 非-1 代表修改(编辑)
  let preData = {token, index}
  let formData = Object.assign(preData, addressObj)
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'editAddress'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const createOrder = (token, products, amount, addressIndex, successCb) => {
// 支付订单 （eg:微信支付） createOrder(token, products, amount, addressIndex)  其中 products是{productID: , price: , num: ,}的数组， amount是总金额
// 对接口返回的对象：res 再调用 WeixinJSBridge.invoke(‘getBrandWCPayRequest’，res, callback(res){if(res.err_msg=="get_brand_wcpay_request:ok")表示支付成功})
  let formData = {token, products, amount, addressIndex}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'createOrder'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const queryOrder = (token, type, page, successCb) => {
// 查看订单 queryOrder(token, type, page)  其中type：0 表示全部， type：1 表示待付款
// 返回 {products：[headImgUrl: , name: , price: , num: ], status: , amount: }
// 其中 status: 0 代表未支付（附加按钮：“支付” 和 “取消订单”）
//      status：1 代表支付成功“待发货”
//      status: 2 代表支付成功“已发货” 并附加返回快递信息{expressCompany： , expressNumber: }
  let formData = {token, type, page}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'queryOrder'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const getPersonalInfo = (token, successCb) => {
// 获取个人信息 getPersonalInfo(token)  返回{id: , name: , mobile: , sex: , province: , city: , birthday: }
  let formData = {token}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'getPersonalInfo'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const UpdatePersonalInfo = (token, name, mobile, sex, province, city, birthday, successCb) => {
// 修改个人信息 UpdatePersonalInfo(token, name, mobile, sex, province, city, birthday)   birthday (eg:19900202)
// 返回{errcode: , errmsg: }
  let formData = {token, name, mobile, sex, province, city, birthday}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'UpdatePersonalInfo'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const querySummary = (token, successCb) => {
// 获取会员信息 querySummary(token)
// 返回{headImgUrl: , customerID: ,nickname: ,buyAmount: , marketAmount: ,commission: ,unpaidOrderNum: , finishedOrderNum: , introducer: ,followTime: }
  let formData = {token}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'querySummary'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const queryLower = (token, successCb) => {
// 查看我的推广（下级） queryLower(token)
// 返回{levelName: , paid: , unpaid: ,num: }
  let formData = {token}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'queryLower'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const askWithdraw = (token, amount, successCb) => {
// 申请提现 askWithdraw（token, amount）
// 返回{errcode: , errmsg: }
  let formData = {token, amount}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'askWithdraw'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}

export const myWithdraw = (token, type, page, successCb) => {
// 查看我的提现记录 myWithdraw(token, type, page) 其中type传0
// 返回 {time: , amount: , status: } 其中 status: 0代表“审核中”, status:1 代表“提现成功”
  let formData = {token, type, page}
  const options = {
    methods: 'POST',
    headers: {'content-type': 'application/json'},
    data: JSON.stringify(formData),
    url: config.url + 'myWithdraw'
  }
  axios(options).then(response => {
    if (successCb) successCb(response.data)
  }).catch(error => {
    // handle error
    alert(error)
  })
}


export const isEquivalent = (a, b) => {
   var aProps = Object.getOwnPropertyNames(a)
   var bProps = Object.getOwnPropertyNames(b)
   if (aProps.length != bProps.length) {
     return false
   }
   for (var i=0; i<aProps.length; i++) {
     var propName = aProps[i]
     if(a[propName] !== b[propName]) {
        return false 
     }
   }
   return true
}
