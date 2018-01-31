<template>
  <header id="header">
    <el-row>
      <el-col :span="24" class="page-header">
        <el-button type="primary">LOGO图标</el-button>
        <span class="jxs-name">
          {{merchantName}}
        </span>

        <div class="header-right">
          <span class="jxs-id">
            员工号：{{merchantID}}
          </span>
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link">
              <el-button size="small"><i class="fa fa-windows"></i> 系统功能</el-button>
            </span>
            <el-dropdown-menu slot="dropdown" class="header-link-dropdown-menu">
              <el-dropdown-item>
                <router-link to="/" class="header-link"><i class="fa fa-home"></i> 返回首页</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/system/updatePasswords" class="header-link"><i class="fa fa-key"></i> 修改密码</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link to="/" class="header-link"><i class="fa fa-gear"></i> 系统配置</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="danger" @click="safeQuitDialog = true" size="small">安全退出</el-button>
          <el-dialog
            title="确认退出"
            :visible.sync="safeQuitDialog"
            size="tiny"
            :before-close="handleClose">
            <span>确认退出登录？</span>
            <span slot="footer" class="dialog-footer">
              <el-button  @click="safeQuitDialog = false">取 消</el-button>
              <el-button type="primary" @click="logout">登 出</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<style lang="scss" scoped>

  @import "../../assets/admin/css/main/param";

  .page-header {
    padding: 10px 20px;
    background-color: #202d3d;
    color: #fff;
  }

  .jxs-name {
    color: #fff;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    font-size: 16px;
    display: inline-block;
  }

  .jxs-id {
    font-size: $header-light-font-size;
    color: $header-light-font-color;
    margin-right: 20px;
  }

  .header-right {
    display: inline-block;
    float: right;
    line-height: 40px;
    height: 40px;
  }

  .header-link-dropdown-menu {
    top: 55px !important;
    > li {
      font-size: 14px;
      line-height: 26px;
      margin-top: 4px;
      margin-bottom: 4px;
      &:hover {
        background-color: transparent;
        padding: 0 5px;
        > a {
          background-color: dodgerblue;
          color: #fff;
        }
      }
      > a {
        text-decoration: none;
        text-align: center;
        width: 100%;
        display: inline-block;
        color: #000;
      }
    }
  }

  .el-dropdown {
    color: #fff;
    margin-right: 20px;
  }

  .header-link {
  }

</style>
<script type="text/javascript">
  import Action from '@/assets/admin/resource/actions.js'
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        safeQuitDialog: false,
        merchantID:'',
        merchantName:""
      }
    },
    created:function () {
      if(this.$store.state.User.merchantID == null || this.$store.state.User.merchantName == null){
        this.getUserInfo()
      }else {
        this.merchantID = this.$store.state.User.merchantID
        this.merchantName = this.$store.state.User.merchantName
      }
      if(this.$store.state.User.power == null || this.$store.state.User.power.length <= 0 ){
        this.getUserPower()
      }

    },
    methods: {
      ...mapMutations(['User/INIT_USER_INFO']),
      ...mapMutations(['User/INIT_USER_POWER']),
      handleClose(done){
        done();
      },
      getUserInfo : function () {
        this.$http(this.$_.merge({timeout: 3000,}, Action.Passport.userInfo)).then(response => {
          this.merchantID = response.body.empNo
          this.merchantName = response.body.name
          this.merchantMID = response.body.id
          this['User/INIT_USER_INFO']({merchantName:response.body.name,merchantID:response.body.empNo,merchantMID:response.body.id})
          this.$store.dispatch('User/userInfo', response);
          //发送结果
          this.$emit('finish', true)
        }, response => {
          this.$emit('finish', false)
        })
      },
      getUserPower(){
        this.$http(this.$_.merge({timeout: 3000,}, Action.Power.list)).then(response => {
          this['User/INIT_USER_POWER'](response.body)
          this.$store.dispatch('User/userPower', response.body);
          //发送结果
          this.$emit('finish', true)
        }, response => {
          this.$emit('finish', false)
        })
      },
      logout: function () {
        this.$http(this.$_.merge({timeout: 3000,}, Action.Passport.doLogout)).then(response => {
//              this['User/SET_USER_SESSION'](response.body.sessionId)
          this.$store.dispatch('User/userLogout', response);

          let message = response.body.resultMessage || '登出成功';
          this.$message({
            type: 'success',
            message: message
          });

          //发送结果
          this.$emit('finish', true)
        }, response => {
          let message = response.body || '登出失败，请求超时';
          this.$message.error(message)

          //发送结果
          this.$emit('finish', false)
        })
        this.safeQuitDialog = false
        this.$router.push('/login')
      }
    }
  }


</script>
