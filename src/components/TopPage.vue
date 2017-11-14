<template id="top-page">
  <v-ons-page>
    <custom-toolbar><div class="title" @click="logout"><img class="title-icon" src="../assets/s_logo.png" /></div></custom-toolbar>
    <v-ons-tabbar :tabs="tabs" :visible="true" :index="0"></v-ons-tabbar>
  </v-ons-page>
</template>

<script>
import CustomToolbar from './CustomToolbar';
import MyProblemsPage from './MyProblemsPage';
import AllProblemsPage from './AllProblemsPage';
import SettingPage from './SettingPage';
import notification from '../function/notification';
import router from '../router';

function logout() {
  window.localStorage.removeItem('access_token');
  router.push('/login');
}

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
  methods: {
    logout,
  },
  data() {
    return {
      state: 'initial',
      tabs: [
        {
          icon: 'ion-ios-person',
          page: MyProblemsPage,
          label: 'My Posts',
          props: {
            pageStack: this.pageStack,
          },
        },
        {
          icon: 'ion-ios-people-outline',
          page: AllProblemsPage,
          label: 'Timeline',
          props: {
            pageStack: this.pageStack,
          },
        },
        {
          icon: 'ion-ios-more',
          page: SettingPage,
          label: 'Other',
          badge: null,
          props: {
            pageStack: this.pageStack,
          },
        },
      ],
    };
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
