<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="staff">

        <div class="container">
          <div class="content">
            <el-row :span="24" class="fg-content-title">
              员工信息 - 列表
            </el-row>
            <el-row :span="24" class="fg-content-detail" style="height: 590px;">

              <el-row :span="24" class="fg-content-opr">
                <el-button v-if="power.indexOf(17121101) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_TABLE_showAddRowForm"><i
                  class="fa fa-plus"></i> 新增
                </el-button>
                <el-button v-if="power.indexOf(17121102) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_TABLE_showEditRowForm"><i
                  class="fa fa-edit"></i> 编辑
                </el-button>
                <el-button v-if="power.indexOf(17121103) > -1 ? true : false"  :plain="true" type="info" size="" @click="FG_TABLE_showTurnStatusRowForm"><i
                  class="fa fa-pencil"></i> 改变状态
                </el-button>
                <!--<el-button :plain="true" type="info" size="" @click="FG_TABLE_restStaffPwd"><i-->
                  <!--class="fa fa-rotate-left"></i> 重置员工密码-->
                <!--</el-button>-->
                <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showRefeshForm"><i
                  class="fa fa-refresh"></i> 刷新
                </el-button>
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
                stripe
                fit
                header-dragend
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
                  width="90" label=""><span style="position: relative;
              top: -6px;">全选</span>
                </el-table-column>


                <el-table-column
                  prop=""
                  label="序号"
                  type="index"
                  sortable
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="员工号"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="员工名称"
                  sortable>
                </el-table-column>
                <el-table-column
                  prop="statusStr"
                  label="状态">
                </el-table-column>
                <el-table-column
                  prop="loginFailNum"
                  label="失败登录次数">
                </el-table-column>
                <el-table-column
                  prop="lastLoginTimeStr"
                  label="最后登录时间">
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
                <span></span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="FG_TABLE.dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="FG_TABLE.dialogVisible = false">确 定</el-button>
              </span>
              </el-dialog>


              <el-dialog title="员工状态 - 编辑" :visible.sync="FG_TABLE.turnStatus.is_show">

                <el-form ref="turnStatusFrom" :model="FG_TABLE.turnStatus.data" label-width="100px">
                  <el-form-item label="状态 ：">
                    <el-select v-model="FG_TABLE.turnStatus.data.status" placeholder="请选择状态" style="width: 130px">
                      <el-option
                        v-for="item in FG_TABLE.addRow.statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>

                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="FG_TABLE.turnStatus.is_show = false">取 消</el-button>
                  <el-button type="primary" @click="FG_TABLE_turnStatusOnEditRowSubmit('turnStatusFrom')">改变</el-button>
                </div>
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
  import areaSelect from '@/components/compos/area/areaSelect'
  //  import ElRow from 'element-ui/packages/row/src/row'
  //  import ElCol from 'element-ui/packages/col/src/col'
  import imgUpload from '@/components/compos/imgUpload/imgUpload'
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
              empId: 0,
              empNo: 5254,
              disc: "",
              name: "",
              status: 1,
              store: "",
            },
            rules: Rules.System.Staff.editForm
          },
          addRow: {
            name: 'addForm',
            is_show: false,
            is_remote_data: true,
            activeName: "first",
            menuData: {},
            data: {
              empId: "",
              name: "",
              pwd: "",
              mobile: '',
              store: "",
              status: 1,

              gender: 0, // 性别
              isMarried: 0,//是否结婚
              birthday: '',
              certType: "",//证件类型
              certNo: "",//证件号码
              bankName: "",//柜员银行卡开户银行
              bankCardNo: '',//柜员银行卡号
              placeOfBirth: '',

              birthAreaCode: "",//柜员出生省市区
              placeOfBirthProvince: '',
              placeOfBirthCity: '',//
              placeOfBirthCounty: '',//
              birthAddress: '',//柜员出生具体地址

              spouseName: '',//柜员配偶姓名
              spouseMobile: "",//柜员配偶手机
              spouseBirthday: "",//柜员配偶生日

              resideAreaCode: "",//柜员现居住省市区

              livingPlaceProvince: "",// 现居省
              livingPlaceCity: "",//现居市
              livingPlaceCounty: '',//现居县
              resideAddress: '',//柜员现居住具体地址（除省市区外）

              education: '',//柜员学历
              personPhoto: "",//柜员照片
              certPhoto1: "",//柜员证件正面照
              certPhoto2: "",//柜员证件背面照
              updateTime: Helper.FG.formatDate(new Date()),


              type: 10
            },
            rules: Rules.System.Staff.addForm,
            statusOptions: [
              {value: 1, label: "正常"},
              {value: 2, label: "关闭"},
              {value: 3, label: "锁定"},
            ],
            bankOptions: [
              {
                value: 0,
                label: '中国建设银行'
              }, {
                value: 1,
                label: '中国工商银行'
              }, {
                value: 2,
                label: '中国农业银行'
              }, {
                value: 3,
                label: '中国开发银行'
              }, {
                value: 4,
                label: '中国银行'
              }],
            schoolRecordOptions: [
              {
                value: 10,
                label: '科学院士'
              }, {
                value: 9,
                label: '教授'
              }, {
                value: 8,
                label: '博士'
              }, {
                value: 7,
                label: '硕士'
              }, {
                value: 6,
                label: '研究生'
              }, {
                value: 5,
                label: '学士生'
              }, {
                value: 4,
                label: '专科生'
              }, {
                value: 3,
                label: '高中'
              }, {
                value: 2,
                label: '初中'
              }, {
                value: 1,
                label: '小学'
              }, {
                value: 0,
                label: '无'
              }
            ],
          },
          turnStatus: {
            is_show: false,
            data: {
              status: ""
            }
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

        FG_MENU: {
          selected: {
            code: 0,
            name: '',
            parentCode: '',
          },
          data: [
            {name: "角色", children: [], parentCode: 0, code: 0, mid: "", num: 0, status: 1},
          ]
        },
        merchantID: 888888,


      }

    },
    created: function () {
//      this.FG_MENU_initData()
      this.FG_TABLE_initData()

    },
    watch: {
//      'FG_MENU.selected.code': function (data) {
//        this.FG_TABLE.addRow.data.code = data
//        this.FG_TABLE_initData();
//      }
    },
    methods: {

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
//            parentCode: this.FG_MENU.selected.code,
//            status: 0,
//            code : this.FG_MENU.selected.code
        }, option))

        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
        }
        this.$http(this.$_.merge({}, Action.System.Staff.list, {
          params
        })).then(response => {
          //表格数据

          let result = response.body

          this.FG_TABLE.data = result.data

          Helper.FG.setValueToObject(this.FG_TABLE.pagination.pageFilter.info, result.pagination)

          this.FG_TABLE_releaseLock()
        }, response => {
          this.$message.error(response.body.resultMessage, response.body)
          this.FG_TABLE_releaseLock()
        })
      },


      // 编辑
      FG_TABLE_showEditRowForm: function () {

        if (this.FG_TABLE.multiSelectData.length === 1) {
          let target = this.FG_TABLE.multiSelectData[0]

          this.$router.push({path: "/system/staffEdit", query: {empNo: target.empNo}})

        } else {
          this.$message({
            type: 'warning',
            message: '请选择一项数据'
          })
        }
      },

      // 新增
      FG_TABLE_showAddRowForm: function () {
        this.$router.push({path: "/system/staffAdd"})
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
      FG_TABLE_showRefeshForm: function () {
        this.FG_pagination_reset()
      },

      // 增加弹出框 tab 切换
      FG_TABLEADD_handleTabClick(tab, event) {
      },

      // 改变员工状态
      FG_TABLE_showTurnStatusRowForm: function () {
        if (this.FG_TABLE.multiSelectData.length >= 1) {
          this.FG_TABLE.turnStatus.is_show = true
        } else {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请选择一项数据'
          })
        }

      },
      FG_TABLE_turnStatusOnEditRowSubmit: function () {
        let target = this.FG_TABLE.multiSelectData
        console.log(this.FG_TABLE.turnStatus.data.status)
        for (let i = 0; i < target.length; i++) {
          if (target[i].status == this.FG_TABLE.turnStatus.data.status) {
            this.$message({
              showClose: true,
              type: 'warning',
              message: '请选择不同状态进行改变'
            })
            return false
          }
        }
        let empNos = []
        for (let i = 0; i < target.length; i++) {
          empNos.push(target[i].empNo)
        }
        empNos = empNos.join()
        if (this.FG_TABLE.turnStatus.data.status == 1) {


          this.$http(this.$_.merge({}, Action.System.Staff.updateStatus.normal, {body: {empNos: empNos}}
          )).then(response => {
            this.FG_TABLE.turnStatus.is_show = false
            this.$message({
              showClose: true,
              type: 'success',
              message: '状态修改为正常'
            })
            this.FG_TABLE_refreshData()
          }, response => {

          })
        } else if (this.FG_TABLE.turnStatus.data.status == 2) {
          this.$http(this.$_.merge({}, Action.System.Staff.updateStatus.close, {body: {empNos: empNos}}
          )).then(response => {
            this.FG_TABLE.turnStatus.is_show = false
            this.$message({
              showClose: true,
              type: 'success',
              message: '状态修改为关闭'
            })
            this.FG_TABLE_refreshData()

          }, response => {

          })
        } else if (this.FG_TABLE.turnStatus.data.status == 3) {
          this.$http(this.$_.merge({}, Action.System.Staff.updateStatus.lock, {body: {empNos: empNos}}
          )).then(response => {
            this.FG_TABLE.turnStatus.is_show = false
            this.$message({
              showClose: true,
              type: 'success',
              message: '状态修改为锁定'
            })
            this.FG_TABLE_refreshData()

          }, response => {

          })
        } else {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请选择要更改的状态'
          })
        }
      },
      // 重置员工密码
      FG_TABLE_restStaffPwd(){
        if (this.FG_TABLE.multiSelectData.length >= 1) {
          this.$confirm('确认为员工重置密码？')
            .then(_ => {
              if (!this.FG_TABLE_getLock()) {
                this.$message.error('请等待上个操作完成！')
                return false
              }

              this.$http(this.$_.merge({timeout: 1000}, Action.System.updatePasswords.reset, {
//                url: Helper.FG.setParams(Action.System.updatePasswords.reset.url, {mobile: this.resetPasswordsForm.data.mobile})
              })).then(response => {

                let result = response.body
                if (result.success == true) {
                  this.$message({
                    type: 'success',
                    message: '重置密码成功'
                  })
                } else {
                  this.$message.error(result.resultMessage, response.body)
                }
                this.FG_TABLE_releaseLock()

              }, response => {
                this.$message.error(response.body.resultMessage)
                this.FG_TABLE_releaseLock()
              })

            })
            .catch(_ => {});

        } else {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请选择一项数据'
          })
        }
      }

    },
    mounted() {

    },
    components: {
      areaSelect,
      imgUpload
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/param";
  @import "../../../assets/admin/css/main/comm";

  .el-form-item {
    float: left;
    width: 540px;
  }


</style>
