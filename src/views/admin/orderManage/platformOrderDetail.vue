<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="orderDetail">
        <div class="container">


          <div class="content">
            <el-row :span="24" class="fg-content-title">
              平台订单详情
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
                  <el-form ref="advQueryForm" :model="FG_OrderDetail.baseInfo.data" label-width="100px">
                    <el-row>
                      <el-col :span="11">
                        <el-form-item label="订单单号 ：" prop="">
                          <el-input v-model="tid" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="下单员工 ：" prop="">
                          <el-input v-model="FG_OrderDetail.baseInfo.data.bName" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="订单类型 ：" prop="">
                          <el-input v-model="FG_OrderDetail.baseInfo.data.tradeTypeStr" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <!--<el-col :span="11">-->
                        <!--<el-form-item label="经销商手机 ：" prop="">-->
                          <!--<el-input v-model="FG_OrderDetail.baseInfo.data.bMobile" disabled></el-input>-->
                        <!--</el-form-item>-->
                      <!--</el-col>-->

                      <!--<el-col :span="11">-->
                      <!--<el-form-item label="订单状态 ：" prop="">-->
                      <!--<el-input v-model="FG_OrderDetail.baseInfo.data.statusStr"></el-input>-->
                      <!--</el-form-item>-->
                      <!--</el-col>-->
                      <el-col :span="11">
                        <el-form-item label="交易状态 ：" prop="">
                          <el-input v-model="FG_OrderDetail.baseInfo.data.statusStr" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="下单时间 ：" prop="">
                          <el-input v-model="FG_OrderDetail.baseInfo.data.tradeTime" disabled></el-input>
                        </el-form-item>
                      </el-col>

                      <!--<el-col :span="11">-->
                      <!--<el-form-item label="付款状态 ：" prop="">-->
                      <!--<el-input v-model="FG_OrderDetail.baseInfo.data.tid"></el-input>-->
                      <!--</el-form-item>-->
                      <!--</el-col>-->
                      <el-col :span="11">
                        <el-form-item label="配送方式 ：" prop="">
                          <el-input v-model="FG_OrderDetail.baseInfo.data.deliveryTypeStr" disabled></el-input>
                        </el-form-item>
                      </el-col>

                    </el-row>
                  </el-form>
                </el-row>


              </el-row>
              <el-row class="dispatchInfo">

                <el-row :span="24" class="fg-content-title">
                  配送信息
                </el-row>

                <el-row :span="24" class="fg-content-detail">
                  <el-form ref="dispatchInfoForm" :model="FG_OrderDetail.dispatchInfo.data" label-width="120px"
                           :rules="FG_OrderDetail.dispatchInfo.rules">

                    <el-row>
                      <el-col :span="11">
                        <el-form-item label="收货人 ：" prop="">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.data.contact"
                                    disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="发货状态 ：">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.data.invoiceStatusStr" placeholder=""
                                    disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="收货人电话 ：" prop="">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.data.mobile"
                                    disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="发货时间 ：">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.data.invoiceTimeStr"
                                    disabled></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="11">
                        <el-form-item label="收货地址 ：" prop="">
                          <area-select ref="area" :province.sync="FG_OrderDetail.dispatchInfo.data.provinceCode"
                                       :city.sync="FG_OrderDetail.dispatchInfo.data.cityCode"
                                       :area.sync="FG_OrderDetail.dispatchInfo.data.areaCode"
                                       disabled></area-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="收货时间 ：">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.data.receiveTimeStr"
                                    disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="详细地址 ：" prop="">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.data.deliveryAddress"
                                    disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="收货备注 ：">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.data.remark"
                                    disabled></el-input>
                        </el-form-item>
                      </el-col>


                    </el-row>

                  </el-form>
                </el-row>


              </el-row>

              <el-row class="billInfo">

                <el-row :span="24" class="fg-content-title">
                  发票信息
                </el-row>


                <el-row :span="24" class="fg-content-detail">

                  <el-form ref="billInfoForm" :model="FG_OrderDetail.billInfo.data" label-width="130px"
                           :rules="FG_OrderDetail.billInfo.rules">
                    <el-row>
                      <el-col :span="11">
                        <el-form-item label="发票类型 ：" prop="">
                          <el-select v-model="FG_OrderDetail.billInfo.data.type" style="width: 360px" disabled>
                            <el-option v-for="item in FG_OrderDetail.billInfo.addBillInfoOptions"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="发票商品类型 ：" prop="">
                          <el-select v-model="FG_OrderDetail.billInfo.data.content" style="width: 360px" disabled>
                            <el-option v-for="item in FG_OrderDetail.billInfo.addBillShopInfoOptions"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="发票抬头 ：" prop="">
                          <el-input v-model="FG_OrderDetail.billInfo.data.title" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="发票税号 ：" prop="">
                          <el-input v-model.number="FG_OrderDetail.billInfo.data.taxNumber" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="11">
                        <el-form-item label="发票备注 ：" prop="">
                          <el-input v-model="FG_OrderDetail.billInfo.data.remark" disabled></el-input>
                        </el-form-item>
                      </el-col>




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
                    show-summary
                    :summary-method="FG_TABLE_getSummaries"
                    :default-sort="{prop: 'order', order: 'ascending'}"
                  >
                    <el-table-column
                      prop=""
                      type="index"
                      label="序号"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="pName"
                      label="商品名称"
                      width="">
                    </el-table-column>
                    <el-table-column
                      prop="pno"
                      label="商品编码"
                      width="">
                    </el-table-column>

                    <el-table-column
                      prop="price"
                      label="单价 （元）"
                      width="">
                    </el-table-column>
                    <el-table-column
                      prop="quantity"
                      label="数量"
                      width="">
                    </el-table-column>
                    <el-table-column
                      prop="dueAmount"
                      label="小计金额 （元）"
                      width="">
                    </el-table-column>
                    <el-table-column
                      prop="couponAmount"
                      label="优惠信息 （元）"
                      width="">
                    </el-table-column>
                    <el-table-column
                      prop="payAmount"
                      label="实际支付 （元）"
                      width="">
                    </el-table-column>
                    <el-table-column
                      prop="statusStr"
                      label="商品状态"
                      width="">
                    </el-table-column>

                  </el-table>

                </el-row>


              </el-row>



            </el-row>
            <!--取消订单弹框-->
            <el-dialog
              title="取消订单"
              :visible.sync="FG_OrderDetail.removeOrderDialogVisible"
            >
              <div class=""
                   style="line-height: 30px;font-size: 14px;color: #434343;position: relative;left: 120px;padding-bottom: 20px">
                <span class="el-icon-information"
                      style="color: #f7ba2a;display: inline-block;width: 36px;height: 37px;font-size: 30px"></span>
                <span style="position: relative;top: -5px;font-weight: 700;">确认取消订单？请填写取消原因。</span>
              </div>
              <el-form :model="FG_OrderDetail.removeOrder" ref="removeOrderForm">
                <el-form-item label="取消订单原因 ：" label-width="130px" prop="reason">
                  <el-input v-model="FG_OrderDetail.removeOrder.reason"></el-input>
                </el-form-item>

              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="FG_OrderDetail.removeOrderDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="FG_OrderDetail_removeOrderSubmit('removeOrderForm')">确 定</el-button>
              </span>
            </el-dialog>
            <!--生成发货单弹框-->
            <el-dialog
              title="生成发货单"
              :visible.sync="FG_OrderDetail.createInvoice.dialogVisible"
              size="large">
              <el-row>

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
                  empty-text="暂无可发货商品"
                >
                  <el-table-column
                    type="selection"
                    width="90" label=""><span style="position: relative;
              top: -6px;">全选</span>
                  </el-table-column>

                  <el-table-column
                    prop="name"
                    label="商品名称"
                    width="">
                  </el-table-column>
                  <el-table-column
                    prop="pno"
                    label="商品编码"
                    width="">
                  </el-table-column>
                  <el-table-column
                    prop="isVirtualSaleStr"
                    label="是否虚拟销售"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="quantity"
                    label="数量"
                    width="">
                  </el-table-column>
                  <el-table-column
                    prop="usableNum"
                    label="库存数量"
                    width="">
                    <template scope="scope">
                      <div v-if="scope.row.quantity < scope.row.usableNum? true : false">
                        <span>{{ scope.row.usableNum }}</span></div>
                      <div v-else-if="scope.row.quantity > scope.row.usableNum&& scope.row.usableNum!=0? true : false"
                           style="background: rgba(255, 204, 102, 1);color: #202D3E;">
                        <span>{{ scope.row.usableNum }}</span></div>
                      <div v-if="scope.row.usableNum == 0 ? true : false"
                           style="background: rgba(255, 102, 102, 1);color: #202D3E;">
                        <span>{{ scope.row.usableNum }}</span></div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="dueAmount"
                    label="小计金额（元）"
                    width="">
                  </el-table-column>
                  <el-table-column
                    prop="couponAmount"
                    label="优惠信息（元）"
                    width="">
                  </el-table-column>
                  <el-table-column
                    prop="payAmount"
                    label="实际支付（元）"
                    width="">
                  </el-table-column>


                </el-table>
                <el-col :span="24" style="text-align: left;margin-top: 10px">

                  <el-button type="primary" @click="FG_OrderDetail_createInvoice('createInvoiceForm')">生成</el-button>
                  <el-button @click="FG_OrderDetail.createInvoice.dialogVisible = false">取 消</el-button>

                </el-col>

                <!--   </el-form>-->


              </el-row>

            </el-dialog>

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
        tid: "",
        FG_OrderDetail: {
          removeOrderDialogVisible: false,
          removeOrder: {
            reason: ''
          },
          createInvoice: {
            dialogVisible: false,
            multiSelectData: [],
            tabelData: [],
            data: {
//              tid:"",
//              contact:"",
//              mobile:"",
//              areaCode:"",
//              deliveryAddress:"",
              logisticsCompany: "",
              logisticsOrderNo: "",
              fee: "",
//              tradeStatus:"",
//              remark:"",
//              modifyEmpNo:"",
//              modifyTime:"",
//              addTime:''
            }
          },

          baseInfo: {
            data: {
              buyerTypeStr: "",
              tradeTypeStr: "",
              payTime: "",
              type: "",
              deliveryTypeStr: "",
              tradeTime: "",
              status: "",
              bMobile: "",
              bName: "",
              statusStr: '',
              supplierTypeStr: '',
              modifyEmpNo: "",
              modifyTime: "",
              tradeStatus: '',
              //费用信息
              dueAmount: '',
              logisticsCost: '',
              payAmount: '',
              couponAmount: ''
            }
          },

          dispatchInfo: {
            data: {
              contact: "",
              mobile: "",
              provinceCode: '',
              cityCode: '',
              areaCode: "",
              deliveryAddress: "",
              remark: "",
              invoiceTimeSrt: '',
              invoiceStatusStr: '',
              receiveTimeStr: ''
            },
            rules: Rules.Score.exchangeFormDetail,
          },
          billInfo: {
            isHaveBillInfo: false,
            addBillInfoOptions: [
              {value: 1, label: "个人"},
              {value: 2, label: "企业"}
            ],
            addBillShopInfoOptions: [
              {value: 1, label: "商品类别"},
              {value: 2, label: "办公用品"},
              {value: 3, label: "配件"},
              {value: 4, label: "耗材"}
            ],
            data: {
              title: "",
              remark: "",
              content: "",
              taxNumber: '',
              type: "",
            },
            rules: Rules.Order.OrderList.billInfoForm,
          },
          shopInfo: {
            tabelData: [],
          },
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
                payAmountType: "",
                deliverGoodsType: "",
                type: "",
                payType: "",
                contact: "",
                mobile: "",
                beginTradeTime: "",
                endTradeTime: ''
              },
              rules: '',

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
      this.tid = this.$route.query.tid
      this.FG_TABLE_initData()
    },
    methods: {

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
        this.$http(this.$_.merge({}, Action.Order.platformOrder.detail, {
          params:{tid:parseInt(this.$route.query.tid)}
        })).then(response => {
          Helper.FG.setValueToObject(this.FG_OrderDetail.baseInfo.data, response.data)
          this.FG_TABLE.data = response.data.detailViews

          Helper.FG.setValueToObject(this.FG_OrderDetail.dispatchInfo.data,response.data)

          this.FG_OrderDetail.dispatchInfo.data.invoiceStatusStr = response.data.invoiceStatusStr
          this.FG_OrderDetail.dispatchInfo.data.invoiceTimeStr = response.data.invoiceTimeStr
          this.FG_OrderDetail.dispatchInfo.data.receiveTimeStr = response.data.receiveTimeStr


          Helper.FG.setValueToObject(this.FG_OrderDetail.dispatchInfo.data,response.data.address)
          Helper.FG.setValueToObject(this.FG_OrderDetail.billInfo.data,response.data.billInfo)

          for (var i in this.FG_OrderDetail.billInfo.data){
            if(this.FG_OrderDetail.billInfo.data[i] != ""){
              this.FG_OrderDetail.billInfo.isHaveBillInfo = true
            }else {
              this.FG_OrderDetail.billInfo.isHaveBillInfo = false
            }
          }

        }, response => {
          this.$message({
            type: "error",
            message: response.body.resultMessage
          })
        })
      },

      // 修改配送信息
      FG_handleEditDispatchInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_OrderDetail.dispatchInfo.data.tid = this.tid
            this.$http(this.$_.merge({}, Action.Order.OrderList.dispatchInfoEdit, {
              body: this.FG_OrderDetail.dispatchInfo.data
            })).then(response => {
              //表格数据
              this.$message({
                type:"success",
                message:"订单配送信息修改成功"
              })
            }, response => {
              this.$message({
                type: "error",
                message: response.body.resultMessage
              })
            })
          } else {
            return false;
          }
        });
      },


      //添加发票信息
      FG_handleAddBillInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_OrderDetail.billInfo.data.tid = this.tid
            this.$http(this.$_.merge({}, Action.Order.OrderList.tradeBillInfoAdd, {
              body: this.FG_OrderDetail.billInfo.data
            })).then(response => {
              this.$message({
                type:"success",
                message:"订单发票信息添加成功"
              })
              this.FG_TABLE_refreshData()
            }, response => {
              this.$message({
                type: "error",
                message: response.body.resultMessage
              })
            })
          } else {
            return false;
          }
        });
      },
      // 编辑发票信息
      FG_handleEditBillInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_OrderDetail.billInfo.data.tid = this.tid
            this.$http(this.$_.merge({}, Action.Order.OrderList.tradeBillInfoEdit, {
              body: this.FG_OrderDetail.billInfo.data
            })).then(response => {
              //表格数据
              this.$message({
                type:"success",
                message:"订单发票信息修改成功"
              })
            }, response => {
              this.$message({
                type: "error",
                message: response.body.resultMessage
              })
            })
          } else {
            return false;
          }
        });
      },


      // 查看发货单
      FG_handleCheckTid(){
        this.$router.push({path: '/orderManage/invoiceList', query: {tid: this.$route.query.tid}})
      },


      // 取消订单
      FG_handleRemoveOrder(){
        this.FG_OrderDetail.removeOrderDialogVisible = true
      },
      FG_OrderDetail_removeOrderSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_OrderDetail.removeOrderDialogVisible = false
            let params = {
              tid: parseInt(this.$route.query.tid),
              remark: this.FG_OrderDetail.removeOrder.reason
            }
            if (this.FG_OrderDetail.baseInfo.data.status > 3120) {
              this.$message({
                type: "warning",
                message: "交易订单已发货，不可取消"
              })
              return false
            } else {
              this.$http(this.$_.merge({}, Action.Order.OrderList.cancelOrder, {
                params: params
              })).then(response => {

                if (response.body.success == true) {
                  this.$message({
                    type: "success",
                    message: "取消订单成功"
                  })
                } else {
                  this.$message({
                    type: "error",
                    message: response.body.resultMessage
                  })
                }

              }, response => {
                this.$message({
                  type: "error",
                  message: response.body.resultMessage
                })
              })
            }


          } else {

            return false;
          }
        });

      },


      // 生成发货单
      FG_handleCreateInvoice(){
        if (this.FG_OrderDetail.baseInfo.data.status == 2120) {
          this.$message({
            type: "warning",
            message: "订单未付款"
          })
        } else {


          this.$http(this.$_.merge({}, Action.Order.OrderList.InvoiceCommditys, {
            params: {tid: parseInt(this.$route.query.tid)}
          })).then(response => {
            this.FG_OrderDetail.createInvoice.dialogVisible = true
            this.FG_OrderDetail.createInvoice.tabelData = response.data
          }, response => {
            this.$message({
              type: "error",
              message: response.body.resultMessage
            })
          })


        }

      },
      FG_OrderDetail_createInvoice(){

        if (this.FG_OrderDetail.createInvoice.multiSelectData.length == 0) {
          this.$message({
            type: "warning",
            message: "请选择商品"
          })
        } else {

          let subTids = []
          for (let i = 0; i < this.FG_OrderDetail.createInvoice.multiSelectData.length; i++) {
            if (this.FG_OrderDetail.createInvoice.multiSelectData[i].isVirtualSaleStr == '是' || this.FG_OrderDetail.createInvoice.multiSelectData[i].usableNum > this.FG_OrderDetail.createInvoice.multiSelectData[i].quantity) {
              subTids.push(this.FG_OrderDetail.createInvoice.multiSelectData[i].subTid)
            } else {
              this.$message({
                type: "warning",
                message: "有商品库存不足"
              })
              return false
            }

          }
          let params = {
            subTids: subTids.join()
          }
          this.$http(this.$_.merge({}, Action.Order.OrderList.createInvoice, {
            url: Helper.FG.setParams(Action.Order.OrderList.createInvoice.url, {tid: this.tid,}),
            body: params
          })).then(response => {
            this.$message({
              type: "success",
              message: "发货单生成成功"
            })
            this.FG_TABLE_refreshData()
            this.FG_OrderDetail.createInvoice.dialogVisible = false

          }, response => {
            this.$message({
              type: "error",
              message: response.body.resultMessage
            })
            this.FG_OrderDetail.createInvoice.dialogVisible = false
          })
        }
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

      FG_pagination_reset: function () {
        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
        }
      },
      FG_TABLE_handleSelectionChange: function (val) {
        this.FG_OrderDetail.createInvoice.multiSelectData = val
      },
      // 双击行
      FG_TABLE_handleRowDoubleClick: function (row) {
        this.$refs.FG_TABLE.clearSelection() //清除所有的勾选
        this.$refs.FG_TABLE.toggleRowSelection(row, true) //勾选当前行
//        this.FG_TABLE_showEditRowForm()
      },
      //合计
      //商品信息合计
      FG_TABLE_getSummaries(param) {
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
          if (index === 6) {
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
          if (index === 7) {
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

        //this.FG_order.data.totalPrice = parseInt(sums[6])

        return sums
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
          if (index === 6) {
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
          if (index === 7) {
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
          if (index === 8) {
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


    },
    components: {
      areaSelect,
    }

  }
</script>


<style lang="scss" scoped="">

  .el-input__inner:focus {
    outline: none !important;
    border: 0 !important;
  }

  .noFoucs:focus {
    outline: none !important;
  }

  .baseDetail, .dispatchInfo, .billInfo, .shopInfo, .costInfo {
    margin-bottom: 20px;
    background: white;

    .fg-content-detail {
      background: white;

    }

    .costInfoItem {
      border-bottom: 1px solid #E7E6EB;
      width: 300px;
      margin: 10px 0;

      div {
        margin: 10px 0;
      }

      span {
        text-align: left;
        font-size: 14px;
        line-height: 20px;
        color: #5D6A7A;
      }

      b {
        font-size: 14px;
        line-height: 20px;
        color: #333333;
      }

      .totalMoney {
        color: #3399FF;
      }

      .endPayMoney {
        font-weight: 700;
        font-style: normal;
        font-size: 24px;
        color: #FF3300;
        line-height: 20px;
      }

    }
  }

  .fg-content-opr {
    margin-left: 24px;
  }
</style>
