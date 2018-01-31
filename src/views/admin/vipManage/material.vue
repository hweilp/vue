<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          会员资料 - 列表
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-row :span="24" class="fg-content-opr">

            <!-- 搜索  -->
            <el-input
              class="fg-search-input"
              placeholder="可输入编码/姓名/会员类别进行查询"
              icon="search"
              v-model="FG_TABLE.pagination.pageFilter.searchContent"
              :on-icon-click="FG_TABLE_handleTableSearch"
              @keyup.enter.native="FG_TABLE_handleTableSearch">
            </el-input>
            <advQuery left="left:375px">

              <el-form ref="advQueryForm" :model="FG_TABLE.pagination.pageFilter.filters" label-width="100px"
                       :rules="FG_TABLE.pagination.pageFilter.rules">
                <el-row>

                  <el-row :span="24">

                    <el-col :span="12">
                      <el-form-item label="姓名 ：" prop="realName">
                        <el-input v-model="FG_TABLE.pagination.pageFilter.filters.realName" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="手机号 ：" prop="mobile">
                        <el-input v-model="FG_TABLE.pagination.pageFilter.filters.mobile" placeholder=""></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="会员类别 ：" prop="memberLevelNo">
                        <el-select v-model="FG_TABLE.pagination.pageFilter.filters.memberLevelNo" placeholder=""
                                   style="width: 360px">
                          <el-option
                            v-for="item in memberLevelOptions"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24" style="padding-left: 90px">
                      <el-form-item label="">
                        <el-button type="primary" @click="FG_advQuery_submitForm('advQueryForm')">确定</el-button>
                        <el-button @click="FG_advQuery_resetForm('advQueryForm')">重置</el-button>
                      </el-form-item>
                    </el-col>

                  </el-row>
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
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column prop="" type="index" label="序号" width="70"></el-table-column>
            <el-table-column prop="memberNo" label="编号" width="130px"></el-table-column>
            <el-table-column prop="realName" label="姓名" width="" class="oddNum"></el-table-column>
            <el-table-column prop="levelName" label="类别" width=""></el-table-column>
            <el-table-column prop="mobile" label="手机号" width=""></el-table-column>
            <el-table-column prop="birthdayStr" label="生日" width=""></el-table-column>
            <el-table-column prop="usableVirtualCapital" label="可用虚拟资金" width="170px"></el-table-column>
            <el-table-column prop="frozenVirtualCapital" label="冻结虚拟资金" width=""></el-table-column>
            <el-table-column prop="totalIntegral" label="累计充值或消费积分合计" width="190px"></el-table-column>
            <el-table-column prop="usableIntegral" label="可用积分值" width=""></el-table-column>
            <el-table-column prop="frozenIntegral" label="冻结积分" width=""></el-table-column>
            <el-table-column prop="frozenIntegral" label="冻结积分" width=""></el-table-column>
            <el-table-column prop="lastLoginTimeStr" label="最近登录时间" width=""></el-table-column>
            <el-table-column prop="addTimeStr" label="创建时间" width=""></el-table-column>
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

        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import advQuery from '@/components/compos/query/advQuery.vue'
  export default {
    components: {
      advQuery,
    },
    data(){
      return {
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
            setting: {
              paginationShow: true,
              currentPage: 1,
              rows: 5,
            },
            pageFilter: {
              searchContent: '',
              filters: {
                status: '',
                mobile: '',
                realName: '',
                memberLevelNo: ''
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
              },
              rules: Rules.HighQuery,
            },

          }
        },
        memberLevelOptions: []
      }
    },
    created(){
      this.$http(this.$_.merge({}, Action.VipManage.Material.memberLevelList, {})).then(response => {
        this.memberLevelOptions = response.body
      }, response => {

      })
      this.FG_TABLE_initData()
    },
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
//        for (let i in this.FG_TABLE.pagination.pageFilter.filters) {
//          params[this.FG_TABLE.pagination.pageFilter.filters[i].name] = this.FG_TABLE.pagination.pageFilter.filters[i].value
//        }

        for (let name in this.FG_TABLE.pagination.pageFilter.filters) {
          if (this.FG_TABLE.pagination.pageFilter.filters[name] !== '') {
            params[name] = this.FG_TABLE.pagination.pageFilter.filters[name]
          }
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

        let params = this.FG_TABLE_getParams(this.$_.merge({}, option))

        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }

        this.$http(this.$_.merge({}, Action.VipManage.Material.list, {
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

      // 新增
      FG_TABLE_showAddTable(){
        this.$router.push({path: '/vipManage/add'})
      },

      // 搜索icon点击事件
      FG_TABLE_handleTableSearch: function () {
        this.FG_TABLE_refreshData()
      },

      FG_pagination_reset: function () {
        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
        }
      },

      FG_TABLE_showEditTable: function () {
        if (this.FG_TABLE.multiSelectData.length === 1) {
          let target = this.FG_TABLE.multiSelectData[0]
          this.$router.push({path: '/vipManage/edit', query: {cid: target.cid}})
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
        this.FG_TABLE_showEditTable()
      },
      FG_TABLE_handleSelectionChange: function (val) {
        this.FG_TABLE.multiSelectData = val
      },

      // 高级查询 确定
      FG_advQuery_submitForm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_TABLE.pagination.pageFilter.searchContent = ''
            this.FG_TABLE_refreshData()
          } else {
            return false
          }
        })
      },
      //高级查询 重置
      FG_advQuery_resetForm: function (formName) {
        this.$refs[formName].resetFields()
        this.FG_TABLE_refreshData()
      },

      FG_TABLE_handleCellClick(index, row){
        this.$router.push({path: '/vipManage/edit', query: {cid: row.cid}})
      },
      // 显示每页的数据条数改变
      FG_TABLE_handleRowSizeChange: function (val) {
        this.FG_TABLE.pagination.setting.rows = val
        this.FG_pagination_reset()

      },

      // 页码发生改变
      FG_TABLE_handleCurrentPageChange: function (val) {
        this.FG_TABLE_refreshData({
          page: val
        })
      },

    },
    mounted(){

    }
  }
</script>
<style lang="scss" scoped>
  .el-table .cell p {

  span {
    color: rgb(77, 165, 255);
    cursor: pointer;
    /*text-decoration-line: underline;*/
  }

  }
</style>
