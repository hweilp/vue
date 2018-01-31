<template>
  <div id="unitSelect" >
    <el-select
      v-model.number="value"
      placeholder="请选择单位"
      remote
      style="width: 130px"
      @change="handleSelectedUnitChange"
    >
      <el-option
        v-for="item in unitList"
        :key="item.key"
        :label="item.value"
        :value="item.key">
      </el-option>
    </el-select>

  </div>
</template>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 10px;
  }

  .el-dialog--small {

  }
</style>

<script type="text/javascript">
  import Action from '@/assets/admin/resource/actions.js'

  export default {
    data() {
      return {
//        visible: false,
        value: null,
        unitList: [],
      }
    },
    created: function () {
      //获取所有单位列表数据
      this.$http(this.$_.merge({}, Action.Product.Info.unitList))
        .then(response => {
          this.unitList = response.body

          if (this.unitList instanceof Array) {
            this.unitList.forEach(function (currentValue, index, array) {
              if (currentValue['key']) {
                currentValue['key'] = parseInt(currentValue['key'])
              }
            })
          }
//          this.visible = true;
        }, response => {
          this.$message.error('获取单位数据出错', response.body)
        })

    },
    props: ['unitSelected'],
    watch: {
      unitSelected: function (val) {
        if (val) {
          this.value = val
        }
      }
    },
    methods: {
      handleSelectedUnitChange(val) {
        this.$emit('update:unitSelected', val)
      },

    }
  }
</script>
