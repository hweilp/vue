<template>
  <!-- MAIN PANEL -->
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          基本资料
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-form ref="ruleForm" :model="formBasicInfo.data" label-width="165px" id="setForm"
                   :rules="formBasicInfo.rules"
                   name="ruleForm" prop="id" style="margin-top: 20px" >


            <el-form-item label="姓名:" prop="name">
              <el-input v-model="formBasicInfo.data.name" style="width: 360px"></el-input>
            </el-form-item>

            <el-form-item label="手机:" prop="mobile">
              <el-input v-model="formBasicInfo.data.mobile" style="width: 360px"></el-input>
            </el-form-item>


            <el-form-item label="地址:" required >
              <el-form-item class="site" prop="prov" style="width: 110px;display: inline-block;margin-right: 10px">
                <el-select v-model="formBasicInfo.data.prov" filterable placeholder="请选择">
                  <el-option
                    v-for="item in provs"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="site" prop="city" style="width: 110px;display: inline-block;margin-right: 10px">
                <el-select v-model="formBasicInfo.data.city" filterable placeholder="请选择">
                  <el-option
                    v-for="item in city"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="site" prop="dist" style="width: 110px;display: inline-block">
                <el-select v-model="formBasicInfo.data.dist" filterable placeholder="请选择">
                  <el-option
                    v-for="item in dist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="formBasicInfo.data.email" style="width: 360px"></el-input>
            </el-form-item>
            <el-form-item label="QQ:" prop="qq">
              <el-input v-model="formBasicInfo.data.qq" style="width: 360px"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">编辑</el-button>
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

        provs: [{
          value: '选项1',
          label: '北京'
        }, {
          value: '选项2',
          label: '上海'
        }, {
          value: '选项3',
          label: '广州'
        }],
        city: [{
          value: '选项1',
          label: '北京'
        }, {
          value: '选项2',
          label: '上海'
        }, {
          value: '选项3',
          label: '广州'
        }],
        dist: [{
          value: '选项1',
          label: '北京'
        }, {
          value: '选项2',
          label: '上海'
        }, {
          value: '选项3',
          label: '广州'
        }],
        formBasicInfo: {
          id: '',
          name: '',
          method: '',
          enctype: '',
          submitAddr: '',
          data: {
            name: '',
            mobile: '',
            prov: '',
            city: '',
            dist: '',
            email: '',
            qq: ''
          },
          rules: Rules.basicInfo
        }

      }
    },
    created: function () {
      this.initFormData()
      //console.log(this.formBasicInfo)
    },
    methods: {
      initFormData: function () {
        this.$http(this.$_.merge({}, Action.Form.list, {})).then(response => {
          this.formBasicInfo = response.body
        }, response => {
          alert(response.body)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            console.log(this.formBasicInfo)

            this.$http(this.$_.merge({}, Action.Form.update, {
              url: Helper.FG.setParams(Action.Form.update.url, {id: this.formBasicInfo.id}),
              body: this.formBasicInfo
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
  @import "../../../assets/admin/css/system/formInfo.scss";
</style>


