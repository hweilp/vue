<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="scoreSetUp">
        <div class="container">
          <div class="content">

            <el-row :span="24" class="fg-content-title">积分设置 </el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-opr">
              </el-row>
              <el-form v-model="FG_scoreRule.data" ref="scoreFormRow" :rules="FG_scoreRule.rules" labelWidth="150px">
                <div class="scoreExchangeSetUp">
                  <el-row :span="24" class="fg-content-title"> 积分兑换设置 </el-row>
                  <el-row style="padding-left: 40px;">
                      <el-form-item label="积分规则 ：" >
                          <el-radio-group v-model="FG_scoreRule.data.code" class="trunRow" style="padding-top: 0;">
                            <el-radio :label="10">按消费金额，每
                              <el-input v-model="FG_scoreRule.data.changeGrate" style="width: 50px;"></el-input>
                              元积1分
                            </el-radio>
                            <el-radio :label="20">按商品自定积分值</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item label="适用范围 ：" >
                        <el-radio-group v-model="FG_scoreRule.data.useRange"  class="trunRow">
                          <el-radio :label="10">所有商品</el-radio>
                          <el-radio :label="20">允许积分商品</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="通过积分获取的商品是否可以获得积分：" >
                        <el-radio-group v-model="FG_scoreRule.data.isProduceIntegral ">
                          <el-radio :label="1">是</el-radio>
                          <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                  </el-row>
                </div>
                <el-row class="scoreDiscSetUp">
                  <el-row :span="24" class="fg-content-title">扩展设置 </el-row>
                  <el-row :span="24" class="fg-content-title" style="margin-left: 40px;">积分抵扣设置 </el-row>
                  <el-row style="padding-left: 40px;">
                    <el-form-item label="是否允许积分抵扣 ：" prop="payFlag ">
                      <el-radio-group v-model="FG_scoreRule.data.payFlag">
                        <el-radio :label="10">是</el-radio>
                        <el-radio :label="20">否</el-radio>
                      </el-radio-group>
                    </el-form-item>


                    <el-col v-if="this.FG_scoreRule.exchangeValueShow">
                      <el-form-item label="抵扣设置 ：" prop="exchangeValue">
                        每 <el-input v-model="FG_scoreRule.data.exchangeValue" style="width: 50px;"></el-input> 分1元
                      </el-form-item>
                    </el-col>

                  </el-row>

                </el-row>
                <el-form-item>
                  <el-button type="primary" @click="FG_scoreRule_submitForm('scoreFormRow')"> 保存 </el-button>
                </el-form-item>

              </el-form>






            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Helper from '@/assets/admin/js/helper.js'
  import ElCol from 'element-ui/packages/col/src/col'
  import Action from '@/assets/admin/resource/actions.js'

  export default {
    components: {ElCol},
    data () {
      return{
        FG_scoreRule:{
          data:{
            id: '',
            mid: '',
            code: '',
            changeGrate: '',
            useRange: '',
            payFlag: '',
            exchangeValue: '',
            isProduceIntegral: '',
            isProduceIntegralStr: "",
            codeStr: "",
            useRangeStr: "",
            payFlagStr: ""
          },
          exchangeValueShow:'',
          rules:{},
        }

      }
    },
    watch:{
      'FG_scoreRule.data.code':function (val) {
        if(val==20){
          this.FG_scoreRule.data.changeGrate=0
        }
      },
      'FG_scoreRule.data.payFlag':function(val){
        if(val==20){
          this.FG_scoreRule.exchangeValueShow=false
        }else{
          this.FG_scoreRule.exchangeValueShow=true
        }
      }
    },
    created () {
      this.$http(this.$_.merge({}, Action.Score.setUp.rule)).then(response => {
        Helper.FG.setValueToObject( this.FG_scoreRule.data, response.body)
      }, response => {
        this.$message({
          type: 'warning',
          message: response.body.resultMessage
        })
      })
    },
    methods : {
      FG_scoreRule_submitForm(){
        if(this.FG_scoreRule.data.code == 10 && this.FG_scoreRule.data.changeGrate == ''){
          this.$message({
            type: 'warning',
            message:"请输入消费金额"
          })
          return
        }
        if(this.FG_scoreRule.data.payFlag == 10 && this.FG_scoreRule.data.exchangeValue  == ''){
          this.$message({
            type: 'warning',
            message:"请输入抵扣设置值"
          })
          return
        }

        this.$http(this.$_.merge({}, Action.Score.setUp.updateRule,{ body:this.FG_scoreRule.data})).then(response => {
          this.$message({
            type: 'success',
            message:"设置"+ response.body.resultMessage
          })
        }, response => {
          this.$message({
            type: 'warning',
            message: response.body.resultMessage
          })
        })
      }
    },
    mounted () {

    }
  }
</script>

<style lang="scss" scoped="">
  #scoreSetUp{
    .el-form{
      padding: 0 0 10px 50px;
      .el-form-item{

      }
    }
    .trunRow{
      padding-top: 10px;
      .el-radio{
        width: 100%;
        margin:0 0 10px 0 ;
      }
    }
    .el-input__inner{
      text-align: center;
    }
  }
</style>
