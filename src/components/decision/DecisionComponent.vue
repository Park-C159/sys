<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="室内温度">
        <el-input v-model="form.temperature_in"></el-input>
      </el-form-item>
      <el-form-item label="室内湿度">
        <el-input v-model="form.humility_in"></el-input>
      </el-form-item>
      <el-form-item label="室内光照">
        <el-input v-model="form.light_in"></el-input>
      </el-form-item>
      <el-form-item label="室外温度">
        <el-input v-model="form.temperature_out"></el-input>
      </el-form-item>
      <el-form-item label="室外湿度">
        <el-input v-model="form.humility_out"></el-input>
      </el-form-item>
      <el-form-item label="室外光照">
        <el-input v-model="form.light_out"></el-input>
      </el-form-item>
      <el-form-item label="空调">
        <el-switch @change="switchAir" v-model="form.air"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button class="predictBtn" type="primary" @click="submitForm"
          >预测</el-button
        >
      </el-form-item>
    </el-form>
    <el-table v-if="showRes" :data="tableData" border style="width: 100%">
      <el-table-column prop="airconditioner" label="空调">{{tableData[0].aireconditioner?"开":"关"}}</el-table-column>
      <el-table-column prop="spray" label="喷淋">{{tableData[0].spray?"开":"关"}}</el-table-column>
      <el-table-column prop="windows" label="百叶窗">{{tableData[0].windows?"开":"关"}}</el-table-column>
      <el-table-column v-if="form.air" prop="temperture" label="空调温度">{{tableData[0].temperture}}℃</el-table-column>
    </el-table>
    <el-empty v-else description="无结果，请搜索"></el-empty>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        temperature_in: "0",
        humility_in: "0",
        light_in: "0",
        temperature_out: "0",
        humility_out: "0",
        light_out: "0",
        air: false,
      },
      tableData:[{
        airconditioner: false,
        spray: true,
        windows: false,
        temperture: 30.11
      },],
      showRes:false
    };
  },
  methods: {
    switchAir(){
      this.showRes = false
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let url = this.$store.state.url + "decision";

          this.$axios
            .post(url, this.form)
            .then((res) => {
              console.log(res);
              this.tableData.push(res.data.data)
            })
            .catch((err) => {
              console.error(err);
            });
          this.showRes = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
  mounted() {
    // console.log(this.tableData[0])
  },
};
</script>

<style scoped>
.predictBtn {
  width: 100%;
}
</style>
