<template>
  <aside id="left-panel">
    <!-- NAVIGATION : This navigation is also responsive-->
    <nav>
      <ul>
        <template v-for="(menu,key,index) in menus">
          <li :class="{active:menu.active}">
            <router-link :to="menu.link?menu.link:''">
              <i class="fa fa-lg fa-fw" :class="menu.icon"></i>
              <span class="menu-item-parent" @click="menu.active = !menu.active">{{menu.name}}</span>
              <b class="collapse-sign"><em class="fa fa-plus-square-o"></em></b>
            </router-link>
            <ul v-if="menu.children" :style="{display:menu.active?'block':'none'}" >

              <template v-for="subMenu in menu.children">
                <router-link :to="subMenu.link" activeClass="active" exact=""
                             tag="li">
                  <a href="#">{{subMenu.name}}</a>
                </router-link>
              </template>

            </ul>
          </li>
        </template>
      </ul>
    </nav>
    <span class="minifyme" data-action="minifyMenu">
				<i class="fa fa-arrow-circle-left hit"></i>
			</span>

  </aside>
</template>


<style lang="scss" scoped>

</style>
<script type="text/javascript">
  export default{
    data: function () {
      return {
        menus: [
          {
            name: '商品管理',
            icon: 'fa-bar-chart-o',
            order: '0',
            link: '',
            active: true,
            children: [
              {
                name: '商品列表',
                icon: '',
                order: '',
                link: '/product/list',
                active: true,
              },
              {
                name: '新增商品',
                icon: '',
                order: '1',
                link: '/product/add',
                active: false,
              },
              {
                name: '商品类目',
                icon: '',
                order: '2',
                link: '/category/list',
                active: false,
              },
              {
                name: '品牌管理',
                icon: '',
                order: '3',
                link: '/brand/list',
                active: false,
              },
            ]
          },
          {
            name: '表单管理',
            icon: 'fa-bar-chart-o',
            order: '0',
            link: '',
            active: true,
            children: [
              {
                name: '表单列表',
                icon: '',
                order: '0',
                link: '/form/list',
                active: false,
              },
              {
                name: '新增表单',
                icon: '',
                order: '1',
                link: '/form/add',
                active: false,
              },
            ]
          },
        ]
      }
    },
    methods: {
      activeMenu: function () {

      }
    }
  }

</script>
