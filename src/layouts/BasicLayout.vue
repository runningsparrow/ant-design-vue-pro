<template>
  <!-- nav-theme-  nav-layout- 用于与 drawer的 radio 控制交互颜色和布局-->
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <!-- :trigger="null" 隐藏自带的tirgger -->
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        collapsible
        v-model="collapsed"
        width="256px"
      >
        <div class="logo">ant design vue pro sparrow</div>
        <!-- <SiderMenu /> -->
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <!-- <Header />
    <SiderMenu />
    <router-view></router-view>
    <Footer /> -->
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
//用于header
import SettingDrawer from "../components/SettingDrawer";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  //用于 radio 的变量值计算并返回
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  },
  //注册组件
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer
  }
};
</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.trigger {
  padding: 0 20px;
  line-height: 64px;
}
.trigger:hover {
  background: #eeeeee;
}
/*定制logo颜色和高度*/
.logo {
  height: 64px;
  line-height: 64px;
}
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
</style>
