/**
 * Created by hw on 2017/6/7.
 */

import Helper from '@/assets/admin/js/helper.js'
import Action from '@/assets/admin/resource/actions.js'

let Vue = require("vue")


export default {
  data(){
    return {
      mid: Number,
      paginationShow:false,
      loadingState: false,//是否出现加载状态
      loadingText: '拼命加载中',//是否出现加载状态的文字
      tips: '', // 确认信息提示文字
      rules: '',
      messageTips: {
        type: '',// 类型 warning,success,error,info
        message: ''// 信息文字
      },// 操作结果返回的信息提示
      searchDropDownContent: [],//搜索下拉内容
      searchContent: '',// 搜索关键字/id
      timeout: null,// el 搜索框从服务器搜索的时间
      // 左侧menu 树形结构数据
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      multipleSelection: [],// 勾选表格的数据
      dialogVisible: false,// 弹出框是否显示
      tableDate: [],
      httpParams : []
    }
  },
  created(){
    'use strict'
    let vm = this
  },
  methods: {
    // 表格选项改变
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
    // 双击行
    handrowdbclick: function (row) {
      this.$refs.multipleTable.clearSelection()//清除所有的勾选
      this.$refs.multipleTable.toggleRowSelection(row, true)//勾选当前行
      this.editTableRow()
    },

    // 搜索框下拉框选中执行事件
    handleSelect(item) {
      console.log(item);
      this.handleSearch(item);
    },
    // 搜索回车事件
    searchSubmit: function () {
      this.handleSearch()
    },

    $_helperSearch (params) {
      this.loadingState = true
      this.loadingText = '正在搜索中，请稍后'
      if(!isNaN(this.searchContent) ){
        this.$http(this.$_.merge({}, Action.Product.searchCodeQuery, {
          url: Helper.FG.setParams(Action.Product.searchCodeQuery.url, params)
        })).then(response => {
          this.loadingState = false
          this.tableData = response.data.data
          this.pageFilter.pagination = response.data.pagination
          this.openMessage("success","搜索成功！共"+ response.data.pagination.total + "数据")
        }, response => {
          this.loadingState = false
          console.log(response)
        })
      }else{
        this.$http(this.$_.merge({}, Action.Product.searchNameQuery, {
          url: Helper.FG.setParams(Action.Product.searchNameQuery.url, params)
        })).then(response => {
          this.loadingState = false
          console.log(response)
          this.tableData = response.data.data
          this.pageFilter.pagination = response.data.pagination
          this.openMessage("success","搜索成功！共"+ response.data.pagination.total + "数据")
        }, response => {
          console.log(response)
        })
      }

    },
    // el 搜索自动完成
    querySearchAsync(queryString, cb) {
      let searchDropDownContent = this.searchDropDownContent;
      let results = queryString ? searchDropDownContent.filter(this.createStateFilter(queryString)) : searchDropDownContent;
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
    // 是否打开确认提示框
    handleClose(done) {
      this.$confirm(this.tips).then(_ => {done()}).catch(_ => {})
    },
    // 打开消息提示框
    openMessage:function (stringType, stringMessage) {
      this.$message({
        showClose: true,
        message:stringMessage ? stringMessage: this.messageTips.message,
        type: stringType ? stringType : this.messageTips.type
      })
    },
    // 移除表格被删除的部分
    removeSelected() {
      this.tableData = this.tableData.filter(t => !this.multipleSelection.some(s => s.code === t.code))
    },

    // 判断请求中
    $_isRequest:function () {
      if(this.loadingState === true ){
        this.messageTips.type = 'warning'
        this.messageTips.message = '请稍后操作'
        this.openMessage();
        return false
      }
    },

    // 分页
    pageQuery : function (params) {
      this.$http(this.$_.merge({}, Action.Product.pageTrunQuery, {
        url: Helper.FG.setParams(Action.Product.pageTrunQuery.url, params)
      })).then(response => {
        console.log(response)
        this.tableData = response.data.data
        this.pageFilter.pagination = response.data.pagination
        if (response.data.pagination.total > response.data.pagination.rows ){
          this.paginationShow = true;
        }else{
          this.paginationShow = false;
        }
      }, response => {
        console.log(response)
      })
    },
    // 新增
    newAdd: function () {
      this.$_isRequest()// 判断请求中
      this.newAddRow.is_show = true
    },
    //新增提交
    onAddRowSubmit: function (formName) {
      this.onSaveRowSubmit(formName);
    },
    $_helperSaveData (formName , params) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.newAddRow.is_show = false
            this.loadingState = true
            this.loadingText = '正在添加数据，请稍后'
            console.log(this.newAddRow.data)
            this.$http(this.$_.merge({}, Action.Product.newAdd, {
              url: Helper.FG.setParams(Action.Product.newAdd.url, params)
            })).then(response => {
              console.log(response)
              this.loadingState = false
              this.openMessage('success',"数据添加成功")
              if(this.tableData.length < this.pageFilter.pagination.rows){
                this.tableData.push(params)
              }else {
                this.paginationShow = true;
              }
              this.pageFilter.pagination.total += 1
            }, response => {
              console.log(response)
              this.loadingState = false
              this.openMessage('error',response.resultMessage)
            })
            this.loadingState = false
        }else {
          return false
        }
      })

    },
    //判断是否选择编辑
    editTableRow: function () {
      this.$_isRequest()// 判断请求中
      if (this.multipleSelection.length === 1) {
        let target = this.multipleSelection[0]
        console.log(this.multipleSelection[0])
        this.editRow.data = this.multipleSelection[0]
        this.editRow.is_show = true
      } else {
        this.openMessage('warning','请选择一项数据')
      }
    },
    //
    $_helperEdit (formName,params) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交
          this.tips = '确认修改数据'
          this.$confirm(this.tips)
            .then(_ => {
              this.editRow.is_show = false
              this.loadingState = true
              this.loadingText = '正在修改数据在，请稍后'
              console.log(this.multipleSelection)
              this.$http(this.$_.merge({}, Action.Product.editData, {
                url: Helper.FG.setParams(Action.Product.editData.url,params)
              })).then(response => {
                this.editRow.is_show = false
                this.loadingState = false
                this.openMessage('success','数据修改成功')
              }, response => {
                console.log(response)
                this.loadingState = false;
                this.openMessage('error','数据修改失败')
              })

            })
            .catch(_ => {})

        } else {
          return false
        }
      })
    },
    $_helperRemoveData (params){
      this.tips = '确认删除数据'
      this.$confirm(this.tips)
        .then(_ => {
          this.loadingState = true
          this.loadingText = '正在删除数据在，请稍后'
          this.$http(this.$_.merge({}, Action.Product.remove, {
            url: Helper.FG.setParams(Action.Product.remove.url, params)
          })).then(response => {
            console.log(response)
            this.removeSelected()
            this.loadingState = false;
            this.openMessage('success','数据已成功删除')
            this.pageFilter.pagination.total -= params.codeList.length
          }, response => {
            this.loadingState = false;
            this.openMessage('error','删除数据失败')
          })
        })
        .catch(_ => {
          return
        })

    },




    refush : function  () {
      this.initTableData()
    },









       // this.$http(this.$_.merge({}, Action.Product.add, {
       //   url: Helper.FG.setParams(Action.Product.add.url, params)
       // })).then(response => {
       //     console.log(response)
       // }, response => {
       //     console.log(response)
       // })

//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            this.tips = '确认增加数据'
//            this.$confirm(this.tips).then(_ => {
//            }).catch(_ => {
//
//            })
//
//          }else {
//            return false
//          }
//        })



},
  mounted:function () {

  }
}
