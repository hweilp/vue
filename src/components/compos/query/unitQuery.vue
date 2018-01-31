<template>
  <div id="unitQuery">
    <el-select
      v-model="value"
      filterable
      remote
      :remote-method="remoteMethod"
      style="width: 130px"
    >
      <el-option
        v-for="item in options"
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

  .el-dialog--small{

  }
</style>

<script type="text/javascript">
  import Action from '@/assets/admin/resource/actions.js'

  export default {
    data(){
      return {
        value:'',
        unitData:[],
        options:[],
      }
    },
    methods: {
      //单位查询选择
      FG_unitQuery_loadunitData:function () {
        this.$http(this.$_.merge({}, Action.Product.Info.unitList))
          .then(response => {
            this.unitData = response.body
            this.options = this.unitData;
          }, response => {
            this.$message.error('获取单位数据出错', response.body)
          })
      },
      remoteMethod(query) {
        if (query !== '') {

          this.options = this.unitData.filter(item => {
            return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.key.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
          this.$emit('child-event',this.value)
        } else {
          this.options = this.unitData;
        }
        //console.log(this.value)

      },


    },
    mounted() {
      this.FG_unitQuery_loadunitData();
    },
  }
</script>
