<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-toolbar-button class="white-btn" modifier="outline" @click="changeLanguage">
            {{ setLanguage }}
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
    <div class="background"></div>
    <div id="login-form">
      <p><v-ons-input id="email" modifier="underbar" v-bind:placeholder="this.placeholders.Email" v-model="email" float></v-ons-input></p>
      <p><v-ons-input id="password" modifier="underbar" type="password" v-bind:placeholder="this.placeholders.Password" v-model="password" float></v-ons-input></p>
      <p style="margin-top: 30px;">
<v-ons-button @click="login()">{{ labels.login }}</v-ons-button>
      </p>
      <p><v-ons-button modifier="quiet" @click="toSignUp()">{{ labels.SignUp }}</v-ons-button></p>
    </div>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import router from '../router';
import { WEB_API_URL } from '../../.env';

function getMessages(lang){
  const messages = require('../assets/message.json');
  switch (lang){
    case 'ja':
      return messages.ja;
    case 'ko':
      return messages.ko;
    case 'zh':
      return messages.zh;
    default:
      return messages.en;
  }
}

export default {
  name: 'login-page',
  computed:{
    setLanguage: function(){
      return this.language.labelLang;
    },
    labels: function(){
      const message = getMessages(this.language.lang);
      return message.login;
    },
  },
  data() {
    return {
      email: '',
      password: '',
      language: this.initialLanguage(),
      placeholders: this.initialPlaceHolders(),
    };
  },
  methods: {
    async login() {
      const data = {
        email: this.email,
        password: this.password,
      };
      await axios.post(`${WEB_API_URL}/v1/login`, data)
          .then((response) => {
            window.localStorage.setItem('access_token', response.data.access_token);
          }).catch(() => {
            ons.notification.alert({
              title: 'Login failed',
              message: 'Sorry, your password or email was incorrect.',
            });
          });
      const lang = window.localStorage.getItem('deviceLanguage');
      const messages = getMessages(lang);
      window.localStorage.setItem('messages', JSON.stringify(messages));
      router.push('/');
    },
    toSignUp() {
      router.push('agree');
    },
    changeLanguage(){
      var lang = window.localStorage.getItem('deviceLanguage');
      if (lang == 'en'){
        window.localStorage.setItem('deviceLanguage', 'ja');
        lang = 'ja';
      }
      else if(lang == 'ja'){
        window.localStorage.setItem('deviceLanguage', 'ko');
        lang = 'ko';
      }
      else if(lang == 'ko'){
        window.localStorage.setItem('deviceLanguage', 'zh');
        lang = 'zh';
      }
      else if(lang == 'zh'){
        window.localStorage.setItem('deviceLanguage', 'en');
        lang = 'en';
      }
      var labels = getMessages(lang);
      this.language = {labelLang:labels.labelLang, lang:lang};
      this.placeholders = labels.login.placeholders;
    },
    initialLanguage(){
      if(window.localStorage.getItem('deviceLanguage') == null){
        window.localStorage.setItem('deviceLanguage', 'en');
      }
      const lang = window.localStorage.getItem('deviceLanguage');
      var labels = getMessages(lang);
      return {labelLang:labels.labelLang, lang:lang};
    },
    initialPlaceHolders(){
      if(window.localStorage.getItem('deviceLanguage') == null){
        window.localStorage.setItem('deviceLanguage', 'en');
      }
      const lang = window.localStorage.getItem('deviceLanguage');
      var labels = getMessages(lang);
      return labels.login.placeholders;
    },
  },
};
</script>

<style lang="scss">
@import "./../../config.scss";

#login-form {
  background-color: #FFF;
  width: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.background {
  background-color: $main-color;
}

</style>
