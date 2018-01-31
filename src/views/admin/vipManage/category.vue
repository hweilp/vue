<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="shopUnit">
        <div class="container">

          <div class="content">
            <el-row :span="24" class="fg-content-title">
              会员类别 - 列表
            </el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-opr">

                <el-button v-if="power.indexOf(15111101) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_TABLE_showAddRowForm"><i
                  class="fa fa-plus"></i> 新增
                </el-button>
                <el-button v-if="power.indexOf(15111102) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_TABLE_showEditRowForm"><i
                  class="fa fa-edit"></i> 编辑
                </el-button>
                <el-button v-if="power.indexOf(15111103) > -1 ? true : false"  :plain="true" type="danger" size="" @click="FG_TABLE_showDeleteRowForm"><i
                  class="fa fa-remove"></i> 删除
                </el-button>
                <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showRefeshTable"><i
                  class="fa fa-refresh"></i> 刷新
                </el-button>
                <!-- 搜索  -->
                <el-input
                  class="fg-search-input"
                  placeholder="可输入编码/名称行查询"
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
                row-key="id"
                style="width:100%"
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
                  label="序号"
                  type="index"
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="类别编码">
                </el-table-column>
                <el-table-column
                  prop="levelName"
                  label="类别名称">
                </el-table-column>
                <el-table-column
                  prop="memberLevel"
                  label="类别级别">
                </el-table-column>
                <el-table-column
                  prop="cumulativeIntegral"
                  label="升级所需累积消费积分">
                </el-table-column>
                <el-table-column
                  prop="discountTypeStr"
                  label="优惠方案">
                </el-table-column>
                <el-table-column
                  prop="isRechargeStr"
                  label="是否允许充值">
                </el-table-column>
                <el-table-column
                  prop="discountRate"
                  label="折扣率">
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

              <!-- 增加 -->
              <el-dialog title="会员类别-新增" :visible.sync="FG_TABLE.addRow.is_show">
                <el-form ref="addForm" :model="FG_TABLE.addRow.data" label-width="190px"
                         :rules="FG_TABLE.addRow.rules">
                  <el-form-item label="类别级别 :" prop="memberLevel">
                    <el-input v-model.number="FG_TABLE.addRow.data.memberLevel"></el-input>
                  </el-form-item>
                  <el-form-item label="类别名称 :" prop="levelName">
                    <el-input v-model="FG_TABLE.addRow.data.levelName"></el-input>
                  </el-form-item>
                  <el-form-item label="优惠方式 :" prop="discountType">
                    <el-radio-group v-model.number="FG_TABLE.addRow.data.discountType">
                      <el-radio :label="10">无</el-radio>
                      <el-radio :label="20">零售折扣价</el-radio>
                      <el-radio :label="30">会员价</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="折扣率 :" prop="discountRate" v-if="FG_TABLE.addRow.data.discountType!=10">
                    <el-input v-model.number="FG_TABLE.addRow.data.discountRate"></el-input>
                  </el-form-item>
                 <!-- <el-form-item label="是否允许充值 :" prop="isRecharge">
                    <el-radio-group v-model.number="FG_TABLE.addRow.data.isRecharge">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>-->
                  <el-form-item label="升级所需累积的消费积分 :" prop="cumulativeIntegral">
                    <el-input v-model.number="FG_TABLE.addRow.data.cumulativeIntegral"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="FG_handleCancle('addForm')">取 消</el-button>
                  <el-button type="primary" @click="FG_TABLE_onAddRowSubmit('addForm')">保存</el-button>
                </div>
              </el-dialog>
              <!-- 修改 -->
              <el-dialog title="会员类别-编辑" :visible.sync="FG_TABLE.editRow.is_show">
                <el-form ref="editFrom" :model="FG_TABLE.editRow.data" label-width="190px" :rules="FG_TABLE.editRow.rules">
                  <el-form-item label="类别名称 :" prop="levelName">
                    <el-input v-model="FG_TABLE.editRow.data.levelName"></el-input>
                  </el-form-item>
                  <el-form-item label="优惠方式 :" prop="discountType">
                    <el-radio-group v-model.number="FG_TABLE.editRow.data.discountType">
                      <el-radio :label="10">无</el-radio>
                      <el-radio :label="20">零售折扣价</el-radio>
                      <el-radio :label="30">会员价</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="折扣率 :" prop="discountRate" v-if="FG_TABLE.editRow.data.discountType!=10">
                    <el-input v-model.number="FG_TABLE.editRow.data.discountRate"></el-input>
                  </el-form-item>
                 <!-- <el-form-item label="是否允许充值 :" prop="isRecharge">
                    <el-radio-group v-model.number="FG_TABLE.editRow.data.isRecharge">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>-->
                  <el-form-item label="升级所需累积的消费积分 :" prop="cumulativeIntegral">
                    <el-input v-model.number="FG_TABLE.editRow.data.cumulativeIntegral"></el-input>
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



<style lang="scss" scoped>

</style>


<script>

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  export default {

    data (){
      return {
        power:this.$store.state.User.power,
        FG_TABLE: {
          data: [],
          editRow: {
            name: 'editFrom',
            is_show: false,
            is_remote_data: true, //编辑时是否需要重新获取数据
            data: {
              id: '',
              levelName: '',
              discountType:"",
              discountRate:'',
            /*  isRecharge:'',*/
              cumulativeIntegral:''
            },
            rules: Rules.Vip.Category
          },
          addRow: {
            name: 'addForm',
            is_show: false,
            is_remote_data: true,
            menuData: {},
            data: {
              memberLevel: '',
              levelName:'',
              discountType:'',
              discountRate:'',
            /*  isRecharge:'',*/
              cumulativeIntegral:''
            },
            rules: Rules.Vip.Category
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
    created() {
      this.FG_TABLE_initData()
    },
    watch: {
      'FG_TABLE.addRow.data.discountType': function (val) {
        if (val==10) {
          this.FG_TABLE.addRow.data.discountRate = 0
        }else{
          if(this.FG_TABLE.addRow.data.discountRate==0){
            this.FG_TABLE.addRow.data.discountRate = ''
          }
        }
      },
      'FG_TABLE.editRow.data.discountType': function (val) {
        if (val==10) {
          this.FG_TABLE.editRow.data.discountRate = 0
        }else{
          if(this.FG_TABLE.editRow.data.discountRate==0){
            this.FG_TABLE.editRow.data.discountRate = ''
          }
        }
      },
    },
    methods :{
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
          return false
        }

        this.$http(this.$_.merge({}, Action.VipManage.Category.list, {
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
            this.$http(this.$_.merge({}, Action.VipManage.Category.edit, {
              //获取待更新数据
              body: this.FG_TABLE.editRow.data
            })).then(response => {

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
                message: '会员类别更新成功'
              })

            }, response => {

              this.FG_TABLE.editRow.is_show = false

              this.$message.error(response.body.resultMessage);
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

            // 提交
            this.$http(this.$_.merge({}, Action.VipManage.Category.add, {
              //获取待更新数据
              body: this.FG_TABLE.addRow.data
            })).then(response => {
              //表格数据

              let result = response.body

              this.FG_pagination_reset()

              this.FG_TABLE.addRow.is_show = false

//              //如果是顶级，更新MENU列表
//              if (this.FG_TABLE.addRow.data.parentCode === 0) {
//                this.FG_MENU_initData()
//              }

              this.$message({
                type: 'success',
                message: '会员类别添加成功'
              })
              this.$refs[formName].resetFields();

            }, response => {

              this.FG_TABLE.editRow.is_show = false

              this.$message.error(response.body.resultMessage);
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
            deleteId.push(target[i].id)
          }
          let deleteIdList  = deleteId.join()
          let params = this.FG_TABLE_getParams(this.$_.merge({
            ids:deleteIdList
          },{}))
          this.$confirm('确认删除？')
            .then(_ => {
              if (!this.FG_TABLE_getLock()) {
                this.$message.error('请等待上个操作完成！')
                return false
              }
              this.$http(this.$_.merge({}, Action.VipManage.Category.delete, {
                //获取待更新数据
                body: params
              })).then(response => {
                this.$message({showClose: true,type:"success",message:"删除成功"})
                this.FG_TABLE_releaseLock();
                this.FG_TABLE_refreshData({
                  page: this.FG_TABLE.pagination.pageFilter.info.currentPage
                })
              }, response => {
                this.FG_TABLE_releaseLock();
                this.$message.error(response.body.resultMessage);
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
        this.FG_TABLE_releaseLock()
      },

      // 搜索icon可点击事件
      FG_TABLE_handleTableSearch: function () {
        this.FG_TABLE_refreshData()
      },

      FG_TABLE_handleSelectionChange: function (val) {
        this.FG_TABLE.multiSelectData = val
      },

      FG_pagination_reset: function () {
        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
          this.FG_TABLE_releaseLock()
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
          this.FG_TABLE_releaseLock()
        }
      },
      FG_TABLE_showRefeshTable : function () {
        this.FG_pagination_reset()
      }

    },
    mounted() {
    }

  }

</script>
