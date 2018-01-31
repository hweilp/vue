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
            <h2>表单预览</h2>

          </header>

          <!-- widget div-->
          <div>

            <!-- widget content -->
            <div class="widget-body no-padding">

              <form class="smart-form">

                <header>
                  表单：{{form.info.name}}  提交地址：{{form.info.submit_addr}}  提交类型： {{form.info.method}}
                </header>

                <fieldset>

                  <template v-for="input in form.inputs">
                    <form-input :input="input">

                    </form-input>
                  </template>

                </fieldset>


                <footer>
                  <button type="button" class="btn btn-primary" @click="submitForm">
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
  import FormInput from '@/components/compos/form-input'

  export default{
    data: function () {
      return {
        form: {
          info: {
            id: '',
            name: '',
            key: '',
            status: '',
            submit_addr: '',
            method: '',
          },
          inputs: []
        },
      }
    },
    created: function () {

      this.form.info.id = this.$route.params.id

      //发送数据请求
      this.refreshData()
    },
    computed: {
      formData: function () {
        let o = {}
        let inputs = this.form.inputs
        for (let i in inputs) {
          if (inputs[i].status == 1) {
            o[inputs[i].name] = inputs[i].value
          }
        }
        return o
      }
    },
    methods: {
      refreshData: function () {
        //发送数据请求
        this.$http(_.merge({}, Action.Form.Input.list, {
          url: Helper.FG.setParams(Action.Form.Input.list.url, {id: this.form.info.id}),
        })).then(response => {
          let $form = response.body

          this.form.inputs = $form.inputs
          Helper.FG.setValueToObject(this.form.info, $form)

        }, response => {})
      },
      submitForm: function () {
        this.$http({
          method: this.form.info.method || 'GET',
          url: Helper.FG_CONFIG.host + this.form.info.submit_addr,
          body: this.formData
        }).then(response => {
          alert('SUCCESS : ' + JSON.stringify(response.body))
        }, response => {
          alert(response.body)
        })
      },
      navBack: Helper.Nav.back
    },
    components: {
      FormInput
    }
  }

</script>
