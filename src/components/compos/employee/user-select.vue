<template>
  <div id="employeeSelect">
    <el-select
      v-model="value"
      placeholder=""
      no-match-text="无匹配用户"
      no-data-text="无用户数据"
      filterable
      remote
      :filter-method="handleFilterEmployee"
      style="width: 360px"
      @change="handleSelectedEmployeeChange"
      :disabled="isreadonly"
    >
      <el-option
        v-for="item in employeeOption"
        :key="item.key"
        :label="item.value"
        :value="item.key">
      </el-option>
    </el-select>
    <i class="fa fa-ellipsis-h" @click="handleDialogEmployeeSelect"></i>
    <el-dialog title="选择用户" :visible.sync="dialogTableVisible">
      <el-row>
        <el-input
          placeholder="可输入用户名称/编码"
          icon="search"
          v-model="searchContent"
          :on-icon-click="handlersearchContent">
        </el-input>
      </el-row>
      <el-row>
        <el-table :data="employeeOption" border
                  @row-dblclick="handleRowDoubleClick"
                  :default-sort="{prop: 'index', order: 'descending'}" height="250">
          <el-table-column property="key" label="用户编码"></el-table-column>
          <el-table-column property="value" label="用户名称"></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
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
    data(){
      return {
        value: '',
        isreadonly:false,
        employeeList: [],
        employeeOption: [],

        dialogTableVisible: false,
        searchContent: ''
      }
    },
    created: function () {

      //获取所有用户列表数据
      this.$http(this.$_.merge({}, Action.Stock.EnterStockManage.employeeList))
        .then(response => {
          this.employeeList = response.body
          this.employeeOption = this.employeeList
        }, response => {
          this.$message.error('获取用户数据出错', response.body)
        })

    },
    props: ['employeeSelected','readonly'],
    watch: {
      employeeSelected: function (val) {
        if(typeof(val) == 'number'){
          //console.log(this.employeeList)
          for (let i = 0; i < this.employeeList.length; i++) {
            if(this.employeeList[i].key==val){
              this.value=this.employeeList[i].key
            }
          }
        }else{
          this.value = val
        }

      },
      readonly:function (val) {

        this.isreadonly=val

      }
    },
    methods: {
      //用户搜索过滤
      handleFilterEmployee: function (query) {
        if (!query) {
          this.employeeOption = this.employeeList
        } else {
          this.employeeOption = this.employeeList.filter(item => {
            return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.key.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }
      },
      //select选择发生变化时触发的函数
      handleSelectedEmployeeChange(val){
        this.$emit('update:employeeSelected', val)
      },
      //弹框用户选择
      handleDialogEmployeeSelect(){
        this.dialogTableVisible = true
      },
      //弹出框用户搜索
      handlersearchContent(){
        if (!this.searchContent) {
          this.employeeOption = this.employeeList
        } else {
          this.employeeOption = this.employeeList.filter(item => {
            return item.value.toLowerCase().indexOf(this.searchContent.toLowerCase()) > -1 || item.key.toLowerCase().indexOf(this.searchContent.toLowerCase()) > -1
          })
        }
      },
      //表格单行双击操作
      handleRowDoubleClick(row){
        this.dialogTableVisible = false
        this.$emit('update:employeeSelected', row.key)
      }
    }
  }
</script>
