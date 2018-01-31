<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          商户信息 - 详情
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-form :model="FG_accountInfo.data"  ref="merchanForm"
                   label-width="166px"
                   class="demo-form-inline" :inline="true">

            <el-row :span="24" class="fg-content-bar">
              基本信息

              <el-row :span="24" style="margin-top: 20px">
                <el-col :span="12">
                  <el-form-item label="商户号 ：" prop="mid">
                    <el-input v-model="FG_accountInfo.data.mid" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="商户名称 ：" prop="name">
                    <el-input v-model="FG_accountInfo.data.name" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="真实姓名 ：" prop="realName">
                    <el-input v-model="FG_accountInfo.data.realName" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="认证身份证号 ：" prop="idCardNo">
                    <el-input v-model="FG_accountInfo.data.idCardNo" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="总资金 ：" prop="totalCapital">
                    <el-input v-model="FG_accountInfo.data.totalCapital" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="可用资金 ：" prop="usableCapital">
                    <el-input v-model="FG_accountInfo.data.usableCapital" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="冻结资金 ：" prop="frozenCapital ">
                    <el-input v-model="FG_accountInfo.data.frozenCapital " disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="总积分 ：" prop="totalIntegral">
                    <el-input v-model="FG_accountInfo.data.totalIntegral" disabled></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="12">
                  <el-form-item label="可用积分 ：" prop="usableIntegral">
                    <el-input v-model="FG_accountInfo.data.usableIntegral" disabled></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="12">
                  <el-form-item label="冻结积分 ：" prop="frozenIntegral">
                    <el-input v-model="FG_accountInfo.data.frozenIntegral" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="更新时间 ：" prop="updateTimeStr">
                    <el-input v-model="FG_accountInfo.data.updateTimeStr" disabled></el-input>
                  </el-form-item>
                </el-col>



              </el-row>
            </el-row>




          </el-form>




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

  import areaSelect from '@/components/compos/area/areaSelect'
  import imgUpload from '@/components/compos/imgUpload/imgUpload'

  export default {
    data () {
      return {
        mid : this.$store.state.User.merchantMID,
        FG_accountInfo:{
          name:"merchanForm",
          picture:[],
          data:{
            idCardNo:'',
            usableCapital:'',
            frozenCapital :'',
            frozenIntegral :'',
            totalCapital :'',
            totalIntegral:'',
            name :'',
            realName :'',
            mid  :'',
            updateTimeStr  :'',
            usableIntegral :''
          },
          rules: ''
        },

      }
    },
    created: function () {
      let self = this;

      this.$http({
        method: Action.System.account.info.method,
        url: Action.System.account.info.url+self.mid,
      })
        .then(response => {
          Helper.FG.setValueToObject(this.FG_accountInfo.data,response.body[0])
        }, response => {
          this.$message.error(response.body.resultMessage, response.body)
        })
    },
    watch:{


    },
    methods: {
    },
    mounted() {},
    components: {
      imgUpload,
      areaSelect,

    }
  }

</script>
