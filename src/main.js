// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import routes from './router'

import lodash from '@/assets/vendors/lodash/lodash.js'

Vue.use(lodash)

import VueResource from 'vue-resource'

Vue.use(VueResource)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)


// 全局分页参数
Vue.prototype.paginationParams = {
  pageParams : {
    setting:{
      paginationShow: true,
      currentPage: 1,
      rows: 10,
    },

    info : {
      currentPage: 1,
      endIndex: 0,
      hasNext: false,
      hasPreview: false,
      pages: 0,
      rows: 5,
      startIndex: 0,
      total: 0,
      pageSizes : [5, 10, 20, 40],
      layout:'total, sizes, prev, pager, next, jumper',
    }
  }
}

import store from './store'

window._ = require('lodash');

Vue.config.productionTip = false


import VueRouter from "vue-router";

let router = new VueRouter({
  routes:routes,
  mode: 'history',
  base: '/',
});



router.beforeEach((to, from, next) => {
  if(to.meta.auth){
    if(store.state.User.sessionId){
      next()
    }else {
      next({
        path:"/login",
        query:{redirect : to.fullPath}
      })
    }
  }else {
    next()
  }

})


Vue.http.interceptors.push(function (request, next) {
  // // modify method
  // request.method = 'POST';
  //
  // // modify headers
  // request.headers.set('X-CSRF-TOKEN', 'TOKEN');
  // request.headers.set('Authorization', 'Bearer TOKEN');
  // console.log(`Request intercepted!`)
  // continue to next interceptor
  let sessionId = this.$store.state.User.sessionId;

  if (sessionId) {
    request.headers.set('MSSID', sessionId);
  }

  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
