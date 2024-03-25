<template>
  <div class="agricultureInfoComponent">
    <el-table
      :data="agricultureInfo"
      height="300"
      border
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="mtime" sortable label="执行时间" width="180">
      </el-table-column>
      <el-table-column prop="mclass" label="操作事项" width="180">
      </el-table-column>
      <el-table-column prop="mdose" label="用量" width="180"> </el-table-column>
      <el-table-column prop="minfo" label="详细说明"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button
            type="text"
            @click="handleDeleteClick(scope.row.mid)"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button
      class="button"
      type="primary"
      size="medium"
      plain
      round
      style="width: 80%"
      @click="handleAddClick"
      >新 建</el-button
    >

    <el-dialog
      title="编辑"
      :visible.sync="modDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        label-width="80px"
        :model="modRow"
        ref="modRow"
        :rules="rules"
        style="margin: 10px"
      >
        <el-form-item label="操作事项" required prop="mclass">
          <el-select v-model="modRow.mclass" placeholder="请选择操作事项">
            <el-option label="施肥" value="施肥"></el-option>
            <el-option label="浇水" value="浇水"></el-option>
            <el-option label="喷药" value="喷药"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用量" required prop="mdose">
          <el-input v-model="modRow.mdose"></el-input>
        </el-form-item>
        <el-form-item label="执行时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                v-model="modRow.mtime"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-time-picker
                placeholder="选择时间"
                v-model="modRow.mtime"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="详细说明">
          <el-input type="textarea" v-model="modRow.minfo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modManage">修改</el-button>
          <el-button @click="() => (this.modDialogVisible = false)"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-drawer
      title="添加新的农事管理信息"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      v-if="rules"
    >
      <el-form
        label-width="80px"
        :rules="rules"
        :model="formLabelAlign"
        ref="formLabelAlign"
        style="margin: 10px"
      >
        <el-form-item label="操作事项" required prop="classify">
          <el-select
            v-model="formLabelAlign.classify"
            placeholder="请选择操作事项"
          >
            <el-option label="施肥" value="1"></el-option>
            <el-option label="浇水" value="2"></el-option>
            <el-option label="喷药" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用量" required prop="dose">
          <el-input v-model="formLabelAlign.dose"></el-input>
        </el-form-item>
        <el-form-item label="执行时间" required>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker
                v-model="formLabelAlign.date1"
                type="date"
                style="width: 100%"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-time-picker
                placeholder="选择时间"
                v-model="formLabelAlign.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="详细说明">
          <el-input type="textarea" v-model="formLabelAlign.info"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addManage">新建</el-button>
          <el-button @click="resetForm('formLabelAlign')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否确认删除该条记录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      agricultureInfo: [],
      dialogVisible: false,
      currentRowId: null,
      drawer: false,
      direction: "rtl",
      formLabelAlign: {
        classify: "",
        dose: "",
        date1: "",
        date2: "",
        info: "",
      },
      rules: {},
      modDialogVisible: false,
      modRow: {
        date1: "",
        date2: "",
        mclass: "",
        mid: null,
        minfo: "",
        mtime: "",
        mdose: "",
      },
    };
  },
  methods: {
    async getAgricultureInfo() {
      let url = this.$store.state.url + "manage";

      this.$axios
        .get(url)
        .then((res) => {
          let response = res.data;
          if (response.code == 200) {
            let data = response.data;
            this.agricultureInfo = data;
          }
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: "页面加载失败!",
          });
        });
    },
    deleteRow() {
      this.dialogVisible = false;
      let url = `${this.$store.state.url}/manage/${this.currentRowId}`;
      this.$axios
        .delete(url)
        .then((res) => {
          let response = res.data;
          if (response.code == 200) {
            console.log(response.code);
            this.getAgricultureInfo();
            this.$message({
              type: "success",
              message: "删除成功！",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败!",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: "删除过程中出现错误!",
          });
        });
    },
    handleAddClick() {
      this.drawer = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleDeleteClick(rowId) {
      this.currentRowId = rowId;
      this.dialogVisible = true;
    },
    addManage() {
      this.drawer = false;
      let url = this.$store.state.url + "manage";
      let formattedDate = dayjs(this.formLabelAlign.date1).format("YYYY-MM-DD");
      let formattedTime = dayjs(this.formLabelAlign.date2).format("HH:mm:ss");

      // 结合日期和时间
      let dateTime = `${formattedDate} ${formattedTime}`;
      let params = {
        mclass: this.formLabelAlign.classify,
        mtime: dateTime,
        dose: this.formLabelAlign.dose,
        info: this.formLabelAlign.info,
      };

      this.$axios
        .post(url, params)
        .then((res) => {
          var response = res.data;
          if ((response.code = 200)) {
            let data = response.data;
            this.getAgricultureInfo();
            this.$message({
              type: "success",
              message: "新建成功！",
            });
          } else {
            this.$message({
              type: "error",
              message: "新建失败！",
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "error",
            message: "新建过程中出现错误!",
          });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClick(row) {
      this.modDialogVisible = true;
      row.mtime = dayjs(row.time).toDate();
      row.date1 = dayjs(row.mtimetime).format("YYYY-MM-DD");
      row.date2 = dayjs(row.mtime).format("HH:mm:ss");
      // console.log(row);
      this.modRow = row;
    },
    // 自定义验证函数
    checkDoseWithUnit(rule, value, callback) {
      if (!value) {
        // 如果没有输入，不进行单位检查（已有必填规则）
        callback();
      } else {
        // 使用正则表达式检查格式：数字后至少跟着一个字符
        const pattern = /^\d+(\.\d+)?\s+\D+$/;
        if (pattern.test(value)) {
          // 如果符合预期格式，验证通过
          callback();
        } else {
          // 如果不符合，返回错误消息
          callback(
            new Error(
              "用量格式不正确，必须包含单位,且单位和数字之间应有空格（例如：10 kg）"
            )
          );
        }
      }
    },
    modManage() {
      this.modDialogVisible = false;
      let url = this.$store.state.url + "manage/" + this.modRow.mid;
      let formatTime = dayjs(this.modRow.mtime).format("YYYY-MM-DD HH:mm:ss");
      let reversedMclassMapping = { "施肥": 1, "浇水": 2, "喷药": 3, "其他": 4 };
      if (reversedMclassMapping[this.modRow.mclass]) {
        this.modRow.mclass = reversedMclassMapping[this.modRow.mclass];
      }
      var params = {
        mtime: formatTime,
        class: this.modRow.mclass,
        dose: this.modRow.mdose,
        info: this.modRow.minfo,
      };
      this.$axios
        .put(url, params)
        .then((res) => {
          var response = res.data;
          if (response.code == 200){
            let data = response.data;
            this.getAgricultureInfo();
            this.$message({
              type:"success",
              message:response.msg
            })
          }else{
            this.$message({
              type:"error",
              message:response.msg
            })
          }
        })
        .catch((err) => {
          console.error(err);
          this.$message({
              type:"error",
              message:"编辑过程中发成错误！"
            })
        });
    },
  },
  mounted() {
    this.getAgricultureInfo();
  },
  created() {
    this.rules = {
      classify: [
        { required: true, message: "请选择操作事项", trigger: "blur" },
      ],
      mclass: [{ required: true, message: "请选择操作事项", trigger: "blur" }],
      dose: [
        { required: true, message: "请输入用量", trigger: "blur" },
        {
          validator: this.checkDoseWithUnit,
          trigger: "blur",
        },
      ],
      mdose: [
        { required: true, message: "请输入用量", trigger: "blur" },
        {
          validator: this.checkDoseWithUnit,
          trigger: "blur",
        },
      ],
      type: [
        {
          type: "array",
          required: true,
          message: "请至少选择一个活动性质",
          trigger: "change",
        },
      ],
      resource: [
        { required: true, message: "请选择活动资源", trigger: "change" },
      ],
      desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
    };
  },
};
</script>

<style scoped>
.agricultureInfoComponent {
  width: 100%;
  height: calc(100vh - 60px - 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.button {
  margin: 20px;
}
</style>
