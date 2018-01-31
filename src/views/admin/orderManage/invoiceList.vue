<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="shopUnit">
        <div class="container">

          <div class="content">
            <el-row :span="24" class="fg-content-title">
              发货单列表
            </el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-opr">
                <el-select  v-model="FG_TABLE.pagination.pageFilter.filters.tradeStatus"
                            placeholder="发货单状态" style="margin-left: 10px;">
                  <el-option v-for="item in FG_TABLE.pagination.pageFilter.tradeStatusOptions"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>

                <el-button v-if="power.indexOf(13111401) > -1 ? true : false"  :plain="true" style="margin-left: 10px" type="primary" size="" @click="FG_handleInvocie"><i
                  class="fa fa-truck"></i> 发货
                </el-button>
                <!-- 搜索  -->
                <el-input
                  class="fg-search-input"
                  placeholder="输入发货单流水号/订单号/收货人进行查询"
                  icon="search"
                  v-model="FG_TABLE.pagination.pageFilter.searchContent"
                  :on-icon-click="FG_TABLE_handleTableSearch"
                  @keyup.enter.native="FG_TABLE_handleTableSearch">
                </el-input>
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
                @selection-change="FG_TABLE_handleSelectionChange"
                @row-dblclick="FG_TABLE_handleRowDoubleClick"
                class="fg-content-table"
                :default-sort="{prop: 'index', order: 'descending'}"
              >
                <el-table-column
                  type="selection"
                  width="90"><span style="position: relative;
        top: -6px;">全选</span>
                </el-table-column>
                <el-table-column
                  label="序号"
                  type="index"
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="发货单流水号"
                  width="150"
                >
                  <template scope="scope">
                    <p @click="FG_TABLE_handleCellClick(scope.$index, scope.row)" :id="scope.row.id"><span>{{ scope.row.id }}</span>
                    </p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tid"
                  label="订单号"
                  width="150">
                  <template scope="scope">
                    <p @click="FG_TABLE_handleCellhaveTid(scope.$index, scope.row)" :id="scope.row.tid">
                      <span>{{ scope.row.tid }}</span></p>
                  </template>

                </el-table-column>
                <el-table-column
                  prop="tradeTimeStr"
                  label="下单时间"
                  width="180"
                >
                </el-table-column>


                <el-table-column
                  prop="contact"
                  label="收货人"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  label="收货人手机"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="invoiceTimeStr"
                  label="发货时间"
                  width=" ">
                </el-table-column>
                <el-table-column
                  prop="tradeStatusStr"
                  label="发货单状态"
                  width=" ">
                </el-table-column>

                <el-table-column
                  prop="modifyEmpName"
                  label="操作人">
                </el-table-column>


              </el-table>

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

              <el-dialog title="发货信息" :visible.sync="FG_invoiceForm.dialogVisible">
                <el-form ref="invoiceForm" :model="FG_invoiceForm.data" label-width="120px"
                         :rules="FG_invoiceForm.rules">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="发货单流水号 :" prop="id">
                        <el-input v-model="FG_invoiceForm.data.id" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="订单号  :" prop="tid">
                        <el-input v-model="FG_invoiceForm.data.tid" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="收货人 :" prop="contact">
                        <el-input v-model="FG_invoiceForm.data.contact" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="收货人电话 :" prop="mobile">
                        <el-input v-model="FG_invoiceForm.data.mobile" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-form-item label="收货人地址" class="place">
                      <areaSelect ref="area" :province.sync="FG_invoiceForm.data.provinceCode"
                                  :city.sync="FG_invoiceForm.data.cityCode"
                                  :area.sync="FG_invoiceForm.data.areaCode" disabled></areaSelect>
                    </el-form-item>
                    <el-col :span="24">
                      <el-form-item label="收货人详细地址 :" prop="deliveryAddress">
                        <el-input v-model="FG_invoiceForm.data.deliveryAddress" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="物流公司 :" prop="logisticsCompany">
                        <el-input v-model="FG_invoiceForm.data.logisticsCompany"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="物流单号  :" prop="logisticsOrderNo">
                        <el-input v-model="FG_invoiceForm.data.logisticsOrderNo"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="配送费用 :" prop="fee">
                        <el-input v-model.number="FG_invoiceForm.data.fee"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="">
                        <el-button type="primary" @click="FG_invoiceFormSubmit('invoiceForm')">确认发货</el-button>
                        <el-button @click="FG_invoiceForm.dialogVisible =false">取 消</el-button>
                      </el-form-item>
                    </el-col>
                  </el-row>


                </el-form>

              </el-dialog>

            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>


</style>


<script>

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import areaSelect from '@/components/compos/area/areaSelect'

  export default {

    data (){
      return {
        power:this.$store.state.User.power,
        FG_invoiceForm: {
          dialogVisible: false,
          data: {
            id:'',
            tid:'',
            contact:'',
            mobile:'',
            logisticsCompany:'',
            logisticsOrderNo:'',
            remark:'',
            fee:'',
            areaCode:'',
            cityCode:"",
            provinceCode:'',
            deliveryAddress:''
          },
          rules: Rules.Order.Invoice.invoiceInfo
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
              rows: 5,
            },
            pageFilter: {
              searchContent: '',
              filters: {
                status: "",
                tradeStatus: "",
                payAmountType: "",
                deliverGoodsType: "",
                type: "",
                payType: "",
                contact: "",
                mobile: "",
                beginTradeTime: "",
                endTradeTime: ''
              },
              rules: Rules.HighQuery,
              pickerOptionsEnd: {
                disabledDate: (time) => {
                  let beginDateVal = this.FG_TABLE.pagination.pageFilter.filters.beginTradeTime;
                  if (beginDateVal) {
                    return time.getTime() < beginDateVal;
                  }
                }
              },
              tradeStatusOptions: [
                {value: "", label: "全部状态"},
//                  {value: 1010, label: "建单中"},
//                  {value: 2120, label: "待付款"},
//                  {value: 2190, label: "已付款"},
//                  {value: 2220, label: "待退款"},
//                  {value: 2290, label: "已退款"},
//                {value: 3110, label: "未发货"},
                {value: 3120, label: "待发货"},
//                {value: 3150, label: "部分发货"},
                {value: 3190, label: "已发货"},
//                {value: 3220, label: "待收货"},
//                {value: 3290, label: "已收货"},
//                  {value: 3320, label: "申请退货"},
//                  {value: 3350, label: "确认申请"},
//                  {value: 3351, label: "退回申请"},
//                  {value: 3390, label: "已退货"},
//                  {value: 4010, label: "未开发票"},
//                  {value: 4020, label: "待开发票"},
//                  {value: 4090, label: "已开发票"},
//                  {value: 9990, label: "交易完成"},
//                  {value: 9999, label: "交易关闭"},
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
      if (this.$route.query.tid) {
        this.FG_TABLE.pagination.pageFilter.searchContent = this.$route.query.tid
      }
      this.FG_TABLE_initData()
    },
    watch: {
      "FG_TABLE.pagination.pageFilter.filters.tradeStatus": function (val) {
        this.FG_TABLE.pagination.pageFilter.filters.tradeStatus = val
        this.FG_TABLE_refreshData()
      }
    },

    methods: {
      //init
      FG_TABLE_getLock: function () {

        if (this.FG_TABLE.loading.is_loading === false) {
          this.FG_TABLE.loading.is_loading = true;
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
//        for (let i in this.FG_TABLE.pagination.pageFilter.filters) {
//          params[this.FG_TABLE.pagination.pageFilter.filters[i].name] = this.FG_TABLE.pagination.pageFilter.filters[i].value
//        }

        for (let name in this.FG_TABLE.pagination.pageFilter.filters) {
          if (this.FG_TABLE.pagination.pageFilter.filters[name] != "") {
            params[name] = this.FG_TABLE.pagination.pageFilter.filters[name]
          }
        }
        if (params.beginTradeTime) {
          params.beginTradeTime = Helper.FG.formatDate(params.beginTradeTime)
        }
        if (params.endTradeTime) {
          params.endTradeTime = Helper.FG.formatDate(params.endTradeTime)
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
//          parentCode: this.FG_MENU.selected.code,
//          status: 1,
        }, option))
        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }
        if (this.$route.query.tid) {
          params.tid = this.$route.query.tid
        }
        this.$http(this.$_.merge({}, Action.Order.InvoiceList.list, {
          params
        })).then(response => {
          //表格数据
          let result = response.body

          this.FG_TABLE.data = result.data

          Helper.FG.setValueToObject(this.FG_TABLE.pagination.pageFilter.info, result.pagination)

          this.FG_TABLE_releaseLock()
        }, response => {
          this.$message.error(response.body.resultMessage)
          this.FG_TABLE_releaseLock()
        })
      },

      //helper

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
      },

      //opr
      // 显示每页的数据条数改变
      FG_TABLE_handleRowSizeChange: function (val) {
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

      // 发货
      FG_handleInvocie(){

        if (this.FG_TABLE.multiSelectData.length == 1) {
          if (this.FG_TABLE.multiSelectData[0].tradeStatus < 3150) {
            let target = this.FG_TABLE.multiSelectData[0]

            this.$http(this.$_.merge({}, Action.Order.InvoiceList.invoiceViewInfo, {
              params: {id:target.id}
            })).then(response => {
              this.FG_invoiceForm.data = response.body
              Helper.FG.setValueToObject(this.FG_invoiceForm.data, response.body)
            }, response => {
                this.$message.error(response.body.resultMessage)
            })

            this.FG_invoiceForm.dialogVisible = true
          } else {
            this.$message({
              type: 'warning',
              message: "该发货单已发货"
            })
          }

        } else {
          this.$message({
            type: 'warning',
            message: "请选择一项发货单"
          })
        }
      },
      //确认发货
      FG_invoiceFormSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$http(this.$_.merge({}, Action.Order.InvoiceList.doInvoice, {
              body: this.FG_invoiceForm.data
            })).then(response => {
              if (response.body.success === true) {
                this.$message({
                  type: 'success',
                  message: "发货" + response.body.resultMessage
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: response.body.resultMessage
                })
              }
              this.FG_TABLE_refreshData()
              this.FG_TABLE_releaseLock()
            }, response => {
              this.$message.error(response.body.resultMessage)
              this.FG_TABLE_releaseLock()
            })
            this.FG_invoiceForm.dialogVisible = false
          } else {
            return false;
          }

        });
      },
      // 货号点击跳转
      FG_TABLE_handleCellClick(index, row){
        this.$router.push({path: '/orderManage/invoiceDetail', query: {id: row.id}})
      },
      //订单号点击跳转
      FG_TABLE_handleCellhaveTid(index, row){
        this.$router.push({path: '/orderManage/orderDetail', query: {tid: row.tid}})
      },


    },

    mounted() {
    },
    components: {
      areaSelect
    },

  }

</script>
