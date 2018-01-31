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
            <h2>新增表单字段域</h2>

          </header>

          <!-- widget div-->
          <div>

            <!-- widget content -->
            <div class="widget-body no-padding">

              <form class="smart-form">

                <header>
                  新建字段域
                </header>

                <fieldset>

                  <section>
                    <label class="label">类型</label>
                    <label class="select">
                      <select class="input-sm" v-model="input.type_id">
                        <option value="">- 请选择 -</option>
                        <option v-for="type in inputTypes" :value="type.id">{{type.name}}</option>
                      </select> <i></i>
                    </label>
                  </section>
                  <section>
                    <label class="label">名称</label>
                    <label class="input">
                      <input type="text" class="input-sm" v-model="input.label">
                    </label>
                  </section>

                  <section>
                    <label class="label">字段的name</label>
                    <label class="input">
                      <input type="text" class="input-sm" v-model="input.name">
                    </label>
                  </section>

                  <section>
                    <label class="label">字段ID</label>
                    <label class="input">
                      <input type="text" class="input-sm" v-model="input.id_name">
                    </label>
                  </section>

                  <section>
                    <label class="label">字段CLASS</label>
                    <label class="input">
                      <input type="text" class="input-sm" v-model="input.class">
                    </label>
                  </section>


                  <section>
                    <label class="label">提示内容</label>
                    <label class="input">
                      <input type="text" class="input-sm" v-model="input.placeholder">
                    </label>
                  </section>


                  <section>
                    <label class="label">排序</label>
                    <label class="input">
                      <input type="text" class="input-sm" v-model="input.order">
                    </label>
                  </section>

                  <section>
                    <label class="label">默认值</label>
                    <label class="input">
                      <input type="text" class="input-sm" v-model="input.value">
                    </label>
                  </section>

                  <section>
                    <label class="label">状态</label>
                    <div class="inline-group">
                      <label class="radio">
                        <input type="radio" v-model="input.status" value="1">
                        <i></i>启用</label>
                      <label class="radio">
                        <input type="radio" v-model="input.status" value="2">
                        <i></i>禁用</label>
                    </div>
                  </section>

                </fieldset>


                <footer>
                  <button type="button" class="btn btn-primary" @click="submitForm(input)">
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
        input: {
          form_id: '',
          type_id: '',
          name: '',
          label: '',
          id_name: '',
          class: '',
          placeholder: '',
          value: '',
          order: 0,
          status: 1
        },
        inputTypes: []
      }
    },
    created: function () {
      this.input.form_id = this.$route.params.form_id
      this.$http(Action.FormInputType.list).then(response => {
        this.inputTypes = response.body
      }, response => {

      })
    },
    methods: {
      navBack: Helper.Nav.back,
      submitForm: function (form) {
        this.$http(_.merge({}, Action.FormInput.add, {
          body: this.input
        })).then(response => {
          this.$router.push({
            path: '/form/' + this.input.form_id + '/formInput'
          })
        }, response => {
          alert(response.body)
        })
      },
    }
  }

</script>
