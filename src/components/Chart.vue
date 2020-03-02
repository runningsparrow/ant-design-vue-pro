<template>
  <!-- <div ref="chartDom" style="height: 400px"></div> -->
  <div ref="chartDom"></div>
</template>

<script>
//引入 echarts
import echarts from "echarts";
//引入 防抖
import debounce from "lodash//debounce";
//引入监听库对dom元素进行监听以保证dom元素的位置和大小
import { addListener, removeListener } from "resize-detector";

export default {
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  //增加对父组件传过的opotion的监听
  watch: {
    option(val) {
      this.chart.setOption(val);
    }

    //配合父组件的interval使用
    // option: {
    //     handler(val) {
    //         this.chart.setOption(val);
    //     },
    //     //深度？
    //     deep: true
    // }
  },
  created() {
    //防止抖动
    this.resize = debounce(this.resize, 300);
  },
  //mounted 方法
  mounted() {
    //用定义的方法进行渲染
    this.renderChart();

    // // 基于准备好的dom，初始化echarts实例
    // // var myChart = echarts.init(this.$refs.chartDom);
    // this.chart = echarts.init(this.$refs.chartDom);
    //监听dom元素变化，而执行的方法
    addListener(this.$refs.chartDom, this.resize);
    // 绘制图表
    // myChart.setOption({
    // this.chart.setOption({
    //     title: {
    //         text: 'ECharts 入门示例'
    //     },
    //     tooltip: {},
    //     xAxis: {
    //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //     },
    //     yAxis: {},
    //     series: [{
    //         name: '销量',
    //         type: 'bar',
    //         data: [5, 20, 36, 10, 10, 20]
    //     }]
    // });
  },
  //在对象被销毁前执行一个监听
  beforeDestroy() {
    //把监听删除
    removeListener(this.$refs.chartDom, this.resize);
    //把图表也销毁
    this.chart.dispose();
    this.chart = null;
  },

  //增加一个方法用于被监听执行
  methods: {
    resize() {
      this.chart.resize();
    },
    //继续改造，渲染图标外移
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      // var myChart = echarts.init(this.$refs.chartDom);
      this.chart = echarts.init(this.$refs.chartDom);
      //this.option 通过父组件传入
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style></style>
