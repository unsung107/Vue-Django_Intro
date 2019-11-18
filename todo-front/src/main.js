import Vue from 'vue'
import App from './App.vue'
import router from './router' // 자동으로 router/index.js 를찾음(아무것도 지정안해주면)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
