// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import ons from 'onsenui';

import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import * as VueGoogleMaps from 'vue2-google-maps';

import './style.css';

import router from './router';
import App from './App';
import { GOOGLE_MAP_API } from '../.env';
import store from './vuex/store';

Vue.use(VueOnsen);
ons.forcePlatformStyling('ios');

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAP_API,
    language: 'en',
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

const app = {
// Application Constructor
  initialize() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

// deviceready Event Handler
//
// Bind any cordova events here. Common events are:
// 'pause', 'resume', etc.
  onDeviceReady() {
    this.initPushNotification();
  },

  /* eslint-disable no-undef */
  initPushNotification() {
    const push = PushNotification.init({
      ios: { alert: 'true', badge: 'true', sound: 'true' } });

    push.on('registration', (data) => {
        // data.registrationId
      console.log(data);
    });

    push.on('notification', (data) => {
      console.log(data);
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
    });

    push.on('error', (e) => {
      console.log(e);
        // e.message
    });
  },
};

app.initialize();
