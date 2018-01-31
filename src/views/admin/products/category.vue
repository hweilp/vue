<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div class="container-left">
        <nav class="content-left">
          <div class="leftMenu">
            <el-row :span="24" class="fg-content-title">
              <i class="fa fa-bookmark-o"></i><span style="margin-left: 10px">商品类目</span>
            </el-row>
            <div style="height: 5px;background: rgba(246, 246, 246, 1)"></div>
            <!--node-key="id" :default-expanded-keys="[1]"-->
            <el-tree :data="FG_MENU.data" style="height: 585px;overflow: auto;" node-key="id" :default-expanded-keys="[0]"  :props="{label:'name',children:'children'}" :highlight-current="true" @node-click="FG_MENU_handleNodeClick"></el-tree>
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
              <el-button v-if="power.indexOf(12111101) > -1 ? true : false" :plain="true" type="primary" size="" @click="FG_TABLE_showAddRowForm"><i
                class="fa fa-plus"></i> 新增
              </el-button>
              <el-button v-if="power.indexOf(12111102) > -1 ? true : false" :plain="true" type="primary" size="" @click="FG_TABLE_showEditRowForm"><i
                class="fa fa-edit"></i> 编辑
              </el-button>
              <el-button  v-if="power.indexOf(12111103) > -1 ? true : false" :plain="true" type="danger" size="" @click="FG_TABLE_showDeleteRowForm"><i
                class="fa fa-remove"></i> 删除
              </el-button>
              <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showRefeshTable"><i
                class="fa fa-refresh"></i> 刷新
              </el-button>
              <el-input
                class="fg-search-input"
                placeholder="输入编码/名称进行查询"
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
              row-key="code"
              style="width: 723px"
              v-loading="FG_TABLE.loading.is_loading"
              :element-loading-text="FG_TABLE.loading.loadText"
              class="fg-content-table"
              @selection-change="FG_TABLE_handleSelectionChange"
              @row-dblclick="FG_TABLE_handleRowDoubleClick"
              :default-sort="{prop: 'code', order: 'descending'}"
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
              width="462">
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
          <el-dialog title="商品类别 - 编辑" :visible.sync="FG_TABLE.editRow.is_show">
            <el-form ref="editFrom" :model="FG_TABLE.editRow.data" label-width="120px" :rules="FG_TABLE.editRow.rules">
              <el-form-item label="产品名称 ：" prop="name">
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
          <el-dialog title="商品类别 - 新增" :visible.sync="FG_TABLE.addRow.is_show">

            <el-form ref="addForm" :model="FG_TABLE.addRow.data" label-width="100px"
                     :rules="FG_TABLE.addRow.rules">
              <!--<el-form-item label="类别" prop="">-->
              <!--<el-input v-model="FG_TABLE.addRow.data.label" disabled=""-->
              <!--:placeholder="FG_TABLE.addRow.data.label"></el-input>-->
              <!--</el-form-item>-->

              <el-form-item label="类别：" prop="parentCode">
                <el-select v-model="FG_TABLE.addRow.data.parentCode" placeholder="请选择父类">
                  <el-option label="所有类别" :value="0"></el-option>
                  <template v-for="subMenu in FG_MENU.data[0].children">
                    <el-option :label="subMenu.name" :value="subMenu.code"></el-option>
                  </template>
                </el-select>
              </el-form-item>

              <el-form-item label="名称 ：" prop="name">
                <el-input v-model="FG_TABLE.addRow.data.name"></el-input>
              </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">

              <el-button @click="FG_handleCancle('addForm')" >取 消</el-button>
              <el-button type="primary" @click="FG_TABLE_onAddRowSubmit('addForm')">增加</el-button>

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

        </div>
      </div>

    </div>

  </div>
</template>


<style lang="scss" >

  @import "../../../assets/admin/css/main/param";

  .fg-table-type {
  @include table-container(240px, 10px)
  }
  .content-right{
  .fg-content-detail{
    height: 590px;
  }
  }


  .leftMenu {
    background: white;
  .el-tree{
    padding:3px 10px 3px;
    border:0;
    height: 585px;
  }

  }

</style>

<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import {mapMutations} from 'vuex'
  export default {
    data () {
      return {
        power:this.$store.state.User.power,
        FG_TABLE: {
          data: [],
          editRow: {
            name: 'editFrom',
            is_show: false,
            is_remote_data: true, //编辑时是否需要重新获取数据
            data: {
              code: '',
              name: '',
              parentCode:''
            },
            rules: Rules.Product.Category.editForm
          },
          addRow: {
            name: 'addForm',
            is_show: false,
            is_remote_data: true,
            menuData: {},
            data: {
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
          dialogVisible : false,//确认提示框
          pagination: {
            setting: {
              paginationShow: true,
              currentPage: 1,
              rows: 5,
            },
            pageFilter: {
              searchContent: '',
              filters:{},
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
            id: 0,
            name: '所有类别',
            parentCode:0,
            code:0
          },
          data: [
            {
              id: 0,
              parentCode:0,
              code:0,
              name:"所有类别",

              children: [

              ]
            }
          ]
        }
      }
    },
    created: function () {
      this.FG_MENU_initData()
      this.FG_TABLE_initData()
    },
    watch: {
      'FG_MENU.selected.code': function (data) {

        if(String(data).substr(2,1) != 0 || String(data).substr(3,1) !=0){

        }else {
          this.FG_TABLE.addRow.data.parentCode = data
        }
        this.FG_TABLE_initData();
      }
    },
    methods: {
      ...mapMutations(['User/INIT_USER_CATEGORY']),
      FG_MENU_initData: function () {
        this.$http(this.$_.merge({}, Action.Product.Category.topLevel)).then(response => {
          //更新菜单数据
          this.FG_MENU.data[0].children = response.body
        }, response => {

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
          let result = response.body

          this.FG_TABLE.data = result.data

          Helper.FG.setValueToObject(this.FG_TABLE.pagination.pageFilter.info, result.pagination)

          this.FG_TABLE_releaseLock()
        }, response => {
          this.$message.error(response.body.resultMessage);
          this.FG_TABLE_releaseLock()
        })
        if(this.$store.state.User.category != null) this['User/INIT_USER_CATEGORY'](null);
      },
      FG_TABLE_CODE:function () {
        this.FG_TABLE.data.splice(0, this.FG_TABLE.data.length)
        let params={
          code : this.FG_TABLE.addRow.data.code
        }
        this.$http(this.$_.merge({}, Action.Product.Category.listView, {
          params
        })).then(response => {
          //表格数据

          this.FG_TABLE.data.push(response.body)

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
              body: this.FG_TABLE.editRow.data
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
//            // 提交
            let params = {
              parentCode:this.FG_TABLE.addRow.data.parentCode,
              name:this.FG_TABLE.addRow.data.name
            }
            this.$http(this.$_.merge({}, Action.Product.Category.add, {
              //获取待更新数据
              body: params
            })).then(response => {
              //表格数据
              this.FG_pagination_reset()

              this.FG_TABLE.addRow.is_show = false

              //如果是顶级，更新MENU列表
              if (this.FG_TABLE.editRow.data.parentCode === 0) {
                this.FG_MENU_initData()
              }

              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$refs[formName].resetFields();
            }, response => {
              this.FG_TABLE.editRow.is_show = false
              this.$message.error(response.body.resultMessage, response.body);
            })

          } else {
            return false
          }
        })
      },
      FG_handleCancle(formName){
        this.FG_TABLE.addRow.is_show = false
        this.$refs[formName].resetFields();
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
            codeList:deleteIdList
          }))
          this.$confirm('确认删除？')
            .then(_ => {
              if (!this.FG_TABLE_getLock()) {
                this.$message.error('请等待上个操作完成！')
                return false
              }
              this.$http(this.$_.merge({}, Action.Product.Category.delete, {
                //获取待更新数据
                body: params
              })).then(response => {
                this.$message({showClose: true,type:"success",message:"删除成功"})
                this.FG_TABLE_releaseLock();
                this.FG_TABLE_refreshData({
                  page: this.FG_TABLE.pagination.pageFilter.info.currentPage
                })
                this.FG_MENU_initData()
              }, response => {
                this.message.error('删除' + response.body.resultMessage)
                this.FG_TABLE_releaseLock();
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
      FG_TABLE_showRefeshTable : function () {
        this.FG_pagination_reset()
      }
    },
    mounted() {
    },
    components:{
      confirm
    },

  }
</script>
