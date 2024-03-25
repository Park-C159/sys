<template>
  <div class="earlyWarningContainer">
    <div class="top">
      <div class="tl whiteBox">
        <div class="infoRow">
          <span class="title">番茄生长时期：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="infoRow">
          <span class="title">最适生长昼温：</span>
          <span>20-30℃</span>
        </div>
        <div class="infoRow">
          <span class="title">最适生长夜温：</span>
          <span>15-20℃</span>
        </div>
        <div class="infoRow">
          <span class="title">湿度：</span>
          <span>40-50%RH</span>
        </div>
        <div class="infoRow">
          <span class="title">光照强度：</span>
          <span>40000lx</span>
        </div>
      </div>
      <div class="tr whiteBox">
        <h3>参数设置</h3>
        <div class="paramTable">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name"> </el-table-column>
            <el-table-column prop="ceiling" label="上限值"> </el-table-column>
            <el-table-column prop="floor" label="下限值"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="bottom whiteBox">
      <h3>告警信息</h3>
      <div class="warningTable">
        <el-table :data="warningData" style="width: 100%">
          <el-table-column prop="type" label="事件类型"> </el-table-column>
          <el-table-column prop="data" label="采集数据"> </el-table-column>
          <el-table-column prop="rx" label="偏移量"> </el-table-column>
          <el-table-column prop="time" label="告警时间"> </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "1",
          label: "发芽期",
        },
        {
          value: "2",
          label: "幼苗期",
        },
        {
          value: "3",
          label: "开花期",
        },
        {
          value: "4",
          label: "果实发育期",
        },
      ],
      value: "1",
      tableData: [
        {
          name: "温室温度℃",
          ceiling: "20",
          floor: "35",
        },
        {
          name: "温室湿度%RH",
          ceiling: "35",
          floor: "55",
        },
        {
          name: "光照强度lx",
          ceiling: "30000",
          floor: "50000",
        },
      ],
      warningData: [],
    };
  },
  methods: {
    GetWarningList() {
      let url = this.$store.state.url + "warning";
      this.$axios.get(url).then((res) => {
        if (res.data.code === 200) {
          var data = res.data.data;

          var isWarn = res.data.isWarning;
          console.log(isWarn);

          if (isWarn) {
            this.$message({
              message: data[0].content,
              type: "warning",
              center: true
            });
          }

          for (let w of data) {
            if (w.content == "温度报警") {
              var val = w.value.toFixed(2) + "℃";
            } else if (w.content == "湿度报警") {
              var val = w.value.toFixed(2) + "%RH";
            } else if (w.content == "光照报警") {
              var val = w.value.toFixed(2) + "lx";
            }
            this.warningData.push({
              type: w.content,
              data: val,
              rx: w.rx,
              time: w.wtime,
            });
          }
        }
      });
    },
  },
  mounted() {
    this.GetWarningList();

    this.timer1 = setTimeout(() => {
      this.GetWarningList();
    }, 60 * 1000);
  },
  beforeDestroy() {
    clearTimeout(this.timer1);
  },
};
</script>

<style scoped>
.earlyWarningContainer {
  width: 100%;
  height: calc(100vh - 40px - 60px);
}
.whiteBox {
  padding: 2vh;
  background-color: #eee;
  border-radius: 10px;
}
.top {
  width: 100%;
  height: 38%;
  display: flex;
  justify-content: space-between;
}
.tl,
.tr {
  width: 46%;
  height: calc(100% - 4vh);
}
.tl {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.tl .title {
  display: block;
  width: 120px;
  font-size: 16px;
}
.tl .infoRow {
  display: flex;
  align-items: center;
}
.tr {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
}
.el-select {
  width: 45%;
}
.bottom {
  margin-top: 2%;
  width: calc(100% - 4vh);
  height: calc(58% - 4vh);
}
.bottom h3 {
  line-height: 40px;
}
.bottom .warningTable {
  height: calc(100% - 40px);
  overflow-y: auto;
}
</style>
