<template>
  <div>
    <section class="col col-4">
      <label class="label">{{attributeInfo.name}}</label>
      <template v-if="attributeInfo.is_input == 1">
        <label class="input">
          <input type="text" class="input-sm" v-model="selectedId">
        </label>
      </template>
      <template v-else-if="attributeInfo.is_multi == 1">
        <div class="inline-group">
          <template v-for="(attr,attr_index) in attrList">
            <label class="checkbox">
              <input type="checkbox" :value="attr.id" v-model="selectedId">
              <i></i>{{attr.attr_value}}</label>
          </template>
        </div>
      </template>
      <template v-else>
        <label class="select">
          <select class="input-sm" v-model="selectedId" @change="selectAttr">
            <option value="undefined">- 请选择 -</option>
            <option v-for="(attr,attr_index) in attrList" :value="attr.id">
              {{attr.attr_value}}
            </option>
          </select> <i></i>
        </label>
      </template>
    </section>
    <multi-attr-list :attributes="attributes" :pid="selectedId"
                          v-if="selectedId && hasSubAttr"></multi-attr-list>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script type="text/javascript">

  import multiAttrList from '@/components/compos/multi-attr-list.vue'
  import Helper from '@/assets/admin/js/helper.js'

  export default {
    data(){
      return {
        selectedId: [],
      }
    },
    name: 'single-level-attr',
    props: ['attributes', 'attrList'],
    computed: {
      attributeInfo: function () {
        return this.attrList[0].attribute
      },
      selectedAttr: function () {
        return _.find(this.attrList, {id: this.selectedId})
      },
      hasSubAttr: function () {
        return this.selectedAttr && this.selectedAttr.is_pid == 1
      }
    },
    created: function () {

    },
    watch: {
      pid: function () {
        this.selectedId = null
      }
    },
    methods: {
      selectAttr: function () {
      }
    },
    components: {
      multiAttrList
    }
  }
</script>


