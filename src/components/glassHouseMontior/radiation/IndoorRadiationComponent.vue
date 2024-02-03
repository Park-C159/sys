<template>
  <div id="indoorRadiationComponent"></div>
</template>

<script>
import dayjs from "dayjs";

export default {
  data() {
    return {
      data: [],
      myChart2: null,
    };
  },
  methods: {
    drawChart() {
      this.myChart2 = this.$echarts.init(
        document.getElementById("indoorRadiationComponent")
      );

      var minTemp = Math.min(...this.indoorRadiationData.data) - 0.1;
      var maxTemp = Math.max(...this.indoorRadiationData.data) + 0.1;
      minTemp = Math.floor(minTemp);
      maxTemp = Math.ceil(maxTemp);
      let option = {
        title: {
          text: "室内光强",
          left: "center",
        },
        grid: {
          // 四周留白区域设置
          bottom: 10,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.indoorRadiationData.time,
          //   splitNum: 4,

          axisLabel: {
            showMaxLabel: true,
            showMinLabel: true,
            formatter: function (value) {
              return dayjs(value).format("HH:mm:ss"); // 如果使用dayjs格式化
            },
          },
        },
        yAxis: {
          type: "value",
          min: minTemp,
          max: maxTemp,
        },
        tooltip: {
          trigger: "axis",
          formatter: (params) => {
            // params 是一个数组，包含了触发 tooltip 的所有数据点信息
            // 对于简单的线图，我们通常只需要处理第一个数据点
            let result = params
              .map((data) => {
                // data.value 是当前数据点的值
                // data.seriesName 是系列名称，如果需要可以一同显示
                let value = data.value;
                let seriesName = "室内光强：";
                // 使用 toFixed(2) 来格式化数字，保留两位小数
                return `${seriesName}${value.toFixed(2)}`;
              })
              .join("<br/>");

            // 如果你的 X 轴是时间或者其他类型的数据，你可能也想要格式化它
            // 例如，如果是时间，可以使用 dayjs 或其他日期处理库来格式化
            // 这里假设 X 轴的值在 params[0].axisValue 中
            let xAxisValue = params[0].axisValue;
            let formattedXAxisValue = xAxisValue; // 格式化时间

            // 最终的格式化字符串
            return `${formattedXAxisValue}<br/>${result}`;
          },
        },

        series: [
          {
            data: this.indoorRadiationData.data,
            showSymbol: false,
            type: "line",
            smooth: true,
          },
        ],
      };
      this.myChart2.setOption(option);
    },
  },
  mounted() {
    this.drawChart();
  },
  props: {
    indoorRadiationData: null,
  },
  beforeDestroy() {
    if (this.myChart != null) this.myChart.clear();
  },
};
</script>

<style scoped>
#indoorRadiationComponent {
  width: 100%;
  height: 100%;
}
</style>
