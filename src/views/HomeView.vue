<template>
  <div class="home">
    <el-container>
      <el-header>
        <HeadComponent />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">温室环境监测</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-document"></i>
              <span slot="title">农事信息管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-setting"></i>
              <span slot="title">温室预警功能</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">温室历史记录</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title">温室设备管理</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-setting"></i>
              <span slot="title">温室决策功能</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="container" v-if="select == '1'">
            <MontiorComponent />
          </div>
          <div v-else-if="select == 2">农事信息管理</div>
          <div v-else-if="select == 3">温室预警功能</div>
          <div v-else-if="select == 4">温室历史记录</div>
          <div v-else-if="select == 5">温室设备管理</div>
          <div v-else-if="select == 6">温室决策功能</div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HeadComponent from "@/components/HeadComponent.vue"
import MontiorComponent from "@/components/glassHouseMontior/MontiorComponent";

export default {
  name: "Home",
  data() {
    return {
      data: null,
      select: 1,
    };
  },
  components: {
    MontiorComponent,
    HeadComponent,
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      this.select = key;
    },
    async getInfo() {
      // if (this.$store.state.islogin) {
      if (localStorage.isLogin) {
        let url = this.$store.state.url;
        url = url + "/data";
        await this.$axios
          .get(url)
          .then((res) => {
            if(res.data.code == '200'){
              let data = res.data.data
              this.data = data;
              
              this.$store.state.data = data;

            }
            // console.log(this.$store.state.data)
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
}

.el-menu-vertical-demo {
  height: calc(100vh - 60px);
}
.el-header {
  padding: 0%;
}
.container{
  width: 100%;
  height: 100%;
}
</style>
