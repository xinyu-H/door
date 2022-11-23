// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/style/base.scss'
// import axios from 'axios'

import Api from './api/index'
import Utils from './utils/index'
Vue.prototype.$Api = Api;
Vue.prototype.$Utils = Utils;

Vue.config.productionTip = false
Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
