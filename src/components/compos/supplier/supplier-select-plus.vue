<template>
  <div id="supplierSelect">
    <el-select
      v-model="value"
      placeholder="请选择供应商"
      no-match-text="无匹配供应商"
      no-data-text="无供应商数据"
      filterable
      style="width: 360px"
      @change="handleSelectedChange"
    >
      <el-option
        v-for="item in optionList"
        :key="item.key"
        :label="item.value"
        :value="item.key">
      </el-option>
    </el-select>
    <i class="fa fa-ellipsis-h" @click="handleDialogSelect"></i>
    <el-dialog title="选择供应商" :visible.sync="dialogTableVisible">
      <el-row>
        <el-input
          placeholder="可输入供应商名称/编码"
          icon="search"
          v-model="searchContent"
          @change="handlerSearchContent"
          :on-icon-click="handlerSearchContent">
        </el-input>
      </el-row>
      <el-row>
        <el-table :data="optionList" border
                  @row-dblclick="handleRowDoubleClick"
                  :default-sort="{prop: 'index', order: 'descending'}" height="250">
          <el-table-column property="key" label="供应商编码"></el-table-column>
          <el-table-column property="value" label="供应商名称"></el-table-column>
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
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        value: '',
        list: [],
        optionList: [],

        dialogTableVisible: false,
        searchContent: ''
      }
    },
    created: function () {

      //获取所有供应商列表数据
      if(this.$store.state.User.supplier == null){
        this.init_supplier()
      }else {
        this.list = this.optionList = this.$store.state.User.supplier
      }


    },
    props: ['supplierSelected'],
    watch: {
      supplierSelected: function (val) {
        if (val) {
          this.value = val.toString()
        }
      }
    },
    methods: {
      ...mapMutations(['User/INIT_USER_SUPPLIER']),
      init_supplier(){
        this.$http(this.$_.merge({}, Action.Product.Info.supplierList))
          .then(response => {
            if (response.body instanceof Array) {
              response.body.forEach(function (currentValue, index, array) {
                currentValue['key'] =  currentValue['id'].toString()
                currentValue['value'] =  currentValue['name']
              })
            }
            this.list = this.optionList = response.body
            this['User/INIT_USER_SUPPLIER'](response.body)
            this.$store.dispatch('User/userSupplier', response.body);
            this.$emit('finish', true)
          }, response => {
            this.$emit('finish', false)
            this.$message.error('获取供应商数据出错', response.body)
          })
      },
      //供应商搜索过滤
      handleFilter: function (query) {
        if (!query) {
          this.optionList = this.list
        } else {
          this.optionList = this.list.filter(item => {
            return item.value.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.key.toLowerCase().indexOf(query.toLowerCase()) > -1
          })
        }
      },
      //select选择发生变化时触发的函数
      handleSelectedChange(val) {
        this.$emit('update:supplierSelected', val)
      },

      //弹框供应商选择
      handleDialogSelect() {
        this.dialogTableVisible = true
      },
      //弹出框供应商搜索
      handlerSearchContent() {
        if (!this.searchContent) {
          this.optionList = this.list
        } else {
          this.optionList = this.list.filter(item => {
            return item.value.toLowerCase().indexOf(this.searchContent.toLowerCase()) > -1 || item.key.toLowerCase().indexOf(this.searchContent.toLowerCase()) > -1
          })
        }
      },
      //表格单行双击操作
      handleRowDoubleClick(row) {
        this.dialogTableVisible = false
        this.$emit('update:supplierSelected', row.key)
      }
    }
  }
</script>
