<template>
  <div>
    <div id="main" class="fg-table-type" role="main">


      <div class="container">
        <div class="content">
          <el-row :span="24" class="fg-content-title">
            供应商档案 - 列表
          </el-row>
          <el-row :span="24" class="fg-content-detail">
            <el-row :span="24" class="fg-content-opr">
              <el-button v-if="power.indexOf(12111501) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_TABLE_showAddRowForm"><i
                class="fa fa-plus"></i> 新增
              </el-button>
              <el-button  v-if="power.indexOf(12111502) > -1 ? true : false" :plain="true" type="primary" size="" @click="FG_TABLE_showEditRowForm"><i
                class="fa fa-edit"></i> 编辑
              </el-button>
              <el-button v-if="power.indexOf(12111503) > -1 ? true : false"  :plain="true" type="danger" size="" @click="FG_TABLE_showDeleteRowForm"><i
                class="fa fa-remove"></i> 删除
              </el-button>
              <el-button :plain="true" type="primary" size="" @click="FG_TABLE_initData"><i class="fa fa-refresh"></i>
                刷新
              </el-button>
              <!-- <el-button :plain="true" type="primary" size="" @click="FG_TABLE_downloadImportTpl"><i
                 class="fa fa-arrow-circle-o-down"></i>
                 下载导入模板
               </el-button>
               <el-button :plain="true" type="primary" size="" @click="FG_TABLE_batchImport"><i
                 class="fa fa-arrow-circle-down"></i>
                 批量导入
               </el-button>-->
              <el-input
                class="fg-search-input"
                placeholder="可输入名称/编码/助记码进行查询"
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
                width="120"
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
                label="联系人"
                width="120">
              </el-table-column>
              <el-table-column
                prop="mobile"
                label="联系电话"
                width="150">
              </el-table-column>
              <el-table-column
                prop="address"
                label="联系地址">
              </el-table-column>
              <el-table-column
                prop="statusStr"
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
          <el-dialog title="供应商档案 - 编辑" :visible.sync="FG_TABLE.editRow.is_show">
            <el-form ref="editFrom" :model="FG_TABLE.editRow.data" label-width="100px" :rules="FG_TABLE.editRow.rules">

              <el-form-item label="名称：" prop="name">
                <el-input v-model="FG_TABLE.editRow.data.name"></el-input>
              </el-form-item>

              <el-form-item label="助记码：" prop="mnemonicCode">
                <el-input v-model="FG_TABLE.editRow.data.mnemonicCode"></el-input>
              </el-form-item>
              <!--<el-form-item label="类型" prop="type">-->
                <!--<el-select v-model="FG_TABLE.editRow.data.type" placeholder="请选择" style="width: 360px">-->
                  <!--&lt;!&ndash; <el-option :label="FG_TABLE.editRow.data.typeStr" :value="FG_TABLE.editRow.data.type"></el-option>&ndash;&gt;-->
                  <!--<el-option-->
                    <!--v-for="item in FG_TABLE.typeOptions"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->

              <!--<el-form-item label="合作渠道" prop="channelType">-->
                <!--<el-select v-model="FG_TABLE.editRow.data.channelType" placeholder="请选择" style="width: 360px">-->
                  <!--<el-option-->
                    <!--v-for="item in FG_TABLE.channelTypeOptions"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
              <el-form-item label="状态：">
                <el-select v-model="FG_TABLE.editRow.data.status" placeholder="请选择" style="width: 360px">
                  <el-option
                    v-for="item in FG_TABLE.statusOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <!--<el-form-item label="等级" prop="level">-->
                <!--<el-input v-model.number="FG_TABLE.editRow.data.level"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="联系人：" prop="contract">
                <el-input v-model="FG_TABLE.editRow.data.contract"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="mobile">
                <el-input v-model="FG_TABLE.editRow.data.mobile"></el-input>
              </el-form-item>

              <el-form-item label="联系区域：" class="place">
                <areaSelect ref="area" :province.sync="FG_TABLE.editRow.data.provinceCode"
                            :city.sync="FG_TABLE.editRow.data.cityCode"
                            :area.sync="FG_TABLE.editRow.data.areaCode"></areaSelect>
              </el-form-item>

              <el-form-item label="联系地址：" prop="address">
                <el-input v-model="FG_TABLE.editRow.data.address"></el-input>
              </el-form-item>
              <!--<el-form-item label="邮箱" prop="email">-->
                <!--<el-input v-model="FG_TABLE.editRow.data.email"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="说明：" prop="remark">
                <el-input v-model="FG_TABLE.editRow.data.remark"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="FG_TABLE.editRow.is_show = false">取 消</el-button>
              <el-button type="primary" @click="FG_TABLE_onEditRowSubmit('editFrom')">更新</el-button>
            </div>
          </el-dialog>

          <!-- 增加数据记录 -->
          <el-dialog title="供应商档案 - 新增" :visible.sync="FG_TABLE.addRow.is_show">

            <el-form ref="addForm" :model="FG_TABLE.addRow.data" label-width="100px"
                     :rules="FG_TABLE.addRow.rules">


              <el-form-item label="名称：" prop="name">
                <el-input v-model="FG_TABLE.addRow.data.name"></el-input>
              </el-form-item>

              <el-form-item label="助记码：" prop="mnemonicCode">
                <el-input v-model="FG_TABLE.addRow.data.mnemonicCode"></el-input>
              </el-form-item>
              <!--<el-form-item label="类型" prop="type">-->
                <!--<el-select v-model="FG_TABLE.addRow.data.type" placeholder="请选择" style="width: 360px">-->
                  <!--<el-option-->
                    <!--v-for="item in FG_TABLE.typeOptions"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->

              <!--<el-form-item label="合作渠道" prop="channelType">-->
                <!--<el-select v-model="FG_TABLE.addRow.data.channelType" placeholder="请选择" style="width: 360px">-->
                  <!--<el-option-->
                    <!--v-for="item in FG_TABLE.channelTypeOptions"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->

              <el-form-item label="联系人：" prop="contract">
                <el-input v-model="FG_TABLE.addRow.data.contract"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：" prop="mobile">
                <el-input v-model="FG_TABLE.addRow.data.mobile"></el-input>
              </el-form-item>
              <el-form-item label="状态：" prop="status">
                <el-select v-model="FG_TABLE.addRow.data.status" placeholder="请选择" style="width: 360px">
                  <el-option
                    v-for="item in FG_TABLE.statusOptions"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <!--<el-form-item label="等级" prop="level">-->
                <!--<el-input v-model.number="FG_TABLE.addRow.data.level" placeholder="(1-9)级"></el-input>-->
              <!--</el-form-item>-->


              <el-form-item label="联系区域：" class="place" prop="areaCode">
                <areaSelect ref="area" :province.sync="FG_TABLE.addRow.data.provinceCode"
                            :city.sync="FG_TABLE.addRow.data.cityCode"
                            :area.sync="FG_TABLE.addRow.data.areaCode"></areaSelect>
              </el-form-item>

              <el-form-item label="联系地址：" prop="address">
                <el-input v-model="FG_TABLE.addRow.data.address"></el-input>
              </el-form-item>
              <!--<el-form-item label="邮箱" prop="email">-->
                <!--<el-input v-model="FG_TABLE.addRow.data.email"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="说明：" prop="remark">
                <el-input v-model="FG_TABLE.addRow.data.remark"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="FG_handleCancle('addForm')">取 消</el-button>
              <el-button type="primary" @click="FG_TABLE_onAddRowSubmit('addForm')">增加</el-button>

            </div>
          </el-dialog>
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

  @import "../../../assets/admin/css/main/param";


</style>

<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import areaSelect from '@/components/compos/area/areaSelect'
  import {mapMutations} from 'vuex'
  export default {
    data () {
      return {
        power:this.$store.state.User.power,
        FG_TABLE: {
          data: [],
          typeOptions: [
            {
              value: '10',
              label: '商品'
            }, {
              value: '20',
              label: '服务'
            },
            {
              value: '30',
              label: '金融'
            }
          ],
          channelTypeOptions: [
            {
              value: '10',
              label: '外部'
            }, {
              value: '20',
              label: '内部'
            }
          ],
          editRow: {
            name: 'editFrom',
            is_show: false,
            is_remote_data: true, //编辑时是否需要重新获取数据
            data: {
              name: '',
              mnemonicCode: '',
//              type: '',
//              channelType: '',
//              level: '',
              contract: '',
              mobile: '',
              provinceCode: '',
              cityCode: '',
              areaCode: '',
              address: '',
//              email:'',
              remark: '',
              status:'',
              id:''
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
//              type: '',
//              channelType: '',
//              level: '',
              contract: '',
              mobile: '',
              provinceCode: '',
              cityCode: '',
              areaCode: '',
              address: '',
//              email:'',
              remark: '',
              status:''
            },
            rules: Rules.Purchase.SupplierFile.addForm
          },
          statusOptions: [
            {
              name: '可用',
              code: '1'
            },
            {
              name: '停用',
              code: '2'
            },
            {
              name: '注销',
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
        }
      }
    },
    created: function () {
      this.FG_TABLE_initData()
    },
    watch: {},
    methods: {
      ...mapMutations(['User/INIT_USER_SUPPLIER']),
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

        var params = this.FG_TABLE_getParams(this.$_.merge({}, option))
        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }

        if(this.$store.state.User.supplier != null) this['User/INIT_USER_SUPPLIER'](null);

        this.$http(this.$_.merge({}, Action.Purchase.supplierFile.list, {
          params
        })).then(response => {
          //表格数据
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
          target.type=String(target.type)
          target.channelType=String(target.channelType)
          target.status=String(target.status)
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
        this.FG_TABLE.editRow.data.mobile = this.FG_TABLE.editRow.data.mobile.toString();

//        Helper.FG.setValueToObject(params,this.FG_TABLE.editRow.data)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_TABLE.editRow.data.mobile = parseInt(this.FG_TABLE.editRow.data.mobile)
            // 提交
            this.$http(this.$_.merge({}, Action.Purchase.supplierFile.update, {
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

              this.$message({
                type: 'success',
                message: '更新成功'
              })

            }, response => {

              this.FG_TABLE.editRow.is_show = false

              this.$message.error(response.body.resultMessage, response.body)
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
              body: this.FG_TABLE.addRow.data
            })).then(response => {
              this.FG_pagination_reset()

              this.FG_TABLE.addRow.is_show = false

              this.$message({
                type: 'success',
                message: '添加成功'
              })
              this.$refs[formName].resetFields();
            }, response => {
              this.FG_TABLE.editRow.is_show = false
              this.$message.error(response.body.resultMessage, response.body)
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
            if(target[i].status==3){
              this.$message({
                showClose: true,
                type: 'warning',
                message: '请选择未停用的供应商'
              })
              return false
            }else{
              deleteId.push(target[i].id)
            }

          }
          let deleteIdList = deleteId.join()
          let params = this.FG_TABLE_getParams(this.$_.merge({
            idList: deleteIdList
          }, {}))


          this.$confirm('确认删除？')
            .then(_ => {
              if (!this.FG_TABLE_getLock()) {
                this.$message.error('请等待上个操作完成！')
                return false
              }
              this.$http(this.$_.merge({}, Action.Purchase.supplierFile.delete, {
                //获取待更新数据
                body: params
              })).then(response => {
                this.$message({showClose: true, type: 'success', message: '删除成功'})
                this.FG_TABLE_releaseLock()
                this.FG_TABLE_refreshData({
                  page: this.FG_TABLE.pagination.pageFilter.info.currentPage
                })

              }, response => {
                this.FG_TABLE_releaseLock()
                this.$message.error('删除失败')
              })
            })
            .catch(_ => {
            })

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

      //下载导入模板
      FG_TABLE_downloadImportTpl: function () {
        alert('下载导入模板')
      },
      //批量导入
      FG_TABLE_batchImport: function () {
        alert('批量导入')
      }
    },
    mounted() {
    },
    components: {
      confirm,
      areaSelect
    },

  }
</script>
