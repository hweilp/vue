<template>
  <el-dialog title="选择商品" :visible.sync="show" size="large">
    <el-row>
      <el-col :span="4">

        <el-row>
          <el-col :span="24">
            <el-input
              placeholder="可输入编码/名称进行查询"
              v-model="selectFilter"
            >
            </el-input>
          </el-col>
        </el-row>

        <el-tree
          style="height:400px;overflow: scroll"
          class="filter-tree"
          :data="FG_MENU.data"
          node-key="id"
          :default-expanded-keys="[0]" :props="{label:'name',children:'children'}"
          :filter-node-method="handlerSelectFilter"
          ref="tree"
          @node-click="FG_MENU_handleNodeClick">
        </el-tree>


      </el-col>
      <el-col :span="20" :offset="0" style="padding-left: 20px;">
        <el-row>
          <el-col :span="24">
            <el-input
              class="fg-search-input"
              placeholder="可输入商品ID/名称进行查询"
              icon="search"
              v-model="FG_TABLE.pagination.pageFilter.searchContent"
              :on-icon-click="FG_TABLE_handleTableSearch"
              @keyup.enter.native="FG_TABLE_handleTableSearch">
            </el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-table
              ref="multipleTable"
              :data="FG_TABLE.data"
              max-height="450"
              border
              tooltip-effect="dark"
              style="width: 100%"
              v-loading="FG_TABLE.loading.is_loading"
              :element-loading-text="FG_TABLE.loading.loadText"
              class="fg-content-table"
              @row-dblclick="FG_TABLE_handleRowDoubleClick"
              @selection-change="FG_TABLE_handleSelectionChange"
              :default-sort="{prop: 'index', order: 'descending'}"
            >
              <el-table-column
                type="selection"
                width="90"
                v-if="defaultSelectType"
              ><span style="position: relative;
        top: -6px;">全选</span>
              </el-table-column>
              <el-table-column
                prop="pid"
                label="商品ID">
              </el-table-column>
              <el-table-column
                prop="name"
                label="商品名称">
              </el-table-column>
              <el-table-column
                label="商品编码"
                width="170">
                <template scope="scope">
                  <p v-if="scope.row.pno">{{scope.row.pno}}</p>
                  <p v-else="scope.row.pid">{{scope.row.pid}}</p>
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
                prop="virtualSales"
                label="虚拟销量">
              </el-table-column>
              <el-table-column
                prop="natureTypeStr"
                label="性质">
              </el-table-column>
              <el-table-column
                prop="statusStr"
                label="上下架状态">
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

              :page-sizes="[5, 10, 20, 40]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="FG_TABLE.pagination.pageFilter.info.total"
            >
            </el-pagination>
          </el-col>
          <el-col style="margin-top: 20px">
            <el-button @click="FG_handleProductCancel">取消</el-button>
            <el-button type="primary" @click="FG_handleProductVerify">确认</el-button>
          </el-col>

        </el-row>



      </el-col>
    </el-row>
  </el-dialog>
</template>

<style lang="scss" scoped="">
  .el-row {
    margin-bottom: 10px;
  }

  .el-dialog--small{
    width: 1080px;
  }
</style>


<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'

  export default  {
    data: function () {
      return {
        defaultSelectType:true,
        currentPage: 1,
        productFilter: '',
        selectFilter: '',
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
            name: '所有类别',
            parentId: 0,
            attachment: {
              id: 0
            }
          },
          data: [
            {
              id: 0,
              parentId: 0,
              name: '所有类别',
              children: [],
              attachment: {
                id: 0
              }
            }
          ]
        },
        data: '12',
        show: false,
        selector: {
          value: '1',
          options: [

            {
              value: '1',
              label: '分类'
            },
            {
              value: '2',
              label: '品牌'
            },
            {
              value: '3',
              label: '供货商'
            }
          ]
        }
      }
    },
    created: function () {
      this.FG_MENU_initData()
      this.FG_TABLE_initData()
    },
    watch: {
      productSelectVisible: function (val) {
        this.show = val
      },
      show: function (val) {
        this.$emit('update:productSelectVisible', val)
      },
      selectFilter(val) {
        this.$refs.tree.filter(val);
      },
      'FG_MENU.selected.id': function (data) {
        //this.FG_TABLE.addRow.data.parentId = data
        this.FG_TABLE_initData()
      },
      DefaultSelectType:function (val) {
        this.defaultSelectType=val
        //console.log(val)
      }
    },
    props: {
      DefaultSelectType: {
        type: Boolean,
      },
      productSelectVisible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      FG_MENU_initData: function () {
        this.$http(this.$_.merge({}, Action.Product.Category.fetchTree)).then(response => {
          //更新菜单数据

          this.FG_MENU.data[0].children = response.body.children

//          Helper.FG.setValueToObject(this.FG_TABLE.addRow.data, this.FG_MENU.data[0])

        }, response => {
          console.log(response)
        })
      },
      FG_MENU_handleNodeClick: function (data) {
        //console.log(data)
        Helper.FG.setValueToObject(this.FG_MENU.selected, data)
        //console.log(this.FG_MENU.selected)
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
//        console.log(params)
        return params
      },

      FG_TABLE_initData: function () {
        this.FG_TABLE_refreshData()
      },

      FG_TABLE_refreshData: function (option) {
//        console.log(option)

        option = option || {}

        var params = this.FG_TABLE_getParams(this.$_.merge({
          categoryCode: this.FG_MENU.selected.id,
        }, option))
        //console.log(params)
        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }
        this.$http(this.$_.merge({}, Action.Product.Info.list, {
          params
        })).then(response => {
          //表格数据
          //console.log(response)
          let result = response.body

          this.FG_TABLE.data = result.data

          Helper.FG.setValueToObject(this.FG_TABLE.pagination.pageFilter.info, result.pagination)

          this.FG_TABLE_releaseLock()
        }, response => {
          this.FG_TABLE_releaseLock()
        })
      },
      handlerSelectFilter(value, data) {
        console.log(value)
        console.log(data)
        if (!value) return true;
        return data.name.indexOf(value) !== -1 || data.id.toString().indexOf(value) !== -1;
      },
      handlerProductFilter: function () {

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // 双击行
      FG_TABLE_handleRowDoubleClick: function (row) {
        //console.log(row)
        //this.FG_TABLE.multiSelectData=row

        this.$emit("productSelectOne",row)


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
        this.FG_TABLE_refreshData()
      },

      //商品选择
      FG_TABLE_handleSelectionChange: function (val) {
        this.FG_TABLE.multiSelectData = val

      },
      //取消
      FG_handleProductCancel(){
        this.$refs.multipleTable.clearSelection();
      },
      //确认
      FG_handleProductVerify(){

        if(this.FG_TABLE.multiSelectData.length==0){
          this.$message({
            type: 'warning',
            message: '请选择商品'
          })
        }else{
          this.$emit("productSelectMore",this.FG_TABLE.multiSelectData)
        }




      }
    }
  }

</script>
