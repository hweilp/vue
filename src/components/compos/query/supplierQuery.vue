<template>
  <div id="supplierQueryQuery">
    <i class="fa fa-ellipsis-h" @click="FG_supplierQueryQuery_select"></i>
    <el-dialog title="选择供应商" :visible.sync="dialogTableVisible">
      <el-row>
        <el-input
          placeholder="可输入供应商名称/编码"
          icon="search"
          v-model="searchContent"
          :on-icon-click="handlersearchContent">
        </el-input>
      </el-row>
      <el-row>
        <el-table :data="supplierQueryData"   border
                  @row-dblclick="FG_TABLE_handleRowDoubleClick"
                  :default-sort="{prop: 'index', order: 'descending'}"  height="250">
          <el-table-column property="key" label="供应商编码"></el-table-column>
          <el-table-column property="value" label="供应商名称"></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
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
        dialogTableVisible:false,
        supplierQueryData:[],
        searchContent:''
      }
    },
    created: function () {
      this.$http(this.$_.merge({}, Action.Product.Info.supplierList))
        .then(response => {
          this.supplierQueryData = response.body
          this.$emit('supplierList',response.body)
        }, response => {
          this.$message.error('获取供应商数据出错', response.body)
        })
    },
    methods: {
      //选择供应商弹出框显示
      FG_supplierQueryQuery_select:function () {

        this.dialogTableVisible=true
      },
      //选择供应商搜索
      handlersearchContent : function () {
        if (this.searchContent === '') {
          this.$http(this.$_.merge({}, Action.Product.Info.supplierList))
            .then(response => {
              this.supplierQueryData = response.body
            }, response => {
              this.$message.error('搜索供应商数据出错', response.body)
            })
        }else{
          this.$http(this.$_.merge({}, Action.Product.Info.supplierList,{
            //获取待更新数据
            params: {searchContent:this.searchContent}
          }))
            .then(response => {
              this.supplierQueryData = response.body
            }, response => {
              this.$message.error('搜索供应商数据出错', response.body)
            })
        }

      },
      //选择供应商弹出框表格双击选择
      FG_TABLE_handleRowDoubleClick : function (row) {
        //console.log(row.key)
        this.$emit('sno-select',row)
        this.dialogTableVisible=false
      }
    }
  }
</script>
