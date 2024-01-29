import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局引入element-plus
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
// 全局引入axios
import axios from 'axios'
import * as echarts from 'echarts'


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
