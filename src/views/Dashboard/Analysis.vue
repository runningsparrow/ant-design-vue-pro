<template>
  <div>
    分析页

    <div>
      {{ $t("message")["app.dashbaord.analysis.timeLabel"] }} :
      <a-date-picker></a-date-picker>
      <Chart :option="chartOption" style="height: 400px" />
      <button @click="changeoption">点击刷新</button>
      <!-- If you want to highlight hardcoded source-code -->
      <pre v-highlightjs="chartCode"><code class="html"></code></pre>
    </div>
  </div>
</template>

<script>
//引入随机数
// import random from "lodash/random";
//引入ajax 组件
// import axios from "axios";
//引入二次封装 axios的 request.js
import request from "../../utils/request";
import Chart from "../../components/Chart";
import chartCode from "!!raw-loader!../../components/Chart";
export default {
  //将图标的option移动到此处(父组件)
  data() {
    return {
      chartOption: {
        // title: {
        //   text: "ECharts 入门示例"
        // },
        // tooltip: {},
        // xAxis: {
        //   data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        // },
        // yAxis: {},
        // series: [
        //   {
        //     name: "销量",
        //     type: "bar",
        //     data: [5, 20, 36, 10, 10, 20]
        //   }
        // ]
      },
      //
      chartCode
    };
  },
  mounted() {
    //先调用一次ajax 获取第一次的数据
    this.getChartData();
    //设定一个计时器来改变图表里面data值
    this.interval = setInterval(() => {
      // this.chartOption.series[0].data = this.chartOption.series[0].data.map(
      //   () => random(100)
      // );
      //改成调用 ajax方法获取数据
      this.getChartData();
      //使得图标手动点击而变化 ？
      // this.chartOption = { ...this.chartOption };
    }, 3000);
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
    },
    //methods中加入 ajax 方法来获取图表数据，来替换固定的数据
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { ID: 12345 }
      }).then(response => {
        this.chartOption = {
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
              data: response.data
            }
          ]
        };
      });
      // axios
      //   .get("/api/dashboard/chart", { params: { ID: 12345 } })
      //   .then(response => {
      //     this.chartOption = {
      //       title: {
      //         text: "ECharts 入门示例"
      //       },
      //       tooltip: {},
      //       xAxis: {
      //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      //       },
      //       yAxis: {},
      //       series: [
      //         {
      //           name: "销量",
      //           type: "bar",
      //           data: response.data
      //         }
      //       ]
      //     };
      //   });
    }
  }
};
</script>

<style></style>
