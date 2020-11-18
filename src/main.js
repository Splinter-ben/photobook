import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import store from './store'
import router from './router'
import Amplify from 'aws-amplify'
import '@aws-amplify/ui-vue'
import aws_exports from './aws-exports'

Amplify.configure(aws_exports)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
