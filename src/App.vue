<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <!-- <a-button>按钮</a-button> -->
      <!-- <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <!-- <router-link to="/dashboard/analysis">dashboard</router-link> |
      <router-link to="/form">form</router-link> -->
      <!-- </div> -->
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
//引入moment
import moment from "moment";
export default {
  data() {
    return {
      locale: zhCN
    };
  },
  watch: {
    "$route.query.locale": function(val) {
      this.locale = val === "enUS" ? enUS : zhCN;
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    }
  }
};
</script>
<style lang="less"></style>
