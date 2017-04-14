// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import 'onsenui';

import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import App from './App';

Vue.use(VueOnsen);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
