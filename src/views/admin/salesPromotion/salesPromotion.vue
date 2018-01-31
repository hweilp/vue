<template>
  <div id="salesPromotion" class="contentPadding">

    <div class="contentTop">
      <div class="kindName">{{kindTitle}}</div>
    </div>
    <div class="contentMain">

      <div class="operation">
          <router-link to="/salesPromotion/add"> <el-button :plain="true" type="primary" size="" @click="newAdd"><i class="fa fa-print"></i> 新增</el-button></router-link>
          <el-button :plain="true" type="primary" size="" @click="refush"><i class="fa fa-refresh"></i> 刷新</el-button>

          <!-- 搜索自动完成  -->
          <el-autocomplete
            v-model="searchConment"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            icon="search"
            :on-icon-click="handleSearch"
            @keyup.enter.native="searchSubmit"
            @select="handleSelect"
            autofocus
          ></el-autocomplete>


      </div>
      <div class="advQuery" @click="toshow" v-bind:class="{active1:isActive}">高级查询<i class="fa fa-sort-desc" aria-hidden="true"></i></div>
      <div class="advQueryArea entrySearch" v-if="is_show">
        <el-form ref="advQueryForm" :model="advQueryForm" label-width="90px">
          <el-form-item label="日期 ：" required>
            <div class="money">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择起始日期" v-model="advQueryForm.date1"></el-date-picker>
              </el-form-item>
              <i class="fa fa-minus moneyIcon"></i>
              <el-form-item prop="date2">
                <el-date-picker type="date" placeholder="选择日期" v-model="advQueryForm.date2"></el-date-picker>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="" prop="dateType">
            <el-radio-group v-model="advQueryForm.dateType">
              <el-radio label="今日"></el-radio>
              <el-radio label="昨天"></el-radio>
              <el-radio label="本周"></el-radio>
              <el-radio label="本月"></el-radio>
              <el-radio label="上月"></el-radio>
            </el-radio-group>
          </el-form-item>



          <el-form-item label="经手人："  prop="operator_name">
            <el-input v-model="advQueryForm.operator_name" ></el-input>
          </el-form-item>
          <el-form-item label="单号："  prop="oddNum">
            <el-input v-model="advQueryForm.oddNum" ></el-input>
          </el-form-item>
          <el-form-item label="金额："  prop="money">
            <el-input v-model="advQueryForm.money" ></el-input>
          </el-form-item>
          <el-form-item label="审核状态：" style="margin-left: 20px" prop="state">
            <el-radio-group v-model="advQueryForm.state">
              <el-radio label="未审核"></el-radio>
              <el-radio label="已审核"></el-radio>
              <el-radio label="全部"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('advQueryForm')">确定</el-button>
            <el-button @click="resetForm('advQueryForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="slideUp"><span @click="slideUp">收起 <i class="fa fa-angle-double-up" aria-hidden="true"></i></span>
        </div>
      </div>


      <div class="">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          v-loading="loading2"
          :element-loading-text="loadingText"
          class="fg-content-table"
          @selection-change="handleSelectionChange"
          @row-dblclick="handrowdbclick"
          :default-sort = "{prop: 'date', order: 'descending'}"
        >
          <el-table-column
            type="selection"
            width="90"><span style="position: relative;
        top: -6px;">全选</span>
          </el-table-column>
          <el-table-column
            prop="order"
            label="序号"
            width="90"
            >
          </el-table-column>
          <el-table-column
            prop="code"
            label="业务单号"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="促销名称"
            width="100"
          >
          </el-table-column>

          <el-table-column
            prop="name"
            label="促销模式"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="状态" >
          </el-table-column>
          <el-table-column
            prop="name"
            label="开始日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="结束日期" >
          </el-table-column>


          <el-table-column
            prop="name"
            label="制单人员姓名" >
          </el-table-column>
          <el-table-column
            prop="name"
            label="制单日期" >
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核人员姓名" >
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核日期" >
          </el-table-column>


          <el-table-column
            prop="name"
            label="备注"
            show-overflow-tooltip>
          </el-table-column>


        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>



      </div>


      <!-- 确认提示框 -->
      <template>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          size="tiny"
          :before-close="handleClose">
          <span>{{tips}}</span>
          <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
        </el-dialog>
      </template>

    </div>

  </div>
</template>
<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/param";
  @import "../../../assets/admin/css/stockManage/stockComm";
  .fg-table-type {
    @include table-container(240px, 10px)
  }
</style>


<script>
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  export default {
    data (){
      return {
        advQueryForm: {
          date1: '',
          date2: '',
          date3: '',
          dateType: "",
          operator_name: '',
          oddNum: '',
          money: '',
          state: '',
          store: ""
        },
        is_show: false,
        isActive: false,
        kindTitle:"促销计划-列表",
        searchConment: "",
        restaurants:[],
        dialogVisible: false,
        loadingText: '拼命加载中',
        loading2: false,
        tips: '',
        rules: '',
        messageTips: {
          type: '',
          message: ''
        },
        multipleSelection: [],
        tableData:[
          {
            id: "01",
            order:"001",
            code:"2694",
            name: '王小虎',
            organ_type: "国企",
            role_type : "消费者",
            is_empower : "是"
          }, {
            id: "02",
            order:"001",
            code:"2694",
            name: '王小虎',
            organ_type: "国企",
            role_type : "消费者",
            is_empower : "是"
          }, {
            id: "03",
            order:"001",
            code:"2694",
            name: '王小虎',
            organ_type: "国企",
            role_type : "消费者",
            is_empower : "是"
          }, {
            id: "04",
            order:"001",
            code:"2694",
            name: '王小虎',
            organ_type: "国企",
            role_type : "消费者",
            is_empower : "是"
          }, {
            id: "05",
            order:"001",
            code:"2694",
            name: '王小虎',
            organ_type: "国企",
            role_type : "消费者",
            is_empower : "是"
          }
        ],
        editRow: {
          name: 'editInfoForm',
          is_show: false,
          is_remote_data: true, //编辑时是否需要重新获取数据
          data: {
            name : "",
            code : "",
            organ_type: "",
            role_type : "",
            is_empower : ""
          },
          rules:Rules.roleEdit
        },
        newAddRow: {
          name: 'newAddInfoForm',
          is_show: false,
          is_remote_data: true,
          data: {
            code : "",
            name : "",
            type : ""
          },
          rules: Rules.roleEdit
        },
        // 分页
        pagination: {
          currentPageNum: '',
          recordTotal: '',
          recordPerPage: '',
        },
      }
    },
    methods :{
      slideUp: function () {
        this.is_show = false
        this.isActive = false
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('高级查询!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      // 刷新
      refush:function  () {
        alert("刷新")
      },
      // 搜索
      handleSearch : function () {
        if(Helper.COMMON.isRequest(this) == false){ return};// 判断请求中
        if (this.searchConment == '') {
          this.messageTips.type = 'warning'
          this.messageTips.message = '请填写搜索的内容'
          Helper.COMMON.openMessage(this)
        } else {
          this.loading1 = true
          this.loadingText = '正在搜索中，请稍后'
          console.log(this.searchConment);
          this.$http({
            method: Action.Category.list.method,
            url: Action.Category.list.url,
            data: {searId: this.searchConment}
          }).then(function (data) {
            this.loading1 = false
            this.messageTips.type = 'success'
            this.messageTips.message = '搜索成功'
            Helper.COMMON.openMessage(this)
          }, function (error) {
            this.loading1 = false
            this.messageTips.type = 'error'
            this.messageTips.message = '搜索失败'
            Helper.COMMON.openMessage(this)
          })
        }
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 500 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
        this.handleSearch();
      },
      // 搜索回车事件
      searchSubmit: function () {
        this.handleSearch()
      },
      //高级查询
      toshow: function () {
        if (this.is_show == false) {
          this.is_show = true
          this.isActive = true
        } else {
          this.is_show = false
          this.isActive = false
        }

      },

      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },

      //当选择项发生变化时会触发该事件
      handleSelectionChange(val) {
        this.multipleSelection = val
      },

      // 新增
      newAdd: function () {
        if(Helper.COMMON.isRequest(this) == false){ return};// 判断请求中
        this.newAddRow.is_show = true
      },
      //新增保存
      onSaveRowSubmit : function () {
        if(Helper.COMMON.isRequest(this) == false){ return};
        alert("新增保存")
      },
//      新增提交
      onAddRowSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交

            this.tips = '确认增加数据'
            this.$confirm(this.tips).then(_ => {
              this.newAddRow.is_show = false
              this.loading1 = true
              this.loadingText = '正在添加数据，请稍后'
              this.newAddRow.data.created_at = new Date().toLocaleString()
              console.log(this.newAddRow.data)
              this.$http({
                method: Action.Form.add.method,
                url: Action.Form.add.url,
                data: this.newAddRow.data
              }).then(function (data) {
                //成功
                this.loading1 = false
                this.newAddRow.data.name = ''
                this.newAddRow.data.brand_id = ''
                this.newAddRow.data.base_price = ''
                this.newAddRow.data.market_price = ''

                this.messageTips.type = 'success'
                this.messageTips.message = '数据添加成功';
                Helper.COMMON.openMessage(this)
              }, function (error) {
                //失败
                this.loading1 = false;
                this.messageTips.type = 'error'
                this.messageTips.message = '数据添加失败';
                Helper.COMMON.openMessage(this)
              })

            }).catch(_ => {

            })

          } else {
            return false
          }
        })

      },

      // 删除
      deleteRow: function () {

        if(Helper.COMMON.isRequest(this) == false){ return};// 判断请求中

        if (this.multipleSelection.length > 0) {
          var deleteId = []
          for (var i in this.multipleSelection) {
            deleteId.push(this.multipleSelection[i].id)
          }
          console.log(deleteId)
          this.tips = '确认删除数据'

          this.$confirm(this.tips)
            .then(_ => {
              this.loading1 = true
              this.loadingText = '正在删除数据在，请稍后'

              this.$http({
                method: Action.Form.update.method,
                url: Action.Form.update.url,
                data: deleteId
              }).then(function (data) {
                this.loading1 = false
                this.messageTips.type = 'success'
                this.messageTips.message = '数据已成功删除'
                Helper.COMMON.openMessage(this)
              }, function (error) {
                this.loading1 = false
                this.messageTips.type = 'error'
                this.messageTips.message = '删除数据失败'
                Helper.COMMON.openMessage(this)
              })
            })
            .catch(_ => {
              return
            })

        } else {
          this.messageTips.type = 'warning'
          this.messageTips.message = '请至少选择一项数据'
          Helper.COMMON.openMessage(this)
        }
      },

      //编辑
      editTableRow: function () {
        if(Helper.COMMON.isRequest(this) == false){ return};// 判断请求中
        if (this.multipleSelection.length === 1) {
          let target = this.multipleSelection[0]
//
//          if (this.editRow.is_remote_data === true) {
//            // 请求
//            this.$http(this.$_.merge({}, Action.Product.get, {
//              url: Helper.FG.setParams(Action.Product.get.url, {id: target.id}),
//            })).then(response => {
//              Helper.FG.setValueToObject(this.editRow.data, response.body, true, this)
//            }, response => {
////              alert(response.body)
//            })
//
//          } else {
//            Helper.FG.setValueToObject(this.editRow.data, target, true, this)
//          }

          console.log(this.multipleSelection[0])
          this.editRow.data = this.multipleSelection[0]
          this.editRow.is_show = true

        } else {
          this.messageTips.type = 'warning'
          this.messageTips.message = '请选择一项数据'
          Helper.COMMON.openMessage(this)
        }
      },

      // 编辑提交
      onEditRowSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交
            this.editRow.data.updated_at = new Date().toLocaleString()
            this.tips = '确认修改数据'
            this.$confirm(this.tips)
              .then(_ => {
                this.editRow.is_show = false
                this.loading1 = true
                this.loadingText = '正在修改数据在，请稍后'
                console.log(this.multipleSelection)
                this.editRow.data.id = this.multipleSelection[0].id
                this.editRow.data.updated_at = new Date().toLocaleString()//修改时间记录
                console.log(this.editRow.data)
                this.$http({
                  method: Action.Product.update.method,
                  url: Action.Product.update.url,
                  data: this.editRow.data
                }).then(function (data) {
                  this.editRow.data.name = ''
                  this.editRow.data.base_price = ''
                  this.editRow.is_show = false
                  this.loading1 = false
                  this.initTableData();
                  this.messageTips.type = 'success'
                  this.messageTips.message = '数据修改成功'
                  Helper.COMMON.openMessage(this)
                }, function (error) {
                  this.loading1 = false;
                  this.messageTips.type = 'error'
                  this.messageTips.message = '数据修改失败'
                  Helper.COMMON.openMessage(this)
                })
//                this.$http(this.$_.merge({}, Action.Product.update, {
//                  url: Helper.FG.setParams(Action.Product.update.url, {id: this.editRow.data.id}),
//                  body: this.editRow.data
//                })).then(response => {
//                }, response => {
//                  alert(response.body)
//                })
              })
              .catch(_ => {})

          } else {
            return false
          }
        })
      },
      // 双击行
      handrowdbclick: function (row) {
        this.$refs.multipleTable.clearSelection()//清除所有的勾选
        this.$refs.multipleTable.toggleRowSelection(row, true)//勾选当前行
        this.editTableRow()
      },

      // 显示每页的数据条数改变
      handleSizeChange(val) {
        if(Helper.COMMON.isRequest(this) == false){ return};// 判断请求中
        console.log(val)
        this.pagination.currentPageNum = val
        this.pagination.recordTotal = ''
        this.pagination.recordPerPage = ''
        console.log(this.pagination)

        this.$http({
          method: '',
          url: '',
          data: this.pagination
        }).then(function (data) {

        }, function (error) {

        })

      },

//      页码发生改变
      handleCurrentChange(val) {
        if(Helper.COMMON.isRequest(this) == false){ return};// 判断请求中
        console.log(val)
        this.pagination.currentPageNum = ''
        this.pagination.recordTotal = ''
        this.pagination.recordPerPage = val
        console.log(this.pagination)
        this.$http({
          method: '',
          url: '',
          data: this.pagination
        }).then(function (data) {

        }, function (error) {

        })

      },

      // 是否打开确认提示框
      handleClose(done) {
        this.$confirm(this.tips)
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }

    },


    mounted() {
      this.$resource("/api/runRedLight").get().then((response) => {
        var data = response.body.data;
        for (var i = 0; i < data.length; i++) {
          data[i]["value"] = data[i].name;
        }
        this.restaurants = data;
      }).catch((response) => {

      })
    }

  }

</script>

