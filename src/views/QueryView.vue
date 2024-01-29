<template>
  <div>
    <HeadComponent />
    <div class="container">
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
      <div style="width: 100%; margin-top: 10vh">
        <el-skeleton v-if="show" :rows="12" animated />
        <div>
          <div id="query" style="width: 100%; height: 70vh"></div>
        </div>
      </div>
      <el-button
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
      show: 0,
      show1: 1,
      start: null,
      end: null,
      value2: "",
      data: {},
      DATA: {},
      select1: "",
      test: {
        Ph: [1, 2, 3, 4],
        air_humidity: [1, 23, 4341, 12],
      },
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
    async getSoil(data, num) {
      // var h = JSON.parse(localStorage.hours);
      var h = data;
      let j = 0;
      var time = [];
      var H = [];
      var air_temperture = [];
      var soil_temperture10 = [];
      var soil_temperture20 = [];
      var soil_temperture30 = [];
      var soil_temperture40 = [];
      var soil_temperture50 = [];
      var air_humidity = [];
      var soil_humidity10 = [];
      var soil_humidity20 = [];
      var soil_humidity30 = [];
      var soil_humidity40 = [];
      var soil_humidity50 = [];
      var light_intencity = [];
      var co2 = [];
      var Ph = [];
      var rain_fall = [];
      var electrical_conductivity = [];
      var battery_voltage = [];
      var mainboard_temperture = [];
      var wind_direction = [];
      var wind_speed = [];
      var air_pressure = [];

      for (let i = num - 1; i >= 0; i--) {
        time[j] = new Date(h[i].create_time.slice(0, -4));
        // time[j] = new Date(this.hours[i].create_time)
        H[j] =
          time[j].getMonth() +
          1 +
          "月" +
          time[j].getDate() +
          "日" +
          time[j].getHours() +
          ":00";
        air_temperture[j] = h[i].air_temperture;
        air_humidity[j] = h[i].air_humidity;
        light_intencity[j] = h[i].light_intencity;
        co2[j] = h[i].co2;
        Ph[j] = h[i].Ph;
        rain_fall[j] = h[i].rain_fall;
        electrical_conductivity[j] = h[i].electrical_conductivity;
        battery_voltage[j] = h[i].battery_voltage;
        mainboard_temperture[j] = h[i].mainboard_temperture;
        wind_direction[j] = h[i].wind_direction;
        wind_speed[j] = h[i].wind_speed;
        air_pressure[j] = h[i].air_pressure;

        j++;
      }
      // console.log(h[0]);
      j = 0;
      for (let i = h.length - 1; i > num; i--) {
        soil_temperture10[j] = h[i].soil_temperture10;
        soil_temperture20[j] = h[i].soil_temperture20;
        soil_temperture30[j] = h[i].soil_temperture30;
        soil_temperture40[j] = h[i].soil_temperture40;
        soil_temperture50[j] = h[i].soil_temperture50;
        soil_humidity10[j] = h[i].soil_humidity10;
        soil_humidity20[j] = h[i].soil_humidity20;
        soil_humidity30[j] = h[i].soil_humidity30;
        soil_humidity40[j] = h[i].soil_humidity40;
        soil_humidity50[j] = h[i].soil_humidity50;
        // l[j] =  h[i].light_;
        j++;
      }
      this.DATA = {
        create_time: H,
        air_temperture: air_temperture,
        soil_temperture10: soil_temperture10,
        soil_temperture20: soil_temperture20,
        soil_temperture30: soil_temperture30,
        soil_temperture40: soil_temperture40,
        soil_temperture50: soil_temperture50,
        air_humidity: air_humidity,
        soil_humidity10: soil_humidity10,
        soil_humidity20: soil_humidity20,
        soil_humidity30: soil_humidity30,
        soil_humidity40: soil_humidity40,
        soil_humidity50: soil_humidity50,
        light_intencity: light_intencity,
        co2: co2,
        Ph: Ph,
        rain_fall: rain_fall,
        electrical_conductivity: electrical_conductivity,
        battery_voltage: battery_voltage,
        mainboard_temperture: mainboard_temperture,
        wind_direction: wind_direction,
        wind_speed: wind_speed,
        air_pressure: air_pressure,
      };
      // console.log(this.DATA);
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
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
            // saveAsFile: {show: true}
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
            // name: "Precipitation",
            // interval: 50,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: this.select1,
            type: "line",
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
      // console.log(e,start,end)
    },
    async queryInfo() {
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
          console.log(this.DATA[0]);
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
          console.log(this.DATA);
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

<style>
.container {
  width: 90vw;
  height: calc(100vh - 60px);
  /* background-color: aqua; */
  margin: 0 auto;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-direction: column;
}
</style>
