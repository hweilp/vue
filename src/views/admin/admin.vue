<template>
  <div>
    <!-- PAGE HEADER -->
    <page-header ref="page-header"></page-header>

    <!-- MENU LEFT -->
    <left-menu ref="left-menu"></left-menu>


    <transition name="slide-fade">
      <div class="main" :style="{height:mainLayer.height}">
        <router-view></router-view>
      </div>
    </transition>

    <!-- PAGE FOOTER -->
    <page-footer ref="page-footer"></page-footer>

    <!-- END PAGE FOOTER -->
  </div>
</template>
<style lang="scss" scoped>


  .slide-fade-enter-active {
    transition: all .3s ease;
    transition-delay: .1s;
  }

  .slide-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }

  .slide-fade-leave-active {
    display: none;
  }

  .main {
    background-color: #f1f2f7;
    padding: 10px;
  }
</style>

<script type="text/javascript">

  import leftMenu from '@/components/layouts/leftMenu.vue'
  import pageFooter from '@/components/layouts/footer.vue'
  import pageHeader from '@/components/layouts/header.vue'
  import Storage from '@/libs/storage'

  export default {
    data: function () {
      return {
        mainLayer: {
          height: '0px'
        }
      }
    },
    beforeCreate: function () {

      //TODO
      // 1：尝试从VUEX中获取 sessionId
      // 2：尝试从本地存储中获取 sessionId
      // 3：返回获取失败
      let sessionId

      if (!this.$store.state.sessionId) {
        if (sessionId = Storage.get('MSSID')) {
          this.$store.commit('User/SET_USER_SESSION', sessionId);
        } else {
          this.$router.push('/login')
        }
      }

    },
    created: function () {

    },
    mounted: function () {
//      this.$nextTick(() => {
//        let pageHeaderHeight = this.$refs['page-header'].$el.clientHeight;
//        let mainMenuHeight = this.$refs['left-menu'].$el.clientHeight;
//        this.mainLayer.height = (document.body.clientHeight - pageHeaderHeight - mainMenuHeight) + 'px'
//      })
    },
    methods: {},
    components: {
      leftMenu,
      pageFooter,
      pageHeader
    }
  }
</script>
