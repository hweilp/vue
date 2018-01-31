<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="shopUnit">
        <div class="container">

          <div class="content">
            <el-row :span="24" class="fg-content-title">
              平台订单列表
            </el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-opr">
                <!--<el-button :plain="true" type="primary" size="" @click="FG_ORDER_showAddRowForm"><i-->
                  <!--class="fa fa-plus"></i> 新增线下订单-->
                <!--</el-button>-->
                <el-select v-model="FG_TABLE.pagination.pageFilter.filters.status" placeholder="交易状态" style="margin-left: 10px;">
                  <el-option  v-for="item in FG_TABLE.pagination.pageFilter.tradeStatusOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                  </el-option>
                </el-select>

                <!-- 搜索  -->
                <el-input
                  class="fg-search-input"
                  placeholder="输入订单号/收货人进行查询"
                  icon="search"
                  v-model="FG_TABLE.pagination.pageFilter.searchContent"
                  :on-icon-click="FG_TABLE_handleTableSearch"
                  @keyup.enter.native="FG_TABLE_handleTableSearch">
                </el-input>
                <adv-query left="left:510px">
                  <el-form ref="advQueryForm" :model="FG_advQueryForm.filters" label-width="100px" :rules="FG_TABLE.pagination.pageFilter.rules">
                    <el-row>

                      <el-row :span="24">
                        <el-col :span="24">
                          <el-form-item label="下单时间 ：" >
                            <date-link  :label="FG_advQueryForm.labelTitle" @on-get-date="getDate"></date-link>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="付款状态 ：" prop="payStatus" style="position: relative;">
                            <el-select v-model="FG_advQueryForm.filters.payStatus" placeholder="已付款" style="width: 360px">
                              <el-option label="全部状态" value=""></el-option>
                              <el-option label="待付款" :value="2120"></el-option>
                              <el-option label="已付款" :value="2190"></el-option>
                              <el-option label="已退款" :value="2290"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="发货状态 ：" prop="invoiceStatus" style="position: relative;">
                            <el-select v-model="FG_advQueryForm.filters.invoiceStatus" placeholder="待发货" style="width: 360px">
                              <el-option label="全部状态" value=""></el-option>
                              <el-option label="未发货" :value="3110"></el-option>
                              <el-option label="待发货" :value="3120"></el-option>
                              <el-option label="部分发货" :value="3150"></el-option>
                              <el-option label="已发货" :value="3190"></el-option>
                              <el-option label="待收货" :value="3220"></el-option>
                              <el-option label="已收货" :value="3290"></el-option>
                              <el-option label="已退货" :value="3390"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>

                        <!-- <el-col :span="6">
                           <el-form-item label="支付方式 ：" prop="payType" style="position: relative;">
                             <el-select v-model="FG_advQueryForm.filters.payType" placeholder="支付宝" style="width: 360px">
                               <el-option label="线下支付" :value="10"></el-option>
                               <el-option label="联动支付" :value="20"></el-option>
                               <el-option label="支付宝支付" :value="30"></el-option>
                               <el-option label="微信支付" :value="40"></el-option>
                             </el-select>
                           </el-form-item>
                         </el-col>-->
                        <el-col :span="6">
                          <el-form-item label="配送方式 ：" prop="type" style="position: relative;">
                            <el-select v-model="FG_advQueryForm.filters.type" placeholder="无配送" style="width: 360px">
                              <el-option label="全部方式" value=""></el-option>
                              <el-option label="无配送" :value="1"></el-option>
                              <el-option label="到店自提" :value="2"></el-option>
                              <el-option label="快递配送" :value="3"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>


                      <el-col :span="6">
                        <el-form-item label="收货人 ：" prop="contact">
                          <el-input v-model="FG_advQueryForm.filters.contact"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="手机号 ：" prop="mobile">
                          <el-input v-model="FG_advQueryForm.filters.mobile"></el-input>
                        </el-form-item>
                      </el-col>


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
                  prop="tid"
                  label="订单号"
                  width="150"
                >
                  <template scope="scope">
                    <p @click="FG_TABLE_handleCellClick(scope.$index, scope.row.tid)" :id="scope.row.tid"><span>{{ scope.row.tid }}</span></p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="bName"
                  label="下单员工"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="contact"
                  label="收货人"
                  width="90"
                >
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  label="收货人手机号"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop="deliveryAddress"
                  label="收货地址"
                   >
                </el-table-column>
                <el-table-column
                  prop="tradeTypeStr"
                  label="订单类型"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dueAmount"
                  label="订单总额"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dueAmount"
                  label="应付金额"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="statusStr"
                  label="交易状态"
                  width="120">
                </el-table-column>
                <!--<el-table-column-->
                <!--prop="statusStr"-->
                <!--label="订单状态"-->
                <!--width="120">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--prop=""-->
                <!--label="付款状态"-->
                <!--width="120">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--prop=""-->
                <!--label="发货状态"-->
                <!--width="120">-->
                <!--</el-table-column>-->

                <el-table-column
                  prop="tradeTimeStr"
                  label="下单时间"
                  show-overflow-tooltip>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/comm";

  .el-select{
    width: 120px !important;
  }
  .el-form-item .el-input{
    width: 120px !important;
  }

</style>


<script>

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import advQuery from '@/components/compos/query/advQuery.vue'
  import DateLink from '@/components/compos/dateLink/date-link.vue'
  export default {

    data (){
      return {
        FG_advQueryForm:{
          filters: {
            status:"",
            payAmountType:"",
            deliverGoodsType:"",
            type:"",
            payType:"",
            contact:"",
            mobile:"",
            beginTradeTime:"",
            endTradeTime:'',
            payStatus:"",
            invoiceStatus:""
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
                contact:"",
                mobile:"",
                beginTradeTime:"",
                endTradeTime:'',
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
                {value: 2120, label: "待付款"},
                {value: 2190, label: "已付款"},
                {value: 3150, label: "部分发货"},
                {value: 3190, label: "已发货"},
                {value: 3290, label: "已收货"},
                {value: 9990, label: "交易完成"},

                {value: 3320, label: "申请退货"},
//                {value: 3350, label: "确认申请"},
                {value: 2220, label: "待退款"},
                {value: 2290, label: "已退款"},


                {value: 3351, label: "退回申请"},
                {value: 3390, label: "已退货"},

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
      }
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
        if(params.payStatus){
          params.status = params.payStatus
        }
        if(params.invoiceStatus){
          params.status = params.invoiceStatus
        }
        if(params.beginTradeTime){
          params.beginTradeTime = Helper.FG.formatDate(params.beginTradeTime,'/')
        }
        if(params.endTradeTime){
          params.endTradeTime = Helper.FG.formatDate(params.endTradeTime,'/')
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

        let params = this.FG_TABLE_getParams(this.$_.merge({}, option))


        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }
        this.$http(this.$_.merge({}, Action.Order.platformOrder.list, {
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

      FG_pagination_reset: function () {
        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
        }
      },
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
        let options = {}
        if (this.FG_TABLE.pagination.pageFilter.searchContent === '') {
          this.$message({
            type : 'warning',
            message : '请填写搜索的内容'
          })
          return false
        }

        this.FG_TABLE_refreshData()
      },

      // 高级查询 确定
      FG_advQuery_submitForm:function (formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            Helper.FG.setValueToObject( this.FG_TABLE.pagination.pageFilter.filters, this.FG_advQueryForm.filters)
            this.FG_TABLE_refreshData()
          } else {
            return false;
          }
        });
      },
      // 高级查询日期范围组件传值
      getDate(val){
        this.FG_advQueryForm.filters.beginTradeTime  = val.dateStart
        this.FG_advQueryForm.filters.endTradeTime  = val.dateEnd
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
        this.$router.push({path:'/orderManage/platformOrderDetail',query:{tid:row}})
      },


    },
    components: {
      advQuery,DateLink
    },
    mounted() {
    }

  }

</script>
