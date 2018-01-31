import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 创建一个路由器实例
const routes = [

  //需要权限验证的
  {
    path: '/product',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    meta:{
      auth:true
    },
    children: [
      {
        path: 'list',
        component: (resolve) => require(['../views/admin/products/list.vue'], resolve),
        meta:{auth:true},
      },
      {
        path: 'add',
        component: (resolve) => require(['../views/admin/products/add.vue'], resolve),
        meta:{auth:true},
      },
      {
        path: 'edit',
        component: (resolve) => require(['../views/admin/products/edit.vue'], resolve),
        meta:{auth:true},
      },
      {
        path: 'category',
        component: (resolve) => require(['../views/admin/products/category.vue'], resolve),
        meta:{
          auth:true
        },
      },
      {
        path: 'category2',
        component: (resolve) => require(['../views/admin/products/category2.vue'], resolve),
        meta:{
          auth:true
        },
      },
      {
        path: 'brand',
        component: (resolve) => require(['../views/admin/products/brand.vue'], resolve),
        meta:{auth:true},
      },
      {
        path: 'unit',
        component: (resolve) => require(['../views/admin/products/unit.vue'], resolve),
        meta:{
          auth:true
        },
      },
      {
        path: 'info',
        component: (resolve) => require(['../views/admin/products/info.vue'], resolve),
        meta:{
          auth:true
        },
      },
      {
        path: 'set',
        component: (resolve) => require(['../views/admin/products/set.vue'], resolve),
        meta:{auth:true},
      }
    ]
  },
  //需要权限验证的
  {
    path: '/category',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    meta:{auth:true},
    children: [
      {
        path: '',
        component: (resolve) => require(['../views/admin/categories/list.vue'], resolve),
      },
      {
        path: 'list',
        component: (resolve) => require(['../views/admin/categories/list.vue'], resolve),
      }
    ]
  },

  //需要权限验证的
  {
    path: '/test',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    children: [
      {
        path: 'productSelect',
        component: (resolve) => require(['../views/admin/test/productSelect.vue'], resolve),
      }]
  },
  {
    path: '/form',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    children: [
      {
        path: '',
        component: (resolve) => require(['../views/admin/form/list.vue'], resolve),
      },
      {
        path: 'list',
        component: (resolve) => require(['../views/admin/form/list.vue'], resolve),
      }
    ]
  },
  {
    path: '/score',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    meta:{auth:true},
    children: [
      { path: 'goods',
        component: (resolve) => require(['../views/admin/scoreManage/goods.vue'], resolve),
        meta:{auth:true},
      },

      { path: 'detail',
        component: (resolve) => require(['../views/admin/scoreManage/detail.vue'], resolve),
        meta:{auth:true},
      },
      {path: 'goods', component: (resolve) => require(['../views/admin/scoreManage/goods.vue'], resolve),meta:{auth:true},},

      {path: 'detail', component: (resolve) => require(['../views/admin/scoreManage/detail.vue'], resolve),meta:{auth:true}},
      {
        path: 'exchangeFormRecord',
        component: (resolve) => require(['../views/admin/scoreManage/exchangeFormRecord.vue'], resolve),meta:{auth:true}
      },
      {path: 'setUp',
        component: (resolve) => require(['../views/admin/scoreManage/setUp.vue'], resolve),meta:{auth:true}
      },
      {path: 'scoreAccount',
        component: (resolve) => require(['../views/admin/scoreManage/scoreAccount.vue'], resolve),meta:{auth:true}
      },

      {
        path: 'exchangeFormDetail',
        component: (resolve) => require(['../views/admin/scoreManage/exchangeFormDetail.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'scoreGoodsInvoiceList',
        component: (resolve) => require(['../views/admin/scoreManage/scoreGoodsInvoiceList.vue'], resolve),meta:{auth:true}
      },
      { path: 'scoreGoodsInvoiceDetail',
        component: (resolve) => require(['../views/admin/scoreManage/scoreGoodsInvoiceDetail.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'platformExchangeRecord',
        component: (resolve) => require(['../views/admin/scoreManage/platformExchangeRecord.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'exchangePlatformDetail',
        component: (resolve) => require(['../views/admin/scoreManage/platformExchangeDetail.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'platformScoreGoods',
        component: (resolve) => require(['../views/admin/scoreManage/platformScoreGoods.vue'], resolve),meta:{auth:true}
      },

    ]
  },


  {
    path: '/orderManage',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    meta:{auth:true},
    children: [
      {
        path: 'orderList',
        component: (resolve) => require(['../views/admin/orderManage/orderList.vue'], resolve),
        meta:{auth:true}

      },
      {
        path: 'invoiceList',
        component: (resolve) => require(['../views/admin/orderManage/invoiceList.vue'], resolve),
        meta:{auth:true}
      },
      {
        path: 'returnGoods',
        component: (resolve) => require(['../views/admin/orderManage/returnGoods.vue'], resolve),
        meta:{auth:true}
      },
      {
        path: 'orderDetail',
        component: (resolve) => require(['../views/admin/orderManage/orderDetail.vue'], resolve),
        meta:{auth:true}
      },
      {
        path: 'invoiceDetail',
        component: (resolve) => require(['../views/admin/orderManage/invoiceDetail.vue'], resolve),
        meta:{auth:true}
      },
      {
        path: 'chargeBackDetail',
        component: (resolve) => require(['../views/admin/orderManage/chargeBackDetail.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'addLineBelowOrder',
        component: (resolve) => require(['../views/admin/orderManage/addLineBelowOrder.vue'], resolve),meta:{auth:true}
      },

      // 平台订单
      {
        path: 'platformOrderList',
        component: (resolve) => require(['../views/admin/orderManage/platformOrderList.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'platformOrderDetail',
        component: (resolve) => require(['../views/admin/orderManage/platformOrderDetail.vue'], resolve),meta:{auth:true}
      },

    ]
  },
  {
    path: '/salesPromotion',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),meta:{auth:true},
    children: [
      {
        path: '',
        component: (resolve) => require(['../views/admin/salesPromotion/salesPromotion.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'add',
        component: (resolve) => require(['../views/admin/salesPromotion/newAdd.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'plan',
        component: (resolve) => require(['../views/admin/salesPromotion/plan.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'activity',
        component: (resolve) => require(['../views/admin/salesPromotion/activity.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'collect',
        component: (resolve) => require(['../views/admin/salesPromotion/collect.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'detail',
        component: (resolve) => require(['../views/admin/salesPromotion/detail.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'edit',
        component: (resolve) => require(['../views/admin/salesPromotion/edit.vue'], resolve),meta:{auth:true}
      },

    ]
  },
  {
    path: '/vipManage',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),meta:{auth:true},
    children: [
      {
        path: 'category',
        component: (resolve) => require(['../views/admin/vipManage/category.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'material',
        component: (resolve) => require(['../views/admin/vipManage/material.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'add',
        component: (resolve) => require(['../views/admin/vipManage/add.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'edit',
        component: (resolve) => require(['../views/admin/vipManage/edit.vue'], resolve),meta:{auth:true}
      }
    ]
  },
  {
    path: "/purchase",
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),meta:{auth:true},
    children: [
      {
        path: "supplierFile",
        component: (resolve) => require(['../views/admin/purchase/supplierFile.vue'], resolve),meta:{auth:true}
      },
      {
        path: "purchaseSet",
        component: (resolve) => require(['../views/admin/purchase/purchaseSet.vue'], resolve),meta:{auth:true}
      },
      {
        path: "order",
        component: (resolve) => require(['../views/admin/purchase/order.vue'], resolve),meta:{auth:true}
      },
      {
        path: "takeGoods",
        component: (resolve) => require(['../views/admin/purchase/takeGoods.vue'], resolve),meta:{auth:true}
      },
      {
        path: "dateCollect",
        component: (resolve) => require(['../views/admin/purchase/dateCollect.vue'], resolve),meta:{auth:true}
      },
      {
        path: "monthCollect",
        component: (resolve) => require(['../views/admin/purchase/monthCollect.vue'], resolve),meta:{auth:true}
      },
      {
        path: "categoryCollect",
        component: (resolve) => require(['../views/admin/purchase/categoryCollect.vue'], resolve),meta:{auth:true}
      },
      {
        path: "brandCollect",
        component: (resolve) => require(['../views/admin/purchase/brandCollect.vue'], resolve),meta:{auth:true}
      },
      {
        path: "supplierCollect",
        component: (resolve) => require(['../views/admin/purchase/supplierCollect.vue'], resolve),meta:{auth:true}
      },
      {
        path: "DetailCollect",
        component: (resolve) => require(['../views/admin/purchase/DetailCollect.vue'], resolve),meta:{auth:true}
      },
      {
        path: "purshaseAdd",
        component: (resolve) => require(['../views/admin/purchase/purshaseAdd.vue'], resolve),meta:{auth:true}
      }

    ]
  },
  {
    path: "/stock",
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),meta:{auth:true},
    children: [
      {
        path: "enterStockManage",
        component: (resolve) => require(['../views/admin/stockManage/enterStockManage.vue'], resolve),meta:{auth:true}
      },
      {
        path: "enterStockAdd",
        component: (resolve) => require(['../views/admin/stockManage/enterStockAdd.vue'], resolve),meta:{auth:true}
      },
      {
        path: "enterStockEdit",
        component: (resolve) => require(['../views/admin/stockManage/enterStockEdit.vue'], resolve),meta:{auth:true}
      },
      {
        path: "outStockManage",
        component: (resolve) => require(['../views/admin/stockManage/outStockManage.vue'], resolve),meta:{auth:true}
      },
      {path: 'outStockAdd', component: (resolve) => require(['../views/admin/stockManage/outStockAdd.vue'], resolve),meta:{auth:true}},
      {path: 'outStockEdit', component: (resolve) => require(['../views/admin/stockManage/outStockEdit.vue'], resolve),meta:{auth:true}},

      {
        path: "shiftStockManage",
        component: (resolve) => require(['../views/admin/stockManage/shiftStockManage.vue'], resolve),meta:{auth:true}
      },
      {path: "stockCheck", component: (resolve) => require(['../views/admin/stockManage/stockCheck.vue'], resolve),meta:{auth:true}},
      {path: "stockCost", component: (resolve) => require(['../views/admin/stockManage/stockCost.vue'], resolve),meta:{auth:true}},
      {
        path: "outEnterStockDetail",
        component: (resolve) => require(['../views/admin/stockManage/outEnterStockDetail.vue'], resolve),meta:{auth:true}
      },
      {
        path: "stockSummary",
        component: (resolve) => require(['../views/admin/stockManage/stockSummary.vue'], resolve),meta:{auth:true}
      },
      {
        path: "outEnterStockMonthCollect",
        component: (resolve) => require(['../views/admin/stockManage/outEnterStockMonthCollect.vue'], resolve),meta:{auth:true}
      },
      {path: "expireShop", component: (resolve) => require(['../views/admin/stockManage/expireShop.vue'], resolve),meta:{auth:true}},
      {
        path: 'enterStockManageAdd',
        component: (resolve) => require(['../views/admin/stockManage/stockNewAdd.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'shiftStockManageAdd',
        component: (resolve) => require(['../views/admin/stockManage/shiftStockManageAdd.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'stockCheckAdd',
        component: (resolve) => require(['../views/admin/stockManage/stockCheckAdd.vue'], resolve),meta:{auth:true}
      },
      {
        path: 'stockCheckEdit',
        component: (resolve) => require(['../views/admin/stockManage/stockCheckEdit.vue'], resolve),meta:{auth:true}
      }

    ]
  },

  {
    path: '/system',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),meta:{auth:true},
    children: [
      // 当 /user/:id 匹配成功，
      // UserHome 会被渲染在 User 的 <router-view> 中
      {path: 'basicInfo', component: (resolve) => require(['../views/admin/system/basicInfo.vue'], resolve),meta:{auth:true}},
      {path: 'accountBind', component: (resolve) => require(['../views/admin/system/accountBind.vue'], resolve),meta:{auth:true}},
      {
        path: 'updatePasswords',
        component: (resolve) => require(['../views/admin/system/updatePasswords.vue'], resolve),meta:{auth:true}
      },
      {path: 'resetPasswords', component: (resolve) => require(['../views/admin/system/resetPasswords.vue'], resolve),meta:{auth:true}},

      {path: 'merchantInfo', component: (resolve) => require(['../views/admin/system/merchantInfo.vue'], resolve),meta:{auth:true}},
      {path: 'parameterSet', component: (resolve) => require(['../views/admin/system/parameterSet.vue'], resolve),meta:{auth:true}},
      //
      {path: 'staff', component: (resolve) => require(['../views/admin/system/staff.vue'], resolve),meta:{auth:true}},
      {path: 'staffAdd', component: (resolve) => require(['../views/admin/system/staffAdd.vue'], resolve),meta:{auth:true}},
      {path: 'staffEdit', component: (resolve) => require(['../views/admin/system/staffEdit.vue'], resolve),meta:{auth:true}},
      {path: 'role', component: (resolve) => require(['../views/admin/system/role.vue'], resolve),meta:{auth:true}},
      {path: 'roleAdd', component: (resolve) => require(['../views/admin/system/roleAdd.vue'], resolve),meta:{auth:true}},
      {path: 'roleEdit', component: (resolve) => require(['../views/admin/system/roleEdit.vue'], resolve),meta:{auth:true}},
      {path: 'rolePower', component: (resolve) => require(['../views/admin/system/rolePower.vue'], resolve),meta:{auth:true}},
      {path: 'power', component: (resolve) => require(['../views/admin/system/power.vue'], resolve),meta:{auth:true}},
      {path: 'oprLog', component: (resolve) => require(['../views/admin/system/oprLog.vue'], resolve),meta:{auth:true}},

      {path: 'merchantAccount', component: (resolve) => require(['../views/admin/account/merchantAccount.vue'], resolve),meta:{auth:true}},
      {path: 'merchantAccountLog', component: (resolve) => require(['../views/admin/account/merchantAccountLog.vue'], resolve),meta:{auth:true}},
      {path: 'merchantCashLog', component: (resolve) => require(['../views/admin/account/merchantCashLog.vue'], resolve),meta:{auth:true}},
      {path: 'merchantRechargeLog', component: (resolve) => require(['../views/admin/account/merchantRechargeLog.vue'], resolve),meta:{auth:true}}


      // ...其他子路由

    ]
  },
  {
    path: '/form',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    children: [
      // 当 /user/:id 匹配成功，
      // UserHome 会被渲染在 User 的 <router-view> 中
      {path: '', component: (resolve) => require(['../views/admin/system/system.vue'], resolve)},
      {path: 'list', component: (resolve) => require(['../views/admin/form/list.vue'], resolve)}


      // ...其他子路由
    ]
  },

  //不需要权限验证
  // 的路由

  {
    path: '/',
    component: (resolve) => require(['../views/admin/admin.vue'], resolve),
    children: [
      // 当 /user/:id 匹配成功，
      // UserHome 会被渲染在 User 的 <router-view> 中
      {path: 'index', name: 'index', component: (resolve) => require(['../views/admin/home/index.vue'], resolve)}
      // ...其他子路由
    ]
  },
  //登录页面

  {
    path: '/login', name: 'login', component: (resolve) => require(['../views/admin/passport/login.vue'], resolve)
  },

]


// export default new Router({
//   mode: 'history',
//   base: '/',
//   routes
// })
export default routes;
