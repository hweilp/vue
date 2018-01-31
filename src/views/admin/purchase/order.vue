<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div class="container">
        <div class="content">
          <el-row :span="24" class="fg-content-title">
            采购订单 - 列表
          </el-row>
          <el-row :span="24" class="fg-content-detail">
            <el-row :span="24" class="fg-content-opr" style="position: relative;">

              <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showAddRowForm"><i
                class="fa fa-plus"></i> 新增
              </el-button>

              <el-button :plain="true" type="primary" size="" @click="FG_TABLE_initData"><i class="fa fa-refresh"></i>
                刷新
              </el-button>

              <el-input
                class="fg-search-input"
                placeholder="请输入内容"
                icon="search"
                v-model="FG_TABLE.pagination.pageFilter.searchContent"
                :on-icon-click="FG_TABLE_handleTableSearch">
              </el-input>

              <advQuery left="left:555px">
                <el-form ref="advQueryForm"  :v-model="FG_TABLE.pagination.pageFilter.filters" label-width="90px" :inline="true">
                  <el-form-item label="日期：">
                    <el-date-picker
                      v-model="FG_TABLE.pagination.pageFilter.filters.dateBegin"
                      type="date"
                      placeholder="选择日期"
                      style="width: 180px!important"
                    >
                    </el-date-picker>
                    <span style="color:#BFCBD9 ">一</span>
                    <el-date-picker
                      v-model="FG_TABLE.pagination.pageFilter.filters.dateEnd"
                      type="date"
                      placeholder="选择日期"
                      style="width: 180px!important"
                    >
                    </el-date-picker>
                    <el-radio-group style="margin-left: 10px">
                      <el-radio label="今天"></el-radio>
                      <el-radio label="昨天"></el-radio>
                      <el-radio label="本周"></el-radio>
                      <el-radio label="上周"></el-radio>
                      <el-radio label="本月"></el-radio>
                      <el-radio label="上月"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-row>
                    <el-form-item label="单号：" >
                      <el-input v-model="FG_TABLE.pagination.pageFilter.filters.sheetNo"></el-input>
                    </el-form-item>
                    <el-form-item label="供应商：">
                      <el-input v-model="FG_TABLE.pagination.pageFilter.filters.supplier"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="经手人：">
                      <el-input v-model="FG_TABLE.pagination.pageFilter.filters.operator"></el-input>
                    </el-form-item>
                    <el-form-item label="金额：">
                      <el-input v-model="FG_TABLE.pagination.pageFilter.filters.money"
                                style="width: 166px!important"></el-input>
                      <span style="color:#BFCBD9;margin: 0 3px ">一</span>
                      <el-input v-model="FG_TABLE.pagination.pageFilter.filters.money"
                                style="width: 166px!important"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="审核状态：">
                      <el-radio-group style="margin-left: 10px" v-model="FG_TABLE.pagination.pageFilter.auditStatus">
                        <el-radio label="未审核"></el-radio>
                        <el-radio label="审核"></el-radio>
                        <el-radio label="全部"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item>
                      <el-button type="primary" @click="FG_advQuery_submitForm" style="margin-left: 90px">确定</el-button>
                      <el-button @click="FG_advQuery_resetForm('advQueryForm')">重置</el-button>
                    </el-form-item>
                  </el-row>
                </el-form>
              </advQuery>


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
                prop="sid"
                label="编码"
                width="100"
                sortable>
              </el-table-column>
              <el-table-column
                prop="name"
                label="名称"
                width="100"
                sortable>
              </el-table-column>
              <el-table-column
                prop="mnemonicCode"
                label="助记码"
                width="120"
                sortable>
              </el-table-column>
              <el-table-column
                prop="contract"
                label="联系人">
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="联系电话">
              </el-table-column>
              <el-table-column
                prop="address"
                label="联系地址">
              </el-table-column>
              <el-table-column
                prop="status"
                label="状态">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="说明">
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
            <el-form ref="editFrom" :model="FG_TABLE.editRow.data" label-width="100px" :rules="FG_TABLE.editRow.rules">
              <el-form-item label="名称" prop="name">
                <el-input v-model="FG_TABLE.editRow.data.name"></el-input>
              </el-form-item>

              <el-form-item label="助记码" prop="mnemonicCode">
                <el-input v-model="FG_TABLE.editRow.data.mnemonicCode"></el-input>
              </el-form-item>

              <el-form-item label="联系人" prop="contract">
                <el-input v-model="FG_TABLE.editRow.data.contract"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="mobile">
                <el-input v-model="FG_TABLE.editRow.data.mobile"></el-input>
              </el-form-item>

              <el-form-item label="联系区域" prop="areaCode" class="place">
                <areaSelect @area="FG_SELECT_getArea"></areaSelect>
              </el-form-item>

              <el-form-item label="联系地址" prop="address">
                <el-input v-model="FG_TABLE.editRow.data.address"></el-input>
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="FG_TABLE.editRow.data.status" placeholder="请选择">
                  <el-option
                    v-for="item in FG_TABLE.statusOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="说明" prop="remark">
                <el-input v-model="FG_TABLE.editRow.data.remark"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="FG_TABLE.editRow.is_show = false">取 消</el-button>
              <el-button type="primary" @click="FG_TABLE_onEditRowSubmit('editFrom')">更新</el-button>
            </div>
          </el-dialog>

          <!-- 增加数据记录 -->
          <el-dialog title="增加表格记录" :visible.sync="FG_TABLE.addRow.is_show">

            <el-form ref="addForm" :model="FG_TABLE.addRow.data" label-width="100px"
                     :rules="FG_TABLE.addRow.rules">


              <el-form-item label="名称" prop="name">
                <el-input v-model="FG_TABLE.addRow.data.name"></el-input>
              </el-form-item>

              <el-form-item label="助记码" prop="mnemonicCode">
                <el-input v-model="FG_TABLE.addRow.data.mnemonicCode"></el-input>
              </el-form-item>

              <el-form-item label="联系人" prop="contract">
                <el-input v-model="FG_TABLE.addRow.data.contract"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="mobile">
                <el-input v-model="FG_TABLE.addRow.data.mobile"></el-input>
              </el-form-item>

              <el-form-item label="联系区域" prop="areaCode" class="place">
                <areaSelect @area="FG_SELECT_getArea"></areaSelect>
              </el-form-item>

              <el-form-item label="联系地址" prop="address">
                <el-input v-model="FG_TABLE.addRow.data.address"></el-input>
              </el-form-item>

              <el-form-item label="说明" prop="remark">
                <el-input v-model="FG_TABLE.addRow.data.remark"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="FG_TABLE.addRow.is_show = false">取 消</el-button>
              <el-button type="primary" @click="FG_TABLE_onAddRowSubmit('addForm')">增加</el-button>

            </div>
          </el-dialog>
          <!-- 确认提示框 -->
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

        </div>
      </div>

    </div>

  </div>
</template>


<style lang="scss" scoped>

  @import "../../../assets/admin/css/main/comm";

</style>

<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import areaSelect from '@/components/compos/area/areaSelect'
  import advQuery from '@/components/compos/query/advQuery.vue'
  export default {
    data () {
      return {
        FG_TABLE: {
          data: [],
          editRow: {
            name: 'editFrom',
            is_show: false,
            is_remote_data: true, //编辑时是否需要重新获取数据
            data: {
              name: '',
              mnemonicCode: '',
              contract: '',
              mobile: '',
              areaCode: '',
              address: '',
              status: '',
              remark: '',
              id: '',
            },
            rules: Rules.Purchase.SupplierFile.addForm
          },
          addRow: {
            name: 'addForm',
            is_show: false,
            is_remote_data: true,
            menuData: {},
            data: {
              name: '',
              mnemonicCode: '',
              contract: '',
              mobile: '',
              areaCode: '',
              address: '',
              remark: ''
            },
            rules: Rules.Purchase.SupplierFile.addForm
          },
          statusOptions: [
            {
              name: '正常',
              code: '1'
            },
            {
              name: '关闭',
              code: '2'
            },
            {
              name: '停止',
              code: '3'
            }
          ],
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
              filters:{
                dateBegin:'',
                dateEnd:'',
                sheetNo:'',
                supplier:'',
                operator:'',
                money:'',
                auditStatus:''
              },
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
        }
      }
    },
    created: function () {
      this.FG_TABLE_initData()
    },
    watch: {},
    methods: {
      FG_TABLE_getLock: function () {

        if (this.FG_TABLE.loading.is_loading === false) {
          this.FG_TABLE.loading.is_loading = true
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
          params[i] = this.FG_TABLE.pagination.pageFilter.filters[i]
        }

        //将自定义字段加入
        for (let name in options) {
          params[name] = options[name]
        }

        params.rows = this.FG_TABLE.pagination.setting.rows
//        console.log(params)
        return params
      },

      FG_TABLE_initData: function () {
        this.FG_TABLE_refreshData()
      },

      FG_TABLE_refreshData: function (option) {
//        console.log(option)

        option = option || {}

        var params = this.FG_TABLE_getParams(this.$_.merge({
          status: 1,
        }, option))
        console.log(params)
        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }
        this.$http(this.$_.merge({}, Action.Purchase.supplierFile.list, {
          params
        })).then(response => {
          //表格数据
          //console.log(response)
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
          //console.log(this.FG_TABLE.editRow.data)
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
        this.FG_TABLE.editRow.data.mobile = this.FG_TABLE.editRow.data.mobile.toString()
        this.FG_TABLE.editRow.data.areaCode = this.FG_TABLE.editRow.data.areaCode.toString()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_TABLE.editRow.data.mobile = parseInt(this.FG_TABLE.editRow.data.mobile)
            this.FG_TABLE.editRow.data.areaCode = parseInt(this.FG_TABLE.editRow.data.areaCode)
            // 提交
            console.log(this.FG_TABLE.editRow.data)
            this.$http(this.$_.merge({}, Action.Purchase.supplierFile.update, {
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

              this.$message({
                type: 'success',
                message: '更新成功'
              })

            }, response => {

              this.FG_TABLE.editRow.is_show = false

              this.$message.error('更新出错', response.body)
            })

          } else {
            return true
          }
        })
      },

      // 新增
      FG_TABLE_showAddRowForm: function () {
        this.FG_TABLE.addRow.is_show = true
      },

      FG_TABLE_onAddRowSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            // 提交
            this.FG_TABLE.addRow.data.mobile = parseInt(this.FG_TABLE.addRow.data.mobile)
            this.$http(this.$_.merge({}, Action.Purchase.supplierFile.add, {
              //获取待更新数据
              params: this.FG_TABLE.addRow.data
            })).then(response => {
              //表格数据
              console.log(response)

              let result = response.body

              this.FG_pagination_reset()

              this.FG_TABLE.addRow.is_show = false

              this.$message({
                type: 'success',
                message: '添加成功'
              })

            }, response => {

              this.FG_TABLE.editRow.is_show = false

              this.$message.error('添加出错', response.body)
            })

          } else {
            return false
          }
        })
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
          let params = this.FG_TABLE_getParams(this.$_.merge({
            idList: deleteIdList,
          }, {}))

          console.log(params)
          this.$confirm('确认删除？')
            .then(_ => {
              if (!this.FG_TABLE_getLock()) {
                this.$message.error('请等待上个操作完成！')
                return false
              }
              this.$http(this.$_.merge({}, Action.Purchase.supplierFile.delete, {
                //获取待更新数据
                params: params
              })).then(response => {
                console.log(response)
                this.$message({showClose: true, type: 'success', message: '删除成功'})
                this.FG_TABLE_releaseLock()
                this.FG_TABLE_refreshData({
                  page: this.FG_TABLE.pagination.pageFilter.info.currentPage
                })

              }, response => {
                this.FG_TABLE_releaseLock()
                this.$message.error('删除失败')
                console.log(response)
              })
            })
            .catch(_ => {})

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

        if (this.FG_TABLE.pagination.pageFilter.searchContent === '') {
          this.$message({
            type: 'warning',
            message: '请填写搜索的内容'
          })
          return false
        }

        this.FG_TABLE_refreshData()
      },

      FG_advQuery_submitForm:function (evt) {
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
      //获取地区列表
      FG_SELECT_getArea(area){
        this.FG_TABLE.addRow.data.areaCode = area
      },
      //下载导入模板
      FG_TABLE_downloadImportTpl: function () {
        alert('下载导入模板')
      },
      //批量导入
      FG_TABLE_batchImport: function () {
        alert('批量导入')
      },
      FG_advQuery_resetForm(formName) {
        //this.$refs[formName].resetFields();
        for (let i in this.FG_TABLE.pagination.pageFilter.filters) {
          this.FG_TABLE.pagination.pageFilter.filters[i] = ''
        }

      }
    },
    mounted() {
    },
    components: {
      areaSelect,
      advQuery
    },

  }
</script>
