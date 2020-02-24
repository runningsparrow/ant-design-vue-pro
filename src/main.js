import Vue from "vue";
// import Antd from 'ant-design-vue';
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "ant-design-vue/dist/antd.less";
//引入 Layout 用于 BasicLayout布局
import { Button, Layout, Icon, Drawer, Radio, Menu } from "ant-design-vue";
// import "ant-design-vue/lib/button/style";
//引入 Authorized.vue
import Authorized from "./components/Authorized";
//引入directives下的 auth
import Auth from "./directives/auth";

Vue.config.productionTip = false;

// Vue.use(Antd)
Vue.use(Button);
//引入 Layout 用于 BasicLayout布局
Vue.use(Layout);
//引入 Icon 用于 BasicLayout
Vue.use(Icon);
//引入用于 header 的 Drawer
Vue.use(Drawer);
//引入 radio
Vue.use(Radio);
//引入 Menu
Vue.use(Menu);
//引入 Authorized，需要使用 component方式引入
Vue.component("Authorized", Authorized);
//引入directives下的 ,可以使用 use 方式引入，用于控制左侧缩放按钮
Vue.use(Auth);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
