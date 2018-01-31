<template>
  <div>
    <div class="header">
      <el-button type="primary">LOGO图标</el-button>
      <span class="name">
          国泰新业
        </span></div>
    <login-form @finish="handleRes"></login-form>
  </div>
</template>


<style lang="scss" scoped>
   .header{
     width: 100%;
     height: 60px;
     padding: 10px 20px;
     background-color: #202d3d;
     color: #fff;
     line-height: 40px;
     box-sizing: border-box;
   }
   .name {
     color: #fff;
     height: 40px;
     line-height: 40px;
     padding: 0 10px;
     font-size: 16px;
     display: inline-block;
   }
</style>

<script type="text/javascript">

  import loginForm from '@/components/compos/passport/login-form'


  export default {
    data: function () {
      return {}
    },
    created: function () {

    },
    computed: {},
    methods: {
      handleRes(result) {
        if (result) {
          this.$router.push('/')
        }
      }
    },
    components: {
      loginForm
    }
  }
</script>
