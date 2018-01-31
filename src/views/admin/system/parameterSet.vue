<template>
  <!-- MAIN PANEL -->
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">

        <el-row :span="24" class="fg-content-title">
          参数配置
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-row :span="24" class="fg-content-opr">
            <el-button :plain="true" type="primary" size="" @click="newAdd"><i class="fa fa-plus"></i> 新增</el-button>
            <el-button :plain="true" type="primary" size="" @click="editTableRow"><i class="fa fa-edit"></i> 修改
            </el-button>
          </el-row>
          <el-table
            ref="multipleTable"
            :data="tableDate"
            border
            tooltip-effect="dark"
            style="width: 100%"
            v-loading="loadingState"
            :element-loading-text="loadingText"
            class="fg-content-table"
            @selection-change="handleSelectionChange"
            @row-dblclick="handrowdbclick"
          >
            <el-table-column
              type="selection"
              width="90"><span style="position: relative;
        top: -6px;">全选</span>
            </el-table-column>
            <el-table-column
              prop="id"
              label="序号"
              sortable
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="键名称"
              sortable
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="brand_id"
              label="键值"
              sortable
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="base_price"
              label="中文"
              sortable
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="market_price"
              label="描述"
              sortable
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="创建日期"
              sortable
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="updated_at"
              label="修改日期"
              sortable
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="updated_at"
              label="类型"
              sortable
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-row>


      </div>
    </div>
  </div>
  <!-- END MAIN PANEL -->
</template>

<script>

  import Rules from '@/assets/admin/resource/rules.js'
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  export default {
    data() {
      return {

        dataBars: [
          {
            value: '选项1',
            label: '1'
          },
          {
            value: '选项2',
            label: '2'
          }
        ],
        month: [
          {
            value: '选项1',
            label: '1'
          },
          {
            value: '选项2',
            label: '2'
          }
        ],
        parameterSet: {
          id: '',
          name: '',
          method: '',
          enctype: '',
          submitAddr: '',
          data: {
            dataBars: '',
            activeMonth: '',
            activeSales: '',
            unsalableMonth: '',
            unsalableSales: '',
            unsalableRepertory: ''
          },
          rules: Rules.parameterSet
        }

      }
    },
    created: function () {
      this.initFormData()
      //console.log(this.parameterSet)
    },
    methods: {
      initFormData: function () {
        this.$http(this.$_.merge({}, Action.Form.list, {})).then(response => {
          this.parameterSet = response.body
        }, response => {
          alert(response.body)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            console.log(this.parameterSet)

            this.$http(this.$_.merge({}, Action.Form.update, {
              url: Helper.FG.setParams(Action.Form.update.url, {id: this.parameterSet.id}),
              body: this.parameterSet
            })).then(response => {
              this.initFormData()
              alert(response.body)
            }, response => {
              alert(response.body)
            })

          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/_param.scss";


</style>


