<template>
  <div>
    <div id="main" class="fg-table-type" role="main">
      <div id="scoreGoods">
        <div class="container">
          <div class="content">

            <el-row :span="24" class="fg-content-title" >积分商品 - 列表</el-row>
            <el-row :span="24" class="fg-content-detail">
              <el-row :span="24" class="fg-content-opr">
                <el-button v-if="power.indexOf(13111101) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_TABLE_showAddRowForm"><i
                  class="fa fa-plus"></i> 新增
                </el-button>
                <el-button v-if="power.indexOf(13111102) > -1 ? true : false"  :plain="true" type="primary" size="" @click="FG_TABLE_showEditRowForm"><i
                  class="fa fa-edit"></i> 编辑
                </el-button>
                <el-button  v-if="power.indexOf(13111103) > -1 ? true : false" :plain="true" type="danger" size="" @click="FG_TABLE_upShelf"><i
                  class="fa fa-arrow-circle-up"></i> 上架
                </el-button>
                <el-button  v-if="power.indexOf(13111104) > -1 ? true : false" :plain="true" type="danger" size="" @click="FG_TABLE_downShelf" style="margin-right: 10px"><i
                  class="fa fa-arrow-circle-o-down"></i> 下架
                </el-button>
                <el-select v-model="FG_TABLE.status" placeholder="全部状态" style="width: 110px" @change="handleStatusChange">
                  <el-option
                    v-for="item in FG_TABLE.statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-input
                  class="fg-search-input"
                  placeholder="输入积分商品编码/商品编码/商品名称进行查询"
                  icon="search"
                  v-model="FG_TABLE.pagination.pageFilter.searchContent"
                  :on-icon-click="FG_TABLE_handleTableSearch"
                  @keyup.enter.native="FG_TABLE_handleTableSearch">
                </el-input>

              </el-row>

              <el-table
                ref="FG_TABLE"
                :data="FG_TABLE.data"
                max-height="450"
                border
                tooltip-effect="dark"
                row-key="id"
                style="width: 100%"
                v-loading="FG_TABLE.loading.is_loading"
                :element-loading-text="FG_TABLE.loading.loadText"
                class="fg-content-table"
                @selection-change="FG_TABLE_handleSelectionChange"
                @row-dblclick="FG_TABLE_handleRowDoubleClick"
                :default-sort="{prop: 'code', order: 'descending'}"
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
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="id"
                  label="积分商品编码"
                  width="150">
                  <!--<template scope="scope">-->
                    <!--<p  @click="FG_TABLE_handleCellhaveTid(scope.row)" :id="scope.row.id"><span>{{ scope.row.id }}</span></p>-->
                  <!--</template>-->
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="积分商品名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="pno"
                  label="商品编码"
                  >
                </el-table-column>
                <el-table-column
                  prop="pName"
                  label="商品名称"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="statusStr"
                  label="上下架状态"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="eachNum"
                  label="每份数量"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="totalNum"
                  label="可兑换总份数"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="surplusNum"
                  label="剩余可兑换份数"
                  width="170">
                </el-table-column>
                <el-table-column
                  prop="costIntegral"
                  label="每份消耗积分"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="startTimeStr"
                  label="开始时间"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="endTimeStr"
                  label="结束时间"
                  width="150">
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
              <product-select
                :DefaultSelectType.sync="FG_TABLE.addRow.DefaultSelectType"
                :productSelectVisible.sync="FG_TABLE.addRow.ProductSelectShow"
                @dialogShowStatusChange="changeProductSelectShowStatus"
                @productSelectOne="handleProductSelectOneRes"
                @productSelectMore="handleProductSelectMoreRes"
              >
              </product-select>
              <!-- 增加数据记录 -->
              <el-dialog title="积分商品 - 新增" :visible.sync="FG_TABLE.addRow.is_show">

                <el-form ref="addForm" :model="FG_TABLE.addRow.data" label-width="150px"
                         :rules="FG_TABLE.addRow.rules">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="积分商品：" prop="pName">
                        <el-input v-model="FG_TABLE.addRow.data.pName" readonly></el-input>
                        <i @click="handleProductSelectOne" class="fa fa-ellipsis-h"></i>

                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="积分商品名称 ：" prop="name">
                        <el-input v-model="FG_TABLE.addRow.data.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="每份数量 ：" prop="eachNum">
                        <el-input v-model.number="FG_TABLE.addRow.data.eachNum "></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="可兑换总份数 ：" prop="totalNum">
                        <el-input v-model.number="FG_TABLE.addRow.data.totalNum "></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="每份消耗积分 ：" prop="costIntegral">
                        <el-input v-model.number="FG_TABLE.addRow.data.costIntegral "></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="是否虚拟商品 ：" prop="type ">
                        <el-radio-group v-model="FG_TABLE.addRow.data.type ">
                          <el-radio :label="20"  >是</el-radio>
                          <el-radio :label="10"  >否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="开始时间 ：" prop="startTime">
                        <el-date-picker
                          v-model="FG_TABLE.addRow.data.startTime"
                          format
                          :editable="false"
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="结束时间 ：" prop="endTime">
                        <el-date-picker
                          v-model="FG_TABLE.addRow.data.endTime"
                          format
                          :editable="false"
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="积分商品状态 ：" prop="status">
                        <el-radio-group v-model="FG_TABLE.addRow.data.status  ">
                          <el-radio :label="10"  >待上架</el-radio>
                          <el-radio :label="20"  >已上架</el-radio>
                          <el-radio :label="30"  >已下架</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>





                </el-form>

                <div slot="footer" class="dialog-footer">
                  <el-button @click="FG_TABLE.addRow.is_show = false">取 消</el-button>
                  <el-button type="primary" @click="FG_TABLE_onAddRowSubmit('addForm')">增加</el-button>

                </div>
              </el-dialog>




              <!-- 编辑表格记录 -->
              <el-dialog title="积分商品-修改" :visible.sync="FG_TABLE.editRow.is_show">
                <el-form ref="editFrom" :model="FG_TABLE.editRow.data" label-width="150px" :rules="FG_TABLE.editRow.rules">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="积分商品 ：" prop="pName">
                        <el-input v-model="FG_TABLE.editRow.data.pName" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="积分商品名称 ：" prop="name">
                        <el-input v-model="FG_TABLE.editRow.data.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="每份数量 ：" prop="eachNum">
                        <el-input v-model.number="FG_TABLE.editRow.data.eachNum "></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="可兑换总份数 ：" prop="totalNum">
                        <el-input v-model.number="FG_TABLE.editRow.data.totalNum "></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="每份消耗积分 ：" prop="costIntegral">
                        <el-input v-model.number="FG_TABLE.editRow.data.costIntegral "></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="是否虚拟商品 ：" prop="type">
                        <el-radio-group v-model="FG_TABLE.editRow.data.type" disabled>
                          <el-radio :label="20"  >是</el-radio>
                          <el-radio :label="10"  >否</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="开始时间 ：" prop="startTime">

                        <el-date-picker
                          v-model="FG_TABLE.editRow.data.startTime"
                          type="date"
                          format
                          :editable="false"
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="结束时间 ：" prop="endTime">
                        <el-date-picker
                          v-model="FG_TABLE.editRow.data.endTime"
                          type="date"
                          format
                          :editable="false"
                          placeholder="选择日期时间">
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="积分商品状态 ：" prop="status">
                        <el-radio-group v-model="FG_TABLE.editRow.data.status  ">
                          <el-radio :label="10"  >待上架</el-radio>
                          <el-radio :label="20"  >已上架</el-radio>
                          <el-radio :label="30"  >已下架</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>


                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="FG_TABLE.editRow.is_show = false">取 消</el-button>
                  <el-button type="primary" @click="FG_TABLE_onEditRowSubmit('editFrom')">保存</el-button>
                </div>
              </el-dialog>
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
  import productSelect from '@/components/compos/product/product-select'


  export default {
    data () {
      return {
        power:this.$store.state.User.power,
        FG_TABLE: {
          data: [],
          editRow: {
            name: 'editFrom',
            is_show: false,
            is_remote_data: true, //编辑时是否需要重新获取数据
            data: {
              id:'',
              pName:'',
              name:'',
              pno:'',
              pid:'',
              status:'',
              type:'',
              eachNum:'',
              totalNum:'',
              costIntegral:'',
              startTime:'',
              endTime:''
            },
            rules: Rules.Score.commodity
          },
          addRow: {
            name: 'addForm',
            is_show: false,
            is_remote_data: true,
            DefaultSelectType:'',
            ProductSelectShow: false,
            menuData: {},
            data: {
              pName:'',
              name:'',
              pno:'',
              pid:'',
              status:10,
              type:10,
              eachNum:'',
              totalNum:'',
              costIntegral:'',
              startTime:'',
              endTime:''
            },
            rules: Rules.Score.commodity
          },
          deleteRow:{
            dialogVisible:false,
            data:{}
          },
          loading: {
            is_loading: false,
            loadText: '',
            lastTime: (new Date()).getTime()
          },
          multiSelectData: [],
          operate: {},
          status: '',
          statusOptions:[
            {
              label:'全部状态',
              value:''
            },
            {
              label:'待上架',
              value:10
            },
            {
              label:'已上架',
              value:20
            },
            {
              label:'已下架',
              value:30
            }
          ],
          dialogVisible : false,//确认提示框
          pagination: {
            setting: {
              paginationShow: true,
              currentPage: 1,
              rows: 5,
            },
            pageFilter: {
              searchContent: '',
              filters:{
                dateStart:'',
                dateEnd:''
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
            parentId:'0'
          },
          data: [
            {
              id: 0,
              parentId:0,
              name:"所有类别",
              children: [

              ]
            }
          ]
        }
      }
    },
    created: function () {
      this.FG_TABLE_initData()
    },
    watch:{
      'FG_TABLE.addRow.data.startTime':function (val) {
        this.FG_TABLE.addRow.data.startTime=Helper.FG.formatDate(val)
      },
      'FG_TABLE.addRow.data.endTime':function (val) {
        this.FG_TABLE.addRow.data.endTime=Helper.FG.formatDate(val)
      },
      'FG_TABLE.editRow.data.startTime':function (val) {
        this.FG_TABLE.editRow.data.startTime=Helper.FG.formatDate(val)
      },
      'FG_TABLE.editRow.data.endTime':function (val) {
        this.FG_TABLE.editRow.data.endTime=Helper.FG.formatDate(val)
      },
    },
    methods: {
      handleStatusChange(val){
        this.FG_TABLE.status=val
        this.FG_TABLE_refreshData()
      },
      /*积分商品新增选择商品*/
      changeProductSelectShowStatus: function (val) {
        this.FG_TABLE.addRow.ProductSelectShow = val
      },
      //选择一件商品
      // 商品表格单项商品选择
      handleProductSelectOne(){
        this.FG_TABLE.addRow.DefaultSelectType=false
        this.FG_TABLE.addRow.ProductSelectShow = true
      },
      handleProductSelectOneRes(val){
        this.FG_TABLE.addRow.data.pName=val.name
        this.FG_TABLE.addRow.data.pno=val.pno
        this.FG_TABLE.addRow.data.pid=val.pid

        this.FG_TABLE.addRow.ProductSelectShow = false


      },
      handleProductSelectMoreRes(val){
      },


      FG_MENU_handleNodeClick: function (data) {
        Helper.FG.setValueToObject(this.FG_MENU.selected, data)
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
        for (let i in this.FG_TABLE.pagination.pageFilter.filters) {
          params[this.FG_TABLE.pagination.pageFilter.filters[i].name] = this.FG_TABLE.pagination.pageFilter.filters[i].value
        }

        //将自定义字段加入
        for (let name in options) {
          params[name] = options[name]
        }

        params.rows = this.FG_TABLE.pagination.setting.rows

        if(this.FG_TABLE.status){
          params.status=this.FG_TABLE.status
        }
        return params
      },

      FG_TABLE_initData: function () {
        this.FG_TABLE_refreshData()
      },

      FG_TABLE_refreshData: function (option) {

        option = option || {}
        var params = this.FG_TABLE_getParams(this.$_.merge({}, option))
        if (!this.FG_TABLE_getLock()) {
          this.$message.error('请等待上个操作完成！')
          return false
        }
        this.$http(this.$_.merge({}, Action.Score.scoreCommodity.list, {
          params
        })).then(response => {
          //表格数据
          let result = response.body

          this.FG_TABLE.data = result.data

          Helper.FG.setValueToObject(this.FG_TABLE.pagination.pageFilter.info, result.pagination)

          this.FG_TABLE_releaseLock()
        }, response => {
          this.$message.error(response.body.resultMessage)
          this.FG_TABLE_releaseLock()
        })
      },
      // 上下架
      FG_TABLE_upShelf: function () {

        if (this.FG_TABLE.multiSelectData.length >= 1) {
          let target = this.FG_TABLE.multiSelectData
          let ids=[]
          for(let i in target){
            if(target[i].status==20){
              this.$message({
                type: 'warning',
                message: '有商品已上架'
              })
              return false
            }
            if(target[i].status==30){
              this.$message({
                type: 'warning',
                message: '有商品已下架'
              })
              return false
            }
            ids.push(target[i].id)
          }
          this.$confirm('确认上架？')
            .then(_ => {
              if (!this.FG_TABLE_getLock()) {
                this.$message.error('请等待上个操作完成！')
                return false
              }

              this.$http(this.$_.merge({}, Action.Score.scoreCommodity.upShelves, {
                body: {ids:ids.join(',')}
              })).then(response => {
                this.$message.success('上架成功', response.body)
                this.FG_TABLE_releaseLock()
                this.FG_TABLE_refreshData({
                  page: this.FG_TABLE.pagination.pageFilter.info.currentPage
                })
              }, response => {
                this.FG_TABLE_releaseLock()
                this.$message.error( response.body.resultMessage, response.body)
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
          let ids=[]
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
            ids.push(target[i].id)
          }
          this.$confirm('确认下架？')
            .then(_ => {
              if (!this.FG_TABLE_getLock()) {
                this.$message.error('请等待上个操作完成！')
                return false
              }

              this.$http(this.$_.merge({}, Action.Score.scoreCommodity.downShelves, {
                //获取待更新数据
                body: {ids:ids.join(',')}
              })).then(response => {
                this.$message.success('下架成功', response.body)
                this.FG_TABLE_releaseLock()
                this.FG_TABLE_refreshData({
                  page: this.FG_TABLE.pagination.pageFilter.info.currentPage
                })
              }, response => {
                this.FG_TABLE_releaseLock()
                this.$message.error(response.body.resultMessage, response.body)
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
      // 编辑
      FG_TABLE_showEditRowForm: function () {

        if (this.FG_TABLE.multiSelectData.length === 1) {
          let target = this.FG_TABLE.multiSelectData[0];
          target.startTime  = target.startTimeStr
          target.endTime  = target.endTimeStr

          Helper.FG.setValueToObject(this.FG_TABLE.editRow.data, target)
          this.FG_TABLE.editRow.is_show=true
        } else {
          this.$message({
            type: 'warning',
            message: '请选择一项数据'
          })
        }
      },

      // 更新
      FG_TABLE_onEditRowSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {


            this.$http(this.$_.merge({}, Action.Score.scoreCommodity.edit, {
              body:this.FG_TABLE.editRow.data
            })).then(response => {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.FG_TABLE_initData()
              this.FG_TABLE.editRow.is_show = false
            }, response => {
              this.$message({
                type: 'warning',
                message: response.body.resultMessage
              })
              this.FG_TABLE.editRow.is_show = false
            })

          } else {
            return true
          }
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
            this.$http(this.$_.merge({}, Action.Score.scoreCommodity.add, {
              //获取待更新数据
              body: this.FG_TABLE.addRow.data
            })).then(response => {
              //表格数据
              this.FG_pagination_reset()

              this.FG_TABLE.addRow.is_show = false

              //如果是顶级，更新MENU列表
              if (this.FG_TABLE.addRow.data.parentCode === 0) {
                this.FG_MENU_initData()
              }

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



      FG_TABLE_handleCellhaveTid(row){
        this.FG_TABLE_handleRowDoubleClick(row)
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
        this.FG_TABLE_refreshData()
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
        this.FG_pagination_reset()
      }
    },
    mounted() {
    },
    components:{
      confirm,productSelect
    },

  }
</script>

<style lang="scss" scoped>
  .el-form-item__content > .el-input{
    width: 100%;
  }
</style>
