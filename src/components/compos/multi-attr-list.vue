<template>
  <div>
    <template v-for="attrs in attrsList">
      <single-attr :attributes="attributes" :attrList="attrs"></single-attr>
    </template>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script type="text/javascript">

  //  import singleLevelAttr from '@/components/compos/single-level-attr.vue'
  import Helper from '@/assets/admin/js/helper.js'

  export default {
    data(){
      return {}
    },
    name: 'multi-level-key-attr',
    props: ['attributes', 'pid'],
    computed: {
      attrsList: function () {
        let self = this
        let o = _.filter(this.attributes, function (element) {
          return element.pid == self.pid
        })
        o = _.groupBy(o, function (element) {
          return element.attribute.name
        })
        return o
      }
    },
    beforeCreate: function () {
      this.$options.components.singleAttr = require('@/components/compos/single-attr.vue')
    },
    created: function () {

    },
    watch: {},
    methods: {
      selectAttr: function () {
      }
    },
    components: {
//      singleLevelAttr
    }
  }
</script>


