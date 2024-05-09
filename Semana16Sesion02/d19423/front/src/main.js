import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import _Culqi from 'vue-culqi-checkout';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(_Culqi, {
  publicKey: 'pk_test_27f4fbc0ddc64976',
});
new Vue({
  render: h => h(App),
}).$mount('#app');
