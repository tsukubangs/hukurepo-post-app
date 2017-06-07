<template id="top-page">
  <v-ons-page>
    <custom-toolbar>Top Page</custom-toolbar>
    <p style="text-align: center">
      This is the first page
      <v-ons-button @click="push">POST</v-ons-button>
    </p>
    <p>Log in!</p>
    <v-ons-button @click="logout">logout</v-ons-button>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import CameraPage from './CameraPage';
import { WEB_API_URL } from '../../.env';
import router from '../router';

function logout() {
  window.localStorage.removeItem('access_token');
  router.push('/login');
}

function getUser() {
  const token = window.localStorage.getItem('access_token');
  const config = {
    headers: { Authorization: token },
  };
  console.log(token);
  axios.get(`${WEB_API_URL}/v1/users`, config)
          .then((response) => {
            console.log(response);
            const email = response.data[0].email;
            console.log(email);
          }).catch((error) => {
            console.log(error);
            ons.notification.alert({
              title: 'Can\'t connect to server',
              message: 'Try again?',
              callback: getUser,
            });
          });
}

export default {
  name: 'top-page',
  components: {
    CustomToolbar,
  },
  created() {
    getUser();
  },
  methods: {
    push() {
      this.pageStack.push(CameraPage);
    },
    getUser,
    logout,
  },
  props: ['pageStack'],
};
</script>
