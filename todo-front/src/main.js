import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import App from './App.vue'
import router from './router' // 자동으로 router/index.js 를찾음(아무것도 지정안해주면)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueSession)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
