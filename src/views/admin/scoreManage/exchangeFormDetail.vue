<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="orderDetail">
        <div class="container">
          <div class="content">
            <el-row :span="24" class="fg-content-title">
              兑换单详情
            </el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row class="detail-bar">
                <el-row :span="24" class="fg-content-title">
                  基本信息
                </el-row>
                <el-row :span="24" class="fg-content-opr">
                  <el-button :plain="true" type="primary" size="" @click="FG_handleAuditOrder"
                             v-if="FG_OrderDetail.status<2"><i
                    class="fa fa-times-circle"></i> 审核兑换单
                  </el-button>
                  <el-button :plain="true" type="primary" size="" @click="FG_handleRemoveOrder"
                             v-if="FG_OrderDetail.status<3"><i
                    class="fa fa-times-circle"></i> 取消兑换单
                  </el-button>
                  <el-dialog
                    title="取消兑换单"
                    :visible.sync="FG_removeOrder.removeOrderDialogVisible"
                  >
                    <div class=""
                         style="line-height: 30px;font-size: 14px;color: #434343;position: relative;left: 120px;padding-bottom: 20px">
                <span class="el-icon-information"
                      style="color: #f7ba2a;display: inline-block;width: 36px;height: 37px;font-size: 30px"></span>
                      <span style="position: relative;top: -5px;font-weight: 700;">确认取消兑换单？请填写取消原因。</span>
                    </div>
                    <el-form :model="FG_removeOrder.data"
                             ref="removeOrderForm">
                      <el-form-item label="取消订单原因 ：" label-width="130px" prop="reason">
                        <el-input v-model="FG_removeOrder.data.remark"></el-input>
                      </el-form-item>

                    </el-form>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="FG_removeOrder.removeOrderDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="FG_OrderDetail_removeOrderSubmit('removeOrderForm')">确 定</el-button>
              </span>
                  </el-dialog>
                  <el-button :plain="true" type="primary" size="" @click="FG_handleBack"><i
                    class="fa  fa-mail-reply-all"></i> 返回
                  </el-button>
                </el-row>
                <el-form ref="baseInfoForm" :model="FG_OrderDetail" label-width="120px" class="order-form">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="兑换单号 ：" prop="id">
                        <el-input v-model="FG_OrderDetail.id" disabled
                                  class="readOnly"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="会员号 ：" prop="memberNo">
                        <el-input v-model="FG_OrderDetail.memberNo" disabled
                                  class="readOnly"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="姓名 ：" prop="memberName">
                        <el-input v-model="FG_OrderDetail.memberName" disabled
                                  class="readOnly"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="状态 ：" prop="statusStr">
                        <el-input v-model="FG_OrderDetail.statusStr" disabled
                                  class="readOnly"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="本次使用积分 ：" prop="costIntegral">
                        <el-input v-model="FG_OrderDetail.costIntegral" disabled
                                  class="readOnly"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-row>

              <el-row class="detail-bar">
                <el-row :span="24" class="fg-content-title">
                  配送信息
                </el-row>

                <el-form ref="shippingAddressForm" :model="FG_OrderDetail.shippingAddressView" label-width="120px"
                         class="order-form" :rules="rules">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="收货人 ：" prop="contact">
                        <el-input v-model="FG_OrderDetail.shippingAddressView.contact" :disabled="FG_OrderDetail.status>=3"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="收货人电话 ：" prop="mobile">
                        <el-input v-model="FG_OrderDetail.shippingAddressView.mobile" :disabled="FG_OrderDetail.status>=3"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="收货地址 ：" prop="areaCode">
                        <area-select ref="area" :province.sync="FG_OrderDetail.shippingAddressView.provinceAreaCode"
                                     :city.sync="FG_OrderDetail.shippingAddressView.cityAreaCode"
                                     :area.sync="FG_OrderDetail.shippingAddressView.areaCode" :disabled="FG_OrderDetail.status>=3"></area-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="详细地址 ：" prop="deliveryAddress">
                        <el-input v-model="FG_OrderDetail.shippingAddressView.deliveryAddress" :disabled="FG_OrderDetail.status>=3"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="发货时间 ：">
                        <el-input v-model="FG_OrderDetail.shippingAddressView.sendTimeStr" :disabled="FG_OrderDetail.status>=3"></el-input>
                      </el-form-item>
                    </el-col>


                    <el-col :span="12">
                      <el-form-item label="收货时间 ：">
                        <el-input v-model="FG_OrderDetail.shippingAddressView.receiveTimeStr" :disabled="FG_OrderDetail.status>=3"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="收货备注 ：">
                        <el-input v-model="FG_OrderDetail.shippingAddressView.remark" :disabled="FG_OrderDetail.status>=3"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="FG_OrderDetail.status>=2&&FG_OrderDetail.status<=6">
                      <el-form-item label="发货详情 ：">
                        <el-button type="primary" @click="FG_handleInvoiceGift">查看发货单</el-button>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row :span="24" class="fg-content-opr" style="margin-left: 40px">
                    <el-button :plain="true" type="primary" size="" @click="FG_handleShippingAddressEdit('shippingAddressForm')"  v-if="FG_OrderDetail.status<3"><i
                      class="fa  fa-mail-reply-all" ></i> 修改
                    </el-button>
                  </el-row>
                </el-form>

              </el-row>

              <el-row class="detail-bar">
                <el-row :span="24" class="fg-content-title">
                  商品信息
                </el-row>
                <el-row :span="24" class="fg-content-opr" v-if="FG_OrderDetail.status>=2&&FG_OrderDetail.status<4">
                  <el-button :plain="true" type="primary" size="" @click="FG_handleGiftInvoice"><i class="fa  fa-mail-reply-all"></i> 生成发货单
                  </el-button>
                </el-row>
                <el-dialog
                  title="生成发货单"
                  :visible.sync="FG_createInvoice.dialogVisible"
                  size="large">
                  <el-row>

                    <el-table
                      ref="FG_TABLE"
                      :data="FG_createInvoice.data"
                      max-height="450"
                      border
                      show-summary
                      :summary-method="FG_dialogTABLE_getSummaries"
                      @selection-change="FG_TABLE_handleSelectionChange"
                      empty-text="暂无可发货商品"
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
                        prop="gTypeStr"
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

                      <el-button type="primary" @click="FG_InvoiceCreate('createInvoiceForm')">生成</el-button>
                      <el-button @click="FG_createInvoice.dialogVisible = false">取 消</el-button>

                    </el-col>

                  </el-row>

                </el-dialog>

                <el-form  label-width="120px"
                          class="order-form">
                  <el-row>
                    <el-table
                      ref="FG_TABLE"
                      :data="FG_OrderDetail.detailViewList"
                      max-height="450"
                      border
                      tooltip-effect="dark"
                      style="width: 100%"
                      class="fg-content-table"
                      show-summary
                      :summary-method="FG_TABLE_getSummaries"
                      :default-sort="{prop: 'gid', order: 'descending'}"
                    >

                      <el-table-column
                        label="序号"
                        type="index"
                        width="70">
                      </el-table-column>
                      <el-table-column
                        prop="gid"
                        label="积分商品编码">
                      </el-table-column>
                      <el-table-column
                        prop="gName"
                        label="积分商品名称">
                      </el-table-column>
                      <el-table-column
                        prop="pno"
                        label="商品编码">
                      </el-table-column>
                      <el-table-column
                        prop="pName"
                        label="商品名称">
                      </el-table-column>
                      <el-table-column
                        prop="eachPNum"
                        label="每份数量">
                      </el-table-column>
                      <el-table-column
                        prop="eachCostIntegral"
                        label="每份消耗积分">
                      </el-table-column>
                      <el-table-column
                        prop="giftNum"
                        label="兑换数量">
                      </el-table-column>
                      <el-table-column
                        prop="costIntegral"
                        label="共消耗积分（分）">
                      </el-table-column>
                      <el-table-column
                        prop="statusStr"
                        label="状态">
                      </el-table-column>

                    </el-table>


                  </el-row>
                </el-form>
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
        tid: '',
        rules:Rules.Score.exchangeFormDetail,
        FG_OrderDetail: {
          detailViewList:[],
          shippingAddressView:{
            contact:'',
            mobile:'',
            provinceAreaCode:'',
            cityAreaCode:'',
            areaCode:'',
            deliveryAddress:'',
            remark:'',
            sendTimeStr:'',
            receiveTimeStr:''
          },
          statusStr:'',
          modifyTimeStr:'',
          createTimeStr:'',
          sendTimeStr:'',
          auditTimeStr:''
        },
        FG_removeOrder: {
          removeOrderDialogVisible: false,
          data: {
            remark: ''
          }
        },
        FG_createInvoice:{
          data:[],
          multiSelectData:[],
          dialogVisible:false
        },
        FG_TABLE: {
          data: [],
        },
      }
    },
    created (){
      this.tid = this.$route.query.tid
      this.FG_TABLE_initData()
    },
    methods: {
      //初始化表单数据
      FG_TABLE_initData(){
        //获取兑换单详情信息
        this.$http(this.$_.merge({}, Action.Score.exchangeRecord.detail, {
          params: {tid: this.tid}
        })).then(response => {
          if(response.body && response.body != ''){
            this.FG_OrderDetail = response.body
          }
        }, response => {
          this.$message.error(response.body.resultMessage, response.body)
        })
      },
      //审核兑换单

      FG_handleAuditOrder(){
        this.$http(this.$_.merge({}, Action.Score.exchangeRecord.audit, {
          url: Helper.FG.setParams(Action.Score.exchangeRecord.audit.url, {id: this.tid}),
        })).then(response => {
          this.FG_TABLE_initData()
          this.$message.success('兑换单审核成功', response.body)
        }, response => {
          this.$message.error(response.body.resultMessage, response.body)
        })
      },
      // 查看发货单
      FG_handleInvoiceGift(){
        this.$router.push({path:'/score/scoreGoodsInvoiceList',query:{tid:this.$route.query.tid}})
      },
      //处理生成发货单
      FG_handleGiftInvoice(){
        this.$http(this.$_.merge({}, Action.Score.exchangeRecord.giftOrderDetail, {
          params: {id: this.tid}
        })).then(response => {
          if(response.body && response.body != ''){
            this.FG_createInvoice.data = response.body
          }

        }, response => {
          this.$message.error(response.body.resultMessage, response.body)
        })
        this.FG_createInvoice.dialogVisible=true
      },
      FG_TABLE_handleSelectionChange(val){
        this.FG_createInvoice.multiSelectData = val
      },
      //生成发货单
      FG_InvoiceCreate(){
        if(this.FG_createInvoice.multiSelectData.length==0){
          this.$message.warning('请选择商品')
        }else{
          let subTids = []
          let subTid={

          }
          for (let i = 0; i < this.FG_createInvoice.multiSelectData.length; i++) {
            if(this.FG_createInvoice.multiSelectData[i].status==1){
              if(this.FG_createInvoice.multiSelectData[i].pStockNum<this.FG_createInvoice.multiSelectData[i].giftNum){
                this.$message({
                  type: "warning",
                  message: "有商品库存不足"
                })
                return false
              }else{
                subTid.subTid=this.FG_createInvoice.multiSelectData[i].subTid
                subTid.giftNum=this.FG_createInvoice.multiSelectData[i].giftNum
                subTids.push(subTid)
              }
            }else{
              this.$message.warning('有订单已生成发货单')
              return false
            }


          }
          let params = {
            tid: this.tid,
            details : JSON.stringify(subTids)
          }
          this.$http(this.$_.merge({}, Action.Score.exchangeRecord.createInvoice, {
            body:params
          })).then(response => {
            this.FG_TABLE_initData()
            this.$message.success('积分商品发货单生成成功', response.body)
          }, response => {
            this.$message.error(response.body.resultMessage, response.body)
          })
          this.FG_createInvoice.dialogVisible=false
        }
      },

      //取消兑换单
      FG_handleRemoveOrder(){
        this.FG_removeOrder.removeOrderDialogVisible = true
      },
      //确定取消兑换单
      FG_OrderDetail_removeOrderSubmit() {
        this.$http(this.$_.merge({}, Action.Score.exchangeRecord.delete, {
          body: {id: this.tid,remark:this.FG_removeOrder.data.remark}
        })).then(response => {
          this.FG_TABLE_initData()
          this.$message.success('取消兑换单成功', response.body)
          this.FG_removeOrder.removeOrderDialogVisible = false
        }, response => {
          this.$message.error(response.body.resultMessage, response.body)
        })
      },

      //返回列表页
      FG_handleBack(){
        this.$router.push("/score/exchangeFormRecord")
      },

      //配送信息修改
      FG_handleShippingAddressEdit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //修改配送信息
            let params = this.FG_OrderDetail.shippingAddressView
            params.tid = this.tid
            this.$http(this.$_.merge({}, Action.Score.exchangeRecord.dispatchInfoEdit, {
              body:params
            })).then(response => {
              this.$message.success('兑换单配送信息修改成功', response.body)
            }, response => {
              this.$message.error(response.body.resultMessage, response.body)
            })
          } else {
            return false
          }
        })
      },


      //商品信息表格操作

      //商品信息合计
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
              sums[index] += ''
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
    }
    ,
    components: {
      areaSelect,
    }
  }
</script>
<style lang="scss" scoped="">
  .detail-bar {
    margin-bottom: 20px;
    background: white;
  }

  .fg-content-opr {
    margin-left: 24px;
  }

  .order-form {
    padding: 20px;
  }

</style>
