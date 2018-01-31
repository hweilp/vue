<template>
  <div >
    <div v-if="loginForm.dialogVisible">
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名：" prop="username">
          <el-input type="text" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" v-model="loginForm.password" @keyup.enter.native="handleSubmitForm('loginForm')"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"  >登录</el-button>
          <!--<el-button @click="handleLogin">重置</el-button>-->
          <el-button type="text" class="forgetPwd" @click="FG_handleForget">忘记密码</el-button>
        </el-form-item>
        <!--<el-input v-model="sessionId"></el-input>-->
      </el-form>
    </div>
    <div v-if="forgetPwdForm.getValidCode.dialogVisible">
      <el-form  :model="forgetPwdForm.getValidCode.data" :rules="forgetPwdForm.getValidCode.getValidCodeRules" ref="getValidCodeForm" label-width="120px"
                class="forgetPwdForm">

          <el-row :span="24" style="height: 60px;color: #20a0ff;font: 17px/36px swash;">获取手机短信验证码</el-row>
          <el-form-item label="员工号：" prop="empNo" >
            <el-input type="text" v-model="forgetPwdForm.getValidCode.data.empNo"></el-input>
          </el-form-item>

          <!--<el-form-item label="手机号：" prop="mobile" class="is-required">-->
            <!--<el-input type="text" v-model="forgetPwdForm.getValidCode.data.mobile"></el-input>-->
          <!--</el-form-item>-->



          <el-form-item>
            <el-button type="primary" @click="handleNext('getValidCodeForm')">下一步</el-button>
            <!--<el-button type="primary" @click="getValidCodeSubmitForm('getValidCodeForm')">获取短信验证码</el-button>-->
            <el-button :plain="true" type="danger" @click="forgetPwdCancelForm('getValidCodeForm')">取消</el-button>
          </el-form-item>
      </el-form>
    </div>


    <div v-if="forgetPwdForm.dialogVisible">
      <el-form  :model="forgetPwdForm.data" :rules="forgetPwdForm.forgetPwdFormRules" ref="forgetPwdForm" label-width="140px" class="forgetPwdForm">

        <el-row :span="24" style="height: 60px;color: #20a0ff;font: 17px/36px swash;">重新设置密码</el-row>

        <el-form-item label="新密码：" prop="newPwd">
          <el-input type="password" v-model="forgetPwdForm.data.newPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="confirmPwd">
          <el-input type="password" v-model="forgetPwdForm.data.confirmPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="短信验证码：" prop="validCode" style="position:relative;">
          <el-input type="text" v-model="forgetPwdForm.data.validCode" class="validCode"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="FG_handlePrev">上一步</el-button>
          <el-button type="primary" @click="forgetPwdSubmitForm('forgetPwdForm')">提交</el-button>
          <el-button :plain="true" type="danger" @click="forgetPwdCancelForm('forgetPwdForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>


  </div>
</template>


<style lang="scss" scoped>
.demo-ruleForm,.forgetPwdForm{
  width: 460px;
  margin: auto;
  margin-top: 300px;
  .el-form-item{
    position: relative;
    .forgetPwd{
      position: absolute;
      right:0;
      &:hover{
        color:#ff4949;
      }
    }
  }
}
  .forgetPwdForm{
    width: 480px;
    margin-top: 200px;
  }
  .getValidCode{
    position: absolute;
    color: rgb(32, 160, 255);
    right:4px;
    top:0;
    text-decoration-line: none;
    &:hover{
      color:#ff4949;
    }
  }



</style>

<script type="text/javascript">

  import Action from '@/assets/admin/resource/actions.js'
  import Helper from '@/assets/admin/js/helper.js'
  import {mapMutations} from 'vuex'
  import _ from 'lodash'
  import ElForm from '../../../../node_modules/element-ui/packages/form/src/form'
  import Rules from '@/assets/admin/resource/rules.js'
  import PictureCode from '@/components/compos/pictureCode/picture-code.vue'

  export default {
    data: function () {

      var validateConfirmPwd = (rule, value, callback) => {

        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.forgetPwdForm.data.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }

      };
      return {
        loginForm: {
          dialogVisible:true,
          username: '100177101',
          password: '186390',
        },
        loginFormRules:{
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]

        },
        forgetPwdForm:{
          dialogVisible:false,
          data:{
            newPwd:'',
            confirmPwd:'',
            validCode:''
          },
          getValidCode:{
            src:"http://t-img.cngtxy.net/data/category/icon/2.png",
            captchaContent:'',
            dialogVisible:false,
            data:{
              empNo:"",
              validCode:''
            },
            getValidCodeRules:{
              mobile: [
                {required: true, message: "请输入手机号", trigger: 'blur'},
                {pattern: /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/, message: "请输入有效的手机号", trigger: 'blur'}
              ],
              empNo : [
                {required: true, message: '请输入员工号', trigger: 'blur'},
                {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
              ],
              validCode:[
                {required: true, message: '请输入短信验证码', trigger: 'blur'}
              ],
              captchaText:[
                {required: true, message: '请输入验证码', trigger: 'blur'}
              ]
            }
          },

          forgetPwdFormRules:{
            newPwd:[
              {required: true, message: '请输入新密码', trigger: 'blur'}
            ],
            confirmPwd:[
              {required: true, validator: validateConfirmPwd,  trigger: 'blur' },
            ],
            validCode:[
              {required: true, message: '请输入短信验证码', trigger: 'blur'}
            ],
          }
        },

      }
    },
    created: function () {

    },
    computed: {},
    methods: {
      ...mapMutations(['User/SET_USER_SESSION']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http(this.$_.merge({timeout: 3000,}, Action.Passport.doLogin, {
              //获取待更新数据
//              body: 'username='+this.loginForm.username+'&password='+this.loginForm.password+'captchaId='+100000+'captchaStr='+'100000',
              body: {
                username: this.loginForm.username,
                password: this.loginForm.password,
              /*  captchaId: 100000,
                captchaStr: 100000*/
              }
            })).then(response => {
              this['User/SET_USER_SESSION'](response.body.sessionId)
              this.$store.dispatch('User/userLogin', response);

              let message = response.body.resultMessage || '请求成功';
              this.$message({
                type: 'success',
                message: message
              });

              //发送结果
              this.$emit('finish', true)
            }, response => {
              let message = response.body || '登录失败';
              this.$message.error(message.resultMessage?message.resultMessage:"登录失败")

              //发送结果
              this.$emit('finish', false)
            })
          } else {
            return false;
          }
        });
      },
      handleSubmitForm(formName){
        this.submitForm(formName)
      },
      // 忘记密码
      FG_handleForget(){
        this.loginForm.dialogVisible = false
        this.forgetPwdForm.getValidCode.dialogVisible = true
      },

      // 取消
      forgetPwdCancelForm(formName){
        this.$refs[formName].resetFields();
        this.loginForm.dialogVisible = true
        this.forgetPwdForm.getValidCode.dialogVisible = false
        this.forgetPwdForm.dialogVisible = false
        clear(this.forgetPwdForm.data)
        clear(this.forgetPwdForm.getValidCode.data)
        function clear(data) {
          for(var i in data){
            data[i] = ""
          }
        }
      },
      //获取短信验证码
      getValidCodeSubmitForm(){
        var flag = true;
        this.$http(this.$_.merge({timeout: 3000,}, Action.Passport.getValidCode, {body :{empNo:this.forgetPwdForm.getValidCode.data.empNo} })).then(response => {
          this.$message({type:'success',message:"短信已发送，请注意查收！"});
          flag = true;
          this.forgetPwdForm.getValidCode.dialogVisible = false
          this.forgetPwdForm.dialogVisible = true
        },response =>{
            flag = true;
            this.$message.error( response.body.resultMessage, response.body);
        })

      },
      // 下一步
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.forgetPwdForm.getValidCode.data.empNo == ''){
                 this.$message({
                   type:"warning",
                   message : '员工号不能为空'
                 })
                }else {
                  this.getValidCodeSubmitForm()
                }
            }else {
              return false;
            }
        });

      },
      //上一步
      FG_handlePrev(){
        this.forgetPwdForm.getValidCode.dialogVisible = true
        this.forgetPwdForm.dialogVisible = false
      },
      // 提交新密码
      forgetPwdSubmitForm(formName){
        var flag = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(!flag) {return}
            flag = false;
            this.forgetPwdForm.data.empNo = this.forgetPwdForm.getValidCode.data.empNo
            this.$http(this.$_.merge({timeout: 3000,}, Action.Passport.forgetPwdSubmit, {body : this.forgetPwdForm.data})).then(response => {
              this.$message({type:'success',message:"密码已更改"});
              this.loginForm.dialogVisible = true
              this.forgetPwdForm.dialogVisible = false
              flag = true
            },response =>{
              flag = true
              this.$message.error( response.body.resultMessage, response.body);
            })

          } else {
            return false;
          }
        });
      },
      codeDataUpdate(val){
        this.forgetPwdForm.getValidCode.captchaContent = val.captchaText
        this.forgetPwdForm.getValidCode.data.captchaId = val.captchaId
      }
    },
    components: {ElForm,PictureCode}
  }
</script>
