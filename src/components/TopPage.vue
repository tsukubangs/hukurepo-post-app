<template id="top-page">
  <v-ons-page>
    <custom-toolbar><div class="title"><img class="title-icon" src="../assets/s_logo.png"></div></custom-toolbar>
    <v-ons-tabbar :tabs="tabs" :visible="true" :index="0"></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { FETCH_PROBLEMS, REFETCH_PROBLEMS } from '../vuex/mutation-types';
import axios from 'axios';
import ons from 'onsenui';
import { WEB_API_URL } from '../../.env';
import CustomToolbar from './CustomToolbar';
import MyProblemsPage from './MyProblemsPage';
import AllProblemsPage from './AllProblemsPage';
import RecommendPage from './RecommendPage';
import SettingPage from './SettingPage';
import notification from '../function/notification';

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
  name: 'top-page',
  components: {
    CustomToolbar,
    MyProblemsPage,
    AllProblemsPage,
    RecommendPage,
  },
  created() {
    notification.initialize(this);
  },
  data() {
    return {
      state: 'initial',
      tabs: [
        {
          icon: 'ion-ios-person',
          page: MyProblemsPage,
          label: this.myProblem(),
          props: {
            pageStack: this.pageStack,
          },
        },
        {
          icon: 'ion-ios-people-outline',
          page: AllProblemsPage,
          label: this.timeline(),
          props: {
            pageStack: this.pageStack,
          },
        },
        {
            icon: 'ion-android-restaurant',//<ion-icon name="restaurant"></ion-icon>
            page: RecommendPage,
            label: this.recommendation(),
            props: {
                pageStack: this.pageStack,
            },
        },
        {
          icon: 'ion-ios-more',
          page: SettingPage,
          label: this.other(),
          badge: null,
          props: {
            pageStack: this.pageStack,
          },
        },
      ],
    };
  },
  methods: {
    ...mapActions([
      FETCH_PROBLEMS,
    ]),
    myProblem(){
      var strMessage = window.localStorage.getItem('messages');
      if (strMessage == null){
        window.localStorage.setItem('deviceLanguage', 'en');
        strMessage = JSON.stringify(getMessages('en'));
        window.localStorage.setItem('messages', strMessage);
      }
      const message = JSON.parse(strMessage);
      return message.top.myProblem;
    },
    timeline(){
      var strMessage = window.localStorage.getItem('messages');
      if (strMessage == null){
        window.localStorage.setItem('deviceLanguage', 'en');
        strMessage = JSON.stringify(getMessages('en'));
        window.localStorage.setItem('messages', strMessage);
      }
      const message = JSON.parse(strMessage);
      return message.top.timeline;
    },
    recommendation(){
        var strMessage = window.localStorage.getItem('messages');
        if (strMessage == null){
            window.localStorage.setItem('deviceLanguage', 'en');
            strMessage = JSON.stringify(getMessages('en'));
            window.localStorage.setItem('messages', strMessage);
        }
        const message = JSON.parse(strMessage);
        return message.top.recommendation;
    },
    other(){
      var strMessage = window.localStorage.getItem('messages');
      if (strMessage == null){
        window.localStorage.setItem('deviceLanguage', 'en');
        strMessage = JSON.stringify(getMessages('en'));
        window.localStorage.setItem('messages', strMessage);
      }
      const message = JSON.parse(strMessage);
      return message.top.other;
    },
  },
  props: ['pageStack'],
};
</script>

<style scoped>
.title {
  height: 100%;
  box-sizing: border-box;
  padding: 3px 0;
}
.title-icon {
  height: 100%;
}
</style>
