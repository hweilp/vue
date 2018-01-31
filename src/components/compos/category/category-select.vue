<template>
  <div id="categorySelect">
    <el-select
      v-model.number="value"
      placeholder="请选择分类"
      no-match-text="无匹配类别"
      no-data-text="无类别数据"
      filterable
      style="width: 360px"
      @change="handleSelectedCategoryChange"
    >
      <el-option
        v-for="item in categoryList"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
    <i class="fa fa-ellipsis-h" @click="handleDialogCategorySelect"></i>
    <el-dialog title="选择类别" :visible.sync="dialogTableVisible">
      <el-row>
        <el-input
          placeholder="可输入类别名称/编码"
          icon="search"
          v-model="searchContent"
          @change="handlerSearchContent"
          :on-icon-click="handlerSearchContent">
        </el-input>
      </el-row>
      <el-row>
        <el-table :data="categoryOption" border
                  @row-dblclick="handleRowDoubleClick"
                  :default-sort="{prop: 'index', order: 'descending'}" height="250">
          <el-table-column property="code" label="类别编码"></el-table-column>
          <el-table-column property="name" label="类别名称"></el-table-column>
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
    data() {
      return {
        value: null,
        categoryList: [],
        categoryOption: [],
        dialogTableVisible: false,
        searchContent: ''
      }
    },
    created: function () {

//      this.value = this.categorySelected

      //获取所有类别列表数据
      this.$http(this.$_.merge({}, Action.Product.Info.categoryList))
        .then(response => {

          this.categoryList = this.categoryOption = response.body

        }, response => {
          this.$message.error('获取类别数据出错', response.body)
        })

    },
    props: ['categorySelected'],
    watch: {
      categorySelected: function (val) {
        if (val) {
          this.value = val
        }
      }
    },
    methods: {

      //select选择发生变化时触发的函数
      handleSelectedCategoryChange(val) {
        this.$emit('update:categorySelected', val)
      },
      //弹框类别选择
      handleDialogCategorySelect() {
        this.dialogTableVisible = true
      },

      //弹出框类别搜索
      handlerSearchContent() {
        if (!this.searchContent) {
          this.categoryOption = this.categoryList
        } else {
          this.categoryOption = this.categoryList.filter(item => {
            return String(item.name).toLowerCase().indexOf(this.searchContent.toLowerCase()) > -1 || String(item.code).toLowerCase().indexOf(this.searchContent.toLowerCase()) > -1
          })
        }
      },
      //表格单行双击操作
      handleRowDoubleClick(row) {
        this.dialogTableVisible = false
        this.$emit('update:categorySelected', row.code)
      }
    }
  }
</script>
