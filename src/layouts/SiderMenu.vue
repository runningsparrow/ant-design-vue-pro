<template>
  <div style="width: 256px">
    <!-- <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button> -->
    <!-- <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['2']"
      mode="inline"
      :theme="theme"
      :inlineCollapsed="collapsed"
    > -->
    <!-- <a-menu
      :selectedKeys="selectedKeys"
      :openKeys="openKeys"
      mode="inline"
      :theme="theme"
      :inlineCollapsed="collapsed"
    > -->
    <!-- openKeys.sync 用于双向绑定 -->
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <!-- <template v-for="item in list">
        <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon type="pie-chart" />
          <span>{{item.title}}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.key" />
      </template> -->
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/*
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from "./SubMenu";
export default {
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  //增加 watch $route.path
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  data() {
    //存一份路由和 keys的对应关系
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    //调用 getmuenudata获取路由配置
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      // list: [
      // {
      //   key: '1',
      //   title: 'Option 1',
      // },
      // {
      //   key: '2',
      //   title: 'Navigation 2',
      //   children: [
      //     {
      //       key: '2.1',
      //       title: 'Navigation 3',
      //       children: [{ key: '2.1.1', title: 'Option 2.1.1' }],
      //     },
      //   ],
      // },

      // ],
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    //定义一个获取菜单内容的方法
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      //循环访问routes配置
      routes.forEach(item => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          //? ...item
          const newItem = { ...item };
          //?
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            //递归时，把 parentKeys 传过去
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path
            ]);
          }
          //当 hideChildrenInMenu 为 true
          else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      });
      //循环结束
      return menuData;
    }
  }
};
</script>
