<template>
  <div style="">
    <div id="container">
      <HeadComponent style="height: 6vh" />
      <el-row style="padding: 0 1%">
        <el-col :span="8">
          <div class="video" style="height: 37vh">
            <video width="100%" height="100%" controls="controls">
              <source src="../assets/test.mp4" type="video/mp4" />
              <object data="../assets/test.mp4" width="320" height="240">
                <embed src="../assets/yolov5.swf" width="320" height="240" />
              </object>
            </video>
          </div>
          <div id="warn" style="margin-top: 0.5vh; height: 24vh">
            <div class="gradient-border" style="">
              <h2 style="color: #f56c6c; margin-bottom: 3%">
                <i class="el-icon-warning-outline"></i> 报警记录
              </h2>
              <div>
                <ul
                  style="padding-left: 10px; overflow: hidden; margin: 10px 0"
                  v-for="(item, i) in warn"
                  :key="i"
                >
                  <li
                    style="
                      display: flex;
                      align-tiems: center;
                      justify-content: space-between;
                    "
                  >
                    <span style="font=size: 1.5vh; line-height: 2vh"
                      ><i class="el-icon-tickets"></i> &nbsp;{{
                        item.content
                      }}</span
                    >
                    <span style="font-size: 1vh; line-height: 2vh">{{
                      item.wtime
                    }}</span>
                  </li>
                </ul>
                <el-pagination
                  @current-change="handleCurrentChange"
                  style="
                    display: flex;
                    justify-content: center;
                    margin-top: 5px;
                  "
                  layout="prev, pager, next"
                  small
                  :total="totalNum"
                  :page-size="4"
                ></el-pagination>
              </div>
            </div>
          </div>
          <div id="soil_tem" style="background-color: #111845a6; height: 30vh">
            <div class="incomplete1 incomplete">
              <h2 style="text-align: center">环境信息</h2>
              <div id="whole_light" style="width: 100%; height: 24vh"></div>
            </div>
            <el-select
              v-model="value"
              style=""
              filterable
              placeholder="小时"
              size="mini"
              :popper-append-to-body="false"
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
          </div>
        </el-col>
        <el-col :span="8">
          <div
            id="soil_tem"
            style="background-color: #111845a6; height: 30.6vh"
          >
            <div class="incomplete">
              <h2 style="text-align: center">土壤温度</h2>
              <div id="whole_tem" style="width: 100%; height: 25vh"></div>
            </div>
            <el-select
              v-model="value1"
              style=""
              filterable
              placeholder="小时"
              size="mini"
              @change="selectChange1()"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div
            id="soil_tem"
            style="background-color: #111845a6; height: 30.7vh"
          >
            <div class="incomplete">
              <h2 style="text-align: center">土壤湿度</h2>
              <div id="whole_hum" style="width: 100%; height: 25vh"></div>
            </div>
            <el-select
              v-model="value2"
              style=""
              filterable
              placeholder="小时"
              size="mini"
              @change="selectChange2()"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div
            id="soil_tem"
            style="background-color: #111845a6; height: 30.7vh"
          >
            <div class="incomplete">
              <!-- <h2 style="text-align: center">土壤温度</h2> -->
              <div id="ph" style="width: 100%; height: 28vh"></div>
            </div>
            <el-select
              v-model="value3"
              style=""
              filterable
              placeholder="小时"
              size="mini"
              @change="selectChange3()"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="environment sunny" v-if="environmentInfo.rain_fall == 0">
            <h2 class="title">实时环境信息</h2>
            <div class="time">{{ currentTime }}</div>
            <div id="enInfo">
              <div id="temperture" style="width: 18vh; height: 18vh"></div>
              <div id="humidity" style="width: 18vh; height: 18vh"></div>
              <div id="light" style="width: 18vh; height: 18vh"></div>
            </div>
            <div id="enInfo2">
              <div class="rain">
                <div style="margin-left: 20px">
                  <div>小时降水量</div>
                  <span>{{ environmentInfo.rain_fall }}</span>
                  <span>mm</span>
                </div>
              </div>
              <div class="wind">
                <div>
                  <div>顺势风向</div>
                  <span class="num">{{ environmentInfo.wind_direction }}</span>
                  <span>°</span>
                </div>
                <div>
                  <div>瞬时风速</div>
                  <span class="num">{{ environmentInfo.wind_speed }}</span>
                  <span>m/s</span>
                </div>
              </div>
            </div>
          </div>
          <div class="environment rainy" v-else>
            <h2 class="title">实时环境信息</h2>
            <div class="time">{{ currentTime }}</div>
            <div id="enInfo">
              <div id="temperture1" style="width: 18vh; height: 18vh"></div>
              <div id="humidity1" style="width: 18vh; height: 18vh"></div>
              <div id="light1" style="width: 18vh; height: 18vh"></div>
            </div>
            <div id="enInfo2">
              <div class="rain">
                <div style="margin-left: 20px">
                  <div>小时降水量</div>
                  <span>{{ environmentInfo.rain_fall }}</span>
                  <span>mm</span>
                </div>
              </div>
              <div class="wind">
                <div>
                  <div>顺势风向</div>
                  <span class="num">{{ environmentInfo.wind_direction }}</span>
                  <span>°</span>
                </div>
                <div>
                  <div>瞬时风速</div>
                  <span class="num">{{ environmentInfo.wind_speed }}</span>
                  <span>m/s</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="caozuo"
            style="height: 31.5vh; cursor: pointer"
            @click="manage"
          >
            <h2 class="title">农事信息管理</h2>
            <div style="display: flex; justify-content: space-around">
              <div
                style="
                  color: #fff;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <img src="../assets/化肥.png" style="width: 10vh" alt="" />
                <table
                  style="font-size: 1.8vh; cellspacing: 1; margin-top: 2vh"
                  v-for="(item, i) in manure"
                  :key="i"
                >
                  <tr>
                    <td style="font-size: 1.5vh; text-align: center">
                      {{ item.mtime }}
                    </td>
                    <td>{{ item.mname }}</td>
                    <td>{{ item.mdose }}</td>
                  </tr>
                </table>
              </div>
              <div
                style="
                  color: #fff;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <img src="../assets/guangai.png" style="width: 10vh" alt="" />
                <table
                  style="font-size: 1.8vh; cellspacing: 1; margin-top: 2vh"
                  v-for="(item, i) in water"
                  :key="i"
                >
                  <tr>
                    <td style="font-size: 1.5vh; text-align: center">
                      {{ item.mtime }}
                    </td>
                    <td>{{ item.mdose }}</td>
                  </tr>
                </table>
              </div>
              <div
                style="
                  color: #fff;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <img src="../assets/penyao.png" style="width: 10vh" alt="" />
                <table
                  style="font-size: 1.8vh; cellspacing: 1; margin-top: 2vh"
                  v-for="(item, i) in pesticide"
                  :key="i"
                >
                  <tr>
                    <td style="font-size: 1.5vh; text-align: center">
                      {{ item.mtime }}
                    </td>
                    <td>{{ item.mname }}</td>
                    <td>{{ item.mdose }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="background-img">
            <div class="box">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <div class="content">
                <h2><i class="el-icon-cpu"></i>&nbsp;设备状态</h2>
                <div
                  style="
                    display: flex;
                    justify-content: space-around;
                    height: 100px;
                    align-items: center;
                  "
                >
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div style="font-size: 2.5vh; padding: 10px 0">
                      主板温度
                    </div>
                    <div>
                      <span>{{
                        this.environmentInfo.mainboard_temperture
                      }}</span
                      ><span> ℃</span>
                    </div>
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div style="font-size: 2.5vh; padding: 10px 0">
                      电池电压
                    </div>
                    <div>
                      <span>{{ this.environmentInfo.battery_voltage }}</span
                      ><span> V</span>
                    </div>
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <div style="font-size: 2.5vh; padding: 10px 0">电导率</div>
                    <div>
                      <span>{{
                        this.environmentInfo.electrical_conductivity
                      }}</span
                      ><span> S/m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="ech"></div>
    </div>
  </div>
</template>

<script>
import HeadComponent from "@/components/HeadComponent.vue";

export default {
  name: "Home",
  data() {
    return {
      currentTime: "",
      environmentInfo: {},
      timer1: null,
      myChart: null,
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChart5: null,
      myChart6: null,
      myChart7: null,
      myChart8: null,
      myChart9: null,
      timer2: null,
      hours: {},
      soil: {},
      soil1: {},
      soil2: {},
      options: [
        {
          value: "1",
          label: "分钟",
        },
        {
          value: "2",
          label: "小时",
        },
        {
          value: "3",
          label: "天",
        },
      ],
      value: "2",
      value1: "2",
      value2: "2",
      value3: "2",
      minutes: {},
      days: {},
      warning: [],
      warn: [],
      totalNum: 0,
      manure: [],
      water: [],
      pesticide: [],
    };
  },
  components: {
    // HelloWorld,
    HeadComponent,
  },
  methods: {
    handleCurrentChange(val) {
      var start = (val - 1) * 4;
      this.warn = this.warning.slice(start, start + 4);
    },
    selectChange() {
      if (this.value == 1) {
        this.myChart8.setOption({
          xAxis: [
            {
              data: this.soil1.create_time,
            },
          ],

          series: [
            {
              data: this.soil1.rain_fall,
            },
            {
              data: this.soil1.co2,
            },
            {
              data: this.soil1.light,
            },
          ],
        });
      } else if (this.value == 2) {
        this.myChart8.setOption({
          xAxis: [
            {
              data: this.soil.create_time,
            },
          ],

          series: [
            {
              data: this.soil.rain_fall,
            },
            {
              data: this.soil.co2,
            },
            {
              data: this.soil.light,
            },
          ],
        });
      } else if (this.value == 3) {
        this.myChart8.setOption({
          xAxis: [
            {
              data: this.soil2.create_time,
            },
          ],

          series: [
            {
              data: this.soil2.rain_fall,
            },
            {
              data: this.soil2.co2,
            },
            {
              data: this.soil2.light,
            },
          ],
        });
      }
    },
    selectChange1() {
      if (this.value1 == 1) {
        this.myChart6.setOption({
          xAxis: [
            {
              data: this.soil1.create_time,
            },
          ],

          series: [
            {
              data: this.soil1.airt,
            },
            {
              data: this.soil1.st10,
            },
            {
              data: this.soil1.st20,
            },
            {
              data: this.soil1.st30,
            },
            {
              data: this.soil1.st40,
            },
          ],
        });
      } else if (this.value1 == 2) {
        this.myChart6.setOption({
          xAxis: [
            {
              data: this.soil.create_time,
            },
          ],

          series: [
            {
              data: this.soil.airt,
            },
            {
              data: this.soil.st10,
            },
            {
              data: this.soil.st20,
            },
            {
              data: this.soil.st30,
            },
            {
              data: this.soil.st40,
            },
          ],
        });
      } else if (this.value1 == 3) {
        this.myChart6.setOption({
          xAxis: [
            {
              data: this.soil2.create_time,
            },
          ],

          series: [
            {
              data: this.soil2.airt,
            },
            {
              data: this.soil2.st10,
            },
            {
              data: this.soil2.st20,
            },
            {
              data: this.soil2.st30,
            },
            {
              data: this.soil2.st40,
            },
          ],
        });
      }
    },
    selectChange2() {
      if (this.value2 == 1) {
        this.myChart7.setOption({
          xAxis: [
            {
              data: this.soil1.create_time,
            },
          ],

          series: [
            {
              data: this.soil1.sh50,
            },
            {
              data: this.soil1.sh10,
            },
            {
              data: this.soil1.sh20,
            },
            {
              data: this.soil1.sh30,
            },
            {
              data: this.soil1.sh40,
            },
          ],
        });
      } else if (this.value2 == 2) {
        this.myChart7.setOption({
          xAxis: [
            {
              data: this.soil.create_time,
            },
          ],

          series: [
            {
              data: this.soil.sh50,
            },
            {
              data: this.soil.sh10,
            },
            {
              data: this.soil.sh20,
            },
            {
              data: this.soil.sh30,
            },
            {
              data: this.soil.sh40,
            },
          ],
        });
      } else if (this.value2 == 3) {
        this.myChart7.setOption({
          xAxis: [
            {
              data: this.soil2.create_time,
            },
          ],

          series: [
            {
              data: this.soil2.sh50,
            },
            {
              data: this.soil2.sh10,
            },
            {
              data: this.soil2.sh20,
            },
            {
              data: this.soil2.sh30,
            },
            {
              data: this.soil2.sh40,
            },
          ],
        });
      }
    },
    selectChange3() {
      console.log(this.value3);
      if (this.value3 == 1) {
        this.myChart9.setOption({
          xAxis: [
            {
              data: this.soil1.create_time,
            },
          ],
          series: [
            {
              data: this.soil1.ph,
            },
          ],
        });
      } else if (this.value3 == 2) {
        this.myChart9.setOption({
          xAxis: [
            {
              data: this.soil.create_time,
            },
          ],

          series: [
            {
              data: this.soil.ph,
            },
          ],
        });
      } else if (this.value3 == 3) {
        this.myChart9.setOption({
          xAxis: [
            {
              data: this.soil2.create_time,
            },
          ],

          series: [
            {
              data: this.soil2.ph,
            },
          ],
        });
      }
    },
    manage() {
      this.$router.push("/manage");
    },
    test() {
      // this.getInfo();
    },
    getSoil(data, num) {
      // var h = JSON.parse(localStorage.hours);
      var h = JSON.parse(data);
      let j = 0;
      var time = [];
      var H = [];
      var airt = [];
      var st10 = [];
      var st20 = [];
      var st30 = [];
      var st40 = [];
      var airh = [];
      var sh10 = [];
      var sh20 = [];
      var sh30 = [];
      var sh40 = [];
      var sh50 = [];
      var l = [];
      var co2 = [];
      var ph = [];
      var rain = [];

      var soil = {};
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
        airt[j] = h[i].air_temperture;
        airh[j] = h[i].air_humidity;
        l[j] = h[i].light_intencity;
        co2[j] = h[i].co2;
        ph[j] = h[i].Ph;
        rain[j] = h[i].rain_fall;
        j++;
      }
      // console.log(h[0]);
      j = 0;
      for (let i = h.length - 1; i >= num; i--) {
        st10[j] = h[i].soil_temperture10;
        st20[j] = h[i].soil_temperture20;
        st30[j] = h[i].soil_temperture30;
        st40[j] = h[i].soil_temperture40;
        sh10[j] = h[i].soil_humidity10;
        sh20[j] = h[i].soil_humidity20;
        sh30[j] = h[i].soil_humidity30;
        sh40[j] = h[i].soil_humidity40;
        sh50[j] = h[i].soil_humidity50;
        // l[j] =  h[i].light_;
        j++;
      }
      soil = {
        create_time: H,
        airt: airt,
        st10: st10,
        st20: st20,
        st30: st30,
        st40: st40,
        airh: airh,
        sh10: sh10,
        sh20: sh20,
        sh30: sh30,
        sh40: sh40,
        sh50: sh50,
        co2: co2,
        ph: ph,
        light: l,
        rain_fall: rain,
      };
      return soil;
    },
    async getInfo() {
      let url = this.$store.state.url;
      url = url + "environment";
      await this.$axios
        .get(url)
        .then((res) => {
          this.environmentInfo = res.data.data[0];
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getTime() {
      var date = new Date();
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D = date.getDate() + "日 ";
      var h = date.getHours() + ":";
      // var m = date.getMinutes();
      var m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.currentTime = Y + M + D + h + m + s;
      return {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
      };
    },
    drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart = this.$echarts.init(document.getElementById("temperture"));
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
    drawChart1() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart1 = this.$echarts.init(document.getElementById("humidity"));
      // 指定图表的配置项和数据
      let option = {
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: "blue",
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
              color: "#222",
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
              formatter: "{value} % \n 湿度",
              color: "inherit",
            },
            data: [
              {
                value: this.environmentInfo.air_humidity,
              },
            ],
          },

          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            itemStyle: {
              color: "aqua",
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
                value: this.environmentInfo.air_humidity,
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart1.setOption(option);
    },
    drawChart2() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart2 = this.$echarts.init(document.getElementById("light"));
      // 指定图表的配置项和数据
      let option = {
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100000,
            splitNumber: 10,
            itemStyle: {
              color: "orange",
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
              color: "#222",
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
              fontSize: 15,
              fontWeight: "bolder",
              formatter: "{value} Lux \n光照强度",
              color: "inherit",
            },
            data: [
              {
                value: this.environmentInfo.light_intencity,
              },
            ],
          },

          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100000,
            itemStyle: {
              color: "brown",
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
                value: this.environmentInfo.light_intencity,
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart2.setOption(option);
    },
    drawChart3() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart3 = this.$echarts.init(
        document.getElementById("temperture1")
      );
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
                color: "#fff",
              },
            },
            splitLine: {
              distance: -15,
              length: 5,
              lineStyle: {
                width: 2,
                color: "#fff",
              },
            },
            axisLabel: {
              distance: -8,
              color: "#fff",
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
      this.myChart3.setOption(option);
    },
    drawChart4() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart4 = this.$echarts.init(document.getElementById("humidity1"));
      // 指定图表的配置项和数据
      let option = {
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: "aqua",
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
                color: "#fff",
              },
            },
            splitLine: {
              distance: -15,
              length: 5,
              lineStyle: {
                width: 2,
                color: "#fff",
              },
            },
            axisLabel: {
              distance: -8,
              color: "#fff",
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
              formatter: "{value} % \n 湿度",
              color: "inherit",
            },
            data: [
              {
                value: this.environmentInfo.air_humidity,
              },
            ],
          },

          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            itemStyle: {
              color: "blue",
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
                value: this.environmentInfo.air_humidity,
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart4.setOption(option);
    },
    drawChart5() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart5 = this.$echarts.init(document.getElementById("light1"));
      // 指定图表的配置项和数据
      let option = {
        series: [
          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100000,
            splitNumber: 10,
            itemStyle: {
              color: "orange",
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
                color: "#fff",
              },
            },
            splitLine: {
              distance: -15,
              length: 5,
              lineStyle: {
                width: 2,
                color: "#fff",
              },
            },
            axisLabel: {
              distance: -8,
              color: "#fff",
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
              fontSize: 15,
              fontWeight: "bolder",
              formatter: "{value} Lux \n光照强度",
              color: "inherit",
            },
            data: [
              {
                value: this.environmentInfo.light_intencity,
              },
            ],
          },

          {
            type: "gauge",
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100000,
            itemStyle: {
              color: "brown",
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
                value: this.environmentInfo.light_intencity,
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart5.setOption(option);
    },
    async getHours() {
      let url = this.$store.state.url;
      url = url + "hours";
      await this.$axios
        .get(url)
        .then((res) => {
          this.hours = res.data.data;
          localStorage.setItem("hours", JSON.stringify(this.hours));
        })
        .catch((err) => {
          console.error(err);
        });
    },
    drawChart6() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart6 = this.$echarts.init(document.getElementById("whole_tem"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          // text: "土壤温度",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            "地表温度",
            "10cm土壤温度",
            "20cm土壤温度",
            "30cm土壤温度",
            "40cm土壤温度",
          ],
          textStyle: {
            color: "#fff",
          },
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.soil.create_time,
          position: "bottom",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          splitNum: 4,

          axisLabel: {
            showMaxLabel: true,
            showMinLabel: true,
            
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },

        grid: {
          left: "5%",
          right: "8%",
          bottom: "3%",
          containLabel: true,
        },
        series: [
          {
            name: "地表温度",
            type: "line",
            symbol: "none",
            data: this.soil.airt,
            color: "#ff9912",
            widhth: 0.5,
          },
          {
            name: "10cm土壤温度",
            type: "line",
            symbol: "none",
            color: "#00ffff",
            data: this.soil.st10,
            widhth: 0.5,
          },
          {
            name: "20cm土壤温度",
            symbol: "none",
            type: "line",
            data: this.soil.st20,
            color: "#7fffd4",
            widhth: 0.5,
          },
          {
            name: "30cm土壤温度",
            type: "line",
            symbol: "none",
            data: this.soil.st30,
            color: "#40e0d0",
            widhth: 0.5,
          },
          {
            name: "40cm土壤温度",
            symbol: "none",
            type: "line",
            data: this.soil.st40,
            color: "#7fff00",
            widhth: 0.5,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart6.setOption(option);
    },
    drawChart7() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart7 = this.$echarts.init(document.getElementById("whole_hum"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          // text: "土壤温度",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            "10cm土壤湿度",
            "20cm土壤湿度",
            "30cm土壤湿度",
            "40cm土壤湿度",
            "50cm土壤湿度",
          ],
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "3%",
          right: "8%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {
              show: false,
            },
          },
        },

        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.soil.create_time,
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
          splitNum: 4,
          axisLabel: {
            showMaxLabel: true,
            showMinLabel: true,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff",
            },
          },
        },
        series: [
          {
            name: "50cm土壤湿度",
            type: "line",
            symbol: "none",
            data: this.soil.sh50,
            color: "#ff9912",
            widhth: 0.5,
          },
          {
            name: "10cm土壤湿度",
            type: "line",
            symbol: "none",
            color: "#00ffff",
            data: this.soil.sh10,
            widhth: 0.5,
          },
          {
            name: "20cm土壤湿度",
            symbol: "none",
            type: "line",
            data: this.soil.sh20,
            color: "#7fffd4",
            widhth: 0.5,
          },
          {
            name: "30cm土壤湿度",
            type: "line",
            symbol: "none",
            data: this.soil.sh30,
            color: "#40e0d0",
            widhth: 0.5,
          },
          {
            name: "40cm土壤湿度",
            symbol: "none",
            type: "line",
            // stack: "Total",
            data: this.soil.sh40,
            color: "#7fff00",
            widhth: 0.5,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart7.setOption(option);
    },
    drawChart8() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart8 = this.$echarts.init(
        document.getElementById("whole_light")
      );
      const colors = ["blue", "#91CC75", "orange"];
      let option = {
        color: colors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          left: "2%",
          right: "10%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: false },
          },
        },

        legend: {
          data: ["降水量", "CO₂浓度", "光照强度"],
          textStyle: {
            color: "#fff",
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
            },
            // prettier-ignore
            data: this.soil.create_time,
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
            splitNum: 3,
            axisLabel: {
              showMaxLabel: true,
              showMinLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "降水量\n(mm)",
            position: "right",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0],
              },
            },
            min: 0,
            max: 250,
            // axisLabel: {
            //   formatter: '{value} ml'
            // }
          },
          {
            type: "value",
            name: "CO₂浓度\n(%)",
            position: "right",
            alignTicks: true,
            offset: 50,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1],
              },
            },
            min: 0,
            max: 100,
            // axisLabel: {
            //   formatter: '{value} ml'
            // }
          },
          {
            type: "value",
            name: "光照强度\n(Lux)",
            position: "left",
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2],
              },
            },
            min: 0,
            max: 100000,
            // axisLabel: {
            //   formatter: '{value} °C'
            // }
          },
        ],
        series: [
          {
            name: "降水量",
            type: "bar",
            data: this.soil.rain_fall,
          },
          {
            name: "CO₂浓度",
            type: "line",
            yAxisIndex: 1,
            data: this.soil.co2,
          },
          {
            name: "光照强度",
            type: "line",
            yAxisIndex: 2,
            data: this.soil.light,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart8.setOption(option);
    },
    drawChart9() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      this.myChart9 = this.$echarts.init(document.getElementById("ph"));
      // prettier-ignore

      let option = {
        // Make gradient line here
        visualMap: [
          {
            show: true,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 14,
            textStyle:{
              color: '#fff',

            },
            inRange:{                               //定义 在选中范围中 的视觉元素
                  color: ['#680202','red','orange','yellow', '#ffc400','green','darkgreen','blue', 'navy'],
              },
              right:0,
              bottom:30,
          },
        ],
        title: [
          {
            left: 'center',
            text: '土壤Ph值',
            textStyle:{
              color: "#fff"
            }
          },
        ],

        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            data: this.soil.create_time,
            axisLine: {
                  lineStyle: {
                    color: "#fff",
                  },
                },
                splitNum: 4,
                axisLabel: {
                  showMaxLabel: true,
                  showMinLabel: true,
                },
              
          },
        ],
        yAxis: [
          {
            min:0,
            max:14,
            splitNumber: 7,
            axisLine: {
                  lineStyle: {
                    color: "#fff",
                  },
                },
          },
        ],
        grid: {
                left: "3%",
                right: "9%",
                bottom: "3%",
                top: "20%",
                containLabel: true,
              },
        series: [
          {
            type: 'line',
            showSymbol: false,
            data: this.soil.ph
          },
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart9.setOption(option);
    },
    getMinutes() {
      let url = this.$store.state.url;
      url = url + "minutes";
      this.$axios
        .get(url)
        .then((res) => {
          this.minutes = res.data.data;
          localStorage.setItem("minutes", JSON.stringify(this.minutes));
          this.soil1 = this.getSoil(localStorage.minutes, 120);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getDays() {
      let url = this.$store.state.url;
      url = url + "days";
      this.$axios
        .get(url)
        .then((res) => {
          this.days = res.data.data;
          localStorage.setItem("days", JSON.stringify(this.days));
          this.soil2 = this.getSoil(localStorage.days, 30);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    async initChart() {
      await this.getInfo();
      await this.getHours();
      this.soil = this.getSoil(localStorage.hours, 48);
      if (this.environmentInfo.rain_fall == 0) {
        this.drawChart();
        this.drawChart1();
        this.drawChart2();
      } else {
        this.drawChart3();
        this.drawChart4();
        this.drawChart5();
      }

      this.drawChart6();
      this.drawChart7();
      this.drawChart8();
      this.drawChart9();
    },
    getWarning() {
      let url = this.$store.state.url;
      url = url + "warning";
      this.$axios
        .get(url)
        .then((res) => {
          let warning = res.data.data;
          for (let i = 0; i < warning.length; i++) {
            var date = new Date(warning[i].wtime.slice(0, -4));
            var Y = date.getFullYear() + "年";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "月";
            var D = date.getDate() + "日 ";
            var h = date.getHours() + ":";
            var m =
              date.getMinutes() < 10
                ? "0" + date.getMinutes() + ":"
                : date.getMinutes() + ":";
            var s =
              date.getSeconds() < 10
                ? "0" + date.getSeconds()
                : date.getSeconds();
            warning[i].wtime = Y + M + D + h + m + s;
          }
          this.warning = warning;
          this.warn = warning.slice(0, 4);

          this.totalNum = warning.length;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getManage() {
      let url = this.$store.state.url;
      url = url + "manage";
      this.$axios
        .get(url)
        .then((res) => {
          let manage = res.data.data;
          localStorage.setItem("manage", JSON.stringify(manage));
          let n = 0,
            j = 0,
            k = 0;
          for (let i = 0; i < manage.length; i++) {
            // console.log(manage[i].mtime)
            var date = new Date(manage[i].mtime.slice(0, -4));
            var Y = date.getFullYear() + "/";
            var M =
              (date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1) + "/";
            var D =
              (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) +
              "\n";
            var h = date.getHours() + ":";
            var m =
              date.getMinutes() < 10
                ? "0" + date.getMinutes()
                : date.getMinutes();
            var s =
              date.getSeconds() < 10
                ? "0" + date.getSeconds()
                : date.getSeconds();
            manage[i].mtime = Y + M + D + h + m;

            if (manage[i].mclass == 1 && n < 3) {
              this.manure.push(manage[i]);
              n++;
            } else if (manage[i].mclass == 2 && j < 3) {
              this.water.push(manage[i]);
              j++;
            } else if (manage[i].mclass == 3 && k < 3) {
              this.pesticide.push(manage[i]);
              k++;
            }
          }
          this.$store.state.manage = manage;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    this.time1 = setInterval(() => {
      var date = this.getTime();
      if (date.second == 0) {
        this.getMinutes();
        this.getInfo();
        if (this.environmentInfo.rain_fall == 0) {
          this.myChart.setOption({
            series: [
              {
                data: [{ value: this.environmentInfo.air_temperture }],
              },
              {
                data: [{ value: this.environmentInfo.air_temperture }],
              },
            ],
          });
          this.myChart1.setOption({
            series: [
              {
                data: [{ value: this.environmentInfo.air_humidity }],
              },
              {
                data: [{ value: this.environmentInfo.air_humidity }],
              },
            ],
          });
          this.myChart2.setOption({
            series: [
              {
                data: [{ value: this.environmentInfo.light_intencity }],
              },
              {
                data: [{ value: this.environmentInfo.light_intencity }],
              },
            ],
          });
        } else {
          this.myChart3.setOption({
            series: [
              {
                data: [{ value: this.environmentInfo.air_temperture }],
              },
              {
                data: [{ value: this.environmentInfo.air_temperture }],
              },
            ],
          });
          this.myChart4.setOption({
            series: [
              {
                data: [{ value: this.environmentInfo.air_humidity }],
              },
              {
                data: [{ value: this.environmentInfo.air_humidity }],
              },
            ],
          });
          this.myChart5.setOption({
            series: [
              {
                data: [{ value: this.environmentInfo.light_intencity }],
              },
              {
                data: [{ value: this.environmentInfo.light_intencity }],
              },
            ],
          });
        }
      }
      if (date.minute == 0 && date.second == 0) {
        this.getHours();
      }
      if (date.hour == 0 && date.second == 0 && date.minute == 0) {
        this.getDays();
      }
      if (this.value == 1 && date.minute == 0) {
        this.myChart8.setOption({
          series: [
            {
              data: this.soil1.rain_fall,
            },
            {
              data: this.soil1.co2,
            },

            {
              data: this.soil1.light_intencity,
            },
          ],
        });
      }
    }, 1000);

    this.getWarning();
    this.getManage();
    // this.test();
  },
  created() {
    this.getTime();
    this.initChart();
    this.getMinutes();
    this.getHours();
    this.getDays();
    setTimeout(() => {}, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer1);
    clearInterval(this.timer2);
    if (this.myChart != null) this.myChart.clear();
    else if (this.myChart1 != null) this.myChart1.clear();
    else if (this.myChart2 != null) this.myChart2.clear();
    else if (this.myChart3 != null) this.myChart3.clear();
    else if (this.myChart4 != null) this.myChart4.clear();
    else if (this.myChart5 != null) this.myChart5.clear();
    else if (this.myChart6 != null) this.myChart6.clear();
    else if (this.myChart7 != null) this.myChart7.clear();
    else if (this.myChart8 != null) this.myChart8.clear();
    else if (this.myChart9 != null) this.myChart9.clear();
  },
};
</script>

<style scoped>
#warn {
  color: white;
  font-family: "Raleway";
}
.gradient-border {
  background: rgb(17, 24, 69, 0.9);
  border-radius: 3px;
  height: 20vh;
  padding: 2vh;
}
#warn {
  --borderWidth: 3px;
  /* width: calc(100%-var(--borderWidth) * 2); */
  /* height: calc(100%-var(--borderWidth)*2); */
  background: linear-gradient(
    60deg,
    #f79533,
    #f37055,
    #ef4e7b,
    #a166ab,
    #5073b8,
    #1098ad,
    #07b39b,
    #6fba82
  );
  border-radius: 1vh;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
  padding: 0.5vh;
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

#soil_tem {
  margin: 0.5vh;
  position: relative;
}
#soil_tem .el-select {
  position: absolute;
  top: 1.1vh;
  right: 20px;
  width: 16%;
}
::v-deep .el-input__inner {
  background: transparent;
}
.incomplete {
  background-image: linear-gradient(#000000aa 10%, transparent);
  height: 28.7vh;
  /* padding: 0px; */
  color: #ffffff;
  position: relative;
  border: 1vh solid transparent;
  background-clip: padding-box;
}
.incomplete1 {
  background-image: linear-gradient(#000000aa 10%, transparent);
  height: 28vh;
  /* padding: 0px; */
  color: #ffffff;
  position: relative;
  border: 1vh solid transparent;
  background-clip: padding-box;
}
.incomplete::after {
  right: -0.1vh;
  top: -0.1vh;

  border-top: 0.1vh dashed white;
  border-right: 0.1vh dashed white;
}
.incomplete:hover::after {
  right: -1vh;
  top: -1vh;
  transition: all ease-in 0.2s;
}
.incomplete:hover::before {
  bottom: -1vh;
  left: -1vh;
  transition: all ease-in 0.2s;
}
.incomplete::after,
.incomplete::before {
  pointer-events: none;
  content: "";
  display: block;
  position: absolute;
  width: 80%;
  height: 50%;
  transition: all ease-in 0.2s;
}
.incomplete::before {
  bottom: -0.1vh;
  left: -0.1vh;

  border-left: 0.1vh dashed white;
  border-bottom: 0.1vh dashed white;
}
.background-img {
  height: 18.7vh;
  min-width: 410px;
  margin: 0.5vh;
  padding: 2vh;
  position: relative;
}

.content h2 {
  font-size: 2.5vh;
  margin-bottom: 1vh;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: #111845a6;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 20px 50px rgb(23, 32, 90);
  color: white;
  padding: 20px;
}

.box:before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transition: 0.5s;
  pointer-events: none;
}

.box h2 {
  font-family: KaiTi, STKaiti, SimSun, SimHei, FangSong_GB2312;
}
.box .content {
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border: 1px solid #f0a591;
  padding: 20px;
  box-shadow: 0 5px 10px rgba(9, 0, 0, 0.5);
}

.box > span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}

.box > span:nth-child(1) {
  transform: rotate(0deg);
}

.box span:nth-child(3) {
  transform: rotate(180deg);
}

.box > span:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background: #50dfdb;
  animation: animate 4s linear infinite;
}

@keyframes animate {
  0% {
    transform: scaleX(0);
    transform-origin: left;
  }
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }
  50.1% {
    transform: scaleX(1);
    transform-origin: right;
  }

  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}

#equipment {
  height: 200px;
  background-color: aqua;
  margin-top: 1%;
  margin-left: 1%;
  min-width: 450px;
  border-radius: 10px;
}
#enInfo {
  min-width: 450px;
  display: flex;
  justify-content: space-around;
}
#enInfo2 {
  display: flex;
  justify-content: space-around;
}
#container {
  background-color: #eef;
  height: calc("100vh"-"50px");
  height: 100vh;
}
.video {
  margin-top: 0.5vh;
  background-color: black;
}
.environment {
  background-color: rgba(255, 0, 0, 0.1);
  margin-top: 0.5vh;
  margin-left: 1%;
  min-width: 450px;
  width: 98%;
  border-radius: 1vw;
  height: 37.8vh;
}
.sunny {
  background: url(../assets/sunny.jpeg);
  background-position-x: -100px;
  background-position-y: -100px;
}
.rainy {
  background: url(../assets/rainy.jpeg);
  /* background-position-x: -100px;
  background-position-y: -100px; */
  background-size: 190%;
  color: indianred;
}

.title {
  font-family: KaiTi, STKaiti, SimSun, SimHei, FangSong_GB2312;
  height: 5vh;
  line-height: 5vh;
  margin-left: 3%;
  font-size: 3.5vh;
  margin-bottom: 2vh;
}
.rain {
  color: #fafad2;
  /* border: 1px black solid; */
  border-radius: 10px;
  background: url(../assets/rain.jpeg);
  background-size: 100%;
  opacity: 0.7;
  width: 45%;
  height: 10vh;
  display: flex;
  align-items: center;
  font-size: 2vh;
}

.wind {
  color: #fafad2;
  border-radius: 10px;
  background: url(../assets/wind.jpeg);
  opacity: 0.7;
  width: 45%;
  background-size: 120%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 2vh;
}
.sunny .time {
  margin-left: 4%;
  font-size: 12px;
  height: 12px;
  color: rgb(255, 153, 0);
}
.rainy .time {
  margin-left: 4%;
  font-size: 12px;
  height: 12px;
  color: aqua;
}
.caozuo {
  min-width: 450px;
  background: url("../assets/soil.jpeg");
  background-size: 100%;
  border-radius: 10px;
  margin: 0.5vh;
  /* height: 250px; */
  opacity: 0.8;
}
</style>
