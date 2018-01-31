<template>
  <!-- MAIN PANEL -->
  <div id="main" role="main">

    <!-- RIBBON -->
    <div id="ribbon">


      <!-- breadcrumb -->
      <ol class="breadcrumb">
        <li>商品管理</li>
        <li>商品列表</li>
      </ol>


    </div>
    <!-- END RIBBON -->


    <!-- MAIN CONTENT -->
    <div id="content">

      <div class="search-layer">
        <form class="form-horizontal clear-both" :submit.prevent="doSearch">
          <div class="row">
            <!--输入字段-->
            <div class="col-xs-2">
              <div class="form-group">
                <label class="col-xs-4 control-label thin-padding">表单名称:</label>
                <div class="col-xs-8">
                  <input class="form-control" placeholder="提示信息" type="text" :value="filter.name"
                         @input="setFilter('name',$event)"
                         name="">
                </div>
              </div>
            </div>

            <!--下拉选择 有键值-->
            <div class="col-xs-2">
              <div class="form-group">
                <div class="col-xs-8">
                  <select class="form-control" :value="filter.status" @input="setFilter('status',$event)">
                    <option value="">- 启用状态 -</option>
                    <option value="1">启用</option>
                    <option value="2">禁用</option>
                  </select>

                </div>
              </div>
            </div>

            <div class="fg-clear">

            </div>
          </div>

          <div class="search-button-layer">
            <button class="btn btn-primary btn-xs search-button" type="button" @click="doSearch">
              <i class="fa fa-search"></i> 搜索
            </button>
          </div>

        </form>

      </div>

      <hr class="sp-thin">

      <div class="opr-layer">

        <router-link class="btn btn-primary btn-xs" to="/form/add"><i class="fa fa-plus"></i>新增</router-link>

      </div>

      <hr class="sp-thin">

      <table class="table table-bordered">
        <thead>
        <tr>
          <th width="80px">序号</th>
          <th>名称</th>
          <th>键</th>
          <th>提交地址</th>
          <th>提交方式</th>
          <th>状态</th>
          <th width="280px">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="form in forms" v-if="!form.hide">
          <td>{{form.id}}</td>
          <td>{{form.name}}</td>
          <td>{{form.key}}</td>
          <td>{{form.submit_addr}}</td>
          <td>{{form.method}}</td>
          <td>{{(form.status == 1) ? '启用' : '禁用'}}</td>
          <td>
            <router-link class="btn btn-primary btn-xs" :to="{path:'/form/edit/'+form.id}">编辑</router-link>
            <router-link class="btn btn-primary btn-xs" :to="{path:'/form/'+form.id+'/formInput'}">编辑字段域</router-link>
            <a v-if="form.status==2" class="btn btn-primary btn-xs" href="javascript:void(0);"
               @click="updateRecord(form.id,{status :1},$event)">启用</a>
            <a v-else="" class="btn btn-primary btn-xs" href="javascript:void(0);"
               @click="updateRecord(form.id,{status :2},$event)">禁用</a>
            <router-link class="btn btn-primary btn-xs" :to="'/form/preview/'+form.id"><i class="fa fa-eye"> </i> 预览
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>


    </div>
    <!-- END MAIN CONTENT -->

  </div>
  <!-- END MAIN PANEL -->
</template>


<style lang="scss">

</style>
<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'

  export default{
    data: function () {
      return {
        forms: [],
        filter: {}
      }
    },
    created: function () {

      Helper.FG.setValueToObject(this.filter, this.$route.query, true, this)

      //发送数据请求
      this.updateData()

    },
    computed: {},
    methods: {
      setFilter: function (key, event) {
        this.$set(this.filter, key, event.target.value)

      },
      doSearch: function () {
        this.$router.replace({path: '/form/list', query: this.filter})
      },
      updateData: function () {
        //发送数据请求
        this.$http(_.merge({}, Action.Form.list, {params: this.filter})).then(response => {
          this.forms = response.body
        }, response => {})
      },
      updateRecord: function (id, data = {}, $event) {

        let eventTarget = $event.target
        let wordBefore = eventTarget.innerText
        eventTarget.innerText = '更新中...'
        eventTarget.setAttribute('disabled', 'disabled')

        //发送数据请求
        this.$http(_.merge({}, Action.Form.update, {body: data, url: Action.Form.update.url + id})).then(response => {
          let record = _.find(this.forms, {id: id})
          //refresh local data
          let i = ''
          for (i in data) {
            if (record.hasOwnProperty(i)) {
              record[i] = data[i]
            }
          }
        }, response => {
        }).finally(function () {
          eventTarget.removeAttribute('disabled')
        })
      }
    },
    beforeRouteUpdate: function (to, from, next) {
      this.updateData()
      next()
    }
  }

</script>
