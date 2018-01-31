<template>
  <!-- MAIN PANEL -->
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          账号绑定
        </el-row>

        <el-row :span="24" class="fg-content-detail">
          <el-form ref="ruleForm" :model="accountBind.data" label-width="165px" id="setForm" :rules="accountBind.rules"
                   name="ruleForm" prop="id" style="margin-top: 20px">


            <el-form-item label="手机:" prop="mobile">
              <el-input v-model="accountBind.data.mobile" placeholder="请输入绑定手机" style="width: 360px"></el-input>
            </el-form-item>

            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="accountBind.data.email" placeholder="请输入绑定邮箱" style="width: 360px"></el-input>
              <a class="bind">立即绑定</a>
            </el-form-item>

            <el-form-item label="QQ:" prop="qq">
              <el-input v-model="accountBind.data.qq" placeholder="请输入绑定QQ号" style="width: 360px"></el-input>
              <a class="bind">立即绑定</a>
            </el-form-item>
            <el-form-item label="第三方微信登录:" prop="wechat">
              <span class="ifBind">未绑定</span>
              <span class="wechat">
             第三方登录绑定只能在登录页面进行授权绑定
           </span>
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

        accountBind: {
          id: '',
          name: '',
          method: '',
          enctype: '',
          submitAddr: '',
          data: {
            mobile: '',
            email: '',
            qq: '',
            wechat: ''
          },
          rules: Rules.basicInfo
        }

      }
    },
    created: function () {
      this.initFormData()
      //console.log(this.accountBind)
    },
    methods: {
      initFormData: function () {
        this.$http(this.$_.merge({}, Action.Form.list, {})).then(response => {
          this.accountBind = response.body
        }, response => {
          alert(response.body)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            console.log(this.accountBind)

            this.$http(this.$_.merge({}, Action.Form.update, {
              url: Helper.FG.setParams(Action.Form.update.url, {id: this.accountBind.id}),
              body: this.accountBind
            })).then(response => {
              this.initFormData()
              alert(response.body)
            }, response => {
              alert(response.body)
            })

          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }

  }
</script>

<style lang="scss" scoped>

  @import "../../../assets/admin/css/main/_param.scss";

  .wechat {
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #FF3300;
  }

  .bind {
    width: 56px;
    display: inline-block;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #4FA2FF;
    margin-left: 33px;
    cursor: pointer;
  }

  .ifBind {
    font-size: 14px;
    color: #182737;
    margin: 0 16px;
  }

</style>


