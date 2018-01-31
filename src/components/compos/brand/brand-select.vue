<template>
  <div id="brandSelect">
    <el-select
      v-model="value"
      placeholder="请选择品牌"
      style="width: 360px"
      @change="handleSelectedBrandChange"
      no-match-text="无匹配类别"
      no-data-text="无类别数据"
      filterable
    >
      <el-option
        v-for="item in brandList"
        :key="item.key"
        :label="item.value"
        :value="item.key">
      </el-option>
    </el-select>
    <i class="fa fa-ellipsis-h" @click="handleDialogBrandSelect"></i>


    <el-dialog title="选择品牌" :visible.sync="dialogTableVisible">
      <el-row>
        <el-input
          placeholder="可输入品牌名称/编码"
          icon="search"
          v-model="searchContent"
          @change="handlerSearchContent"
          :on-icon-click="handlerSearchContent">
        </el-input>
      </el-row>
      <el-row>
        <el-table :data="brandOption" border
                  @row-dblclick="handleRowDoubleClick"
                  :default-sort="{prop: 'index', order: 'descending'}" height="250">
          <el-table-column property="key" label="品牌编码"></el-table-column>
          <el-table-column property="value" label="品牌名称"></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .el-row {
    margin-bottom: 10px;
  }

  .el-dialog--small {

  }
</style>

<script type="text/javascript">
  import Action from '@/assets/admin/resource/actions.js'
  export default {
    data(){
      return {
        value: null,

        brandList: [],

        brandOption: [],

        dialogTableVisible: false,
        searchContent: ''
      }
    },
    created: function () {

      //获取所有品牌列表数据
      this.$http(this.$_.merge({}, Action.Product.Info.brandList))
        .then(response => {
          this.brandOption =  this.brandList = response.body
          if (this.brandList instanceof Array) {
            this.brandList.forEach(function (currentValue, index, array) {
              if (currentValue['key']) {
                currentValue['key'] = parseInt(currentValue['key'])
              }
            })
            response.body.unshift({
              id:'',
              value:"全部"
            })
          }
        }, response => {
          this.$message.error('获取品牌数据出错', response.body)
        })

    },
    props: ['brandSelected'],
    watch: {
      brandSelected: function (val) {
        if(val){
          this.value = val
        }

      }
    },
    methods: {
      //品牌搜索过滤
      /*  handleFilterBrand: function (query) {
       if (!query) {
       this.brandOption = this.brandList
       } else {
       this.brandOption = this.brandList.filter(item => {
       return String(item.value).toLowerCase().indexOf(query.toLowerCase()) > -1 || String(item.key).toLowerCase().indexOf(query.toLowerCase()) > -1
       })
       }
       },*/

      //select选择发生变化时触发的函数
      handleSelectedBrandChange(val){
        this.$emit('update:brandSelected', val)
      },

      //弹框品牌选择
      handleDialogBrandSelect(){
        this.dialogTableVisible = true
      },

      //弹出框品牌搜索
      handlerSearchContent(){
        if (!this.searchContent) {
          this.brandOption = this.brandList
        } else {
          this.brandOption = this.brandList.filter(item => {
            return String(item.value).toLowerCase().indexOf(this.searchContent.toLowerCase()) > -1 || String(item.key).toLowerCase().indexOf(this.searchContent.toLowerCase()) > -1
          })
        }
      },
      //表格单行双击操作
      handleRowDoubleClick(row){
        this.dialogTableVisible = false
        this.$emit('update:brandSelected', row.key)
      }
    }
  }
</script>
