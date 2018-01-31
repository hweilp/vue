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
            <h2>新增表单</h2>

          </header>

          <!-- widget div-->
          <div>

            <!-- widget content -->
            <div class="widget-body no-padding">

              <form class="smart-form">

                <header>
                  新建表单
                </header>

                <fieldset>

                  <section>
                    <label class="label">表单名称</label>
                    <label class="input">
                      <input type="text" class="input-sm" v-model="formInfo.data.name">
                    </label>
                  </section>

                  <section>
                    <label class="label">key</label>
                    <label class="input">
                      <input type="text" class="input-sm" v-model="formInfo.data.key">
                    </label>
                  </section>

                  <section>
                    <label class="label">提交地址</label>
                    <label class="input">
                      <input type="text" class="input-sm" v-model="formInfo.data.submit_addr">
                    </label>
                  </section>

                  <section>
                    <label class="label">提交方式</label>
                    <div class="inline-group">
                      <label class="radio">
                        <input type="radio" v-model="formInfo.data.method" value="GET">
                        <i></i>GET</label>
                      <label class="radio">
                        <input type="radio" v-model="formInfo.data.method" value="PUT">
                        <i></i>PUT</label>
                      <label class="radio">
                        <input type="radio" v-model="formInfo.data.method" value="POST">
                        <i></i>POST</label>
                      <label class="radio">
                        <input type="radio" v-model="formInfo.data.method" value="DELETE">
                        <i></i>DELETE</label>
                    </div>
                  </section>

                  <section>
                    <label class="label">状态</label>
                    <div class="inline-group">
                      <label class="radio">
                        <input type="radio" v-model="formInfo.data.status" value="1">
                        <i></i>启用</label>
                      <label class="radio">
                        <input type="radio" v-model="formInfo.data.status" value="2">
                        <i></i>禁用</label>
                    </div>
                  </section>

                </fieldset>


                <footer>
                  <button type="button" class="btn btn-primary" @click="submitForm(formInfo)">
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

<style lang="scss">

</style>
<script type="text/javascript">

  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'

  export default{
    data: function () {
      return {
        forms: [],
        formInfo: {
          data: {
            name: '',
            key: '',
            submit_addr: '',
            method: 'GET',
            status: 1
          }
        },
      }
    },
    created: function () {

    },
    methods: {
      navBack: Helper.Nav.back,
      submitForm: function (form) {
        let formData = {}
        formData.name = form.data.name
        formData.key = form.data.key
        formData.status = form.data.status
        this.$http(_.merge({}, Action.Form.add, {
          body: this.formInfo.data
        })).then(response => {
          this.$router.push({
            path: '/form/list'
          })
        }, response => {
          alert(response.body)
        })
      }
    }
  }

</script>
