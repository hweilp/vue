<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          采购设置
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-form :model="FG_FORM_purchaseSetForm" :rules="FG_FORM_purchaseSetForm.rules" ref="FG_FORM_purchaseSetForm" label-width="420px"
                   class="demo-form-inline" style="margin-top: 20px">
            <el-form-item label="采购收货单审核生效时即时更新商品档案中的进价(0除外) :" prop="type">
              <el-radio-group v-model="FG_FORM_purchaseSetForm.type">
                <el-radio label="启用"></el-radio>
                <el-radio label="不启用"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="采购/出入库单通过输入数量和总价，反算单价 :" prop="type">
              <el-radio-group v-model="FG_FORM_purchaseSetForm.type">
                <el-radio label="启用"></el-radio>
                <el-radio label="不启用"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="采购收货允许0进价商品入库 :" prop="type">
              <el-radio-group v-model="FG_FORM_purchaseSetForm.type">
                <el-radio label="启用"></el-radio>
                <el-radio label="不启用"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="允许采购单、出入库单据通过扫码建档(只对13位标准条码有效) :" prop="type">
              <el-radio-group v-model="FG_FORM_purchaseSetForm.type">
                <el-radio label="启用"></el-radio>
                <el-radio label="不启用"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('FG_FORM_purchaseSetForm')">提交</el-button>
              <el-button @click="resetForm('FG_FORM_purchaseSetForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/param";

</style>


<script>
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  export default {
    data (){
     	return {
        FG_FORM_purchaseSetForm:{
          id: '',
          name: '',
          method: '',
          enctype: '',
          submitAddr: '',
          data: {

          },
          rules: Rules.Purchase.purchaseSet
        }
     	}
    }
  }

</script>
