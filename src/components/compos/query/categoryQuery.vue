<template>
  <div id="categoryQuery">
    <i class="fa fa-ellipsis-h" @click="FG_categoryQuery_select"></i>
    <el-dialog title="选择类别" :visible.sync="dialogTableVisible">
      <el-row>
        <el-input
          placeholder="可输入类别名称/编码"
          icon="search"
          v-model="searchContent"
          :on-icon-click="handlersearchContent">
        </el-input>
      </el-row>
      <el-row>
        <el-table :data="categoryData"   border
                  @row-dblclick="FG_TABLE_handleRowDoubleClick"
                  :default-sort="{prop: 'index', order: 'descending'}"  height="250">
          <el-table-column property="key" label="类别编码"></el-table-column>
          <el-table-column property="value" label="类别名称"></el-table-column>
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
        categoryData:[],
        searchContent:''
      }
    },
    created: function () {
      this.$http(this.$_.merge({}, Action.Product.Info.categoryList))
        .then(response => {
          this.categoryData = response.body
          this.$emit('categoryList',response.body)
        }, response => {
          this.$message.error('获取类别数据出错', response.body)
        })
    },
    methods: {
      //选择类别弹出框显示
      FG_categoryQuery_select:function () {

        this.dialogTableVisible=true
      },
      //选择类别搜索
      handlersearchContent : function () {
        if (this.searchContent === '') {
          this.$http(this.$_.merge({}, Action.Product.Info.categoryList))
            .then(response => {
              this.categoryData = response.body
            }, response => {
              this.$message.error('搜索类别数据出错', response.body)
            })
        }else{
          this.$http(this.$_.merge({}, Action.Product.Info.categoryList,{
            //获取待更新数据
            params: {searchContent:this.searchContent}
          }))
            .then(response => {
              this.categoryData = response.body
            }, response => {
              this.$message.error('搜索类别数据出错', response.body)
            })
        }

      },
      //选择类别弹出框表格双击选择
      FG_TABLE_handleRowDoubleClick : function (row) {
        //console.log(row.key)
        this.$emit('categoryCode-select',row)
        this.dialogTableVisible=false
      }
    }
  }
</script>
