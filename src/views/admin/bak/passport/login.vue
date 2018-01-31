<template>
  <div>
    <header id="header">

      <div id="logo-group">
        <span id="logo"> Smart </span>
      </div>


    </header>

    <div id="main" role="main">

      <!-- MAIN CONTENT -->
      <div id="content" class="container">

        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">


          </div>
          <div class="col-xs-12 col-sm-12 col-md-5 col-lg-4">
            <div class="well no-padding">
              <form action="" id="login-form" class="smart-form client-form" onsubmit="return false">
                <header>
                  登录
                </header>

                <fieldset>

                  <section>
                    <label class="label">用户名</label>
                    <label class="input"> <i class="icon-append fa fa-user"></i>
                      <input type="email" name="email">
                      <b class="tooltip tooltip-top-right"><i class="fa fa-user txt-color-teal"></i>
                        Please enter email address/username</b></label>
                  </section>

                  <section>
                    <label class="label">密码</label>
                    <label class="input"> <i class="icon-append fa fa-lock"></i>
                      <input type="password" name="password">
                      <b class="tooltip tooltip-top-right"><i class="fa fa-lock txt-color-teal"></i> Enter your password</b>
                    </label>
                    <div class="note">
                      <!--<a href="forgotpassword.html">Forgot password?</a>-->
                    </div>
                  </section>

                  <!--<section>-->
                  <!--<label class="checkbox">-->
                  <!--<input type="checkbox" name="remember" checked="">-->
                  <!--<i></i>Stay signed in</label>-->
                  <!--</section>-->
                </fieldset>
                <footer>
                  <router-link to="/" class="btn btn-primary">登录</router-link>
                  <!--<button type="submit" class="btn btn-primary">-->
                  <!--登录-->
                  <!--</button>-->
                </footer>
              </form>

            </div>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>


<style lang="scss" scoped>

</style>

<script type="text/javascript">
  export default {
    data: function () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>
