// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate';
import VueCountdown from '@xkeshi/vue-countdown';
import {Map, TileLayer, Marker, Popup} from 'vue2-leaflet';

Vue.config.productionTip = false

Vue.use(VeeValidate);

Vue.component('countdown', VueCountdown);
Vue.component('v-map', Map);
Vue.component('v-tilelayer', TileLayer);
Vue.component('v-marker', Marker);
Vue.component('v-popup', Popup);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
