<template>
  <!-- MAIN PANEL -->
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          重置密码
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-form ref="resetPasswordsForm" :model="resetPasswordsForm.data" label-width="165px" id="setForm"
                   :rules="resetPasswordsForm.rules"
                   name="resetPasswordsForm" prop="id" style="margin-top: 20px">


            <el-form-item label="旧密码:" prop="mobile">
              <el-input v-model="resetPasswordsForm.data.mobile"  placeholder="请输入手机号" style="width: 360px"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="FG_FORM_submitForm('resetPasswordsForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </div>
  <!-- END MAIN PANEL -->
</template>

<script>

  import Rules from '@/assets/admin/resource/rules.js'
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  export default {
    data() {
      return {
        resetPasswordsForm: {
          id: '',
          name: '',
          method: '',
          enctype: '',
          submitAddr: '',
          data: {
            mobile:'15857186390'
          },
          rules: Rules.System.resetPwd
        },
      }

    },
    created: function () {

    },
    methods: {

      FG_FORM_submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

              this.$http(this.$_.merge({}, Action.System.updatePasswords.reset, {
                url: Helper.FG.setParams(Action.System.updatePasswords.reset.url, {mobile: this.resetPasswordsForm.data.mobile})
              })).then(response => {
                let result = response.body
                if (result.success == true) {
                  this.$message({
                    type: 'success',
                    message: '重置密码成功'
                  })
                } else {
                  this.$message.error(result.resultMessage, response.body)
                }

              }, response => {
                this.$message.error(result.resultMessage, response.body)
              })


          } else {
            return false
          }
        })
      },

    }

  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/_param.scss";

  .pass:after {
    content: '';
    background: url('../../../assets/admin/images/u2547.png');
    position: absolute;
    width: 28px;
    height: 17px;
    left: 323px;
    top: 10px;
  }

</style>


