<template>
  <div>
    <div class="head"> 
      <el-row>
        <el-col :span="10">
          logo
        </el-col>
        <el-col :span="10">
          <div class="left" @click="toHome">温室种植管理与决策系统</div>
        </el-col>
        <el-col :span="4">
          <div style="height: 6vh;" @click="users()">
            <el-avatar v-if="!islogin">用户</el-avatar>
            <el-avatar v-if="islogin" :src="userInfo.uavatar"></el-avatar>
          </div>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
export default {
name: 'Head',
data() {
  return {
    input:"",
    islogin: false,
    userInfo:{}
  }
},
methods: {
  toQuery(){
    this.$router.push("/query")
  },
  toHome(){
    this.$router.push("/home")
  },
  isLogin(){
    let islogin = localStorage.isLogin
    this.islogin = islogin;
    if(islogin){
      this.userInfo = JSON.parse(localStorage.userInfo);
      // console.log(this.userInfo)
    }else{
      this.userInfo.url = "../assets/logo.png"
    }
  },
  users(){
    if(this.islogin){
      setTimeout(() => {
      this.$router.push("/user");
    }, 200); 
    }else{
      this.$message({
          message: '请先登录！',
          type: 'warning'
        });
    }
    // console.log("hibao")
  }
},
mounted() {
  this.isLogin();

},
}
</script>

<style scoped>
.head{
  height: 60px;
  line-height: 60px;
  color: azure;
  background-color: #409eff;
  padding: 0 1%;
  /* min-width: 1000px; */
}
.left{
  font-family: KaiTi,STKaiti,SimSun, SimHei, FangSong_GB2312 ;
  font-size: 3.5vh;
  overflow: hidden;
  height: 60px;
  cursor: pointer;
}
.el-avatar{
  margin: 5px 10px;
  position: absolute;
  right: 0;
  cursor:pointer;
}
</style>