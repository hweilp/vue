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
        <form action="#" class="form-horizontal clear-both">
          <div class="row">
            <!--输入字段-->
            <div class="col-xs-2">
              <div class="form-group">
                <div class="col-xs-12">
                  <input class="form-control" placeholder="提示信息" type="text" value="默认值"
                         name="">
                </div>
              </div>
            </div>

            <!--下拉选择 有键值-->
            <div class="col-xs-2">
              <div class="form-group">
                <label class="col-xs-4 control-label thin-padding">下拉选项:</label>
                <div class="col-xs-8">
                  <select class="form-control" name="">
                    <option>- 请选择 -</option>
                    <option value="1">选项1</option>
                    <option value="2">选项2</option>
                  </select>

                </div>
              </div>
            </div>

            <!--下拉选择 无键值-->
            <div class="col-xs-2">
              <div class="form-group">
                <div class="col-xs-12">
                  <select class="form-control" name="">
                    <option>- 请选择 -</option>
                    <option value="1">选项1</option>
                    <option value="2">选项2</option>
                  </select>

                </div>
              </div>
            </div>

            <!--下拉选择 无键值-->
            <div class="col-xs-2">
              <div class="form-group">
                <div class="col-xs-12">
                  <select class="form-control" name="">
                    <option>- 请选择 -</option>
                    <option value="1">选项1</option>
                    <option value="2">选项2</option>
                  </select>

                </div>
              </div>
            </div>

            <div class="fg-clear">

            </div>
          </div>

          <button class="btn btn-primary btn-xs search-button" type="submit">
            <i class="fa fa-search"></i> 搜索
          </button>

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
          <th>序号</th>
          <th>名称</th>
          <th>简码</th>
          <th>简拼</th>
          <th>父节点</th>
          <th>是否父节点</th>
          <th>排序</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="category in categories">
          <td>{{category.id}}</td>
          <td>{{category.name}}</td>
          <td>{{category.abbr}}</td>
          <td>{{category.pinyin}}</td>
          <td>{{category.pid}}</td>
          <td>{{category.is_pid}}</td>
          <td>{{category.order}}</td>
          <td>{{category.status}}</td>
          <td>
            <a class="btn btn-primary btn-xs" href="javascript:void(0);">编辑</a>
            <a class="btn btn-primary btn-xs" href="javascript:void(0);">下架</a>
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
        categories: []
      }
    },
    created: function () {
      this.$http(Action.Category.list).then(response => {
        this.categories = response.body
      }, response => {})
    }
  }

</script>
