<template>

  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="purshaseBrandCollect">

        <div class="container">
          <div class="content">
            <el-row :span="24" class="fg-content-title">采购查询 - 采购品牌汇总</el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-opr">
                <el-button :plain="true" type="primary" size="" @click="FG_TABLE_Print"><i class="fa fa-print"></i> 打印</el-button>
                <el-button :plain="true" type="primary" size="" @click="FG_TABLE_Export"><i class="fa fa-arrow-circle-o-up"></i> 导出</el-button>
                <el-input
                  class="fg-search-input"
                  placeholder="请输入内容"
                  icon="search"
                  v-model="FG_TABLE.pagination.pageFilter.searchContent"
                  :on-icon-click="FG_TABLE_handleTableSearch">
                </el-input>
                <adv-query left="left:555px">
                  <el-form ref="advQueryForm" :model="FG_TABLE.pagination.pageFilter.filters" label-width="100px" >
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="日期 ：">
                          <div class="group">
                            <el-form-item prop="dateStart">
                              <el-date-picker type="date" placeholder="选择起始日期"
                                              v-model="FG_TABLE.pagination.pageFilter.filters.dateStart"></el-date-picker>
                            </el-form-item>
                            <i class="fa fa-minus linkIcon"></i>
                            <el-form-item prop="dateEnd">
                              <el-date-picker type="date" placeholder="选择日期" v-model="FG_TABLE.pagination.pageFilter.filters.dateEnd"
                                              :picker-options="FG_TABLE.pagination.pageFilter.filtersOptions.pickerOptionsEnd"></el-date-picker>
                            </el-form-item>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item prop="dateType">
                          <el-radio-group v-model="FG_TABLE.pagination.pageFilter.filters.dateType">

                            <el-radio
                              v-for="item in FG_TABLE.pagination.pageFilter.filtersOptions.dateTypeOptions"
                              :key="item.value"
                              :label="item.value"
                            >{{item.label}}
                            </el-radio>

                          </el-radio-group>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="门店 ：" prop="store">
                          <i class="dialogIcon icon" @click="FG_advQuery_openStore"></i>
                          <el-select v-model="FG_TABLE.pagination.pageFilter.filters.store" placeholder="总部" style="width: 360px">

                            <el-option
                              v-for="item in FG_TABLE.pagination.pageFilter.filtersOptions.storeOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>

                          </el-select>

                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
                        <el-form-item label="品牌 ：" prop="brand">
                          <i class="dialogIcon icon" @click="FG_advQuery_openBrand"></i>
                          <el-input v-model="FG_TABLE.pagination.pageFilter.filters.brand"></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12">
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
                :summary-method="FG_TABLE_getSummaries"
                show-summary
                :default-sort = "{prop: 'date', order: 'descending'}"
              >
                <el-table-column prop="" type="index" label="序号" width="70"></el-table-column>
                <el-table-column prop="store" label="门店"></el-table-column>

                <el-table-column prop="date" label="品牌编码" width="100" sortable></el-table-column>
                <el-table-column prop="ART_num" label="品牌"></el-table-column>
                <el-table-column prop="brand_name" label="采购数量" width="100"></el-table-column>
                <el-table-column prop="spec" label="采购金额" width="100"></el-table-column>
                <el-table-column prop="unit" label="采购赠送" width="100"></el-table-column>
                <el-table-column prop="income_num" label="退货数量" width="100"></el-table-column>

                <el-table-column prop="out_money" label="退货金额" width="100"></el-table-column>
                <el-table-column prop="out_num" label="退货赠送" width="100"></el-table-column>
                <el-table-column prop="" label="数量小计" width="100"></el-table-column>
                <el-table-column prop="" label="金额小计" show-overflow-tooltip></el-table-column>
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
              <store-query :storeQueryShow="FG_STOREQUERY.storeQueryShow" @on-show-change="showChange"
                           @on-get-value="getStoreName"></store-query>
              <brand-query :brandQueryShow="FG_BRANDQUERY.brandQueryShow" @on-show-change="showBrandChange"
                           @on-get-value="getBrandName"></brand-query>


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
  import StoreQuery from '@/components/compos/query/storeQuery.vue'
  import BrandQuery from '@/components/compos/query/brandQuery.vue'
  export default {
    components: {
      advQuery,
      StoreQuery,
      BrandQuery
    },
    data (){
      return {

        merchantID: 888888,
        FG_TABLE: {
          data: [
            {
              order: "001",
              store: "北京",
              month: "2017-02",
              date: "2017-02-05",
              //货号
              ART_num: "525",
              brand_name: "手机",
              spec: "小",
              unit: "17px",
              income_num: "1234",
              income_money: "144",
              out_num: "23",
              out_money: "1555",
              kind: "电器",
              brand: "iphone"

            }, {
              order: "005",
              store: "天津",
              month: "2017-06",
              date: "2017-02-04",
              //货号
              ART_num: "2323",
              brand_name: "手机",
              spec: "小",
              unit: "",
              income_num: "1234",
              income_money: "144",
              out_num: "23",
              out_money: "1555",
              kind: "电器",
              brand: "iphone"
            }, {
              order: "002",
              store: "北京",
              month: "",
              date: "2017-02-07",
              //货号
              ART_num: "525",
              brand_name: "手机",
              spec: "小",
              unit: "",
              income_num: "1234",
              income_money: "144",
              out_num: "23",
              out_money: "1555",
              kind: "电器",
              brand: "iphone"
            }, {
              order: "003",
              store: "北京",
              month: "",
              date: "2017-02-03",
              //货号
              ART_num: "525",
              brand_name: "手机",
              spec: "小",
              unit: "",
              income_num: "1234",
              income_money: "144",
              out_num: "23",
              out_money: "1555",
              kind: "电器",
              brand: "iphone"
            },
            {
              order: "004",
              store: "北京",
              month: "",
              date: "2017-02-08",
              //货号
              ART_num: "525",
              brand_name: "手机",
              spec: "小",
              unit: "",
              income_num: "1234",
              income_money: "144",
              out_num: "23",
              out_money: "1555",
              kind: "电器",
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
                store: "",
//                goodsNum: "",// 货号
//                category:"",
//                categoryType:'',
                brand:"",
//                brandName: "",
//                moneyStart: "",// 金额
//                moneyEnd: "",
//                moneySubtotalStart: "", // 金额小计
//                moneySubtotalEnd: "",
//                numStart: '',
//                numEnd: "",
              },
              filtersOptions: {
                pickerOptionsEnd:{
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
                categoryTypeOptions:[
                  {value : 0 , label : "大类汇总"},
                  {value : 1 , label : "中类汇总"},
                  {value : 2 , label : "小类汇总"},
                ]
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

        FG_STOREQUERY: {
          storeQueryShow: false,
        },
        FG_BRANDQUERY: {
          brandQueryShow: false,
        }

      }
    },
    created(){
//      this.FG_TABLE_initData()
    },
    methods: {
      showChange(val){
        this.FG_STOREQUERY.storeQueryShow = val;
      },
      showBrandChange(val){
        this.FG_BRANDQUERY.brandQueryShow = val;
      },
      getStoreName(val){
        console.log(val)
        this.FG_TABLE.pagination.pageFilter.filters.store = val.value
      },
      getBrandName(val){
        this.FG_TABLE.pagination.pageFilter.filters.brand = val.label
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
      FG_TABLE_showRefeshTable: function () {
        this.FG_TABLE_refreshData({page: this.FG_TABLE.pagination.pageFilter.info.currentPage})
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
            type: 'warning',
            message: '请填写搜索的内容'
          })
          return false
        }
        if (!isNaN(this.FG_TABLE.pagination.pageFilter.searchContent)) {
          options = {code: this.FG_TABLE.pagination.pageFilter.searchContent}
        } else {
          options = {name: this.FG_TABLE.pagination.pageFilter.searchContent}
        }
        let params = this.FG_TABLE_getParams(options)
        this.FG_TABLE_refreshData(params)
      },
      FG_TABLE_Print: function () {
        alert("打印")
      },
      FG_TABLE_Export: function () {
        alert("导出")
      },
      FG_TABLE_getSummaries(param) {
        const {columns, data} = param;
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

      FG_pagination_reset: function () {
        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
        }
      },

      // 高级查询 确定
      FG_advQuery_submitForm: function (formName) {
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
      FG_advQuery_resetForm: function (formName) {
        this.$refs[formName].resetFields();
      },

      FG_advQuery_openStore: function () {
        this.FG_STOREQUERY.storeQueryShow = true;
      },
      FG_advQuery_openBrand(){
        console.log(1)
        this.FG_BRANDQUERY.brandQueryShow = true;
      }

    },
    mounted() {

    }
  }
</script>



<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/comm";

</style>

