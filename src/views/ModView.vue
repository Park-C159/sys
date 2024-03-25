<template>
  <div class="body">
    <div class="background">
      <div id="contain">
        <table></table>
        <div class="title">温室种植管理与决策系统</div>
        <div id="login_box">
          <h2>用户注册</h2>
          <div class="input_box">
            <input
              @blur="unameCheck"
              type="text"
              v-model="uname"
              placeholder="请输入用户名"
            />
            <div class="notice" v-if="isCUname">
              *用户名应该由4到16位的字母，数字，下划线，减号组成
            </div>
          </div>
          <div class="input_box">
            <input
              @blur="upwdCheck"
              type="password"
              v-model="upwd"
              placeholder="请输入原密码"
            />
            <div class="notice" v-if="isCUpwd">
              *密码最少8位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
            </div>
          </div>
          <div class="input_box">
            <input
              type="text"
              @blur="CheckPhone"
              v-model="uphone"
              placeholder="请输入手机号"
            />
            <div class="notice" v-if="isCPhone">*请输入合法的手机号</div>
          </div>
          <div class="input_box">
            <input
              @blur="upwdCheck1"
              type="password"
              v-model="npwd"
              placeholder="请输入新密码"
            />
            <div class="notice" v-if="isCUpwd">
              *密码最少8位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
            </div>
          </div>
          <div class="input_box">
            <input
              @blur="ucpwdCheck"
              type="password"
              v-model="ucpwd"
              placeholder="确认密码"
            />
            <div class="notice" v-if="isCCUpwd">*请与新密码保持一致</div>
          </div>

          <Vcode :show="isShow" @success="onSuccess" @close="onClose" />
          <button class="log" @click="reg">修改密码</button><br />
        </div>
      </div>
      <!-- <div>foot</div> -->
    </div>
  </div>
</template>

<script>
import Vcode from "vue-puzzle-vcode";

export default {
  name: "LoginView",
  data() {
    return {
      uname: "CityOfSky1",
      upwd: "Yth@985211",
      ucpwd: "yth@985211",
      uidcard: "34052120020414051X",
      uphone: "15212371892",
      npwd: "yth@985211",
      isNpwd: false,
      isShow: false,
      isCUname: false,
      isCUpwd: false,
      isCCUpwd: false,
      isCID: false,
      isCPhone: false,
    };
  },
  components: {
    Vcode,
  },
  methods: {
    onSuccess(msg) {
      this.$confirm("此操作将永久修改密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {

          // console.log(msg);
          let url = this.$store.state.url;
          url = url + "mod";
          // console.log(url);
          let params = {
            uname: this.uname,
            upwd: this.upwd,
            npwd: this.npwd,
            uphone: this.uphone,
          };
          console.log(params);
          // console.log(params)
          this.$axios
            .post(url, params)
            .then((res) => {
              // console.log(res)
              let data = res.data;
              console.log(data);
              if (data.code == 300 || data.code == 301) {
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
                  this.$router.push("/");
                }, 1000);
              } else {
                this.$message.error(data.msg);
              }
            })
            .catch((err) => {
              this.$message.error("服务器开小差了，请稍后重试！");
              console.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
    },
    // 用户点击遮罩层，应该关闭模态框
    onClose() {
      this.isShow = false;
    },
    reg() {
      if (
        this.isCUname == false &&
        this.isCUpwd == false &&
        this.isCCUpwd == false &&
        this.isCPhone == false &&
        this.isNpwd == false &&
        this.npwd != "" &&
        this.uname != "" &&
        this.upwd != "" &&
        this.ucpwd != "" &&
        this.uphone != ""
      ) {
        this.isShow = true;
      } else {
        this.$message.error("错误，请核对注册信息！");
      }
    },
    unameCheck() {
      var un = this.uname;
      // console.log(un);
      var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
      let isCUname = uPattern.test(un);
      if (!isCUname && un !== "") {
        this.isCUname = true;
      } else this.isCUname = false;
      // console.log(isCUname)
    },
    upwdCheck() {
      var up = this.upwd;
      var pPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
      let isCUpwd = pPattern.test(up);
      if (!isCUpwd && up !== "") this.isCUpwd = true;
      else this.isCUpwd = false;
    },
    upwdCheck1() {
      var up = this.npwd;
      var pPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
      let isCUpwd = pPattern.test(up);
      if (!isCUpwd && up !== "") this.isNpwd = true;
      else this.isNpwd = false;
    },
    ucpwdCheck() {
      var ucp = this.ucpwd;
      var up = this.npwd;
      if (!(ucp == up) && ucp !== "") this.isCCUpwd = true;
      else this.isCCUpwd = false;
    },
    CheckID() {
      var uidcard = this.uidcard;
      let reg15 =
        /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/;
      var cP =
        /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      let isCID = cP.test(uidcard);
      let isCID15 = reg15.test(uidcard);
      console.log(isCID || isCID15);
      if (uidcard == "" || isCID || isCID15) this.isCID = false;
      else this.isCID = true;
    },
    CheckPhone() {
      let pP =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      var uphone = this.uphone;
      let isCPhone = pP.test(uphone);
      if (uphone !== "" && !isCPhone) this.isCPhone = true;
      else this.isCPhone = false;
    },
  },
};
</script>

<style scoped>
.notice {
  color: red;
  font-size: 12px;
  width: 66%;
  text-align: left;
  margin-left: 17%;
  height: 32px;
  overflow: hidden;
}
.input_box {
  height: 65px;
}
.title {
  text-align: center;
  color: #cc9;
  font-family: KaiTi, "Franklin Gothic Medium", "Arial Narrow", Arial,
    sans-serif;
  margin-top: 3%;
  font-size: 380%;
}

.background {
  height: 100vh;
  background-image: url("../assets/background.jpeg");
  background-position: 50% 30%;
  background-repeat: no-repeat;
  min-height: 300px;
}
#contain {
  background-color: rgba(0, 0, 0, 0.35);
  height: 100%;
}
#login_box {
  width: 30%;
  height: 500px;
  background-color: #00000060;
  margin: auto;
  margin-top: 5%;
  text-align: center;
  border-radius: 10px;
  padding: 50px 50px;
}

h2 {
  color: #ffffff90;
  margin-top: 5%;
  margin-bottom: 10%;
}

#input-box {
  margin-top: 5%;
}

span {
  color: #fff;
}

input {
  border: 0;
  width: 60%;
  font-size: 15px;
  color: #fff;
  background: transparent;
  border-bottom: 2px solid #fff;
  padding: 5px 10px;
  outline: none;
  margin-top: 10px;
}

.log {
  margin-top: 50px;
  width: 60%;
  height: 30px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  background-image: linear-gradient(to right, #30cfd0, #330867);
}
.reg {
  margin-top: 20px;
  width: 60%;
  height: 30px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  background-image: linear-gradient(to right, #30cfd0, #330867);
  transition-property: background-image font-size;
  transition-duration: 500ms 1000ms;
}
.reg:hover {
  cursor: pointer;
  font-size: 18px;
  background-image: linear-gradient(to right, #330867, #30cfd0);
  background-color: #330867;
}
.log:hover {
  font-size: 18px;
  cursor: pointer;
  background-image: linear-gradient(to right, #330867, #30cfd0);
}
.log:active {
  width: 50%;
}
.reg:active {
  width: 50%;
}

#sign_up {
  margin-top: 45%;
  margin-left: 60%;
}

a {
  color: #b94648;
}
</style>
