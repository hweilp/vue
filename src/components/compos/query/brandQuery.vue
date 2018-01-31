<template>
  <div id="brandQuery">
    <i class="fa fa-ellipsis-h" @click="FG_brandQuery_select"></i>
    <el-dialog title="选择品牌" :visible.sync="dialogTableVisible">
      <el-row>
        <el-input
          placeholder="可输入品牌名称/编码"
          icon="search"
          v-model="searchContent"
          :on-icon-click="handlersearchContent">
        </el-input>
      </el-row>
      <el-row>
        <el-table :data="brandData"   border
                  @row-dblclick="FG_TABLE_handleRowDoubleClick"
                  :default-sort="{prop: 'index', order: 'descending'}"  height="250">
          <el-table-column property="key" label="品牌编码"></el-table-column>
          <el-table-column property="value" label="品牌名称"></el-table-column>
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
        brandData:[],
        searchContent:''
      }
    },
    created: function () {
      this.$http(this.$_.merge({}, Action.Product.Info.brandList))
        .then(response => {
          this.brandData = response.body
          this.$emit('brandList',response.body)
        }, response => {
          this.$message.error('获取品牌数据出错', response.body)
        })
    },
    methods: {
      //选择品牌弹出框显示
      FG_brandQuery_select:function () {

          this.dialogTableVisible=true
      },
      //选择品牌搜索
      handlersearchContent : function () {
        if (this.searchContent === '') {
          this.$http(this.$_.merge({}, Action.Product.Info.brandList))
            .then(response => {
              this.brandData = response.body
            }, response => {
              this.$message.error('搜索品牌数据出错', response.body)
            })
        }else{
          this.$http(this.$_.merge({}, Action.Product.Info.brandList,{
            //获取待更新数据
            params: {searchContent:this.searchContent}
          }))
            .then(response => {
              this.brandData = response.body
            }, response => {
              this.$message.error('搜索品牌数据出错', response.body)
            })
        }

      },
      //选择品牌弹出框表格双击选择
      FG_TABLE_handleRowDoubleClick : function (row) {
        //console.log(row.key)
        this.$emit('brandCode-select',row)
        this.dialogTableVisible=false
      }
    }
  }
</script>
