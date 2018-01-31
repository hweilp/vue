<template>
  <div id="areaSelect">
    <el-select v-model="provinceValue" placeholder="请选择" @change="FG_SELECT_handleProvinceChange"
               @visible-change="FG_SELECT_handleProvince" :disabled="disabled">
      <el-option
        v-for="item in listProvince"
        :key="item.key"
        :label="item.value"
        :value="item.key">
      </el-option>
    </el-select>
    <el-select v-model="cityValue" placeholder="请选择" @change="FG_SELECT_handleCityChange" @visible-change="FG_SELECT_handleCity" :disabled="disabled">
      <el-option
        v-for="item in listCity"
        :key="item.key"
        :label="item.value"
        :value="item.key">
      </el-option>
    </el-select>
    <el-select v-model="areaValue" placeholder="请选择" style="margin-right: 0" @change="FG_SELECT_handleAreaChange" :disabled="disabled">
      <el-option
        v-for="item in listArea"
        :key="item.key"
        :label="item.value"
        :value="item.key">
      </el-option>
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
  #areaSelect {
    width: 360px;
    .el-select{
      margin-right: 3px;
      &:nth-last-of-type{
        margin-right: 0;
      }
    }
  }
</style>

<script type="text/javascript">
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  export default {
    data(){
      return {
        isdisabled:'',
        listProvince: [],
        provinceValue: '',
        listCity: [],
        cityValue: '',
        listArea: [],
        areaValue: '',
      }
    },
    props: ['province', 'city', 'area','disabled'],

    watch: {
      province: function (val) {
        if(val!==0){
          this.provinceValue = val
        }else{
          this.provinceValue=''
        }

      },
      city: function (val) {
        if(val!==0){
          this.cityValue = val
        }else{
          this.cityValue=''
        }
      },
      area: function (val) {
        if(val!==0){
          this.areaValue = val
        }else{
          this.areaValue=''
        }
      },
      provinceValue: function (val) {
        if(val){
          this.provinceValue = this.province.toString()
          this.cityValue=this.city.toString()
          this.areaValue=this.area.toString()
          this.$emit('update:province', val)
          let params = {
            provinceCode: val,
          }
          this.$http(this.$_.merge({}, Action.areaCode.listCity, {params})).then(response => {
            this.listCity = response.body


          }, response => {
            console.log(response)
          })
        }

      },
      cityValue: function (val) {
        if(val){
          this.$emit('update:city', val)
          let params = {
            cityCode: val,
          }
          this.$http(this.$_.merge({}, Action.areaCode.listArea, {params})).then(response => {
            this.listArea = response.body


          }, response => {
            console.log(response)
          })
        }else{
          this.$emit('update:city', val)
        }

      },
      areaValue: function (val) {
        if(val){
          this.$emit('update:area', val)
        }else{
          this.$emit('update:area', val)
        }

      }
    },
    created: function () {
      this.isdisabled=this.disabled
      this.$http(this.$_.merge({}, Action.areaCode.listProvince,)).then(response => {
        this.listProvince = response.body
      }, response => {
        console.log(response)
      })
      this.provinceValue = this.province.toString()
      this.cityValue=this.city.toString()
      this.areaValue=this.area.toString()
    },
    methods: {
      FG_SELECT_handleProvince(val){
        this.cityValue=''
        this.areaValue=''
      },
      FG_SELECT_handleCity(val){
        this.areaValue=''
      },
      FG_SELECT_handleProvinceChange(key){

      },
      FG_SELECT_handleCityChange(key){

      },
      FG_SELECT_handleAreaChange(key){

      }
    }
  }
</script>
