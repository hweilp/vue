<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div class="container-left">
        <nav class="content-left">
          <div class="leftMenu">
            <el-row :span="24" class="fg-content-title">
              <i class="fa fa-bookmark-o"></i><span style="margin-left: 10px">商品类目</span>
            </el-row>
            <div style="height: 5px;background: rgba(246, 246, 246, 1)"></div>
            <!--node-key="id" :default-expanded-keys="[1]"-->
            <el-tree :data="FG_MENU.data" style="height: 585px;overflow: auto;" node-key="id"
                     :default-expanded-keys="[0]" :props="{label:'name',children:'children'}" :highlight-current="true"
                     @node-click="FG_MENU_handleNodeClick"></el-tree>
          </div>
        </nav>
      </div>

      <div class="container-right">
        <div class="content-right">
          <el-row :span="24" class="fg-content-title">
            商品信息 - 列表
          </el-row>
          <el-row :span="24" class="fg-content-detail">
            <el-row :span="24" class="fg-content-opr">
              <router-link  v-if="power.indexOf(12111401) > -1 ? true : false"  to="/product/add" style="margin-right: 10px">
                <el-button :plain="true" type="primary" size=""><i
                  class="fa fa-plus"></i> 新增
                </el-button>
              </router-link>
              <!--  <router-link :to="{path:'/product/add',params:{pid:}}" style="margin-right: 10px">-->
              <el-button v-if="power.indexOf(12111402) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_TABLE_showEditRowForm"><i
                class="fa fa-edit"></i> 编辑
              </el-button>
              <!-- </router-link>-->
              <el-button v-if="power.indexOf(12111403) > -1 ? true : false"  :plain="true" type="danger" size="" @click="FG_TABLE_upShelf"><i
                class="fa fa-arrow-circle-up"></i> 上架
              </el-button>
              <el-button v-if="power.indexOf(12111404) > -1 ? true : false"  :plain="true" type="danger" size="" @click="FG_TABLE_downShelf"><i
                class="fa fa-arrow-circle-o-down"></i> 下架
              </el-button>
              <el-button :plain="true" type="primary" size="" @click="FG_TABLE_showRefeshTable"><i
                class="fa fa-refresh"></i> 刷新
              </el-button>
              <el-input
                class="fg-search-input"
                placeholder="可输入名称/编码进行查询"
                icon="search"
                v-model="FG_TABLE.pagination.pageFilter.searchContent"
                :on-icon-click="FG_TABLE_handleTableSearch"
                @keyup.enter.native="FG_TABLE_handleTableSearch">
              </el-input>
              <advQuery left="left:835px">
                <el-form ref="advQueryForm" :model="FG_advQueryForm" label-width="90px" :inline="true">
                  <el-row :span="24">
                    <el-form-item label="商品名称：" prop="name">
                      <el-input v-model="FG_advQueryForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品编码：" prop="pid">
                      <el-input v-model="FG_advQueryForm.pid"></el-input>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="供应商：" prop="sno">

                      <supplier-select :supplierSelected.sync="FG_advQueryForm.sno"></supplier-select>

                    </el-form-item>
                    <el-form-item label="性质：" prop="natureType">
                      <el-radio-group v-model="FG_advQueryForm.natureType">
                        <el-radio  label="">全部</el-radio>
                        <el-radio :label="10">热销</el-radio>
                        <el-radio :label="20">新款</el-radio>
                        <el-radio :label="30">促销</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24">
                    <el-form-item label="状态：" prop="staus">
                      <el-radio-group v-model="FG_advQueryForm.status">
                        <el-radio  label="">全部</el-radio>
                        <el-radio :label="10">待上架</el-radio>
                        <el-radio :label="20">已上架</el-radio>
                        <el-radio :label="30">已下架</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-row>
                  <el-row :span="24" style="padding-left: 90px">
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
              @row-dblclick="FG_TABLE_handleRowDoubleClick"
              :default-sort="{prop: 'index', order: 'descending'}"
            >
              <el-table-column
                type="selection"
                width="90"><span style="position: relative;
        top: -6px;">全选</span>
              </el-table-column>
              <el-table-column
                prop="id"
                label="序号"
                type="index"
                sortable
                width="70">
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品名称"
                sortable>
              </el-table-column>
              <el-table-column
                prop="pid"
                label="商品编码"
                sortable>
                <template scope="scope">
                  <p @click="handleEdit(scope.row.pno)"><span>{{scope.row.pid}}</span></p>
                </template>
              </el-table-column>
              <el-table-column
                prop="unitName"
                label="单位">
              </el-table-column>
              <el-table-column
                prop="buyingPrice"
                label="进货价">
              </el-table-column>
              <el-table-column
                prop="minPrice"
                label="最低价">
              </el-table-column>
              <el-table-column
                prop="memberPrice"
                label="会员价">
              </el-table-column>
              <el-table-column
                prop="statusStr"
                label="商品状态">
              </el-table-column>
              <el-table-column
                prop="natureTypeStr"
                label="性质">
              </el-table-column>
              <el-table-column
                prop="virtualSales"
                label="虚拟销量">
              </el-table-column>

              <!--<el-table-column-->
                <!--prop="statusStr"-->
                <!--label="上下架状态">-->
              <!--</el-table-column>-->
            </el-table>

            <!-- 分页 -->
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

  .fg-table-type {
    @include table-container(240px, 10px)
  }

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
  import supplierSelect from '@/components/compos/supplier/supplier-select'

  export default {
    data () {
      return {
        power:this.$store.state.User.power,
        FG_advQueryForm:{
          name: '',
          pid: '',
          sno: '',
          natureType: '',
          status: ''
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

        FG_MENU: {
          selected: {
            id: 0,
            parentId: 0,
            name: '所有类别',
          },
          data: [
            {
              id: 0,
              parentId: 0,
              name: '所有类别',
              children: [],
            }
          ]
        },

      }
    },
    created: function () {
      this.FG_MENU_initData()
      this.FG_TABLE_initData()
    },
    watch: {
      'FG_MENU.selected.id': function (data) {
        //this.FG_TABLE.addRow.data.parentId = data
        this.FG_TABLE_initData()
      }
    },
    methods: {
      FG_MENU_initData: function () {
        this.$http(this.$_.merge({}, Action.Product.Category.fetchTree)).then(response => {
          //更新菜单数据

          this.FG_MENU.data[0].children = response.body.children


        }, response => {
        })
      },

      FG_MENU_handleNodeClick: function (data) {
        Helper.FG.setValueToObject(this.FG_MENU.selected, data)
      },

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

        for (let i in this.FG_TABLE.pagination.pageFilter.filters) {
          if(this.FG_TABLE.pagination.pageFilter.filters[i]!==''){
            params[i] = this.FG_TABLE.pagination.pageFilter.filters[i]
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

        this.FG_TABLE.pagination.filters=this.FG_advQueryForm
        option = option || {}

        var params = this.FG_TABLE_getParams(this.$_.merge({
          categoryCode: this.FG_MENU.selected.id,
        }, option))
        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }
        this.$http(this.$_.merge({}, Action.Product.Info.list, {
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
      //编辑
      handleEdit(val){
        this.$router.push({path:'/product/edit',query:{pno :val}})
      },
      // 编辑
      FG_TABLE_showEditRowForm: function () {

        if (this.FG_TABLE.multiSelectData.length === 1) {
          let pno = this.FG_TABLE.multiSelectData[0].pno
          this.$router.push({path:'/product/edit',query:{pno:pno}})

        } else {
          this.$message({
            type: 'warning',
            message: '请选择一项数据'
          })
        }
      },


      // 上下架
      FG_TABLE_upShelf: function () {

        if (this.FG_TABLE.multiSelectData.length >= 1) {
          let target = this.FG_TABLE.multiSelectData
          let pnos=[]
          for(let i in target){
            if(target[i].status==20){
              this.$message({
                type: 'warning',
                message: '有商品已上架'
              })
              return false
            }
            pnos.push(target[i].pno)
          }
          this.$confirm('确认上架？')
            .then(_ => {
              if (!this.FG_TABLE_getLock()) {
                this.$message.error('请等待上个操作完成！')
                return false
              }

              this.$http(this.$_.merge({}, Action.Product.Info.upShelves, {
                //获取待更新数据
                body: {pnos:pnos.join(',')}
              })).then(response => {
                this.$message.success('上架成功', response.body)
                this.FG_TABLE_releaseLock()
                this.FG_TABLE_refreshData({
                  page: this.FG_TABLE.pagination.pageFilter.info.currentPage
                })
              }, response => {
                this.FG_TABLE_releaseLock()
                this.$message.error('上架出错', response.body)
              })
            })

        } else {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请至少选择一项数据'
          })
        }

      },

      FG_TABLE_downShelf:function () {
        if (this.FG_TABLE.multiSelectData.length >= 1) {
          let target = this.FG_TABLE.multiSelectData
          let pnos=[]
          for(let i in target){
            if(target[i].status==30){
              this.$message({
                type: 'warning',
                message: '有商品已下架'
              })
              return false
            }
            if(target[i].status==10){
              this.$message({
                type: 'warning',
                message: '待上架商品不允许下架'
              })
              return false
            }
            pnos.push(target[i].pno)
          }
          this.$confirm('确认下架？')
            .then(_ => {
              if (!this.FG_TABLE_getLock()) {
                this.$message.error('请等待上个操作完成！')
                return false
              }

              this.$http(this.$_.merge({}, Action.Product.Info.downShelves, {
                //获取待更新数据
                body: {pnos:pnos.join(',')}
              })).then(response => {
                this.$message.success('下架成功', response.body)
                this.FG_TABLE_releaseLock()
                this.FG_TABLE_refreshData({
                  page: this.FG_TABLE.pagination.pageFilter.info.currentPage
                })
              }, response => {
                this.FG_TABLE_releaseLock()
                this.$message.error('下架出错', response.body)
              })
            })

        } else {
          this.$message({
            showClose: true,
            type: 'warning',
            message: '请至少选择一项数据'
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
        //this.FG_TABLE.pagination.pageFilter.filters =this.FG_advQueryForm
        this.FG_TABLE_refreshData()
      },

      //高级查询
      FG_handleAdvQueryForm:function () {
        this.FG_TABLE.pagination.pageFilter.searchContent=''
        this.FG_TABLE.pagination.pageFilter.filters = this.FG_advQueryForm
        this.FG_TABLE_refreshData()
      },
      FG_resetAdvQueryForm : function (formName) {
        this.FG_TABLE.pagination.pageFilter.searchContent=''
        this.$refs[formName].resetFields();
        this.FG_TABLE_refreshData()
      },
      FG_TABLE_handleSelectionChange: function (val) {
        this.FG_TABLE.multiSelectData = val
      },

      FG_pagination_reset: function () {
        this.FG_TABLE.pagination.pageFilter.searchContent=''
        this.FG_TABLE.pagination.pageFilter.filters = {}

        if (this.FG_TABLE.pagination.setting.currentPage === 1) {
          this.$refs.FG_pagination.$emit('current-change', 1)
        } else {
          this.$refs.FG_pagination.$emit('update:currentPage', 1)
        }
      },
      FG_TABLE_showRefeshTable : function () {
        this.FG_pagination_reset()
      }


    },
    mounted() {

    },
    components: {
      advQuery,supplierSelect
    },

  }
</script>
