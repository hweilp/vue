<template>
  <div id="main" class="fg-table-type" role="main">
    <div class="container">
      <div class="content">
        <el-row :span="24" class="fg-content-title">
          促销计划 - 编辑
        </el-row>
        <el-row :span="24" class="fg-content-detail">
          <el-row :span="24" class="fg-content-opr">
            <el-button :plain="true" type="primary" size="" ><i
              class="fa fa-plus"></i> 新增
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showSaveTable"><i
              class="fa fa-floppy-o"></i> 保存
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showSaveTable"><i
              class="fa fa-check-square-o"></i> 审核
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showSaveTable"><i
              class="fa fa-list-alt"></i> 选择商品
            </el-button>
            <el-button :plain="true" type="danger" size="" @click="FG_TABLE_showSaveTable"><i
              class="fa fa-times"></i> 删单
            </el-button>
            <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showSaveTable"><i
              class="fa fa-print"></i> 打印
            </el-button>
            <!--<router-link to="/salesPromotion/plan" style="margin-left: 10px">-->
            <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showBackTable"><i
              class="fa fa-floppy-o"></i> 返回
            </el-button>
            <!--</router-link>-->
          </el-row>
          <div class="advQueryPanel">


            <el-form :model="FG_TABLE.addRow.data" class="demo-form-inline" label-width="100px"
                     ref="salesPlanForm" >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="业务单号 ：" prop="oddNum">
                    <el-input v-model="FG_TABLE.addRow.data.oddNum" placeholder="业务单号" disabled=""></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="促销名称 ：" prop="name">
                    <el-input v-model="FG_TABLE.addRow.data.name" placeholder="最大长度为64位"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="促销门店 ：" prop="store" style="position: relative">
                    <i class="fa fa-ellipsis-h icon" @click="FG_advQuery_openStore"></i>
                    <el-select v-model="FG_TABLE.addRow.data.store" placeholder="总部" style="width: 360px">

                      <el-option
                        v-for="item in FG_TABLE.addRow.storeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>

                    </el-select>

                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="促销模式 ：" prop="salesType">
                    <el-select v-model="FG_TABLE.addRow.data.salesType" placeholder="直接折扣" style="width: 360px">

                      <el-option
                        v-for="item in FG_TABLE.addRow.descOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>

                    </el-select>

                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="会员类别 ：" prop="VIPType">
                    <i class="fa fa-ellipsis-h icon" @click="FG_advQuery_openStore"></i>
                    <el-select v-model="FG_TABLE.addRow.data.VIPType" placeholder="总部" style="width: 360px">

                      <el-option
                        v-for="item in FG_TABLE.addRow.VIPTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>

                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="日期时间 ：" prop="dateTime">
                    <div class="block">

                      <el-date-picker
                        style="width: 360px;"
                        v-model="FG_TABLE.addRow.data.dateTime"
                        type="datetimerange"
                        :picker-options="FG_TABLE.addRow.pickerOptions"
                        placeholder="选择时间范围"
                        align="right">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="备注 ：" prop="remark">
                    <el-input v-model="FG_TABLE.addRow.data.remark" type="textarea" :rows="2" autosize placeholder="最大长度为64位" style="width: 360px;"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="每周生效 ：" prop="weekDay">
                    <el-checkbox-group v-model="FG_TABLE.addRow.data.weekDay">
                      <el-checkbox v-for="item in FG_TABLE.addRow.weekDayOptions" :label="item.value" :key="item.value" name="type">
                        {{item.label}}
                      </el-checkbox >
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>


              </el-row>


            </el-form>
          </div>
          <el-table
            :data="FG_TABLE.data"
            border
            show-summary
            :summary-method="getSummaries"

            :default-sort = "{prop: 'index', order: 'descending'}"
          >
            <el-table-column
              prop="index"
              label="序号"
              sortable
              width="90">
            </el-table-column>

            <el-table-column
              label="货号"
              width="170">
              <template scope="scope">
                <p>
                  {{ scope.row.ART_num }}
                  <i @click="FG_TABLE_handleCellClick(scope.$index, scope.row)" class="fa fa-ellipsis-h"></i>
                </p>
              </template>

            </el-table-column>
            <el-table-column
              prop="brand_name"
              label="品名"  >
            </el-table-column>
            <el-table-column
              prop="income_money"
              label="原价" >
            </el-table-column>
            <el-table-column
              prop="out_num"
              label="会员价">
            </el-table-column>
            <el-table-column
              prop="out_money"
              label="特价" >
            </el-table-column>
            <el-table-column
              prop=""
              label="促销状态"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-button :plain="true" type="primary" size="small" @click="FG_TABLE_handleEdit(scope.$index, scope.row)"> 增加
                </el-button>
                <el-button :plain="true" type="danger" size="small" @click="FG_TABLE_handleDelete(scope.$index, scope.row)"> 删除
                </el-button>

              </template>
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
          <el-form style="margin-top: 10px;">
            <el-row >
              <el-col :span="6">
                <el-form-item label="制单人员：" prop="docMakerName">
                  <el-input v-model="FG_TABLE.addRow.data.docMakerName" placeholder="制单人员" style="width: 200px;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="制单日期：" prop="docMakerDate">
                  <div class="block">
                    <el-date-picker
                      v-model="FG_TABLE.addRow.data.docMakerDate"
                      type="date"
                      placeholder="制单日期"
                      :picker-options="FG_TABLE.addRow.pickerOptionsDisabled">
                    </el-date-picker>
                  </div>

                  <!--<el-input v-model="FG_TABLE.addRow.data.docMakerDate" placeholder="制单日期" style="width: 200px;"></el-input>-->
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="审核人员：" prop="auditorName">
                  <el-input v-model="FG_TABLE.addRow.data.auditorName" placeholder="审核人员" style="width: 200px;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="审核日期：" prop="auditorDate">
                  <div class="block">
                    <el-date-picker
                      v-model="FG_TABLE.addRow.data.auditorDate"
                      type="date"
                      placeholder="制单日期"
                      :picker-options="FG_TABLE.addRow.pickerOptionsDisabled">
                    </el-date-picker>
                  </div>
                  <!--<el-input v-model="FG_TABLE.addRow.data.auditorDate" placeholder="审核日期" style="width: 200px;"></el-input>-->
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>



          <product-select
            :default-select-type="1"
            :productSelectVisible.sync="FG_TABLE.productSelectShow"
            @dialogShowStatusChange="changeProductSelectShowStatus" >

          </product-select>
          <store-query :storeQueryShow="FG_STOREQUERY.storeQueryShow" @on-show-change="showChange"
                       @on-get-value="getStoreName"></store-query>


        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  import ProductSelect from '@/components/compos/product/product-select.vue'
  import StoreQuery from '@/components/compos/query/storeQuery.vue'
  export default {
    components:{
      ProductSelect,
      StoreQuery
    },
    data(){
      return{
        FG_TABLE:{


          name:"",
          productSelectShow:false,

          addRow: {
            name: 'addForm',
            menuData: {},
            data: {
              oddNum:'',
              name:"",
              store:0,
              salesType:0,
              VIPType:0,
              dateTime:"",
              remark:"",
              weekDay:[],
              docMakerName:'管理员',
              docMakerDate:new Date().toLocaleDateString(),
              auditorName:'',
              auditorDate:new Date().toLocaleDateString(),
            },
            rules:"",
            storeOptions: [
              {value: 0, label: "总部"},
              {value: 1, label: "上海分部"},
              {value: 2, label: "杭州分部"},
              {value: 3, label: "广州分部"}
            ],
            descOptions:[
              {value: 0, label: "直接折扣"},
              {value: 1, label: "间接折扣"},
            ],
            VIPTypeOptions:[
              {value: 0, label: "不做限制"},
              {value: 1, label: "所有会员"},
              {value: 2, label: "非会员"},
              {value: 3, label: "超级会员"},
              {value: 4, label: "二级会员"},
              {value: 5, label: "三级会员"},
            ],
            weekDayOptions:[
//              "日","一","二","三","四","五","六",
              {value: 0, label: "日"},
              {value: 1, label: "一"},
              {value: 2, label: "二"},
              {value: 3, label: "三"},
              {value: 4, label: "四"},
              {value: 5, label: "五"},
              {value: 6, label: "六"},
            ],
            pickerOptions: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            pickerOptionsDisabled: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
          },
          data :[
            {
              index:"1",
              order: "001",
              store: "北京",
              month: "2017-02",
              date: "2017-02-05",
              //货号
              ART_num: "52-25",
              brand_name: "手机",
              spec: "小",
              unit: "17px",
              income_num: "1234",
              income_money: "144",
              out_num: "23",
              out_money: "1555",
              kind: "电器",
              brand: "iphone"

            },
            {
              index:"2",
              order: "005",
              store: "天津",
              month: "2017-06",
              date: "2017-02-04",
              //货号
              ART_num: "23-23",
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
          ],
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
        FG_STOREQUERY: {
          storeQueryShow: false,
        },

      }
    },
    created(){
      this.FG_TABLE.addRow.data.oddNum = this.$route.query.id
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
//      opr
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
      // 刷新

      FG_TABLE_showRefeshTable : function () {
        this.FG_TABLE_refreshData({page:this.FG_TABLE.pagination.pageFilter.info.currentPage})
      },
      // 打印
      FG_TABLE_Print:function () {
        alert("打印")
      },
      // 导出
      FG_TABLE_Export:function(){
        alert("导出")
      },
      // 返回
      FG_TABLE_showBackTable(){
        this.$router.go(-1)
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




      FG_TABLE_handleCellClick(index,row){
        this.FG_TABLE.productSelectShow = true
        console.log(index)
        console.log(row)
      },
      FG_TABLE_showSaveTable(){
        console.log(this.FG_TABLE.addRow.data)

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
            sums[index] = '';
          }
        });

        return sums;
      },
      FG_TABLE_handleEdit(index,row){
        console.log(index)
        console.log(row)
      },
      FG_TABLE_handleDelete(index,row){
        console.log(index)
        console.log(row)
      },
      FG_advQuery_openStore(){
        this.FG_STOREQUERY.storeQueryShow = true;
      },

//      组件传值
      changeProductSelectShowStatus: function (val) {
        this.FG_TABLE.productSelectShow = val
      },
      showChange(val){
        this.FG_STOREQUERY.storeQueryShow = val;
      },
      getStoreName(val){
        console.log(val)
        this.FG_TABLE.addRow.data.store = val.value
      },
    },
    mounted(){

    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/comm";
  .el-table .cell p{
    position: relative;
    i{
      position: absolute;
      right:0;
      top:5px;
      margin: auto;
      cursor: pointer;
    }

  }
</style>
