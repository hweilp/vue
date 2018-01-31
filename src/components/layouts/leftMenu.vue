<template>
  <aside id="left-panel">
    <!-- NAVIGATION : This navigation is also responsive-->
    <nav class="main-menu">
      <el-menu default-active="2" class="el-menu-vertical-demo" mode="horizontal" menuTrigger="hover">

        <template v-for="(menu,menu_index) in menus">

          <template v-if="menu.children">

            <el-submenu :index="(menu_index).toString()">
              <template slot="title">
                <span class="fg-menu-title">{{menu.name}}</span>
              </template>

              <template v-for="(subMenu,subMenu_index) in menu.children">
                <el-menu-item-group class="fg-menu-group">
                  <template slot="title">
                    <span class="fg-sub-menu-title">{{subMenu.name}}</span>
                  </template>
                  <template v-for="(baseMenu,baseMenu_index) in subMenu.children">
                    <el-menu-item :index="(menu_index).toString()+(subMenu_index).toString()+(baseMenu_index).toString()">
                      <router-link :to="baseMenu.extra.link" class="main-menu-sub-link">{{baseMenu.name}}</router-link>
                    </el-menu-item>
                  </template>

                </el-menu-item-group>
              </template>

            </el-submenu>

          </template>

          <template v-else>
            <el-menu-item index="2">
              <router-link :to="menu.extra.link" class="fg-menu-top-link">{{menu.name}}</router-link>
            </el-menu-item>
          </template>

        </template>


      </el-menu>
      <!--</el-menu>-->
    </nav>
  </aside>
</template>


<style lang="scss" scoped>


  $header-menu-font-size: 18px;
  .main-menu {
    padding: 0 40px;
    background-color: #fff;
    > .el-menu {
      background-color: #fff;
    }
  }

  .fg-menu-group {
    width: 240px;
    padding: 0 5px 10px;
    > ul {
      > li {
        display: inline-block;
        margin: 0 5px;

      }
    }
  }

  .fg-menu-top-link {
    text-decoration: none;
    color: #000 !important;
    font-size: $header-menu-font-size;
  }

  .fg-menu-title {
    font-size: $header-menu-font-size;
  }

  .fg-sub-menu-title {
    margin-left: -15px;
    padding-bottom: 10px;
    display: inline-block;
  }
  .fg-menu-group > ul > li {
    margin: 0;
    padding:0;
  }
  .el-menu--horizontal .el-submenu .el-menu-item{
    padding:0 5px ;
    width:45%;
    text-align: center;
    height: 24px;
    line-height:22px;
    border:1px  solid #DDDDDD;
    border-radius: 3px;
    margin: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    &:hover{
      background:rgba(79, 162, 255, 1);
      border: 1px  solid rgba(79, 162, 255, 1);
      a{
        color: white;}
    }
  }

  .main-menu-sub-link {
    text-decoration: none;
    display: inline-block;
    height: 100%;
    width: 100%;
  }
</style>
<script type="text/javascript">
  import Action from '@/assets/admin/resource/actions.js'
  import {mapMutations} from 'vuex'
  export default{
    data: function () {
      return {
//        menus: [
//          {
//            name: '首页',
//            icon: 'fa-bar-chart-o',
//            order: '0',
//            link: '/',
//            active: false,
//          },
//          {
//            name: '商品管理',
//            icon: 'fa-bar-chart-o',
//            order: '0',
//            link: '',
//            active: false,
//            children: [
//              {
//                name: '商品信息',
//                icon: '',
//                order: '',
//                link: '/product',
//                active: true,
//                children: [
//                  {
//                    name: '商品类别',
//                    icon: '',
//                    order: '0',
//                    link: '/product/category',
//                    active: true,
//                  },
//                  {
//                    name: '商品品牌',
//                    icon: '',
//                    order: '1',
//                    link: '/product/brand',
//                    active: false,
//                  },
//                  {
//                    name: '商品单位',
//                    icon: '',
//                    order: '2',
//                    link: '/product/unit',
//                    active: false,
//                  },
//                  {
//                    name: '商品信息',
//                    icon: '',
//                    order: '3',
//                    link: '/product/info',
//                    active: false,
//                  },
//                  {
//                    name: '供应商档案',
//                    icon: '',
//                    order: '',
//                    link: '/purchase/supplierFile',
//                    active: true,
//                  },
////                  {name: '商品设置',
////                    icon: '',
////                    order: '3',
////                    link: '/product/set',
////                    active: false,
////                  }
//                ]
//              }
//            ]
//          },
//          {
//            name:"积分管理",
//            icon: 'fa-bar-chart-o',
//            order: '0',
//            link: '',
//            active: false,
//            children:[
//              {
//                name:"积分业务",
//                icon: 'fa-bar-chart-o',
//                order: '',
//                link: '',
//                active: false,
//                children:[
//                  {
//                    name:"积分商品",
//                    icon: 'fa-bar-chart-o',
//                    order: '0',
//                    link: '/score/goods',
//                    active: false,
//                  },
//
//                  {
//                    name:"兑换单记录",
//                    icon: 'fa-bar-chart-o',
//                    order: '3',
//                    link: '/score/exchangeFormRecord',
//                    active: false,
//                  },
//
//                  {
//                    name:"积分设置",
//                    icon: 'fa-bar-chart-o',
//                    order: '4',
//                    link: '/score/setUp',
//                    active: false,
//                  },
//                  {
//                    name:"积分商品发货单列表",
//                    icon: 'fa-bar-chart-o',
//                    order: '5',
//                    link: '/score/scoreGoodsInvoiceList',
//                    active: false,
//                  },
//                ]
//              },
//              {
//                name:"平台商户积分",
//                icon: 'fa-bar-chart-o',
//                order: '0',
//                link: '',
//                active: false,
//                children:[
//                  {
//                    name:"积分账户",
//                    icon: 'fa-bar-chart-o',
//                    order: '0',
//                    link: '/score/scoreAccount',
//                    active: false,
//                  },
//                  {
//                    name:"平台兑换记录",
//                    icon: 'fa-bar-chart-o',
//                    order: '1',
//                    link: '/score/platformExchangeRecord',
//                    active: false,
//                  },
////                  {
////                    name:'兑换平台商品',
////                    icon: 'fa-bar-chart-o',
////                    order: '2',
////                    active: false,
////                    link:'/score/platformScoreGoods'
////                  }
//                ]
//              }
//            ]
//          },
//          {
//            name: '订单管理',
//            icon: 'fa-bar-chart-o',
//            order: '0',
//            link: '',
//            active: false,
//            children: [
//              {
//                name: '订单管理',
//                icon: 'fa-bar-chart-o',
//                order: '0',
//                link: '',
//                active: false,
//                children: [
//                  {
//                    name: '订单列表',
//                    icon: '',
//                    order: '0',
//                    link: '/orderManage/orderList',
//                    active: false,
//                  },
//                  {
//                    name: '发货单列表',
//                    icon: '',
//                    order: '1',
//                    link: '/orderManage/invoiceList',
//                    active: false,
//                  },
//                  {
//                    name: '退货单列表',
//                    icon: '',
//                    order: '2',
//                    link: '/orderManage/returnGoods',
//                    active: false,
//                  },
//
//
////                  {
////                    name: '自定支付方式',
////                    icon: '',
////                    order: '0',
////                    link: '/form/list',
////                    active: false,
////                  },
////                  {
////                    name: '零售终端管理',
////                    icon: '',
////                    order: '1',
////                    link: '/form/add',
////                    active: false,
////                  },
////                  {
////                    name: '销售设置',
////                    icon: '',
////                    order: '1',
////                    link: '/form/list',
////                    active: false,
////                  },
////                  {
////                    name: '营业员',
////                    icon: '',
////                    order: '1',
////                    link: '/form/add',
////                    active: false,
////                  }
//                ]
//              },
//              {
//                name: '平台订单管理',
//                icon: 'fa-bar-chart-o',
//                order: '0',
//                link: '',
//                active: false,
//                children: [
//                  {
//                    name: '平台订单',
//                    icon: '',
//                    order: '3',
//                    link: '/orderManage/platformOrderList',
//                    active: false,
//                  }
//                ]
//              }
//            ]
//          },
//         /* {
//            name: '促销管理',
//            icon: 'fa-bar-chart-o',
//            order: '0',
//            link: '/',
//            active: false,
//            children:[
//              {
//                name:"促销业务",
//                icon: 'fa-bar-chart-o',
//                order: '0',
//                link: '/',
//                active: false,
//                children:[
//                  {
//                    name:"促销计划",
//                    icon: 'fa-bar-chart-o',
//                    order: '0',
//                    link: '/salesPromotion/plan',
//                    active: false,
//                  }
//                ]
//              },
//              {
//                name:"促销查询",
//                icon: 'fa-bar-chart-o',
//                order: '0',
//                link: '/',
//                active: false,
//                children:[
//                  {
//                    name:"当前促销活动",
//                    icon: 'fa-bar-chart-o',
//                    order: '0',
//                    link: '/salesPromotion/activity',
//                    active: false,
//                  },
//                  {
//                    name:"促销销售汇总",
//                    icon: 'fa-bar-chart-o',
//                    order: '0',
//                    link: '/salesPromotion/collect',
//                    active: false,
//                  },
//                  {
//                    name:'促销销售明细',
//                    icon: 'fa-bar-chart-o',
//                    order: '0',
//                    link: '/salesPromotion/detail',
//                    active: false,
//                  }
//                ]
//              }
//            ]
//          },*/
//          {
//            name: '会员管理',
//            icon: 'fa-bar-chart-o',
//            order: '0',
//            link: '/',
//            active: false,
//            children :[
//              {
//                name: "会员信息",
//                icon: '',
//                order: '',
//                link: '',
//                active: true,
//                children: [
//                  {
//                    name: '会员类别',
//                    icon: '',
//                    order: '',
//                    link: '/vipManage/category',
//                    active: true,
//                  },
//                  {
//                    name: '会员资料',
//                    icon: '',
//                    order: '',
//                    link: '/vipManage/material',
//                    active: true,
//                  },
//                ]
//              },
////              {
////                name: "统计信息",
////                icon: '',
////                order: '',
////                link: '/purchase/info',
////                active: true,
//////                children: [
//////                  {
//////                    name: '供应商档案',
//////                    icon: '',
//////                    order: '',
//////                    link: '/purchase/supplierFile',
//////                    active: true,
//////                  },
//////                ]
////              }
//
//            ]
//
//          },
////          {
////            name: '采购管理',
////            icon: 'fa-bar-chart-o',
////            order: '0',
////            link: '/',
////            active: false,
////            children :[
////              { name: "采购信息",
////                icon: '',
////                order: '',
////                link: '/purchase/info',
////                active: true,
////                children: [
////                  {
////                    name: '供应商档案',
////                    icon: '',
////                    order: '',
////                    link: '/purchase/supplierFile',
////                    active: true,
////                  },
////                  {
////                    name: '采购设置',
////                    icon: '',
////                    order: '1',
////                    link: '/purchase/purchaseSet',
////                    active: false,
////                  },
////                  {
////                    name: '采购订单',
////                    icon: '',
////                    order: '2',
////                    link: '/purchase/order',
////                    active: false,
////                  },
////                  {
////                    name: '采购收货',
////                    icon: '',
////                    order: '3',
////                    link: '/purchase/takeGoods',
////                    active: false,
////                  }
////                ]},
////              { name: "采购查询",
////                icon: '',
////                order: '',
////                link: '/purchase/check',
////                active: true,
////                children: [
////                  {
////                    name: '采购日汇总',
////                    icon: '',
////                    order: '',
////                    link: '/purchase/dateCollect',
////                    active: true,
////                  },
////                  {
////                    name: '采购月汇总',
////                    icon: '',
////                    order: '1',
////                    link: '/purchase/monthCollect',
////                    active: false,
////                  },
////                  {
////                    name: '采购类别汇总',
////                    icon: '',
////                    order: '2',
////                    link: '/purchase/categoryCollect',
////                    active: false,
////                  },
////                  {
////                    name: '采购品牌汇总',
////                    icon: '',
////                    order: '3',
////                    link: '/purchase/brandCollect',
////                    active: false,
////                  },
////                  {
////                    name: '采购供应商汇总',
////                    icon: '',
////                    order: '4',
////                    link: '/purchase/supplierCollect',
////                    active: false,
////                  },
////                  {
////                    name: '采购明细汇总',
////                    icon: '',
////                    order: '5',
////                    link: '/purchase/DetailCollect',
////                    active: false,
////                  }
////                ]}
////            ]
////          },
//          {
//            name: '库存管理',
//            icon: 'fa-bar-chart-o',
//            order: '0',
//            link: '/',
//            active: false,
//            children :[
//              { name: '库存管理',
//                icon: '',
//                order: '',
//                link: '/',
//                active: true,
//                children: [
//                {
//                  name: '入库管理',
//                  icon: '',
//                  order: '',
//                  link: '/stock/enterStockManage',
//                  active: true,
//                },
//                {
//                  name: '出库管理',
//                  icon: '',
//                  order: '1',
//                  link: '/stock/outStockManage',
//                  active: false,
//                },
////                {
////                  name: '调库管理',
////                  icon: '',
////                  order: '2',
////                  link: '/stock/shiftStockManage',
////                  active: false,
////                },
//                {
//                  name: '库存盘点',
//                  icon: '',
//                  order: '3',
//                  link: '/stock/stockCheck',
//                  active: false,
//                },
//                  {
//                    name: '库存汇总',
//                    icon: '',
//                    order: '3',
//                    link: '/stock/stockSummary',
//                    active: false,
//                  },
////                  {
////                    name: '平台订单',
////                    icon: '',
////                    order: '3',
////                    link: '/stock/stockCheck',
////                    active: false,
////                  }
//              ]},
//
//            ]
//
//          },
//          {
//            name: '系统管理',
//            icon: 'fa-bar-chart-o',
//            order: '0',
//            link: '/',
//            active: false,
//            children: [
//              {
//                name: '个人信息',
//                icon: '',
//                order: '',
//                link: '/system/list',
//                active: false,
//                children: [
//                 /* {
//                    name: '基本资料',
//                    icon: '',
//                    order: '',
//                    link: '/system/basicInfo',
//                    active: true,
//
//                  },*/
//
//                  {
//                    name: '修改密码',
//                    icon: '',
//                    order: '2',
//                    link: '/system/updatePasswords',
//                    active: false,
//                  },
//                 /* {
//                    name: '账号绑定',
//                    icon: '',
//                    order: '1',
//                    link: '/system/accountBind',
//                  },*/
//                  /*{
//                    name: '重置密码',
//                    icon: '',
//                    order: '2',
//                    link: '/system/resetPasswords',
//                    active: false,
//                  },*/
//                ]
//              },
//              {
//                name: '权限相关',
//                icon: '',
//                order: '1',
//                link: '/system/list',
//                active: false,
//                children: [
//                  {
//                    name: '员工信息',
//                    icon: '',
//                    order: '10',
//                    link: '/system/staff',
//                    active: false,
//                  },
////                  {
////                    name: '角色设置',
////                    icon: '',
////                    order: '11',
////                    link: '/system/role',
////                    active: false,
////                  },
//                  {
//                    name: '角色管理',
//                    icon: '',
//                    order: '11',
//                    link: '/system/role',
//                    active: false,
//                  },
////                  {
////                    name: '角色权限设置',
////                    icon: '',
////                    order: '12',
////                    link: '/system/rolePower',
////                    active: false,
////                  },
////                  {
////                    name: '权限设置',
////                    icon: '',
////                    order: '13',
////                    link: '/system/power',
////                    active: false,
////                  }
//                ]
//              },
////              {name: '系统信息',
////                icon: '',
////                order: '2',
////                link: '/system/list',
////                active: false,
////                children: [
////                  {
////                    name: '商户资料',
////                    icon: '',
////                    order: '',
////                    link: '/system/merchantInfo',
////                    active: false,
////                  },
////                  {
////                    name: '操作日志',
////                    icon: '',
////                    order: '21',
////                    link: '/system/oprLog',
////                    active: false,
////                  },
////                  {
////                    name: '参数配置',
////                    icon: '',
////                    order: '2',
////                    link: '/system/parameterSet',
////                    active: false,
////                  }
////                ]
////              }
//            ]
//          },
//          {
//            name: '微商店',
//            icon: 'fa-bar-chart-o',
//            order: '0',
//            link: '/',
//            active: false,
//          }
//
//        ]
        menus:[]
      }
    },
    created(){
        if(this.$store.state.User.menu == null){
          this.initMenu()
        }else {
          this.menus = this.$store.state.User.menu.menu
        }
    },
    methods: {
      ...mapMutations(['User/INIT_USER_MENU']),
      initMenu:function () {
        this.$http(this.$_.merge({timeout: 3000,}, Action.Menu.initMenu)).then(response => {
          this.menus = response.body.children
          this['User/INIT_USER_MENU'](response.body.children)
          this.$store.dispatch('User/initMenu', response.body.children);
          this.$emit('finish', true)
        }, response => {
          this.$emit('finish', false)
        })
      }
    }
  }

</script>
