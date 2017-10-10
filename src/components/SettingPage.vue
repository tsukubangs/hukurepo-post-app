<template>
  <v-ons-page>
    <v-ons-list-header class="header">Setting</v-ons-list-header>
    <v-ons-list>
      <v-ons-list-item tappable  @click="toPrivacy()">
        <div class="left">
          <v-ons-icon icon="ion-locked" class="list-item__icon"></v-ons-icon>
        </div>
        <div class="center">
          Privacy Policy
        </div>
      </v-ons-list-item>
      <v-ons-list-item tappable  @click="toQuestionnaire()">
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
        <div class="center">
          Get Present
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import PrivacyPolicy from './PrivacyPolicy';
import PresentPage from './PresentPage';
import CustomToolbar from './CustomToolbar';
import { QUESTIONNAIRE_URL } from '../../.env';

export default {
  name: 'setting-page',
  components: {
    CustomToolbar,
  },
  props: ['pageStack'],
  methods: {
    toPrivacy() {
      this.pageStack.push(PrivacyPolicy);
    },
    toPresent() {
      this.pageStack.push(PresentPage);
    },
    toQuestionnaire() {
      window.localStorage.setItem('complete_questionnaire', true);
      window.open(QUESTIONNAIRE_URL);
    },
  },
};
</script>

<style>
.header {
  background-color: aliceblue;
}
</style>
