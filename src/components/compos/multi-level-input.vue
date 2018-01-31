<template>
  <div>
    <section class="col-xs-3" style="margin-right: 10px;">
      <label class="label">选择类目</label>
      <label class="select">
        <select class="input-sm" v-model="selectedId" @change="selectCategory">
          <option value="null">- 请选择 -</option>
          <option v-for="category in categories" :value="category.id">{{category.name}}</option>
        </select> <i></i>
      </label>
    </section>
    <multi-level-input :pid="selectedId" v-if="hasSubCat"
                       @targetCategorySelected="setTargetCategory"></multi-level-input>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script type="text/javascript">

  import multiLevelInput from '@/components/compos/multi-level-input.vue'
  import Helper from '@/assets/admin/js/helper.js'
  export default {
    data(){
      return {
        categories: [],
        selectedId: null,
      }
    },
    name: 'multi-level-input',
    props: ['pid'],
    created: function () {
      this.initComp()
    },
    watch: {
      pid: function () {
        this.initComp()
      }
    },
    computed: {
      targetCategory: function () {
        if (this.selectedId) {
          return _.find(this.categories, {'id': this.selectedId})
        }
      },
      hasSubCat: function () {
        return this.selectedId && this.targetCategory && this.targetCategory.is_pid == 1
      }
    },
    methods: {
      selectCategory: function () {
        if (this.targetCategory && this.targetCategory.is_pid != 1) {
          this.$emit('targetCategorySelected', this.targetCategory)
        } else {
          this.$emit('targetCategorySelected', null)
        }
      },
      initComp: function () {
        if (this.pid != null) {
          this.$http.get(Helper.FG_CONFIG.host + '/category?pid=' + this.pid).then(response => {
            this.categories = response.body
            this.selectedId = null
            if (this.categories.length == 1) {
              this.selectedId = this.categories[0].id
              this.selectCategory()
            }
          }, response => {})
        }
      },
      setTargetCategory: function (category) {
        this.$emit('targetCategorySelected', category)
      }
    },
    components: {
      multiLevelInput
    }
  }
</script>
