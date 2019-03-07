const API = {
  queryProduct(){ // 获取商品信息  queryProduct (token)

  },
  addToCart(){ // 加入购物车  addToCart (token, productId)

  },
  queryCart(){ // 查看购物车 queryCart(token)

  },
  delCartProduct() { // 删除购物车商品 delCartProduct(token, productIDs)

  },
  editCartProduct() { // 编辑购物车商品(修改数量) editCartProduct(token, products)  其中 products是{id:productID, num: num}的数组

  },
  goToPay() { // 跳转支付  参数

  }
}


export default API
