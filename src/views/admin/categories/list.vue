<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div class="container-left">
        <nav class="content-left">
          <leftmenu></leftmenu>
        </nav>
      </div>

      <div class="container-right">
        <div class="content-right">
          <el-row :span="24" class="fg-content-title">
            商品管理 - 分类管理
          </el-row>
          <el-row :span="24" class="fg-content-detail">

            <el-row :span="24" class="fg-content-opr">
              <el-button :plain="true" type="primary" size="" @click="newAdd"><i class="fa fa-plus"></i> 新增</el-button>
              <el-button :plain="true" type="primary" size="" @click="editTableRow"><i class="fa fa-edit"></i> 编辑
              </el-button>
              <el-button :plain="true" type="danger" size="" @click="deleteRow"><i class="fa fa-remove"></i> 删除
              </el-button>
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

            </el-row>

            <el-table
              ref="multipleTable"
              :data="tableDate"
              border
              tooltip-effect="dark"
              style="width: 100%"
              v-loading="loadingState"
              :element-loading-text="loadingText"
              class="fg-content-table"
              @selection-change="handleSelectionChange"
              @row-dblclick="handrowdbclick"
            >
              <el-table-column
                type="selection"
                width="90"><span style="position: relative;
        top: -6px;">全选</span>
              </el-table-column>
              <el-table-column
                prop="id"
                label="序号"
                sortable
                width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                label="产品名称"
                sortable
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="brand_id"
                label="品牌"
                sortable
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="base_price"
                label="基本价"
                sortable
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="market_price"
                label="市场价"
                sortable
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="created_at"
                label="添加时间"
                sortable
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="updated_at"
                label="修改时间"
                sortable
                show-overflow-tooltip>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </el-row>

          <!-- Form -->
          <!-- 编辑表格记录 -->
          <el-dialog title="编辑表格记录" :visible.sync="editRow.is_show">
            <el-form ref="editFrom" :model="editRow.data" label-width="80px" :rules="editRow.rules">
              <el-form-item label="产品名称" prop="name">
                <el-input v-model="editRow.data.name"></el-input>
              </el-form-item>
              <el-form-item label="基础价格" prop="base_price">
                <el-input v-model="editRow.data.base_price"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editRow.is_show = false">取 消</el-button>
              <el-button type="primary" @click="onEditRowSubmit('editFrom')">更新</el-button>
            </div>
          </el-dialog>

          <!-- 增加数据记录 -->
          <template>
            <div class="newAdd">
              <el-dialog title="增加表格记录" :visible.sync="newAddRow.is_show">

                <el-form ref="addForm" :model="newAddRow.data" label-width="80px"
                         :rules="newAddRow.rules">
                  <el-form-item label="产品名称" prop="name">
                    <el-input v-model="newAddRow.data.name"></el-input>
                  </el-form-item>
                  <el-form-item label="品牌" prop="brand_id">
                    <el-input v-model="newAddRow.data.brand_id"></el-input>
                  </el-form-item>
                  <el-form-item label="基础价格" prop="base_price">
                    <el-input v-model="newAddRow.data.base_price"></el-input>
                  </el-form-item>
                  <el-form-item label="市场价格" prop="market_price">
                    <el-input v-model="newAddRow.data.market_price"></el-input>
                  </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                  <el-button @click="newAddRow.is_show = false">取 消</el-button>
                  <el-button type="primary" @click="onAddRowSubmit('addForm')">增加</el-button>

                </div>
              </el-dialog>

            </div>

          </template>
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

    </div>

  </div>
</template>


<style lang="scss" >

  @import "../../../assets/admin/css/main/param";

  .fg-table-type {
    @include table-container(240px, 10px)
  }
  .el-table{
    border-radius: 5px 5px 0 0
  }

  /* 控制表单*在右侧 */
  .el-form-item.is-required .el-form-item__label:before{
    content: '';
  }
  .el-form-item.is-required .el-form-item__label:after{
    content:'*';color:#ff4949;margin-left: 3px;
  }
  .el-dialog__header{
    padding: 10px 20px;
  }


</style>

<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import LeftMenu from './listLeftMenu.vue'
  import Rules from '@/assets/admin/resource/rules.js'
//  import Common from '@/assets/admin/resource/Common.js' // 调用一些通用方法

  export default {
    data: function () {
      return {
        restaurants: [],
        searchConment: '',// 搜索关键字/id
        timeout:  null,

        tableDate: [],
        multipleSelection: [],
        dialogVisible: false,

        loadingState: false,//
        loadingText: '拼命加载中',
        tips: '',
        rules: '',
        pageFilter:{
          orders:[{
            name:'productName',
            order:'desc'
          }],
          pagination:{
            currentPageNum:0,
            recordTotal:'',
            recordPerPage:'',
          },
          filters:[{
            name:'productName',
            value:'苹果'
          }]
        },
        messageTips: {
          type: '',
          message: ''
        },
        editRow: {
          name: 'editInfoForm',
          is_show: false,
          is_remote_data: true, //编辑时是否需要重新获取数据
          data: {
            id: '',
            name: '',
            brand_id: '',
            good_id : '',
            shop_id : '',
            market_price: '',
            base_price: '',
            shop_price: '',
            warn_stock : '',
            product_unit_id :'',
            is_on_sale : '',
            is_best : '',
            is_new : '',
            is_hot : '',
            is_rec : '',
            status : '',
            created_at: '',
            updated_at : ''
          },
          rules: Rules.fromEditShopMaRule
        },
        newAddRow: {
          name: 'newAddInfoForm',
          is_show: false,
          is_remote_data: true,
          data: {
            id: '',
            name: '',
            brand_id: '',
            good_id : '',
            shop_id : '',
            market_price: '',
            base_price: '',
            shop_price: '',
            warn_stock : '',
            product_unit_id :'',
            is_on_sale : '',
            is_best : '',
            is_new : '',
            is_hot : '',
            is_rec : '',
            status : '',
            created_at: '',
            updated_at : ''
          },
          rules: Rules.fromAddShopMaRule
        },
        pagination: {
          currentPageNum: '',
          recordTotal: '',
          recordPerPage: '',
        }
      }
    },
    created: function () {

      this.initTableData()


    },
    methods: {

      initTableData: function () {
//        this.$resource("/api/runRedLight").get().then((response) => {
////          console.log(response)
//          this.tableDate = response.body.data;
//          this.loading1 = false;
//        }).catch((response) =>{
//          this.loading1 = false;
//          console.log(response)
//        })
//        console.log(Action.Product.list)

//        let that = this;
//        this.$http(this.$_.merge({}, Action.Product.list, {})).then(response => {
//          this.tableDate = response.body;
//          this.loading1 = false;
//          this.tableDate = res.body.data;
//          this.messageTips.type ="success";
//          this.messageTips.message = "数据加载成功"
//          Common.openMessage(this)
//        }, response => {
////          setTimeout(function () {
////            that.loading1 =false
////          },3000)
//          this.loading1 = false;
//          this.messageTips.type ="error";
//          this.messageTips.message = "数据加载失败"
//          Common.openMessage(this)
//
//        })





        this.loadingState = true
        this.loadingText = '正在加载中，请稍后'
        this.$http({
          method : "GET",
          url : "http://192.1.17.77:8099/api/merchant/commodity/category/page?status=1"
        }).then(function (response) {
          this.loadingState = false
          console.log(response)
        },function (response) {
          this.loadingState = false;
          this.messageTips.type = 'error'
          this.messageTips.message = '数据加载失败'
          Helper.COMMON.openMessage(this)
          console.log(response)
        })

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
//      新增提交
      onAddRowSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交

            this.tips = '确认增加数据'
            this.$confirm(this.tips).then(_ => {
              this.newAddRow.is_show = false
              this.loadingState = true
              this.loadingText = '正在添加数据，请稍后'
              this.newAddRow.data.created_at = new Date().toLocaleString()
              console.log(this.newAddRow.data)
              this.$http({
                method: "POST",
                url: "http://192.1.17.77:8099/api/merchant/commodity/category/saveOrUpdate",
                data: this.newAddRow.data
              }).then(function (data) {
                //成功
                this.loadingState = false
                this.newAddRow.data.name = ''
                this.newAddRow.data.brand_id = ''
                this.newAddRow.data.base_price = ''
                this.newAddRow.data.market_price = ''

                this.messageTips.type = 'success'
                this.messageTips.message = '数据添加成功';
                Helper.COMMON.openMessage(this)
              }, function (error) {
                //失败
                this.loadingState = false;
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
              this.loadingState = true
              this.loadingText = '正在删除数据在，请稍后'

              this.$http({
                method: Action.Form.update.method,
                url: Action.Form.update.url,
                data: deleteId
              }).then(function (data) {
                this.loadingState = false
                this.messageTips.type = 'success'
                this.messageTips.message = '数据已成功删除'
                Helper.COMMON.openMessage(this)
              }, function (error) {
                this.loadingState = false
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
          Common.openMessage(this)
        }
      },

      //编辑
      editTableRow: function () {
        console.log(Helper)
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

//          console.log(this.multipleSelection[0].name)
          this.editRow.data.name = this.multipleSelection[0].name
          this.editRow.data.base_price = this.multipleSelection[0].base_price
          this.editRow.is_show = true

        } else {
          this.messageTips.type = 'warning'
          this.messageTips.message = '请选择一项数据'
          Helper.COMMON.openMessage(this)
        }
      },

//      更新
      onEditRowSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交
            this.editRow.data.updated_at = new Date().toLocaleString()
            this.tips = '确认修改数据'
            this.$confirm(this.tips)
              .then(_ => {
                this.editRow.is_show = false
                this.loadingState = true
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
                  this.loadingState = false
                  this.initTableData();
                  this.messageTips.type = 'success'
                  this.messageTips.message = '数据修改成功'
                  Helper.COMMON.openMessage(this)
                }, function (error) {
                  this.loadingState = false;
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
      // 搜索点击事件
      handleSearch: function () {
        if(Helper.COMMON.isRequest(this) == false){ return};// 判断请求中
        if (this.searchConment == '') {
          this.messageTips.type = 'warning'
          this.messageTips.message = '请填写搜索的内容'
          Helper.COMMON.openMessage(this)
        } else {
          this.loadingState = true
          this.loadingText = '正在搜索中，请稍后'
          console.log(this.searchConment);
          this.$http({
            method: Action.Category.list.method,
            url: Action.Category.list.url,
            data: {searId: this.searchConment}
          }).then(function (data) {
            this.loadingState = false
            this.messageTips.type = 'success'
            this.messageTips.message = '搜索成功'
            Helper.COMMON.openMessage(this)
          }, function (error) {
            this.loadingState = false
            this.messageTips.type = 'error'
            this.messageTips.message = '搜索失败'
            Helper.COMMON.openMessage(this)
          })
        }
      },
      // 搜索回车事件
      searchSubmit: function () {
        this.handleSearch()
      }

    },
    mounted() {
      this.$resource("/api/runRedLight").get().then((response) => {
        var data = response.body.data;
        for(var i = 0; i< data.length; i++){
          data[i]["value"] = data[i].name;
        }
        this.restaurants = data;
      }).catch((response) =>{

      })

    },
    components: {
      'leftmenu': LeftMenu
    }
  }
</script>
