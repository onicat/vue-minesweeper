import Vue from 'vue'
import Vuex from 'vuex';
import store from './store/index.js'
import App from './App.vue'

Vue.use(Vuex);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
