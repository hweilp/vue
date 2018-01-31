<template>
  <div id="advQuery">
    <div class="advQuery" :style="left" @click="FG_advQuery_slide" :class="{active:isActive}">高级查询<i
      class="fa fa-sort-desc" aria-hidden="true"></i></div>
    <div class="advQueryPanel" v-if="isShow">
      <slot></slot>
      <div class="slideUp"><span @click="FG_advQuery_slideUp">收起 <i class="fa fa-angle-double-up" aria-hidden="true"></i></span></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #advQuery {
    width: auto;
    position: relative;
    margin-top: 10px;

  .advQuery {
    width: 120px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background: #FFF;
    border: 1px solid #bfcbd9;
    color: #1f2d3d;
    cursor: pointer;
    border-radius: 4px;
    position: absolute;
    top: -46px;
  i {
    position: absolute;
    top: 7px;
    right: 10px;
    transition: transform .3s;
    transform-origin: center 70%;
    color: #bcbcbc;
  }

  }
  .advQueryPanel {
    background: white;
    border: 1px solid #e7e6eb;
    padding: 20px 30px;
    font-size: 14px;
    color: #515D6B;
    width:1200px;
  .slideUp {
    margin: auto;
    text-align: center;
  span {
    cursor: pointer;
  }

  }
  }

  .active {
    border-bottom: none;
    height: 47px;
    border-radius: 4px 4px 0 0;
  i {
    transform: rotateZ(180deg);
  }

  }
  }
</style>

<script type="text/javascript">

  export default {
    props: ['left'],
    data(){
      return {
        isShow: false,
        isActive: false
      }
    },
    methods: {
      FG_advQuery_slide: function () {
        if (this.isShow === false) {
          this.isShow = true
          this.isActive = true
        } else {
          this.isShow = false
          this.isActive = false
        }
      },
      FG_advQuery_slideUp: function () {
        this.isShow = false
        this.isActive = false
      }
    }
  }
</script>
