<template>
  <!-- MAIN PANEL -->
  <div id="main" role="main">

    <!-- RIBBON -->
    <div id="ribbon">


      <!-- breadcrumb -->
      <ol class="breadcrumb">
        <li>商品管理</li>
        <li>商品列表</li>
        <li>表单名：{{form.info.name}}</li>
      </ol>


    </div>
    <!-- END RIBBON -->


    <!-- MAIN CONTENT -->
    <div id="content">

      <div class="search-layer">
        <form class="form-horizontal clear-both" v-on:submit.prevent="doSearch">
          <div class="row">
            <!--输入字段-->
            <div class="col-xs-2">
              <div class="form-group">
                <label class="col-xs-4 control-label thin-padding">字段域名称:</label>
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

        <router-link class="btn btn-primary btn-xs" :to="{name:'fromAddInput',params:{form_id:form.info.id}}">
          <i class="fa fa-plus"> </i>
          新增字段域
        </router-link>
        <router-link class="btn btn-primary btn-xs" :to="'/form/preview/'+form.info.id"><i class="fa fa-eye"> </i> 预览
        </router-link>

      </div>

      <hr class="sp-thin">

      <table class="table table-bordered">
        <thead>
        <tr>
          <th width="80px">序号</th>
          <th>类型</th>
          <th>name</th>
          <th>label</th>
          <th>ID</th>
          <th>CLASS</th>
          <th>提示</th>
          <th>默认值</th>
          <th>排序</th>
          <th>状态</th>
          <th width="280px">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="input in form.inputs" v-if="!input.hide">
          <td>{{input.id}}</td>
          <td>{{input.type_id}}</td>
          <td>{{input.name}}</td>
          <td>{{input.label}}</td>
          <td>{{input.id_name}}</td>
          <td>{{input.class}}</td>
          <td>{{input.placeholder}}</td>
          <td>{{input.value}}</td>
          <td>{{input.order}}</td>
          <td>{{(input.status == 1) ? '启用' : '禁用'}}</td>
          <td>
            <router-link class="btn btn-primary btn-xs" :to="{path:'/formInput/edit/'+input.id}">编辑</router-link>
            <a v-if="input.status==2" class="btn btn-primary btn-xs" href="javascript:void(0);"
               @click="updateRecord(input.id,{status :1},$event)">启用</a>
            <a v-else="" class="btn btn-primary btn-xs" href="javascript:void(0);"
               @click="updateRecord(input.id,{status :2},$event)">禁用</a>
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
        form: {
          info: {
            id: '',
            name: '',
            key: '',
            status: '',
          },
          inputs: []
        },
        filter: {}
      }
    },
    created: function () {

      //加载路由参数
      Helper.FG.setValueToObject(this.filter, this.$route.query, true, this)

      this.form.info.id = this.$route.params.id
      //发送数据请求
      this.refreshData()

    },
    computed: {},
    methods: {
      setFilter: function (key, event) {
        this.$set(this.filter, key, event.target.value)

      },
      doSearch: function () {
        this.$router.replace({path: '/formInput/list/' + this.form.info.id, query: this.filter})
      },
      refreshData: function () {
        //发送数据请求
        this.$http(_.merge({}, Action.Form.Input.list, {
          url: Helper.FG.setParams(Action.Form.Input.list.url, {id: this.form.info.id}),
          params: this.filter
        })).then(response => {
          let $form = response.body

          this.form.inputs = $form.inputs
          Helper.FG.setValueToObject(this.form.info, $form)

        }, response => {})
      },
      updateRecord: function (id, data = {}, $event) {

        let eventTarget = $event.target
        let wordBefore = eventTarget.innerText
        eventTarget.innerText = '更新中...'
        eventTarget.setAttribute('disabled', 'disabled')

        //发送数据请求
        this.$http(_.merge({}, Action.FormInput.update, {
          body: data,
          url: Helper.FG.setParams(Action.FormInput.update.url, {id: id}),
        })).then(response => {
          let record = _.find(this.form.inputs, {id: id})
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
      this.refreshData()
      next()
    }
  }

</script>
