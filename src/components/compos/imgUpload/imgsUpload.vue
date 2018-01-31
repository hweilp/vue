<template>
  <div id="imgsUpload">
    <el-upload
      :action="upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="handleBefore"
      :headers="headers"
      :multiple="true"
      :file-list="fileLists">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<style lang="scss">

</style>

<script type="text/javascript">
  import Action from '@/assets/admin/resource/actions.js'

  export default {
    data(){
      return {
        headers:{
          mid : this.$store.state.User.merchantMID,
          bid:this.bid
        },
        upload: Action.imgUpload.upload,

        dialogImageUrl: '',
        dialogVisible: false,

        fileLists: [],

        path: []
      }
    },
    props: ['pictureUrls','removePicture','bid'],
    watch: {
      pictureUrls(val){

        if (typeof(val) == 'object') {
          this.fileLists = val

          for (let i = 0; i < val.length; i++) {
            this.path.push(val[i].path)
          }

          this.$emit('update:pictureUrls', this.path.join())
        }
      }

    },
    methods: {
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //处理图片上传之前
      handleBefore(){
        //return this.fileList.length === 1 ? false : true // 只让它上传一张
      },
      //处理图片上传成功
      handleSuccess(res, file, fileList){
        this.path.push(res.filePaths[0])
        this.$emit('update:pictureUrls', this.path.join())
      },
      //处理图片删除
      handleRemove(file, fileList) {

        if(file.path){
          this.removePicture.push(file.path)
          for (let i = 0; i < this.path.length; i++) {
            if (this.path[i] == file.path) {
              this.path.splice(i, 1);
              break;
            }
          }
        }else{
          this.removePicture.push(file.response.filePaths[0])
          for (let i = 0; i < this.path.length; i++) {
            if (this.path[i] == file.response.filePaths[0]) {
              this.path.splice(i, 1);
              break;
            }
          }
        }


        this.$emit('update:pictureUrls', this.path.join())
      },
    }
  }
</script>
