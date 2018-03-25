// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate';
import VueCountdown from '@xkeshi/vue-countdown';

// TODO importer et utiliser le router

Vue.config.productionTip = false
Vue.use(VeeValidate);
Vue.component('countdown', VueCountdown);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
