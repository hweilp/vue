<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="stockMonthCollect">

        <div class="container">
          <div class="content">
            <el-row :span="24" class="fg-content-title">
              库存查询 - 出入库月明细
            </el-row>
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
                <adv-query left="left:555px" :data="FG_QUERYDATA"></adv-query>


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
                :summary-method="getSummaries"
                :default-sort = "{prop: 'date', order: 'descending'}"
              >
                <el-table-column prop="" type="index" label="序号" width="70"></el-table-column>
                <el-table-column prop="store" label="门店"></el-table-column>
                <el-table-column prop="month" label="月份" sortable></el-table-column>
                <el-table-column prop="" label="货号"></el-table-column>
                <el-table-column prop="" label="品名"></el-table-column>
                <el-table-column prop="spec" label="规格"></el-table-column>
                <el-table-column prop="unit" label="单位"></el-table-column>
                <el-table-column prop="" label="进项数量" width="100"></el-table-column>
                <el-table-column prop="" label="进项金额" width="100"></el-table-column>
                <el-table-column prop="" label="出项数量" width="100"></el-table-column>
                <el-table-column prop="" label="出项金额" width="100"></el-table-column>
                <el-table-column prop="kind" label="类别"></el-table-column>
                <el-table-column prop="brand" label="品牌" show-overflow-tooltip></el-table-column>

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
  export default {
    components:{
      advQuery
    },
    data (){
      return {
        // 控制高级查询条目显现
        FG_QUERYDATA:{
          isShow:false,
          month:true,
//          date: true,
//          dateType:true,
          store : true,
//          typeOfService:true,
//          oddNumber:true,
//          supplier:true,
          brand:true,
          category:true,
          brandName:true,
          moneyGroup:true,
//          auditState : true,
//          operator:true,
//          $_Function:true,
//          module:true,
          goodsNum:true,
//          numberTotalGroup:true,
//          moneySubtotalGroup:true,
//          documentType:true,
//          categoryType:true,
//          outInStockType:true,
//          stockStatus:true,
//          validShop:true,
        },
        FG_TABLE: {
          data: [
            {
              order:"001",
              store:"北京",
              month: "2017-02",
              date: "2017-02-04",
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

              stock_num: "",
              costPrice: "",
              costAmount:"",
              supplier: "",

              bill_num: "520",
              business_type: "网购",
              business_date: "12-24",
              price: "22",
              moneySum: "3649",
              remark: "无",

              brand: "iphone"

            },{
              order:"005",
              store:"天津",
              month: "2017-04",
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

              stock_num: "",
              costPrice: "",
              costAmount:"",
              supplier: "",

              bill_num: "520",
              business_type: "网购",
              business_date: "12-24",
              price: "22",
              moneySum: "3649",
              remark: "无",

              brand: "iphone"
            },{
              order:"002",
              store:"北京",
              month: "",
              date: "2017-02-04",
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

              stock_num: "",
              costPrice: "",
              costAmount:"",
              supplier: "",

              bill_num: "520",
              business_type: "网购",
              business_date: "12-24",
              price: "22",
              moneySum: "3649",
              remark: "无",

              brand: "iphone"
            },{
              order:"003",
              store:"北京",
              month: "",
              date: "2017-02-04",
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

              stock_num: "",
              costPrice: "",
              costAmount:"",
              supplier: "",

              bill_num: "520",
              business_type: "网购",
              business_date: "12-24",
              price: "22",
              moneySum: "3649",
              remark: "无",

              brand: "iphone"
            },
            {
              order:"004",
              store:"北京",
              month: "",
              date: "2017-02-04",
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

              stock_num: "",
              costPrice: "",
              costAmount:"",
              supplier: "",

              bill_num: "520",
              business_type: "网购",
              business_date: "12-24",
              price: "22",
              moneySum: "3649",
              remark: "无",

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
        FG_QUERY: {
          isActive: false,
          is_show: false,
          name: "advQueryForm",
          data: {
            month: '',
            store: '',
            brandName: "",
            numStart: "",
            numEnd: "",
            dateStart: "",
            dateEnd: "",
            dateType: 4,
            goodsNum: "",
            moneyStart: "",
            moneyAmountEnd: "",
            amountStart: "",
            amountEnd: "",
            category: '',
            categoryType: "",
            brand: "",
            oddNumber: "",
            documentType: 2,
            supplier: "",
            stockStatus:0,
            validShop:false
          },
          rules:Rules.System.Staff.addForm,
          // 日期限制
          pickerOptionsEnd: {
            disabledDate: (time) => {
              let beginDateVal = this.FG_QUERY.data.dateStart;
              if (beginDateVal) {
                return time.getTime() < beginDateVal;
              }
            }
          },
//          日期类型
          dateTypeOptions: [
            {value : 0 , label : "今日"},
            {value : 1 , label : "昨天"},
            {value : 2 , label : "本周"},
            {value : 3 , label : "上周"},
            {value : 4 , label : "本月"},
            {value : 5 , label : "上月"},
          ],
          // 单据类型
          documentTypeOptions:[
            {value : 0 , label : "采购收货单"},
            {value : 1 , label : "采购退货单"},
            {value : 2 , label : "全部"},
          ],
//          库存状态
          stockStatusOptions:[
            {value : 0 , label : "满库存"},
            {value : 1 , label : "库存不足"},
          ]

        },
//        FG_STOREQUERY: {
//          title1: "门店管理-查询",
//          name: "storeCheck",
//          storeCheckRow: {
//            name: "storeCheckForm",
//            is_show: false,
//            data: {
//              ART_num: ''
//            },
//            rules: Rules.storeCheck
//          },
//          storeOptions: [
//            {value: 0, label: "总部"},
//            {value: 1, label: "上海分部"},
//            {value: 2, label: "杭州分部"},
//            {value: 3, label: "广州分部"}
//
//          ],
//          tabData: [
//            {
//              code: "0323",
//              store_name: "北京"
//            },
//            {
//              code: "0323",
//              store_name: "北京"
//            },
//            {
//              code: "0323",
//              store_name: "北京"
//            },
//            {
//              code: "0323",
//              store_name: "北京"
//            }
//          ]
//        },

      }
    },
    created(){
//      this.FG_TABLE_initData()
    },
    methods : {
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
      FG_TABLE_showRefeshTable : function () {
        this.FG_TABLE_refreshData({page:this.FG_TABLE.pagination.pageFilter.info.currentPage})
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

      FG_TABLE_Print:function () {
        alert("打印")
      },
      FG_TABLE_Export(){
        alert("导出")
      },
      FG_pagination_reset: function () {
        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
        }
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
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

//      FG_QUERY_ToShow:function () {
//        if(this.FG_QUERY.is_show === false){
//          this.FG_QUERY.is_show = true;
//          this.FG_QUERY.isActive = true;
//        }else{
//          this.FG_QUERY.is_show = false;
//          this.FG_QUERY.isActive = false;
//        }
//
//      },
//      FG_QUERY_slideUp:function () {
//        this.FG_QUERY.is_show= false;
//        this.FG_QUERY.isActive= false;
//      },
//      FG_QUERY_handleSubmitForm:function (formName) {
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            console.log(this.FG_QUERY.data);
//
//            alert('submit!');
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
//      },
//      FG_QUERY_handleResetForm:function (formName) {
//        this.$refs[formName].resetFields();
//      },

//      FG_STOREQUERY_openStore: function () {
//        this.FG_STOREQUERY.storeCheckRow.is_show = true;
//      },
//      FG_STOREQUERY_storeCheckRowSumbit:function(){
//        console.log(this.FG_STOREQUERY.storeCheckRow)
//      }


    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>

</style>


