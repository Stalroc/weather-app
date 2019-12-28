import Vue from 'vue'
import App from './App.vue'
import Moment from 'vue-moment'

Vue.config.productionTip = false
Vue.config.silent = true

//Use vu-moment
Vue.use(Moment)

new Vue({
  render: h => h(App),
}).$mount('#app')
