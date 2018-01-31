<template>

  <div id="imgUpload">
    <el-upload
      :action="upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="handleBefore"
      :headers="headers"
      :file-list="fileLists"
      :disabled="disabled">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>

</template>

<style lang="scss" scoped>

</style>
<script>
  import Action from '@/assets/admin/resource/actions.js'
  export default {
    data() {
      return {
        headers:{
          mid : this.$store.state.User.merchantMID,
          bid:this.bid
        },
        upload: Action.imgUpload.upload,

        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,

        fileLists: [],
      };
    },
    props: ['pictureUrl','removePicture','bid'],
    watch: {
      pictureUrl(val){
        if(typeof(val)=='object'){
          if(val.path!==null){
            this.fileLists = [{url: val.url}]
            this.$emit('update:pictureUrl',val.path)
          }else{
            this.fileLists = []
            this.$emit('update:pictureUrl','')
          }
        }else if(!val){
          this.fileLists = []
        }
      }
      /* fileLists(val){
       if(val.length){
       this.disabled=true
       }else{
       this.disabled=false
       }
       }*/
    },
    created() {
       if(this.pictureUrl.path){
        this.fileLists = [{url: this.pictureUrl.url}]
        this.$emit('update:pictureUrl',this.pictureUrl.path)
      }else{
        this.fileLists = []
        this.$emit('update:pictureUrl','')
      }
    },
    methods: {
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleBefore(file){
        //return this.fileLists.length === 1 ? false : true // 只让它上传一张
      },
      handleSuccess(res, file, fileList){
        if(this.pictureUrl){
          this.removePicture.push(this.pictureUrl)
        }
        this.fileLists = [{url: res.imageUrl + res.filePaths[0]}]
        this.$emit('update:pictureUrl', res.filePaths[0])
      },
      handleRemove(file, fileList) {
//        this.$http(this.$_.merge({}, Action.imgUpload.remove, {
//          body: {url: this.pictureUrl}
//        })).then(response => {
//          this.$message({
//            type:'success',
//            message : '图片删除'  + response.body.resultMessage
//          })
//        }, response => {
//            this.$message.error(response.body.resultMessage, response.body)
//        })
        this.removePicture.push(this.pictureUrl)
        this.$emit('update:pictureUrl','')
      },
    }
  }
</script>
