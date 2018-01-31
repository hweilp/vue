/**
 * 商户管理接口管理
 */


import Servers from '@/config/server.js'
//商户
let MerchantManage = Servers.Merchant.BackEnd.remoteAddr()
//图片服务
let ImgUploadServer = Servers.ImgUpload.BackEnd.remoteAddr()
//平台
let PlatformManage = Servers.PlatformManage.BackEnd.remoteAddr()


let Actions = {

  Menu:{
    initMenu: {
      method: 'GET',
      url : MerchantManage + '/api/merchant/manage/vm/employee/menu'
    },
  },

  Power:{
    list:{
      method:"GET",
      url:MerchantManage+'/api/merchant/manage/vm/employee/privilege'
    }
  },
  //登录
  Passport: {
    doLogin: {
      emulateJSON: true,
      method: 'POST',
      url: MerchantManage + '/api/merchant/login'
    },
    doLogout: {
      emulateJSON: true,
      method: 'POST',
      url: MerchantManage + '/api/merchant/logout'
    },

    getPictureCode : {
      method: 'GET',
      url: MerchantManage + '/api/merchant/common/captach'
    },
    getValidCode:{
      emulateJSON: true,
      method: 'POST',
      url: MerchantManage + '/api/merchant/manage/employee/forget/pwd/validateCode'
    },
    forgetPwdSubmit:{
      emulateJSON: true,
      method: 'PUT',
      url: MerchantManage + '/api/merchant/manage/employee/forget/pwd/reset'
    },
    userInfo:{
      method: 'GET',
      url: MerchantManage + '/api/merchant/manage/vm/merchant/view'
    }
  },
  //图片上传
  imgUpload: {
    upload: ImgUploadServer + "/uploadfile/upload",
    remove: {
      emulateJSON: true,
      method: 'DELETE',
      url: ImgUploadServer + '/uploadfile/remove'
    },
    site: ImgUploadServer
  },
  //省市区编码
  areaCode: {
    listProvince: {
      method: 'GET',
      url: MerchantManage + '/api/merchant/manage/areacode/province'
    },
    listCity: {
      method: 'GET',
      url: MerchantManage + '/api/merchant/manage/areacode/city/{provinceCode}'
    },
    listArea: {
      method: 'GET',
      url: MerchantManage + '/api/merchant/manage/areacode/area/{cityCode}'
    },
  },
  //商品管理
  Product: {
    Category: {
      //查询-获取商户商品分类一级分类数据
      topLevel: {
        method: 'GET', url: MerchantManage + "/api/merchant/manage/vm/commodity/category/top/level"
      },
      //将商户商品分类列表组装为Tree
      fetchTree: {
        method: 'GET', url: MerchantManage + "/api/merchant/manage/vm/commodity/category/tree"
      },
      //查询-分页查询商户商品分类信息
      list: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/category/page'
      },
      //修改-修改商户商品分类信息
      update: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/category'
      },
      //新增-保存商户商品分类信息
      add: {
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/category'
      },
      //删除-更新商户商品分类状态
      delete: {
        emulateJSON: true,
        method: 'DELETE',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/category'
      }
    },
    Unit: {
      //查询-分页查询商户商品单位信息
      list: {
        method: "GET",
        url: MerchantManage + "/api/merchant/manage/vm/commodity/unit/page"
      },
      //新增-保存商户商品单位信息
      add: {
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/unit'
      },
      //修改-修改商户商品单位信息
      update: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/unit'
      },
      //删除-批量删除商户商品单位信息
      delete: {
        emulateJSON: true,
        method: 'DELETE',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/unit'
      }
    },
    Brand: {
      //查询-分页查询商户商品品牌信息
      list: {
        method: "GET",
        url: MerchantManage + "/api/merchant/manage/vm/commodity/brand/page"
      },
      //新增-保存商户商品品牌信息
      add: {
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/brand'
      },
      //修改-修改商户商品品牌信息
      update: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/brand'
      },
      //删除-批量更新商品品牌状态
      delete: {
        emulateJSON: true,
        method: 'DELETE',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/brand'
      }
    },
    Info: {
      list: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/commoidty/page'
      },
      singleBasic: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/commoidty/{pno}'
      },
      singleDetail: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/commoidty/detail/{pno}'
      },
      update: {
        // method: 'PUT', url: MerchantManage + '/product/{id}'
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/commoidty'
      },
      add: {
        // method: 'POST', url: MerchantManage + '/product'
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/commoidty'
      },
      upShelves: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/commoidty/upShelves'
      },
      downShelves: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/commoidty/downShelves'
      },
      addDetail: {
        // method: 'POST', url: MerchantManage + '/product'
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/commoidty/detail'
      },
      updateDetail: {
        // method: 'POST', url: MerchantManage + '/product'
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/commoidty/detail'
      },
      supplierList: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/supplier/list'
      },
      brandList: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/brand/list'
      },
      categoryList: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/category/list'
      },
      unitList: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/commodity/unit/list'
      }

    },
  },
  //积分管理
  Score: {
    //积分商品
    scoreCommodity:{
      list:{
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/gift/page'
      },
      add:{
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/gift'
      },
      edit:{
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/gift'
      },
      delete:{
        emulateJSON: true,
        method: 'DELETE',
        url: MerchantManage + '/api/merchant/manage/vm/gift'
      },
      //上架
      upShelves:{
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/gift/onSale'
      },
      //下架
      downShelves:{
        emulateJSON: true,
        method: 'DELETE',
        url: MerchantManage + '/api/merchant/manage/vm/gift'
      }
    },
    //积分设置
    setUp: {
      rule: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/integralRule'
      },
      updateRule: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/integralRule'
      },
    },
    exchangeRecord:{
      //查询积分商品列表
      list: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/giftOrder/page'
      },
      audit:{
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/giftOrder/auditPass/{id}'
      },
      detail:{
        emulateJSON: true,
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/giftOrder/{tid}'
      },
      delete:{
        emulateJSON: true,
        method: 'DELETE',
        url: MerchantManage + '/api/merchant/manage/vm/giftOrder/remove'
      },
      //配送信息编辑
      dispatchInfoEdit:{
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/giftOrder/shippingAddress'
      },

      giftOrderDetail:{
        emulateJSON: true,
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/giftOrderDetail/tid/{id}'
      },
      createInvoice:{
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/giftInvoice'
      }
    },
    scoreGoodsInvoice:{
      list: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/giftInvoice/page'
      },
      doInvoice:{
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/giftInvoice/confirmSend'
      },
      add:{
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/giftInvoice'
      },
      detail:{
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/giftInvoice/{id}'
      },
      //配送信息编辑
      shippingAddressEdit:{
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/giftInvoice/shippingAddress'
      },
      invoiceDetail:{
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/giftInvoice/shippingAddress/{id}'
      }
    },
    scoreAccount:{
      merchantIntegralAccount:{
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/merchantIntegralAccount'
      },
      merchantIntegralFlow:{
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/merchantIntegralFlow/page'
      }
    },
    platformGiftOrder:{
      list:{
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/platformGiftOrder/page'
      },
      detail:{
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/platformGiftOrder/{tid}'
      }
    }
  },
  //订单管理
  Order: {
    OrderList: {
      list: {
        method: 'GET',
        url: MerchantManage + "/api/merchant/manage/vm/tradeinfo/page"
      },
      orderDetail: {
        method: 'GET',
        url: MerchantManage + "/api/merchant/manage/vm/tradeinfo/detail/{tid}"
      },
      dispatchInfo: {
        method: 'GET',
        url: PlatformManage + "/api/shipping/address/view"
      },
      billInfo: {
        method: "GET",
        url: MerchantManage + "/api/merchant/tradeBillInfo/view"
      },
      costInfo: {
        method: "GET",
        url: MerchantManage + "/api/merchant/tradeInfo/expenses"
      },
      cancelOrder: {
        method: "GET",
        url: MerchantManage + "/api/merchant/manage/vm/tradeinfo/cancel/{tid}"
      },
      tradeBillInfoEdit: {
        emulateJSON: true,
        method: "PUT",
        url: MerchantManage + "/api/merchant/manage/vm/tradeinfo/bill"
      },
      tradeBillInfoAdd: {
       emulateJSON: true,
        method: "POST",
        url: MerchantManage + "/api/merchant/manage/vm/tradeinfo/bill"
      },
      dispatchInfoEdit: {
       emulateJSON: true,
        method: "PUT",
        url: MerchantManage + "/api/merchant/manage/vm/tradeinfo/address"
      },
      //查看订单未发货商品
      InvoiceCommditys:{
        method:"GET",
        url:MerchantManage + "/api/merchant/manage/vm/invoice/commditys/{tid}"
      },
      createInvoice:{
        emulateJSON: true,
        method:"POST",
        url:MerchantManage + "/api/merchant/manage/vm/invoice/{tid}"
      },
      // createInvoiceForm: {
      //  emulateJSON: true,
      //   method: "POST",
      //   url: MerchantManage + "/api/merchant/manage/invoice/{tid}"
      // }

    },
    OffLineOrderAdd: {
      orderAdd: {
        emulateJSON: true,
        method: "POST",
        url: MerchantManage + "/api/merchant/tradeInfo/save"
      },


    },
    InvoiceList: {
      list: {
        method: 'GET',
        url: MerchantManage + "/api/merchant/manage/vm/invoice/page"
      },
      detail: {
        method: 'GET',
        url: MerchantManage + "/api/merchant/manage/vm/invoice/detail/{id}"
      },
      invoiceViewInfo: {
        method: 'GET',
        url: MerchantManage + "/api/merchant/manage/vm/invoice/view/{id}"
      },
      addressInfoEdit: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + "/api/merchant/manage/vm/invoice/address"
      },
      doInvoice:{
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + "/api/merchant/manage/vm/invoice/do"
      }
    },
    returnGoodsList: {
      list: {
        method: 'GET',
        url: MerchantManage + "/api/merchant/manage/vm/chargeback/page"
      },
      detail: {
        method: 'GET',
        url: MerchantManage + "/api/merchant/manage/vm/chargeback/view/{id}"
      },
      Audit:{
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + "/api/merchant/manage/vm/chargeback/audit"
      },
      addressInfoEdit: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + "/api/merchant/manage/vm/invoice/address"
      },
      backMoney:{
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + "/api/merchant/manage/vm/chargeback/confirm"
      }

    },
    platformOrder:{
      list:{
        method: 'GET',
        url: MerchantManage +'/api/merchant/manage/vm/tradeinfo/platform/page'
      },
      detail:{
        method : "GET",
        url: MerchantManage + "/api/merchant/manage/vm/tradeinfo/platform/detail/{tid}"
      },

    }
  },
  //会员管理
  VipManage: {
    Category: {
      list: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/member/configure/page'
      },
      add: {
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/member/configure'
      },
      edit: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/member/configure'
      },
      delete: {
        emulateJSON: true,
        method: 'DELETE',
        url: MerchantManage + '/api/merchant/manage/vm/member/configure'
      }
    },
    Material: {
      list: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/member/page'
      },
      memberLevelList: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/member/level/list'
      }
    }

  },
  //库存管理
  Stock:{
    EnterStockManage: {
      employeeList:{
        method: 'GET', url: MerchantManage + '/api/merchant/manage/vm/employee/list'
      },
      list: {
        method: 'GET', url: MerchantManage + '/api/merchant/manage/vm/inOrder/page'
      },
      add:{
        emulateJSON: true, method: 'POST', url: MerchantManage + '/api/merchant/manage/vm/inOrder'
      },
      edit:{
        emulateJSON: true, method: 'PUT',  url: MerchantManage +'/api/merchant/manage/vm/inOrder'
      },
      audit:{
        emulateJSON: true,method: 'PUT', url: MerchantManage +'/api/merchant/manage/vm/inOrder/audit'
      },
      cancel:{
        emulateJSON: true,method: 'DELETE', url: MerchantManage +'/api/merchant/manage/vm/inOrder'
      },
      singleInoutOrder:{
        method: 'GET', url: MerchantManage + '/api/merchant/manage/vm/inOrder/page/detail'
      },

    },
    OuterStockManage: {
      employeeList:{
        method: 'GET', url: MerchantManage + '/api/merchant/manage/vm/employee/list'
      },
      list: {
        method: 'GET', url: MerchantManage + '/api/merchant/manage/vm/outOrder/page'
      },
      add:{
        emulateJSON: true, method: 'POST', url: MerchantManage + '/api/merchant/manage/vm/outOrder'
      },
      edit:{
        emulateJSON: true, method: 'PUT',  url: MerchantManage +'/api/merchant/manage/vm/outOrder'
      },
      audit:{
        emulateJSON: true,method: 'PUT', url: MerchantManage +'/api/merchant/manage/vm/outOrder/audit'
      },
      cancel:{
        emulateJSON: true,method: 'DELETE', url: MerchantManage +'/api/merchant/manage/vm/outOrder'
      },
      singleInoutOrder:{
        method: 'GET', url: MerchantManage + '/api/merchant/manage/vm/outOrder/page/detail'
      },

    },
    stockCheck:{
      list: {
        method: 'GET', url: MerchantManage + '/api/merchant/manage/vm/stockOrder/page'
      },
      add:{
        emulateJSON: true,method: 'POST', url: MerchantManage + '/api/merchant/manage/vm/stockOrder'
      },
      edit:{
        emulateJSON: true,method: 'PUT',  url: MerchantManage +'/api/merchant/manage/vm/stockOrder'
      },
      audit:{
        emulateJSON: true,method: 'PUT',  url: MerchantManage +'/api/merchant/manage/vm/stockOrder/audit'
      },
      cancel:{
        emulateJSON: true,method: 'DELETE',  url: MerchantManage +'/api/merchant/manage/vm/stockOrder'
      },
      singleStockOrder:{
        method: 'GET', url: MerchantManage + '/api/merchant/manage/vm/stockOrder/{tid}'
      }
    },
    stockSummary:{
      list: {
        method: 'GET', url: MerchantManage + '/api/merchant/manage/vm/stock/summary/page'
      },
      edit:{
        emulateJSON: true,method: 'PUT',  url: MerchantManage +'/api/merchant/manage/vm/stock/summary/stockWarn'
      }
    }
  },
  //系统管理
  System: {
    Staff: {
      roleList: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/role/list'
      },
      employeeList:{
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/employee/list'
      },
      list: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/employee/page'
      },
      update: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/employee'
      },
      add: {
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/employee'
      },
      delete: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/role'
      },

      updateStatus: {
        normal: {emulateJSON: true, method: 'PUT', url: MerchantManage + '/api/merchant/manage/vm/employee/updateStatus/normal'},
        close: {emulateJSON: true,method: 'PUT', url: MerchantManage + '/api/merchant/manage/vm/employee/updateStatus/close'},
        lock: {emulateJSON: true,method: 'PUT', url: MerchantManage + '/api/merchant/manage/vm/employee/updateStatus/lock'},
      },
      //获取单个员工信息
      detaile:{
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/employee/{empNo}'
      }
    },
    Role: {
      list: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/role/page'
      },
      update: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/role'
      },
      add: {
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/role'
      },
      delete: {
        emulateJSON: true,
        method: 'DELETE',
        url: MerchantManage + '/api/merchant/manage/vm/role'
      },
      //查询-查询角色权限树
      rolePrivilegeTree:{
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/privilege/rolePrivilegeTree'
      },
    },

    updatePasswords: {
      update: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/employee/updatePwd'
      },
      reset:{
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/employee/resetPwd/empNo/{mobile}'
      }
    },
    merchantInfo: {
      list: {
        method: 'GET', url: MerchantManage + '/api/merchant/info/view'
      },
      update: {
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/info/update'
      },
    },


    // 账户信息

    account : {
      info : {
        method: 'GET', url: MerchantManage + '/api/merchant/manage/merchant/account/list?mid='
      },
      accountLog : {
        method: 'GET', url: MerchantManage + '/api/merchant/manage/merchant/account/log/page'
      },
      accountCashLog: {
        method: 'GET', url: MerchantManage + '/api/merchant/manage/merchant/cash/flow/page'
      },
      accountRechargeLog: {
        method: 'GET', url: MerchantManage + '/api/merchant/manage/merchant/recharge/flow/page'
      }
    }
  },
  //供应商相关接口
  Purchase: {
    supplierFile: {
      list: {
        method: 'GET',
        url: MerchantManage + '/api/merchant/manage/vm/supplier/page'
      },
      add: {
        emulateJSON: true,
        method: 'POST',
        url: MerchantManage + '/api/merchant/manage/vm/supplier'
      },
      update: {
        emulateJSON: true,
        method: 'PUT',
        url: MerchantManage + '/api/merchant/manage/vm/supplier'
      },
      delete: {
        emulateJSON: true,
        method: 'DELETE',
        url: MerchantManage + '/api/merchant/manage/vm/supplier'
      }
    },
    DateCollect: {}
  },

}

export default Actions
