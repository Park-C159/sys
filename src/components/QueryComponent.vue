<template>
  <div>
    <div id="query" style="width: 100%; height: 70vh"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
      this.drawChart();
  },
  methods: {
      drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart = this.$echarts.init(document.getElementById("query"));
      // 指定图表的配置项和数据
      let option = {
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: -60,
            max: 60,
            splitNumber: 12,
            itemStyle: {
              color: "#FFAB91",
            },
            progress: {
              show: true,
              width: 8,
            },

            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 8,
              },
            },
            axisTick: {
              distance: -12,
              length: 2,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: "#222",
              },
            },
            splitLine: {
              distance: -15,
              length: 5,
              lineStyle: {
                width: 2,
                color: "#222",
              },
            },
            axisLabel: {
              distance: -8,
              color: "#333",
              fontSize: 8,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              width: "60%",
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, "20%"],
              fontSize: 20,
              fontWeight: "bolder",
              formatter: "{value} °C \n温度",
              color: "inherit",
            },
            data: [
              {
                value: this.environmentInfo.air_temperture,
              },
            ],
          },

          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: -60,
            max: 60,
            itemStyle: {
              color: "#FD7347",
            },
            progress: {
              show: true,
              width: 2,
            },

            pointer: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: this.environmentInfo.air_temperture,
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
  },
};
</script>

<style></style>
