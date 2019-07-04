<template>
  <ul class="zlist-2-item">
    <li class="item" v-for="(item, index) in data" :key="index">
      <div @click="goToDetail(item)">
        <img :src="item.imgUrl">
        <div class="info">
          <div class="title z-ellipsis-2">{{item.name}}</div>
          <div class="subtitle z-ellipsis-2" style="color: #E03C12">￥{{item.price}}</div>
          <div class="subtitle z-ellipsis-2" style="font-size: 12px">零售价:￥{{item.retailPrice}}</div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    goToDetail(item) {
      this.$store.commit("goodDetail/set", item);
      this.$router.push(`/goods/:${item.id}`);
    }
  }
};
</script>
<style>
.zlist-2-item {
  width: 100%;
  overflow: hidden;
}
.zlist-2-item .item {
  float: left;
  width: 50%;
  background: #efeff4;
}
.zlist-2-item .item a {
  padding-top: 14px;
  margin-top: 1px;
  margin-left: 1px;
  display: block;
  background: #fff;
}
.zlist-2-item .item:nth-child(even) a {
  padding-left: 14px;
  padding-right: 14px;
}
.zlist-2-item .item:nth-child(odd) a {
  padding-left: 14px;
  padding-right: 14px;
}
.zlist-2-item .item a > img {
  display: block;
  width: 100%;
}
.zlist-2-item .item a .info {
  padding-top: 14px;
  padding-bottom: 20px;
}
.zlist-2-item .item a .info .title {
  font-size: 14px;
  line-height: 1.4;
  color: #404040;
  text-align: center;
}
.zlist-2-item .item a .info .subtitle {
  font-size: 20px;
  font-weight: 500;
  color: #404040;
  text-align: center;
  padding-top: 14px;
  font-family: "heiti";
}
</style>
