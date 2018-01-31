<template>
  <div id="employeeSelect">
    <el-select
      v-model="value"
      placeholder=""
      no-match-text="无匹配经手人"
      no-data-text="无经手人数据"
      filterable
      remote
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
    <el-dialog title="选择经手人" :visible.sync="dialogTableVisible">
      <el-row>
        <el-input
          placeholder="可输入经手人名称/编码"
          icon="search"
          v-model="searchContent"
          :on-icon-click="handlersearchContent"
          @keyup.enter.native="handlersearchContent">
        </el-input>
      </el-row>
      <el-row>
        <el-table :data="employeeOption" border
                  @row-dblclick="handleRowDoubleClick"
                  :default-sort="{prop: 'index', order: 'descending'}" height="250">
          <el-table-column property="key" label="经手人编码"></el-table-column>
          <el-table-column property="value" label="经手人名称"></el-table-column>
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

      //获取所有经手人列表数据
      this.$http(this.$_.merge({}, Action.Stock.EnterStockManage.employeeList))
        .then(response => {
          this.employeeOption=this.employeeList = response.body
        }, response => {
          this.$message.error('获取经手人数据出错', response.body)
        })

    },
    props: ['employeeSelected','readonly'],
    watch: {
      employeeSelected: function (val) {
        if(val){
          this.value = val.toString()
        }else{
          this.value = val
        }
      },
      readonly:function (val) {

        this.isreadonly=val

      }
    },
    methods: {
      //经手人搜索过滤
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
      //弹框经手人选择
      handleDialogEmployeeSelect(){
        this.dialogTableVisible = true
      },
      //弹出框经手人搜索
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
