<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          订单入库 - 新增
        </el-row>
        <el-row :span="24" class="fg-content-detail">

          <el-row :span="24" class="fg-content-opr">
            <el-button :plain="true" type="primary" size="" @click="FG_handleGoPay"><i
              class="fa fa-arrow-up"></i> 前往支付
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="FG_handleOrderSave"><i
              class="fa fa-save"></i> 保存
            </el-button>

            <el-button :plain="true" type="primary" size="" @click="handleProductSelect"><i
              class="fa fa-list-alt"></i> 选择商品
            </el-button>
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

            <el-button :plain="true" type="primary" size="" @click="FG_handleOrderDelete"><i
              class="fa fa-times"></i> 删单
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="FG_handleOrderPrint"><i
              class="fa fa-print"></i> 打印
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="FG_handleOrderImport"><i
              class="fa fa-folder-open"></i> 导入
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="FG_handleOrderBack"><i
              class="fa fa-reply-all"></i> 返回
            </el-button>
          </el-row>
          <el-row :span="24">
            <div class="commonPanel">
              <el-form class="demo-form-inline" label-width="100px" ref="enterStockAddForm" :inline="true">
                <el-row :span="24">
                  <el-col :span="24">
                    <el-form-item label="业务单号 ：" prop="tid">
                      <el-input v-model="FG_order.data.tid" placeholder="" readonly="" class="readOnly"></el-input>
                    </el-form-item>
                    <el-form-item label="用户 ：" prop="handleEmpNo ">
                      <user-select :employeeSelected.sync="FG_order.data.handleEmpNo" :readonly.sync='isDisabled'></user-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <el-table
              :data="FG_order.data.merchantInoutOrderDetailDto"
              border
              :summary-method="getSummaries"
              show-summary
              row-class-name="productTableRow">
              <el-table-column

                label="序号"
                type="index"
                width="70">
                <template scope="scope" >
                  <el-button v-if="!scope.row.delete"
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
                <template scope="scope" >
                  <p >
                    {{ scope.row.pno }}
                    <i @click="handleProductSelectOne(scope)" class="fa fa-ellipsis-h" v-if="scope.row.delete"></i>
                  </p>
                </template>

              </el-table-column>
              <el-table-column
                prop="name"
                label="商品名称">
              </el-table-column>
              <el-table-column
                prop="unitName"
                label="单位">
              </el-table-column>
              <el-table-column
                prop="quantity"
                label="数量"
                class-name="quantity">
                <template scope="scope">
                  <el-input v-model.number="scope.row.quantity" @change="handleMultiplierChange(scope)"
                            type="number" @blur="inputBlur(scope)"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="buyingPrice"
                label="价格"
                >
                <!--<template scope="scope">-->
                  <!--<el-input v-model.number="scope.row.buyingPrice" @change="handleMultiplierChange(scope)"-->
                            <!--type="number"></el-input>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column
                prop="couponPrice"
                label="优惠价"
                class-name="buyingPrice">
                <template scope="scope">
                  <el-input v-model="scope.row.couponPrice" @change="handleMultiplierChange(scope)"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="totalPrice"
                label="小计金额"
                class-name="totalPrice">
                <template scope="scope">
                  <el-input v-model.number="scope.row.totalPrice" @change="handleAccumulateChange(scope)"
                            type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="promoteDateStr"
                label="生产日期"
                class-name="promoteDateStr">
                <template scope="scope">
                  <el-input v-model="scope.row.promoteDateStr" @change="handlePromoteDateStrChange(scope)"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注"
                class-name="remark">
                <template scope="scope">
                  <el-input v-model="scope.row.remark"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                class-name="operate">
                <template scope="scope" >
                  <el-button v-if="scope.row.delete"
                             size="small"
                             type="danger"
                             @click.native.prevent="handleTableRowDelete(scope.$index, FG_order.data.merchantInoutOrderDetailDto)">删除
                  </el-button>

                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-row>
        <el-dialog
          title="选择支付方式"
          :visible.sync="payMoney.dialogVisible"
          size="small" >
          <el-row>
            <el-form  ref="addForm" :model="payMoney.data" label-width="120px" :rules="payMoney.rules">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="订单总额 ：" prop="totalPrice">
                    <el-input v-model="payMoney.data.totalPrice" class="readOnly" readonly=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="线下支付金额 ：" prop="belowLineMoney">
                    <el-input v-model="payMoney.data.belowLineMoney" class=""  ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="支付方式 ：" prop="payType" v-if="payMoney.payTypeDialogVisible">
                    <!--<el-input v-model="FG_OrderDetail.editBillInfo.typeStr"></el-input>-->
                    <el-select v-model="payMoney.data.payType" style="width: 360px">
                      <el-option  v-for="item in payMoney.payTypeOptions"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="备注 :" prop="remark">
                    <el-input v-model="payMoney.data.remark"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-col :span="24" style="text-align: right">
                <el-button @click="payMoney.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="FG_PAYMONEYSubmit('addForm')">确认</el-button>
              </el-col>

            </el-form>


          </el-row>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .el-table__body-wrapper {

    .quantity > .cell, .buyingPrice > .cell, .remark > .cell, .totalPrice > .cell, .promoteDateStr > .cell {
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

      .quantity > .cell input, .buyingPrice > .cell input, .remark > .cell input, .totalPrice > .cell input, .promoteDateStr > .cell input {
        background: #EEF1F6 !important;

        &:focus {
          background: #FFF !important;
        }

      }
    }
  }
  .el-table__footer-wrapper .buyingPrice, .el-table__footer-wrapper .remark, .el-table__footer-wrapper .totalPrice, .el-table__footer-wrapper .quantity, .el-table__footer-wrapper .promoteDateStr {
    padding-left: 10px;
  }
</style>

<script type="text/javascript">
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import productSelect from '@/components/compos/product/product-select'
  import userSelect from '@/components/compos/employee/user-select'

  export default {
    data(){
      return {
        isDisabled:false,
        payMoney:{
          dialogVisible:false,
          data: {
            payType:"",
            totalPrice:1000,
            belowLineMoney:"",
            remark:''
          },
          payTypeOptions:[
            {value: 10, label: "支付宝支付"},
            {value: 20, label: "微信支付"},
            {value: 30, label: "线下支付"},
            {value: 40, label: "银行卡"}
          ],
          rules:Rules.System.Role.editForm,
        },
        FG_order: {
          data: {
            subTid:100000000719,
            tid:"",
            sid:100002,
            logisticsCost:1,
            tradeType:20,
            dueAmount:12,// 应付金额合计
            payAmount:18,// 实付金额合计
            couponAmount:5,// 优惠金额合计
            merchantInoutOrderDetailDto: [

              {
                delete:true
              },
              {
                delete:true
              },
              {
                delete:true
              },
              {
                delete:false
              },
            ]
          },
          orderStatus: '',
          orderStatusShow: '',
          isOrderEditable: '',
          id: '',
          ProductSelectShow: false,
          DefaultSelectType:'',
          rowIndex:''
        }
      }
    },
    watch:{
      "payMoney.data.belowLineMoney":function (val) {
        this.payMoney.data.belowLineMoney = val
        if(this.payMoney.data.belowLineMoney < this.payMoney.data.totalPrice){
          this.payMoney.payTypeDialogVisible  = true
        }else {
          this.payMoney.payTypeDialogVisible  = false
        }
      }
    },
    methods: {
      FG_handleGoPay(){
        this.payMoney.dialogVisible = true

      },
      //订单保存
      FG_handleOrderSave(){

        let merchantInoutOrderDetailDto=[]
        for (let i = 0; i < this.FG_order.data.merchantInoutOrderDetailDto.length; i++) {
          if(this.FG_order.data.merchantInoutOrderDetailDto[i].pno!==undefined){
            merchantInoutOrderDetailDto.push(this.FG_order.data.merchantInoutOrderDetailDto[i])
          }
        }
        if(merchantInoutOrderDetailDto.length==0){
          this.$message({
            type: 'warning',
            message: '请选择商品'
          })
          return false
        }else{
          for (let i = 0; i < merchantInoutOrderDetailDto.length; i++) {
            if(merchantInoutOrderDetailDto[i].quantity==''){
              this.$message({
                type: 'warning',
                message: merchantInoutOrderDetailDto[i].name+' 商品数量输入错误'
              })
              return false
            }
          }
        }

        if(this.FG_order.data.handleEmpNo==''){
          this.$message({
            type: 'warning',
            message:'请选择用户'
          })
          return false
        }
        //console.log(merchantInoutOrderDetailDto)


        for (let i = 0; i < merchantInoutOrderDetailDto.length; i++) {

          merchantInoutOrderDetailDto[i].subTid =this.FG_order.data.subTid
          merchantInoutOrderDetailDto[i].tid = this.FG_order.data.tid
          merchantInoutOrderDetailDto[i].sid = this.FG_order.data.sid
          merchantInoutOrderDetailDto[i].tradeType = this.FG_order.data.tradeType

          merchantInoutOrderDetailDto[i].price = merchantInoutOrderDetailDto[i].couponPrice
          merchantInoutOrderDetailDto[i].originalPrice = merchantInoutOrderDetailDto[i].buyingPrice

          merchantInoutOrderDetailDto[i].virtualValue = 0

          merchantInoutOrderDetailDto[i].logisticsCost = this.FG_order.data.logisticsCost

          merchantInoutOrderDetailDto[i].createEmpNo = parseInt(merchantInoutOrderDetailDto[i].mid.toString()+merchantInoutOrderDetailDto[i].sno.toString())
          merchantInoutOrderDetailDto[i].modifyEmpNo= parseInt(merchantInoutOrderDetailDto[i].mid.toString()+merchantInoutOrderDetailDto[i].sno.toString())

          merchantInoutOrderDetailDto[i].batchNo = "222"
          merchantInoutOrderDetailDto[i].expireDate = merchantInoutOrderDetailDto[i].validDays


          merchantInoutOrderDetailDto[i].couponAmount =merchantInoutOrderDetailDto[i].buyingPrice*merchantInoutOrderDetailDto[i].quantity- merchantInoutOrderDetailDto[i].totalPrice
          merchantInoutOrderDetailDto[i].payAmount = merchantInoutOrderDetailDto[i].totalPrice
          merchantInoutOrderDetailDto[i].dueAmount = merchantInoutOrderDetailDto[i].totalPrice

          merchantInoutOrderDetailDto[i].modifyTime = Helper.FG.formatDate(new Date())

          merchantInoutOrderDetailDto[i].tradeDate = Helper.FG.formatDate(new Date())

          merchantInoutOrderDetailDto[i].expireDate = merchantInoutOrderDetailDto[i].validDays
          merchantInoutOrderDetailDto[i].couponPrice = parseInt(merchantInoutOrderDetailDto[i].couponPrice)
          merchantInoutOrderDetailDto[i].mnemonicCode = parseInt(merchantInoutOrderDetailDto[i].mnemonicCode)
          merchantInoutOrderDetailDto[i].price = parseInt(merchantInoutOrderDetailDto[i].price)
          merchantInoutOrderDetailDto[i].unitPrice = parseInt(merchantInoutOrderDetailDto[i].unitPrice)


        }



        let params={
          bid:888888,
          sid:888888,
          dueAmount:12,// 应付金额合计
          couponAmount:5,// 优惠金额合计
          payAmount:this.FG_order.data.payAmount,// 实付金额合计
          logisticsCost:this.FG_order.data.logisticsCost,
          tradeType:20,
          TradeDetailDtos:merchantInoutOrderDetailDto
        }



        params.TradeDetailDtos=JSON.stringify(params.TradeDetailDtos)
        console.log(params)


        this.$http(this.$_.merge({}, Action.Order.OffLineOrderAdd.orderAdd, {
          params
        })).then(response => {
          this.$message({
            type: 'success',
            message: '订单新增成功'
          })
        }, response => {
          this.$message.error(response.body.resultMessage, response.body)
        })

      },
      //订单审核
      FG_handleOrderAudit(){

      },
      /*选择商品*/
      changeProductSelectShowStatus: function (val) {
        this.FG_order.ProductSelectShow = val
      },
      handleProductSelect(val){
        //console.log(val)
        this.FG_order.DefaultSelectType=true
        this.FG_order.ProductSelectShow=true
      },
      // 商品表格单项商品选择
      handleProductSelectOne(scope){
        this.FG_order.rowIndex=scope.$index
        //console.log( this.FG_order.rowIndex)
        this.FG_order.DefaultSelectType=false
        this.FG_order.ProductSelectShow = true

      },
      //处理商品选择结果
      handleProductSelectOneRes(val){
        if(this.FG_order.DefaultSelectType){
          val.delete=true
          if(this.FG_order.data.merchantInoutOrderDetailDto.indexOf(val)==-1){
            this.FG_order.data.merchantInoutOrderDetailDto.splice(0,0,val)
            for (let i = 0; i < this.FG_order.data.merchantInoutOrderDetailDto.length-1; i++) {
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[i], 'quantity', '')
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[i], 'remark', '')
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[i], 'totalPrice','' )

              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[i], 'couponPrice', this.FG_order.data.merchantInoutOrderDetailDto[i].buyingPrice)
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[i], 'unitPrice', this.FG_order.data.merchantInoutOrderDetailDto[i].buyingPrice)

            }
            this.FG_order.ProductSelectShow = false
          }else{
            this.$message({
              type: 'warning',
              message: '该商品已选择'
            })
            return false
          }
        }else{
          val.delete=true
          if(this.FG_order.data.merchantInoutOrderDetailDto.indexOf(val)==-1){
            this.$set(this.FG_order.data.merchantInoutOrderDetailDto,this.FG_order.rowIndex,val)
            for (let i = 0; i < this.FG_order.data.merchantInoutOrderDetailDto.length-1; i++) {
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[i], 'quantity', '')
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[i], 'remark', '')
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[i], 'totalPrice', '')
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[i], 'couponPrice', this.FG_order.data.merchantInoutOrderDetailDto[i].buyingPrice)
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[i], 'unitPrice', this.FG_order.data.merchantInoutOrderDetailDto[i].buyingPrice)

            }
            //console.log(this.FG_order.data.merchantInoutOrderDetailDto)
            this.FG_order.ProductSelectShow = false
          }else{
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
          val[i].delete=true
          //console.log(this.FG_order.data.merchantInoutOrderDetailDto.indexOf(val[i]))
          if(this.FG_order.data.merchantInoutOrderDetailDto.indexOf(val[i])!==-1){
            this.$message({
              type: 'warning',
              message: '有商品已选择'
            })
            return false
          }else{
            this.FG_order.data.merchantInoutOrderDetailDto.splice(0,0,val[i])
            for (let j = 0; j < this.FG_order.data.merchantInoutOrderDetailDto.length-1; j++) {
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[j], 'quantity', '')
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[j], 'remark', '')
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[j], 'totalPrice', '')
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[i], 'couponPrice', this.FG_order.data.merchantInoutOrderDetailDto[i].buyingPrice)
              this.$set(this.FG_order.data.merchantInoutOrderDetailDto[j], 'unitPrice', this.FG_order.data.merchantInoutOrderDetailDto[i].buyingPrice)

            }
            this.FG_order.ProductSelectShow = false
          }

        }

      },
      /*商品表格操作*/
      //商品表格行内input变化
      inputBlur(scope){
      },
      handleMultiplierChange(scope){
        if (typeof(scope.row.quantity) !== 'number') {
          this.$message({
            type:'warning',
            message:"请输入正数"
          })
          if (scope.row.quantity < 1) {
            this.$message({
              type:'warning',
              message:"请输入正数"
            })
            return false

          }
        }
        if(scope.row.couponPrice>scope.row.buyingPrice){
          console.log(2)
          this.$message({
            type:'warning',
            message:"优惠金额不能大于价格"
          })
          return false
        }
        scope.row.totalPrice = scope.row.quantity * scope.row.couponPrice
        scope.row.unitPrice=scope.row.couponPrice
      },
      handleAccumulateChange(scope){
        if (scope.row.quantity && !scope.row.couponPrice) {
          scope.row.couponPrice = scope.row.totalPrice / scope.row.quantity
        } else if (!scope.row.quantity && scope.row.buyingPrice) {
          scope.row.quantity = scope.row.totalPrice / scope.row.couponPrice
        } else {
          scope.row.couponPrice = scope.row.totalPrice / scope.row.quantity
        }

        scope.row.unitPrice=scope.row.couponPrice
      },
      // 商品表格增加行
      handleTableRowAdd(index, row){
        this.FG_order.data.merchantInoutOrderDetailDto.splice(-1,0,{
          delete:true
        })
        //console.log(this.FG_order.data.merchantInoutOrderDetailDto)
      },
      //商品表格删除行
      handleTableRowDelete(index, row){
        row.splice(index, 1);
        //console.log(this.FG_order.data.merchantInoutOrderDetailDto)
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
              sums[index] += ' 元'
            } else {
              sums[index] = '0'
            }
          }
        })

        this.FG_order.data.payAmount = parseInt(sums[7])

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
      },
      FG_PAYMONEYSubmit(){

      }
    },
    components: {
      userSelect, productSelect
    },
  }
</script>
