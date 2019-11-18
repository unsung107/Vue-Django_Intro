import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue' //@(src폴더)/views/Login

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, // 오브젝트 하나하나는 어떤 경로로 왔을때 어떤 컴포넌트를 보여줘 라는 설정. 장고 url patterns같은느낌?
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
