<template>
  <div>
    <div id="main" class="fg-table-type" role="main">


      <div class="container">
        <div class="content">
          <el-row :span="24" class="fg-content-title">
            出库管理 - 列表
          </el-row>
          <el-row :span="24" class="fg-content-detail">
            <el-row :span="24" class="fg-content-opr">
              <router-link v-if="power.indexOf(16111201) > -1 ? true : false"  to="/stock/outStockAdd" style="margin-right: 10px">
                <el-button :plain="true" type="primary" size=""><i
                  class="fa fa-plus"></i> 新增
                </el-button>
              </router-link>
              <el-button v-if="power.indexOf(16111202) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_TABLE_handleAudit"><i
                class="fa fa-edit"></i> 审核
              </el-button>
              <el-button :plain="true" type="danger" size="" @click="FG_TABLE_showRefeshTable"><i
                class="fa fa fa-refresh"></i> 刷新
              </el-button>
              <el-input
                class="fg-search-input"
                placeholder="可输入订单号/经手人姓名进行查询"
                icon="search"
                v-model="FG_TABLE.pagination.pageFilter.searchContent"
                :on-icon-click="FG_TABLE_handleTableSearch"
                @keyup.enter.native="FG_TABLE_handleTableSearch">
              </el-input>
              <advQuery left="left:655px">
                <el-form ref="advQueryForm" :model="FG_advQueryForm" label-width="90px" :inline="true">
                  <el-row :span="24">
                    <date-link @on-get-date="getDate" label="日期："></date-link>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="经手人：" prop="handleEmpNo">
                      <employee-select :employeeSelected.sync="FG_advQueryForm.handleEmpNo"></employee-select>
                    </el-form-item>
                    <el-form-item label="单号：" prop="id">
                      <el-input v-model="FG_advQueryForm.id"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="金额：">
                      <el-form-item  prop="initialMoney">
                        <el-input v-model="FG_advQueryForm.initialMoney" style="width: 166px"></el-input>
                      </el-form-item>
                      <i class="fa fa-minus moneyIcon" style="margin-right: 10px"></i>
                      <el-form-item  prop="finalMoney">
                        <el-input v-model="FG_advQueryForm.finalMoney" style="width: 166px"></el-input>
                      </el-form-item>
                    </el-form-item>
                    <el-form-item label="状态：" prop="status">
                      <el-radio-group v-model="FG_advQueryForm.status">
                        <el-radio :label="1">未审核</el-radio>
                        <el-radio :label="2">已审核</el-radio>
                        <el-radio :label="3">已删除</el-radio>
                        <el-radio>全部</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24" style="padding-left: 90px">
                    <el-form-item>
                      <el-button type="primary" @click="FG_handleAdvQueryForm()">确定</el-button>
                      <el-button @click="FG_resetAdvQueryForm('advQueryForm')">重置</el-button>
                    </el-form-item>
                  </el-row>

                </el-form>
              </advQuery>
            </el-row>

            <el-table
              ref="FG_TABLE"
              :data="FG_TABLE.data"
              max-height="450"
              border
              tooltip-effect="dark"
              style="width: 100%"
              v-loading="FG_TABLE.loading.is_loading"
              :element-loading-text="FG_TABLE.loading.loadText"
              class="fg-content-table"
              @selection-change="FG_TABLE_handleSelectionChange"
              @row-dblclick="FG_TABLE_handleRowDoubleClick"
              :default-sort="{prop: 'index', order: 'descending'}"
            >
              <el-table-column
                type="selection"
                width="90"><span style="position: relative;
        top: -6px;">全选</span>
              </el-table-column>
              <el-table-column
                prop="id"
                label="序号"
                type="index"
                sortable
                width="70">
              </el-table-column>
              <el-table-column
                prop="id"
                label="订单号"
                sortable>
                <template scope="scope">
                  <p @click="handleEdit(scope.row.id)"><span>{{scope.row.id}}</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="handleEmpName"
                label="经手人姓名">
              </el-table-column>
              <el-table-column
                prop="totalPrice"
                label="单据金额">
              </el-table-column>
              <el-table-column
                prop="statusStr"
                label="状态">
              </el-table-column>
              <el-table-column
                prop="createEmpName"
                label="制单人姓名">
              </el-table-column>
              <el-table-column
                prop="createTimeStr"
                label="制单日期">
              </el-table-column>
              <el-table-column
                prop="auditEmpName"
                label="审核人员姓名">
              </el-table-column>
              <el-table-column
                prop="auditTimeStr"
                label="审核日期">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注">
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
              ref="FG_pagination"
              v-if="FG_TABLE.pagination.setting.paginationShow"
              @size-change="FG_TABLE_handleRowSizeChange"
              @current-change="FG_TABLE_handleCurrentPageChange"
              :current-page.sync="FG_TABLE.pagination.setting.currentPage"
              :page-size.sync="FG_TABLE.pagination.setting.rows"

              :page-sizes="[5, 10, 20, 40]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="FG_TABLE.pagination.pageFilter.info.total"
            >
            </el-pagination>
          </el-row>




          <!-- 确认提示框 -->
          <el-dialog
            title="提示"
            :visible.sync="FG_TABLE.dialogVisible"
            size="tiny">
            <span>确认删除数据</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="FG_TABLE.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="FG_TABLE.dialogVisible = false">确 定</el-button>
              </span>
          </el-dialog>
          <!-- 确认提示框 -->
        </div>
      </div>

    </div>

  </div>
</template>


<style lang="scss">

  @import "../../../assets/admin/css/main/param";

  .fg-table-type {
  @include table-container(240px, 10px)
  }

  .leftMenu {
    background: white;

  .el-tree {
    padding: 3px 10px 3px;
    border: 0;
    height: 585px;
  }

  }

</style>

<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import advQuery from '@/components/compos/query/advQuery'
  import DateLink from '@/components/compos/dateLink/date-link.vue'
  import supplierSelect from '@/components/compos/supplier/supplier-select'
  import employeeSelect from '@/components/compos/employee/employee-select'

  export default {
    data () {
      return {
        power:this.$store.state.User.power,
        FG_advQueryForm:{
          startTime : '',
          endTime : '',
          handleEmpNo : '',
          id : '',
          initialMoney : '',
          finalMoney:'',
          status:'',
        },
        FG_TABLE: {
          data: [],
          loading: {
            is_loading: false,
            loadText: '',
            lastTime: (new Date()).getTime()
          },
          multiSelectData: [],
          operate: {},
          status: {},
          dialogVisible: false,//确认提示框
          pagination: {
            setting: {
              paginationShow: true,
              currentPage: 1,
              rows: 10,
            },
            pageFilter: {
              searchContent: '',
              filters: {

              },
              orders: [],
              info: {
                currentPage: 1,
                endIndex: 0,
                hasNext: false,
                hasPreview: false,
                pages: 0,
                rows: 5,
                startIndex: 0,
                total: 0
              }
            }
          }
        },



      }
    },
    created: function () {
      this.FG_TABLE_initData()
    },
    watch: {

    },
    methods: {

      FG_TABLE_getLock: function () {

        if (this.FG_TABLE.loading.is_loading === false) {
          this.FG_TABLE.loading.is_loading = true
          return true
        } else {
          return false
        }
      },

      FG_TABLE_releaseLock: function () {
        this.FG_TABLE.loading.is_loading = false
      },

      FG_TABLE_getParams: function (options) {
        options = options || {}
        let params = options

        //设置页码
        if (options.page === 'init') {
          params.page = 1
        } else if (options.page === 'current') {
          params.page = this.FG_TABLE.pagination.pageFilter.info.currentPage
        } else {
          params.page = options.page || 1
        }

        //获取搜索字段
        if (this.FG_TABLE.pagination.pageFilter.searchContent) {
          params.searchContent = this.FG_TABLE.pagination.pageFilter.searchContent
        }

        //获取过滤字段

        for (let i in this.FG_TABLE.pagination.pageFilter.filters) {
          if(this.FG_TABLE.pagination.pageFilter.filters[i]!==''){
            params[i] = this.FG_TABLE.pagination.pageFilter.filters[i]
          }

        }



        //将自定义字段加入
        for (let name in options) {
          params[name] = options[name]
        }

        params.rows = this.FG_TABLE.pagination.setting.rows

        return params
      },

      FG_TABLE_initData: function () {
        this.FG_TABLE_refreshData()
      },

      FG_TABLE_refreshData: function (option) {

        this.FG_TABLE.pagination.pageFilter.filters =this.FG_advQueryForm
        option = option || {}

        var params = this.FG_TABLE_getParams(this.$_.merge({
          type:2,
          bizType:40
        }, option))

        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }
        this.$http(this.$_.merge({}, Action.Stock.OuterStockManage.list, {
          params
        })).then(response => {
          //表格数据

          let result = response.body

          this.FG_TABLE.data = result.data

          Helper.FG.setValueToObject(this.FG_TABLE.pagination.pageFilter.info, result.pagination)

          this.FG_TABLE_releaseLock()
        }, response => {
          this.FG_TABLE_releaseLock()
        })
      },

      // 编辑
      FG_TABLE_showEditRowForm: function () {

        if (this.FG_TABLE.multiSelectData.length === 1) {
          let id = this.FG_TABLE.multiSelectData[0].id

          this.$router.push({path:'/stock/outStockEdit',query:{tid:id}})

        } else {
          this.$message({
            type: 'warning',
            message: '请选择一项数据'
          })
        }
      },

      // 双击行
      FG_TABLE_handleRowDoubleClick: function (row) {
        this.$refs.FG_TABLE.clearSelection() //清除所有的勾选
        this.$refs.FG_TABLE.toggleRowSelection(row, true) //勾选当前行
        this.FG_TABLE_showEditRowForm()
      },

      // 显示每页的数据条数改变
      FG_TABLE_handleRowSizeChange(val) {
        this.FG_TABLE.pagination.setting.rows = val
        this.FG_pagination_reset()

      },

      // 页码发生改变
      FG_TABLE_handleCurrentPageChange: function (val) {
        this.FG_TABLE_refreshData({
          page: val
        })
      },

      // 搜索icon点击事件
      FG_TABLE_handleTableSearch: function () {
        this.FG_TABLE_refreshData()
      },

      //高级查询
      //高级查询获取日期
      getDate(val){
        this.FG_advQueryForm.startTime = val.dateStart
        this.FG_advQueryForm.endTime = val.dateEnd
      },
      FG_handleAdvQueryForm:function () {
        this.FG_TABLE.pagination.pageFilter.searchContent=''
        this.FG_TABLE.pagination.pageFilter.filters =this.FG_advQueryForm
        this.FG_TABLE_refreshData()
      },
      FG_resetAdvQueryForm : function (formName) {
        /* this.FG_advQueryForm.startTime='',
         this.FG_advQueryForm.endTime='',*/
        this.FG_TABLE.pagination.pageFilter.searchContent=''
        this.$refs[formName].resetFields();
        this.FG_TABLE_refreshData()
      },
      FG_TABLE_handleSelectionChange: function (val) {
        this.FG_TABLE.multiSelectData = val
      },

      FG_pagination_reset: function () {
        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
        }
      },
      //编辑
      handleEdit(val){
        this.$router.push({path:'/stock/outStockEdit',query:{tid :val}})
      },
      //审核
      FG_TABLE_handleAudit(){
        if (this.FG_TABLE.multiSelectData.length === 1) {

          if(this.FG_TABLE.multiSelectData[0].status==1){
            this.$confirm('确定审核？')
              .then(_ => {
                this.$http(this.$_.merge({}, Action.Stock.OuterStockManage.audit, {
                  //获取待更新数据
                  body:{id:this.FG_TABLE.multiSelectData[0].id,type :2}
                })).then(response => {


                  this.$message({
                    type: 'success',
                    message: '审核成功'
                  })
                  this.FG_TABLE_refreshData()

                  //this.FG_TABLE.multiSelectData[0].status==2
                }, response => {
                  this.$message.error(response.body.resultMessage, response.body)
                })
              })
              .catch(_ => {

              });


          }else{
            this.$message({
              type: 'warning',
              message: '请选择未审核订单'
            })
          }

        } else {
          this.$message({
            type: 'warning',
            message: '请选择一项订单'
          })
        }

      },
      //刷新
      FG_pagination_reset: function () {
        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
        }
      },
      FG_TABLE_showRefeshTable : function () {
        this.FG_pagination_reset()
      }

    },
    mounted() {

    },
    components: {
      advQuery,supplierSelect,DateLink,employeeSelect
    },

  }
</script>
