<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">

        <el-row :span="24" class="fg-content-title">
          商户资料
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-form ref="FG_FORM_merchantInfoForm" :model="FG_FORM_merchantInfoForm.data" label-width="165px"
                   id="setForm"
                   :rules="FG_FORM_merchantInfoForm.rules"
                   name="FG_FORM_merchantInfoForm" prop="id">
            <el-row :span="24" class="fg-content-bar">
              商户信息
              <el-row :span="24" style="margin-top: 20px">
                <el-form-item label="商户ID:" prop="id">
                  <el-input v-model="FG_FORM_merchantInfoForm.data.id" style="width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="商户注册手机:" prop="mobile">
                  <el-input v-model="FG_FORM_merchantInfoForm.data.mobile" style="width: 360px"></el-input>
                </el-form-item>
              </el-row>
              <el-row :span="24">
                <el-form-item label="所属区域:" prop="areaCode">
                  <areaSelect @area="FG_SELECT_getArea"></areaSelect>
                </el-form-item>
                <el-form-item label="商户邮箱:" prop="email">
                  <el-input v-model="FG_FORM_merchantInfoForm.data.email" style="width: 360px"></el-input>
                </el-form-item>
              </el-row>
              <el-row :span="24">
                <el-form-item label="营业执照代码:" prop="businessNo">
                  <el-input v-model="FG_FORM_merchantInfoForm.data.businessNo" style="width: 360px"></el-input>
                </el-form-item>
              </el-row>
              <el-row :span="24">
                <el-form-item label="营业执照正本照片" prop="businessPhoto1">
                  <imgUpload action="111" @imgUpload="FG_IMGUPLOAD_getImg" :imageUrl="FG_FORM_merchantInfoForm.data.businessPhoto1"></imgUpload>
                </el-form-item>
              </el-row>
              <el-row :span="24">
                <el-form-item label="营业执照副本照片" prop="businessPhoto2">
                  <imgUpload action="222" @imgUpload="FG_IMGUPLOAD_getImg" :imageUrl="FG_FORM_merchantInfoForm.data.businessPhoto2"></imgUpload>
                </el-form-item>
              </el-row>


            </el-row>
            <el-row :span="24" class="fg-content-bar">
              联系人信息
              <el-row :span="24" style="margin-top: 20px">
                <el-form-item label="商户法人（联系人）:" prop="legalPerson">
                  <el-input v-model="FG_FORM_merchantInfoForm.data.legalPerson" style="width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="证件号:" prop="certNo">
                  <el-input v-model="FG_FORM_merchantInfoForm.data.certNo" style="width: 360px"></el-input>
                </el-form-item>
              </el-row>
              <el-row :span="24">
                <el-form-item label="法人证件照" prop="legalPersonPhoto">
                  <imgUpload action="333" @imgUpload="FG_IMGUPLOAD_getImg" :imageUrl="FG_FORM_merchantInfoForm.data.businessPhoto3"></imgUpload>
                </el-form-item>
              </el-row>
              <el-row :span="24" style="margin-left: 170px">
                <el-form-item>
                  <el-button type="primary" @click="FG_FORM_submitForm('FG_FORM_merchantInfoForm')">保存</el-button>
                </el-form-item>
              </el-row>
            </el-row>
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
  import areaSelect from '@/components/compos/area/areaSelect'
  import imgUpload from '@/components/compos/imgUpload/imgUpload'
  export default {
    data() {
      return {

        FG_FORM_merchantInfoForm: {
          id: '',
          name: '',
          method: '',
          enctype: '',
          submitAddr: '',
          data: {
            id: '',
            mobile: '',
            areaCode: '',
            email: '',
            businessNo: '',
            businessPhoto1: '',
            businessPhoto2: '',
            legalPerson: '',
            certNo: '',
            legalPersonPhoto: '',
          },
          rules: Rules.System.merchantInfo
        }

      }
    },
    created: function () {
      this.FG_FORM_initData()
    },
    methods: {
      //获取商户信息
      FG_FORM_initData (){

        this.$http(this.$_.merge({}, Action.System.merchantInfo.list,)).then(response => {
          //获取商户视图信息
          this.FG_FORM_merchantInfoForm.data = response.body
          this.FG_FORM_merchantInfoForm.data.mobile = this.FG_FORM_merchantInfoForm.data.mobile.toString()
          this.FG_FORM_merchantInfoForm.data.id = this.FG_FORM_merchantInfoForm.data.id.toString()
          //console.log(this.FG_FORM_merchantInfoForm.data)

        }, response => {
          //console.log(response)
        })
      },
      //修改商户信息
      FG_FORM_submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = data
            this.$http(this.$_.merge({}, Action.System.merchantInfo.update, {params})).then(response => {
              //修改商户视图信息
              //console.log(response)

            }, response => {
              //console.log(response)
            })
          } else {
            //console.log('error submit!!')
            return false
          }
        })
      },

      //获取地区列表
      FG_SELECT_getArea(area){
        this.FG_FORM_merchantInfoForm.data.areaCode = area
      },
      //上传图片
      FG_IMGUPLOAD_getImg(imageUrl){
           console.log(imageUrl)
      }
    },
    components: {
      areaSelect,
      imgUpload
    },
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/_param.scss";
</style>


