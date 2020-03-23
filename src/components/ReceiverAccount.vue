<template>
  <a-input-group compact>
    <!-- <a-select defaultValue="Option1"> -->
    <a-select v-model="type" style="width: 130px" @change="handleTypeChange">
      <a-select-option value="alipay">支付宝</a-select-option>
      <a-select-option value="bank">银行账户</a-select-option>
    </a-select>
    <!-- <a-input style="width: 50%" defaultValue="input content" /> -->
    <a-input
      style="width: calc(100% - 130px)"
      v-model="number"
      @change="handleNumberChange"
    />
  </a-input-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Object
    }
  },
  //监听
  watch: {
    value(val) {
      Object.assign(this, val);
    }
  },
  data() {
    const { type, number } = this.value || {}; //没有值就取空
    return {
      type: type || "alipay",
      number: number || ""
    };
  },
  //值变化后的处理
  handleTypeChange(val) {
    this.$emit("change", { ...this.value, type: val });
  },
  handleNumberChange(e) {
    this.$emit("change", { ...this.value, number: e.target.value });
  }
};
</script>

<style></style>
