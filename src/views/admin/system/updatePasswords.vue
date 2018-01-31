<template>
  <!-- MAIN PANEL -->
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          修改密码
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-form ref="FG_FORM_updatePasswordsForm" :model="FG_FORM_updatePasswordsForm.data" label-width="165px" id="setForm"
                   :rules="FG_FORM_updatePasswordsForm.rules"
                   name="FG_FORM_updatePasswordsForm" prop="id" style="margin-top: 20px">


            <el-form-item label="旧密码:" prop="oldPwd">
              <el-input v-model="FG_FORM_updatePasswordsForm.data.oldPwd" type="password" placeholder="请输入旧密码" class="pass"
                        style="width: 360px"></el-input>
            </el-form-item>

            <el-form-item label="新密码:" prop="newPwd">
              <el-input v-model="FG_FORM_updatePasswordsForm.data.newPwd" type="password" placeholder="请输入新密码" class="pass"
                        auto-complete="off" style="width: 360px"></el-input>
            </el-form-item>


            <el-form-item label="确认新密码:" prop="confirmPwd">
              <el-input v-model="FG_FORM_updatePasswordsForm.data.confirmPwd" type="password" placeholder="请确认新密码" class="pass"
                        auto-complete="off" style="width: 360px"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="FG_FORM_submitForm('FG_FORM_updatePasswordsForm')">保存</el-button>
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
        FG_FORM_updatePasswordsForm: {
          id: '',
          name: '',
          method: '',
          enctype: '',
          submitAddr: '',
          data: {
            oldPwd: '',
            newPwd: '',
            confirmPwd: ''
          },
          rules: Rules.System.updatePasswords
        },
      }

    },
    created: function () {

    },
    methods: {

      FG_FORM_submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.FG_FORM_updatePasswordsForm.data.confirmPwd == this.FG_FORM_updatePasswordsForm.data.newPwd) {
              let params = {
                oldPwd: this.FG_FORM_updatePasswordsForm.data.oldPwd,
                newPwd: this.FG_FORM_updatePasswordsForm.data.newPwd,
                confirmPwd: this.FG_FORM_updatePasswordsForm.data.confirmPwd
              }
              this.$http(this.$_.merge({}, Action.System.updatePasswords.update, {
                body:params
              })).then(response => {
                let result = response.body
                if (result.success == true) {
                  this.$message({
                    type: 'success',
                    message: '修改密码成功'
                  })
                } else {
                  this.$message.error(result.resultMessage, response.body)
                }

              }, response => {
                this.$message.error(result.resultMessage, response.body)
              })
            } else {
              this.$message.error('两次输入密码不一致!')
            }

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


