<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          促销计划 - 列表
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-row :span="24" class="fg-content-opr">
            <router-link to="/salesPromotion/add" style="margin-right: 10px;">
              <el-button :plain="true" type="primary" size="" ><i
                class="fa fa-plus"></i> 新增
              </el-button>
            </router-link>

            <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showRefeshTable"><i
              class="fa fa-refresh"></i> 刷新
            </el-button>

            <!-- 搜索  -->
            <el-input
              class="fg-search-input"
              placeholder="输入编码/名称进行查询"
              icon="search"
              v-model="FG_TABLE.pagination.pageFilter.searchContent"
              :on-icon-click="FG_TABLE_handleTableSearch">
            </el-input>
            <advQuery left="left:555px"></advQuery>

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

            :default-sort = "{prop: 'date', order: 'descending'}"
          >
            <el-table-column
              type="selection"
              width="90"><span style="position: relative;
        top: -6px;">全选</span>
            </el-table-column>
            <el-table-column prop=""  type="index" label="序号" width="70"></el-table-column>
            <el-table-column   label="业务单号" width="120" class="oddNum">
              <template scope="scope">
                <p @click="FG_TABLE_handleCellClick(scope.$index, scope.row)" :id="scope.row.ART_num"><span>{{ scope.row.ART_num }}</span></p>
              </template>
            </el-table-column>

            <el-table-column prop="" label="促销名称" width="100" ></el-table-column>
            <el-table-column prop="" label="促销模式" width="100"></el-table-column>
            <el-table-column prop="" label="状态"  width="70"></el-table-column>
            <el-table-column prop="" label="开始日期" width="100"></el-table-column>
            <el-table-column prop="" label="结束日期" width="100"></el-table-column>
            <el-table-column prop="" label="制单人员姓名" width="120"></el-table-column>
            <el-table-column prop="" label="制单日期" width="120"></el-table-column>
            <el-table-column prop="" label="审核人员姓名" width="120"></el-table-column>
            <el-table-column prop="" label="审核日期" width="100"></el-table-column>
            <el-table-column prop="" label="备注" show-overflow-tooltip></el-table-column>

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
  import StoreQuery from '@/components/compos/query/storeQuery.vue'
  export default {
    components:{
      advQuery,
      StoreQuery
    },
    data(){
      return{
        FG_TABLE: {
          data: [
            {
              order:"001",
              store:"北京",
              month: "2017-02",
              date: "2017-02-05",
              //货号
              ART_num: "525",
              brand_name : "手机",
              spec: "小",
              unit: "17px",
              income_num:"1234",
              income_money:"144",
              out_num : "23",
              out_money: "1555",
              kind : "电器",
              brand: "iphone"

            },{
              order:"005",
              store:"天津",
              month: "2017-06",
              date: "2017-02-04",
              //货号
              ART_num: "2323",
              brand_name : "手机",
              spec: "小",
              unit: "",
              income_num:"1234",
              income_money:"144",
              out_num : "23",
              out_money: "1555",
              kind : "电器",
              brand: "iphone"
            },{
              order:"002",
              store:"北京",
              month: "",
              date: "2017-02-07",
              //货号
              ART_num: "525",
              brand_name : "手机",
              spec: "小",
              unit: "",
              income_num:"1234",
              income_money:"144",
              out_num : "23",
              out_money: "1555",
              kind : "电器",
              brand: "iphone"
            },{
              order:"003",
              store:"北京",
              month: "",
              date: "2017-02-03",
              //货号
              ART_num: "525",
              brand_name : "手机",
              spec: "小",
              unit: "",
              income_num:"1234",
              income_money:"144",
              out_num : "23",
              out_money: "1555",
              kind : "电器",
              brand: "iphone"
            },
            {
              order:"004",
              store:"北京",
              month: "",
              date: "2017-02-08",
              //货号
              ART_num: "525",
              brand_name : "手机",
              spec: "小",
              unit: "",
              income_num:"1234",
              income_money:"144",
              out_num : "23",
              out_money: "1555",
              kind : "电器",
              brand: "iphone"
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
              filters: {
                dateStart:"",
                dateEnd:"",
                dateType:"",
                store:"",
                goodsNum:"",// 货号
                brandName:"",
                moneyStart:"",// 金额
                moneyEnd:"",
                moneySubtotalStart:"", // 金额小计
                moneySubtotalEnd:"",
              },
              filtersOptions:{
                pickerOptionsEnd:{
                  disabledDate: (time) => {
                    let beginDateVal = this.FG_TABLE.pagination.pageFilter.filters.dateStart;
                    if (beginDateVal) {
                      return time.getTime() < beginDateVal;
                    }
                  }
                },
                dateTypeOptions: [
                  {value : 0 , label : "今日"},
                  {value : 1 , label : "昨天"},
                  {value : 2 , label : "本周"},
                  {value : 3 , label : "上周"},
                  {value : 4 , label : "本月"},
                  {value : 5 , label : "上月"},
                ],
                storeOptions:[
                  {value : 0 , label : "总部"},
                  {value : 1 , label : "上海分部"},
                  {value : 2 , label : "杭州分部"},
                  {value :3 , label : "广州分部"}

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

        merchantID: 888888,
        FG_STOREQUERY :{
          storeQueryShow:false,
        }
      }
    },
    created(){

    },
    methods :{
      showChange(val){
        this.FG_STOREQUERY.storeQueryShow = val;
      },
      getStoreName(val){
        console.log(val)
        this.FG_TABLE.pagination.pageFilter.filters.store = val.value
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
//        for (let i in this.FG_TABLE.pagination.pageFilter.filters) {
//          params[this.FG_TABLE.pagination.pageFilter.filters[i].name] = this.FG_TABLE.pagination.pageFilter.filters[i].value
//        }
        for (let name in this.FG_TABLE.pagination.pageFilter.filters) {
          params[name] = this.FG_TABLE.pagination.pageFilter.filters[name]
        }


        //将自定义字段加入
        for (let name in options) {
          params[name] = options[name]
        }

        params.rows = this.FG_TABLE.pagination.setting.rows
        console.log(params)
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

        this.$http(this.$_.merge({}, Action.System.Role.list, {
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
      // 新增
      FG_TABLE_showAddRowForm: function () {
        this.FG_TABLE.addRow.is_show = true;
      },

      FG_TABLE_onAddRowSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            // 提交
            this.$http(this.$_.merge({}, Action.Product.Unit.add, {
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
      },
      FG_TABLE_Print:function () {
        alert("打印")
      },
      FG_TABLE_Export:function(){
        alert("导出")
      },
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

      // 高级查询 确定
      FG_advQuery_submitForm:function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.FG_TABLE_refreshData()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //高级查询 重置
      FG_advQuery_resetForm:function (formName) {
        this.$refs[formName].resetFields();
      },


      FG_advQuery_openStore: function () {
        this.FG_STOREQUERY.storeQueryShow = true;
      },

      FG_TABLE_handleCellClick(index,row){
        console.log(index)
        console.log(row.ART_num)
        this.$router.push({path:'/salesPromotion/edit',query:{id:row.ART_num}})
      }
    },
    mounted(){

    }
  }
 </script>
<style lang="scss" scoped>
  .el-table .cell p{
    span{
      color: rgb(77, 165, 255);
      cursor: pointer;
      /*text-decoration-line: underline;*/
    }


  }
</style>
