<template>

  <div v-if="(input.status == 1)">
    <div v-if="(input.type.name == 'text')">
      <section>
        <label class="label">{{input.label}}</label>
        <label class="input">
          <input type="text" class="input-sm" :name="input.name" v-model="input.value" :placeholder="input.placeholder">
        </label>
      </section>
    </div>
    <div v-else-if="(input.type.name == 'select')">
      <section>
        <label class="label">{{input.label}}</label>
        <label class="select">
          <select class="input-sm" v-model="input.value">
            <option value="">- 请选择 -</option>
            <option v-for="option in input.values" :value="option.value">{{option.name}}</option>
          </select> <i></i>
        </label>
      </section>
    </div>
    <div v-else-if="(input.type.name == 'radio')">
      <section>
        <label class="label">{{input.label}}</label>
        <div class="inline-group">
          <label class="radio" v-for="option in input.values" v-if="(option.status == 1)">
            <input type="radio" v-model="input.value" :value="option.value">
            <i></i>{{option.name}}
          </label>
        </div>
      </section>
    </div>
    <div v-else-if="(input.type.name == 'checkbox')">
      <section>
        <label class="label">{{input.label}}</label>
        <div class="inline-group">
          <label class="checkbox" v-for="option in input.values" v-if="(option.status == 1)">
            <input type="checkbox" v-model="input.value" :value="option.value">
            <i></i>{{option.name}}</label>
        </div>
      </section>
    </div>
    <div v-else-if="(input.type.name == 'image')">

      <section>
        <label class="label">{{input.label}}</label>

        <el-upload
          class="avatar-uploader"
          :action="actionUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar el-single-image">
          <i v-else class="el-icon-plus
           avatar-uploader-icon"></i>
        </el-upload>
      </section>
    </div>

    <div v-else-if="(input.type.name == 'images')">

      <section>
        <label class="label">{{input.label}}</label>
        <el-upload
          :action="actionUrl"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :multiple=true
          name="file"
          list-type="picture-card"
          :file-list="files">
          <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <el-button size="small" type="primary">点击上传</el-button>
          <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
      </section>
    </div>
  </div>

  <!--<section>-->
  <!--<label class="label">状态</label>-->
  <!--<div class="inline-group">-->
  <!--<label class="radio">-->
  <!--<input type="radio" v-model="formInfo.data.status" value="1">-->
  <!--<i></i>启用</label>-->
  <!--<label class="radio">-->
  <!--<input type="radio" v-model="formInfo.data.status" value="2">-->
  <!--<i></i>禁用</label>-->
  <!--</div>-->
  <!--</section>-->
</template>

<style lang="scss" >
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'

  export default {
    data(){
      return {
        files: [],
        actionUrl: '',
        imageUrl: '',
      }
    },
    name: 'form-input',
    props: ['input'],
    created: function () {
      if (this.input.type.name == 'radio') {
        let target = _.find(this.input.values, function (o) {
          return o.is_choiced == 1 && o.status == 1
        })
        if (target) {
          this.input.value = target.value
        }
      }
      if (this.input.type.name == 'checkbox') {
        this.input.value = []
        let vm = this
        _.each(this.input.values, function (o) {
          if (o.is_choiced == 1) {
            vm.input.value.push(o.value)
          }
        })
      }

      this.actionUrl = Action.Upload.file.url
    },
    watch: {},
    computed: {},
    methods: {
      attacheFile: function (input, $event) {

      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePreview(file) {
        console.log(file)
      },
      showRes: function (res, data) {
//        console.log(arguments)
//        window.aaa = data.raw
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
    },
    components: {},
  }
</script>
