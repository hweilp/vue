<template>
  <div id="imgUpload">
    <el-upload
      class="avatar-uploader"
      :action="action"
      :show-file-list="false"
      :on-success="FG_IMGUPLOAD_handleAvatarSuccess"
      :before-upload="FG_IMGUPLOAD_beforeAvatarUpload">
      <img v-if="imageUrl"
           :src="imageUrl"
           class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script type="text/javascript">

  export default {
    props:['action','imageUrl'],
    data(){
      return {
        imageUrl: '',
        action:''
      }
    },
    created: function () {

      console.log(this.action)
      console.log(this.imageUrl)
    },
    methods: {
      //图片上传
      FG_IMGUPLOAD_handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
        this.$emit("imgUpload",this.imageUrl)
      },
      FG_IMGUPLOAD_beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>
