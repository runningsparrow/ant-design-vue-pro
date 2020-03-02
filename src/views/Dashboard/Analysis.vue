<template>
  <div>
    分析页

    <div>
      <Chart :option="chartOption" style="height: 400px" />
      <button @click="changeoption">点击刷新</button>
    </div>
  </div>
</template>

<script>
//引入随机数
import random from "lodash/random";
import Chart from "../../components/Chart";
export default {
  //将图标的option移动到此处(父组件)
  data() {
    return {
      chartOption: {
        title: {
          text: "ECharts 入门示例"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  mounted() {
    //设定一个计时器来改变图表里面data值
    this.interval = setInterval(() => {
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => random(100)
      );
      //使得图标手动点击而变化 ？
      // this.chartOption = { ...this.chartOption };
    }, 50);
  },
  beforeDestroy() {
    //清除定时器
    clearInterval(this.interval);
  },
  components: {
    Chart
  },
  methods: {
    changeoption: function() {
      this.chartOption = { ...this.chartOption };
    }
  }
};
</script>

<style></style>
