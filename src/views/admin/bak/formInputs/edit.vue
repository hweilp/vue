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
            <h2>编辑表单字段域</h2>

          </header>

          <!-- widget div-->
          <div>

            <!-- widget content -->
            <div class="widget-body no-padding">

              <form class="smart-form">

                <header>
                  编辑字段域
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
                    <label class="label">默认值
                      <!--<a class="btn btn-primary btn-xs" @click="setDefaultValue">计算</a>-->
                    </label>
                    <label class="input">
                      <input type="text" class="input-sm" v-model=" input.value">
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

      <article class="col-md-6 col-xs-12">

        <!-- Widget ID (each widget will need unique ID)-->
        <div class="jarviswidget">
          <header>
            <span class="widget-icon"> <i class="fa fa-edit"></i> </span>
            <h2>编辑字段值</h2>
          </header>
          <!-- widget div-->
          <div>

            <!-- widget content -->
            <div class="widget-body no-padding">

              <form class="smart-form">

                <header>
                  字段值列表
                  <a class="btn btn-primary btn-xs" @click="addNewInputValue"><i class="fa fa-plus"></i>新增</a>
                </header>

                <fieldset class="col col-xs-12">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th width="50px">序号</th>
                      <th>键值</th>
                      <th>展示名称</th>
                      <th>默认选中</th>
                      <th width="100px">排序 <a class="btn btn-primary btn-xs" @click="sortBy"><i class="fa fa-sort"></i>
                        排序</a></th>
                      <th>状态</th>
                      <th width="150px">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr :class="{inEdit:value.notSaved}" v-for="(value,key,index) in input.values">
                      <td>{{value.id}}</td>

                      <td v-if="value.notSaved">
                        <input type="text" v-model="value.value">
                      </td>
                      <td v-else>{{value.value}}</td>

                      <td v-if="value.notSaved">
                        <input type="text" v-model="value.name">
                      </td>
                      <td v-else>{{value.name}}</td>

                      <td v-if="value.notSaved">
                        <select v-model="value.is_choiced">
                          <option value="1">选中</option>
                          <option value="2">不选中</option>
                        </select>
                      </td>
                      <td v-else>{{(value.is_choiced == 1) ? '选中' : ''}}</td>

                      <td v-if="value.notSaved">
                        <input type="text" v-model="value.order">
                      </td>
                      <td v-else>{{value.order}}</td>


                      <td v-if="value.notSaved">
                        <select v-model="value.status">
                          <option value="1">启用</option>
                          <option value="2">禁用</option>
                        </select>
                      </td>
                      <td v-else>{{(value.status == 1) ? '启用' : '禁用'}}</td>
                      <td>
                        <template v-if="value.notSaved">
                          <a class="btn btn-primary btn-xs" @click="saveNewInputValue(value)"><i
                            class="fa fa-save"></i> 保存</a>
                          <a class="btn btn-primary btn-xs" @click="cancelOperate(value,key)"><i
                            class="fa fa-save"></i> 取消</a>
                        </template>
                        <template v-else>
                          <a class="btn btn-primary btn-xs" @click="editNewInputValue(value)"><i
                            class="fa fa-edit"></i> 编辑</a>
                        </template>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </fieldset>
                <div class="fg-clear"></div>


                <footer>
                  <!--<button type="submit" class="btn btn-primary">-->
                  <!--确认-->
                  <!--</button>-->
                  <!--<button type="button" class="btn btn-default" @click="navBack($router,-1)">-->
                  <!--返回-->
                  <!--</button>-->
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
          id: '',
          form_id: '',
          type_id: '',
          name: '',
          label: '',
          id_name: '',
          class: '',
          placeholder: '',
          value: '',
          order: 0,
          status: 1,
          values: []
        },
        inputTypes: []
      }
    },
    created: function () {
      this.input.id = this.$route.params.id

      this.$http(Action.FormInputType.list).then(response => {
        this.inputTypes = response.body
      }, response => {

      })
      //发送数据请求
      this.initForm()

    },
    watch: {
      'input.values': {
        handler: function (val, oldVal) {
//          this.setDefaultValue()
        },
      }
    },
    methods: {
      navBack: Helper.Nav.back,
      submitForm: function (form) {
        this.$http(_.merge({}, Action.FormInput.update, {
          url: Helper.FG.setParams(Action.FormInput.update.url, {id: this.input.id}),
          body: this.input
        })).then(response => {
          this.$router.push({
            path: '/form/' + this.input.form_id + '/formInput'
          })
        }, response => {
          alert(response.body)
        })
      },
      initForm: function () {
        //发送数据请求
        this.$http(_.merge({}, Action.FormInput.get, {
          url: Helper.FG.setParams(Action.FormInput.get.url, {id: this.input.id}),
        })).then(response => {

          Helper.FG.setValueToObject(this.input, response.body)

        }, response => {})

        //发送数据请求
        this.$http(_.merge({}, Action.FormInput.Value.list, {
          url: Helper.FG.setParams(Action.FormInput.Value.list.url, {id: this.input.id}),
        })).then(response => {
          this.input.values = response.body

        }, response => {})

      },
      addNewInputValue: function () {
        this.input.values.push({notSaved: true, input_id: this.input.id})
      },
      saveNewInputValue: function (value) {
        if (value.id) {
          //更新
          this.$http(_.merge({}, Action.FormInputValue.update, {
            url: Helper.FG.setParams(Action.FormInputValue.update.url, {id: value.id}),
            body: value
          })).then(response => {
            value.notSaved = false
          }, response => {
            console.log(response.body)
          })
        } else {
          //新增
          this.$http(_.merge({}, Action.FormInputValue.add, {
            url: Helper.FG.setParams(Action.FormInputValue.add.url, {id: value.id}),
            body: value
          })).then(response => {
            value.id = response.body.id
            value.notSaved = false
          }, response => {
            console.log(response.body)
          })
        }
      },
      editNewInputValue: function (value) {
        this.$set(value, 'notSaved', true)
      },
      cancelOperate: function (value, key) {
        value.notSaved = false
        if (!value.id) {
          this.input.values.splice(key, 1)
        }
      },
      sortBy: function () {
        this.input.values = _.orderBy(this.input.values, ['order'])
      },
      setDefaultValue: function () {
        if (this.input.type_id != 1) {
          let selectValues = _.filter(this.input.values, function (o) {
            return o.status == 1 && o.is_choiced == 1
          })
          let values = []
          for (let i in selectValues) {
            values.push(selectValues[i].value)
          }
          this.input.value = _.join(values, '|')
        }
      }
    }
  }

</script>
