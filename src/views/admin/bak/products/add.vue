<template>
  <!-- MAIN PANEL -->
  <div id="main" role="main">

    <!-- RIBBON -->
    <div id="ribbon">


      <!-- breadcrumb -->
      <ol class="breadcrumb">
        <li>商品管理</li>
        <li>新增商品</li>
      </ol>


    </div>
    <!-- END RIBBON -->


    <!-- MAIN CONTENT -->
    <div id="content">
      <!-- NEW COL START -->
      <article class="col-md-6 col-xs-12">

        <!-- Widget ID (each widget will need unique ID)-->
        <div class="jarviswidget" id="wid-id-1" data-widget-colorbutton="false" data-widget-editbutton="false"
             data-widget-custombutton="false">
          <header>
            <span class="widget-icon"> <i class="fa fa-edit"></i> </span>
            <h2>新增商品</h2>

          </header>

          <!-- widget div-->
          <div>

            <!-- widget content -->
            <div class="widget-body no-padding">

              <form class="smart-form">

                <header>
                  选择商品类目
                </header>
                <fieldset>
                  <multi-level-input :pid="0" @targetCategorySelected="setTargetCategory"></multi-level-input>
                </fieldset>


                <template v-if="category">
                  <header>
                    关键属性
                  </header>
                  <fieldset>
                    <multi-level-key-attr :attributes="keyAttrs" :pid="0"></multi-level-key-attr>
                  </fieldset>

                  <header>
                    销售属性
                  </header>
                  <fieldset>
                    <multi-level-key-attr :attributes="skuAttrs" :pid="0"></multi-level-key-attr>
                  </fieldset>

                  <header>
                    非关键属性
                  </header>
                  <fieldset>
                    <multi-level-key-attr :attributes="normalAttrs" :pid="0"></multi-level-key-attr>
                  </fieldset>
                </template>

                <!--<template v-for="(ar,index) in arg">-->
                <!--<input type="text" v-model="arg[index]">-->
                <!--</template>-->

                <!--<fieldset>-->

                <!--<section>-->
                <!--<label class="label">关键属性</label>-->
                <!--<label class="input">-->
                <!--<input type="text" class="input-sm">-->
                <!--</label>-->
                <!--</section>-->

                <!--<section>-->
                <!--<label class="label">Select Small</label>-->
                <!--<label class="select">-->
                <!--<select class="input-sm">-->
                <!--<option value="0">Choose name</option>-->
                <!--<option value="1">Alexandra</option>-->
                <!--<option value="2">Alice</option>-->
                <!--<option value="3">Anastasia</option>-->
                <!--<option value="4">Avelina</option>-->
                <!--</select> <i></i> </label>-->
                <!--</section>-->

                <!--<section>-->
                <!--<label class="label">Inline radios</label>-->
                <!--<div class="inline-group">-->
                <!--<label class="radio">-->
                <!--<input type="radio" name="radio-inline" checked="checked">-->
                <!--<i></i>Alexandra</label>-->
                <!--<label class="radio">-->
                <!--<input type="radio" name="radio-inline">-->
                <!--<i></i>Alice</label>-->
                <!--<label class="radio">-->
                <!--<input type="radio" name="radio-inline">-->
                <!--<i></i>Anastasia</label>-->
                <!--<label class="radio">-->
                <!--<input type="radio" name="radio-inline">-->
                <!--<i></i>Avelina</label>-->
                <!--<label class="radio">-->
                <!--<input type="radio" name="radio-inline">-->
                <!--<i></i>Beatrice</label>-->
                <!--</div>-->
                <!--</section>-->

                <!--<section>-->
                <!--<label class="label">Inline checkboxes</label>-->
                <!--<div class="inline-group">-->
                <!--<label class="checkbox">-->
                <!--<input type="checkbox" name="checkbox-inline" checked="checked">-->
                <!--<i></i>Alexandra</label>-->
                <!--<label class="checkbox">-->
                <!--<input type="checkbox" name="checkbox-inline">-->
                <!--<i></i>Alice</label>-->
                <!--<label class="checkbox">-->
                <!--<input type="checkbox" name="checkbox-inline">-->
                <!--<i></i>Anastasia</label>-->
                <!--<label class="checkbox">-->
                <!--<input type="checkbox" name="checkbox-inline">-->
                <!--<i></i>Avelina</label>-->
                <!--<label class="checkbox">-->
                <!--<input type="checkbox" name="checkbox-inline">-->
                <!--<i></i>Beatrice</label>-->
                <!--</div>-->
                <!--</section>-->

                <!--</fieldset>-->


                <footer>
                  <button type="submit" class="btn btn-primary">
                    确认
                  </button>
                  <button type="button" class="btn btn-default" @click="navBack($router,-1)">
                    返回
                  </button>
                </footer>
              </form>

            </div>
            <!-- end widget content -->

          </div>
          <!-- end widget div -->

        </div>
        <!-- end widget -->

      </article>

      <article class="col-md-6 col-xs-12">

        <!-- Widget ID (each widget will need unique ID)-->
        <div class="jarviswidget">
          <header>
            <span class="widget-icon"> <i class="fa fa-edit"></i> </span>
            <h2>编辑SKU商品</h2>

          </header>

          <!-- widget div-->
          <div>

            <!-- widget content -->
            <div class="widget-body no-padding">

              <form class="smart-form">

                <header>
                  SKU表
                </header>

                <fieldset class="col col-xs-12">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th>序号</th>
                      <th>品牌</th>
                      <th>商品名称</th>
                      <th>价格</th>
                      <th>库存</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="product in productList">
                      <td>{{product.id}}</td>
                      <td>
                        <template v-if="product.brand">{{product.brand.name}}</template>
                        <template v-else>无品牌</template>
                      </td>
                      <td>{{product.name}}</td>
                      <td>{{product.shop_price}}</td>
                      <td>

                      </td>
                    </tr>
                    </tbody>
                  </table>
                </fieldset>
                <div class="fg-clear"></div>


                <footer>
                  <button type="submit" class="btn btn-primary">
                    确认
                  </button>
                  <button type="button" class="btn btn-default" @click="navBack($router,-1)">
                    返回
                  </button>
                </footer>
              </form>

            </div>
            <!-- end widget content -->

          </div>
          <!-- end widget div -->

        </div>
        <!-- end widget -->

      </article>
    </div>
    <!-- END MAIN CONTENT -->

  </div>
</template>
<style lang="scss" scoped>


</style>

<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import multiLevelInput from '@/components/compos/multi-level-input.vue'
  import multiLevelKeyAttr from '@/components/compos/multi-attr-list.vue'

  export default {
    data: function () {
      return {
        category: null,
        attributes: [],
        productList: [{name: 'hello'}]
      }
    },
    computed: {
      //各类属性
      keyMainAttrs: function () {
        return _.filter(this.attributes, {pid: 0, attribute: {is_key: 1}})
      },
      keyAttrs: function () {
        return _.filter(this.attributes, {attribute: {is_key: 1}})
      },
      skuAttrs: function () {
        return _.filter(this.attributes, {attribute: {is_sku: 1}})
      },
      normalAttrs: function () {
        return _.filter(this.attributes, function (o) {
          return (o.attribute.is_key != 1 && o.attribute.is_sku != 1)
        })
      },

      formData: function () {
        let o = {}
        o.category = this.category
        o.attributes = this.attributes
        o.selectedAttrs = []
        return o
      }

    },
    watch: {
      category: function () {
        if (this.category) {
          this.$http.get(Helper.FG_CONFIG.host + '/category/attrs?category_id=' + this.category.id).then(response => {
            this.attributes = response.body
          }, response => {})
        }
      }
    },
    methods: {
      navBack: Helper.Nav.back,
      setTargetCategory: function (category) {
        this.category = category
      }
    },
    components: {
      multiLevelInput,
      multiLevelKeyAttr
    }
  }
</script>
