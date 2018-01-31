<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          库存盘点 - 编辑
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-row :span="24" class="fg-content-opr">

            <el-button :plain="true" type="primary" size="" @click="FG_handleOrderSave" :disabled="FG_order.readonly"><i
              class="fa fa-save"></i> 保存
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="FG_handleOrderAudit"
                       :disabled="FG_order.orderStatus" v-if="!FG_order.orderStatus"><i
              class="fa fa-edit"></i> 审核
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="handleProductSelect" :disabled="FG_order.readonly">
              <i
                class="fa fa-list-alt"></i> 选择商品
            </el-button>
            <!--  @productSelectOne="handleProductSelectOneRes"
              @productSelectMore="handleProductSelectMoreRes"-->
            <product-select
              :DefaultSelectType.sync="FG_order.DefaultSelectType"
              :productSelectVisible.sync="FG_order.ProductSelectShow"
              @dialogShowStatusChange="changeProductSelectShowStatus"
              @productSelectOne="handleProductSelectOneRes"
              @productSelectMore="handleProductSelectMoreRes"
            >
            </product-select>
            <el-button :plain="true" type="primary" size="" @click="FG_handleOrderRefesh" style="margin-left: 10px"><i
              class="fa fa-refresh"></i> 刷新
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="FG_handleOrderDelete" v-if="!FG_order.orderStatus"
                       :disabled="FG_order.readonly"><i
              class="fa fa-times"></i> 删单
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="FG_handleOrderBack"><i
              class="fa fa-reply-all"></i> 返回
            </el-button>
          </el-row>
          <el-row :span="24">
            <div class="commonPanel">
              <el-form class="demo-form-inline" label-width="100px" ref="enterStockAddForm" :inline="true">
                <el-row :span="24">
                  <el-form-item label="订单号：" prop="FG_order.data.id">
                    <el-input v-model="FG_order.data.id" placeholder="" disabled></el-input>
                  </el-form-item>
                </el-row>
                <el-row :span="24">
                  <el-form-item label="备注：" prop="remark ">
                    <el-input v-model="FG_order.data.remark" placeholder="" style="width: 850px"
                              :disabled="FG_order.readonly"></el-input>
                  </el-form-item>
                </el-row>
                <el-row class="status" v-if="FG_order.orderStatusShow">

                  <div v-if="FG_order.orderStatus" class="have">已审核</div>

                  <div v-else="FG_order.orderStatus" class="no">未审核</div>
                </el-row>
              </el-form>
            </div>
            <el-table
              :data="FG_order.data.stockRecords "
              border
              :summary-method="getSummaries"
              show-summary
              row-class-name="productTableRow">
              <el-table-column

                label="序号"
                type="index"
                width="70">
                <template scope="scope">
                  <el-button v-if="!scope.row.delete&&!FG_order.readonly"
                             size="small"
                             type="primary"
                             @click="handleTableRowAdd(scope.$index, scope.row)">增加
                  </el-button>
                  <p v-else="">{{scope.$index+1}}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="pno"
                label="商品编码">
                <template scope="scope">
                  <p>
                    {{ scope.row.pno }}
                    <i @click="handleProductSelectOne(scope)" class="fa fa-ellipsis-h"
                       v-if="scope.row.delete&&!FG_order.readonly"></i>
                  </p>
                </template>

              </el-table-column>
              <el-table-column
                prop="commodityName"
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="unitName"
                label="单位">
              </el-table-column>
              <el-table-column
                prop="afterTotal"
                label="当前库存"
                class-name="afterTotal">
                <template scope="scope">
                  <el-input v-model.number="scope.row.afterTotal" @change="handleMultiplierChange(scope)"
                            type="number" @blur="inputBlur(scope)" :readonly="FG_order.readonly"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="beforeTotal"
                label="系统库存">
              </el-table-column>
              <el-table-column
                prop="changeNum"
                label="盈亏数量">
              </el-table-column>
              <el-table-column
                prop="buyingPrice"
                label="零售单价">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="盈亏金额">
              </el-table-column>

              <el-table-column
                prop="remark"
                label="备注"
                class-name="remark">
                <template scope="scope">
                  <el-input v-model="scope.row.remark" :readonly="FG_order.readonly"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                class-name="operate">
                <template scope="scope">
                  <el-button v-if="scope.row.delete&&!FG_order.readonly"
                             size="small"
                             type="danger"
                             @click.native.prevent="handleTableRowDelete(scope.$index, FG_order.data.stockRecords )">删除
                  </el-button>

                </template>
              </el-table-column>
            </el-table>

          </el-row>
          <el-row style="margin-top: 20px">
            <el-form class="demo-form-inline" label-width="100px" :inline="true">


              <el-form-item label="制表人员：" prop="createEmpName ">
                <el-input v-model="FG_order.data.createEmpName" placeholder="" style="width: 158px" disabled></el-input>
              </el-form-item>
              <el-form-item label="制表日期：" prop="createTimeStr ">
                <el-input v-model="FG_order.data.createTimeStr" placeholder="" style="width: 158px" disabled></el-input>
              </el-form-item>
              <el-form-item label="审核人员：" prop="auditEmpName ">
                <el-input v-model="FG_order.data.auditEmpName" placeholder="" style="width: 158px" disabled></el-input>
              </el-form-item>
              <el-form-item label="审核日期：" prop="auditTimeStr ">
                <el-input v-model="FG_order.data.auditTimeStr" placeholder="" style="width: 158px" disabled></el-input>
              </el-form-item>


            </el-form>
          </el-row>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .el-table__body-wrapper {

  .afterTotal > .cell, .buyingPrice > .cell, .remark > .cell, .amount > .cell, .promoteDateStr > .cell {
    padding: 0 !important;

  .el-input__inner {
    border: none !important;
    border-radius: 0 !important;
    outline: none !important;
    padding-left: 18px;
  }

  }
  }

  .productTableRow {

  &:hover {

  .afterTotal > .cell input, .buyingPrice > .cell input, .remark > .cell input, .amount > .cell input, .promoteDateStr > .cell input {
    background: #EEF1F6 !important;

  &:focus {
    background: #FFF !important;
  }

  }
  }
  }
  .el-table__footer-wrapper .buyingPrice, .el-table__footer-wrapper .remark, .el-table__footer-wrapper .amount, .el-table__footer-wrapper .afterTotal, .el-table__footer-wrapper .promoteDateStr {
    padding-left: 10px;
  }

  .status {
    position: absolute;
    left: 1053px;
    top: 65px;
    width: 110px;
    height: 40px;
    font-size: 15px;
    line-height: 40px;
    text-align: center;

  .no {
    width: 100%;
    height: 100%;
    border: 1px solid #EFA8AC;
    color: #F62B2B;
    background: #F7D1D3 url('../../../assets/admin/images/u1386.png') no-repeat 20px;
    background-size: 16px 16px;
    padding-left: 30px;
  }

  .have {
    width: 100%;
    height: 100%;
    border: 1px solid #12CE66;
    color: #12CE66;
    background: #C6EBD6 url('../../../assets/admin/images/u2042.png') no-repeat 20px;
    background-size: 16px 16px;
    padding-left: 30px;
  }

  }
</style>

<script type="text/javascript">
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import productSelect from '@/components/compos/product/product-select'
  import employeeSelect from '@/components/compos/employee/employee-select'

  export default {
    data(){
      return {
        FG_order: {
          data: {
            amount: '',
            remark: '',
            createEmpName: '',
            createTimeStr: '',
            auditEmpName: '',
            auditTimeStr: '',
            id: '',
            status: '',
            stockRecords: [

              {
                delete: true
              },
              {
                delete: true
              },
              {
                delete: true
              },
              {
                delete: false
              },
            ]
          },
          orderStatus: false,
          orderStatusShow: false,
          readonly: false,
          id: '',
          ProductSelectShow: false,
          DefaultSelectType: '',
          rowIndex: ''
        }
      }
    },
    created: function () {
      if (this.$route.query.tid) {
        //查询单条订单信息
        this.$http(this.$_.merge({}, Action.Stock.stockCheck.singleStockOrder, {
          params: this.$route.query
        }))
          .then(response => {
            this.FG_order.data.id = response.body.id
            this.FG_order.data.remark = response.body.remark
            this.FG_order.data.createEmpName = response.body.createEmpName
            this.FG_order.data.createTimeStr = response.body.createTimeStr
            this.FG_order.data.auditEmpName = response.body.auditEmpName
            this.FG_order.data.auditTimeStr = response.body.auditTimeStr
            this.FG_order.data.status = response.body.status
            if (this.FG_order.data.status == 1) {
              this.FG_order.orderStatusShow = true
              this.FG_order.orderStatus = false
              this.FG_order.readonly = false
            } else if (this.FG_order.data.status == 2) {
              this.FG_order.orderStatusShow = true
              this.FG_order.orderStatus = true
              this.FG_order.readonly = true
            } else {
              this.FG_order.orderStatusShow = false
              this.FG_order.orderStatus = true
              this.FG_order.readonly = true
            }
            for (let i = 0; i < response.body.records.length; i++) {
              response.body.records [i].delete = true
              response.body.records [i].buyingPrice = response.body.records [i].price
              response.body.records [i].initialStock = response.body.records [i].beforeTotal
              this.FG_order.data.stockRecords.splice(0, 0, response.body.records [i])
            }

            this.FG_order.data.stockRecords.concat(this.FG_order.data.stockRecords, response.body.records)
          }, response => {
            this.$message.error(response.body.resultMessage, response.body)
          })
      }
    },
    methods: {
      //订单保存
      FG_handleOrderSave(){

        if (this.FG_order.orderStatus == false) {
          let stockRecords = []
          for (let i = 0; i < this.FG_order.data.stockRecords.length; i++) {
            if (this.FG_order.data.stockRecords [i].pno !== undefined) {
              stockRecords.push(this.FG_order.data.stockRecords [i])
            }
          }
          if (stockRecords.length == 0) {
            this.$message({
              type: 'warning',
              message: '请选择商品'
            })
            return false
          } else {
            for (let i = 0; i < stockRecords.length; i++) {
              if (stockRecords [i].afterTotal == '') {
                this.$message({
                  type: 'warning',
                  message: stockRecords [i].name + ' 当前库存输入错误'
                })
                return false
              }
            }
          }

          stockRecords = JSON.stringify(stockRecords)

          let params = {
            id: this.FG_order.data.id,
            amount: this.FG_order.data.amount,
            remark: this.FG_order.data.remark,
            stockRecords: stockRecords
          }

          this.$http(this.$_.merge({}, Action.Stock.stockCheck.edit, {
            body: params
          })).then(response => {
            this.FG_order.orderStatusShow = true
            this.FG_order.orderStatus = false
            //this.FG_order.readonly=true
            this.$message({
              type: 'success',
              message: '库存盘点订单保存成功'
            })
            this.FG_order.id = response.body.attachment.id
            this.$confirm('保存成功，是否审核？')
              .then(_ => {
                this.$http(this.$_.merge({}, Action.Stock.stockCheck.audit, {
                  //获取待更新数据
                  body: {id: this.FG_order.id}
                })).then(response => {


                  this.$message({
                    type: 'success',
                    message: '审核成功'
                  })
                  this.FG_order.orderStatus = true
                  this.FG_order.readonly = true
                  //this.FG_TABLE.multiSelectData[0].status==2
                }, response => {
                  this.$message.error(response.body.resultMessage, response.body)
                })
              })
              .catch(_ => {

              });
          }, response => {
            this.$message.error(response.body.resultMessage, response.body)
          })

        }


      },
      //订单审核
      FG_handleOrderAudit(){
        this.$confirm('确定审核？')
          .then(_ => {
            this.$http(this.$_.merge({}, Action.Stock.stockCheck.audit, {
              //获取待更新数据
              body: {id: this.FG_order.data.id}
            })).then(response => {
              this.$message({
                type: 'success',
                message: '审核成功'
              })
              this.FG_order.orderStatus = true
              this.FG_order.readonly = true
              //this.FG_TABLE.multiSelectData[0].status==2
            }, response => {
              this.$message.error(response.body.resultMessage, response.body)
            })
          })
          .catch(_ => {

          });

      },
      /*选择商品*/
      changeProductSelectShowStatus: function (val) {
        this.FG_order.ProductSelectShow = val
      },
      handleProductSelect(val){
        this.FG_order.DefaultSelectType = true
        this.FG_order.ProductSelectShow = true
      },
      // 商品表格单项商品选择
      handleProductSelectOne(scope){
        this.FG_order.rowIndex = scope.$index
        this.FG_order.DefaultSelectType = false
        this.FG_order.ProductSelectShow = true
      },
      //处理商品选择结果
      handleProductSelectOneRes(val){
        if (this.FG_order.DefaultSelectType) {
          val.delete = true
          if (this.FG_order.data.stockRecords.indexOf(val) == -1) {
            this.$set(val, 'afterTotal', '')
            this.$set(val, 'remark', '')
            this.$set(val, 'amount', '')
            this.$set(val, 'price', val.buyingPrice)
            this.$set(val, 'commodityName', val.name)
            this.$set(val, 'beforeTotal', val.totalNum)
            this.$set(val, 'changeNum', '')
            this.FG_order.data.stockRecords.splice(0, 0, val)
            this.FG_order.ProductSelectShow = false
          } else {
            this.$message({
              type: 'warning',
              message: '该商品已选择'
            })
            return false
          }
        } else {
          val.delete = true
          if (this.FG_order.data.stockRecords.indexOf(val) == -1) {
            this.$set(val, 'afterTotal', '')
            this.$set(val, 'remark', '')
            this.$set(val, 'amount', '')
            this.$set(val, 'price', val.buyingPrice)
            this.$set(val, 'commodityName', val.name)
            this.$set(val, 'beforeTotal', val.totalNum)
            this.$set(val, 'changeNum', '')
            this.$set(this.FG_order.data.stockRecords, this.FG_order.rowIndex, val)

            this.FG_order.ProductSelectShow = false
          } else {
            this.$message({
              type: 'warning',
              message: '该商品已选择'
            })
            return false
          }
        }

      },
      handleProductSelectMoreRes(val){
        for (let i = 0; i < val.length; i++) {
          val[i].delete = true

          if (this.FG_order.data.stockRecords.indexOf(val[i]) !== -1) {
            this.$message({
              type: 'warning',
              message: '有商品已选择'
            })
            return false
          } else {
            this.$set(val[i], 'afterTotal', '')
            this.$set(val[i], 'remark', '')
            this.$set(val[i], 'amount', '')
            this.$set(val[i], 'price', val[i].buyingPrice)
            this.$set(val[i], 'commodityName', val[i].name)

            this.$set(val[i], 'beforeTotal', val[i].totalNum)
            this.$set(val[i], 'changeNum', '')
            this.FG_order.data.stockRecords.splice(0, 0, val[i])
            this.FG_order.ProductSelectShow = false
          }

        }

      },
      /*商品表格操作*/
      //商品表格行内input变化
      inputBlur(scope){
//        if (scope.row.afterTotal.search(/\e/ig) != -1) {
//          console.log(22)
//          scope.row.afterTotal = '1'
////          this.$set(scope.row.afterTotal,1)
//        }

//        scope.row.afterTotal = '1'
//        this.$set(scope.row,"afterTotal",1)
      },
      handleMultiplierChange(scope){
        if (typeof(scope.row.afterTotal) !== 'number') {
          this.$message({
            type: 'warning',
            message: "请输入正数"
          })
          return false
        }
        if (scope.row.afterTotal < 1) {
          this.$message({
            type: 'warning',
            message: "请输入正数"
          })
          return false
        }
        scope.row.changeNum = scope.row.afterTotal - scope.row.beforeTotal
        scope.row.amount = scope.row.changeNum * scope.row.buyingPrice
        scope.row.price = scope.row.buyingPrice
      },
      handleAccumulateChange(scope){


      },
      // 商品表格增加行
      handleTableRowAdd(index, row){
        this.FG_order.data.stockRecords.splice(-1, 0, {
          delete: true
        })
      },
      //商品表格删除行
      handleTableRowDelete(index, row){
        row.splice(index, 1);
      },
      //商品表格表尾合计
      //表尾合计
      getSummaries(param) {
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
              sums[index] += ' 元'
            } else {
              sums[index] = '0'
            }
          }
        })

        this.FG_order.data.amount = parseInt(sums[8])

        return sums
      },
      //订单刷新
      FG_handleOrderRefesh(){
        this.$router.go(0)
      },
      //商品扫描
      FG_handleProductScan(){
        alert('商品扫描')
      },
      //订单删除
      FG_handleOrderDelete(){
        this.$confirm('确定删除？')
          .then(_ => {
            this.$http(this.$_.merge({}, Action.Stock.stockCheck.cancel, {
              //获取待更新数据
              body: {id: this.FG_order.data.id}
            })).then(response => {
              this.$message({
                type: 'success',
                message: '删单成功'
              })
              this.FG_order.orderStatus = true
              this.FG_order.orderStatusShow = false
              this.FG_order.readonly = true
            }, response => {
              this.$message.error(response.body.resultMessage, response.body)
            })
          })
          .catch(_ => {

          });

      },
      //订单打印
      FG_handleOrderPrint(){
        alert('订单打印')
      },
      //商品导入
      FG_handleOrderImport(){
        alert('商品导入')
      },
      //返回库订单列表
      FG_handleOrderBack(){
        this.$router.go(-1)
      }
    },
    components: {
      employeeSelect, productSelect
    },
  }
</script>
