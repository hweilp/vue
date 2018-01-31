/**
 * 分模块验证规则
 */
let Common={
  mobile: [
    {required: true, message: "请输入手机号", trigger: 'blur'},
    {pattern: /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/, message: "请输入有效的手机号", trigger: 'blur'}
  ],
  email: [
    {required: true, message: "请输入有效的邮箱", trigger: 'blur',type:'email'},
  ],
  certNo: [
    {required: true, message: '请输入证件号码', trigger: 'blur'},
    {pattern: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/, message: "请输入正确的身份证号码", trigger: 'blur'}
  ],
}

let Rules = {
  //登录
  Passport:{
    loginForm:{
      username: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '请输入密码', trigger: 'change'}
      ]
    },
    forgetPwdForm:{

    }
  },
  // 商品管理
  Product: {
    Category: {
      addForm: {
        name: [
          {required: true, message: "请输入分类名称", trigger: 'blur'},
          {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
        ],
        icon: [
          {required: true, message: "请选择分类图标", trigger: 'change'},
        ],
        image: [
          {required: true, message: "请选择分类图片", trigger: 'change'},
        ],
      },
      editForm: {
        name: [
          {required: true, message: "请输入名称", trigger: 'blur'},
          {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
        ]
      }
    },
    Unit: {
      addForm: {
        code: [
          {pattern: /^[0-9]*$/, message: "请输入数字", trigger: 'blur'},
        ],
        name: [
          {required: true, message: "请输入分类名称", trigger: 'blur'},
          {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
        ],
      },
      editForm: {
        name: [
          {required: true, message: "请输入名称", trigger: 'blur'},
          {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
        ]
      }
    },
    Brand: {
      addForm: {
        code: [
          {pattern: /^[0-9]*$/, message: "请输入数字", trigger: 'blur'},
        ],
        name: [
          {required: true, message: "请输入分类名称", trigger: 'blur'},
          {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
        ],
      },
      editForm: {
        name: [
          {required: true, message: "请输入名称", trigger: 'blur'},
          {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
        ]
      }
    },
    Info: {
      basicInfoForm: {
        name: [
          {required: true, message: "请输入商品名称", trigger: 'blur'},
        ],
        mnemonicCode: [
          {required: true, message: "请输入助记码", trigger: 'blur'},
        ],
        unitCode: [
          {required: true, message: "请选择单位", trigger: 'change',type:'number'},
        ],
        brandCode: [
          {required: true, message: "请选择品牌", trigger: 'change',type:'number'},
        ],
        categoryCode: [
          {required: true, message: "请选择类别", trigger: 'change',type:'number'},
        ],
        promoteDate: [
          { required: true, message: "请选择生产日期", trigger: 'change'},
        ],
        validDays: [
          {required: true, message: "请输入有效期限", trigger: 'blur',type:'number'},
          {min:1,max:9999,message: "请输入4位以内整数", trigger: 'blur',type:'integer'},
        ],
        virtualSales: [
          {required: true, message: "请输入虚拟销量", trigger: 'blur',type:'number'},
          {min:0,max:999999,message: "请输入6位以内整数", trigger: 'blur',type:'integer'},
        ],
        pictureUrl: [
          {required: true, message: "请选择主图", trigger: 'change'},
        ],
        buyingPrice: [
          {required: true, message: "请输入进货价", trigger: 'blur',type:'number'},
          {min:1.00,max:9999999999.99,message: "请输入10位以内的有效数字（最多两位小数）", trigger: 'blur',type:'number'},
          {pattern: /^[0-9]+(.[0-9]{2})?$/, message: "请输入10位以内的有效数字（最多两位小数）", trigger: 'blur'}
        ],
        minPrice: [
          {required: true, message: "请输入最低售价", trigger: 'blur',type:'number'},
          {min:1.00,max:9999999999.99,message: "请输入10位以内的有效数字（最多两位小数）", trigger: 'blur',type:'number'},
          {pattern: /^[0-9]+(.[0-9]{2})?$/, message: "请输入10位以内的有效数字（最多两位小数）", trigger: 'blur'}
        ],
        retailPrice: [
          {required: true, message: "请输入零售价", trigger: 'blur',type:'number'},
          {min:1.00,max:9999999999.99,message: "请输入10位以内的有效数字（最多两位小数）", trigger: 'blur',type:'number'},
          {pattern: /^[0-9]+(.[0-9]{2})?$/, message: "请输入10位以内的有效数字（最多两位小数）", trigger: 'blur'}
        ],
        memberPrice: [
          {required: true, message: "请输入会员价格", trigger: 'blur',type:'number'},
          {min:1.00,max:9999999999.99,message: "请输入10位以内的有效数字（最多两位小数）", trigger: 'blur',type:'number'},
          {pattern: /^[0-9]+(.[0-9]{2})?$/, message: "请输入10位以内的有效数字（最多两位小数）", trigger: 'blur'}
        ],
        initialStock: [
          {required: true, message: "请输入初始库存", trigger: 'blur', type: 'number'},
          {min:0,max:9999, message: '请输入4位以内整数', trigger: 'blur', type: 'integer'}
        ],
        warnMinNum: [
          {required: true, message: "请输入库存低位预警值", trigger: 'blur', type: 'number'},
          {min:0,max:999999, message: '请输入6位以内整数', trigger: 'blur', type: 'integer'}
        ],
        warnMaxNum: [
          {required: true, message: "请输入库存高位预警值", trigger: 'blur', type: 'number'},
          {min:0,max:999999, message: '请输入6位以内整数', trigger: 'blur', type: 'integer'}
        ],
        commissionValue: [
          {required: true, message: "请输入提成", trigger: 'blur', type: 'number'},
          /*{min:0,max:99999999.9999, message: '请输入6位以内的有效数字（最多四位小数）', trigger: 'blur', type: 'number'},
           {pattern: /^[0-9]+(.[0-9]{4})?$/, message: "请输入6位以内的有效数字（最多四位小数）", trigger: 'blur'}*/
        ],
        integralCost: [
          {required: true, message: "请输入允许积分抵扣值", trigger: 'blur',type:'number'},
          {type:'integer', message: "请输入6位以内整数", trigger: 'blur',min:0,max:999999},
        ],
        integralValue: [
          {required: true, message: "请输入赠送积分值", trigger: 'blur',type:'number'},
          {type:'integer', message: "请输入6位以内整数", trigger: 'blur',min:0,max:999999},
        ],
        sno:[
          {required: true, message: "请选择供应商", trigger: 'change',},
        ],
        supplyStatus:[
          {required: true, message: "请选择供应商合同状态", trigger: 'change',type:'number'},
        ],
        expiryDate:[
          {required: true, message: "请选择合同期限", trigger: 'change' },
        ]
      },
      detailInfoForm: {
        slidPictureUrl: [
          {required: true, message: "请选择轮播图", trigger: 'change'},
        ],
        detailPictureUrl: [
          {required: true, message: "请选择详情图", trigger: 'change'},
        ],
      }
    }
  },
  //积分管理
  Score: {
    commodity:{
      pName: [
        {required: true, message: "请选择商品", trigger: 'change'},
      ],
      name: [
        {required: true, message: "请输入积分商品名称", trigger: 'blur'},
      ],
      eachNum: [
        {required: true, message: "请输入每份数量", trigger: 'blur',type:'number'},
        {pattern: /^\+?[1-9][0-9]*$/, message: "请输入大于零的数字", trigger: 'blur'}
      ],
      totalNum: [
        {required: true, message: "请输入可兑换总份数", trigger: 'blur',type:'number'},
        {pattern: /^\+?[1-9][0-9]*$/, message: "请输入大于零的数字", trigger: 'blur'}
      ],
      costIntegral: [
        {required: true, message: "请输入每次消耗积分", trigger: 'blur',type:'number'},
        {pattern: /^\+?[1-9][0-9]*$/, message: "请输入大于零的数字", trigger: 'blur'}
      ],
      startTime: [
        {required: true, message: "请选择开始时间", trigger: 'change'},
      ],
      endTime: [
        {required: true, message: "请选择结束时间", trigger: 'change'},
      ],
    },
    exchangeFormDetail:{

      contact: [
        {required: true, message: "请输入收货人", trigger: 'blur'},
      ],
      mobile : Common.mobile,
      areaCode  : [
        {required: true, message: "请输入收货地址", trigger: 'change'},
      ],
      deliveryAddress   : [
        {required: true, message: "请输入详细地址", trigger: 'blur'},
      ]
    },
  },
  //订单管理
  Order: {
    OrderList: {
      editBillInfo: {
        taxNumber: [
          {pattern: /^[0-9]*$/, message: "请输入数字", trigger: 'blur'},
          {min: 1, max: 9, message: '发票税号长度在 1 到 9 个字符', trigger: 'blur'}
        ]
      },
      editDispath: {
        remark: [
          {required: true, message: "请输入备注", trigger: 'blur'},
        ],
        contact: [
          {required: true, message: "请输入收货人", trigger: 'blur'},
        ],
        contract: [
          {required: true, message: "请输入收货人", trigger: 'blur'},
        ],
        mobile: [
          {required: true, message: "请输入手机号", trigger: 'blur'},
          {pattern: /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/, message: "请输入有效的手机号", trigger: 'blur'}
        ],
        bMobile:[
          {required: true, message: "请输入手机号", trigger: 'blur'},
          {pattern: /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/, message: "请输入有效的手机号", trigger: 'blur'}
        ],
        areaCode:[
          {required: true, message: "请选择地址", trigger: 'change'},
        ],
        deliveryAddress: [
          {required: true, message: "详细地址不能为空", trigger: 'blur'},
        ],
        reason: [
          {required: true, message: "原因不能为空！", trigger: 'blur'},
        ],
        logisticsCompany: [
          {required: true, message: "物流公司不能为空！", trigger: 'blur'},
        ],
        logisticsOrderNo: [
          {required: true, message: "物流单号不能为空！", trigger: 'blur'},
          {pattern: /^[0-9]*$/, message: "请输入数字", trigger: 'blur'},
        ],
        fee: [
          {required: true, message: "配送费用不能为空！", trigger: 'blur'},
          {pattern: /^\d+(\.\d{1,2})?$/, message: "请输入正确的配送费用信息（正数或正数加两位小数）", trigger: 'blur'},
        ]
      }


    },
    Invoice: {
      editDispath: {
        remark: [
          {required: true, message: "请输入备注", trigger: 'blur'},
        ],
        contact: [
          {required: true, message: "请输入收货人", trigger: 'blur'},
        ],
        mobile: [
          {required: true, message: "请输入手机号", trigger: 'blur'},
          {pattern: /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/, message: "请输入有效的手机号", trigger: 'blur'}
        ],
        deliveryAddress: [
          {required: true, message: "详细地址不能为空", trigger: 'blur'},
        ],
        logisticsCompany: [
          {required: true, message: "请输入物流公司", trigger: 'blur'},
          {max:24,message: "请输入有效的物流单号", trigger: 'blur'}
        ],
        logisticsOrderNo: [
          {required: true, message: "请输入物流单号", trigger: 'blur'},
          {max:24,message: "请输入有效的物流单号", trigger: 'blur'}
        ],
      },
      invoiceInfo: {
        logisticsCompany: [
          {required: true, message: "请输入物流公司", trigger: 'blur'},
          {max:24,message: "请输入有效的物流单号", trigger: 'blur'}
        ],
        logisticsOrderNo: [
          {required: true, message: "请输入物流单号", trigger: 'blur'},
          {max:24,message: "请输入有效的物流单号", trigger: 'blur'}
        ],
        fee: [
          {required: true, message: "请输入有效的配送费用", trigger: 'blur',type:'number',max:9999},
          {pattern: /^\d+(\.\d+)?$/, message: "请输入非负的数字", trigger: 'blur'},
        ]
      }
    }
  },
  //经销商管理
  Vip: {
    Category: {
      memberLevel: [
        {required: true, message: "请输入类别级别（0-99 整数）", trigger: 'blur',type: 'integer',},
        {type: 'integer', message: "请输入（0-99）的整数", trigger: 'blur',min:0,max:99},
      ],
      levelName: [
        {required: true, message: "请输入类别名称", trigger: 'blur'},
        {max: 16, message: "请输入有效的类别名称", trigger: 'blur'},
      ],
      discountType: [
        {required: true, message: "请选择优惠方式", trigger: 'change',type:'integer'},
      ],
      discountRate: [
        {required: true, message: "请输入折扣率", trigger: 'blur',type:'number'},
        {message: "请输入有效的折扣率", trigger: 'blur',type:'number',min:0,max:100},
      ],
      isRecharge: [
        {required: true, message: "请选择是否允许充值", trigger: 'change',type:'integer'},
      ],
      cumulativeIntegral: [
        {required: true, message: "请输入升级所需累积的消费积分", trigger: 'blur',type:'integer'},
      ],
    }
  },
  //库存管理
  stock: {
    stockSummary:{
      editFrom:{
        warnMinNum: [
          {required: true, message: "请输入商品库存预警（低位）", trigger: 'blur',type:'integer'},
          {min: 0,max:999999, message: "请输入有效的商品库存预警（低位）", trigger: 'blur',type:'integer'},
        ],
        warnMaxNum: [
          {required: true, message: "请输入商品库存预警（高位）", trigger: 'blur',type:'integer'},
          {min: 0,max:999999, message: "请输入有效的商品库存预警（高位）", trigger: 'blur',type:'integer'},
        ],
        warnDealType: [
          {required: true, message: "请选择库存预警处理方式", trigger: 'blur',type:'number'},
        ],
        noticeEmpIdse: [
          {required: true, message: "请选择预警信息通知员工列表", trigger: 'change',type:'array'},
        ],
      }
    }
  },
  //系统管理
  System: {
    Staff: {
      basicInfoForm: {
        name: [
          {required: true, message: "请输入姓名", trigger: 'blur'},
        ],
        mobile:Common.mobile,
        gender: [
          {required: true, message: '请选择性别', trigger: 'change',type:'number'}
        ],
        maritalStatus: [
          {required: true, message: '请选择婚姻状况', trigger: 'change',type:'number'}
        ],
        type: [
          {required: true, message: '请选择类型', trigger: 'change',type:'number'}
        ],
        roleNos: [
          {required: true, message: '请选择角色', trigger: 'change',type: 'array'}
        ]
      },
      detailInfoForm: {
        birthday: [

        ],
        certType: [

        ],
        certNo: [
          {pattern: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/, message: "请输入正确的身份证号码", trigger: 'blur'}
        ],
        bankName:[

        ],
        bankCardNo: [
          {pattern: /^(\d{16}|\d{19})$/, message: "请输入正确的银行卡号", trigger: 'blur'}
        ],
        birthAreaCode:[

        ],
        birthAddress:[

        ],
        spouseName:[

        ],
        spouseMobile: [
          {pattern: /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/, message: "请输入有效的手机号", trigger: 'blur'}
        ],
        spouseBirthday:[

        ],
        children:[

        ],
        resideAreaCode:[

        ],
        resideAddress:[

        ],
        education:[

        ],
        personPhoto:[

        ],
        certPhoto1:[

        ],
        certPhoto2:[

        ],
      },
    },
    updatePasswords: {
      oldPwd: [
        {required: true, message: "请输入旧密码", trigger: 'blur'},
      ],
      newPwd: [
        {required: true, message: "请输入新密码", trigger: 'blur'},
      ],
      confirmPwd: [
        {required: true, message: "请确认新密码", trigger: 'blur'},
      ],
    },
    resetPwd:{
      mobile: Common.mobile
    },
    Role: {
      addForm: {
        name: [
          {required: true, message: "请输入角色名称", trigger: 'blur'}
        ],
      }
    },

    merchantInfo: {
      id: [
        {required: true, message: "请输入商户ID", trigger: 'blur'},
      ],
      mobile: [
        {required: true, message: "请输入商户注册手机", trigger: 'blur'},
        {pattern: /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/, message: "请输入有效的手机号", trigger: 'blur'}
      ],
      areaCode: [
        {required: true, message: "请选择所属区域", trigger: 'blur'},
      ],
      email: [
        {required: true, message: "请输入商户邮箱", trigger: 'blur'},
      ],
      businessNo: [
        {required: true, message: "请输入营业执照代码", trigger: 'blur'},
      ],
      businessPhoto1: [
        {required: true, message: "请选择营业执照正本照片", trigger: 'blur'},
      ],
      businessPhoto2: [
        {required: true, message: "请选择营业执照副本照片", trigger: 'blur'},
      ],
      legalPerson: [
        {required: true, message: "请输入商户法人（联系人）", trigger: 'blur'},
      ],
      certNo: [
        {required: true, message: "请输入证件号", trigger: 'blur'},
      ],
      legalPersonPhoto: [
        {required: true, message: "请选择法人证件照", trigger: 'blur'},
      ],
    },

  },
  //供应商相关规则
  Purchase: {
    SupplierFile: {
      addForm: {
        name: [
          {required: true, message: "请输入名称", trigger: 'blur'},
        ],
        mnemonicCode: [
          {required: true, message: "请输入助记码", trigger: 'blur'},
        ],
        type: [
          {required: true, message: "请选择类型", trigger: 'change'},
        ],
        channelType: [
          {required: true, message: "请选择合作渠道", trigger: 'change'},
        ],
        level: [
          {required: true, message: "请输入等级", trigger: 'blur',type:'number'},
          {pattern: /^[1-9]$/, message: "请输入1到9的整数", trigger: 'blur'}
        ],
        contract: [
          {required: true, message: "请输入联系人", trigger: 'blur'},
        ],
        mobile:Common.mobile,
        areaCode: [
          {required: true, message: "请选择联系区域", trigger: 'change'},
        ],
        address: [
          {required: true, message: "请输入联系地址", trigger: 'blur'},
        ],
        status: [
          {required: true, message: "请选择状态", trigger: 'change'},
        ],
        email: Common.email,
        remark: [
          {required: true, message: "请输入说明", trigger: 'blur'},
        ],
      },
    },
  },
}


export default Rules
