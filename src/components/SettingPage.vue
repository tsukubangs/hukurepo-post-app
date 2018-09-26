<template>
  <v-ons-page>
    <v-ons-list-header class="header">{{ labels.title }}</v-ons-list-header>
    <v-ons-list>
      <v-ons-list-item tappable  @click="toPrivacy()">
        <div class="left">
          <v-ons-icon icon="ion-locked" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ labels.policy }}
        </div>
      </v-ons-list-item>
      <v-ons-list-item tappable  @click="changeLanguage()">
        <div class="left">
          {{ labels.displayLanguage }}
        </div>
        <div class="right">
          {{ setLanguage }}
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ons from 'onsenui';
import PrivacyPolicy from './PrivacyPolicy';
import PresentPage from './PresentPage';
import CustomToolbar from './CustomToolbar';
import { QUESTIONNAIRE_URL } from '../../.env';

import { FETCH_USER_INFO } from '../vuex/mutation-types';

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
  name: 'setting-page',
  components: {
    CustomToolbar,
  },
  props: ['pageStack'],
  created() {
    this.FETCH_USER_INFO();
  },
  data() {
    return {
      language: this.initialLanguage(),
    };
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    setLanguage: function(){
      return this.language.labelLang;
    },
    labels: function(){
      const message = getMessages(this.language.lang);
      return message.settings;
    },
  },
  methods: {
    ...mapActions([
      FETCH_USER_INFO,
    ]),
    toPrivacy() {
      this.pageStack.push(PrivacyPolicy);
    },
    toPresent() {
      this.pageStack.push(PresentPage);
    },
    toQuestionnaire(email) {
      window.localStorage.setItem('complete_questionnaire', true);
      window.open(`${QUESTIONNAIRE_URL}=${email}`);
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
      window.localStorage.setItem('messages', JSON.stringify(labels));
      this.language = {labelLang:labels.labelLang, lang:lang};
      ons.notification.alert({
        title:window.localStorage.getItem('deviceLanguage'),
        message:'言語が変わったので再起動します',
        callback: ()=>{
            navigator.app.loadUrl(
              "file:///android_asset/www/index.html",
              {
                wait:1000,
                loadingDialog:"Wait,Loading App",
                loadUrlTimeoutValue: 5000
              }
            );
        },
      });
    },
    initialLanguage(){
      if(window.localStorage.getItem('deviceLanguage') == null){
        window.localStorage.setItem('deviceLanguage', 'en');
      }
      const lang = window.localStorage.getItem('deviceLanguage');
      var labels = getMessages(lang);
      return {labelLang:labels.labelLang, lang:lang};
    },
  },
};
</script>

<style>
.header {
  background-color: aliceblue;
}

.list-item__icon {
    width: 25px;
}
</style>
