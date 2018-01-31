<template>

  <!-- 搜索框 -->

  <el-autocomplete
    v-model="searchContent"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    icon="search"
    :on-icon-click="handleSearch"
    @keyup.enter.native="searchSubmit"
    @select="handleSelect"
    autofocus
  ></el-autocomplete>

</template>

<style lang="scss" scoped="">

</style>
<script type="text/javascript">
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import MIXIN from "@/assets/admin/js/mixins.js"
  export default{
    mixins: [MIXIN],
    data() {
      return {

      };
    },
    methods: {



    }

  }
</script>
