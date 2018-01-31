<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="shopUnit">
        <div class="container">

          <div class="content">
            <el-row :span="24" class="fg-content-title">
              退货单列表
            </el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-opr">

                <el-button v-if="power.indexOf(14111301) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_handleAuditOrder">
                  <i class="fa fa-edit"></i> 审核退货单
                </el-button>
                <el-button v-if="power.indexOf(14111302) > -1 ? true : false"  :plain="true" type="danger" size="" style="margin-right: 10px;" @click="FG_TABLE_handleBackAccount">
                  <i class="fa fa-check"></i> 确认退款
                </el-button>
                <el-input

                  class="fg-search-input"
                  placeholder="请输入发货单流水号/订单号"
                  icon="search"
                  v-model="FG_TABLE.pagination.pageFilter.searchContent"
                  :on-icon-click="FG_TABLE_handleTableSearch"
                  @keyup.enter.native="FG_TABLE_handleTableSearch">
                </el-input>

                <!--<el-button :plain="true" type="danger" size="" @click="FG_TABLE_handleAccept"-->
                <!--&gt;<i class="fa fa-check-square"></i> 确认受理-->
                <!--</el-button>-->
                <adv-query left="left:630px" class="advQuery">
                  <el-form ref="advQueryForm" :model="FG_advQueryForm.filters" label-width="100px" :rules="FG_TABLE.pagination.pageFilter.rules">
                    <el-row>

                      <el-row :span="24">
                        <el-col :span="24">
                          <el-form-item label="退单时间 ：" >
                            <date-link  :label="FG_advQueryForm.labelTitle" @on-get-date="getDate"></date-link>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="退货类型 ：" prop="" style="position: relative;">
                            <el-select v-model="FG_advQueryForm.filters.type" placeholder="已付款" style="width: 360px">
                              <el-option label="全部状态" value=""></el-option>
                              <el-option label="退货退款" :value="1"></el-option>
                              <el-option label="退款" :value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="	退货单状态 ：" prop="" style="position: relative;">
                            <el-select v-model="FG_advQueryForm.filters.status" placeholder="待发货" style="width: 360px">
                              <el-option label="全部状态" value=""></el-option>
                              <el-option label="申请退货" :value="3320"></el-option>
                              <el-option label="确认申请" :value="3350"></el-option>
                              <el-option label="退回申请" :value="3351"></el-option>
                              <el-option label="已退货" :value="3390"></el-option>
                              <el-option label="待退款" :value="2220"></el-option>
                              <el-option label="已退款" :value="2290"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="客户名 ：" prop="bName">
                            <el-input v-model="FG_advQueryForm.filters.bName"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="	客户手机 ：" prop="bMobile">
                            <el-input v-model="FG_advQueryForm.filters.bMobile"></el-input>
                          </el-form-item>
                        </el-col>

                      </el-row>

                      <el-col :span="24" style="margin-left: 20px">
                        <el-form-item label="">
                          <el-button type="primary" @click="FG_advQuery_submitForm('advQueryForm')">确定</el-button>
                          <el-button @click="FG_advQuery_resetForm('advQueryForm')">重置</el-button>
                        </el-form-item>
                      </el-col>


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
                style="width: 100%"
                v-loading="FG_TABLE.loading.is_loading"
                :element-loading-text="FG_TABLE.loading.loadText"
                class="fg-content-table"
                :default-sort="{prop: 'index', order: 'descending'}"
                @selection-change="FG_TABLE_handleSelectionChange"
                @row-dblclick="FG_TABLE_handleRowDoubleClick"
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
                  label="退货单流水号"
                  width=""
                >
                  <template scope="scope">
                    <p @click="FG_TABLE_handleCheck(scope.$index, scope.row)" :id="scope.row.id"><span>{{ scope.row.id }}</span></p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="tid"
                  label="订单号"
                  width="">
                  <template scope="scope">
                    <p @click="FG_TABLE_handleOrderCheck(scope.$index, scope.row)" :id="scope.row.tid"><span>{{ scope.row.tid }}</span></p>
                  </template>
                </el-table-column>
                <!--<el-table-column-->
                  <!--prop="modifyTime"-->
                  <!--label="下单时间"-->
                  <!--width="180"-->
                <!--&gt;-->
                <!--</el-table-column>-->

                <el-table-column
                  prop="bName"
                  label="客户名"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="bMobile"
                  label="客户手机"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="chargebackAmount"
                  label="退款金额"
                  width="">
                </el-table-column>

                <el-table-column
                  prop="addTimeStr"
                  label="退单时间"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="finishedTimeStr"
                  label="完成时间"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="typeStr"
                  label="退货类型"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="reason"
                  label="退货原因"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="statusStr"
                  label="退货单状态"
                  width="">
                </el-table-column>
                <el-table-column
                  prop="modifyEmpName"
                  label="操作人"
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

            <el-dialog
              title="确认退款"
              :visible.sync="FG_TABLE.sureBackMoney.dialogVisible"
              size="small"
            >

              <el-form :model="FG_TABLE.sureBackMoney.data" ref="backMoneyForm" :rules="FG_TABLE.sureBackMoney.rules">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="退款金额 ：" label-width="120px" prop="money">
                      <el-input v-model.number="FG_TABLE.sureBackMoney.data.chargebackAmount"></el-input><span class="backMoney">商品售出价格：{{FG_TABLE.sureBackMoney.shopMoney}} 元</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="退款备注 ：" label-width="120px" prop="">
                      <el-input v-model="FG_TABLE.sureBackMoney.data.remark"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="" label-width="35px">
                      <el-button @click="FG_TABLE.sureBackMoney.dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="FG_handleBackMoney('backMoneyForm')">确 定</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

            </el-dialog>

            <el-dialog
              title="审核退货单"
              :visible.sync="FG_TABLE.Audit.dialogVisible"
              size="tiny"
            >

              <el-form :model="FG_TABLE.Audit.data">
                <el-row>
                  <el-col :span="24">
                    <div class="" style="line-height: 30px;font-size: 14px;color: #434343;position: relative;left: 50%;margin-left:-130px;padding-bottom: 20px">
                      <span class="el-icon-information" style="color: #f7ba2a;display: inline-block;width: 36px;height: 37px;font-size: 30px"></span>
                      <span style="position: relative;top: -5px;font-weight: 700;">是否审核通过客户“退货/退款”请求</span>
                    </div>
                  </el-col>

                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="FG_handleAuditOrderSubmit(false)">不通过</el-button>
                <el-button type="primary" @click="FG_handleAuditOrderSubmit(true)">通过</el-button>
              </span>
            </el-dialog>

            <el-dialog
              title="填写地址信息"
              :visible.sync="FG_TABLE.Audit.addressInfoDialogVisible"
              size=""
            >

              <el-form :model="FG_TABLE.Audit.addressInfo" ref="addressInfoForm" :rules="FG_TABLE.Audit.rules" labelWidth="150px">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="退货联系人 ：" prop="contract">
                      <el-input v-model="FG_TABLE.Audit.addressInfo.contract" ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="退货联系电话 ：" prop="mobile">
                      <el-input v-model="FG_TABLE.Audit.addressInfo.mobile"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="退货地址 ：" prop="areaCode">
                      <area-select ref="area" :province.sync="FG_TABLE.Audit.addressInfo.provinceCode" :city.sync="FG_TABLE.Audit.addressInfo.cityCode" :area.sync="FG_TABLE.Audit.addressInfo.areaCode"></area-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="退货备注 ：" prop="">
                      <el-input v-model="FG_TABLE.Audit.addressInfo.auditRemark"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="详细地址 ：" prop="deliveryAddress">
                      <el-input v-model="FG_TABLE.Audit.addressInfo.deliveryAddress" placeholder="详细地址信息"></el-input>
                    </el-form-item>

                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="物流公司 ：" prop="">
                      <el-input v-model="FG_TABLE.Audit.addressInfo.logisticsCompany" disabled=""></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="物流单号 ：" prop="">
                      <el-input v-model="FG_TABLE.Audit.addressInfo.logisticsOrderNo" disabled=""></el-input>
                    </el-form-item>
                  </el-col>

                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="FG_TABLE.Audit.addressInfoDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="FG_handleAuditAddressSubmit('addressInfoForm')">确 定</el-button>
              </span>
            </el-dialog>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
.fg-content-opr .fg-search-input {
  margin-left: 0 !important;
}
.el-table .cell p {
  span {
    color: rgb(77, 165, 255);
    cursor: pointer;
    &:hover{
      text-decoration-line: underline;
    }
  }
}
.backMoney{
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #FF6600;
  line-height: 20px;
  display: inline-block;
  margin-left: 30px;
}

.advQuery .el-select{
  width: 120px !important;
}
.advQuery  .el-form-item .el-input{
  width: 120px !important;
}
</style>


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
        power:this.$store.state.User.power,
        FG_advQueryForm:{
          filters: {
            status:"",
            type:"",
            bName:"",
            bMobile:"",
            beginTradeTime:"",
            endTradeTime:''
          },
        },
        FG_TABLE: {
          data: [

          ],
          sureBackMoney:{
            dialogVisible:false,
            shopMoney:'222',
            data:{
              id:'',
              chargebackAmount:"",
              remark:''
            },
            rules:{
              chargebackAmount:[
                {required: true, message: "请输入金额", trigger: 'blur',type:'number'},
                {pattern: /^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/, message: "请输入大于零的数字", trigger: 'blur'}
              ]
            }
          },
          Audit:{
            data:{
              id:'',
              type:'',
              isAuditPass:false
            },
            addressInfo:{
              id:'',
              tid:'',
              contract:"",
              mobile:"",
              provinceCode:'',
              cityCode:'',
              areaCode:"",
              deliveryAddress:"",
              auditRemark:"",
              logisticsCompany: "",
              logisticsOrderNo: "",
            },
            addressInfoDialogVisible:false,
            dialogVisible:false,
            rules:Rules.Order.OrderList.editDispath,
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
                type:"",
                bName:"",
                bMobile:"",
                beginTradeTime:"",
                endTradeTime:''
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
        merchantID: 888888,
      }
    },
    created() {
      this.FG_TABLE_initData()
    },
    methods :{
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


        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }
        this.$http(this.$_.merge({}, Action.Order.returnGoodsList.list, {
          params
        })).then(response => {
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
        this.FG_TABLE_refreshData()
      },

      // 货号单击跳转
      FG_TABLE_handleCheck(index,row){
        this.$router.push({path:'/orderManage/chargeBackDetail',query:{id:row.id}})
      },
      FG_TABLE_handleOrderCheck:function (index,row) {
        this.$router.push({path:'/orderManage/orderDetail',query:{tid:row.tid}})
      },

      // 审核
      FG_handleAuditOrder:function () {
        if (this.FG_TABLE.multiSelectData.length == 1) {
          let target = this.FG_TABLE.multiSelectData[0]
          if (target.status == 3320) {
            this.FG_TABLE.Audit.data.id = target.id
            this.FG_TABLE.Audit.data.type = target.type
            this.FG_TABLE.Audit.dialogVisible = true

          } else {
            this.$message({
              type: 'warning',
              message: "该退货单" + target.statusStr
            })
          }

        } else {
          this.$message({
            type: 'warning',
            message: "请选择一项退货单"
          })
        }
      },

      FG_handleAuditOrderSubmit(val){
        let  params = {
          id : this.FG_TABLE.Audit.data.id,
          isAuditPass : this.FG_TABLE.Audit.data.isAuditPass,
          type : this.FG_TABLE.Audit.data.type
        }
        if(val){
          this.FG_TABLE.Audit.data.isAuditPass = params.isAuditPass = true

          if(params.type == 1){ // 退货退款
            this.FG_TABLE.Audit.addressInfoDialogVisible = true
          }
          if(params.type == 2){ // 退款
            this.FG_handleAuditRequest(params)
          }

        }else {
          this.FG_TABLE.Audit.data.isAuditPass = false
          params.isAuditPass = false;
          this.FG_handleAuditRequest(params)
        }

      },

      FG_handleAuditAddressSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              id:"",
              type:'',
              isAuditPass:true,
              tid:"",

              contract:"",
              mobile:"",
              provinceCode:'',
              cityCode:'',
              areaCode:"",
              deliveryAddress:"",
              auditRemark:"",
              logisticsCompany: "",
              logisticsOrderNo: "",
            }

            Helper.FG.setValueToObject(params, this.FG_TABLE.Audit.addressInfo)
            Helper.FG.setValueToObject(params, this.FG_TABLE.Audit.data)
            params.isAuditPass = true;
            this.FG_handleAuditRequest(params)

          } else {
            return false;
          }
        });
      },

      // 审核请求
      FG_handleAuditRequest(params){
        this.$http(this.$_.merge({}, Action.Order.returnGoodsList.Audit, {
          body:params
        })).then(response => {
          this.FG_TABLE.Audit.dialogVisible = false
          this.$message.success('审核成功', response.body)
          this.FG_TABLE.Audit.addressInfoDialogVisible = false
          this.FG_TABLE_releaseLock()
          this.FG_TABLE_refreshData({
            page: this.FG_TABLE.pagination.pageFilter.info.currentPage
          })
        }, response => {
          this.FG_TABLE_releaseLock()
          this.$message.error( response.body.resultMessage, response.body)
        })
      },

      // 退款
      FG_TABLE_handleBackAccount(){
        if (this.FG_TABLE.multiSelectData.length == 1) {
          let target = this.FG_TABLE.multiSelectData[0]
          if (target.status == 2220) {
            this.FG_TABLE.sureBackMoney.data.chargebackAmount = this.FG_TABLE.sureBackMoney.shopMoney = Number(target.chargebackAmount)
            this.FG_TABLE.sureBackMoney.dialogVisible = true;
            this.FG_TABLE.sureBackMoney.data.id = target.id;
          } else {
            this.$message({
              type: 'warning',
              message: "该退货单" + target.statusStr
            })
          }

        } else {
          this.$message({
            type: 'warning',
            message: "请选择一项退货单"
          })
        }

      },
      FG_handleBackMoney(formName){

        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.FG_TABLE.sureBackMoney.shopMoney < this.FG_TABLE.sureBackMoney.data.chargebackAmount){
              this.$message({
                type: 'warning',
                message: '退款金额不得大于售出价格'
              })
              return
            }
            this.$confirm('确认退款？')
              .then(_ => {
                if (!this.FG_TABLE_getLock()) {
                  this.$message.error('请等待上个操作完成！')
                  return false
                }

                this.$http(this.$_.merge({}, Action.Order.returnGoodsList.backMoney, {
                  body:this.FG_TABLE.sureBackMoney.data
                })).then(response => {
                  this.FG_TABLE.sureBackMoney.dialogVisible = false;
                  this.$message({
                    type:'success',
                    message:'退款'+response.body.resultMessage
                  })
                  this.FG_TABLE_releaseLock()
                  this.FG_TABLE_refreshData({
                    page: this.FG_TABLE.pagination.pageFilter.info.currentPage
                  })
                }, response => {
                  this.FG_TABLE_releaseLock()
                  this.$message.error( response.body.resultMessage, response.body)
                })
              }).catch(_ => {});
          } else {
            return true
          }
        })
      },

      // 高级查询 确定
      FG_advQuery_submitForm:function (formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_TABLE.pagination.pageFilter.searchContent = ''
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
      // 高级查询日期范围组件传值
      getDate(val){
        this.FG_advQueryForm.filters.beginTradeTime  = val.dateStart
        this.FG_advQueryForm.filters.endTradeTime  = val.dateEnd
      },


    },
    components: {
      advQuery,DateLink,areaSelect
    },
    mounted() {
    }

  }

</script>
