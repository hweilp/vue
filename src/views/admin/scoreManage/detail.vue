<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="scoreDetail">
        <div class="container">
          <div class="content">

            <el-row :span="24" class="fg-content-title">兑换明细 - 列表</el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-opr">
                <el-input
                  class="fg-search-input"
                  placeholder="输入订单号/收货人进行查询"
                  icon="search"
                  v-model="FG_TABLE.pagination.pageFilter.searchContent"
                  :on-icon-click="FG_TABLE_handleTableSearch">
                </el-input>
                <adv-query left="left:380px">
                  <el-form ref="advQueryForm" :model="FG_advQueryForm.filters" label-width="100px" :rules="FG_TABLE.pagination.pageFilter.rules">
                    <el-row>

                      <el-row :span="24">
                        <date-link  :label="FG_advQueryForm.labelTitle" @on-get-date="getDate"></date-link>
                      <el-col :span="12">
                        <el-form-item label="用户姓名 ：" prop="contact">
                          <el-input v-model="FG_advQueryForm.filters.contact"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="商品名称 ：" prop="mobile">
                          <el-input v-model="FG_advQueryForm.filters.mobile"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="操作人 ：" prop="mobile">
                          <el-input v-model="FG_advQueryForm.filters.mobile"></el-input>
                        </el-form-item>
                      </el-col>


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
                  prop="tid"
                  label="积分商品编码"
                  width="150"
                >
                  <template scope="scope">
                    <p @click="FG_TABLE_handleCellClick(scope.$index, scope.row.tid)" :id="scope.row.tid"><span>{{ scope.row.tid }}</span></p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="sid"
                  label="商品名称"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="contact"
                  label="兑换单号"
                  width="150"
                >
                  <template scope="scope">
                    <p @click="FG_TABLE_handleCellClick(scope.$index, scope.row.tid)" :id="scope.row.tid"><span>{{ scope.row.tid }}</span></p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="mobile"
                  label="兑换用户"
                  width="140">
                </el-table-column>
                <el-table-column
                  prop=""
                  label="每份数量"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="tradeTypeStr"
                  label="兑换份数"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dueAmount"
                  label="每份消耗积分"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="dueAmount"
                  label="共消耗积分"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="statusStr"
                  label="操作人"
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
                  prop="tradeTime"
                  label="兑换日期"
                  show-overflow-tooltip>
                </el-table-column>


              </el-table>


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
  export default {

    data (){
      return {
        FG_advQueryForm:{
          labelTitle:"兑换日期 ：",
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
          params.beginTradeTime = Helper.FG.formatDate(params.beginTradeTime,"/")
        }
        if(params.endTradeTime){
          params.endTradeTime = Helper.FG.formatDate(params.endTradeTime,"/")
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
        this.$http(this.$_.merge({}, Action.Order.OrderList.list, {
          params
        })).then(response => {
          //表格数据
          let result = response.body

          this.FG_TABLE.data = result.data

          Helper.FG.setValueToObject(this.FG_TABLE.pagination.pageFilter.info, result.pagination)

          this.FG_TABLE_releaseLock()
        }, response => {
          this.$message.error(response.body.resultMessage);
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
        this.$router.push({path:'/score/exchangeFormDetail',query:{tid:row}})
      },

      getDate(val){
        this.FG_TABLE.pagination.pageFilter.filters.dateStart = val.dateStart
        this.FG_TABLE.pagination.pageFilter.filters.dateEnd = val.dateEnd
      }


    },
    components: {
      advQuery,
      DateLink
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
