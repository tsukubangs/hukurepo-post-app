<template>
  <v-ons-page>
    <v-ons-list-header class="header">Other</v-ons-list-header>
    <v-ons-list>
      <v-ons-list-item tappable  @click="toPrivacy()">
        <div class="left">
          <v-ons-icon icon="ion-locked" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          Terms of Service & Privacy Policy
        </div>
      </v-ons-list-item>
      <v-ons-list-item tappable  @click="toQuestionnaire(userInfo.data.email)">
        <div class="left">
          <v-ons-icon icon="ion-clipboard" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
            Questionnaire
        </div>
      </v-ons-list-item>
      <v-ons-list-item tappable  @click="toPresent()">
        <div class="left">
          <v-ons-icon icon="fa-gift" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center" v-if="!canGetPresent">
          Get Present
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PrivacyPolicy from './PrivacyPolicy';
import PresentPage from './PresentPage';
import CustomToolbar from './CustomToolbar';
import { QUESTIONNAIRE_URL } from '../../.env';

import { FETCH_USER_INFO } from '../vuex/mutation-types';

export default {
  name: 'setting-page',
  components: {
    CustomToolbar,
  },
  props: ['pageStack'],
  created() {
    this.FETCH_USER_INFO();
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
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
  },
};
</script>

<style>
.header {
  background-color: aliceblue;
}
</style>
