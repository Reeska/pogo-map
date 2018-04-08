// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VeeValidate from 'vee-validate';
import VueCountdown from '@xkeshi/vue-countdown';
import {Map, TileLayer, Marker, Popup, Tooltip} from 'vue2-leaflet';
import VModal from 'vue-js-modal'
import Toasted from 'vue-toasted'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

Vue.config.productionTip = false

Vue.use(VeeValidate);
Vue.use(VModal);
Vue.use(Toasted);
Vue.use(Vuetify, {
  theme: {
    primary: colors.grey.darken4
  }
});

Vue.component('countdown', VueCountdown);
Vue.component('v-map', Map);
Vue.component('v-tilelayer', TileLayer);
Vue.component('v-marker', Marker);
Vue.component('v-popup', Popup);
Vue.component('v-tooltip', Tooltip);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})
