<template>
  <!-- MAIN PANEL -->
  <div id="main" role="main">

    <div id="set">
      <div class="setTitle">销售设置</div>
      <el-form ref="ruleForm" :model="formSeller.data" label-width="165px" id="setForm" :rules="formSeller.rules" name="ruleForm" prop="id">
        <el-form-item label="开启电子秤码无档销售:" prop="scales">
          <el-radio-group v-model="formSeller.data.scales">
            <el-radio label="启用"></el-radio>
            <el-radio label="不启用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开启国标条码无档销售:" prop="international">
          <el-radio-group v-model="formSeller.data.international">
            <el-radio label="启用"></el-radio>
            <el-radio label="不启用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开启自编码无档销售:" prop="self">
          <el-radio-group v-model="formSeller.data.self">
            <el-radio label="启用"></el-radio>
            <el-radio label="不启用"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开启输入价格销售:" prop="price">
          <el-radio-group v-model="formSeller.data.price">
            <el-radio label="启用"></el-radio>
            <el-radio label="不启用"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="活动名称" prop="name">
          <el-input v-model="formSeller.data.name"></el-input>
        </el-form-item>

        <el-form-item label="活动地点" prop="region">
          <el-input v-model="formSeller.data.region"></el-input>
        </el-form-item>
        </el-form-item>

        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="formSeller.data.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
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


              formSeller:{
                id:'',
                name:'',
                method:'',
                enctype:'',
                submitAddr:'',
                data:{
                  scales: '',
                  international: '',
                  self: '',
                  price: '',
                  name: '',
                  region: '',
                  desc: ''
                },
                rules:Rules.Seller
              }



      }
    },
    created: function () {
      this.initFormData();
      //console.log(this.formSeller)
    },
    methods: {
      initFormData: function () {
        this.$http(this.$_.merge({}, Action.Form.list, {})).then(response => {
          this.formSeller = response.body
        }, response => {
          alert(response.body)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

             console.log(this.formSeller)

            this.$http(this.$_.merge({}, Action.Form.update, {
              url: Helper.FG.setParams(Action.Form.update.url, {id: this.formSeller.id}),
              body: this.formSeller
            })).then(response => {
              this.initFormData();
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
  #set {
    margin-top: 20px;
    margin-left: 20px;
    height: 795px;
    background: inherit;
    background-color: rgba(246, 246, 246, 1);
    box-shadow: -4px 5px 8px rgba(79, 162, 255, 0.0784313725490196);
    border-radius: 5px;
    color: #1E2E3E;
    font-size: 13px;

  .setTitle {
    width: 100%;
    background: #FFF;
    height: 50px;
    line-height: 50px;
    padding-left: 33px;
    padding-top: 2px;
    box-sizing: border-box;
    font-size: 18px;
    font-weight: 700;
  }

  #setForm {
    width: 545px;
    height: 657px;
    margin-left: 177px;
    margin-top: 30px;

  label:before {
    content: '';
  }

  }
  }
</style>


