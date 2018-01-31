<template>
  <div>
    <div id="main" class="fg-table-type" role="main">


      <div class="container">
        <div class="content">
          <el-row :span="24" class="fg-content-title">
            账户流水
          </el-row>
          <el-row :span="24" class="fg-content-detail">
            <el-row :span="24" class="fg-content-opr">
              <!--<el-select v-model="FG_TABLE.pagination.pageFilter.filters.status"  style="margin-left: 10px;text-align: center;margin-right: 10px">-->
              <!--<el-option  v-for="item in FG_TABLE.pagination.pageFilter.merchantStatusOptions"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--<router-link to="/dealer/add" style="margin-right: 10px" v-if="power.indexOf(15111101) > -1 ? true : false">-->
              <!--<el-button :plain="true" type="primary" size=""><i-->
              <!--class="fa fa-plus"></i> 新增-->
              <!--</el-button>-->
              <!--</router-link>-->
              <!--<el-button v-if="power.indexOf(15111102) > -1 ? true : false" :plain="true" type="primary" size="" @click="FG_TABLE_showEditRowForm"><i-->
              <!--class="fa fa-edit"></i> 编辑-->
              <!--</el-button>-->
              <!--<el-button v-if="power.indexOf(15111103) > -1 ? true : false" :plain="true" type="danger" size="" @click="FG_TABLE_showDeleteRowForm"><i-->
              <!--class="fa fa-remove"></i> 删除-->
              <!--</el-button>-->

              <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showRefeshTable"><i
                class="fa fa-refresh"></i> 刷新
              </el-button>
              <el-input
                class="fg-search-input"
                placeholder="可输入客户号/客户名称进行查询"
                icon="search"
                v-model="FG_TABLE.pagination.pageFilter.searchContent"
                :on-icon-click="FG_TABLE_handleTableSearch"
                @keyup.enter.native="FG_TABLE_handleTableSearch">
              </el-input>
              <advQuery left="left:468px">
                <el-form ref="advQueryForm" :model="FG_advQueryForm" label-width="120px" :inline="true">
                  <el-row :span="24">
                    <!--<date-link @on-get-date="getDate" label="日期："></date-link>-->
                    <datetime-link @on-get-date="getDate" label="日期："></datetime-link>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="客户号：" prop="cid">
                      <el-input v-model="FG_advQueryForm.cid" style="width: 405px"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="产生记录类型 ：" prop="type" style="position: relative;">
                      <el-select v-model="FG_advQueryForm.type" placeholder="产生记录类型 " style="width: 405px">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="购物" :value="1000"></el-option>
                        <el-option label="退款" :value="2000"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-row>

                  <el-row :span="24">
                    <el-form-item label="方式 ：" prop="payType" style="position: relative;">
                      <el-select v-model="FG_advQueryForm.payType" placeholder="收款 " style="width: 405px">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="收款" :value="2"></el-option>
                        <el-option label="付款" :value="1"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-row>

                  <el-row :span="24" style="padding-left: 110px">
                    <el-form-item>
                      <el-button type="primary" @click="FG_handleAdvQueryForm()">确定</el-button>
                      <el-button @click="FG_resetAdvQueryForm('advQueryForm')">重置</el-button>
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
              :default-sort="{prop: 'index', order: 'descending'}"
            >
              <!--<el-table-column-->
              <!--type="selection"-->
              <!--width="90"><span style="position: relative;-->
              <!--top: -6px;">全选</span>-->
              <!--</el-table-column>-->
              <el-table-column
                label="序号"
                type="index"
                width="70"
              >
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="id"-->
                <!--label="编号">-->
              <!--</el-table-column>-->

              <!--<el-table-column-->
                <!--prop="cid"-->
                <!--label="客户号">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="realName"
                label="客户名称"
              >
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="mid"-->
                <!--label="商户号">-->
              <!--</el-table-column>-->

              <el-table-column
                prop="typeStr"
                label="记录类型">
              </el-table-column>
              <el-table-column
                prop="payTypeStr"
                label="方式">
              </el-table-column>


              <el-table-column
                prop="amount"
                label="操作资金">
                <template scope="scope">
                  <span v-if="scope.row.direction==1">{{scope.row.amount}}</span>
                  <span v-if="scope.row.direction==2" style="color: red">+{{scope.row.amount}}</span>
                  <span v-if="scope.row.direction==3" style="color: green">-{{scope.row.amount}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="usableCapital"
                label="可用资金">
              </el-table-column>
              <el-table-column
                prop="frozenCapital"
                label="冻结资金">
              </el-table-column>
              <el-table-column
                prop="totalCapital"
                label="总资金">
              </el-table-column>
              <el-table-column
                prop="updateTimeStr"
                label="时间">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注">
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

              :page-sizes="FG_TABLE.pagination.pageFilter.info.pageSizes"
              :layout="FG_TABLE.pagination.pageFilter.info.layout"
              :total="FG_TABLE.pagination.pageFilter.info.total"
            >
            </el-pagination>
          </el-row>


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
          <!-- 确认提示框 -->
        </div>
      </div>

    </div>

  </div>
</template>


<style lang="scss">

  @import "../../../assets/admin/css/main/param";

  .leftMenu {
    background: white;

    .el-tree {
      padding: 3px 10px 3px;
      border: 0;
      height: 585px;
    }

  }

</style>

<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import advQuery from '@/components/compos/query/advQuery'
  import DatetimeLink from '@/components/compos/dateLink/datetime-link.vue'
  import supplierSelect from '@/components/compos/supplier/supplier-select'
  import areaSelect from '@/components/compos/area/areaSelect'

  export default {
    data () {
      return {
        power: this.$store.state.User.power,
        mid: this.$store.state.User.merchantMID,
        FG_advQueryForm: {
          cid: '',
          beginTime: '',
          endTime: '',
          payType: '',
          type:''
        },
        FG_TABLE: {
          data: [],
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
            setting: this.paginationParams.pageParams.setting,
            pageFilter: {
              searchContent: '',
              filters: {
                status: ''
              },
              orders: [],
              merchantStatusOptions: [
                {value: "", label: "全部状态"},
                {value: 10, label: "正常"},
                {value: 20, label: "关闭"},
                {value: 30, label: "锁定"},
              ],
              info : this.paginationParams.pageParams.info,
            }
          }
        },


      }
    },
    created: function () {
      this.FG_TABLE_initData()
    },
    watch: {
      "FG_TABLE.pagination.pageFilter.filters.status": function (val) {
        this.FG_TABLE.pagination.pageFilter.filters.status = val
        this.FG_TABLE_refreshData()
      }
    },
    methods: {


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
          if (this.FG_TABLE.pagination.pageFilter.filters[i] !== '') {
            params[i] = this.FG_TABLE.pagination.pageFilter.filters[i]
          }

        }
        params.mid = this.mid

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

        this.$http(this.$_.merge({}, Action.System.account.accountLog, {
          params
        })).then(response => {
          //表格数据

          let result = response.body

          this.FG_TABLE.data = result.data

          Helper.FG.setValueToObject(this.FG_TABLE.pagination.pageFilter.info, result.pagination)

        }, response => {

        })
      },
      //编辑
      handleEdit(val){
        this.$router.push({path: '/customer/detail', query: {cid: val}})
      },
      // 编辑
      FG_TABLE_showEditRowForm: function () {

        if (this.FG_TABLE.multiSelectData.length === 1) {
          let target = this.FG_TABLE.multiSelectData[0]
          this.$router.push({path: "/customer/detail", query: {cid: target.cid}})
        } else {
          this.$message({
            type: 'warning',
            message: '请选择一项数据'
          })
        }
      },
      FG_TABLE_showRefeshForm(){

      },
      //删除经销商
      FG_TABLE_showDeleteRowForm(){

        if (this.FG_TABLE.multiSelectData.length >= 1) {
          let target = this.FG_TABLE.multiSelectData
          let ids = []
          for (let i = 0; i < target.length; i++) {
            if (target[i].status == 20) {
              this.$message({
                type: 'warning',
                message: '有商户已删除'
              })
              return false
            } else {
              ids.push(target[i].id)
            }

          }
          this.$confirm('确认删除？')
            .then(_ => {
              ids = ids.join()
              this.$http(this.$_.merge({}, Action.Dealer.DealerList.delete, {
                body: {ids: ids}
              })).then(response => {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.FG_TABLE_refreshData()
              }, response => {
                this.$message.error(response.body.resultMessage, response.body)
              })
            })
            .catch(_ => {

            });

        } else {
          this.$message({
            type: 'warning',
            message: '请选择一项数据'
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
        //this.FG_TABLE.pagination.pageFilter.filters = {}
        this.FG_TABLE_refreshData()
      },

      //高级查询
      //高级查询获取日期
      // 组件传值
      getDate(val){
        this.FG_advQueryForm.beginTime = val.dateStart
        this.FG_advQueryForm.endTime = val.dateEnd
      },
      FG_handleAdvQueryForm: function () {
        this.FG_TABLE.pagination.pageFilter.filters = this.FG_advQueryForm
        this.FG_TABLE.pagination.pageFilter.searchContent = ''
        this.FG_TABLE_refreshData()
      },
      FG_resetAdvQueryForm: function (formName) {
        this.FG_advQueryForm.startTime = '',
          this.FG_advQueryForm.endTime = '',

          this.$refs[formName].resetFields();
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
      }

    },
    mounted() {

    },
    components: {
      advQuery, supplierSelect, DatetimeLink, areaSelect
    },

  }
</script>
