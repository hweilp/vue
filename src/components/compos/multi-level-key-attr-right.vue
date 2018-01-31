<template>
  <div>
    <template v-for="(attrs,key,index) in attrsList">
      <section>
        <label class="label">{{key}}</label>
        <template v-if="attrs[0]['attribute'].is_input == 1">
          <label class="input">
            <input type="text" class="input-sm" v-model="selectedId[index]=attrs[0].id">
          </label>
        </template>
        <template v-else-if="attrs[0]['attribute'].is_multi == 1">
          <div class="inline-group">
            <template v-for="(attr,attr_index) in attrsList[key]">
              <label class="checkbox">
                <input type="checkbox" :value="attr.attr_value"
                       v-model="selectedId[index]?selectedId[index]:selectedId[index]=[]">
                <i></i>{{attr.attr_value}}</label>
            </template>
          </div>
        </template>
        <template v-else>
          <label class="select">
            <select class="input-sm" v-model="selectedId[index]" @change="selectAttr">
              <option value="undefined">- 请选择 -</option>
              <option v-for="(attr,attr_index) in attrs" :value="attr_index">
                {{attr.attr_value}}
              </option>
            </select> <i></i>
          </label>
        </template>
      </section>
      <multi-level-key-attr :attributes="attributes"
                            :pid="attrsList[key][selectedId[index]]?attrsList[key][selectedId[index]].id:null"
                            v-if=" attrs[0]['attribute'].is_multi == 2 && isSelected && attrsList[key][selectedId[index]] && attrsList[key][selectedId[index]].is_pid == 1"></multi-level-key-attr>
    </template>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script type="text/javascript">

  import multiLevelKeyAttr from '@/components/compos/multi-level-key-attr.vue'
  import Helper from '@/assets/admin/js/helper.js'

  export default {
    data(){
      return {
        selectedId: [],
//        isSelected: false,
      }
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
      },
      isSelected: function () {
        return !_.isEmpty(this.selectedId)
      }
    },
    created: function () {

    },
    watch: {
      pid: function () {

        this.selectedId = []
      }
    },
    methods: {
      selectAttr: function () {
      }
    },
    components: {
      multiLevelKeyAttr
    }
  }
</script>


