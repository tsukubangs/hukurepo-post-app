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
import SettingPage from './SettingPage';
import notification from '../function/notification';

export default {
  name: 'top-page',
  components: {
    CustomToolbar,
    MyProblemsPage,
    AllProblemsPage,
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
      const strMessage = window.localStorage.getItem('messages');
      const message = JSON.parse(strMessage);
      return message.top.myProblem;
    },
    timeline(){
      const strMessage = window.localStorage.getItem('messages');
      const message = JSON.parse(strMessage);
      return message.top.timeline;
    },
    other(){
      const strMessage = window.localStorage.getItem('messages');
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
