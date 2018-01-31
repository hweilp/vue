<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div class="container-left">
        <nav class="content-left">
          <div id="leftMenu">
            <el-row :span="24" class="fg-content-title">
              <i class="fa fa-bookmark-o"></i><span style="margin-left: 10px">商品类目</span>
            </el-row>
            <!--node-key="id" :default-expanded-keys="[1]"-->
            <el-tree :data="FG_MENU.data" node-key="num" :default-expanded-keys="[0]" :props="{label:'name'}"
                     :highlight-current="true" @node-click="FG_MENU_handleNodeClick"></el-tree>
          </div>
        </nav>
      </div>

      <div class="container-right">
        <div class="content-right">
          <el-row :span="24" class="fg-content-title">
            商品管理 - 分类管理
          </el-row>
          <el-row :span="24" class="fg-content-detail">

            <el-row :span="24" class="fg-content-opr">
              <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showAddRowForm"><i
                class="fa fa-plus"></i> 新增
              </el-button>
              <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showEditRowForm"><i
                class="fa fa-edit"></i> 编辑
              </el-button>
              <el-button :plain="true" type="danger" size="" @click="FG_TABLE_showDeleteRowForm"><i
                class="fa fa-remove"></i> 删除
              </el-button>
              <!-- 搜索自动完成  -->
              <!--<search-input></search-input>-->

              <el-input
                class="fg-search-input"
                placeholder="请输入内容"
                icon="search"
                v-model="FG_TABLE.pagination.pageFilter.searchContent"
                :on-icon-click="FG_TABLE_handleTableSearch">
              </el-input>

              <!--<el-autocomplete-->
              <!--v-model="searchContent"-->
              <!--:fetch-suggestions="querySearchAsync"-->
              <!--placeholder="请输入内容"-->
              <!--icon="search"-->
              <!--:on-icon-click="handleSearch"-->
              <!--@keyup.enter.native="searchSubmit"-->
              <!--@select="handleSelect"-->
              <!--autofocus-->
              <!--&gt;</el-autocomplete>-->

            </el-row>

            <el-table
              ref="FG_TABLE"
              :data="FG_TABLE.data"
              max-height="450"
              border
              tooltip-effect="dark"
              row-key="code"
              style="width: 100%"
              v-loading="FG_TABLE.loading.is_loading"
              :element-loading-text="FG_TABLE.loading.loadText"
              class="fg-content-table"
              @selection-change="FG_TABLE_handleSelectionChange"
              @row-dblclick="FG_TABLE_handleRowDoubleClick"
              :default-sort="{prop: 'index', order: 'descending'}"
            >
              <el-table-column
                type="selection"
                width="90"><span style="position: relative;
        top: -6px;">全选</span>
              </el-table-column>
              <el-table-column
                prop="id"
                label="序号"
                type="index"
                sortable
                width="70">
              </el-table-column>
              <el-table-column
                prop="code"
                label="编码"
                width="100"
                sortable>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                sortable
                show-overflow-tooltip>
              </el-table-column>

            </el-table>

            <!-- 分页 -->
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

          </el-row>

          <!-- Form -->
          <!-- 编辑表格记录 -->
          <el-dialog title="编辑表格记录" :visible.sync="FG_TABLE.editRow.is_show">
            <el-form ref="editFrom" :model="FG_TABLE.editRow.data" label-width="80px" :rules="FG_TABLE.editRow.rules">
              <el-form-item label="产品名称" prop="name">
                <el-input v-model="FG_TABLE.editRow.data.name"></el-input>
              </el-form-item>
              <!--<el-form-item label="基础价格" prop="base_price">-->
              <!--<el-input v-model="FG_TABLE.editRow.data.base_price"></el-input>-->
              <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="FG_TABLE.editRow.is_show = false">取 消</el-button>
              <el-button type="primary" @click="FG_TABLE_onEditRowSubmit('editFrom')">更新</el-button>
            </div>
          </el-dialog>

          <!-- 增加数据记录 -->

          <el-dialog title="增加表格记录" :visible.sync="FG_TABLE.addRow.is_show">

            <el-form ref="addForm" :model="FG_TABLE.addRow.data" label-width="80px"
                     :rules="FG_TABLE.addRow.rules">
              <!--<el-form-item label="类别" prop="">-->
              <!--<el-input v-model="FG_TABLE.addRow.data.label" disabled=""-->
              <!--:placeholder="FG_TABLE.addRow.data.label"></el-input>-->
              <!--</el-form-item>-->

              <el-form-item label="类别" prop="code">
                <el-select v-model="FG_TABLE.addRow.data.parentCode" placeholder="请选择父类">
                  <el-option label="所有类别" :value="0"></el-option>
                  <template v-for="subMenu in FG_MENU.data[0].children">
                    <el-option :label="subMenu.name" :value="subMenu.code"></el-option>
                  </template>
                </el-select>
              </el-form-item>

              <el-form-item label="名称" prop="name">
                <el-input v-model="FG_TABLE.addRow.data.name"></el-input>
              </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="FG_TABLE.addRow.is_show = false">取 消</el-button>
              <el-button type="primary" @click="FG_TABLE_onAddRowSubmit('addForm')">增加</el-button>

            </div>
          </el-dialog>


          <!-- 确认提示框 -->
          <confirm></confirm>

        </div>
      </div>

    </div>

  </div>
</template>


<style lang="scss">

  @import "../../../assets/admin/css/main/param";

  .fg-table-type {
    @include table-container(240px, 10px)
  }

  .content-right {
    .fg-content-detail {
      height: 590px;
    }
  }

  #leftMenu {
    background: white;
    .el-tree {
      padding: 3px 10px 3px;
      border: 0;
      border-top: 1px solid #d1dbe5;
      height: 590px;
      overflow: hidden;
      /*overflow-y: scroll;*/
    }
    .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
      background: #20a0ff;
      color: white;
    }

  }

</style>

<script type="text/javascript">
  import Vue from "vue"

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import confirm from "./confirm.vue"

  export default {
    data() {
      return {
        FG_TABLE: {
          data: [],
          editRow: {
            name: 'editFrom',
            is_show: false,
            is_remote_data: true, //编辑时是否需要重新获取数据
            data: {
              id: '',
              code: '',
              mid: '',
              name: '',
              parentCode: '',
              statusStr: '',
              status: '',
            },
            rules: Rules.fromEditShopMaRule
          },
          addRow: {
            name: 'addForm',
            is_show: false,
            is_remote_data: true,
            menuData: {},
            data: {
              label: '',
              name: '',
              parentCode: 0
            },
            rules: Rules.Product.Category.addForm
          },
          loading: {
            is_loading: false,
            loadText: '',
            lastTime: (new Date()).getTime()
          },
          multiSelectData: [],
          operate: {},
          status: {},
          pagination: {
            setting: {
              paginationShow: true,
              currentPage: 1,
              rows: 5,
            },
            pageFilter: {
              searchContent: '',
              filters: [{
                name: "filterTest1",
                value: '111'
              }, {
                name: "filterTest2",
                value: "222"
              },{
                name:'timeStart',
                value:'2017-06-06'
              }],
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

        FG_MENU: {
          selected: {
            code: 0,
            name: '',
            parentCode: '',
          },
          data: [{name: "所有类别", children: [], parentCode: 0, code: 0, mid: "", num: 0, status: 1}]
        },

        merchantID: 888888,
      }
    },

    created: function () {
      this.FG_MENU_initData()
      this.FG_TABLE_initData()

    },

    watch: {
      'FG_MENU.selected.code': function (data) {
        this.FG_TABLE.addRow.data.parentCode = data
        this.FG_TABLE_initData();
      }
    },

    methods: {
      FG_MENU_initData: function () {
        this.$http(this.$_.merge({}, Action.Product.Category.top)).then(response => {
          //更新菜单数据
          this.FG_MENU.data[0].children = response.body
//          Helper.FG.setValueToObject(this.FG_TABLE.addRow.data, this.FG_MENU.data[0])

        }, response => {
          console.log(response)
        })
      },

      FG_MENU_handleNodeClick: function (data) {
        Helper.FG.setValueToObject(this.FG_MENU.selected, data)
      },

      FG_TABLE_getLock: function () {

        if (this.FG_TABLE.loading.is_loading === false) {
          this.FG_TABLE.loading.is_loading = true;
          return true
        } else {
          return false
        }
      },

      FG_TABLE_releaseLock: function () {
        this.FG_TABLE.loading.is_loading = false
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

        return params
      },

      FG_TABLE_initData: function () {
        this.FG_TABLE_refreshData()
      },

      FG_TABLE_refreshData: function (option) {

        option = option || {}

        var params = this.FG_TABLE_getParams(this.$_.merge({
          parentCode: this.FG_MENU.selected.code,
          status: 1,
        }, option))

        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }

        this.$http(this.$_.merge({}, Action.Product.Category.list, {
          params
        })).then(response => {
          //表格数据
          let result = response.body

          this.FG_TABLE.data = result.data

          Helper.FG.setValueToObject(this.FG_TABLE.pagination.pageFilter.info, result.pagination)

          this.FG_TABLE_releaseLock()
        }, response => {
          this.FG_TABLE_releaseLock()
        })
      },


      // 编辑
      FG_TABLE_showEditRowForm: function () {

        if (this.FG_TABLE.multiSelectData.length === 1) {
          let target = this.FG_TABLE.multiSelectData[0]

          Helper.FG.setValueToObject(this.FG_TABLE.editRow.data, target)

          this.FG_TABLE.editRow.is_show = true

        } else {
          this.$message({
            type: 'warning',
            message: '请选择一项数据'
          })
        }
      },

      // 更新
      FG_TABLE_onEditRowSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            // 提交
            this.$http(this.$_.merge({}, Action.Product.Category.update, {
              //获取待更新数据
              params: this.FG_TABLE.editRow.data
            })).then(response => {
              //表格数据
              let result = response.body

              //刷新当前表格页
              this.FG_TABLE_refreshData({
                page: this.FG_TABLE.pagination.pageFilter.info.currentPage
              })

              this.FG_TABLE.editRow.is_show = false

              if (this.FG_TABLE.editRow.data.parentCode === 0) {
                this.FG_MENU_initData()
              }

              this.$message({
                type: 'success',
                message: '更新成功'
              })

            }, response => {

              this.FG_TABLE.editRow.is_show = false

              this.$message.error('更新出错', response.body);
            })

          } else {
            return true
          }
        })
      },

      // 新增
      FG_TABLE_showAddRowForm: function () {

        // 判断是否为最后一级的子类
        this.FG_TABLE.addRow.is_show = true;

      },

      FG_TABLE_onAddRowSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {


            if (!this.FG_TABLE_getLock()) {
              this.$message.error('请等待上个操作完成！')
              return false
            }

            // 提交
            this.$http(this.$_.merge({}, Action.Product.Category.add, {
              //获取待更新数据
              params: this.FG_TABLE.addRow.data
            })).then(response => {
              //表格数据
              let result = response.body

              this.FG_pagination_reset()

              this.FG_TABLE.addRow.is_show = false

              //如果是顶级，更新MENU列表
              if (this.FG_TABLE.addRow.data.parentCode === 0) {
                this.FG_MENU_initData()
              }

              this.$message({
                type: 'success',
                message: '添加成功'
              })

              this.FG_TABLE_releaseLock()

            }, response => {

              this.FG_TABLE.editRow.is_show = false

              this.FG_TABLE_releaseLock()

              this.$message.error('添加出错', response.body);
            })

          } else {
            return false
          }
        })
      },

      // 删除
      FG_TABLE_showDeleteRowForm: function () {

        if (this.multipleSelection.length > 0) {
          console.log(this.multipleSelection)
          let deleteId = []
          for (let i in this.multipleSelection) {
            deleteId.push(this.multipleSelection[i].code)
          }
          let deleteIdList = deleteId.join()
          let params = {
            mid: this.mid,
            codeList: deleteIdList,
            status: 2,
            preStatus: 1
          }
          this.tips = '确认删除数据'
          this.$confirm(this.tips)
            .then(_ => {
              this.FG_TABLE.loading.is_loading = true
              this.FG_TABLE.loading.loadText = '正在删除数据在，请稍后'
              this.$http(this.$_.merge({}, Action.Product.delete, {
                url: Helper.FG.setParams(Action.Product.delete.url, params)
              })).then(response => {
                console.log(response)
                this.removeSelected()
                this.FG_TABLE.loading.is_loading = false;
                this.FG_message.type = 'success'
                this.FG_message.message = '数据已成功删除';
                this.openMessage()
              }, response => {
                console.log(response)
                this.FG_TABLE.loading.is_loading = false;
                this.FG_message.type = 'error'
                this.FG_message.message = '删除数据失败';
                this.openMessage()
              })


            })
            .catch(_ => {
              return
            })

        } else {
          this.FG_message.type = 'warning'
          this.FG_message.message = '请至少选择一项数据'
          this.openMessage()
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
        this.FG_pagination_reset()
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


    },

    mounted() {


    },

    components: {
      confirm
    },

  }
</script>
