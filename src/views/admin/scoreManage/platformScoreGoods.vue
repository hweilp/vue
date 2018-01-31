<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="scoreExchangePlatformGoods">
        <div class="container">
          <div class="content">

            <el-row :span="24" class="fg-content-title">兑换平台商品</el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="15" style="background: white;border-radius:4px;padding: 20px;width: 1200px ">
                <el-form ref="createInvoiceForm" :model="FG_OrderDetail.createInvoice.data" label-width="120px"
                         :rules="FG_OrderDetail.editDispath.rules">
                  <el-row :span="24">
                    <el-col :span="12">
                      <el-form-item label="经销商 ：" prop="">
                        <el-input v-model="FG_OrderDetail.createInvoice.data.logisticsCompany "></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="经销商名称 ：" prop="">
                        <el-input v-model="FG_OrderDetail.createInvoice.data.logisticsOrderNo "></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="累计积分 ：" prop="">
                        <el-input v-model="FG_OrderDetail.createInvoice.data.fee"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="可用积分 ：" prop="">
                        <el-input v-model="FG_OrderDetail.createInvoice.data.fee"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="状态 ：" prop="">
                        <el-input v-model="FG_OrderDetail.createInvoice.data.fee"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="本次使用积分 ：" prop="">
                        <!--<span>{{FG_OrderDetail.createInvoice.data.fee}}</span>-->
                        <span style="font-size: 16px;color: #458EDF;font-weight: 700;">3600</span>

                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="收货地址 ：" prop="">
                        <el-input v-model="FG_OrderDetail.createInvoice.data.fee"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-row>
              <el-row :span="24" class="fg-content-opr">
                <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showAddRowForm"><i
                  class="fa fa-plus"></i> 新增
                </el-button>

                <el-button :plain="true" type="danger" size="" @click="FG_TABLE_showDeleteRowForm"><i
                  class="fa fa-remove"></i> 删除
                </el-button>
                <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showExchangeRowForm"><i
                  class="fa fa-exchange"></i> 兑换
                </el-button>

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
                show-summary
                :summary-method="FG_TABLE_getSummaries"
                @selection-change="FG_TABLE_handleSelectionChange"
                @row-dblclick="FG_TABLE_handleRowDoubleClick"
                :default-sort="{prop: 'code', order: 'descending'}"
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
                  prop="code"
                  label="积分商品编码"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="积分商品名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="mnemonicCode"
                  label="每份数量"
                  width="120"
                >
                </el-table-column>
                <el-table-column
                  prop="mnemonicCode"
                  label="可兑换总份数"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="mnemonicCode"
                  label="剩余可兑换份数"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="mnemonicCode"
                  label="每份消耗积分"
                  width="120"
                >
                </el-table-column>
                <el-table-column
                  prop="mnemonicCode"
                  label="开始时间"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="mnemonicCode"
                  label="结束时间"
                  width="120"
                >
                </el-table-column>
                <el-table-column
                  prop="mnemonicCode"
                  label="兑换数量"
                  width="120"
                >
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="共消耗积分"
                  width="120"
                >
                </el-table-column>

                <el-table-column
                  prop=""
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

              <el-dialog
                title="提示"
                :visible.sync="FG_OrderDetail.removeOrderDialogVisible"
                size="tiny"
              >
                <div class=""
                     style="line-height: 30px;font-size: 14px;color: #434343;position: relative;left: 10px;padding-bottom: 0px">
                  <span class="el-icon-information"
                        style="color: #f7ba2a;display: inline-block;width: 36px;height: 37px;font-size: 30px"></span>
                  <span style="position: relative;top: -5px;font-weight: 700;">确定删除所选商品吗?</span>
                </div>

                <span slot="footer" class="dialog-footer">
                <el-button @click="FG_OrderDetail.removeOrderDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="FG_OrderDetail_removeOrderSubmit('removeOrderForm')">确 定</el-button>
              </span>
              </el-dialog>
              <el-dialog
                title="编辑信息"
                :visible.sync="FG_TABLE.editRow.is_show"
                size="small">
                <el-row>
                  <el-form ref="editForm" :model="FG_TABLE.editRow.data" label-width="120px"
                           :rules="FG_TABLE.editRow.rules">
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="每份消耗积分 ：" prop="quantity">
                          <el-input v-model="FG_TABLE.editRow.data.quantity"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item label="兑换数量 ：" prop="couponAmount">
                          <el-input v-model="FG_TABLE.editRow.data.couponAmount"></el-input>
                        </el-form-item>
                      </el-col>


                      <el-col :span="24" style="text-align: right">
                        <el-button @click="FG_TABLE.editRow.is_show = false">取 消</el-button>
                        <el-button type="primary" @click="FG_TABLE_handleEditFormSubmit('editForm')">确认</el-button>
                      </el-col>
                    </el-row>

                  </el-form>


                </el-row>

              </el-dialog>
              <product-select
                :DefaultSelectType="1"
                :productSelectVisible.sync="FG_TABLE.productSelectShow"
                @dialogShowStatusChange="changeProductSelectShowStatus">
                @productSelectOne="handleProductSelectOneRes"
                @productSelectMore="handleProductSelectMoreRes"
              </product-select>

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
  import ProductSelect from '@/components/compos/product/product-select.vue'
  export default {
    data () {
      return {
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
            tabelDate: [],
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
        },
        FG_TABLE: {
          productSelectShow: false,
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
              mnemonicCode: ""
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
                endTradeTime: '',
                payStatus: "",
                invoiceStatus: ""
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
      }
    },
    created () {
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
        for (let i in this.FG_TABLE.pagination.pageFilter.filters) {
          params[this.FG_TABLE.pagination.pageFilter.filters[i].name] = this.FG_TABLE.pagination.pageFilter.filters[i].value
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
          status: 1,
        }, option))

        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }

        this.$http(this.$_.merge({}, Action.Product.Brand.list, {
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

      handleProductSelectOneRes(val){

      },

      handleProductSelectMoreRes(val){

      },


      //helper
      FG_pagination_reset: function () {
        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
          this.FG_TABLE_releaseLock()
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
          this.FG_TABLE_releaseLock()
        }
      },
      //合计
      FG_TABLE_getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, "");
            sums[index] += '';
          } else {
            sums[11] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, "");
            sums[11] += ' 分';
          }
        });

        return sums;
      },

      // 组件传值
      changeProductSelectShowStatus: function (val) {
        this.FG_TABLE.productSelectShow = val
      },

      // opr
      // 双击行
      FG_TABLE_handleRowDoubleClick: function (row) {
        this.$refs.FG_TABLE.clearSelection() //清除所有的勾选
        this.$refs.FG_TABLE.toggleRowSelection(row, true) //勾选当前行
        this.FG_TABLE_showEditRowForm()
      },
      // 编辑
      FG_TABLE_showEditRowForm: function () {

        if (this.FG_TABLE.multiSelectData.length === 1) {

          let target = this.FG_TABLE.multiSelectData[0]

          Helper.FG.setValueToObject(this.FG_TABLE.editRow.data, target)

          this.FG_TABLE.editRow.is_show = true

        } else {
          this.$message({
            type: 'warning',
            message: '请选择一项数据'
          })
        }

      },
      // 显示每页的数据条数改变
      FG_TABLE_handleRowSizeChange(val) {
        this.FG_TABLE.pagination.setting.rows = val
        this.FG_pagination_reset()

      },

      // 页码发生改变
      FG_TABLE_handleCurrentPageChange: function (val) {
        this.FG_TABLE_refreshData({
          page: val
        })
        this.FG_TABLE_releaseLock()
      },
      FG_TABLE_handleSelectionChange: function (val) {
        this.FG_TABLE.multiSelectData = val
      },
      FG_TABLE_showAddRowForm(){
        this.FG_TABLE.productSelectShow = true
      },
      FG_TABLE_showDeleteRowForm(){
        this.FG_OrderDetail.removeOrderDialogVisible = true
      },
      FG_OrderDetail_removeOrderSubmit(){
        this.FG_OrderDetail.removeOrderDialogVisible = false
      },
      FG_TABLE_showExchangeRowForm(){
        this.$router.push({path: "/score/exchangeRecord", query: {}})
      }
    },
    mounted () {

    },
    components: {
      ProductSelect,
    },
  }
</script>

<style lang="scss" scoped>

</style>
