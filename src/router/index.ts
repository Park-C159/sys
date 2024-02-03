import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegView from '../views/RegView.vue'
import UserView from '../views/UserView.vue'
import EchartsView from '../views/EchartsView.vue'
import ManageView from '../views/ManageView.vue'
import testView from '../views/test.vue'
import QueryView from '../views/QueryView.vue'
import ForgetView from '../views/ForgetView.vue'
import ModView from '../views/ModView.vue'
import TestView from '../views/HomeView copy.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/test',
    name: 'test',
    component: TestView
  },
  {
    path: '/mod',
    name: 'mod',
    component: ModView
  },{
    path: '/forget',
    name: 'forget',
    component: ForgetView
  },{
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/regist',
    name: 'regist',
    component: RegView
  },{
    path: '/echart',
    name: 'echart',
    component: EchartsView
  },
  {
    path: '/manage',
    name: 'manage',
    component: ManageView
  },
  {
    path: '/test',
    name: 'test',
    component: testView
  },
  {
    path: '/query',
    name: 'query',
    component: QueryView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
