import axios from 'axios';
import ons from 'onsenui';
import { WEB_API_URL } from '../../.env';

/* global FCMPlugin */
const app = {
  initialize() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  onDeviceReady() {
    this.initPushNotification();
    FCMPlugin.onNotification(
      (data) => {
        if (data.wasTapped) {
          // Notification was received on device tray and tapped by the user.
        } else {
          // Notification was received in foreground. Maybe the user needs to be notified.
          ons.notification.alert({
            title: 'You got a response',
            message: 'Please reload.',
          });
        }
      },
      (msg) => {
        console.log(`onNotification callback successfully registered: ${msg}`);
      },
      (err) => {
        console.log(`Error registering onNotification callback: ${err}`);
      },
    );
  },

  /* eslint-disable no-undef */
  initPushNotification() {
    const authorizationtoken = window.localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: authorizationtoken },
    };
    FCMPlugin.getToken(
      (token) => {
        const data = {
          device_token: token,
        };
        axios.put(`${WEB_API_URL}/v1/users/me/device_token`, data, config)
            .then((response) => {
              console.log(response);
            });
      },
      (err) => {
        console.log(`error retrieving token: ${err}`);
      },
    );
  },
};

export default app;
