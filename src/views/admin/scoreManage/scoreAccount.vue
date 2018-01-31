<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="scoreAccount">
        <div class="container">
          <div class="content">

            <el-row :span="24" class="fg-content-title">我的积分账户
              <div style="display: inline-block;margin-left: 100px;">
                余额 <span style="color: rgb(255, 63, 111)" v-html="merchantIntegralAccount.usableIntegral"></span> 分
              </div>
            </el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-title" style="padding-left: 0;">积分明细</el-row>
              <el-row :span="24" class="fg-content-opr" >
                <el-input
                  style="margin-left: 0;"
                  class="fg-search-input"
                  placeholder="请输入业务单号进行查询"
                  icon="search"
                  v-model="FG_TABLE.pagination.pageFilter.searchContent"
                  :on-icon-click="FG_TABLE_handleTableSearch"
                  @keyup.enter.native="FG_TABLE_handleTableSearch">
                </el-input>
                <adv-query left="left:375px">
                  <el-form ref="advQueryForm" :model="FG_advQueryForm.filters" label-width="100px">
                    <el-row>
                      <date-link @on-get-date="getDate" label="交易日期 ："></date-link>
                      <el-col :span="12">
                        <el-form-item label="业务类型 ：" prop="integralType">
                          <el-select  v-model="FG_advQueryForm.filters.integralType" placeholder="" style="width: 180px;margin-left: 10px;">
                            <el-option  v-for="item in FG_advQueryForm.integralTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item label="">
                          <el-button type="primary" @click="FG_advQuery_submitForm('advQueryForm')">确定</el-button>
                          <el-button @click="FG_advQuery_resetForm('advQueryForm')">重置</el-button>
                        </el-form-item>
                      </el-col>

                    </el-row>
                  </el-form>
                </adv-query>
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
                :default-sort="{prop: 'useTimeStr', order: 'descending'}"
              >
                <el-table-column
                  prop=""
                  type="index"
                  label="序号"
                  width="90">
                </el-table-column>

                <el-table-column prop="keyInfo"  label="业务单号" width="150"></el-table-column>
                <el-table-column prop="integralTypeStr"  label="业务类型" width="150"></el-table-column>


                <el-table-column prop="integralValue" label="交易积分" width="150">

                  <template scope="scope">
                    <p
                       :class="{ 'class-a': scope.row.direction == 3 ? true : false, 'class-b': scope.row.direction == 2 ? true : false }"
                       >{{scope.row.integralValue}}</p>
                  </template>

                </el-table-column>
                <el-table-column prop="useTimeStr" label="交易日期"  width="180"></el-table-column>
                <el-table-column prop="remark" label="备注"  width="300"></el-table-column>

                <el-table-column></el-table-column>
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
    </div>
  </div>
</template>

<script>
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import advQuery from '@/components/compos/query/advQuery.vue'
  import DateLink from '@/components/compos/dateLink/date-link.vue'
  import ElCol from 'element-ui/packages/col/src/col'
  export default {
    components: {ElCol,advQuery,DateLink},
    data () {
      return{
        FG_advQueryForm:{
          filters: {
            startTime :'',
            endTime :"",
            integralType:0
          },
          integralTypeOptions:[
            { value : 0 , label : "全部"},
            { value : 1010 , label : "用户注册"},
            { value : 1020 , label : "购买商品"},
            { value : 1030 , label : "兑换积分商品"}
          ]

        },
        merchantIntegralAccount:{
          usableIntegral:''
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
            setting: {
              paginationShow: true,
              currentPage: 1,
              rows: 5,
            },
            pageFilter: {
              searchContent: '',
              filters: {
                startTime :'',
                endTime :"",
                integralType:''
              },
              filtersOptions: {
                pickerOptionsEnd: {
                  disabledDate: (time) => {
                    let beginDateVal = this.FG_TABLE.pagination.pageFilter.filters.dateStart;
                    if (beginDateVal) {
                      return time.getTime() < beginDateVal;
                    }
                  }
                },
                dateTypeOptions: [
                  {value: 0, label: "今日"},
                  {value: 1, label: "昨天"},
                  {value: 2, label: "本周"},
                  {value: 3, label: "上周"},
                  {value: 4, label: "本月"},
                  {value: 5, label: "上月"},
                ],
                storeOptions: [
                  {value: 0, label: "总部"},
                  {value: 1, label: "上海分部"},
                  {value: 2, label: "杭州分部"},
                  {value: 3, label: "广州分部"}

                ],
                categoryTypeOptions: [
                  {value: 0, label: "大类汇总"},
                  {value: 1, label: "中类汇总"},
                  {value: 2, label: "小类汇总"},
                ],
                documentTypeOptions:[
                  {value : 0 , label : "采购收货单"},
                  {value : 1 , label : "采购退货单"},
                  {value : 2 , label : "全部"},
                ],// 单据类型
                salestTypeOptions:[
                  {value : 0 , label : "直接特价"},
                  {value : 1 , label : "直接折扣"},
                  {value : 2 , label : "全部"},
                ],
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
        },
      }
    },
    created () {
      this.$http(this.$_.merge({}, Action.Score.scoreAccount.merchantIntegralAccount, {

      })).then(response => {
        Helper.FG.setValueToObject(this.merchantIntegralAccount, response.body)
      }, response => {
        this.$message.error(response.body.resultMessage);
      })
      this.FG_TABLE_initData()
    },
    methods :{
      //init
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
        for (let name in this.FG_TABLE.pagination.pageFilter.filters) {
          if(this.FG_TABLE.pagination.pageFilter.filters[name] !=""){
            params[name] = this.FG_TABLE.pagination.pageFilter.filters[name]
          }
        }
        if(params.dateStart){
          params.dateStart = Helper.FG.formatDate(params.dateStart,'/')
        }
        if(params.dateEnd){
          params.dateEnd = Helper.FG.formatDate(params.dateEnd,'/')
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
//          status: 1,
        }, option))

        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }

        this.$http(this.$_.merge({}, Action.Score.scoreAccount.merchantIntegralFlow, {
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
      // 显示每页的数据条数改变
      FG_TABLE_handleRowSizeChange:function(val) {
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
      // 刷新
      FG_TABLE_showRefeshTable : function () {
        this.FG_TABLE_refreshData()
      },

      // 返回
      FG_TABLE_showBackTable(){
        this.$router.go(-1)
      },
      // 高级查询 确定
      FG_advQuery_submitForm:function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_TABLE.pagination.pageFilter.searchContent = ''
            Helper.FG.setValueToObject( this.FG_TABLE.pagination.pageFilter.filters, this.FG_advQueryForm.filters)
            this.FG_TABLE_refreshData()
          } else {
            return false;
          }
        });
      },

      //高级查询 重置
      FG_advQuery_resetForm:function (formName) {
        this.$refs[formName].resetFields();
      },

      // 货号单击跳转
      FG_TABLE_handleCellClick(index,row){
        this.FG_TABLE.productSelectShow = true
      },


      //helper
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
      // 总计
      FG_TABLE_getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '总计';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      },
      // 双击行
      FG_TABLE_handleRowDoubleClick: function (row) {
        this.$refs.FG_TABLE.clearSelection() //清除所有的勾选
        this.$refs.FG_TABLE.toggleRowSelection(row, true) //勾选当前行
//        this.FG_TABLE_showEditRowForm()
      },


      // 组件传值
      getDate(val){
        this.FG_advQueryForm.filters.startTime  = val.dateStart
        this.FG_advQueryForm.filters.endTime  = val.dateEnd
      }
    },
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
  .class-a{
    color: #FF6666;
    &:before{
      content: '-';
      display: inline-block;
      width: 10px;
      height:10px;
      color: #FF6666;
    }
  }
  .class-b{
    color: #3399FF;
    &:before{
      content: '+';
      display: inline-block;
      width: 10px;
      height:10px;
      color: #3399FF;
    }
  }
</style>
