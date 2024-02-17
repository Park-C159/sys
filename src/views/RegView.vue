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
              placeholder="请输入密码"
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
            <div class="notice" v-if="isCCUpwd">*请与密码保持一致</div>
          </div>
          <div class="input_box">
            <input
              type="text"
              @blur="CheckID"
              v-model="uidcard"
              placeholder="请输入身份证号"
            />
            <div class="notice" v-if="isCID">*请输入合法的身份证</div>
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
          <div class="input_box idcode">
            <input
              type="text"
              v-model="identifyCode"
              placeholder="请输入验证码"
            />
            <el-button
              v-if="coutDown == 60"
              class="btn"
              type="primary"
              @click="idCode"
              round
              >获取验证码</el-button
            >
            <el-button round disabled v-else class="btn">请{{ coutDown }}s后重试</el-button>
          </div>
          <button class="log" @click="onSuccess">注册</button><br />
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
      uname: "CityOfSky",
      upwd: "Yth@985211",
      ucpwd: "Yth@985211",
      uidcard: "34052120020414051X",
      uphone: "15212371894",
      isShow: false,
      isCUname: false,
      isCUpwd: false,
      isCCUpwd: false,
      isCID: false,
      isCPhone: false,
      identifyCode: "",
      coutDown: 60,
      isIdentifyCode: false,
      code: "",
    };
  },
  components: {
    Vcode,
  },
  methods: {
    idCode() {
      let url = this.$store.state.url;
      url = url + "sendmessage";
      let params = {
        phone: this.uphone
      }

      this.$axios.post(url, params).then((res)=>{
        this.code = res.data.data;
      }).catch((err)=>{
        console.error(err)
      })
      if (this.coutDown > 0 && this.coutDown < 60) return; // 如果当前正在倒计时，则不执行任何操作
      const interval = setInterval(() => {
        this.coutDown--;
        if (this.coutDown <= 0) {
          clearInterval(interval); // 倒计时结束，清除定时器
          this.coutDown = 60;
        }
      }, 1000); // 每秒更新一次倒计时
    },
    onSuccess(msg) {
      var canReg = this.checkCode();
      if(canReg){
        this.reg();
        // console.log(msg);
        let url = this.$store.state.url;
        url = url + "regist";
        // console.log(url);
        let params = {
          uname: this.uname,
          upwd: this.upwd,
          uidcard: this.uidcard,
          uphone: this.uphone,
        };
        // console.log(params)
        this.$axios
          .post(url, params)
          .then((res) => {
            // console.log(res)
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
      }else{
        return
      }
    },
    // 用户点击遮罩层，应该关闭模态框
    onClose() {
      this.isShow = false;
    },
    checkCode(){
      if(this.identifyCode == ""){
        this.$message({
          message: '验证码不可为空',
          type: 'warning'
        });
        return false
      }else if(this.identifyCode == this.code){
        return true
      }else if(this.identifyCode != this.code){
        this.$message({
          message: '验证码不匹配',
          type: 'warning'
        });
        return false
      }
    },
    reg() {
      if (
        this.isCUname == false &&
        this.isCUpwd == false &&
        this.isCCUpwd == false &&
        this.isCID == false &&
        this.isCPhone == false &&
        this.uname != "" &&
        this.upwd != "" &&
        this.ucpwd != "" &&
        this.card != "" &&
        this.uphone != ""
      ) {
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
    ucpwdCheck() {
      var ucp = this.ucpwd;
      var up = this.upwd;
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
.btn {
  width: 30%;
  margin-left: 5%;
}
.idcode input {
  border: 0;
  width: 25%;
  font-size: 15px;
  color: #fff;
  background: transparent;
  border-bottom: 2px solid #fff;
  padding: 5px 10px;
  outline: none;
  margin-top: 10px;
}
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
  height: 530px;
  background-color: #00000060;
  margin: auto;
  margin-top: 2.5%;
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
  margin-top: 30px;
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
