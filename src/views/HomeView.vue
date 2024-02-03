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
              <img class="icon" v-if="select==1" :src="cloudyAndSunnyHL" alt="监测">
              <img class="icon" v-else :src="cloudyAndSunny" alt="监测">
              <!-- <i class="el-icon-menu"></i> -->
              <span class="title" slot="title">温室环境监测</span>
            </el-menu-item>
            <el-menu-item index="2">
              <img class="icon" v-if="select==2" :src="bookStarHL" alt="农事信息">
              <img class="icon" v-else :src="bookStar" alt="农事信息">
              <span class="title" slot="title">农事信息管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <img class="icon" v-if="select==3" :src="warningHL" alt="预警">
              <img class="icon" v-else :src="warning" alt="预警">
              <span class="title" slot="title">温室预警功能</span>
            </el-menu-item>
            <el-menu-item index="4">
              <img class="icon" v-if="select==4" :src="historyHL" alt="历史">
              <img class="icon" v-else :src="history" alt="历史">
              <span class="title" slot="title">温室历史记录</span>
            </el-menu-item>
            <el-menu-item index="5">
              <img class="icon" v-if="select==5" :src="settingHL" alt="设备">
              <img class="icon" v-else :src="setting" alt="设备">
              <span class="title" slot="title">温室设备管理</span>
            </el-menu-item>
            <el-menu-item index="6">
              <img class="icon" v-if="select==6" :src="decisionHL" alt="决策">
              <img class="icon" v-else :src="decision" alt="决策">
              <span class="title" slot="title">温室决策功能</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="container" v-if="select == '1' && data">
            <MontiorComponent :data="data" />
          </div>
          <div v-else-if="select == 2">农事信息管理</div>
          <div v-else-if="select == 3">温室预警功能</div>
          <div v-else-if="select == 4">
            <HistoryComponent />
          </div>
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
import HistoryComponent from "@/components/history/HistoryComponent.vue"

import cloudyAndSunny from '@/assets/images/cloudy_and_sunny.png';
import cloudyAndSunnyHL from '@/assets/images/cloudy_and_sunny_HL.png';
import bookStar from '@/assets/images/book_star.png';
import bookStarHL from '@/assets/images/book_star_HL.png';
import warning from '@/assets/images/warning.png';
import warningHL from '@/assets/images/warning_HL.png';
import history from '@/assets/images/history.png';
import historyHL from '@/assets/images/history_HL.png';
import setting from "@/assets/images/setting.png"
import settingHL from "@/assets/images/setting_HL.png"
import decision from "@/assets/images/decision.png"
import decisionHL from "@/assets/images/decision_HL.png"

export default {
  name: "Home",
  data() {
    return {
      data: null,
      select: 1,
      cloudyAndSunny,
      cloudyAndSunnyHL,
      bookStar,
      bookStarHL,
      warning,
      warningHL,
      history,
      historyHL,
      setting,
      settingHL,
      decision,
      decisionHL,
    };
  },
  components: {
    HistoryComponent,
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
.icon{
  margin-right: 10px;
  width: 18px;
}
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
