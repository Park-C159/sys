<template>
  <div>
    <div class="historyContainer">
      <div class="block">
        <div class="demonstration">&nbsp;</div>
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          value-format="yyyy-MM-dd HH:mm:00"
          @change="changeDate"
        >
        </el-date-picker>
        <el-select
          v-model="value"
          filterable
          placeholder="请选择项目"
          @change="selectChange()"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-button
          @click="queryInfo"
          style="margin-left: 20px"
          type="primary"
          disabled
          v-if="this.value == ''"
          >查询</el-button
        >
        <el-button
          @click="getData"
          style="margin-left: 20px"
          type="primary"
          v-if="this.value !== ''"
          >查询</el-button
        >
      </div>
      <div class="graph" v-if="show1">
        <el-empty
          style="width: 100%; height: 100%"
          description="请开始查询"
        ></el-empty>
      </div>
      <div class="graph" v-else>
        <el-skeleton v-if="show" :rows="12" animated />
        <div style="width: 100%; height: 100%">
          <div id="query"></div>
        </div>
      </div>
      <el-button
        class="button"
        type="primary"
        size="medium"
        plain
        round
        style="width: 80%"
        @click="download"
        >下载</el-button
      >
    </div>
  </div>
</template>

<script>
import HeadComponent from "@/components/HeadComponent.vue";
import QueryComponent from "@/components/QueryComponent.vue";
// import { type } from '../../../APP/sysApp/uni_modules/uni-forms/components/uni-forms/utils';
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近两个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      options: [
        {
          value: "ourdoor_temperature",
          label: "室外温度",
        },
        {
          value: "ourdoor_humidity",
          label: "室外湿度",
        },
        {
          value: "ourdoor_radiation",
          label: "室外光照强度",
        },
        {
          value: "indoor_temperature",
          label: "室内温度",
        },
        {
          value: "indoor_humidity",
          label: "室内湿度",
        },
        {
          value: "indoor_radiation",
          label: "室内光照强度",
        },
        {
          value: "air_cond_temp",
          label: "空调温度",
        },
        {
          value: "air_cond_switch",
          label: "空调开关",
        },
        {
          value: "spray_switch",
          label: "喷淋开关",
        },
        {
          value: "window_switch",
          label: "通风开关",
        },
      ],
      value: "",
      myChart: null,
      show: 1,
      show1: 1,
      start: null,
      end: null,
      value2: "",
      data: {},
      DATA: {},
      select1: "",
      q: 1,
    };
  },
  mounted() {
    // this.getData()
    // this.drawChart();
  },
  components: {
    HeadComponent,
    QueryComponent,
  },
  methods: {
    selectChange() {
      for (let i = 0; i < 22; i++) {
        if (this.value == this.options[i].value) {
          this.select1 = this.options[i].label;
          break;
        }
      }
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart = this.$echarts.init(document.getElementById("query"));
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          formatter: (params) => {
            // params 是一个数组，包含了触发 tooltip 的所有数据点信息
            // 对于简单的线图，我们通常只需要处理第一个数据点
            let result = params
              .map((data) => {
                // data.value 是当前数据点的值
                // data.seriesName 是系列名称，如果需要可以一同显示
                let value = data.value;
                for (let option of this.options) {
                  if (option.value == this.value) {
                    var seriesName = option.label + "：";
                    break;
                  }
                }
                // console.log(this.value,this.options)
                // console.log(this.options[this.value])
                // let seriesName = this.options[this.value];
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
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: [this.select1],
        },
        xAxis: [
          {
            type: "category",
            data: this.DATA.datetime,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: this.select1,
            type: "line",
            showSymbol: false,
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: this.DATA[this.value],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    changeDate(e) {
      this.start = e[0];
      this.end = e[1];
    },
    async queryInfo() {
      this.show1 = 0;
      if (!this.start) return;
      let url = this.$store.state.url;
      url = url + "query";
      let params = {
        start: this.start,
        end: this.end,
      };

      this.show = 1;
      this.$axios
        .post(url, params)
        .then((res) => {
          let data = res.data;
          this.DATA = data.data;
          if (data.code == 300) {
            this.$message({
              message: data.msg,
              type: "warning",
            });
          } else if (data.code == 200) {
            var len = Math.floor(data.data.length / 2);
            this.getSoil(data.data, len);
            this.$message({
              message: data.msg,
              type: "success",
            });
            setTimeout(() => {
              this.show = 0;
              this.drawChart();
            }, 1000);
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch((err) => {
          this.$message.error("服务器开小差了，请稍后重试！");
          console.error(err);
        });
    },
    download() {
      let data = this.DATA;
      let csvContent = "";

      // 获取所有字段名（对象的键）
      const fields = Object.keys(data);
      // 添加表头
      csvContent += fields.join(",") + "\n";

      // 获取最大数组长度，以处理不同字段的数据长度可能不同的情况
      const maxLength = Math.max(
        ...Object.values(data).map((arr) => arr.length)
      );

      // 构建每一行的数据
      for (let i = 0; i < maxLength; i++) {
        let row = fields
          .map((field) => {
            // 检查字段数组的长度，避免超出索引
            return data[field].length > i ? data[field][i] : "";
          })
          .join(",");
        csvContent += row + "\n";
      }

      // 创建下载链接并触发下载
      const uri =
        "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(csvContent);
      const link = document.createElement("a");
      link.href = uri;
      link.download = "data.csv";
      link.click();
    },
    async getData() {
      this.show1 = 0;
      var params = {
        start: this.start,
        end: this.end,
        param: this.select1,
      };
      let url = this.$store.state.url + "data";
      await this.$axios
        .post(url, params)
        .then((res) => {
          var data = res.data;
          this.DATA = data.data;
          if (data.code == "200") {
            this.$message({
              message: data.msg,
              type: "success",
            });
            setTimeout(() => {
              this.show = 0;
              this.drawChart();
            }, 1000);
          }
        })
        .catch((err) => {
          this.$message.error("服务器开小差了，请稍后重试！");
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.historyContainer {
  width: 100%;
  height: calc(100vh - 60px - 40px);
  /* background-color: aqua; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}
#query {
  height: 100%;
  width: 100%;
}
.block {
  height: 61px;
}
.button {
  height: 36px;
}
.graph {
  width: 100%;
  height: calc((100vh - 60px - 61px - 40px - 36px) * 0.98);
}
</style>
