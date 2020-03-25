<template>
  <div style="text-align: center;">
    <IconFont type="icon-icon-404" style="font-size: 100px" />
    <!-- <img :src="logo" alt=""/> -->
    <Logo />
  </div>
</template>

<script>
//引入本地图标资源
// import logo from "@/assets/logo.svg";
import Logo from "@/assets/logo.svg";

export default {
  // data() {
  //   return {
  //     logo
  //   };
  // }
  components: {
    Logo
  }
};
</script>

<style></style>
