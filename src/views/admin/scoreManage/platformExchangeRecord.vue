<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="scoreDetail">
        <div class="container">
          <div class="content">

            <el-row :span="24" class="fg-content-title">兑换单记录</el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-opr">
                <el-select v-model="FG_TABLE.pagination.pageFilter.filters.status" placeholder="请选择状态" >
                  <el-option label="全部状态" value=""></el-option>
                  <el-option label="待审核" :value="1"></el-option>
                  <el-option label="已审核" :value="2"></el-option>
                  <el-option label="部分发货" :value="3"></el-option>
                  <el-option label="已发货" :value="4"></el-option>
                  <el-option label="已收货" :value="5"></el-option>
                  <el-option label="交易完成" :value="6"></el-option>
                  <el-option label="交易关闭" :value="7"></el-option>
                </el-select>
                <el-input
                  class="fg-search-input"
                  placeholder="可输入兑换单号/兑换员工姓名进行查询"
                  icon="search"
                  v-model="FG_TABLE.pagination.pageFilter.searchContent"
                  :on-icon-click="FG_TABLE_handleTableSearch"
                  @keyup.enter.native="FG_TABLE_handleTableSearch">
                </el-input>
                <adv-query left="left:510px">
                  <el-form ref="advQueryForm" :model="FG_advQueryForm.filters" label-width="100px" :rules="FG_TABLE.pagination.pageFilter.rules">
                    <el-row>

                      <el-row :span="24">
                        <date-link  :label="FG_advQueryForm.labelTitle" @on-get-date="getDate"></date-link>
                        <el-col :span="12">
                          <el-form-item label="用户姓名 ：" prop="memberName ">
                            <el-input v-model="FG_advQueryForm.filters.memberName "></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="状态 ：" prop="status ">
                            <el-select v-model="FG_advQueryForm.filters.status " placeholder="请选择状态" style="width: 360px">
                              <el-option label="全部状态" value=""></el-option>
                              <el-option label="待审核" :value="1"></el-option>
                              <el-option label="已审核" :value="2"></el-option>
                              <el-option label="部分发货" :value="3"></el-option>
                              <el-option label="已发货" :value="4"></el-option>
                              <el-option label="已收货" :value="5"></el-option>
                              <el-option label="交易完成" :value="6"></el-option>
                              <el-option label="交易关闭" :value="7"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <!--  <el-col :span="12">
                            <el-form-item label="收货地址 ：" prop="mobile">
                              <areaSelect @area="FG_SELECT_getArea"></areaSelect>
                              <el-input v-model="FG_advQueryForm.filters.mobile" placeholder="详细地址" style="margin-top: 20px"></el-input>
                            </el-form-item>
                          </el-col>-->


                        <el-col :span="24">
                          <el-form-item label="">
                            <el-button type="primary" @click="FG_advQuery_submitForm('advQueryForm')">确定</el-button>
                            <el-button @click="FG_advQuery_resetForm('advQueryForm')">重置</el-button>
                          </el-form-item>
                        </el-col>

                      </el-row>
                    </el-row>
                  </el-form>
                </adv-query>
              </el-row>
              <el-table
                ref="FG_TABLE"
                :data="FG_TABLE.data"
                max-height="450"
                border
                tooltip-effect="dark"
                row-key="code"
                style="width: 100%"
                v-loading="FG_TABLE.loading.is_loading"
                :element-loading-text="FG_TABLE.loading.loadText"
                class="fg-content-table"
                :default-sort="{prop: 'index', order: 'descending'}"
              >

                <el-table-column
                  label="序号"
                  type="index"
                  width="70" sortable>
                </el-table-column>

                <el-table-column
                  prop="id"
                  label="兑换单号">
                  <template scope="scope">
                    <p @click="FG_TABLE_handleCellClick(scope.$index, scope.row.id)" :id="scope.row.id"><span>{{ scope.row.id }}</span></p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="memberName"
                  label="兑换员工姓名">
                </el-table-column>
                <el-table-column
                  prop="costIntegral"
                  label="消耗积分">
                </el-table-column>
                <el-table-column
                  prop="createTimeStr"
                  label="兑换单生成日期">
                </el-table-column>
                <el-table-column
                  prop="statusStr"
                  label="状态">
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

              <el-dialog
                title="生成发货单"
                :visible.sync="FG_OrderDetail.createInvoice.dialogVisible"
                size="large" >
                <el-row>
                  <el-form  ref="createInvoiceForm" :model="FG_OrderDetail.createInvoice.data" label-width="120px" :rules="FG_OrderDetail.editDispath.rules">
                    <el-table
                      ref="FG_TABLE"
                      :data="FG_OrderDetail.createInvoice.tabelData"
                      max-height="450"
                      border
                      tooltip-effect="dark"
                      style="width: 100%"
                      v-loading="FG_TABLE.loading.is_loading"
                      :element-loading-text="FG_TABLE.loading.loadText"
                      class="fg-content-table"
                      show-summary
                      :summary-method="FG_dialogTABLE_getSummaries"
                      @selection-change="FG_TABLE_handleSelectionChange"
                      @row-dblclick="FG_TABLE_handleRowDoubleClick"
                      :default-sort="{prop: 'order', order: 'ascending'}"
                    >
                      <el-table-column
                        type="selection"
                        width="90" label=""><span style="position: relative;
              top: -6px;">全选</span>
                      </el-table-column>

                      <el-table-column
                        prop="gName"
                        label="积分商品名称"
                        width="">
                      </el-table-column>
                      <el-table-column
                        prop="gid"
                        label="积分商品编码"
                        width="">
                      </el-table-column>
                      <el-table-column
                        prop="eachPNum"
                        label="每份数量"
                        width="">
                      </el-table-column>
                      <el-table-column
                        prop="giftNum"
                        label="兑换数量"
                        width="">
                      </el-table-column>
                      <el-table-column
                        prop="costIntegral"
                        label="小计积分"
                        width="">
                      </el-table-column>
                      <el-table-column
                        prop="dueAmount"
                        label="库存数量"
                        width="">
                        <template scope="scope">
                          <div v-if="scope.row.quantity < scope.row.dueAmount? true : false"><span>{{ scope.row.dueAmount }}</span>
                          </div>
                          <div v-else-if="scope.row.quantity > scope.row.dueAmount&& scope.row.dueAmount!=0? true : false"
                               style="background: rgba(255, 204, 102, 1);color: #202D3E;">
                            <span>{{ scope.row.dueAmount }}</span></div>
                          <div v-if="scope.row.dueAmount == 0 ? true : false"
                               style="background: rgba(255, 102, 102, 1);color: #202D3E;">
                            <span>{{ scope.row.dueAmount }}</span></div>
                        </template>

                      </el-table-column>
                      <el-table-column
                        prop="isVirtualSaleStr"
                        label="是否虚拟商品"
                        width="160">
                      </el-table-column>
                      <el-table-column
                        prop="statusStr"
                        label="商品状态"
                        width="">
                      </el-table-column>

                    </el-table>
                    <el-col :span="24" style="text-align: left;margin-top: 10px">

                      <el-button type="primary" @click="FG_OrderDetail_createInvoice('createInvoiceForm')">生成</el-button>
                      <el-button @click="FG_OrderDetail.createInvoice.dialogVisible = false">取 消</el-button>

                    </el-col>

                  </el-form>


                </el-row>

              </el-dialog>


            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import advQuery from '@/components/compos/query/advQuery.vue'
  import DateLink from '@/components/compos/dateLink/date-link.vue'
  import areaSelect from '@/components/compos/area/areaSelect'
  export default {

    data (){
      return {
        FG_advQueryForm:{
          labelTitle:"生成日期 ：",
          filters: {
            memberName:'',
            status:"",
            payAmountType:"",
            deliverGoodsType:"",
            type:"",
            payType:"",
            contact:"",
            mobile:"",
            startTime :"",
            endTime :'',
            payStatus:"",
            invoiceStatus:""
          },
        },
        FG_OrderDetail: {
          removeOrderDialogVisible: false,
          removeOrder: {
            reason: ''
          },
          editDispath: {
            dialogVisible: false,
            data: {
              contact: "",
              mobile: "",
              areaCode: "",
              deliveryAddress: "",
              updateTimeStr: "",
              tradeTimeStr: "",
              tradeTime: "",
              remark: "",
              updateTime: "",
              type: ""
            },
            rules: Rules.Order.OrderList.editDispath,
          },
          editBillInfo: {
            dialogVisible: false,
            data: {
              title: "",
              remark: "",
              taxNumber: '',
              type: '',
              content: ''
            },
            rules: Rules.Order.OrderList.editBillInfo,
            editBillInfoOptions: [
              {value: 1, label: "个人"},
              {value: 2, label: "企业"}
            ],
            editBillShopInfoOptions: [
              {value: 1, label: "商品类别"},
              {value: 2, label: "办公用品"},
              {value: 3, label: "配件"},
              {value: 4, label: "耗材"}
            ]

          },
          createInvoice: {
            dialogVisible: false,
            multiSelectData: [],
            tabelData: [],
            data: {},
            tid:''
          },
        },
        FG_TABLE: {
          data: [],
          editRow: {
            name: 'editFrom',
            is_show: false,
            is_remote_data: true, //编辑时是否需要重新获取数据
            data: {
              id: '',
              code: '',
              mid: '',
              name: '',
              parentCode: '',
              statusStr: '',
              status: '',
              mnemonicCode:""
            },
            rules: Rules.Product.Brand.editForm
          },
          addRow: {
            name: 'addForm',
            is_show: false,
            is_remote_data: true,
            menuData: {},
            data: {
              label: '',
              code: "0000",
              name: '',
              parentCode: 0
            },
            rules: Rules.Product.Brand.addForm
          },
          loading: {
            is_loading: false,
            loadText: '',
            lastTime: (new Date()).getTime()
          },
          multiSelectData: [],
          operate: {},
          status: {},
          dialogVisible : false,//确认提示框
          pagination: {
            setting: {
              paginationShow: true,
              currentPage: 1,
              rows: 5,
            },
            pageFilter: {
              searchContent: '',
              filters: {
                status:"",
                payAmountType:"",
                deliverGoodsType:"",
                type:"",
                payType:"",
                memberName :"",
                mobile:"",
                startTime :"",
                endTime :'',
                payStatus:"",
                invoiceStatus:""
              },
              rules:Rules.HighQuery,
              pickerOptionsEnd: {
                disabledDate: (time) => {
                  let beginDateVal = this.FG_TABLE.pagination.pageFilter.filters.beginTradeTime;
                  if (beginDateVal) {
                    return time.getTime() < beginDateVal;
                  }
                }
              },
              tradeStatusOptions:[
                {value: "", label: "全部状态"},
                {value: 1010, label: "建单中"},
                {value: 2120, label: "待付款"},
                {value: 2190, label: "已付款"},
                {value: 2220, label: "待退款"},
                {value: 2290, label: "已退款"},
                {value: 3110, label: "未发货"},
                {value: 3120, label: "待发货"},
                {value: 3150, label: "部分发货"},
                {value: 3190, label: "已发货"},
                {value: 3220, label: "待收货"},
                {value: 3290, label: "已收货"},
                {value: 3320, label: "申请退货"},
                {value: 3350, label: "确认申请"},
                {value: 3351, label: "退回申请"},
                {value: 3390, label: "已退货"},
                {value: 4010, label: "未开发票"},
                {value: 4020, label: "待开发票"},
                {value: 4090, label: "已开发票"},
                {value: 9990, label: "交易完成"},
                {value: 9999, label: "交易关闭"},
              ],
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
        merchantID: 888888,
      }
    },
    created() {
      this.FG_TABLE_initData()
    },
    watch:{
      "FG_TABLE.pagination.pageFilter.filters.status":function (val) {
        this.FG_TABLE.pagination.pageFilter.filters.status = val
        this.FG_TABLE_refreshData()
      },
      'FG_advQueryForm.filters.startTime': function (val) {
        if (val!='') {
          this.FG_advQueryForm.filters.startTime = Helper.FG.formatDate(val)
        }
      },
      'FG_advQueryForm.filters.endTime': function (val) {
        if (val!='') {
          this.FG_advQueryForm.filters.endTime = Helper.FG.formatDate(val)
        }
      },
    },

    methods :{


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
        for (let name in this.FG_TABLE.pagination.pageFilter.filters) {
          if(this.FG_TABLE.pagination.pageFilter.filters[name] !=""){
            params[name] = this.FG_TABLE.pagination.pageFilter.filters[name]
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

        option = option || {}

        let params = this.FG_TABLE_getParams(this.$_.merge({

        }, option))

        this.$http(this.$_.merge({}, Action.Score.platformGiftOrder.list, {
          params
        })).then(response => {
          //表格数据
          let result = response.body

          this.FG_TABLE.data = result.data

          Helper.FG.setValueToObject(this.FG_TABLE.pagination.pageFilter.info, result.pagination)


        }, response => {
          this.$message.error(response.body.resultMessage)
        })
      },


      FG_pagination_reset: function () {
        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
        }
      },

      FG_TABLE_handleSelectionChange: function (val) {
        this.FG_TABLE.multiSelectData = val
      },
      FG_TABLE_handleRowDoubleClick: function (row) {
        this.$refs.FG_TABLE.clearSelection() //清除所有的勾选
        this.$refs.FG_TABLE.toggleRowSelection(row, true) //勾选当前行
        this.FG_handleInvocie()
      },
      //OPR
      // 显示每页的数据条数改变
      FG_TABLE_handleRowSizeChange:function(val) {
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
        for(let i in this.FG_TABLE.pagination.pageFilter.filters){
          this.FG_TABLE.pagination.pageFilter.filters[i]=''
        }
        this.FG_TABLE_refreshData()
      },

      // 高级查询 确定
      FG_advQuery_submitForm:function (formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_TABLE.pagination.pageFilter.searchContent=''
            Helper.FG.setValueToObject( this.FG_TABLE.pagination.pageFilter.filters, this.FG_advQueryForm.filters)
            this.FG_TABLE_refreshData()
          } else {
            return false;
          }
        });
      },
      //高级查询 重置
      FG_advQuery_resetForm:function (formName) {
        this.$refs[formName].resetFields();
        for(let i in this.FG_TABLE.pagination.pageFilter.filters){
          this.FG_TABLE.pagination.pageFilter.filters[i] =""
        }
        this.FG_TABLE_refreshData()
      },
      // 货号单击跳转
      FG_TABLE_handleCellClick(index,row){
        this.$router.push({path:'/score/exchangePlatformDetail',query:{tid:row}})
      },
      FG_TABLE_handleCheck(index,row){
        this.$http(this.$_.merge({}, Action.Score.exchangeRecord.audit, {
          body:{id:row.id}
        })).then(response => {
          this.$message({
            type : 'success',
            message : '审核成功'
          })
          this.FG_TABLE_initData()
        }, response => {

        })
      },
      //生成发货单
      FG_TABLE_handleCreateInvoice(index,row){
        this.FG_OrderDetail.createInvoice.dialogVisible = true

        this.$http(this.$_.merge({}, Action.Score.exchangeRecord.detail, {
          params:{tid:row.id}
        })).then(response => {
          this.FG_OrderDetail.createInvoice.tid=response.body.id
          this.FG_OrderDetail.createInvoice.tabelData=response.body.detailViewList
        }, response => {

        })
      },
      FG_OrderDetail_createInvoice(){
        let params = {
          tid: this.FG_OrderDetail.createInvoice.tid,
          details: JSON.stringify( this.FG_OrderDetail.createInvoice.tabelData)
        }
        this.$http(this.$_.merge({}, Action.Score.scoreGoodsInvoice.add, {
          body:params
        })).then(response => {
          this.$message({
            type: 'success',
            message: '生成发货单成功'
          })
          this.FG_OrderDetail.createInvoice.dialogVisible = false

        }, response => {
          this.$message({
            type: 'warning',
            message: '生成发货单失败'
          })
          this.FG_OrderDetail.createInvoice.dialogVisible = false

        })
      },
      //生成发货单合计
      FG_dialogTABLE_getSummaries(param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
          }
          if (index === 5) {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
              sums[index] += ''
            } else {
              sums[index] = '0'
            }
          }
        })


        return sums
      },
      //查看发货单
      FG_TABLE_handleCheckInvoice(index,row){
        this.$router.push({path:"/score/scoreGoodsInvoiceList",query:{}})

      },

      // 组件传值
      getDate(val){
        this.FG_advQueryForm.filters.startTime  = val.dateStart
        this.FG_advQueryForm.filters.endTime  = val.dateEnd
      },
      FG_SELECT_getArea(area){
        this.FG_OrderDetail.dispatchInfo.address = area
        this.FG_OrderDetail.editDispath.data.areaCode = area
      },


    },
    components: {
      advQuery,
      DateLink,
      areaSelect

    },
    mounted() {
    }

  }

</script>


<style lang="scss" scoped>
  /*.el-select{*/
  /*width: 120px !important;*/
  /*}*/
  /*.el-form-item .el-input{*/
  /*width: 120px !important;*/
  /*}*/
</style>
