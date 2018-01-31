<template>
  <div>
    <div id="main" class="fg-table-type" role="main">

      <div id="rolePower">
        <div class="container-left">
          <nav class="content-left">
            <el-row :span="24" class="fg-content-title">
              <i class="fa fa-bookmark-o"></i><span style="margin-left: 10px">{{messageKind}}</span>
            </el-row>

            <div style="height: 5px;background: rgba(246, 246, 246, 1)"></div>

            <div class="menu" >
              <div class="menuList">
                <!--<h3 class="menuListTitle">总部<span class="openDropDownIcon" @click="openTotal" v-bind:class="{openActiveIcon : isTotalShowActive}"></span></h3>-->
                <div v-if="isTotalShow">
                  <el-menu mode="vertical" default-active="1" theme="#ffffff" >
                    <el-menu-item-group title="">
                      <el-menu-item index="1"><i class="el-icon-arrow-right"></i>系统管理员</el-menu-item>
                      <el-menu-item index="2"><i class="el-icon-arrow-right"></i>店长</el-menu-item>
                      <el-menu-item index="3"><i class="el-icon-arrow-right"></i>操作员</el-menu-item>
                      <el-menu-item index="4"><i class="el-icon-arrow-right"></i>收银员</el-menu-item>
                    </el-menu-item-group>
                  </el-menu>
                </div>
              </div>
              <!--<div class="menuList">-->
                <!--<h3 class="menuListTitle">门店<span class="openDropDownIcon" @click="openStore" v-bind:class="{openActiveIcon : isStoreShowActive}"></span> </h3>-->
                <!--<div v-if="isStoreShow">-->
                  <!--<el-menu mode="vertical" default-active="" theme="#ffffff" >-->
                    <!--<el-menu-item-group title="">-->
                      <!--<el-menu-item index="1"><i class="el-icon-arrow-right"></i>系统管理员</el-menu-item>-->
                      <!--<el-menu-item index="2"><i class="el-icon-arrow-right"></i>店长</el-menu-item>-->
                      <!--<el-menu-item index="3"><i class="el-icon-arrow-right"></i>操作员</el-menu-item>-->
                      <!--<el-menu-item index="4"><i class="el-icon-arrow-right"></i>收银员</el-menu-item>-->
                    <!--</el-menu-item-group>-->
                  <!--</el-menu>-->
                <!--</div>-->
              <!--</div>-->

            </div>


          </nav>


        </div>


        <div class=" container-right">
          <div class="content-right">
            <el-row :span="24" class="fg-content-title">
              {{kindTitle}}
            </el-row>
            <el-row :span="24" class="fg-content-detail" style="min-height: 605px;">

              <el-row :span="24" class="fg-content-opr">
                <el-button :plain="true" type="primary" size="" @click="save1"><i class="fa fa-save"></i> 保存</el-button>
                <el-button :plain="true" type="primary" size="" @click="reDefault"><i class="fa fa-repeat"></i> 还原默认</el-button>

              </el-row>
              <!-- 表内 选择 -->
              <div style="padding: 0px 20px 10px;background: #f6f6f6">
                <div class="roleMenuList" v-model="allPowerdata">

                  <div v-for="(menu,menu_index) in allPowerdata" style="border-bottom: 1px dashed #d0d0d0;">

                    <div v-if="menu.children">

                      <div class="powerKind">

                        <el-checkbox v-model="menu.checkAll" @change="checkAll3" :index="(menu_index)"><span class="kindTitle">{{menu.name}}</span></el-checkbox>
                        <span class="openShow"><i class="openDropDownIcon icon" v-bind:class="{active:menu.isActive}" @click="openShow" :index="(menu_index)"></i></span>

                        <div v-if="menu.show">
                          <div class="rePowerKind" v-for="(subMenu,subMenu_index) in menu.children" >

                            <el-checkbox v-model="subMenu.checkAll" @change="checkAll2" :index="(menu_index).toString()+(subMenu_index).toString()"><span class="reKindTitle">{{subMenu.name}}</span></el-checkbox>

                            <div v-if="subMenu.children">

                              <div class="reRePowerKind" v-for="(reSubMenu,reSubMenu_index) in subMenu.children" >
                                <el-checkbox v-model="reSubMenu.checkAll" @change="checkAll1" :index="(menu_index).toString()+(subMenu_index).toString()+(reSubMenu_index).toString()"><span class="reReKindTitle">{{reSubMenu.name}}</span></el-checkbox>

                                <div class="oprList" >
                                  <el-checkbox-group v-model="reSubMenu.checkAllPart">
                                    <el-checkbox v-for="opr in reSubMenu.children"  :label="opr" :key="opr"><span class="reKindTitle">{{opr}}</span></el-checkbox>
                                  </el-checkbox-group>

                                </div>


                              </div>

                            </div>

                          </div>

                        </div>



                      </div>
                    </div>

                    <div v-else>
                      <el-checkbox v-model="menu.checkAll" :index="(menu_index)" @change="checkAll3"><span class="kindTitle">{{menu.name}}</span></el-checkbox>
                    </div>


                  </div>




                </div>
              </div>


            </el-row>

          </div>



        </div>


      </div>

    </div>
  </div>

</template>
<script>

  export default {
    data () {
      return {
        isTotalShowActive:true,
        isStoreShowActive:false,
        isTotalShow : true,
        isStoreShow:false,
        messageKind : "角色",
        headerquarters: "总部",
        kindTitle : "角色权限— 列表",
        store:"门店",
        searchComents: "",
        labelPosition: 'right',
        data1 : [
          {label: '系统管理员',
            children : [
              {label: "管理员1"}
            ]},
          {label:"店长"},
          {  label:"操作员"},
          {label:"收银员"}
        ],
        data2: [
          {label: '北京'},
          {label:"天津"},
          {  label:"上海"},
          {label:"杭州"}
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        multipleSelection: [],
        allPowerdata : [
          {
            name : "首页",
            checkAll : false,
            isActive: false,
            show : false,
            checkAllPart : [],
            children : [
              { name : "类别",
                checkAll : false,
                show : true,
                checkAllPart : [],
                children: [
                  { name : "商品类别",
                    checkAll : false,
                    isIndeterminate: true,
                    checkAllPart : [],
                    children: ["新增", "删除", "修改","查看"]
                  }
                ]
              }
            ]
          },
          {
            name : "基础数据",
            checkAll : false,
            isActive: true,
            show : true,
            checkAllPart : [],
            children : [
              { name: "商品信息",
                checkAll : false,
                show : "true",
                checkAllPart : [],
                children: [
                  { name : "商品类别",
                    checkAll : false,
                    isIndeterminate: true,
                    checkAllPart :  ["新增", "删除", "修改","查看"],
                    children: ["新增", "删除", "修改","查看"]
                  },
                  { name : "商品品牌",
                    checkAll : false,
                    isIndeterminate: true,
                    checkAllPart : [],
                    children: ["新增", "删除", "修改","查看"]
                  },
                  { name : "商品单位",
                    checkAll : false,
                    isIndeterminate: true,
                    checkAllPart : [],
                    children: ["新增", "删除", "修改","查看"]
                  },
                  { name : "商品档案",
                    checkAll : false,
                    isIndeterminate: true,
                    checkAllPart : [],
                    children: ["新增", "删除", "修改","查看","导入",'下载导入模板',"授权"]
                  },
                  { name : "商品设置",
                    checkAll : false,
                    isIndeterminate: true,
                    checkAllPart : [],
                    children: ["查看", "修改"]
                  },
                  { name : "微商店多规格产品",
                    checkAll : false,
                    isIndeterminate: false,
                    checkAllPart : [],
                    children: ["新增", "删除", "修改","查看"]
                  }

                ]
              },
              {
                name : "门店信息",
                checkAll : false,
                show : false,
                checkAllPart : [],
                children: [
                  { name : "门店管理",
                    checkAll : false,
                    checkAllPart : [],
                    children: ["新增", "删除", "修改","查看"]
                  }

                ]
              }

            ]
          },
          {
            name : "零售管理",
            checkAll : false,
            isActive: false,
            show : false,
            checkAllPart : []
          },
          {
            name : "促销管理",
            checkAll : false,
            isActive: false,
            show : false,
            checkAllPart : [],
            children : [
              { name : "类别",
                checkAll : false,
                show : "true",
                children: [
                  { name : "商品类别",
                    checkAll : false,
                    isIndeterminate: true,
                    checkAllPart : [],
                    children: ["新增", "删除", "修改","查看"]
                  }
                ]
              }
            ]
          },
          {
            name : "会员管理",
            checkAll : false,
            isActive: false,
            checkAllPart : [],
            show : false,
            children : [
              { name : "类别",
                checkAll : false,
                show : "true",
                children: [
                  { name : "商品类别",
                    checkAll : false,
                    isIndeterminate: true,
                    checkAllPart : [],
                    children: ["新增", "删除", "修改","查看"]
                  }
                ]
              }
            ]
          },
          {
            name : "库存管理",
            checkAll : false,
            show : false,
            isActive: false,
            checkAllPart : [],
            children : [
              { name : "类别",
                show : "true",
                checkAll : false,
                children: [
                  { name : "商品类别",
                    checkAll : false,
                    isIndeterminate: true,
                    checkAllPart : [],
                    children: ["新增", "删除", "修改","查看"]
                  }
                ]
              }
            ]
          },
          {
            name : "系统管理",
            checkAll : false,
            checkAllPart : [],
            isActive: false,
            show : false,
            children : [
              { name : "类别",
                show : "true",
                checkAll : false,
                children: [
                  { name : "商品类别",
                    checkAll : false,
                    isIndeterminate: true,
                    checkAllPart : [],
                    children: ["新增", "删除", "修改","查看"]
                  }
                ]
              }
            ]
          },
          {
            name : "微商店",
            isActive: false
//              checkAll : false,
//              checkAllPart : [],
//              children : [
//                { name : "类别",
//                  show : "true",
//                  children:["新增", "删除", "修改","查看"]
//                }
//              ]
          }
        ]




      }
    },
    methods : {
      openTotal:function(ev){
        if(this.isTotalShow == false){
          this.isTotalShow = true;
          this.isTotalShowActive = true;
        }else{
          this.isTotalShow = false;
          this.isTotalShowActive = false;
        }


      },
      openStore:function(){
        if(this.isStoreShow == false){
          this.isStoreShow = true;
          this.isStoreShowActive = true;
        }else{
          this.isStoreShow = false;
          this.isStoreShowActive = false;
        }
      },
      handleNodeClick(data) {
        console.log(data);
        this.$http({
          method: "",
          url: "",
          data: ""
        }).then(function () {
          //成功
        }, function () {
//          失败
        })
      },
      save1 : function () {
        alert("保存")
      },
      reDefault : function () {
        alert("还原默认")
      },
      openShow: function (event) {
        var ele = event.target;
        var data = this.allPowerdata;
        var index = event.target.attributes.index.value;
        if(data[index].show == false){
          data[index].show = true;
          data[index].isActive = true;
        }else{
          data[index].show = false;
          data[index].isActive = false;
        }

      },
      checkAll1:function (event) {
        var index = event.path[2].attributes.index.value;
        var firstPlace = index.substr(0,1);
        var secondPlace = index.substr(1,1);
        var thirdPlace = index.substr(2,1);
        var kindSet = this.allPowerdata[firstPlace].children[secondPlace].children[thirdPlace].children;
        var checkAllPart = this.allPowerdata[firstPlace].children[secondPlace].children[thirdPlace].checkAllPart;
        this.allPowerdata[firstPlace].children[secondPlace].children[thirdPlace].checkAllPart = kindSet;
      },
      checkAll2:function (event) {
        var index = event.path[2].attributes.index.value;
        var firstPlace = index.substr(0,1);
        var secondPlace = index.substr(1,1);
        for(var i in this.allPowerdata[firstPlace].children[secondPlace].children){
          this.allPowerdata[firstPlace].children[secondPlace].children[i].checkAll = true;
          this.allPowerdata[firstPlace].children[secondPlace].children[i].checkAllPart = this.allPowerdata[firstPlace].children[secondPlace].children[i].children
        }
      },
      checkAll3:function (event) {
        var index = event.path[2].attributes.index.value;
        for(var i in this.allPowerdata[index].children){
          this.allPowerdata[index].children[i].checkAll = true;
          for(var j in this.allPowerdata[index].children[i].children){
            this.allPowerdata[index].children[i].children[j].checkAll = true;
            this.allPowerdata[index].children[i].children[j].checkAllPart=this.allPowerdata[index].children[i].children[j].children
          }

        }

      }

    }
  }

</script>


<style lang="scss" scoped>
  @import "../../../assets/admin/css/main/param";
  @import "../../../assets/admin/css/main/comm";
  @import "../../../assets/admin/css/system/rolePower";

  .fg-table-type {
    @include table-container(240px, 10px)
  }

</style>


