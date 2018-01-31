<template>
  <div id="unitSelect">
    <el-select
      v-model="value"
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
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        value: null,
        unitList: [],
      }
    },
    created: function () {
      //获取所有单位列表数据
      if(this.$store.state.User.unit == null){
        this.init_unit()
      }else {
        this.unitList = this.$store.state.User.unit
      }


    },
    props: ['unitSelected'],
    watch: {
      unitSelected: function (val) {
        if(val){
          this.value = val.toString()
        }
      }
    },
    methods: {
      ...mapMutations(['User/INIT_USER_UNIT']),
      init_unit(){
        this.$http(this.$_.merge({}, Action.Product.Info.unitList))
          .then(response => {
            this.unitList = response.body
            this['User/INIT_USER_UNIT'](response.body)
            this.$store.dispatch('User/userUnit', response.body);
            this.$emit('finish', true)
          }, response => {
            this.$emit('finish', false)
            this.$message.error('获取单位数据出错', response.body)
          })

      },
      handleSelectedUnitChange(val) {
        this.$emit('update:unitSelected', Number(val))
      },

    }
  }
</script>
