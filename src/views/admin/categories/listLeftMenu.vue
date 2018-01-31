<template>
  <div id="leftMenu">
    <el-row :span="24" class="fg-content-title">
      <i class="fa fa-bookmark-o"></i><span style="margin-left: 10px">{{messageKind}}</span>
    </el-row>
    <el-tree :data="data" :props="defaultProps"  @node-click="handleNodeClick"></el-tree>
  </div>


</template>

<script>
  import ElSubmenu from '../../../../node_modules/element-ui/packages/menu/src/submenu'
  import Helper from '@/assets/admin/js/helper.js'
  import Action from '@/assets/admin/resource/actions.js'

  export default {
    components: {ElSubmenu},
    name: 'leftmenu',
    data: function () {
      return {
        messageKind: "商品类目",
        data: [

        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        pageFilter:{
          orders:[{
            name:'productName',
            order:'desc'
          }],
          pagination:{
            currentPageNum:0,
            recordTotal:'',
            recordPerPage:'',
            endIndex: 1,
            startIndex: 0
          },
          filters:[{
            name:'productName',
            value:'苹果'
          }]
        },
        menus: [
          {
            name: "分类一",
            icon: 'fa-bar-chart-o',
            order: '0',
            link: '',
            linkId: "1",
            active: false,
            children: [
              {
                name: '分类1-1',
                icon: '',
                order: '',
                link: '',
                linkId: "11",
                active: true,
                children: [
                  {
                    name: "分类1-1-1",
                    icon: '',
                    order: '',
                    link: '/product',
                    active: true,
                    linkId: "111",
                  },
                  {
                    name: "分类1-1-2",
                    icon: '',
                    order: '',
                    link: '/product',
                    linkId: "112",
                    active: true
                  }
                ]
              },
              {
                name: '分类1-2',
                icon: '',
                order: '1',
                link: '/product/add',
                linkId: "12",
                active: false,
                children: [
                  {
                    name: "分类1-2-1",
                    icon: '',
                    order: '',
                    link: '/product',
                    linkId: "121",
                    active: true
                  },
                  {
                    name: "分类1-2-2",
                    icon: '',
                    order: '',
                    link: '/product',
                    linkId: "122",
                    active: true
                  }
                ]
              }
            ]
          },
          {
            name: "分类二",
            linkId: "2",
            children: [
              {
                name: "分类2-1",
                linkId: "21",
                children: [
                  {
                    name: "分类2-1-1",
                    link: "/product",
                    linkId: "211",
                  }
                ]
              }
            ]
          },
          {
            name: "分类三",
            linkId: "3",
            children: [
              {
                name: "分类3-1",
                linkId: "31",
                children: [
                  {
                    name: "分类3-1-1",
                    id: "311",
                    icon: '',
                    order: '',
                    link: '/product',
                    linkId: "311",
                    active: true
                  },
                  {
                    name: "分类3-1-2",
                    icon: '',
                    order: '',
                    link: '/product',
                    linkId: "312",
                    active: true
                  }
                ]
              }
            ]
          },
          {
            name: "分类四",
            icon: '',
            order: '',
            link: '/product/list',
            linkId: "4",
            active: true
          }

        ]
      }
    },
    created: function () {
      this.initTableData()
    },
    methods: {
      initTableData: function () {

        let dataUrl = {
          mid : 100001,
          code : 2500
        }
        this.$http(this.$_.merge({}, Action.Product.get, {
          url: Helper.FG.setParams(Action.Product.get.url, {status:1}),
          data : this.pageFilter
        })).then(response => {
          for (let i in response.data.data){
            response.data.data[i].label=response.data.data[i].name
            this.data = response.data.data
          }
        }, response => {

        })

//        this.$http({
//          method:"GET",
//          url: "http://192.1.17.77:8099/api/merchant/commodity/category/page?status=1",
//          data : this.pageFilter
//        }).then(function (response) {
//          console.log(typeof response.data.data)
//          for (let i in response.data.data){
//            response.data.data[i].label=response.data.data[i].name
//          }
//
//
//          console.log(response.data.data)
//
//          this.data = response.data.data
//        }, function (response) {
////          console.log(response)
//        })
      },

      handleNodeClick(data) {
        console.log(data);
//        this.$http({
//          method : "GET",
//          url: "http://192.1.17.77:8099/api/merchant/commodity/category/view?mid=100001&code=2500"
//        }).then(function (response) {
//          //成功
//          console.log(response)
//          this.$emit("listenChildData",response)
//        },function (response) {
////          失败
//        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  #leftMenu {
    background: white;
    .el-tree{
      padding-left: 10px;
      border:0;
      border-top:1px solid #d1dbe5;
    }

  }

</style>
