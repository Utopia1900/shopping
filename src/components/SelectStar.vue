<template>
  <div class="stars_container">
    <span v-for="(item,index) in stars" :key="index" @click="changeColor(item, index)"
          :class="{active: currentIndex !=null && index <= currentIndex}">{{item.text}}</span>
  </div>
</template>

<script>
  export default {
    name: "SelectStar",
    data() {
      return {
        stars: [
          {text: '☆', selected: false},
          {text: '☆', selected: false},
          {text: '☆', selected: false},
          {text: '☆', selected: false},
          {text: '☆', selected: false}
        ],
        currentIndex: null
      }

    },
    methods: {
      changeColor(arg, index) {
        this.currentIndex = index
        arg.selected = !arg.selected;
      }
    }

  }
</script>

<style>
  .stars_container {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
  }

  .stars_container span {
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 20px;
    display: inline-block;
  }

  .active {
    color: red
  }
</style>
