<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="power">
        <div class="container">
          <div class="content">
            <el-row :span="24" class="fg-content-title">
              权限设置 - 列表
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
                <el-button :plain="true" type="primary" size="" @click="FG_TABLE_Export"><i class="fa fa-arrow-circle-o-up"></i> 导出</el-button>
                <el-input
                  class="fg-search-input"
                  placeholder="请输入内容"
                  icon="search"
                  v-model="FG_TABLE.pagination.pageFilter.searchContent"
                  :on-icon-click="FG_TABLE_handleTableSearch">
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
                :default-sort="{prop: 'index', order: 'descending'}"
              >
                <el-table-column
                  type="selection"
                  width="90"><span style="position: relative;top: -6px;">全选</span>
                </el-table-column>
                <el-table-column
                  type="index"
                  label="序号"
                  sortable
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="编码"
                  width="148">
                </el-table-column>
                <el-table-column
                  prop="url"
                  label="URL"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop=""
                  label="权限名称"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="power_explain"
                  label="权限说明"
                  width="160">
                </el-table-column>
                <el-table-column
                  prop="is_show"
                  label="是否显示"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="is_empower"
                  label="是否授权"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="add_time"
                  label="添加时间"
                  width="290">
                </el-table-column>

                <el-table-column
                  prop="updated_at"
                  label="更新时间"
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

              <!-- 增加 -->
              <el-dialog title="商品品牌-新增" :visible.sync="FG_TABLE.addRow.is_show">
                <el-form ref="addForm" :model="FG_TABLE.addRow.data" label-width="100px"
                         :rules="FG_TABLE.addRow.rules">
                  <el-form-item label="序号 :" prop="order">
                    <el-input v-model="FG_TABLE.addRow.data.order"></el-input>
                  </el-form-item>
                  <el-form-item label="编码 :"  class="noAfter" >
                    <el-input v-model="FG_TABLE.addRow.data.code"  placeholder="FG_TABLE.addRow.data.code"></el-input>
                  </el-form-item>
                  <el-form-item label="URL :" prop="URL">
                    <el-input v-model="FG_TABLE.addRow.data.URL"></el-input>
                  </el-form-item>
                  <el-form-item label="权限名称 :" prop="power_name">
                    <el-input v-model="FG_TABLE.addRow.data.powerName"></el-input>
                  </el-form-item>
                  <el-form-item label="权限说明 :" prop="powerExplain">
                    <el-input v-model="FG_TABLE.addRow.data.powerExplain"></el-input>

                  </el-form-item>
                  <el-form-item label="是否显示 :" >
                    <el-radio-group v-model="FG_TABLE.addRow.data.isShow">
                      <el-radio class="radio"  :label="1">是</el-radio>
                      <el-radio class="radio"  :label="2">否</el-radio>
                    </el-radio-group>

                  </el-form-item>
                  <el-form-item label="是否授权 :" >
                    <el-radio-group v-model="FG_TABLE.addRow.data.isEmpower">
                      <el-radio class="radio"  :label="1">是</el-radio>
                      <el-radio class="radio"  :label="2">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="FG_TABLE.addRow.is_show = false">取 消</el-button>
                  <el-button   @click="FG_TABLE_onAddRowSubmit('addForm')">保存</el-button>
                  <el-button type="primary" @click="FG_TABLE_onAddRowSubmit('addForm')">保存并新增</el-button>
                </div>
              </el-dialog>
              <!-- 修改 -->
              <el-dialog title="编辑表格记录" :visible.sync="FG_TABLE.editRow.is_show">
                <el-form ref="editFrom" :model="FG_TABLE.editRow.data" label-width="100px" :rules="FG_TABLE.editRow.rules">
                  <el-form-item label="编码 :">
                    <el-input v-model="FG_TABLE.editRow.data.code" disabled=""></el-input>
                  </el-form-item>
                  <el-form-item label="URL :" prop="URL">
                    <el-input v-model="FG_TABLE.editRow.data.URL"></el-input>
                  </el-form-item>
                  <el-form-item label="权限名称 :" prop="power_name">
                    <!--<el-input v-model="editRow.data.power_name"></el-input>-->
                    <el-select v-model="FG_TABLE.editRow.data.powerName" placeholder="增加" style="">
                      <el-option
                        v-for="item in FG_TABLE.editRow.powerNameOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="权限说明 :" prop="powerExplain" label-width="100px">
                    <el-input v-model="FG_TABLE.editRow.data.powerExplain"></el-input>
                  </el-form-item>
                  <el-form-item label="允许授权 :" prop="is_empower">
                    <el-radio-group v-model="FG_TABLE.editRow.data.isEmpower">
                      <el-radio class="radio"  :label="1">是</el-radio>
                      <el-radio class="radio"  :label="2">否</el-radio>
                    </el-radio-group>

                  </el-form-item>
                  <el-form-item label="是否显示 :" prop="is_show">
                    <el-radio-group v-model="FG_TABLE.editRow.data.isShow">
                      <el-radio class="radio"  :label="1">是</el-radio>
                      <el-radio class="radio"  :label="2">否</el-radio>
                    </el-radio-group>

                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="FG_TABLE.editRow.is_show = false">取 消</el-button>
                  <el-button type="primary" @click="FG_TABLE_onEditRowSubmit('editFrom')">更新</el-button>
                </div>
              </el-dialog>
              <!-- 确认提示框 -->
              <el-dialog
                title="提示"
                :visible.sync="FG_TABLE.dialogVisible"
                size="tiny" >
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
  import ElRadioGroup from '../../../../node_modules/element-ui/packages/radio/src/radio-group'

  export default{
    components: {ElRadioGroup},
    data (){
      return {

        FG_TABLE: {
          data: [
            {
              order: "001",
              code: "0323",
              power_name: "小明",
              power_explain: "",
              is_show: "是",
              is_empower: "是",
              add_time: "2017-5-22 15:39:00",
              updated_at: "2017-5-22 15:39:00"
            }, {
              order: "002",
              code: "0323",
              power_name: "小明",
              power_explain: "",
              is_show: "是",
              is_empower: "是",
              add_time: "2017-5-22 15:39:00",
              updated_at: "2017-5-22 15:39:00"
            }, {
              order: "003",
              code: "0323",
              power_name: "小明",
              power_explain: "",
              is_show: "是",
              is_empower: "是",
              add_time: "2017-5-22 15:39:00",
              updated_at: "2017-5-22 15:39:00"
            }, {
              order: "004",
              code: "0323",
              power_name: "小明",
              power_explain: "",
              is_show: "是",
              is_empower: "是",
              add_time: "2017-5-22 15:39:00",
              updated_at: "2017-5-22 15:39:00"
            }, {
              order: "005",
              code: "0323",
              power_name: "小明",
              power_explain: "",
              is_show: "是",
              is_empower: "是",
              add_time: "2017-5-22 15:39:00",
              updated_at: "2017-5-22 15:39:00"
            }
          ],
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
              order:"",
              URL:"",
              powerName:"",
              powerExplain:"",
              isShow:'',
              isEmpower:''
            },
            rules: Rules.Product.Brand.editForm,
            powerNameOptions: [
              {
                value: 0,
                label: '授权'
              }, {
                value: 1,
                label: '增加'
              }, {
                value: 2,
                label: '删除'
              }, {
                value: 3,
                label: '修改'
              }, {
                value: 4,
                label: '导入'
              }
            ]
          },
          addRow: {
            name: 'addForm',
            is_show: false,
            is_remote_data: true,
            menuData: {},
            data: {
              label: '',
              code: "0000",
              name: '',
              parentCode: 0,
              order:"",
              URL:"",
              powerName:"",
              powerExplain:"",
              isShow:'',
              isEmpower:''
            },
            rules: Rules.Product.Brand.addForm
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
              filters: [{
                name: "filterTest1",
                value: '111'
              }, {
                name: "filterTest2",
                value: "222"
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
//      this.initTableData()
    },
    methods:{
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

        let params = this.FG_TABLE_getParams(this.$_.merge({
//          parentCode: this.FG_MENU.selected.code,
          status: 1,
        }, option))

        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
        }

        this.$http(this.$_.merge({}, Action.Product.Brand.list, {
          params
        })).then(response => {
          //表格数据
          console.log(response)
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
            console.log(this.FG_TABLE.editRow.data)
            // 提交
            this.$http(this.$_.merge({}, Action.Product.Brand.update, {
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
        this.FG_TABLE.addRow.is_show = true;
      },

      FG_TABLE_onAddRowSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.FG_TABLE.addRow.data)
            // 提交
            this.$http(this.$_.merge({}, Action.Product.Brand.add, {
              //获取待更新数据
              params: this.FG_TABLE.addRow.data
            })).then(response => {
              //表格数据
              console.log(response)

              let result = response.body

              this.FG_pagination_reset()

              this.FG_TABLE.addRow.is_show = false

//              //如果是顶级，更新MENU列表
//              if (this.FG_TABLE.addRow.data.parentCode === 0) {
//                this.FG_MENU_initData()
//              }

              this.$message({
                type: 'success',
                message: '添加成功'
              })

            }, response => {

              this.FG_TABLE.editRow.is_show = false

              this.$message.error('添加出错', response.body);
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
            deleteId.push(target[i].code)
          }
          let deleteIdList  = deleteId.join()
          let params = this.FG_TABLE_getParams(this.$_.merge({
            codeList:deleteIdList,
            status:2,
            preStatus:1
          },{}))

          console.log(params)
          this.$confirm('确认删除？')
            .then(_ => {
              if (!this.FG_TABLE_getLock()) {
                this.$message.error('请等待上个操作完成！')
                return false
              }
              this.$http(this.$_.merge({}, Action.Product.Brand.delete, {
                //获取待更新数据
                params: params
              })).then(response => {
                console.log(response)
                this.$message({showClose: true,type:"success",message:"删除成功"})
                this.FG_TABLE_releaseLock();
                this.FG_TABLE_refreshData({
                  page: this.FG_TABLE.pagination.pageFilter.info.currentPage
                })
              }, response => {
                this.FG_TABLE_releaseLock();
                this.$message.error("删除失败")
                console.log(response)
              })
            })
            .catch(_ => {});

        } else {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请至少选择一项数据'
          })
        }

      },

      FG_TABLE_Export(){
        alert("导出")
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
        let options = {}
        if (this.FG_TABLE.pagination.pageFilter.searchContent === '') {
          this.$message({
            type : 'warning',
            message : '请填写搜索的内容'
          })
          return false
        }
        if(!isNaN(this.FG_TABLE.pagination.pageFilter.searchContent)){
          options = { code :this.FG_TABLE.pagination.pageFilter.searchContent  }
        }else{
          options = { name :this.FG_TABLE.pagination.pageFilter.searchContent  }
        }
        let params = this.FG_TABLE_getParams(options)
        this.FG_TABLE_refreshData(params)
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
      FG_TABLE_showRefeshTable : function () {
        this.FG_TABLE_refreshData({page:this.FG_TABLE.pagination.pageFilter.info.currentPage})
      }

    },
    mounted() {

    },
  }
</script>
<style lang="scss" scoped>

</style>
