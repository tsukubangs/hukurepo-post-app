<template>
  <v-ons-page>
    <custom-toolbar></custom-toolbar>
    <div class="box">
      <p class="campaign-title">
        "Hukurepo Present Campaign"
      </p>
      <p class="campaign-detail">
        Thank you for using "HukuRepo"</br>
        The problem posted by everyone will be used to make Tsukuba city better. </br>
        Thank you for your cooperation.</br>
        With a gratitude feeling, we prepared gift for everyone who has used it.
        Please clear the following conditions and receive the gift by all means.</p>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="fa-check-circle" class="list-item__icon" v-if="isPostCountDone"></v-ons-icon>
          <v-ons-icon icon="fa-check-circle" class="list-item__icon" style="color:white" v-else></v-ons-icon>
        </div>
        <div class="center">
          Post 5 times
        </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="fa-check-circle" class="list-item__icon" v-if="isQuestionnareDone"></v-ons-icon>
          <v-ons-icon icon="fa-check-circle" class="list-item__icon" style="color:white" v-else></v-ons-icon>
        </div>
        <div class="center">
          Answer the questionnaire
        </div>
      </v-ons-list-item>

      <p class="campaign-map">The exchange place for gifts is <a v-bind:href="questionnaire_url">here</a>.</p>

      <div class="">
        <v-ons-button v-if="isPostCountDone && isQuestionnareDone"
                    @click="toGetPresent()"
                    modifier="large"
                    style="margin: 6px 0">
                    Get present!
        </v-ons-button>
        <v-ons-button v-else disabled modifier="large" style="margin: 6px 0">Get present!</v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import CustomToolbar from './CustomToolbar';
import GetPresentPage from './GetPresentPage';
import { WEB_API_URL, QUESTIONNAIRE_URL } from '../../.env';

export default {
  name: 'present-page',
  components: {
    CustomToolbar,
    GetPresentPage,
  },
  props: ['pageStack'],
  data() {
    return {
      count: 0,
      isPostCountDone: true,
      isQuestionnareDone: true,
      questionnaire_url: QUESTIONNAIRE_URL,
    };
  },
  created() {
    this.isQuestionnareDone = window.localStorage.getItem('complete_questionnaire');
    const token = window.localStorage.getItem('access_token');
    const config = {
      headers: { Authorization: token },
    };
    axios.get(`${WEB_API_URL}/v1/problems/me/count`, config)
    .then((response) => {
      this.count = response.data.count;
      if (this.count >= 5) {
        this.isPostCountDone = true;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  },
  methods: {
    toGetPresent() {
      this.pageStack.push(GetPresentPage);
    },
    toQuestionnaire() {
      window.open(QUESTIONNAIRE_URL);
    },
  },
};
</script>

<style scoped>
</style>
