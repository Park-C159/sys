<template>
  <div class="UserView">
    <HeadComponent />
    <div id="UserContainer">
      <div class="top box">
        <div class="block" @click="initUpLoadAvatar">
          <el-avatar
            v-if="userInfo.uavatar === ''"
            style="display: flex; justify-content: center"
            :size="92"
          >
            <img width="50" :src="camera" alt="用户" />
          </el-avatar>
          <el-avatar v-else :size="92" :src="userInfo.uavatar"></el-avatar>
        </div>
        <div class="nicheng">
          <div class="account">{{ userInfo.unickname }}</div>
          <div class="uname">{{ userInfo.uname }}</div>
          <div class="uinfo">
            {{ userInfo.uinfo }}
          </div>
        </div>
      </div>
      <div class="bottom box">
        <div class="baseInfo">
          <h3>基本信息</h3>
          <div class="baseInfoContent">
            <div class="text-line">
              <div class="text-title">用户昵称</div>
              <div v-if="isUserNickName">
                <span class="text-content">{{ userInfo.unickname }}</span>
                <span @click="editNickName" class="edit"
                  ><i class="el-icon-edit"></i> 编辑</span
                >
              </div>
              <div class="editInput" v-else>
                <el-input
                  placeholder="请输入内容"
                  v-model="userInfo.unickname"
                ></el-input>
                <el-button
                  type="primary"
                  round
                  class="confirmBtn"
                  @click="confirm"
                  >确认</el-button
                >
                <el-button
                  type="primary"
                  round
                  class="confirmBtn"
                  @click="cancel"
                  >取消</el-button
                >
              </div>
            </div>
            <div class="text-line">
              <span class="text-title">用户名</span>
              <span class="text-content">{{ userInfo.uname }}</span>
            </div>
            <div class="text-line">
              <span class="text-title">用户等级</span>
              <span class="text-content">管理员</span>
            </div>
            <div class="text-line">
              <span class="text-title">性别</span>
              <span class="text-content">{{ userInfo.sex }}</span>
            </div>
            <div class="text-line">
              <span class="text-title">出生日期</span>
              <span class="text-content">{{ userInfo.birthday }}</span>
            </div>
            <div class="text-line">
              <div class="text-title">邮箱</div>
              <div v-if="isUserMail">
                <span class="text-content">{{ userInfo.umail }}</span>
                <span @click="editMail" class="edit"
                  ><i class="el-icon-edit"></i> 编辑</span
                >
              </div>
              <div class="editInput" v-else>
                <el-input
                  placeholder="请输入内容"
                  v-model="userInfo.umail"
                ></el-input>
                <el-button
                  type="primary"
                  round
                  class="confirmBtn"
                  @click="confirm"
                  >确认</el-button
                >
                <el-button
                  type="primary"
                  round
                  class="confirmBtn"
                  @click="cancel"
                  >取消</el-button
                >
              </div>
            </div>
            <div class="text-line">
              <div class="text-title">手机号</div>
              <div v-if="isUserPhone">
                <span class="text-content">{{ userInfo.uphone }}</span>
                <span @click="editPhone" class="edit"
                  ><i class="el-icon-edit"></i> 编辑</span
                >
              </div>
              <div class="editInput" v-else>
                <el-input
                  placeholder="请输入内容"
                  v-model="userInfo.uphone"
                ></el-input>
                <el-button
                  type="primary"
                  round
                  class="confirmBtn"
                  @click="confirm"
                  >确认</el-button
                >
                <el-button
                  type="primary"
                  round
                  class="confirmBtn"
                  @click="cancel"
                  >取消</el-button
                >
              </div>
            </div>
            <div class="text-line">
              <div class="text-title">个人简介</div>
              <div class="userInfo" v-if="isUserInfo">
                <el-input
                  v-if="isUserInfo"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="userInfo.uinfo"
                  disabled
                >
                </el-input>
                <span @click="editUserInfo" class="edit"
                  ><i class="el-icon-edit"></i> 编辑</span
                >
              </div>
              <div class="userInfo" v-else>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="userInfo.uinfo"
                >
                </el-input>
                <el-button
                  type="primary"
                  round
                  class="confirmBtn"
                  @click="confirm"
                  >确认</el-button
                >
                <el-button
                  type="primary"
                  round
                  class="confirmBtn"
                  @click="cancel"
                  >取消</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-button @click="modPWD" round>修改密码</el-button>
      <el-button @click="logout" round>退出登录</el-button>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
        <el-form-item
          class="phoneInput"
          label="手机号"
          v-if="coutDown == 60"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="userInfo.uphone"
            autocomplete="off"
            disabled
          ></el-input>
          <el-button class="btn" type="primary" @click="idCode" round
            >获取验证码</el-button
          >
        </el-form-item>
        <el-form-item
          v-else
          class="phoneInput"
          label="验证码"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.idCode" autocomplete="off"></el-input>
          <el-button round disabled class="btn"
            >请{{ coutDown }}s后重试</el-button
          >
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input
            @blur="upwdCheck"
            v-model="form.pwd"
            show-password
            autocomplete="off"
          ></el-input>
          <div class="notice" v-if="isCUpwd">
            *密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
          </div>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input
            show-password
            @blur="checkPwd"
            v-model="form.pwd2"
            autocomplete="off"
          ></el-input>
          <div class="notice" v-if="isCCheckUpwd">*两次输入不一致</div>
        </el-form-item>
      </el-form>
      <div
        style="color: blue; float: right; cursor: pointer"
        @click="phoneIdentify"
      >
        密码验证
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmModPwd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input
            show-password
            @blur="rawupwdCheck"
            v-model="form.rawPwd"
            autocomplete="off"
          ></el-input>
          <div class="notice" v-if="isCRawUpwd">
            *密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
          </div>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input
            show-password
            @blur="upwdCheck"
            v-model="form.pwd"
            autocomplete="off"
          ></el-input>
          <div class="notice" v-if="isCUpwd">
            *密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
          </div>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input
            show-password
            @blur="checkPwd"
            v-model="form.pwd2"
            autocomplete="off"
          ></el-input>
          <div class="notice" v-if="isCCheckUpwd">*两次输入不一致</div>
        </el-form-item>
      </el-form>
      <div
        style="color: blue; float: right; cursor: pointer"
        @click="phoneIdentify"
      >
        手机验证码验证
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmModPwd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="上传"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleCloseDialog"
    >
      <el-upload
        class="upload-demo"
        drag
        :action="uploadAvatar"
        :on-success="handleUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import HeadComponent from "@/components/HeadComponent.vue";
import camera from "@/assets/images/camera.svg";

export default {
  name: "Home",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userInfo: {},
      index: "1",
      camera,
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      uploadAvatar: "",
      avatarUrl: "",
      isUserInfo: true,
      isUserNickName: true,
      isUserMail: true,
      isUserPhone: true,
      isCUpwd: false,
      isCRawUpwd: false,
      isCCheckUpwd: false,
      coutDown: 60,
      code: "",
      form: {
        name: "",
        rawPwd: "",
        pwd: "",
        pwd2: "",
        delivery: false,
        type: [],
        resource: "",
        idCode: "",
      },
      formLabelWidth: "120px",
    };
  },
  components: {
    // HelloWorld,
    HeadComponent,
  },
  methods: {
    idCode() {
      let url = this.$store.state.url;
      url = url + "sendmessage";
      let params = {
        phone: this.userInfo.uphone,
      };

      this.$axios
        .post(url, params)
        .then((res) => {
          this.code = res.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
      if (this.coutDown > 0 && this.coutDown < 60) return; // 如果当前正在倒计时，则不执行任何操作
      const interval = setInterval(() => {
        this.coutDown--;
        if (this.coutDown <= 0) {
          clearInterval(interval); // 倒计时结束，清除定时器
          this.coutDown = 60;
        }
      }, 1000); // 每秒更新一次倒计时
    },
    phoneIdentify() {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.dialogFormVisible2 = !this.dialogFormVisible2;
    },
    confirmModPwd() {
      if (this.dialogFormVisible2&&(this.code == "" || this.code != this.form.idCode)) {
        this.$message({
          message: "验证码错误",
          type: "warning",
        });
        return
      } 
      if (
        (!this.isCRawUpwd || this.dialogFormVisible2) &&
        !this.isCUpwd &&
        !this.isCCheckUpwd &&
        (this.form.rawPwd || this.dialogFormVisible2) != "" &&
        this.form.pwd != "" &&
        this.form.pwd2 != ""
      ) {
        let url = this.$store.state.url + `modpwd/${this.userInfo.uid}`;
        var params = this.form;

        this.$axios
          .put(url, params)
          .then((res) => {
            var response = res.data;
            if (response.code === 200) {
              this.$message({
                message: response.msg,
                type: "success",
              });
              this.$router.push("/");
            } else
              this.$message({
                message: response.msg,
                type: "warning",
              });

            localStorage.setItem("userInfo", "");
            this.dialogFormVisible = false;
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        this.$message({
          message: "错误，请联系管理员！",
          type: "error",
        });
      }
    },
    checkPwd() {
      this.isCCheckUpwd = !(this.form.pwd == this.form.pwd2);
    },
    rawupwdCheck() {
      var up = this.form.rawPwd;
      var pPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
      let isCRawUpwd = pPattern.test(up);
      if (!isCRawUpwd) this.isCRawUpwd = true;
      else this.isCRawUpwd = false;
    },
    upwdCheck() {
      var up = this.form.pwd;
      var pPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
      let isCUpwd = pPattern.test(up);
      if (!isCUpwd) this.isCUpwd = true;
      else this.isCUpwd = false;
    },
    modPWD() {
      this.dialogFormVisible = true;
      console.log(this.userInfo.upwd);
    },
    logout() {
      localStorage.setItem("userInfo", "");
      this.$router.push("/");

      this.$message({
        message: "退出登录！",
        type: "warning",
      });
    },
    editUserInfo() {
      this.isUserInfo = false;
    },
    editPhone() {
      this.isUserPhone = false;
    },
    editMail() {
      this.isUserMail = false;
    },
    confirm() {
      let url = this.$store.state.url + `getUser/${this.userInfo.uid}`;
      var params = this.userInfo;
      this.$axios
        .put(url, params)
        .then((res) => {
          var data = res.data.data;
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          this.isUserNickName = true;
          this.isUserInfo = true;
          this.isUserPhone = true;
          this.isUserMail = true;
          this.$message({
            message: "修改成功！",
            type: "success",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    cancel() {
      this.isUserNickName = true;
      this.isUserPhone = true;

      this.isUserInfo = true;
      this.isUserMail = true;
    },
    editNickName() {
      this.isUserNickName = false;
    },
    handleCloseDialog(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    getUserDB() {
      let url = this.$store.state.url + `getUser/${this.userInfo.uid}`;
      this.$axios
        .get(url)
        .then((res) => {
          if (res.data.code === 200) {
            var data = res.data.data;
            console.log(data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleUploadSuccess(response) {
      this.$message({
        message: "恭喜你，这是一条成功更换头像",
        type: "success",
      });
      this.userInfo.uavatar = response;
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      this.dialogVisible = false;
    },
    downLoad() {},
    initUpLoadAvatar() {
      this.dialogVisible = true;
    },
    getUser() {
      var user = JSON.parse(localStorage.userInfo);

      var idCard = user.uidcard;
      var year = idCard.substring(6, 10);
      var month = idCard.substring(10, 12);
      var day = idCard.substring(12, 14);
      user.birthday = `${year}-${month}-${day}`;

      var genderCode = idCard.substring(16, 17);
      user.sex = parseInt(genderCode) % 2 === 0 ? "女" : "男";

      this.userInfo = user;
      this.uploadAvatar = this.$store.state.url + "uploadAvatar/" + user.uid;
    },
    test() {
      console.log(localStorage);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    selectMenu(index, indexPath) {
      this.index = index;
      console.log(this.index);
      if (index == 2) {
        this.$router.push("/query");
      } else if (index == 3) {
        this.$router.push("/mod");
      }
    },
  },
  created() {
    // this.test();
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style scoped>
.userInfo {
  width: 100%;
  display: flex;
  align-items: center;
}
.el-textarea {
  width: calc(100% - 100px);
}
.UserView {
  background-color: #f5f6f7;
}
#UserContainer {
  margin: 0 auto;
  width: 80%;
  min-width: 500px;
  max-width: 1000px;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
}
.top {
  width: 100%;
  height: 20%;
  display: flex;
  /* justify-content: center; */
  margin-top: 16px;
  align-items: center;
}
.bottom {
  margin: 16px 0;
  width: 100%;
  /* height: 70%; */
  /* padding: 16px; */
}
.box {
  background-color: #fff;
  border-radius: 10px;
  color: #333;
  padding-bottom: 32px;
}
.block {
  display: flex;
  margin: 16px;
  padding: 24px 24px 40px 24px;
}
.el-avatar {
  cursor: pointer;
}
.nicheng {
  height: 100px;
  width: calc(100% - 32px - 48px - 24px);
}
.account {
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
}
.uname {
  font-size: 12px;
  line-height: 30px;
  font-weight: 400;
  color: #555666aa;
  /* margin-bottom: 30px; */
}
.uinfo {
  width: calc(100% - 24px - 16px);
  line-height: 30px;
  height: 60px;
  overflow: auto;
  /* text-overflow: ellipsis; */
}
.baseInfo {
  padding: 16px;
}
.baseInfo h3 {
  height: 30px;
  border-bottom: 1px solid #ddd;
}
.text-line {
  margin-top: 32px;
  padding: 0 16px;
  font-size: 14px;
  display: flex;
}
.text-title {
  width: 56px;
  color: #555666;
  margin-right: 40px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  text-align: justify;
  text-align-last: justify;
}
.text-content {
  color: #222226;
}
.edit {
  margin-left: 40px;
  color: #409eff;
  cursor: pointer;
}

.baseInfoContent {
  width: 100%;
  height: calc(100% - 30px);
}
.upload-demo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.el-button {
  margin: 0 0 10px 0 !important;
}
.editInput {
  width: 100%;
}
.confirmBtn {
  margin: 0 0 0 12px !important;
  font-size: 12px;
  line-height: 12px;
  padding: 7px 22px !important;
}
.bottom .el-input {
  width: calc(100% - 16px - (14px + 44px + 24px) * 2);
}
.notice {
  color: red;
  font-size: 12px;
  text-align: left;
  height: 30px;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.phoneInput .el-input {
  width: 60%;
  margin-right: 5%;
}
.phoneInput .el-button {
  width: 35%;
}
</style>
