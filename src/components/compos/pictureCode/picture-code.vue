<template>
  <div id="picture_code">
    <span @click="updateCode"><img :src="src" alt=""></span>
  </div>
</template>

<style lang="scss" scoped>
 #picture_code{
   position: absolute;
   height:30px;
   width: 66px;
   right:3px;
   top:3px;
   span{
     display: inline-block;
     height:100%;
     width: 100%;
     cursor: pointer;
   }
   img{
     height:100%;
     width: 100%;
   }
 }
</style>

<script type="text/javascript">
  import Action from '@/assets/admin/resource/actions.js'
  export default {
    data(){
      return {
        src:'',
        codeData:{
          captchaText:'',
          captchaId:""
        }
      }
    },
    created(){
        this.getPictureCode();
    },
//    props:["src"],
    methods: {
      //获取图形验证码
      getPictureCode(){
        this.$http(this.$_.merge({timeout: 3000,}, Action.Passport.getPictureCode, {})).then(response => {
          console.log(response)
          this.codeData.captchaId  =  response.body.captchaId;
          this.codeData.captchaText  =  response.body.captchaText;
          this.src = 'data:image/png;base64,'+response.body.captchaStr;
          this.$emit('code_data_update', this.codeData)
        },response =>{
          this.$message.error( response.body.resultMessage, response.body);
        })
      },
      updateCode:function () {
        this.getPictureCode()
      },


    }
  }
</script>
