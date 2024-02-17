<template>
  <div>
    <HeadComponent style="height: 6vh" />
    <el-container style="height: 94vh">
      <el-aside width="20vw">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="selectMenu"
        >
          <el-menu-item index="1">
            <img src="../assets/化肥.png" style="width: 15px" alt="" />
            <span slot="title">&nbsp;&nbsp;施肥</span>
          </el-menu-item>
          <el-menu-item index="2">
            <img src="../assets/guangai.png" style="width: 15px" alt="" />

            <span slot="title">&nbsp;&nbsp;灌溉</span>
          </el-menu-item>
          <el-menu-item index="3">
            <img src="../assets/penyao.png" style="width: 15px" alt="" />
            <span slot="title">&nbsp;&nbsp;农药</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div>
          <div v-if="index == 1">
            <el-table :data="manure" border style="width: 100%">
              <el-table-column fixed prop="mtime" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="mname" label="化肥"> </el-table-column>
              <el-table-column prop="mdose" label="用量" width="180">
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="60">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="index == 2">
            <el-table :data="water" border style="width: 100%">
              <el-table-column fixed prop="mtime" label="日期" width="280">
              </el-table-column>
              <!-- <el-table-column prop="mname" label="化肥"> </el-table-column> -->
              <el-table-column prop="mdose" label="用量" width="">
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="60">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-if="index == 3">
            <el-table :data="pesticide" border style="width: 100%">
              <el-table-column fixed prop="mtime" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="mname" label="农药"> </el-table-column>
              <el-table-column prop="mdose" label="用量" width="180">
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="60">
                <template slot-scope="scope">
                  <el-button
                    @click="handleClick(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="add" style="margin-top: 10px; text-align: center">
          <el-button
            type="primary"
            size="medium"
            plain
            round
            style="width: 80%"
            @click="dialog = true"
            >上传</el-button
          >

          <el-drawer
            title="上传"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="ltr"
            custom-class="demo-drawer"
            ref="drawer"
          >
            <div class="demo-drawer__content">
              <el-form :model="form">
                <el-form-item label="化肥名称" :label-width="formLabelWidth" v-if="index == '1'">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="index == '3'" label="农药名称" :label-width="formLabelWidth">
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>



                <el-form-item label="用量" :label-width="formLabelWidth">
                  <el-input v-model="form.dose" autocomplete="off"></el-input>
                </el-form-item>
                
              </el-form>
              <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button
                  type="primary"
                  @click="$refs.drawer.closeDrawer()"
                  :loading="loading"
                  >{{ loading ? "提交中 ..." : "确 定" }}</el-button
                >
              </div>
            </div>
          </el-drawer>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HeadComponent from "@/components/HeadComponent.vue";

export default {
  name: "manage",
  data() {
    return {
      index: "1",
      tableData: [],
      manage: [],
      manure: [],
      water: [],
      pesticide: [],
      isShow: 0,
      table: false,
      dialog: false,
      loading: false,
      form: {
        name: " ",
        dose: "",
      },
      formLabelWidth: "80px",
      timer: null,
    };
  },
  components: {
    HeadComponent,
  },
  methods: {
    upLoad(){
      let url = this.$store.state.url;
      url = url + "/upload";
      
      
      var date = new Date();
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      // var m = date.getMinutes();
      var m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.currentTime = Y + M + D + h + m + s ;
      // console.log(this.currentTime)
      
      // console.log(url);
      let params = {
        mname: this.form.name,
        mdose: this.form.dose,
        mclass: this.index,
        mtime: this.currentTime,
      };
      this.$axios
        .post(url, params)
        .then((res) => {
          let data = res.data;
          console.log(data);
          if (data.code == 300) {
            this.$message({
              message: data.msg,
              type: "warning",
            });
          } else if (data.code == 200) {
            this.$message({
              message: data.msg,
              type: "success",
            });
            this.isShow = false; // 通过验证后，需要手动隐藏模态框
            setTimeout(() => {
              this.$router.push("/home");
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
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then((_) => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            this.upLoad();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch((_) => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    getInfo() {
      var manage = JSON.parse(localStorage.manage);
      this.manage = manage;
      for (let i = 0; i < manage.length; i++) {
        var date = new Date(manage[i].mtime.slice(0, -4));
        var Y = date.getFullYear() + "/";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "/";
        var D =
          (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "\n";
        var h = date.getHours() + ":";
        var m =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var s =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        manage[i].mtime = Y + M + D + h + m;

        if (manage[i].mclass == 1) {
          this.manure.push(manage[i]);
        } else if (manage[i].mclass == 2) {
          this.water.push(manage[i]);
        } else if (manage[i].mclass == 3) {
          this.pesticide.push(manage[i]);
        }
      }
      // console.log(this.manure);
    },
    setManage() {},
    selectMenu(index, indexPath) {
      this.index = index;
      // console.log(this.index);
    },
    handleClick(row) {
      let mid = row.mid;
      let url = this.$store.state.url;
      url = url + "delete";
      let params = {
        "mid": mid
      }
      this.$axios
        .post(url, params)
        .then((res) => {
          let data = res.data;
          console.log(data);
          if (data.code == 300) {
            this.$message({
              message: data.msg,
              type: "warning",
            });
          } else if (data.code == 200) {
            this.$message({
              message: data.msg,
              type: "success",
            });
            setTimeout(() => {
              this.$router.push("/home");
            }, 1000);
          } else {
            this.$message.error(data.msg);
          }
        })
        .catch((err) => {
          this.$message.error("服务器开小差了，请稍后重试！");
          console.error(err);
        });
      console.log(mid);
    },
    deleteManage(){
      let url = this.$store.state.url;
      url = url + "delete";
      
    }
  },
  created() {},
  mounted() {
    this.getInfo();
    this.setManage();
  },
};
</script>

<style scoped>
.add {
}
</style>
