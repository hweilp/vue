<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          员工信息 - 新增
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-tabs v-model="FG_activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="1">
              <el-form :model="FG_basicInfoForm.data" :rules="FG_basicInfoForm.rules" ref="FG_basicInfoForm"
                       label-width="166px"
                       class="demo-form-inline" :inline="true">
                <el-row style="margin-top: 20px;margin-left: 20px">
                  <el-form-item label="员工姓名 ：" prop="name">
                    <el-input v-model="FG_basicInfoForm.data.name"></el-input>
                  </el-form-item>
                  <el-form-item label="员工手机号 ：" prop="mobile">
                    <el-input v-model="FG_basicInfoForm.data.mobile"></el-input>
                  </el-form-item>
                </el-row>
                <el-row style="margin-left: 20px">

                  <el-form-item label="性别 ：" prop="gender">
                    <el-radio-group v-model.number="FG_basicInfoForm.data.gender" style="width: 360px">
                      <el-radio :label="1">男</el-radio>
                      <el-radio :label="2">女</el-radio>
                      <el-radio :label="3">保密</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="婚姻状况 ：" prop="maritalStatus">
                    <el-radio-group v-model.number="FG_basicInfoForm.data.maritalStatus" style="width: 360px">
                      <el-radio :label="1">未婚</el-radio>
                      <el-radio :label="2">已婚</el-radio>
                      <el-radio :label="3">离婚</el-radio>
                      <el-radio :label="4">保密</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-row>
                <el-row style="margin-left: 20px">
                  <el-form-item label="员工类型 ：" prop="type">
                    <el-radio-group v-model.number="FG_basicInfoForm.data.type" style="width: 360px">
                      <el-radio :label="10">正式员工</el-radio>
                      <el-radio :label="20">临时员工</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="员工角色 ：" prop="roleNos">
                    <el-checkbox-group v-model="FG_basicInfoForm.data.roleNos">
                      <el-checkbox v-for="item in FG_basicInfoForm.roleOptins"
                                   :label="item.roleNo"
                                   :key="item.roleNo"
                                   name="type"
                      >{{item.roleName}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-row>

                <el-row :span="24" style="margin-top: 20px;margin-left: 90px">
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
                       label-width="170px"
                       class="demo-form-inline" :inline="true">

                <el-row style="margin-top: 20px;margin-left: 20px">
                  <el-form-item label="员工编号 ：" prop="empNo">
                    <el-input v-model="FG_detailInfoForm.data.empNo " disabled></el-input>
                  </el-form-item>
                  <el-form-item label="员工生日 ：" prop="birthday">
                    <el-date-picker
                      v-model="FG_detailInfoForm.data.birthday"
                      align="right"
                      placeholder="选择日期"
                      :editable="false"
                      style="width: 360px"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-row>
                <el-row style="margin-left: 20px">
                  <el-form-item label="证件类型 ：" prop="certType">
                    <el-radio-group v-model.number="FG_detailInfoForm.data.certType" style="width: 360px">
                      <el-radio :label="10">身份证</el-radio>
                      <el-radio :label="20">护照</el-radio>
                      <el-radio :label="30">军官证</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="证件号码 ：" prop="certNo">
                    <el-input v-model="FG_detailInfoForm.data.certNo"></el-input>
                  </el-form-item>
                </el-row>
                <el-row style="margin-left: 20px">
                  <el-form-item label="银行卡开户银行名称 ：" prop="bankName">
                    <el-select v-model="FG_detailInfoForm.data.bankName" placeholder="请选择" filterable  style="width: 360px">
                      <el-option
                        v-for="item in FG_detailInfoForm.bankNameOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="银行卡号 ：" prop="bankCardNo">
                    <el-input v-model="FG_detailInfoForm.data.bankCardNo"></el-input>
                  </el-form-item>
                </el-row>
                <el-row style="margin-left: 20px">
                  <el-form-item label="员工出生省市区 ：" prop="birthAreaCode">
                    <areaSelect ref="area" :province.sync="FG_detailInfoForm.data.birthProvinceCode"
                                :city.sync="FG_detailInfoForm.data.birthCityCode"
                                :area.sync="FG_detailInfoForm.data.birthAreaCode"></areaSelect>
                  </el-form-item>
                  <el-form-item label="员工出生具体地址 ：" prop="birthAddress">
                    <el-input v-model="FG_detailInfoForm.data.birthAddress"></el-input>
                  </el-form-item>
                </el-row>
                <el-row style="margin-left: 20px">
                  <el-form-item label="员工配偶姓名 ：" prop="spouseName">
                    <el-input v-model="FG_detailInfoForm.data.spouseName"></el-input>
                  </el-form-item>
                  <el-form-item label="员工配偶手机 ：" prop="spouseMobile">
                    <el-input v-model="FG_detailInfoForm.data.spouseMobile"></el-input>
                  </el-form-item>
                </el-row>
                <el-row style="margin-left: 20px">
                  <el-form-item label="员工配偶生日 ：" prop="spouseBirthday">
                    <el-date-picker
                      v-model="FG_detailInfoForm.data.spouseBirthday"
                      align="right"
                      placeholder="选择日期"
                      :editable="false"
                      style="width: 360px"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="员工孩子 ：" prop="children">
                    <el-select v-model.number="FG_detailInfoForm.data.children" placeholder="请选择" style="width: 360px">
                      <el-option
                        v-for="item in FG_detailInfoForm.childrenOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row style="margin-left: 20px">
                  <el-form-item label="员工现居住省市区 ：" prop="resideAreaCode">
                    <areaSelect ref="area" :province.sync="FG_detailInfoForm.data.resideProvinceCode"
                                :city.sync="FG_detailInfoForm.data.resideCityCode"
                                :area.sync="FG_detailInfoForm.data.resideAreaCode"></areaSelect>
                  </el-form-item>
                  <el-form-item label="员工现居住具体地址 ：" prop="resideAddress">
                    <el-input v-model="FG_detailInfoForm.data.resideAddress"></el-input>
                  </el-form-item>
                </el-row>
                <el-row style="margin-left: 20px">
                  <el-form-item label="员工学历 ：" prop="education">
                    <el-select v-model.number="FG_detailInfoForm.data.education" placeholder="请选择" style="width: 360px">
                      <el-option
                        v-for="item in FG_detailInfoForm.educationOptions"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row style="margin-left: 20px">
                  <el-form-item label="员工照片 ：" prop="personPhoto">
                    <el-input v-model="FG_detailInfoForm.data.personPhoto" style="display: none"></el-input>
                    <img-upload :pictureUrl.sync="FG_detailInfoForm.data.personPhoto" :removePicture.sync="FG_detailInfoForm.picture" bid="personPhoto"></img-upload>
                  </el-form-item>
                  <el-form-item label="员工证件正面照片 ：" prop="certPhoto1">
                    <el-input v-model="FG_detailInfoForm.data.certPhoto1" style="display: none"></el-input>
                    <img-upload :pictureUrl.sync="FG_detailInfoForm.data.certPhoto1" :removePicture.sync="FG_detailInfoForm.picture" bid="certPhoto1"></img-upload>
                  </el-form-item>
                </el-row>
                <el-row style="margin-left: 20px">
                  <el-form-item label="员工证件背面照片 ：" prop="certPhoto2">
                    <el-input v-model="FG_detailInfoForm.data.certPhoto2" style="display: none"></el-input>
                    <img-upload :pictureUrl.sync="FG_detailInfoForm.data.certPhoto2" :removePicture.sync="FG_detailInfoForm.picture" bid="certPhoto2"></img-upload>
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

  import areaSelect from '@/components/compos/area/areaSelect'
  import imgUpload from '@/components/compos/imgUpload/imgUpload'
  import imgsUpload from '@/components/compos/imgUpload/imgsUpload'

  export default {
    data: function () {
      return {
        FG_activeName: '1',
        FG_basicInfoForm: {
          roleOptins:[],
          data: {
            name: '',
            mobile: '',
            gender: '',
            maritalStatus: '',
            type: '',
            roleNos:[]
          },
          rules: Rules.System.Staff.basicInfoForm
        },
        FG_detailInfoForm: {
          bankNameOptions:[
            {
                key:'中国工商银行',
                value:'中国工商银行'
            },
            {
              key:'中国农业银行',
              value:'中国农业银行'
            },
            {
              key:'中国建设银行',
              value:'中国建设银行'
            },
            {
              key:'中国银行',
              value:'中国银行'
            },
            {
              key:'交通银行',
              value:'交通银行'
            },
            {
              key:'招商银行',
              value:'招商银行'
            },
            {
              key:'邮政储蓄银行',
              value:'邮政储蓄银行'
            },
            {
              key:'光大银行',
              value:'光大银行'
            },
            {
              key:'民生银行',
              value:'民生银行'
            },
            {
              key:'平安银行',
              value:'平安银行'
            },
            {
              key:'浦发银行',
              value:'浦发银行'
            },
            {
              key:'中信银行',
              value:'中信银行'
            },
            {
              key:'兴业银行',
              value:'兴业银行'
            },
            {
              key:'华夏银行',
              value:'华夏银行'
            },
            {
              key:'北京银行',
              value:'北京银行'
            }
          ],
          childrenOptions:[
            {
              key:1010,
              value:'没有孩子'
            },
            {
              key:1110,
              value:'一个男孩'
            },
            {
              key:1011,
              value:'一个女孩'
            },
            {
              key:1111,
              value:'一个男孩一个女孩'
            }
          ],
          educationOptions:[
            {
              key:10,
              value:'小学'
            },
            {
              key:20,
              value:'中学'
            },
            {
              key:30,
              value:'高中'
            },
            {
              key:40,
              value:'大专'
            },
            {
              key:50,
              value:'本科'
            },
            {
              key:60,
              value:'硕士'
            }
          ],
          picture:[],
          data: {
            empNo: '',
            mobile: '',
            name: '',
            gender: '',
            maritalStatus: '',
            type: '',
            birthday: '',
            certType: '',
            certNo: '',
            bankName: '',
            bankCardNo: '',
            birthProvinceCode:'',
            birthCityCode:'',
            birthAreaCode: '',
            birthAddress: '',
            spouseName: '',
            spouseMobile: '',
            spouseBirthday: '',
            children: '',
            resideProvinceCode:'',
            resideCityCode:'',
            resideAreaCode: '',
            resideAddress: '',
            education: '',
            personPhoto: '',
            certPhoto1: '',
            certPhoto2: '',
            roleNos:'',
            status:1
          },
          rules: Rules.System.Staff.detailInfoForm
        }
      }
    },
    created: function () {
      this.$http(this.$_.merge({}, Action.System.Staff.roleList, {

      }))
        .then(response => {
          this.FG_basicInfoForm.roleOptins=response.body
        }, response => {
          this.$message.error(response.body.resultMessage, response.body)
        })
    },
    watch: {
      'FG_detailInfoForm.data.spouseBirthday': function (val) {
        if (val) {
          this.FG_detailInfoForm.data.spouseBirthday = Helper.FG.formatDate(val)
        }
      },
      'FG_detailInfoForm.data.birthday': function (val) {
        if (val) {
          this.FG_detailInfoForm.data.birthday = Helper.FG.formatDate(val)
        }
      }
    },
    methods: {
      //选项卡切换
      handleClick(tab, event) {
        //console.log(tab, event)
      },

      //基础信息表单操作
      FG_handleBasicInfoForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_basicInfoForm.data.roleNos=this.FG_basicInfoForm.data.roleNos.join()
            this.$http(this.$_.merge({}, Action.System.Staff.add, {
              body: this.FG_basicInfoForm.data
            }))
              .then(response => {
                Helper.FG.setValueToObject(this.FG_detailInfoForm.data, response.body.attachment)
                Helper.FG.setValueToObject(this.FG_detailInfoForm.data, this.FG_basicInfoForm.data)
                this.$message.success('新增员工基本信息成功', response.body)
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

        if (this.FG_detailInfoForm.data.empNo) {
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
              let params={}

              //this.FG_detailInfoForm.data.roleNos=this.FG_detailInfoForm.data.roleNos.join()

              for(let i in this.FG_detailInfoForm.data){
                if(this.FG_detailInfoForm.data[i]){
                  params[i]=this.FG_detailInfoForm.data[i]
                }
              }
              this.$http(this.$_.merge({}, Action.System.Staff.update, {
                body: params
              }))
                .then(response => {
                  this.$message.success('新增员工详情信息成功', response.body)
                  this.$router.push({path:"/system/staff"})
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
      imgUpload, imgsUpload, areaSelect
    }
  }

</script>
