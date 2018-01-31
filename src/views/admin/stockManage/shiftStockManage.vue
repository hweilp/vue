<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          调库管理 - 列表
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-row :span="24" class="fg-content-opr">

            <router-link to="/stock/shiftStockManageAdd">
              <el-button><i class="fa fa-plus" style="margin-right: 3px"></i>新增</el-button>
            </router-link>
            <el-button @click="refresh"><i class="fa fa-refresh" style="margin-right: 3px"></i>刷新</el-button>
            <!-- 搜索自动完成  -->
            <el-autocomplete
              v-model="searchConment"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              icon="search"
              :on-icon-click="handleSearch"
              @keyup.enter.native="searchSubmit"
              @select="handleSelect"
              autofocus
            ></el-autocomplete>

            <advQuery left="left:400px" :data="FG_DATA"></advQuery>
          </el-row>
          <!--高级查询-->


          <!--表格展示-->
          <el-table
            v-loading="loadingState"
            ref="multipleTable"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @row-dblclick="handrowdbclick"
          >
            <el-table-column
              type="selection"
              width="90">
         <span style="position: relative;
        top: -6px;">全选</span>
            </el-table-column>

            <el-table-column
              prop="id"
              label="序号"
              sortable>
            </el-table-column>

            <el-table-column
              prop="oddNum"
              label="业务单号"
              width="170">
            </el-table-column>
            <el-table-column
              prop="store_name"
              label="门店名称">
            </el-table-column>
            <el-table-column
              prop="operator_name"
              label="经手人姓名">
            </el-table-column>
            <el-table-column
              prop="money"
              label="单据金额">
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="auditor_name"
              label="制单人姓名">
            </el-table-column>
            <el-table-column
              prop="docMaker_date"
              label="制单日期">
            </el-table-column>
            <el-table-column
              prop="store_name"
              label="审核人员姓名">
            </el-table-column>
            <el-table-column
              prop="auditor_date"
              label="审核日期">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注">
            </el-table-column>

          </el-table>
          <!-- 编辑表格记录 -->
          <el-dialog title="编辑表格记录" :visible.sync="editRow.is_show">
            <el-form ref="editFrom" :model="editRow.data" label-width="110px" :rules="editRow.rules">
              <el-form-item label="序号" prop="id">
                <el-input v-model="editRow.data.id"></el-input>
              </el-form-item>
              <el-form-item label="业务单号" prop="oddNum">
                <el-input v-model="editRow.data.oddNum"></el-input>
              </el-form-item>
              <el-form-item label="门店名称" prop="store_name">
                <el-input v-model="editRow.data.store_name"></el-input>
              </el-form-item>
              <el-form-item label="经手人姓名" prop="operator_name">
                <el-input v-model="editRow.data.operator_name"></el-input>
              </el-form-item>
              <el-form-item label="单据金额" prop="money">
                <el-input v-model="editRow.data.money"></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="state">
                <el-input v-model="editRow.data.state"></el-input>
              </el-form-item>
              <el-form-item label="制单人姓名" prop="docMaker_name">
                <el-input v-model="editRow.data.docMaker_name"></el-input>
              </el-form-item>
              <el-form-item label="制单日期" prop="docMaker_date">
                <el-input v-model="editRow.data.docMaker_date"></el-input>
              </el-form-item>
              <el-form-item label="审核人员姓名" prop="auditor_name">
                <el-input v-model="editRow.data.auditor_name"></el-input>
              </el-form-item>
              <el-form-item label="审核日期" prop="auditor_date">
                <el-input v-model="editRow.data.auditor_date"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="editRow.data.remark"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editRow.is_show = false">取 消</el-button>
              <el-button type="primary" @click="onEditRowSubmit('editFrom')">更新</el-button>
            </div>
          </el-dialog>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>

        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import advQuery from '@/components/compos/query/advQuery.vue'

  export default{
    data (){
      return {
        // 控制高级查询条目显现
        FG_DATA:{
          date: true,
          store : true,
          oddNumber:true,
          supplier:true,
          brokerage:true,
          moneyGroup:true,
          auditState : true
        },
        title: '入库管理—列表',
        is_show: true,
        isActive: true,
        tableData: [
          {
            id: '3',
            oddNum: 'IO-888-170517-0013',
            store_name: '总部',
            operator_name: '曹明奇',
            money: '2500.00',
            state: '已审核',
            docMaker_name: '曹明奇',
            docMaker_date: '2017-02-02',
            auditor_name: '曹明奇',
            auditor_date: '2017-02-02',
            remark: '曹明奇'
          },
          {
            id: '2',
            oddNum: 'IO-888-170517-0012',
            store_name: '总部',
            operator_name: '曹明奇',
            money: '2500.00',
            state: '已审核',
            docMaker_name: '曹明奇',
            docMaker_date: '2017-02-02',
            auditor_name: '曹明奇',
            auditor_date: '2017-02-02',
            remark: '曹明奇'
          },
          {
            id: '1',
            oddNum: 'IO-888-170517-0011',
            store_name: '总部',
            operator_name: '曹明奇',
            money: '2500.00',
            state: '已审核',
            docMaker_name: '曹明奇',
            docMaker_date: '2017-02-02',
            auditor_name: '曹明奇',
            auditor_date: '2017-02-02',
            remark: '曹明奇'
          }
        ],
        editRow: {
          name: 'editInfoForm',
          is_show: false,
          is_remote_data: true, //编辑时是否需要重新获取数据
          data: {
            id: '',
            oddNum: '',
            store_name: '',
            operator_name: '',
            money: '',
            state: '',
            docMaker_name: '',
            docMaker_date: '',
            auditor_name: '',
            auditor_date: '',
            remark: ''
          },
          rules: Rules.enterStockManage
        },
        searchConment: '',
        tips: '',
        multipleSelection: [],
        loadingState: true,
        loadingText: '',
        messageTips: {
          type: '',
          message: ''
        },
      }
    },
    created: function () {
      let that = this
      setTimeout(function () {
        that.initTableData()
      }, 3000)

    },
    methods: {
//      初始化数据
      initTableData: function () {
        this.$http(this.$_.merge({}, Action.enterStockManage.list, {})).then(response => {
          this.loadingState = false
          this.tableData = response.body
          this.messageTips.type = 'success'
          this.messageTips.message = '数据加载成功'
          Helper.COMMON.openMessage(this)
        }, response => {
          this.loadingState = false
          this.messageTips.type = 'error'
          this.messageTips.message = '数据加载失败'
          Helper.COMMON.openMessage(this)
        })
      },
      //当选择项发生变化时会触发该事件
      handleSelectionChange(val) {
        this.multipleSelection = val

      },
// 双击行
      handrowdbclick: function (row) {
        this.$refs.multipleTable.clearSelection()//清除所有的勾选
        this.$refs.multipleTable.toggleRowSelection(row, true)//勾选当前行
        this.editTableRow()
      },
//      双击编辑
      editTableRow: function () {
        this.editRow.data = this.multipleSelection[0]
        this.editRow.is_show = true
        console.log(this.multipleSelection)
      },
//      更新
      onEditRowSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交
            this.tips = '确认修改数据'
            this.$confirm(this.tips)
              .then(_ => {
                this.editRow.is_show = false
                this.loadingState = true
                this.loadingText = '正在修改数据，请稍后'
                console.log(this.multipleSelection)

                console.log(this.editRow.data)
                this.$http(this.$_.merge({}, Action.enterStockManage.update, {
                  url: Helper.FG.setParams(Action.enterStockManage.update.url, {id: this.editRow.data.id}),
                  body: this.editRow.data
                })).then(response => {
                  this.editRow.data = {
                    id: '',
                    oddNum: '',
                    store_name: '',
                    operator_name: '',
                    money: '',
                    state: '',
                    docMaker_name: '',
                    docMaker_date: '',
                    auditor_name: '',
                    auditor_date: '',
                    remark: ''
                  }

                  this.loadingState = false
                  this.initTableData()
                  this.messageTips.type = 'success'
                  this.messageTips.message = '数据修改成功'
                  Helper.COMMON.openMessage(this)
                }, response => {
                  this.loadingState = false
                  this.messageTips.type = 'error'
                  this.messageTips.message = '数据修改失败'
                  Helper.COMMON.openMessage(this)
                })
              })
              .catch(_ => {})

          } else {
            return false
          }
        })
      },
//刷新
      refresh: function () {
        this.initTableData()
      },
//查询
      querySearchAsync(queryString, cb) {

        var results = queryString ? this.tableData.filter(this.createStateFilter(queryString)) : this.tableData

        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          console.log(results)
          cb(results)
        }, 3000 * Math.random())
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.oddNum.match(queryString) !== null)
        }
      },
      handleSelect(item) {
        console.log(item)
      },
      handleSearch: function () {
        if (this.searchConment == '') {
          this.messageTips.type = 'warning'
          this.messageTips.message = '请填写搜索的内容'
          Helper.COMMON.openMessage(this)
        } else {
          console.log(this.searchConment)
        }
      },
//高级查询
      toshow: function () {
        if (this.is_show == false) {
          this.is_show = true
          this.isActive = true
        } else {
          this.is_show = false
          this.isActive = false
        }

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('高级查询!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        console.log(1)
        this.$refs[formName].resetFields()
      },
      //      分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    },
    components: {
     advQuery
    }
  }


</script>
<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/_param.scss";

</style>

