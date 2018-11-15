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
      <v-ons-list-item tappable  @click="toPresent()">
        <div class="left">
          <v-ons-icon icon="ion-happy" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ labels.getPresent }}
        </div>
      </v-ons-list-item>
      <v-ons-list-item tappable  @click="toQuestionnaire()">
        <div class="left">
          <v-ons-icon icon="fa-check-circle" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ labels.questionnaire }}
        </div>
      </v-ons-list-item>
      <v-ons-list-header>
        {{ labels.displayLanguage }}
      </v-ons-list-header>
      <v-ons-list-item v-for="(language, $index) in languages" tappable>
        <label class="left">
          <v-ons-radio :input-id="'radio-' + $index" :value="language" v-model="selectedLanguage" v-on:change="changeLanguage"></v-ons-radio>
        </label>
        <label :for="'radio-' + $index" class="center">{{ language }}</label>
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
      languages: ['English','日本語','한국','中国'],
      selectedLanguage:this.initialSelectedLanguage(),
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
    changeLanguage(event){
      const selectLanguage = event.target.value;
      const changeInfo = this.labels.info.change;
      var lang = window.localStorage.getItem('deviceLanguage');
      if (selectLanguage == 'English'){
        lang = 'en';
      }
      else if(selectLanguage == '日本語'){
        lang = 'ja';
      }
      else if(selectLanguage == '한국'){
        lang = 'ko';
      }
      else if(selectLanguage == '中国'){
        lang = 'zh';
      }
      var labels = getMessages(lang);
      window.localStorage.setItem('deviceLanguage', lang);
      window.localStorage.setItem('messages', JSON.stringify(labels));
      this.language = {labelLang:labels.labelLang, lang:lang};
      ons.notification.alert({
        title: changeInfo,
        message: this.selectedLanguage + '⇨' + selectLanguage,
        callback: ()=>{
            if (device.platform == 'Android'){
                navigator.app.loadUrl(
                "file:///android_asset/www/index.html",
                {
                    wait:1000,
                    loadingDialog:"Wait,Loading App",
                    loadUrlTimeoutValue: 5000
                }
                );
            }
            else{
                window.location = "index.html";
            }
        },
      });
    },
    initialSelectedLanguage(){
      if(window.localStorage.getItem('deviceLanguage') == null){
        window.localStorage.setItem('deviceLanguage', 'en');
      }
      const lang = window.localStorage.getItem('deviceLanguage');
      var labels = getMessages(lang);
      return labels.settings.selectLanguage;
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
