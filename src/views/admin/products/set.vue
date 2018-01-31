<template>
  <div id="" class="contentPadding">

    <div class="contentTop">
      <div class="kindName">{{kindTitle}}</div>
    </div>
    <div class="contentMain">

    </div>

  </div>
</template>
<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/param";
  @import "../../../assets/admin/css/stockManage/stockComm";
  .fg-table-type {
    @include table-container(240px, 10px)
  }
</style>


<script>
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  export default {
    data (){
      return {
        kindTitle:"商品设置-列表"
      }
    }
  }

</script>
