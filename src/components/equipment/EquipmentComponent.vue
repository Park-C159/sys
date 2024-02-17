<template>
  <div class="equipmentComponent">
    <div class="greenHouse">
      <div class="bar"></div>
      <div class="content">
        <h2>温室设备</h2>
        <div class="equipmentList">
          <div class="card">
            <img src="@/assets/images/outdoorTemperatureSensor.svg" alt="" />
            <h4>室外温度传感器</h4>
            <div>正常</div>
          </div>
          <div class="card">
            <img src="@/assets/images/indoorTemperatureSensor.svg" alt="" />
            <h4>室内温度传感器</h4>
            <div>正常</div>
          </div>
          <div class="card">
            <img src="@/assets/images/outdoorHumiditySensor.svg" alt="" />
            <h4>室外湿度传感器</h4>
            <div>正常</div>
          </div>
          <div class="card">
            <img src="@/assets/images/indoorHumiditySensor.svg" alt="" />
            <h4>室内湿度传感器</h4>
            <div>正常</div>
          </div>
          <div class="card">
            <img src="@/assets/images/outdoorLightSensor.svg" alt="" />
            <h4>室外光照传感器</h4>
            <div>正常</div>
          </div>
          <div class="card">
            <img src="@/assets/images/indoorLightSensor.svg" alt="" />
            <h4>室内光照传感器</h4>
            <div>正常</div>
          </div>
        </div>
      </div>
    </div>
    <div class="control">
      <div class="bar"></div>
      <div class="content">
        <h2>温控设备</h2>
        <div class="equipmentList">
          <div class="card">
            <img src="@/assets/images/airConditioner.svg" alt="" />
            <h4>空调</h4>
            <div>开启</div>
          </div>
          <div class="card">
            <img src="@/assets/images/spray.svg" alt="" />
            <h4>喷淋</h4>
            <div>关闭</div>
          </div>
          <div class="card">
            <img src="@/assets/images/window.svg" alt="" />
            <h4>窗户</h4>
            <div>开启</div>
          </div>
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card img{
  width: 80px;
  height: 80px;
  padding: 20px;
}
.card h4{
  margin:10px 0px;
}
.card{
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 120px;
}
.equipmentList{
  width: 100%;
  height: calc(100% - 32px);
  display: flex;
  justify-content: space-between;
}
.content{
  height: 100%;
}
.content h2 {
  font-family: "Microsoft YaHei", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  line-height: 32px;
}
.equipmentComponent {
  width: 100%;
  height: calc(100vh - 40px - 60px);
}
.bar {
  width: 20px;
  height: 100px;
  background-color: #409eff;
  position: absolute;
  top: 5px;
  left: 5px;
  border: 1px solid black;
}
.greenHouse,
.control {
  position: relative;
  padding: 5px;
  padding-left: calc(2% + 5px + (1px + 20px));
  padding-top: 2%;
  height: calc(50% - 5px - 2%);
}
</style>
