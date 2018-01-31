<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="shopUnit">
        <div class="container">


          <div class="content">
            <el-row :span="24" class="fg-content-title">
              退货单详情
            </el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row class="baseDetail">

                <el-row :span="24" class="fg-content-title">
                  基本信息
                </el-row>
                <el-row :span="24" class="fg-content-opr">

                  <!--<el-button v-if="FG_chargeBackDetail.baseInfo.status == 3320 " :plain="true" type="primary" size="" @click="FG_handleAuditOrder"><i-->
                      <!--class="fa  fa-edit"></i>  审核-->
                  <!--</el-button>-->
                  <!--<el-tag v-else  type="primary" style="height: 36px;padding: 0 20px; position: relative;top: 0;font-size: 14px;line-height: 36px;border: 0"> 已审核</el-tag>-->

                  <el-button :plain="true" type="primary" size="" @click="FG_handleBack"><i
                    class="fa  fa-mail-reply-all"></i> 返回
                  </el-button>

                </el-row>
                <el-row :span="24" class="fg-content-detail">
                  <el-form ref="advQueryForm" :model="FG_chargeBackDetail.baseInfo" label-width="100px">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="退货单号 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.data.id" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="下单用户 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.data.bName" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <!--<el-col :span="12">-->
                        <!--<el-form-item label="订单类型 ：" prop="">-->
                          <!--<el-input v-model="FG_chargeBackDetail.data.typeStr" disabled></el-input>-->
                        <!--</el-form-item>-->
                      <!--</el-col>-->
                      　


                      <el-col :span="12">
                        <el-form-item label="用户手机 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.data.bMobile" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="订单状态 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.data.statusStr" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="退单时间 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.data.addTimeStr" disabled></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="退货原因 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.data.reason" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="完成时间 ：" prop="">
                          <el-input   v-model="FG_chargeBackDetail.data.finishedTimeStr"  disabled></el-input>
                        </el-form-item>
                      </el-col>

                      <!--<el-col :span="12">-->
                        <!--<el-form-item label="退货单时间 ：" prop="">-->
                          <!--<el-input v-model="FG_chargeBackDetail.data.modifyTime" disabled></el-input>-->
                        <!--</el-form-item>-->
                      <!--</el-col>-->
                      <el-col :span="12">
                        <el-form-item label="退款类型 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.data.typeStr" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="退款金额 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.data.chargebackAmount" disabled></el-input>
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
                  <el-form label-width="150px" ref="dispatchInfoForm" :model="FG_chargeBackDetail.dispatchInfo" :rules="FG_chargeBackDetail.rules" >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="退货联系人 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.dispatchInfo.contract" disabled></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="退货联系电话 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.dispatchInfo.mobile" disabled></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="退货地址 ：" prop="">
                          <area-select disabled ref="area" :province.sync="FG_chargeBackDetail.dispatchInfo.provinceCode" :city.sync="FG_chargeBackDetail.dispatchInfo.cityCode" :area.sync="FG_chargeBackDetail.dispatchInfo.areaCode"></area-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="退货备注 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.dispatchInfo.remark" disabled></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="详细地址 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.dispatchInfo.deliveryAddress" placeholder="详细地址信息" disabled></el-input>
                        </el-form-item>

                      </el-col>
                      <!--<el-col :span="12">-->
                        <!--<el-form-item label="收货地址 ：" prop="">-->
                          <!--<area-select ref="area" :province.sync="FG_chargeBackDetail.dispatchInfo.provinceCode" :city.sync="FG_chargeBackDetail.dispatchInfo.cityCode" :area.sync="FG_chargeBackDetail.dispatchInfo.areaCode" readonly class="readOnly"></area-select>-->
                        <!--</el-form-item>-->
                      <!--</el-col>-->
                      <!--<el-col :span="12">-->
                        <!--<el-form-item label="收货人电话 ：" prop="tid">-->
                          <!--<el-input v-model="FG_chargeBackDetail.dispatchInfo.mobile" readonly class="readOnly"></el-input>-->
                        <!--</el-form-item>-->
                      <!--</el-col>-->
                      <!--<el-col :span="24">-->
                        <!--<el-form-item label="详细地址 ：" prop="tid">-->
                          <!--<el-input v-model="FG_chargeBackDetail.dispatchInfo.deliveryAddress" placeholder="详细地址信息" readonly class="readOnly"></el-input>-->
                        <!--</el-form-item>-->

                      <!--</el-col>-->
                      <el-col :span="12">
                        <el-form-item label="物流公司 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.dispatchInfo.logisticsCompany" disabled=""></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="物流单号 ：" prop="">
                          <el-input v-model="FG_chargeBackDetail.dispatchInfo.logisticsOrderNo" disabled=""></el-input>
                        </el-form-item>
                      </el-col>

                      　


                    </el-row>

                    <!--<el-row :span="24" class="fg-content-opr" v-if="FG_chargeBackDetail.baseInfo.status==3320">-->
                      <!--<el-col :span="24">-->
                        <!--<el-button :plain="true" type="primary" size="" @click="FG_handleEditDispatchInfo('dispatchInfoForm')"><i-->
                          <!--class="fa  fa-edit"></i> 修改-->
                        <!--</el-button>-->
                      <!--</el-col>-->
                    <!--</el-row>-->
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
                      prop="quantity"
                      label="退货数量"
                      width="">
                    </el-table-column>

                    <el-table-column
                      prop="addTimeStr"
                      label="退货时间"
                      width="">
                    </el-table-column>


                  </el-table>
                  <!--<el-pagination-->
                    <!--ref="FG_pagination"-->
                    <!--v-if="FG_TABLE.pagination.setting.paginationShow"-->
                    <!--@size-change="FG_TABLE_handleRowSizeChange"-->
                    <!--@current-change="FG_TABLE_handleCurrentPageChange"-->
                    <!--:current-page.sync="FG_TABLE.pagination.setting.currentPage"-->
                    <!--:page-size.sync="FG_TABLE.pagination.setting.rows"-->

                    <!--:page-sizes="[5, 10, 20, 40]"-->
                    <!--layout="total, sizes, prev, pager, next, jumper"-->
                    <!--:total="FG_TABLE.pagination.pageFilter.info.total"-->
                  <!--&gt;-->
                  <!--</el-pagination>-->
                </el-row>


              </el-row>

            </el-row>
          </div>

          <el-dialog
            title="审核退货单"
            :visible.sync="FG_TABLE.Audit.dialogVisible"
            size="tiny"
          >

            <el-form :model="FG_TABLE.Audit.data">
              <el-row>
                <el-col :span="24">
                  <div class="" style="line-height: 30px;font-size: 14px;color: #434343;position: relative;left: 120px;padding-bottom: 20px">
                    <span class="el-icon-information" style="color: #f7ba2a;display: inline-block;width: 36px;height: 37px;font-size: 30px"></span>
                    <span style="position: relative;top: -5px;font-weight: 700;">是否审核通过客户“退货/退款”请求</span>
                  </div>
                </el-col>

              </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="FG_handleAuditOrderSubmit('1')">不通过</el-button>
                <el-button type="primary" @click="FG_handleAuditOrderSubmit('2')">通过</el-button>
              </span>
          </el-dialog>

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
        tid:"",
        FG_chargeBackDetail: {
          data:{
            provinceCode:'',
            cityCode:'',
            areaCode: "",
            bid: "",
            buyerType: "",
            buyerTypeStr: "",
            chargebackAmount: "",
            chargebackCode: "",
            contract: "",
            deliveryAddress: "",
            id: "",
            logisticsCompany: "",
            logisticsOrderNo: "",
            mobile: "",
            modifyEmpNo: "",
            modifyTime: "",
            pno: "",
            quantity: "",
            sid: "",
            status: "",
            statusStr: "",
            subTid: "",
            supplierType: "",
            supplierTypeStr: "",
            tid:"",
            type: "",
            typeStr: "",
            unitCode: ""
          },

          baseInfo: {},
          dispatchInfo:{
            id:"",
            tid:"",
            contract:"",
            mobile:"",
            provinceCode:'',
            cityCode:'',
            areaCode:"",
            deliveryAddress:"",
            remark:"",
            logisticsCompany: "",
            logisticsOrderNo: "",
          },
          rules:Rules.Order.OrderList.editDispath,
          shopInfo:{
            tabelData:[]
          },


        },

        FG_TABLE: {
          Audit:{
            data:{
              id:'',
              type:''
            },
            dialogVisible:false,
          },
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

        //获取过滤字段
//        for (let i in this.FG_TABLE.pagination.pageFilter.filters) {
//          params[this.FG_TABLE.pagination.pageFilter.filters[i].name] = this.FG_TABLE.pagination.pageFilter.filters[i].value
//        }

        for (let name in this.FG_TABLE.pagination.pageFilter.filters) {
          if (this.FG_TABLE.pagination.pageFilter.filters[name] != "") {
//            if(this.FG_TABLE.pagination.pageFilter.filters.mobile !=""){
//              this.FG_TABLE.pagination.pageFilter.filters.mobile = parseInt(this.FG_TABLE.pagination.pageFilter.filters.mobile)
//            }
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

        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }
        let params = this.FG_TABLE_getParams(this.$_.merge({
          id:this.$route.query.id
        }, option))

        //console.log(params)
        this.$http(this.$_.merge({}, Action.Order.returnGoodsList.detail, {
          params
        })).then(response => {
          // console.log(response)

          this.FG_chargeBackDetail.data = this.FG_chargeBackDetail.baseInfo = response.body

          Helper.FG.setValueToObject(this.FG_chargeBackDetail.dispatchInfo, response.body)
          for(let i = 0; i < response.data.details.length;i++){
            response.data.details[i].addTimeStr = response.body.addTimeStr
          }
          this.FG_TABLE.data = response.body.details
          this.FG_TABLE_releaseLock()
        }, response => {
          this.$message.error(response.body.resultMessage)
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

      // 审核
      FG_handleAuditOrder:function () {
        if (this.FG_chargeBackDetail.baseInfo.status ==3320 ) {
          this.FG_TABLE.Audit.data.id = this.FG_chargeBackDetail.baseInfo.id
          this.FG_TABLE.Audit.dialogVisible = true
        } else {
          this.$message({
            type: 'warning',
            message: "已审核或已退货"
          })
        }
      },

      FG_handleAuditOrderSubmit(val){
        let  params = {
          id : this.FG_TABLE.Audit.data.id,
          type:'2'
        }
        if(val == '1'){
          params.type ='1'
        }
        if(val == '2'){
          params.type ='2'
        }
        this.$http(this.$_.merge({}, Action.Order.returnGoodsList.Audit, {
          body:params
        })).then(response => {
          this.FG_TABLE.Audit.dialogVisible = false
          this.$message.success('审核成功', response.body)
          this.FG_TABLE_releaseLock()
          this.FG_TABLE_refreshData({
            page: this.FG_TABLE.pagination.pageFilter.info.currentPage
          })
        }, response => {
          this.FG_TABLE_releaseLock()
          this.$message.error( response.body.resultMessage, response.body)
        })
      },

      // 编辑配送信息
      FG_handleEditDispatchInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              id:"",
              tid:"",
              contract:"",
              bMobile:"",
              provinceCode:'',
              cityCode:'',
              areaCode:"",
              deliveryAddress:"",
              remark:"",
              logisticsCompany: "",
              logisticsOrderNo: "",
            }
            Helper.FG.setValueToObject(params,this.FG_chargeBackDetail.dispatchInfo)


            this.$http(this.$_.merge({}, Action.Order.InvoiceList.addressInfoEdit, {
              body:params
            })).then(response => {
              this.$message.success("修改配送信息"+response.body.resultMessage)
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




      //helper
      FG_TABLE_handleSelectionChange: function (val) {
        console.log(val)
        this.FG_TABLE.multiSelectData = val
      },
      // 双击行
      FG_TABLE_handleRowDoubleClick: function (row) {
        this.$refs.FG_TABLE.clearSelection() //清除所有的勾选
        this.$refs.FG_TABLE.toggleRowSelection(row, true) //勾选当前行
//        this.FG_TABLE_showEditRowForm()
      },
      //合计
      FG_TABLE_getSummaries(param) {
        console.log(param)
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => parseFloat(value))) {
            sums[5] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[8] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);

            sums[5] += ' 元';
            sums[8] += ' 元';
          } else {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, "");
            sums[index] = '';
          }
        });

        return sums;
      },
      //组件传值
      FG_SELECT_getArea(area){
        this.FG_chargeBackDetail.dispatchInfo.address = area
      },

    },
    components: {
      areaSelect,

    }

  }
</script>


<style lang="scss" scoped="">

  .el-dialog--small{
    padding-right: 30px;
  }
  .baseDetail,.dispatchInfo,.billInfo,.shopInfo,.costInfo {
    margin-bottom: 20px;
    background: white;
    .fg-content-detail{
      background: white;
    }
  }


  .fg-content-opr {
    margin-left: 24px;
  }
</style>
