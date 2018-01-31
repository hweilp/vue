<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="">

        <div class="container">
          <div class="content">
            <el-row :span="24" class="fg-content-title">会员资料 - 新增</el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-opr">
                <el-form ref="addForm" :model="FG_vipRow.data" label-width="130px" style="background: white;padding: 50px 80px;"
                         :rules="FG_vipRow.rules">
                  <el-row :span="24" >
                    <el-col :span="24">
                      <el-form-item label="手机号 ：" prop="mobile">
                        <el-input v-model="FG_vipRow.data.mobile"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="登录密码 ：" prop="password">
                        <el-input v-model="FG_vipRow.data.password" type="password"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="确认登录密码 ：" prop="confirmPwd">
                        <el-input v-model="FG_vipRow.data.confirmPwd" type="password"></el-input>
                      </el-form-item>

                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="会员类别  ：" prop="vipCategory">
                        <el-select v-model="FG_vipRow.data.vipCategory" placeholder="" style="width: 360px;">
                          <el-option
                            v-for="item in FG_vipRow.options.vipCategory"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>




                    </el-col>
                    <el-col :span="12">
                    <el-form-item label="姓名 ：" prop="name">
                      <el-input v-model="FG_vipRow.data.name" ></el-input>
                    </el-form-item>
                  </el-col>

                    <el-col :span="12">
                      <el-form-item label="身份证 ：" prop="certNo">
                        <el-input v-model="FG_vipRow.data.certNo" ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="出生日期 ：" prop="birthday">
                        <el-date-picker type="date" placeholder="选择日期" v-model="FG_vipRow.data.birthday" style="width: 360px"></el-date-picker>

                      </el-form-item>
                    </el-col>
                    <el-col :span="12">

                      <el-form-item label="性别 ：" prop="gender">
                          <el-radio-group v-model="FG_vipRow.data.gender">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                          </el-radio-group>
                      </el-form-item>

                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="邮箱 ：" prop="email">
                        <el-input v-model="FG_vipRow.data.email"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="所在地址 ：" prop="">
                        <areaSelect @area="FG_SELECT_getArea"></areaSelect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label=" " prop="detailAddress">
                        <el-input v-model="FG_vipRow.data.detailAddress" placeholder="详细地址信息"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="婚否 ：" prop="isMarried">
                        <el-radio-group v-model="FG_vipRow.data.isMarried">
                          <el-radio :label="1">未婚</el-radio>
                          <el-radio :label="2">已婚</el-radio>
                        </el-radio-group>

                      </el-form-item>

                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="孩子 ：" prop="son">
                        <el-input v-model="FG_vipRow.data.son"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="配偶姓名 ：" prop="spouseName">
                        <el-input v-model="FG_vipRow.data.spouseName"></el-input>
                      </el-form-item>

                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="配偶手机 ：" prop="spouseMobile">
                        <el-input v-model="FG_vipRow.data.spouseMobile"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="配偶生日 ：" prop="spouseBirthday">
                        <el-date-picker type="date" placeholder="选择日期" v-model="FG_vipRow.data.spouseBirthday" style="width: 360px"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="配偶邮箱 ：" prop="spouseEmail">
                        <el-input v-model="FG_vipRow.data.spouseEmail"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                      <el-form-item label="">
                        <el-button type="primary" @click="FG_vipRowSubmit('addForm')">保存</el-button>
                        <el-button @click="FG_invoiceForm.dialogVisible = false">取 消</el-button>
                      </el-form-item>
                    </el-col>


                  </el-row>
                </el-form>
              </el-row>


            </el-row>


          </div>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import areaSelect from '@/components/compos/area/areaSelect'
  export default{
    data (){
      return {
        FG_vipRow:{
          data:{
            mobile:"",
            password:"",
            confirmPwd:"",
            vipCategory:"1",
            name:"",
            certNo:"",
            birthday:"",
            gender:1,
            email:'',
            detailAddress:"",
            areaCode:"",
            isMarried:1,
            son:"",
            spouseBirthday:"",
            spouseName:'',//柜员配偶姓名
            spouseMobile:"",//柜员配偶手机
            spouseEmail:""
          },
          options:{
            vipCategory:[
              {value:"1" , label: "普通用户"},
              {value: "2", label: "一级会员"},
              {value: "3", label: "二级会员"},
              {value: "4", label: "三级会员"},
              {value: "5", label: "黄金会员"},
              {value: "6", label: "砖石会员"},
              {value: "7", label: "至尊会员"},
            ],
            roleOptions: [
              {value: 1, label: "系统角色"},
              {value: 2, label: "自定义角色"},

            ],
          },
          rules:Rules.VipManage.addRow
        },

        merchantID: 888888,

      }
    },
    created: function () {
//      this.FG_vipRow_initData()
    },
    methods: {
      FG_SELECT_getArea(area){
        this.FG_vipRow.data.areaCode = area
      },
      FG_vipRowSubmit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.FG_vipRow.data)
          } else {
            return false
          }
        })
      }
    },
    mounted() {

    },
    components: {
      areaSelect,
    }
  }
</script>

<style lang="scss" scoped>

</style>
