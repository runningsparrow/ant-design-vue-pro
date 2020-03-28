<template>
  <div>
    <!-- 去掉button -->
    <!-- <a-button type="primary" @click="showDrawer">
      Open
    </a-button> -->
    <a-drawer
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      width="300px"
    >
      <!-- 增加一个控制抽屉缩放的按钮 -->
      <template v-slot:handle>
        <div class="setting-drawer-handle" @click="visible = !visible">
          <!-- <a-icon type="setting"></a-icon> -->
          <a-icon :type="visible ? 'close' : 'setting'"></a-icon>
        </div>
      </template>
      <!-- <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p> -->
      <!-- 修改为radio -->
      <div>
        <div>
          <h2>整体风格定制</h2>
          <!-- <a-radio-group v-model="navTheme"> -->
          <a-radio-group
            :value="$route.query.navTheme || 'dark'"
            @change="e => handleSettingChange('navTheme', e.target.value)"
          >
            <a-radio value="dark">黑色</a-radio>
            <a-radio value="light">白色</a-radio>
          </a-radio-group>
          <h2>导航模式</h2>
          <!-- <a-radio-group v-model="navLayout"> -->
          <a-radio-group
            :value="$route.query.navLayout || 'left'"
            @change="e => handleSettingChange('navLayout', e.target.value)"
          >
            <a-radio value="left">左侧</a-radio>
            <a-radio value="top">顶部</a-radio>
          </a-radio-group>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
      // navTheme: 'dark',
      // navLayout: 'left'
    };
  },
  methods: {
    // showDrawer() {
    //   this.visible = true;
    // },
    onClose() {
      this.visible = false;
    },
    //被drawer的radio 点击事件调用
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    }
  }
};
</script>

<style lang="less" src="./index.less"></style>
