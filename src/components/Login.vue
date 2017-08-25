<template>
  <v-ons-page>
    <div class="background"></div>
    <div id="login-form">
      <p><v-ons-input id="email" modifier="underbar" placeholder="Email" v-ons-model="email" float></v-ons-input></p>
      <p><v-ons-input id="password" modifier="underbar" type="password" placeholder="Password" v-ons-model="password" float></v-ons-input></p>
      <p style="margin-top: 30px;">
        <ons-button @click="login()">Login</ons-button>
      </p>
      <p><ons-button modifier="quiet" @click="toSignUp()">sign up</ons-button></p>
    </div>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import router from '../router';
import { WEB_API_URL } from '../../.env';

export default {
  name: 'login-page',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      axios.post(`${WEB_API_URL}/v1/login`, data)
          .then((response) => {
            window.localStorage.setItem('access_token', response.data.access_token);
            router.push('/');
          }).catch(() => {
            ons.notification.alert({
              title: 'Login failed',
              message: 'Sorry, your password or email was incorrect.',
            });
          });
    },
    toSignUp() {
      router.push('sign-up');
    },
  },
};
</script>

<style>
#login-form {
  background-color: #FFF;
  width: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.background {
  background-color: #01a8ec;
}

</style>
