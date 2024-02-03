<template>
  <div class="glasshouseMontior">
    <div class="box">
      <div class="innerBox">
        <h1>温 度</h1>
        <div class="graph">
          <div class="indoor" v-if="indoorTemperature">
            <IndoorTemperatureComponent
              :indoorTemperatureData="indoorTemperature"
            />
          </div>
          <div class="outdoor" v-if="outdoorTemperature">
            <OutdoorTemperatureComponent :outdoorTemperatureData="outdoorHumidity" />
          </div>
        </div>
      </div>
    </div>
    <div class="box center">
      <div class="innerBox">
        <h1>湿 度</h1>
        <div class="graph">
          <div class="indoor " v-if="indoorHumidity">
            <IndoorHumidityComponent
              :indoorHumidityData="indoorHumidity"
            />
          </div>
          <div class="outdoor" v-if="outdoorHumidity">
            <OutdoorHumidityComponent :outdoorHumidityData="outdoorTemperature" />
          </div>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="innerBox">
        <h1>光照强度</h1>
        <div class="graph">
          <div class="indoor" v-if="indoorRadiation">
            <IndoorRadiationComponent
              :indoorRadiationData="indoorRadiation"
            />
          </div>
          <div class="outdoor" v-if="outdoorRadiation">
            <OutdoorRadiationComponent :outdoorRadiationData="outdoorRadiation" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IndoorTemperatureComponent from "@/components/glassHouseMontior/temperature/IndoorTemperatureComponent.vue"
import OutdoorTemperatureComponent from "@/components/glassHouseMontior/temperature/OutdoorTemperatureComponent.vue"
import IndoorHumidityComponent from "@/components/glassHouseMontior/humidity/IndoorHumidityComponent.vue"
import OutdoorHumidityComponent from "@/components/glassHouseMontior/humidity/OutdoorHumidityComponent.vue"
import IndoorRadiationComponent from "@/components/glassHouseMontior/radiation/IndoorRadiationComponent.vue"
import OutdoorRadiationComponent from "@/components/glassHouseMontior/radiation/OutdoorRadiationComponent.vue"

export default {
  name: 'MontiorComponent',
  data() {
    return {
      indoorTemperature: null,
      outdoorTemperature: null,
      indoorHumidity: null,
      outdoorHumidity: null,
      indoorRadiation: null,
      outdoorRadiation: null,
    };
  },
  components:{
    IndoorTemperatureComponent,
    OutdoorTemperatureComponent,
    IndoorHumidityComponent,
    OutdoorHumidityComponent,
    IndoorRadiationComponent,
    OutdoorRadiationComponent
  },
  props:{
    data:null
  },
  methods: {
    splitData(){
      var datetime = this.data.datetime
      this.indoorTemperature = {
        data:this.data.indoor_temperature,
        time:datetime
      };
      this.outdoorTemperature = {
        data: this.data.ourdoor_temperature,
        time:datetime
      };
      this.indoorHumidity = {
        data:this.data.indoor_humidity,
        time:datetime
      };
      this.outdoorHumidity = {
        data:this.data.ourdoor_humidity,
        time:datetime
      };
      this.indoorRadiation = {
        data:this.data.indoor_radiation,
        time:datetime
      };
      this.outdoorRadiation = {
        data:this.data.ourdoor_radiation,
        time:datetime
      };
      console.log(this.data)

    }
  },
  mounted() {
    this.splitData()
  },
};
</script>

<style scoped>
.glasshouseMontior {
  width: 100%;
  height: 100%;
}
.box {
  background-color: #eee;
  border-radius: 10px;
  text-align: center;
}

@media (min-width: 1000px) {
  .glasshouseMontior {
    display: flex;
    justify-content: space-between;
  }
  .box {
    width: 32.5%;
    height: 100%;
  }
  .innerBox {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    margin: 10px;
  }
  .innerBox > h1 {
    font-size: 30px;
    font-family: KaiTi, STKaiti, SimSun, SimHei, FangSong_GB2312 !important;
    line-height: 30px;
    padding: 10px;
  }
  .graph {
    width: 100%;
    height: calc(100% - 20px - 30px);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  .indoor,
  .outdoor {
    width: 100%;
    height: 49%;
    /* background: #fff; */
  }
}
@media (max-width: 1000px) {
  .glasshouseMontior {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .box {
    width: 100%;
    height: 32.5%;
  }
  .innerBox {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    margin: 10px;
  }
  .innerBox > h1 {
    font-size: 30px;
    font-family: KaiTi, STKaiti, SimSun, SimHei, FangSong_GB2312 !important;
    line-height: 30px;
    padding: 10px;
  }
  .graph {
    width: 100%;
    height: calc(100% - 20px - 30px);
    display: flex;
    justify-content: space-between;
  }
  .indoor,
  .outdoor {
    width: 49%;
    height: 100%;
    /* background: #fff; */
  }
}
</style>
