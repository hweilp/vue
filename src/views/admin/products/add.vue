<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          商品信息 - 新增
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-tabs v-model="FG_activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="1">
              <el-form :model="FG_basicInfoForm.data" :rules="FG_basicInfoForm.rules" ref="FG_basicInfoForm"
                       label-width="166px"
                       class="demo-form-inline" :inline="true">

                <el-row :span="24" class="fg-content-bar">
                  基本信息

                  <el-row :span="24" style="margin-top: 20px">
                    <el-form-item label="商品名称：" prop="name">
                      <el-input v-model="FG_basicInfoForm.data.name"></el-input>
                    </el-form-item>
                    <el-form-item label="助记码：" prop="mnemonicCode">
                      <el-input v-model="FG_basicInfoForm.data.mnemonicCode"
                                style="width: 130px;margin-right: 0"></el-input>
                    </el-form-item>
                    <el-form-item label="单位：" prop="unitCode" label-width="73px">

                      <unit-select-plus :unitSelected.sync="FG_basicInfoForm.data.unitCode"></unit-select-plus>

                    </el-form-item>

                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="类别：" prop="categoryCode">

                      <category-select-plus
                        :categorySelected.sync="FG_basicInfoForm.data.categoryCode"></category-select-plus>

                    </el-form-item>
                    <el-form-item label="品牌：" prop="brandCode">

                      <brand-select-plus :brandSelected.sync="FG_basicInfoForm.data.brandCode"></brand-select-plus>

                    </el-form-item>


                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="生产日期：" prop="promoteDate">

                      <el-date-picker
                        v-model="FG_basicInfoForm.data.promoteDate"
                        align="right"
                        format
                        placeholder="选择日期"
                        :editable="false"
                        style="width: 360px"
                      >
                      </el-date-picker>

                    </el-form-item>
                    <el-form-item label="有效期限：" prop="validDays">
                      <el-input v-model.number="FG_basicInfoForm.data.validDays"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="是否允许虚拟销售：" prop="isVirtualSale">
                      <el-radio-group v-model="FG_basicInfoForm.data.isVirtualSale" style="width: 360px">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <template v-if="FG_basicInfoForm.data.isVirtualSale == 1">
                      <el-form-item label="虚拟销量：" prop="virtualSales">
                        <el-input v-model.number="FG_basicInfoForm.data.virtualSales"></el-input>
                      </el-form-item>
                    </template>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="是否允许改价折扣：" prop="isPriceDiscount">
                      <el-radio-group v-model="FG_basicInfoForm.data.isPriceDiscount" style="width: 360px">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="销售对象：" prop="saleObject" label-width="">
                      <el-select v-model="FG_basicInfoForm.data.saleObject" placeholder="商户">
                        <el-option
                          v-for="item in FG_basicInfoForm.saleObjectOptions"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="展示对象：" prop="showObject" label-width="103px">
                      <el-select v-model="FG_basicInfoForm.data.showObject" placeholder="商户">
                        <el-option
                          v-for="item in FG_basicInfoForm.saleObjectOptions"
                          :key="item.key"
                          :label="item.value"
                          :value="item.key">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24">
                    <!-- <el-form-item label="有效期：" prop="expireTime">
                       <el-date-picker
                         v-model="FG_basicInfoForm.data.expireTime"
                         align="right"
                         placeholder="选择日期"
                         :editable="false"
                         style="width: 360px"
                       >
                       </el-date-picker>
                     </el-form-item>-->

                    <el-form-item label="主图：" prop="pictureUrl">
                      <el-input v-model="FG_basicInfoForm.data.pictureUrl" style="display: none"></el-input>
                      <img-upload :pictureUrl.sync="FG_basicInfoForm.data.pictureUrl"
                                  :removePicture.sync="FG_basicInfoForm.picture" bid="master"></img-upload>
                    </el-form-item>
                  </el-row>
                </el-row>
                <el-row :span="24" class="fg-content-bar">
                  状态信息
                  <el-row :span="24" style="margin-top: 20px">
                    <el-form-item label="性质：">
                      <el-checkbox-group v-model="FG_basicInfoForm.data.natureTypes">
                        <el-checkbox label="10" name="type">热销</el-checkbox>
                        <el-checkbox label="20" name="type">最新款</el-checkbox>
                        <el-checkbox label="30" name="type">促销</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                    </el-row>
                  <el-row :span="24">
                    <el-form-item label="出售状态：" prop="status">
                      <el-radio-group v-model="FG_basicInfoForm.data.status">
                        <el-radio :label="10">待上架</el-radio>
                        <el-radio :label="20">已上架</el-radio>
                        <el-radio :label="30">已下架</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="商品类型：" prop="type">
                      <el-radio-group v-model="FG_basicInfoForm.data.type">
                        <el-radio :label="10">实物</el-radio>
                        <el-radio :label="20">虚拟</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-row>
                  <el-form-item label="商品内部属性：" prop="internalType">
                    <el-select v-model="FG_basicInfoForm.data.internalType" placeholder="A类" style="width: 80px">
                      <el-option
                        v-for="item in FG_basicInfoForm.internalTypeOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>

                <el-row :span="24" class="fg-content-bar">
                  价格信息
                  <el-row :span="24" style="margin-top: 20px">
                    <el-form-item label="进货价：" prop="buyingPrice">
                      <el-input v-model.number="FG_basicInfoForm.data.buyingPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="最低售价：" prop="minPrice">
                      <el-input v-model.number="FG_basicInfoForm.data.minPrice"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="零售价：" prop="retailPrice">
                      <el-input v-model.number="FG_basicInfoForm.data.retailPrice"></el-input>
                    </el-form-item>
                    <el-form-item label="会员价格：" prop="memberPrice">
                      <el-input v-model.number="FG_basicInfoForm.data.memberPrice"></el-input>
                    </el-form-item>
                  </el-row>
                </el-row>
                <el-row :span="24" class="fg-content-bar">
                  库存信息
                  <el-row :span="24" style="margin-top: 20px">
                    <el-form-item label="初始库存：" prop="initialStock" style="margin-right: 30px">
                      <el-input v-model.number="FG_basicInfoForm.data.initialStock"></el-input>
                    </el-form-item>
                    <el-form-item label="是否允许超售：" prop="isOverbook">
                      <el-radio-group v-model="FG_basicInfoForm.data.isOverbook">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-row>
                  <!--  <el-row :span="24">
                      <el-form-item label="库存预警处理方式：" prop="warnDealType">
                        <el-radio-group v-model="FG_basicInfoForm.data.warnDealType" style="width: 360px">
                          <el-radio :label="10">不通知</el-radio>
                          <el-radio :label="20">信息</el-radio>
                          <el-radio :label="30">短信</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="预警信息通知员工列表：" prop="noticeEmpIds">
                        <employee-select :employeeSelected.sync="FG_basicInfoForm.data.noticeEmpIds"></employee-select>
                      </el-form-item>
                    </el-row>-->
                  <el-row :span="24">
                    <el-form-item label="库存低位预警值：" prop="warnMinNum">
                      <el-input v-model.number="FG_basicInfoForm.data.warnMinNum"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="库存高位预警值：" prop="warnMaxNum">
                      <el-input v-model.number="FG_basicInfoForm.data.warnMaxNum"></el-input>
                    </el-form-item>
                  </el-row>

                </el-row>
                <el-row :span="24" class="fg-content-bar">
                  提成信息
                  <el-row :span="24" style="margin-top: 20px">
                    <el-form-item label="提成方式：" prop="commissionType">
                      <el-radio-group v-model="FG_basicInfoForm.data.commissionType">
                        <el-radio :label="1">不提成</el-radio>
                        <el-radio :label="2">按比例</el-radio>
                        <el-radio :label="3">按金额</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <template v-if="FG_basicInfoForm.data.commissionType == 2">
                      <el-form-item label="请输入提成比例%：（请输入2位以内数字，最多2位小数）" prop="commissionValue" label-width="400px">
                        <el-input v-model.number="FG_basicInfoForm.data.commissionValue"></el-input>
                      </el-form-item>
                    </template>
                    <template v-if="FG_basicInfoForm.data.commissionType == 3">
                      <el-form-item label="请输入提成金额￥（请输入8位以内数字，最多4位小数）：" prop="commissionValue" label-width="400px">
                        <el-input v-model.number="FG_basicInfoForm.data.commissionValue"></el-input>
                      </el-form-item>
                    </template>

                  </el-row>
                </el-row>
                <el-row :span="24" class="fg-content-bar">
                  积分抵扣设置
                  <el-row :span="24" style="margin-top: 20px">
                    <el-form-item label="允许积分抵扣值：" prop="integralCost">
                      <el-input v-model.number="FG_basicInfoForm.data.integralCost" style="width: 158px"></el-input>
                    </el-form-item>
                  </el-row>
                </el-row>
                <el-row :span="24" class="fg-content-bar">
                  积分获取设置
                  <el-row :span="24" style="margin-top: 20px">
                    <el-form-item label="赠送积分值：" prop="integralValue">
                      <el-input v-model.number="FG_basicInfoForm.data.integralValue" style="width: 158px"></el-input>
                    </el-form-item>
                  </el-row>
                </el-row>

                <el-row :span="24" class="fg-content-bar">
                  供应商设置
                  <el-row :span="24" style="margin-top: 20px">
                    <el-form-item label="供应商：" prop="">

                      <supplier-select-plus
                        :supplierSelected.sync="FG_basicInfoForm.supplyData.sno"></supplier-select-plus>

                    </el-form-item>
                    <el-form-item label="供应商合同状态：" prop="">
                      <el-radio-group v-model="FG_basicInfoForm.supplyData.supplyStatus">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">关闭</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="供货合同有效期：" prop="">
                      <el-date-picker
                        v-model="FG_basicInfoForm.supplyData.expiryDate"
                        align="right"
                        format
                        placeholder="选择日期"
                        :editable="false"
                        style="width: 360px"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-row>
                </el-row>
                <el-row :span="24" style="margin-top: 20px;margin-left: 20px">
                  <el-form-item>
                    <el-button type="primary" @click="FG_handleBasicInfoForm('FG_basicInfoForm')">确定</el-button>
                    <el-button type="primary" @click="FG_completeDetailInfoForm('FG_basicInfoForm')">完善详情信息</el-button>
                    <el-button @click="FG_resetBasicInfoForm('FG_basicInfoForm')">取消</el-button>
                  </el-form-item>
                </el-row>

              </el-form>

            </el-tab-pane>


            <el-tab-pane label="详情信息" name="2">
              <el-form :model="FG_detailInfoForm.data" :rules="FG_detailInfoForm.rules" ref="FG_detailInfoForm"
                       label-width="160px"
                       class="demo-form-inline">
                <el-row :span="24" class="fg-content-bar">

                  <el-form-item label="简要描述：" prop="brief">
                    <el-input v-model="FG_detailInfoForm.data.brief"></el-input>
                  </el-form-item>
                  <el-form-item label="详细信息：" prop="detail">
                    <el-input type="textarea" v-model="FG_detailInfoForm.data.detail " style="width: 360px"></el-input>
                  </el-form-item>
                  <el-form-item label="关键字：" prop="keyword">
                    <el-input v-model="FG_detailInfoForm.data.keyword"></el-input>
                  </el-form-item>
                  <el-form-item label="轮播图：" prop="slidPictureUrl">
                    <el-input v-model="FG_detailInfoForm.data.slidPictureUrl" style="display: none"></el-input>
                    <imgs-upload :pictureUrls.sync="FG_detailInfoForm.data.slidPictureUrl"
                                 :removePicture.sync="FG_detailInfoForm.picture" bid="slide"></imgs-upload>
                  </el-form-item>
                  <el-form-item label="详细图：" prop="detailPictureUrl">
                    <el-input v-model="FG_detailInfoForm.data.detailPictureUrl" style="display: none"></el-input>
                    <imgs-upload :pictureUrls.sync="FG_detailInfoForm.data.detailPictureUrl"
                                 :removePicture.sync="FG_detailInfoForm.picture" bid="detail"></imgs-upload>
                  </el-form-item>


                </el-row>
                <el-row :span="24" style="margin-top: 20px;margin-left: 20px">
                  <el-form-item>
                    <el-button type="primary" @click="FG_handleDetailInfoForm('FG_detailInfoForm')">确定</el-button>
                    <el-button @click="FG_resetDetailInfoForm('FG_detailInfoForm')">取消</el-button>
                  </el-form-item>
                </el-row>
              </el-form>
            </el-tab-pane>

          </el-tabs>
        </el-row>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>

  @import "../../../assets/admin/css/main/param";


</style>

<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'

  import unitSelect from '@/components/compos/unit/unit-select'
  import unitSelectPlus from '@/components/compos/unit/unit-select-plus'
  import brandSelect from '@/components/compos/brand/brand-select'
  import brandSelectPlus from '@/components/compos/brand/brand-select-plus'
  import categorySelect from '@/components/compos/category/category-select'
  import categorySelectPlus from '@/components/compos/category/category-select-plus'
  import supplierSelect from '@/components/compos/supplier/supplier-select'
  import supplierSelectPlus from '@/components/compos/supplier/supplier-select-plus'
  import imgUpload from '@/components/compos/imgUpload/imgUpload'
  import imgsUpload from '@/components/compos/imgUpload/imgsUpload'

  export default {
    data: function () {
      return {
        FG_activeName: '1',
        FG_basicInfoForm: {
          internalTypeOptions: [
            {
              key: 10,
              value: 'A类'
            },
            {
              key: 20,
              value: 'B类'
            }
          ],
          saleObjectOptions: [
            {
              key: 10,
              value: '商户'
            },
            {
              key: 20,
              value: '客户'
            }
          ],
          picture: [],
          data: {
            brandCode: '',
            name: '',
            promoteDate: '',
            validDays: '',
            categoryCode: '',
            unitCode: '',
            mnemonicCode: '',
            internalType: 10,
            virtualSales: '',
            pictureUrl: '',
            status: 10,
            type: 10,
            buyingPrice: '',
            minPrice: '',
            retailPrice: '',
            memberPrice: '',
            initialStock: '',
            isOverbook: 0,
            warnMinNum: '',
            warnMaxNum: '',
            commissionType: 1,
            commissionValue: 0,
            integralCost: 0,
            integralValue: 0,
            isVirtualSale: 1,
            isPriceDiscount: 1,
            saleObject: 20,
            showObject: 20,
            natureTypes:[],
          },
          supplyData: {
            sno: '',
            supplyStatus: 1,
            expiryDate: '',
          },
          rules: Rules.Product.Info.basicInfoForm
        },
        FG_detailInfoForm: {
          picture: [],
          data: {
            pno: '',
            brief: '',
            detail: '',
            keyword: '',
            slidPictureUrl: '',
            detailPictureUrl: ''
          },
          rules: Rules.Product.Info.detailInfoForm
        }
      }
    },
    created: function () {

    },
    watch: {
      'FG_basicInfoForm.data.promoteDate': function (val) {
        if (val) {
          this.FG_basicInfoForm.data.promoteDate = Helper.FG.formatDate(val)
        }
      },
      'FG_basicInfoForm.supplyData.expiryDate': function (val) {
        if (val) {
          this.FG_basicInfoForm.supplyData.expiryDate = Helper.FG.formatDate(val)
        }
      },
      'FG_basicInfoForm.data.isVirtualSale': function (val) {
        if (val==0) {
          this.FG_basicInfoForm.data.virtualSales = 0
        }
      }
    },
    methods: {
      //选项卡切换
      handleClick(tab, event) {
      },

      //基础信息表单操作
      FG_handleBasicInfoForm(formName) {
        if (this.FG_basicInfoForm.data.buyingPrice > this.FG_basicInfoForm.data.minPrice
          || this.FG_basicInfoForm.data.minPrice > this.FG_basicInfoForm.data.memberPrice
          || this.FG_basicInfoForm.data.memberPrice > this.FG_basicInfoForm.data.retailPrice) {
          this.$message.warning('商品价格关系：进货价 <= 最低销售价 <= 会员价 <= 零售价')
          return false
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.FG_basicInfoForm.picture.length) {
              this.$http(this.$_.merge({}, Action.imgUpload.remove, {
                body: {url: this.FG_basicInfoForm.picture.join()}
              }))
                .then(response => {

                }, response => {
                  this.$message.error(response.body.resultMessage, response.body)
                })
            }


            for (let i in this.FG_basicInfoForm.supplyData) {
              if (this.FG_basicInfoForm.supplyData[i]) {
                this.FG_basicInfoForm.data[i] = this.FG_basicInfoForm.supplyData[i]
              }
            }


            this.$http(this.$_.merge({}, Action.Product.Info.add, {
              body: this.FG_basicInfoForm.data
            }))
              .then(response => {
                this.FG_detailInfoForm.data.pno = response.body.pno
                this.$message.success('新增商品基本信息成功', response.body)
                this.FG_activeName = '2'
              }, response => {
                this.$message.error(response.body.resultMessage, response.body)
              })


          } else {
            return false
          }
        })
      },
      FG_completeDetailInfoForm(formName) {
        this.FG_handleBasicInfoForm(formName)
      },
      FG_resetBasicInfoForm(formName) {
        this.FG_basicInfoForm.data = {}
      },

      //详情信息表单操作
      FG_handleDetailInfoForm(formName) {
        if (this.FG_detailInfoForm.data.pno) {
          this.$refs[formName].validate((valid) => {

            if (valid) {
              if (this.FG_detailInfoForm.picture.length) {
                this.$http(this.$_.merge({}, Action.imgUpload.remove, {
                  body: {url: this.FG_detailInfoForm.picture.join()}
                }))
                  .then(response => {

                  }, response => {
                    this.$message.error(response.body.resultMessage, response.body)
                  })
              }
              this.FG_detailInfoForm.data.types = '20' + ',' + '30'
              this.$http(this.$_.merge({}, Action.Product.Info.updateDetail, {
                body: this.FG_detailInfoForm.data
              }))
                .then(response => {
                  this.$message.success('新增商品详情信息成功', response.body)
                  this.$router.push({path: "/product/info"})
                }, response => {
                  this.$message.error(response.body.resultMessage, response.body)
                })
            } else {
              return false
            }


          })
        } else {
          this.$message.warning('请先填写基本信息')
        }

      },
      FG_resetDetailInfoForm(formName) {
        this.FG_detailInfoForm.data = {}
      },
      //处理图片上传是否多选

    },
    mounted() {
    },
    components: {
      unitSelect,
      unitSelectPlus,
      imgsUpload,
      brandSelect,
      brandSelectPlus,
      categorySelect,
      categorySelectPlus,
      supplierSelect,
      supplierSelectPlus,
      imgUpload
    }
  }

</script>
