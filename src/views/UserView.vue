<template>
  <div>
    <HeadComponent />
    <div id="container">
      <!-- <div>user</div> -->
      <el-container>
        <el-aside width="25%">
          <div class="block">
            <el-avatar :size="120" :src="userInfo.uavatar"></el-avatar>
          </div>
          <div class="nicheng">
            {{ userInfo.uname }}
          </div>
          <div class="left-nav">
            <el-menu
              background-color="rgb(199, 205, 250)"
              default-active="1"
              @open="handleOpen"
              @close="handleClose"
              @select="selectMenu"
            >
              <!-- <el-submenu index="1"> -->
              <el-menu-item index="1">
                <span slot="title">个人主页</span>
              </el-menu-item>
              <el-menu-item index="2">
                <span slot="title" @click="downLoad()">下载</span>
              </el-menu-item>
              <el-menu-item index="3">
                <span slot="title">修改密码</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <div v-if="index == '1'">
            <el-descriptions size="medium" :title="'用户：' + userInfo.uname">
              <el-descriptions-item label="账户等级">
                管理员
              </el-descriptions-item>
              <el-descriptions-item label="性别">{{
                userInfo.sex ? "男" : "女"
              }}</el-descriptions-item>
              <el-descriptions-item label="手机号">{{
                userInfo.uphone
              }}</el-descriptions-item>
              <el-descriptions-item label="生日">{{
                userInfo.birthday
              }}</el-descriptions-item>
              <el-descriptions-item label="邮箱">
                {{ userInfo.umail }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import HeadComponent from "@/components/HeadComponent.vue";

export default {
  name: "Home",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userInfo: {},
      index: "1",
    };
  },
  components: {
    // HelloWorld,
    HeadComponent,
  },
  methods: {
    downLoad() {
      // console.log("hhhh")
    },
    getUser() {
      let user = JSON.parse(localStorage.userInfo);

      var date = new Date(user.birthday.slice(0, -4));
      var Y = date.getFullYear() + "年";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "日";
      var h = date.getHours() + ":";
      var m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      user.birthday = Y + M + D;
      this.userInfo = user;
      console.log(this.userInfo);
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
      }else if (index == 3) {
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
.left-nav {
  padding-bottom: 100px;
}
.el-avatar {
  width: 90%;
}
.nicheng {
  margin-top: 10px;
  margin-bottom: 30%;
  font-size: 20px;
  font-weight: bold;
}
.block {
  margin-top: 50%;
}
#container {
  /* margin: 0 10%; */
  background-color: #eef;
  height: calc(100vh - 60px);
}
.el-main {
  background-color: #eef;
  color: #333;
  text-align: center;
}
.el-aside {
  background-color: rgb(199, 205, 250);
  color: #333;
  min-width: 180px;
  height: calc(100vh - 60px);
  /* min-height: 90vh; */
  /* height: 200px; */
  text-align: center;
  padding: 5px 0;
}
</style>
