<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="role">

        <div class="container">
          <div class="content">
            <el-row :span="24" class="fg-content-title">角色权限 - 列表</el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-opr">
                <el-button v-if="power.indexOf(17121201) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_TABLE_showAddRowForm"><i
                  class="fa fa-plus"></i> 新增
                </el-button>
                <el-button v-if="power.indexOf(17121202) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_TABLE_showEditRowForm"><i
                  class="fa fa-edit"></i> 编辑
                </el-button>
                <el-button v-if="power.indexOf(17121203) > -1 ? true : false"  :plain="true" type="danger" size="" @click="FG_TABLE_showDeleteRowForm"><i
                  class="fa fa-remove"></i> 删除
                </el-button>
                <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showRefeshTable"><i
                  class="fa fa-refresh"></i> 刷新
                </el-button>

                <!-- 搜索  -->
                <el-input
                  class="fg-search-input"
                  placeholder="可输入编码/名称进行查询"
                  icon="search"
                  v-model="FG_TABLE.pagination.pageFilter.searchContent"
                  :on-icon-click="FG_TABLE_handleTableSearch"
                  @keyup.enter.native="FG_TABLE_handleTableSearch">
                </el-input>
              </el-row>

              <el-table
                ref="FG_TABLE"
                :data="FG_TABLE.data"
                max-height="450"
                border
                tooltip-effect="dark"
                style="width: 100%"
                v-loading="FG_TABLE.loading.is_loading"
                :element-loading-text="FG_TABLE.loading.loadText"
                class="fg-content-table"
                @selection-change="FG_TABLE_handleSelectionChange"
                @row-dblclick="FG_TABLE_handleRowDoubleClick"
                :default-sort="{prop: 'date', order: 'descending'}"
              >
                <el-table-column
                  type="selection"
                  width="90"><span style="position: relative;
        top: -6px;">全选</span>
                </el-table-column>
                <el-table-column

                  label="序号"
                  type="index"
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="角色编码">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="名称">
                </el-table-column>
                <el-table-column
                  prop="isAuthorizeStr"
                  label="允许授权"
                >
                </el-table-column>

                <el-table-column
                  prop="modifyTimeStr"
                  label="更新时间">
                </el-table-column>

              </el-table>

              <el-pagination
                ref="FG_pagination"
                v-if="FG_TABLE.pagination.setting.paginationShow"
                @size-change="FG_TABLE_handleRowSizeChange"
                @current-change="FG_TABLE_handleCurrentPageChange"
                :current-page.sync="FG_TABLE.pagination.setting.currentPage"
                :page-size.sync="FG_TABLE.pagination.setting.rows"

                :page-sizes="[5, 10, 20, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="FG_TABLE.pagination.pageFilter.info.total"
              >
              </el-pagination>

              <!-- 确认提示框 -->
              <el-dialog
                title="提示"
                :visible.sync="FG_TABLE.dialogVisible"
                size="tiny">
                <span>确认删除数据</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="FG_TABLE.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="FG_TABLE.dialogVisible = false">确 定</el-button>
              </span>
              </el-dialog>

            </el-row>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  export default{
    data (){
      return {
        power:this.$store.state.User.power,
        merchantList: [],
        mid: '',
        FG_TABLE: {
          data: [],
          editRow: {
            name: 'editFrom',
            is_show: false,
            is_remote_data: true, //编辑时是否需要重新获取数据
            data: {
              mid: '',
              name: '',
              type: 2,
              isAuthorize: '',
              id: ''
            },
            roleOptions: [
              {value: 1, label: "系统角色"},
              {value: 2, label: "自定义角色"},

            ],
            orangeTypeOptions: [
              {value: 1, label: "总部"},
              {value: 2, label: "门店"},

            ],
            isAuthorizeOptions: [
              {value: 1, label: "允许"},
              {value: 2, label: "不允许"}
            ],
            rules: Rules.System.Role.editForm
          },
          addRow: {
            name: 'addForm',
            is_show: false,
            is_remote_data: true,
            menuData: {},
            data: {
              code: 0,
              name: '',
              orangeType: "",
              type: 2,// 角色
              isAuthorize: 1 // 允许授权
            },
            options: [{value: "1", label: "门店"},
              {value: "4", label: "总部"}
            ],
            rules: Rules.System.Role.addForm
          },
          loading: {
            is_loading: false,
            loadText: '',
            lastTime: (new Date()).getTime()
          },
          multiSelectData: [],
          operate: {},
          status: {},
          dialogVisible: false,//确认提示框
          pagination: {
            setting: {
              paginationShow: true,
              currentPage: 1,
              rows: 5,
            },
            pageFilter: {
              searchContent: '',
              filters: {},
              orders: [],
              info: {
                currentPage: 1,
                endIndex: 0,
                hasNext: false,
                hasPreview: false,
                pages: 0,
                rows: 5,
                startIndex: 0,
                total: 0
              }
            }
          }
        },


      }
    },
    created: function () {

      this.FG_TABLE_initData()
    },
    methods: {
      handleMidChange(val){
        this.FG_TABLE_initData()
      },


      FG_TABLE_getParams: function (options) {
        options = options || {}
        let params = options

        //设置页码
        if (options.page === 'init') {
          params.page = 1
        } else if (options.page === 'current') {
          params.page = this.FG_TABLE.pagination.pageFilter.info.currentPage
        } else {
          params.page = options.page || 1
        }


        //获取搜索字段
        if (this.FG_TABLE.pagination.pageFilter.searchContent) {
          params.searchContent = this.FG_TABLE.pagination.pageFilter.searchContent
        }

        //获取过滤字段
        for (let i in this.FG_TABLE.pagination.pageFilter.filters) {
          params[this.FG_TABLE.pagination.pageFilter.filters[i].name] = this.FG_TABLE.pagination.pageFilter.filters[i].value
        }

        //将自定义字段加入
        for (let name in options) {
          params[name] = options[name]
        }

        params.rows = this.FG_TABLE.pagination.setting.rows
        if (this.mid) {
          params.mid = this.mid
        }

        return params
      },

      FG_TABLE_initData: function () {
        this.FG_TABLE_refreshData()
      },

      FG_TABLE_refreshData: function (option) {

        option = option || {}

        let params = this.FG_TABLE_getParams(this.$_.merge({
//          parentCode: this.FG_MENU.selected.code,
//          status: 1,
        }, option))


        this.$http(this.$_.merge({}, Action.System.Role.list, {
          params
        })).then(response => {
          //表格数据

          let result = response.body

          this.FG_TABLE.data = result.data

          Helper.FG.setValueToObject(this.FG_TABLE.pagination.pageFilter.info, result.pagination)


        }, response => {

        })
      },
      // 编辑
      FG_TABLE_showEditRowForm: function () {

        if (this.FG_TABLE.multiSelectData.length === 1) {
          let target = this.FG_TABLE.multiSelectData[0]
          /* Helper.FG.setValueToObject(this.FG_TABLE.editRow.data, target) // 合并参数

           this.FG_TABLE.editRow.is_show = true*/

          this.$router.push({path: '/system/roleEdit', query: {code: target.code, name: target.name,id:target.id}})
        } else {
          this.$message({
            type: 'warning',
            message: '请选择一项数据'
          })
        }
      },

      // 新增
      FG_TABLE_showAddRowForm: function () {
        this.$router.push({path: "/system/roleAdd"})
      },

      // 删除
      FG_TABLE_showDeleteRowForm: function () {

        if (this.FG_TABLE.multiSelectData.length >= 1) {
          let target = this.FG_TABLE.multiSelectData
          let deleteId = []
          for (let i in target) {
            deleteId.push(target[i].id)
          }
          let deleteIdList = deleteId.join()


          this.$confirm('确认删除？')
            .then(_ => {

              this.$http(this.$_.merge({}, Action.System.Role.delete, {
                //获取待更新数据
                body: {ids: deleteIdList}
              })).then(response => {
                this.$message({showClose: true, type: "success", message: "删除成功"})
                this.FG_TABLE_refreshData({
                  page: this.FG_TABLE.pagination.pageFilter.info.currentPage
                })
              }, response => {
                this.$message.error("删除失败")
              })
            })
            .catch(_ => {
            });

        } else {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请至少选择一项数据'
          })
        }

      },

      // 双击行
      FG_TABLE_handleRowDoubleClick: function (row) {
        this.$refs.FG_TABLE.clearSelection() //清除所有的勾选
        this.$refs.FG_TABLE.toggleRowSelection(row, true) //勾选当前行
        this.FG_TABLE_showEditRowForm()
      },

      // 显示每页的数据条数改变
      FG_TABLE_handleRowSizeChange(val) {
        this.FG_TABLE.pagination.setting.rows = val
        this.FG_pagination_reset()

      },

      // 页码发生改变
      FG_TABLE_handleCurrentPageChange: function (val) {
        this.FG_TABLE_refreshData({
          page: val
        })
      },

      // 搜索icon点击事件
      FG_TABLE_handleTableSearch: function () {
        this.FG_TABLE_refreshData()
      },

      FG_TABLE_handleSelectionChange: function (val) {
        this.FG_TABLE.multiSelectData = val
      },

      FG_pagination_reset: function () {
        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
        }
      },
      FG_TABLE_showRefeshTable: function () {
        this.FG_pagination_reset()
      },

    },
    mounted() {

    },
  }
</script>

<style lang="scss" scoped>

</style>
