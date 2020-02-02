import Vue from "vue";
// import Antd from 'ant-design-vue';
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import "ant-design-vue/dist/antd.less";
//引入 Layout 用于 BasicLayout布局
import { Button, Layout, Icon } from "ant-design-vue";
// import "ant-design-vue/lib/button/style";

Vue.config.productionTip = false;

// Vue.use(Antd)
Vue.use(Button);
//引入 Layout 用于 BasicLayout布局
Vue.use(Layout);
//引入 Icon 用于 BasicLayout
Vue.use(Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
