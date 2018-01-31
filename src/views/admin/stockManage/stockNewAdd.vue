<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          商品入库 - 新增
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-row :span="24" class="fg-content-opr">
            <el-button><i class="fa fa-plus" style="margin-right: 3px"></i>新增</el-button>
            <el-button @click="onStockAddFormSubmit('enterStockAddForm')"><i class="fa fa-floppy-o"
                                                                             style="margin-right: 3px"></i>保存
            </el-button>
            <el-button><i class="fa fa-address-card" style="margin-right: 3px"></i>审核</el-button>
            <el-button @click="selectGoods"><i class="fa fa-list-alt" style="margin-right: 3px"></i>选择商品</el-button>
            <el-button><i class="fa fa-refresh" style="margin-right: 3px"></i>刷新</el-button>
            <el-button @click="scan"><i class="fa fa-desktop" style="margin-right: 3px"></i>扫描</el-button>
            <el-button><i class="fa fa-times" style="margin-right: 3px"></i>删单</el-button>
            <el-button><i class="fa fa-print" style="margin-right: 3px"></i>打印</el-button>
            <el-button><i class="fa fa-folder-open" style="margin-right: 3px"></i>导入</el-button>
            <router-link to="/stock/enterStockManage" style="margin-left: 10px">
              <el-button><i class="fa fa-reply-all" style="margin-right: 3px"></i>返回</el-button>
            </router-link>
          </el-row>

          <el-form :inline="true" :model="enterStockAddForm.data" class="demo-form-inline" label-width="100px"
                   ref="enterStockAddForm" :rules="enterStockAddForm.rules">
            <el-form-item class="enterStockAddTopForm">
              <el-form-item label="业务单号：" prop="oddNum">
                <el-input v-model="enterStockAddForm.data.oddNum" placeholder="业务单号"
                          style="width: 360px;margin-right: 10px"></el-input>
              </el-form-item>
              <el-form-item label="门店：" prop="store_name">
                <el-input v-model="enterStockAddForm.data.store_name" placeholder="门店："
                          style="width: 360px;margin-right: 10px"></el-input>
              </el-form-item>
              <el-form-item label="经手人：" prop="operator_name">
                <el-input v-model="enterStockAddForm.data.operator_name" placeholder="经手人："
                          style="width: 360px"></el-input>
              </el-form-item>
              <el-form-item label="备注：" style="margin-top: 20px" prop="remark">
                <el-input v-model="enterStockAddForm.data.remark" placeholder="备注：" style="width: 831px;"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item class="enterStockAddTable">
              <el-table
                v-loading="loadingState"
                :data="tableData"
                border
                show-summary
                :summary-method="getSummaries"
                style="width: 1518px">
                <el-table-column
                  prop="id"
                  label="序号"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="oddNum"
                  label="货号"
                  width="170">
                </el-table-column>
                <el-table-column
                  prop="commodityName"
                  label="品名">
                </el-table-column>
                <el-table-column
                  prop="standard"
                  label="规格">
                </el-table-column>
                <el-table-column
                  prop="unit"
                  label="单位">
                </el-table-column>
                <el-table-column
                  prop="casesNum"
                  label="箱数">
                </el-table-column>
                <el-table-column
                  prop="num"
                  label="数量">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="价格">
                </el-table-column>
                <el-table-column
                  prop="subMinimum"
                  label="小计金额">
                </el-table-column>
                <el-table-column
                  prop="produceDate"
                  label="生产日期">
                </el-table-column>
                <el-table-column
                  prop="remark"
                  label="备注">
                </el-table-column>
                <el-table-column
                  prop="operation"
                  label="操作"
                  width="140">
                  <template scope="scope">
                    <el-button
                      size="small"
                      @click="handleEdit(scope.$index, scope.row)">增加
                    </el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item>
              <el-form-item label="制单人员：" prop="docMaker_name">
                <el-input v-model="enterStockAddForm.data.docMaker_name" placeholder="制单人员"></el-input>
              </el-form-item>
              <el-form-item label="制单日期：" prop="docMaker_date">
                <el-input v-model="enterStockAddForm.data.docMaker_date" placeholder="制单日期"></el-input>
              </el-form-item>
              <el-form-item label="审核人员：" prop="auditor_name">
                <el-input v-model="enterStockAddForm.data.auditor_name" placeholder="审核人员"></el-input>
              </el-form-item>
              <el-form-item label="审核日期：" prop="auditor_date">
                <el-input v-model="enterStockAddForm.data.auditor_date" placeholder="审核日期"></el-input>
              </el-form-item>
            </el-form-item>
          </el-form>

          <!-- 编辑表格记录 -->
          <el-dialog title="商品扫描" :visible.sync="commodityScanning.is_show">
            <el-form ref="editFrom" :model="commodityScanning.data" label-width="110px"
                     :rules="commodityScanning.rules">
              <el-form-item label="商品条码" prop="barCode">
                <el-input v-model="commodityScanning.data.barCode"></el-input>
              </el-form-item>
              <el-form-item label="数量" prop="num">
                <el-input v-model="commodityScanning.data.num"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="commodityScanning.is_show = false">取 消</el-button>
              <el-button type="primary" @click="onCommodityScanning('editFrom')">更新</el-button>
            </div>
          </el-dialog>
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  export default{
    data (){
      return {
        title: '商品入库—新增',
        commodityScanning: {
          name: 'commodityScanningForm',
          is_show: false,
          is_remote_data: true, //编辑时是否需要重新获取数据
          data: {
            barCode: '',
            num: ''
          },
          rules: Rules.commodityScanning
        },
        enterStockAddForm: {
          data: {
            id: '',
            oddNum: '',
            store_name: '',
            operator_name: '',
            remark: '',
            docMaker_name: '',
            docMaker_date: '',
            auditor_name: '',
            auditor_date: ''
          },

          rules: Rules.enterStockManage
        },
        tableData: [
          {
            id: '3',
            oddNum: 'IO-888-170517-0010',
            commodityName: '商品三',
            standard: '大',
            unit: '箱',
            casesNum: '12',
            num: '12',
            price: '1',
            subMinimum: '12',
            produceDate: '2017-02-02',
            remark: '商品三',
            operation: ''
          },
          {
            id: '2',
            oddNum: 'IO-888-170517-0010',
            commodityName: '商品二',
            standard: '小',
            unit: '箱',
            casesNum: '11',
            num: '11',
            price: '1',
            subMinimum: '11',
            produceDate: '2017-02-02',
            remark: '商品三',
            operation: ''
          },
          {
            id: '1',
            oddNum: 'IO-888-170517-0010',
            commodityName: '商品一',
            standard: '中',
            unit: '箱',
            casesNum: '10',
            num: '10',
            price: '1',
            subMinimum: '10',
            produceDate: '2017-02-02',
            remark: '商品三',
            operation: ''
          }
        ],
        loadingState: true,
        loadingText: '',
        messageTips: {
          type: '',
          message: ''
        },
        tips: '',
      }
    },
    created: function () {
      let that = this
      setTimeout(function () {
        that.initTableData()
      }, 3000)

    },
    methods: {

      newAdd: function () {

      },
      refresh: function () {

      },

      //      初始化数据
      initTableData: function () {
        this.$http(this.$_.merge({}, Action.enterStockGoods.list, {})).then(response => {
          this.loadingState = false
          this.tableData = response.body
          this.messageTips.type = 'success'
          this.messageTips.message = '数据加载成功'
          Helper.COMMON.openMessage(this)
        }, response => {
          this.loadingState = false
          this.messageTips.type = 'error'
          this.messageTips.message = '数据加载失败'
          Helper.COMMON.openMessage(this)
        })
      },
//      合计方法
      getSummaries(param) {
        const {columns, data} = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总价'
            return
          }
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
            sums[index]
          } else {
            sums[index]
          }
        })

        return sums
      },
//      编辑删除Row
      handleEdit(index, row) {
        console.log(index, row)
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      //      保存
      onStockAddFormSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交
            this.tips = '确认保存数据'
            this.$confirm(this.tips)
              .then(_ => {
                this.loadingState = true
                this.loadingText = '正在保存数据，请稍后'

                console.log(this.enterStockAddForm.data)
                this.$http(this.$_.merge({}, Action.enterStockManage.add, {
                  url: Helper.FG.setParams(Action.enterStockManage.add.url),
                  body: this.enterStockAddForm.data
                })).then(response => {
                  this.enterStockAddForm.data = {
                    id: '',
                    oddNum: '',
                    store_name: '',
                    operator_name: '',
                    remark: '',
                    docMaker_name: '',
                    docMaker_date: '',
                    auditor_name: '',
                    auditor_date: ''
                  }

                  this.loadingState = false
                  this.initTableData()
                  this.messageTips.type = 'success'
                  this.messageTips.message = '数据保存成功'
                  Helper.COMMON.openMessage(this)
                }, response => {
                  this.loadingState = false
                  this.messageTips.type = 'error'
                  this.messageTips.message = '数据保存失败'
                  Helper.COMMON.openMessage(this)
                })
              })
              .catch(_ => {})

          } else {
            return false
          }
        })
      },
      selectGoods: function () {
        alert('选择商品')
      },
      scan: function () {
        this.commodityScanning.is_show = true
      },
      onCommodityScanning: function (formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交
            this.tips = '确认扫描'
            this.$confirm(this.tips)
              .then(_ => {
                this.commodityScanning.is_show = false
                this.loadingState = true
                this.loadingText = '正在扫描，请稍后'

                this.$http(this.$_.merge({}, Action.enterStockManage.update, {
                  url: Helper.FG.setParams(Action.enterStockManage.update.url,),
                  body: this.commodityScanning.data
                })).then(response => {
                  this.commodityScanning.data = {
                    barCode: '',
                    num: ''
                  }

                  this.loadingState = false
                  this.messageTips.type = 'success'
                  this.messageTips.message = '扫描成功'
                  Helper.COMMON.openMessage(this)
                }, response => {
                  this.loadingState = false
                  this.messageTips.type = 'error'
                  this.messageTips.message = '扫描失败'
                  Helper.COMMON.openMessage(this)
                })
              })
              .catch(_ => {})

          } else {
            return false
          }
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/_param.scss";
  @import "../../../assets/admin/css/stockManage/stockNewAdd.scss";
</style>

