<template>
  <div>
    <router-link to="/test/productSelect2">123</router-link>
    <el-button @click="show=true">
      选择商品
    </el-button>
    <!--<product-select-->
      <!--:default-select-type="1"-->
      <!--:productSelectVisible.sync="show"-->
      <!--@dialogShowStatusChange="changeProductSelectShowStatus"-->
    <!--&gt;-->

    <!--</product-select>-->

    <input type="text" :value="valueOfTest">
    <input type="text" :value="sessionId">
  </div>
</template>

<style lang="scss" scoped="">

</style>


<script type="text/javascript">
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import ProductSelect from '@/components/compos/product/product-select.vue'
  import Locker from '@/assets/vendors/locker/locker.js'
  import { mapState } from 'vuex'

  export default {
    data: function () {
      return {
        inputValue: '1',
        show: false,
      }
    },
    computed: {
      valueOfTest: () => 1,
      ...mapState(['sessionId'])

    },
    mixins: [Locker],
    created: function () {

    },
    components: {
      ProductSelect
    },
    methods: {
      changeProductSelectShowStatus: function (val) {
        this.show = val
      },
    }
  }

</script>
