<template>
  <div class="storeCheck openDialog">

    <el-dialog :title="FG_STOREQUERY.title" :visible.sync="FG_STOREQUERY.dialogShow" top="30%">
      <template>
        <el-form ref="storeCheckForm" :model="FG_STOREQUERY.storeCheckRow.data" label-width="80px" :rules="FG_STOREQUERY.storeCheckRow.rules">


          <el-form-item label="过滤 ：" prop="goodsNum">
            <el-input v-model="FG_STOREQUERY.storeCheckRow.data.goodsNum"></el-input>
            <el-button type="primary" @click="FG_STOREQUERY_storeQuery('storeCheckForm')">查询</el-button>
          </el-form-item>
        </el-form>
      </template>

      <el-table
        :data="FG_STOREQUERY.tabData"
        border
        fit
        @row-dblclick="FG_TABLE_handleRowDoubleClick"
        style="width: 100%">
        <el-table-column
          prop="value"
          label="编码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="label"
          label="名称"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="FG_STOREQUERY.dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="FG_STOREQUERY_storeCheckRowSumbit">确认</el-button>
      </div>


    </el-dialog>

  </div>

</template>
<style lang="scss" scoped>

</style>
<script>
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'
  import Rules from '@/assets/admin/resource/rules.js'
  export default {
    props:['storeQueryShow'],
    data (){
      return {
        FG_STOREQUERY :{
          dialogShow:false,
          title : "门店管理-查询",
          name : "storeCheck",
          storeCheckRow : {
            name : "storeCheckForm",
            is_show:false,
            data : {
              goodsNum : ''
            },
            rules : Rules.storeCheck
          },
          storeOptions:[
            {value : 0 , label : "总部"},
            {value : 1 , label : "上海分部"},
            {value : 2 , label : "杭州分部"},
            {value :3 , label : "广州分部"}

          ],
          tabData: [
            {value : 0 , label : "总部"},
            {value : 1 , label : "上海分部"},
            {value : 2 , label : "杭州分部"},
            {value :3 , label : "广州分部"}
          ]
        }
      }
    },
    watch:{
      storeQueryShow : function (val) {
        this.FG_STOREQUERY.dialogShow = val;
      },
      'FG_STOREQUERY.dialogShow':function (val) {
        this.$emit("on-show-change",val)
      }

    },

    methods:{
      FG_STOREQUERY_storeQuery:function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.FG_STOREQUERY.storeCheckRow)
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      FG_STOREQUERY_storeCheckRowSumbit:function(){
        console.log(this.FG_STOREQUERY.storeCheckRow)
      },
      FG_TABLE_handleRowDoubleClick(row){
        console.log(row)
        this.FG_STOREQUERY.dialogShow = false;
        this.$emit("on-get-value",row)
      }
    }
  }
</script>
