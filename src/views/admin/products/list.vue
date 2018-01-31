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
        <form class="form-horizontal clear-both" v-on:submit.prevent="doSearch">
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

        <router-link class="btn btn-primary btn-xs" to="/product/add"><i class="fa fa-plus"></i>新增</router-link>

      </div>

      <hr class="sp-thin">

      <table class="table table-bordered">
        <thead>
        <tr>
          <th width="80px">序号</th>
          <th>品牌</th>
          <th>商品名称</th>
          <th>价格</th>
          <th>状态</th>
          <th width="200px">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="product in products" v-if="!products.hide">
          <td>{{product.id}}</td>
          <td>{{product.name}}</td>
          <td>
            <template v-if="product.brand">{{product.brand.name}}</template>
            <template v-else>无品牌</template>
          </td>
          <td>{{product.shop_price}}</td>
          <td>{{product.check_status}}</td>
          <td>
            <a class="btn btn-primary btn-xs" href="javascript:void(0);">编辑</a>

            <a v-if="product.check_status==2" class="btn btn-primary btn-xs" href="javascript:void(0);"
               @click="updateRecord(product.id,{check_status :1},$event)">启用</a>
            <a v-else="" class="btn btn-primary btn-xs" href="javascript:void(0);"
               @click="updateRecord(product.id,{check_status :2},$event)">禁用</a>

            <a v-if="product.is_on_sale==2" class="btn btn-primary btn-xs" href="javascript:void(0);"
               @click="updateRecord(product.id,{is_on_sale :1},$event)">上架</a>
            <a v-else="" class="btn btn-primary btn-xs" href="javascript:void(0);"
               @click="updateRecord(product.id,{is_on_sale :2},$event)">下架</a>
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
        products: [],
        filter: {}
      }
    },
    created: function () {
      let vm = this

//      console.log(this.$_.each)
      //加载路由参数
      _.each(this.$route.query, function (value, key) {
        vm.$set(vm.filter, key, value)
      })

      //发送数据请求
      this.updateData()

    },
    computed: {},
    methods: {
      setFilter: function (key, event) {
        this.$set(this.filter, key, event.target.value)

      },
      doSearch: function () {
        this.$router.replace({path: '/product/list', query: this.filter})
      },
      updateData: function () {
        //发送数据请求
        this.$http(_.merge({}, Action.Product.list, {params: this.filter})).then(response => {
          this.products = response.body
        }, response => {})
      },
      updateRecord: function (id, data = {}, $event) {

        let eventTarget = $event.target
        let wordBefore = eventTarget.innerText
        eventTarget.innerText = '更新中...'
        eventTarget.setAttribute('disabled', 'disabled')

        //发送数据请求
        this.$http(_.merge({}, Action.Product.update, {
          body: data,
          url: Action.Product.update.url + id
        })).then(response => {
          let record = _.find(this.products, {id: id})
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

