<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="shopUnit">
        <div class="container">


          <div class="content">
            <el-row :span="24" class="fg-content-title">
              积分商品发货单详情
            </el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row class="baseDetail">

                <el-row :span="24" class="fg-content-title">
                  基本信息
                </el-row>
                <el-row :span="24" class="fg-content-opr">
                  <el-button :plain="true" type="primary" size="" @click="FG_handleBack"><i
                    class="fa  fa-mail-reply-all"></i> 返回
                  </el-button>
                </el-row>
                <el-row :span="24" class="fg-content-detail">
                  <el-form ref="advQueryForm" :model="FG_InvoiveDetail.baseInfo" label-width="100px">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="发货单号 ：" prop="">
                          <el-input v-model="FG_InvoiveDetail.baseInfo.id" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="下单用户 ：" prop="">
                          <el-input v-model="FG_InvoiveDetail.baseInfo.contact" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="订单单号 ：" prop="">
                          <el-input v-model="FG_InvoiveDetail.baseInfo.tid" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="用户手机 ：" prop="">
                          <el-input v-model="FG_InvoiveDetail.baseInfo.mobile" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="兑换单类型 ：" prop="">
                          <el-input v-model="FG_InvoiveDetail.baseInfo.tradeTypeStr" disabled ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="下单时间 ：" prop="">
                          <el-input v-model="FG_InvoiveDetail.baseInfo.tradeTimeStr" disabled></el-input>
                        </el-form-item>
                      </el-col>

                      <!--<el-col :span="12">-->
                      <!--<el-form-item label="交易状态 ：" prop="">-->
                      <!--<el-input v-model="FG_InvoiveDetail.baseInfo.statusStr"></el-input>-->
                      <!--</el-form-item>-->
                      <!--</el-col>-->
                      <el-col :span="12">
                        <el-form-item label="兑换单状态 ：" prop="">
                          <el-input v-model="FG_InvoiveDetail.baseInfo.statusStr" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <!-- <el-col :span="12">
                         <el-form-item label="付款状态 ：" prop="">
                           <el-input v-model="FG_InvoiveDetail.baseInfo.statusStr" readonly class="readOnly"></el-input>
                         </el-form-item>
                       </el-col>-->

                      <!--<el-col :span="12">-->
                      <!--<el-form-item label="支付方式 ：" prop="">-->
                      <!--<el-input v-model="FG_InvoiveDetail.baseInfo.tradeTypeStr"></el-input>-->
                      <!--</el-form-item>-->
                      <!--</el-col>-->

                      <!--<el-col :span="12">-->
                      <!--<el-form-item label="配送方式 ：" prop="">-->
                      <!--<el-input v-model="FG_InvoiveDetail.baseInfo.type"></el-input>-->
                      <!--</el-form-item>-->
                      <!--</el-col>-->
                      <!--<el-col :span="12">-->
                      <!--<el-form-item label="付款时间 ：" prop="">-->
                      <!--<el-input v-model="FG_InvoiveDetail.baseInfo.payTime"></el-input>-->
                      <!--</el-form-item>-->
                      <!--</el-col>-->
                    </el-row>
                  </el-form>
                </el-row>


              </el-row>
              <el-row class="dispatchInfo">

                <el-row :span="24" class="fg-content-title">
                  配送信息
                </el-row>

                <el-row :span="24" class="fg-content-detail">
                  <el-form ref="dispatchInfoForm" :model="FG_InvoiveDetail.dispatchInfo" :rules="FG_InvoiveDetail.rules" label-width="120px">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="收货人 ：" prop="contact">
                          <el-input v-model="FG_InvoiveDetail.dispatchInfo.contact" :disabled="FG_InvoiveDetail.baseInfo.invoiceStatus==3190"></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="收货人电话 ：" prop="mobile">
                          <el-input v-model="FG_InvoiveDetail.dispatchInfo.mobile" :disabled="FG_InvoiveDetail.baseInfo.invoiceStatus==3190"></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="收货地址 ：" prop="">
                          <area-select ref="area" :province.sync="FG_InvoiveDetail.dispatchInfo.provinceCode"
                                       :city.sync="FG_InvoiveDetail.dispatchInfo.cityCode"
                                       :area.sync="FG_InvoiveDetail.dispatchInfo.areaCode" :disabled="FG_InvoiveDetail.baseInfo.invoiceStatus==3190"></area-select>

                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="物流公司 ：" prop="logisticsCompany">
                          <el-input v-model="FG_InvoiveDetail.dispatchInfo.logisticsCompany" :disabled="FG_InvoiveDetail.baseInfo.invoiceStatus==3190"></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="详细地址 ：" prop="">
                          <el-input v-model="FG_InvoiveDetail.dispatchInfo.deliveryAddress"
                                    placeholder="详细地址信息" :disabled="FG_InvoiveDetail.baseInfo.invoiceStatus==3190"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="物流单号 ：" prop="logisticsOrderNo">
                          <el-input v-model="FG_InvoiveDetail.dispatchInfo.logisticsOrderNo" :disabled="FG_InvoiveDetail.baseInfo.invoiceStatus==3190"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="配送费用 ：" prop="fee">
                          <el-input v-model="FG_InvoiveDetail.dispatchInfo.fee" :disabled="FG_InvoiveDetail.baseInfo.invoiceStatus==3190"></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="收货备注 ：" prop="id">
                          <el-input v-model="FG_InvoiveDetail.dispatchInfo.remark" :disabled="FG_InvoiveDetail.baseInfo.invoiceStatus==3190"></el-input>
                        </el-form-item>
                      </el-col>


                    </el-row>
                    <el-row :span="24" class="fg-content-opr" v-if="FG_InvoiveDetail.baseInfo.invoiceStatus!=3190">
                      <el-button :plain="true" type="primary" size="" @click="FG_handleEditDispatchInfo('dispatchInfoForm')"><i
                        class="fa fa-edit"></i> 修改
                      </el-button>
                    </el-row>
                  </el-form>
                </el-row>


              </el-row>


              <el-row class="shopInfo">

                <el-row :span="24" class="fg-content-title">
                  商品信息
                </el-row>

                <el-row :span="24" class="fg-content-detail">
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
                    :default-sort="{prop: 'order', order: 'ascending'}"
                  >
                    <el-table-column
                      prop=""
                      type="index"
                      label="序号"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="gName"
                      label="积分商品名称"
                      width="170">
                    </el-table-column>
                    <el-table-column
                      prop="gid"
                      label="积分商品编码"
                      width="300">
                    </el-table-column>
                    <el-table-column
                      prop="giftNum"
                      label="发货数量"
                      width="170">
                    </el-table-column>

                    <el-table-column
                      prop=""
                      label="发货时间"
                      width="160">
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
                </el-row>


              </el-row>


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
  import areaSelect from '@/components/compos/area/areaSelect'
  export default {

    data(){
      return {
        id: '',
        allData: {},
        FG_InvoiveDetail: {

          baseInfo: {
            id: '',
            buyerTypeStr: '',
            tradeTypeStr: '',
            payTime: '',
            type: '',
            tradeTime: '',
            status: '',
            mobile: '',
            bid: '',
            statusStr: '',
            supplierTypeStr: '',
            tradeStatus: '',
            tradeStatusStr: '',
            addTimeStr: '',
            tid: '',
            contact: '',
            tradeTimeStr: '',
            invoiceStatusStr:'',
            invoiceStatus:''
          },
          dispatchInfo: {
            id: '',
            tid: '',
            contact: '',
            mobile: '',
            provinceCode: '',
            cityCode: '',
            areaCode: '',
            deliveryAddress: '',
            updateTimeStr: '',
            tradeTimeStr: '',
            remark: '',
            status: '',
            fee: '',
            logisticsCompany: '',
            logisticsOrderNo: ''
          },
          rules:Rules.Order.Invoice.editDispath

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
                status: '',
                payAmountType: '',
                deliverGoodsType: '',
                type: '',
                payType: '',
                contact: '',
                mobile: '',
                beginTradeTime: '',
                endTradeTime: ''
              },
              rules: Rules.HighQuery,
              tradeStatusOptions: [
                {value: 1032, label: '-'},
                {value: 1010, label: '建单中'},
                {value: 2120, label: '待付款'},
                {value: 2190, label: '已付款'},
                {value: 2220, label: '待退款'},
                {value: 2290, label: '已退款'},
                {value: 3110, label: '未发货'},
                {value: 3120, label: '待发货'},
                {value: 3150, label: '部分发货'},
                {value: 3190, label: '已发货'},
                {value: 3220, label: '待收货'},
                {value: 3290, label: '已收货'},
                {value: 3320, label: '申请退货'},
                {value: 3350, label: '确认申请'},
                {value: 3351, label: '退回申请'},
                {value: 3390, label: '已退货'},
                {value: 4010, label: '未开发票'},
                {value: 4020, label: '待开发票'},
                {value: 4090, label: '已开发票'},
                {value: 9990, label: '交易完成'},
                {value: 9999, label: '交易关闭'},
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
      }

    },
    created (){
      this.id = this.$route.query.id
      this.FG_TABLE_initData()

    },
    methods: {
      //init
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

        for (let name in this.FG_TABLE.pagination.pageFilter.filters) {
          if (this.FG_TABLE.pagination.pageFilter.filters[name] != '') {
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

      FG_TABLE_refreshData: function () {

        let params = {
          id: this.$route.query.id
        }

        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }
        this.$http(this.$_.merge({}, Action.Score.scoreGoodsInvoice.detail, {
          params
        })).then(response => {
          Helper.FG.setValueToObject(this.FG_InvoiveDetail.dispatchInfo, response.body )
          Helper.FG.setValueToObject(this.FG_InvoiveDetail.baseInfo, response.body)

          this.FG_TABLE.data = response.body.detailViewList
          this.allData = response.body
          this.FG_TABLE_releaseLock()
        }, response => {
          this.$message.error(response.body.resultMessage);
          this.FG_TABLE_releaseLock()
        })
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
      // 返回
      FG_handleBack(){
        this.$router.back(-1)
      },


      // 编辑配送信息
      FG_handleEditDispatchInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              id: '',
              tid:"",
              contact: '',
              mobile: '',
              areaCode: '',
              deliveryAddress: '',
              logisticsCompany: '',
              logisticsOrderNo: '',
              fee: '',
              remark: '',
            }
            Helper.FG.setValueToObject(params, this.FG_InvoiveDetail.dispatchInfo)

            this.$http(this.$_.merge({}, Action.Score.scoreGoodsInvoice.shippingAddressEdit, {
              params
            })).then(response => {
              if (response.body.success == true) {
                this.$message({
                  type: 'success',
                  message: '发货单配送信息修改成功' + response.body.resultMessage
                })
              }
              this.FG_TABLE_refreshData()
            }, response => {
              this.$message({
                type: 'error',
                message: response.body.resultMessage
              })
            })
          } else {
            return false
          }
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
      // 双击行
      FG_TABLE_handleRowDoubleClick: function (row) {
        this.$refs.FG_TABLE.clearSelection() //清除所有的勾选
        this.$refs.FG_TABLE.toggleRowSelection(row, true) //勾选当前行
      },
      //合计
      FG_TABLE_getSummaries(param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计'
            return
          }
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => parseFloat(value))) {
            sums[5] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[8] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)

            sums[5] += ' 元'
            sums[8] += ' 元'
          } else {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, '')
            sums[index] = ''
          }
        })

        return sums
      },
      //组件传值
      FG_SELECT_getArea(area){
        this.FG_InvoiveDetail.dispatchInfo.address = area
      },

    },
    components: {
      areaSelect,

    }

  }
</script>


<style lang="scss" scoped="">

  .el-dialog--small {
    padding-right: 30px;
  }

  .baseDetail, .dispatchInfo, .billInfo, .shopInfo, .costInfo {
    margin-bottom: 20px;
    background: white;

  .fg-content-detail {
    background: white;
  }

  }

  .fg-content-opr {
    margin-left: 24px;
  }
</style>
