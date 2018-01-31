<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="orderDetail">
        <div class="container">


          <div class="content">
            <el-row :span="24" class="fg-content-title">
              平台兑换单详情
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
                  <el-form ref="advQueryForm" :model="FG_OrderDetail.baseInfo" label-width="120px">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="兑换单号 ：" prop="id">
                          <el-input v-model="FG_OrderDetail.baseInfo.id" readonly="readonly" disabled
                                    class="readOnly"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="会员号 ：" prop="memberNo">
                          <el-input v-model="FG_OrderDetail.baseInfo.memberNo" readonly="readonly" disabled
                                    class="readOnly"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="姓名 ：" prop="memberName">
                          <el-input v-model="FG_OrderDetail.baseInfo.memberName" readonly="readonly" disabled
                                    class="readOnly"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="状态 ：" prop="statusStr">
                          <el-input v-model="FG_OrderDetail.baseInfo.statusStr" readonly="readonly" disabled
                                    class="readOnly"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="本次使用积分 ：" prop="costIntegral" >
                          <el-input v-model="FG_OrderDetail.baseInfo.costIntegral" readonly="readonly" disabled
                                    class="readOnly"></el-input>
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
                  <el-form ref="" :model="FG_OrderDetail.dispatchInfo" label-width="100px">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="收货人 ：">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.contact" readonly class="readOnly" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <!--<el-col :span="12">
                        <el-form-item label="发货状态 ：" >
                          <el-input v-model="FG_OrderDetail.dispatchInfo.status" placeholder=""  readonly="readonly" class="readOnly" ></el-input>
                        </el-form-item>
                      </el-col>-->
                      <el-col :span="12">
                        <el-form-item label="收货人电话 ：">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.mobile" readonly class="readOnly" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="发货时间 ：">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.sendTimeStr" readonly disabled
                                    class="readOnly"></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="收货地址 ：" prop="">
                          <area-select ref="area" :province.sync="FG_OrderDetail.dispatchInfo.provinceAreaCode"
                                       :city.sync="FG_OrderDetail.dispatchInfo.cityAreaCode"
                                       :area.sync="FG_OrderDetail.dispatchInfo.areaCode"
                                       :disabled="true"
                          ></area-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="收货时间 ：">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.receiveTimeStr" readonly="readonly" disabled
                                    class="readOnly"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="详细地址 ：">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.deliveryAddress" readonly disabled
                                    class="readOnly"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="收货备注 ：">
                          <el-input v-model="FG_OrderDetail.dispatchInfo.remark" readonly class="readOnly" disabled></el-input>
                        </el-form-item>
                      </el-col>
                     <!-- <el-col :span="12">
                        <el-form-item label="发货详情 ：">
                          <el-button type="primary" @click="FG_handleCheckTid">查看发货单</el-button>
                        </el-form-item>
                      </el-col>-->

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
                    row-key="code"
                    style="width: 100%"
                    v-loading="FG_TABLE.loading.is_loading"
                    :element-loading-text="FG_TABLE.loading.loadText"
                    class="fg-content-table"
                    show-summary
                    :summary-method="FG_TABLE_getSummaries"
                    @selection-change="FG_TABLE_handleSelectionChange"
                    @row-dblclick="FG_TABLE_handleRowDoubleClick"
                    :default-sort="{prop: 'code', order: 'descending'}"
                  >

                    <el-table-column
                      label="序号"
                      type="index"
                      width="70">
                    </el-table-column>
                    <el-table-column
                      prop="gid"
                      label="积分商品编码"
                      width=""
                    >
                    </el-table-column>
                    <el-table-column
                      prop="gName"
                      label="积分商品名称"
                      width="">
                    </el-table-column>
                    <el-table-column
                      prop="pid"
                      label="商品编码"
                      width=""
                    >
                    </el-table-column>
                    <el-table-column
                      prop="pName"
                      label="商品名称"
                      width="">
                    </el-table-column>
                    <el-table-column
                      prop="eachPNum"
                      label="每份数量"
                      width=""
                    >
                    </el-table-column>
                    <el-table-column
                      prop="eachCostIntegral"
                      label="每份消耗积分"
                      width=""
                    >
                    </el-table-column>
                    <!--<el-table-column-->
                      <!--prop="mnemonicCode"-->
                      <!--label="开始时间"-->
                      <!--width="120"-->
                    <!--&gt;-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                      <!--prop="mnemonicCode"-->
                      <!--label="结束时间"-->
                      <!--width="120"-->
                    <!--&gt;-->
                    <!--</el-table-column>-->
                    <el-table-column
                      prop="giftNum"
                      label="兑换数量"
                      width=""
                    >
                    </el-table-column>
                    <el-table-column
                      prop="costIntegral"
                      label="共消耗积分"
                      width=""
                    >

                    </el-table-column>
                    <el-table-column
                      prop="statusStr"
                      label="状态"
                    width="">
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

            <el-dialog
              title="取消订单"
              :visible.sync="FG_OrderDetail.removeOrderDialogVisible"
              size="tiny"
            >
              <div class=""
                   style="line-height: 30px;font-size: 14px;color: #434343;position: relative;left: 120px;padding-bottom: 20px">
                <span class="el-icon-information"
                      style="color: #f7ba2a;display: inline-block;width: 36px;height: 37px;font-size: 30px"></span>
                <span style="position: relative;top: -5px;font-weight: 700;">确认取消订单？请填写取消原因。</span>
              </div>
              <el-form :model="FG_OrderDetail.removeOrder" :rules="FG_OrderDetail.editDispath.rules"
                       ref="removeOrderForm">
                <el-form-item label="取消订单原因 ：" label-width="130px" prop="reason">
                  <el-input v-model="FG_OrderDetail.removeOrder.reason"></el-input>
                </el-form-item>

              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="FG_OrderDetail.removeOrderDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="FG_OrderDetail_removeOrderSubmit('removeOrderForm')">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog
              title="编辑配送信息"
              :visible.sync="FG_OrderDetail.editDispath.dialogVisible"
              size="small"
            >
              <el-form ref="dispatchInfoForm" :model="FG_OrderDetail.editDispath.data" label-width="120px"
                       :rules="FG_OrderDetail.editDispath.rules">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="收货人 ：" prop="contact" required="">
                      <el-input v-model="FG_OrderDetail.editDispath.data.contact"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="收货人电话 ：" prop="mobile">
                      <el-input v-model="FG_OrderDetail.editDispath.data.mobile"></el-input>
                    </el-form-item>
                  </el-col>


                  <el-col :span="24">
                    <el-form-item label="收货地址 ：" prop="" required="" v-model="FG_OrderDetail.editDispath.data.areaCode">
                      <area-select ref="area" :province.sync="FG_OrderDetail.editDispath.data.provinceAreaCode"
                                   :city.sync="FG_OrderDetail.editDispath.data.cityAreaCode"
                                   :area.sync="FG_OrderDetail.editDispath.data.areaCode"></area-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="详细地址 ：" prop="deliveryAddress">
                      <el-input v-model="FG_OrderDetail.editDispath.data.deliveryAddress"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="24">
                    <el-form-item label="配送方式 ：" prop="type">

                          <el-select v-model="FG_OrderDetail.editDispath.data.type" placeholder="无配送" style="width: 360px">
                            <el-option label="无配送" :value="1"></el-option>
                            <el-option label="到店自提" :value="2"></el-option>
                            <el-option label="快递配送" :value="3"></el-option>
                          </el-select>

                    </el-form-item>
                  </el-col>-->
                  <el-col :span="24">
                    <el-form-item label="收货备注 ：" prop="remark">
                      <el-input v-model="FG_OrderDetail.editDispath.data.remark"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="">
                      <el-button @click="FG_OrderDetail.editDispath.dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="FG_OrderDetail_handleEditDispath('dispatchInfoForm')">确 定
                      </el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

            </el-dialog>


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
                    prop="pStockNum"
                    label="库存数量"
                    width="">
                    <template scope="scope">
                      <div v-if="scope.row.giftNum < scope.row.pStockNum? true : false"><span>{{ scope.row.pStockNum }}</span>
                      </div>
                      <div v-else-if="scope.row.giftNum > scope.row.pStockNum&& scope.row.pStockNum!=0? true : false"
                           style="background: rgba(255, 204, 102, 1);color: #202D3E;">
                        <span>{{ scope.row.pStockNum }}</span></div>
                      <div v-if="scope.row.pStockNum == 0 ? true : false"
                           style="background: rgba(255, 102, 102, 1);color: #202D3E;">
                        <span>{{ scope.row.pStockNum }}</span></div>
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
          editDispath: {
            dialogVisible: false,
            data: {
              contact: "",
              mobile: "",
              provinceAreaCode: '',
              cityAreaCode: '',
              areaCode: "",
              deliveryAddress: "",
              receiveTimeStr: "",
              sendTimeStr: "",
              tradeTime: "",
              remark: "",
              updateTime: "",
              type: ""
            },
            rules: Rules.Order.OrderList.editDispath,
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
            id: '',
            memberNo: '',
            memberName: '',
            statusStr: '',
            costIntegral: '',
          },
          dispatchInfo: {
            contact: "",
            mobile: "",
            provinceAreaCode: '',
            cityAreaCode: '',
            areaCode: "",
            deliveryAddress: "",
            receiveTimeStr: "",
            sendTimeStr: "",
            remark: "",
            tradeTime: "",
            updateTime: ""
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
              rules: Rules.HighQuery,

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
        console.log(params)

        //获取过滤字段
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
        option = option || {}

        let params = this.FG_TABLE_getParams(this.$_.merge({
          tid: parseInt(this.$route.query.tid)
        }, option))

        this.$http(this.$_.merge({}, Action.Score.platformGiftOrder.detail, {
          params
        })).then(response => {
          Helper.FG.setValueToObject(this.FG_OrderDetail.baseInfo, response.body)
          this.FG_TABLE.data = response.data.detailViewList

          Helper.FG.setValueToObject(this.FG_OrderDetail.dispatchInfo, response.data.shippingAddressView)
          Helper.FG.setValueToObject(this.FG_OrderDetail.editDispath.data, response.data.shippingAddressView)
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

      // 取消订单
      FG_handleRemoveOrder(){
        this.FG_OrderDetail.removeOrderDialogVisible = true
      },
      FG_OrderDetail_removeOrderSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_OrderDetail.removeOrderDialogVisible = false
            let params = {
              id: parseInt(this.$route.query.tid),
              remark: this.FG_OrderDetail.removeOrder.reason
            }
            if (this.FG_OrderDetail.baseInfo.status > 3120) {
              this.$message({
                type: "warning",
                message: "交易订单已发货，不可取消"
              })
              return false
            } else {
              this.$http(this.$_.merge({}, Action.Score.exchangeRecord.delete, {
                params
              })).then(response => {
                if (response.body.success == true) {
                  this.$message({
                    type: "success",
                    message: "取消订单" + response.body.resultMessage
                  })
                } else {
                  this.$message({
                    type: "warning",
                    message: response.body.resultMessage
                  })
                }
                this.FG_TABLE_releaseLock()
              }, response => {
                this.$message.error(response.body.resultMessage)
                this.FG_TABLE_releaseLock()
              })
            }


          } else {
            return false;
          }
        });

      },
      // 返回
      FG_handleBack(){
        this.$router.back(-1)
      },

      // 编辑配送信息
      FG_handleEditDispatchInfo(){
        this.FG_OrderDetail.editDispath.dialogVisible = true
      },
      FG_OrderDetail_handleEditDispath(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_OrderDetail.editDispath.dialogVisible = false;
            let params = {
              tid: parseInt(this.tid)
            }
            for (let name in this.FG_OrderDetail.editDispath.data) {
              if (this.FG_OrderDetail.editDispath.data[name] != "") {
                params[name] = this.FG_OrderDetail.editDispath.data[name]
              }
            }

            this.$http(this.$_.merge({}, Action.Score.exchangeRecord.dispatchInfoEdit, {
              params
            })).then(response => {
              if (response.body.success == true) {
                this.$message({
                  type: "success",
                  message: "修改配送信息" + response.body.resultMessage
                })

                this.FG_GETdispatchInfo()
                this.FG_TABLE_refreshData()
              }


              this.FG_TABLE_releaseLock()
            }, response => {
              this.$message.error(response.body.resultMessage)
              this.FG_TABLE_releaseLock()
            })
          } else {
            return false;
          }
        });
      },

      // 查看发货单
      FG_handleCheckTid(){
        this.$router.push({path: '/score/scoreGoodsInvoiceDetail', query: {tid: this.$route.query.tid}})
      },


      // 生成发货单
      FG_handleCreateInvoice(){
        this.$http(this.$_.merge({}, Action.Score.exchangeRecord.giftOrderDetail, {
          params:{id:this.$route.query.tid}
        })).then(response => {
          this.FG_OrderDetail.createInvoice.tabelData = response.body
        }, response => {

        })
        this.FG_OrderDetail.createInvoice.dialogVisible = true
      },
      FG_OrderDetail_createInvoice(){

        if (this.FG_OrderDetail.createInvoice.multiSelectData.length == 0) {
          this.$message({
            type: "warning",
            message: "请选择商品"
          })
        } else {

          let subTids = []
          let subTid={

          }
          for (let i = 0; i < this.FG_OrderDetail.createInvoice.multiSelectData.length; i++) {
            if(this.FG_OrderDetail.createInvoice.multiSelectData[i].pStockNum<this.FG_OrderDetail.createInvoice.multiSelectData[i].giftNum){
              this.$message({
                type: "warning",
                message: "有商品库存不足"
              })
              return false
            }else{
              subTid.subTid=this.FG_OrderDetail.createInvoice.multiSelectData[i].subTid
              subTid.giftNum=this.FG_OrderDetail.createInvoice.multiSelectData[i].giftNum
              subTids.push(subTid)
            }

          }
          let params = {
            tid: this.tid,
            details : JSON.stringify(subTids)
          }
          this.$http(this.$_.merge({}, Action.Score.scoreGoodsInvoice.add, {
            params
          })).then(response => {
            this.$message({
              type: "success",
              message: "发货单生成" + response.body.resultMessage
            })
            this.FG_OrderDetail.createInvoice.dialogVisible = false

          }, response => {
            this.$message({
              type: "warning",
              message: "发货单生成失败"
            })
            this.FG_OrderDetail.createInvoice.dialogVisible = false
          })
        }
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
      },

      //合计
      FG_TABLE_getSummaries(param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计'
            return
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
              sums[index] += ' 分'
            } else {
              sums[index] = '0'
            }
          }
        })

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
              sums[index] += ' 分'
            } else {
              sums[index] = '0'
            }
          }
        })

        return sums
      },
      //组件传值
      FG_SELECT_getArea(area){
        this.FG_OrderDetail.dispatchInfo.address = area
        this.FG_OrderDetail.editDispath.data.areaCode = area
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
