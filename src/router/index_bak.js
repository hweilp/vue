import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const Second = {template: '<div><h2>我是第 2 个子页面</h2></div>'}

// import products from '../views/admin/main.vue';
// import productAdd from '../views/admin/products/add.vue';

// 创建一个路由器实例
const routes = [

  //需要权限验证的
  {
    path: '/product',
    alias: '/',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    children: [
      {
        path: 'list',
        component: (resolve) => require(['../views/admin/products/list.vue'], resolve),
      },
      {
        path: 'add',
        component: (resolve) => require(['../views/admin/products/add.vue'], resolve),
      },
      {
        path: 'edit',
        component: (resolve) => require(['../views/admin/products/add.vue'], resolve),
      }
    ]
  },

  //类目管理
  {
    path: '/category',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    children: [
      {
        path: 'list',
        component: (resolve) => require(['../views/admin/categories/list.vue'], resolve),
      },
      {
        path: 'add',
        component: (resolve) => require(['../views/admin/categories/add.vue'], resolve),
      },
      {
        path: 'edit',
        component: (resolve) => require(['../views/admin/categories/add.vue'], resolve),
      }
    ]
  },

  //品牌管理
  {
    path: '/brand',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    children: [
      {
        path: 'list',
        component: (resolve) => require(['../views/admin/products/list.vue'], resolve),
      },
      {
        path: 'add',
        component: (resolve) => require(['../views/admin/products/add.vue'], resolve),
      },
      {
        path: 'edit',
        component: (resolve) => require(['../views/admin/products/add.vue'], resolve),
      }
    ]
  },

  //表单管理
  {
    path: '/form',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    children: [
      {
        path: 'list',
        component: (resolve) => require(['../views/admin/forms/list.vue'], resolve),
      },
      {
        path: 'add',
        component: (resolve) => require(['../views/admin/forms/add.vue'], resolve),
      },
      {
        path: 'edit/:id',
        component: (resolve) => require(['../views/admin/forms/edit.vue'], resolve),
      },
      {
        path: 'preview/:id',
        component: (resolve) => require(['../views/admin/forms/preview.vue'], resolve),
      },
      {
        path: ':id/formInput',
        component: (resolve) => require(['../views/admin/forms/formInputList.vue'], resolve),
      }
    ]
  },

  {
    path: '/formInput',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    children: [
      // {
      //   path: 'list',
      //   component: (resolve) => require(['../views/admin/forms/formInputList.vue'], resolve),
      // },
      {
        name: 'fromAddInput',
        path: 'add/:form_id',
        component: (resolve) => require(['../views/admin/formInputs/add.vue'], resolve),
      },
      {
        path: 'edit/:id',
        component: (resolve) => require(['../views/admin/formInputs/edit.vue'], resolve),
      },
    ]
  },

  //不需要权限验证的路由
  //登录页面
  {
    path: '/',
    component: (resolve) => require(['../views/admin/passport/passport.vue'], resolve),
    children: [
      // 当 /user/:id 匹配成功，
      // UserHome 会被渲染在 User 的 <router-view> 中
      {path: 'login', component: (resolve) => require(['../views/admin/passport/login.vue'], resolve)},

      // ...其他子路由
    ]
  },
]

export default new Router({
  mode: 'history',
  base: '/',
  routes
})
