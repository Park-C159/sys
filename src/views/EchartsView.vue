<template>
  <div class="bg">
    <div id="temperture" style="width: 150px; height: 150px"></div>
    <div id="humidity" style="width: 150px; height: 150px"></div>
    <div id="light" style="width: 150px; height: 150px"></div>
    <div id="whole_tem" style="width: 400px; height: 200px"></div>
    <div id="whole_hum" style="width: 400px; height: 200px"></div>
    <div id="whole_light" style="width: 400px; height: 200px"></div>
    <div id="co2" style="width: 400px; height: 200px"></div>
    <div style="width: 400px; height: 200px; background-color: red"></div>
    <div>
      <section class="Gio-98">
				<h2>Frame</h2>
				<div class="grid">
					<div class="box1">
						<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
							<line class="top" x1="0" y1="0" x2="900" y2="0"/>
							<line class="left" x1="0" y1="460" x2="0" y2="-920"/>
							<line class="bottom" x1="300" y1="460" x2="-600" y2="460"/>
							<line class="right" x1="300" y1="0" x2="300" y2="1380"/>
						</svg>
						<h3>1</h3>
						<span>2014</span>
						<span></span>
					</div>
				</div>
			</section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      soil_temperture: {},
    };
  },
  mounted() {
    this.drawChart();
    this.drawChart1();
    this.drawChart2();
    // console.log("nihao")
    this.soil_temperture = this.getSoilTem();
    this.drawChart3();
    this.drawChart4();
    this.drawChart8();
    this.drawChart9();
    // this.drawChart1();
  },
  methods: {
    getSoilTem() {
      var h = JSON.parse(localStorage.hours);
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
      for (let i = 48 - 1; i >= 0; i--) {
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
        co2 = h[i].co2;
        ph = h[i].Ph;
        rain = h[i].rain_fall;
        j++;
      }
      console.log(h[0]);
      j = 0;
      for (let i = h.length - 1; i >= 48; i--) {
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
    drawChart() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("temperture"));
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
                color: "#999",
              },
            },
            splitLine: {
              distance: -15,
              length: 5,
              lineStyle: {
                width: 2,
                color: "#999",
              },
            },
            axisLabel: {
              distance: -8,
              color: "#999",
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
              offsetCenter: [0, "-15%"],
              fontSize: 20,
              fontWeight: "bolder",
              formatter: "{value} °C",
              color: "inherit",
            },
            data: [
              {
                value: 20,
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
                value: 20,
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawChart1() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("humidity"));
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
                color: "#999",
              },
            },
            splitLine: {
              distance: -15,
              length: 5,
              lineStyle: {
                width: 2,
                color: "#999",
              },
            },
            axisLabel: {
              distance: -8,
              color: "#999",
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
              offsetCenter: [0, "-15%"],
              fontSize: 20,
              fontWeight: "bolder",
              formatter: "{value} %",
              color: "inherit",
            },
            data: [
              {
                value: 50,
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
                value: 50,
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawChart2() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart = this.$echarts.init(document.getElementById("light"));
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
                value: 50000,
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
                value: 50000,
              },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    drawChart3() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart6 = this.$echarts.init(document.getElementById("whole_tem"));
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
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.soil_temperture.create_time,
          position: "bottom",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "地表温度",
            type: "line",
            symbol: "none",
            data: this.soil_temperture.airt,
            color: "#ff9912",
            widhth: 0.5,
          },
          {
            name: "10cm土壤温度",
            type: "line",
            symbol: "none",
            color: "#00ffff",
            data: this.soil_temperture.st10,
            widhth: 0.5,
          },
          {
            name: "20cm土壤温度",
            symbol: "none",
            type: "line",
            data: this.soil_temperture.st20,
            color: "#7fffd4",
            widhth: 0.5,
          },
          {
            name: "30cm土壤温度",
            type: "line",
            symbol: "none",
            data: this.soil_temperture.st30,
            color: "#40e0d0",
            widhth: 0.5,
          },
          {
            name: "40cm土壤温度",
            symbol: "none",
            type: "line",
            data: this.soil_temperture.st40,
            color: "#7fff00",
            widhth: 0.5,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart6.setOption(option);
    },
    drawChart4() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart6 = this.$echarts.init(document.getElementById("whole_hum"));
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
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.soil_temperture.create_time,
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
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "50cm土壤湿度",
            type: "line",
            symbol: "none",
            data: this.soil_temperture.sh50,
            color: "#ff9912",
            widhth: 0.5,
          },
          {
            name: "10cm土壤湿度",
            type: "line",
            symbol: "none",
            color: "#00ffff",
            data: this.soil_temperture.sh10,
            widhth: 0.5,
          },
          {
            name: "20cm土壤湿度",
            symbol: "none",
            type: "line",
            data: this.soil_temperture.sh20,
            color: "#7fffd4",
            widhth: 0.5,
          },
          {
            name: "30cm土壤湿度",
            type: "line",
            symbol: "none",
            data: this.soil_temperture.sh30,
            color: "#40e0d0",
            widhth: 0.5,
          },
          {
            name: "40cm土壤湿度",
            symbol: "none",
            type: "line",
            // stack: "Total",
            data: this.soil_temperture.sh40,
            color: "#7fff00",
            widhth: 0.5,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart6.setOption(option);
    },
    drawChart8() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart8 = this.$echarts.init(document.getElementById("whole_light"));
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
            data: this.soil_temperture.create_time,
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
            data: this.soil_temperture.rain,
          },
          {
            name: "CO₂浓度",
            type: "line",
            yAxisIndex: 1,
            data: this.soil_temperture.co2,
          },
          {
            name: "光照强度",
            type: "line",
            yAxisIndex: 2,
            data: this.soil_temperture.light,
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart8.setOption(option);
    },
    drawChart9() {
      // 基于准备好的dom，初始化echarts实例  这个和上面的main对应
      let myChart9 = this.$echarts.init(document.getElementById("co2"));
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
      inRange:{                               //定义 在选中范围中 的视觉元素
            color: ['#680202','red','orange','yellow', '#ffc400','green','darkgreen','blue', 'navy'],
        },
        right:0,
        bottom:20,
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
      data: this.soil_temperture.create_time,
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
      data: this.soil_temperture.ph
    },
  ]
};
      // 使用刚指定的配置项和数据显示图表。
      myChart9.setOption(option);
    },
  },
  watch: {},
  created() {},
};
</script>
<style scoped>
.bg{
  background-color: #111845a6;
}

/*author MARY LOU */
/* COMPONENTS */

.box1 {
	width: 300px;
	height: 460px;
	position: relative;
	background: rgba(255,255,255,1);
	display: inline-block;
	margin: 0 10px;
	cursor: pointer;
	color: #2c3e50;
	box-shadow: inset 0 0 0 3px #2c3e50;
	-webkit-transition: background 0.4s 0.5s;
	transition: background 0.4s 0.5s;
}

.box1:hover {
	background: rgba(255,255,255,0);
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
}

.box1 h3 {
	font-family: "Ruthie", cursive;
	font-size: 180px;
	line-height: 370px;
	margin: 0;
	font-weight: 400;
	width: 100%;
}

.box1 span {
	display: block;
	font-weight: 400;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 13px;
	padding: 5px;
}

.box1 h3,
.box1 span {
	-webkit-transition: color 0.4s 0.5s;
	transition: color 0.4s 0.5s;
}

.box1:hover h3,
.box1:hover span {
	color: #fff;
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
}

.box1 svg {
	position: absolute;
	top: 0;
	left: 0;
}

.box1 svg line {
	stroke-width: 3;
	stroke: #ecf0f1;
	fill: none;
	-webkit-transition: all .8s ease-in-out;
	transition: all .8s ease-in-out;
}

.box1:hover svg line {
	-webkit-transition-delay: 0.1s;
	transition-delay: 0.1s;
}

.box1 svg line.top,
.box1 svg line.bottom {
	stroke-dasharray: 330 240; 
}

.box1 svg line.left,
.box1 svg line.right {
	stroke-dasharray: 490 400;
}

.box1:hover svg line.top {
	-webkit-transform: translateX(-600px);
	transform: translateX(-600px);
}

.box1:hover svg line.bottom {
	-webkit-transform: translateX(600px);
	transform: translateX(600px);
}

.box1:hover svg line.left {
	-webkit-transform: translateY(920px);
	transform: translateY(920px);
}

.box1:hover svg line.right {
	-webkit-transform: translateY(-920px);
	transform: translateY(-920px);
}

/* Alternatives */



/* Frame */
.Gio-98 .box1 {
	background: rgba(0,0,0,0);
	color: #fff;
	box-shadow: none;
	-webkit-transition: background 0.3s;
	transition: background 0.3s;
}

.Gio-98 .box1:hover {
	background: rgba(0,0,0,0.4);
}

.Gio-98 .box1 h3,
.Gio-98 .box1 span {
	-webkit-transition: none;
	transition: none;
}

.Gio-98 .box1 svg line {
	-webkit-transition: all .5s;
	transition: all .5s;
}

.Gio-98 .box1:hover svg line {
	stroke-width: 10;
	-webkit-transition-delay: 0s;
	transition-delay: 0s;
}

.Gio-98 .box1:hover svg line.top {
	-webkit-transform: translateX(-300px);
	transform: translateX(-300px);
}

.Gio-98 .box1:hover svg line.bottom {
	-webkit-transform: translateX(300px);
	transform: translateX(300px);
}

.Gio-98 .box1:hover svg line.left {
	-webkit-transform: translateY(460px);
	transform: translateY(460px);
}

.Gio-98 .box1:hover svg line.right {
	-webkit-transform: translateY(-460px);
	transform: translateY(-460px);
}

/* COMPONENTS */

/* CSS */
@import url(https://fonts.googleapis.com/css?family=Lato:300,400,700|Ruthie);
@font-face {
	font-weight: normal;
	font-style: normal;
	font-family: 'Gioicons';
	src:url('http://disantimonia.pixub.com/codepen/codropsicons/Gioicons.eot');
	src:url('http://disantimonia.pixub.com/codepen/codropsicons/Gioicons.eot?#iefix') format('embedded-opentype'),
		url('http://disantimonia.pixub.com/codepen/codropsicons/Gioicons.woff') format('woff'),
		url('http://disantimonia.pixub.com/codepen/codropsicons/Gioicons.ttf') format('truetype'),
		url('http://disantimonia.pixub.com/codepen/codropsicons/Gioicons.svg#Gioicons') format('svg');
}



a:hover, a:focus {
	color: #fff;
}

.Gio-header {
	margin: 0 auto;
	padding: 2em;
	text-align: center;
}

.Gio-header h1 {
	margin: 0;
	font-weight: 300;
	font-size: 2.5em;
}

.Gio-header h1 span {
	display: block;
	padding: 0 0 0.6em 0.1em;
	font-size: 0.6em;
	opacity: 0.7;
}

/* To Navigation Style */
.Gio-top {
	width: 100%;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 0.69em;
	line-height: 2.2;
}

.Gio-top a {
	display: inline-block;
	padding: 0 1em;
	text-decoration: none;
	letter-spacing: 1px;
}

.Gio-top span.right {
	float: right;
}

.Gio-top span.right a {
	display: block;
	float: left;
}

.Gio-icon:before {
	margin: 0 4px;
	text-transform: none;
	font-weight: normal;
	font-style: normal;
	font-variant: normal;
	font-family: 'Gioicons';
	line-height: 1;
	speak: none;
	-webkit-font-smoothing: antialiased;
}

.Gio-icon-drop:before {
	content: "\e001";
}

.Gio-icon-prev:before {
	content: "\e004";
}

section {
	padding: 4em 2em;
	text-align: center;
}

section h2 {
	font-weight: 300;
	font-size: 2em;
	padding: 1em 0;
}

.Gio-header + section {
	padding-top: 1.5em;
}

.related p {
	font-size: 1.5em;
}

.related > a {
	background: rgba(0,0,0,0.05);
	display: inline-block;
	text-align: center;
	margin: 20px 10px;
	padding: 25px;
	-webkit-transition: color 0.3s, background-color 0.3s;
	transition: color 0.3s, background-color 0.3s;
}

.related a:hover {
	background-color: rgba(0,0,0,0.4);
}

.related a img {
	max-width: 100%;
	opacity: 0.8;
	-webkit-transition: opacity 0.3s;
	transition: opacity 0.3s;
}

.related a:hover img,
.related a:active img {
	opacity: 1;
}

.related a h3 {
	margin: 0;
	padding: 0.5em 0 0.3em;
	max-width: 300px;
	text-align: left;
}

@media screen and (max-width: 25em) {

	.Gio-icon span {
		display: none;
	}

}
/* CSS */

/* NORMALIZE */
article,aside,details,figcaption,figure,footer,header,hgroup,main,nav,section,summary{display:block;}audio,canvas,video{display:inline-block;}audio:not([controls]){display:none;height:0;}[hidden]{display:none;}html{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}body{margin:0;}a:focus{outline:thin dotted;}a:active,a:hover{outline:0;}h1{font-size:2em;margin:0.67em 0;}abbr[title]{border-bottom:1px dotted;}b,strong{font-weight:bold;}dfn{font-style:italic;}hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0;}mark{background:#ff0;color:#000;}code,kbd,pre,samp{font-family:monospace,serif;font-size:1em;}pre{white-space:pre-wrap;}q{quotes:"\201C" "\201D" "\2018" "\2019";}small{font-size:80%;}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline;}sup{top:-0.5em;}sub{bottom:-0.25em;}img{border:0;}svg:not(:root){overflow:hidden;}figure{margin:0;}fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:0.35em 0.625em 0.75em;}legend{border:0;padding:0;}button,input,select,textarea{font-family:inherit;font-size:100%;margin:0;}button,input{line-height:normal;}button,select{text-transform:none;}button,html input[type="button"],input[type="reset"],input[type="submit"]{-webkit-appearance:button;cursor:pointer;}button[disabled],html input[disabled]{cursor:default;}input[type="checkbox"],input[type="radio"]{box-sizing:border-box;padding:0;}input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;}input[type="search"]::-webkit-search-cancel-button,input[type="search"]::-webkit-search-decoration{-webkit-appearance:none;}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0;}textarea{overflow:auto;vertical-align:top;}table{border-collapse:collapse;border-spacing:0;}
/* NORMALIZE */
</style>
