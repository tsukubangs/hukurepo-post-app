<template>
  <v-ons-page>
    <custom-toolbar></custom-toolbar>
    <div class="">
      <p>Please, Post your problems 5 times.</p>
      <p v-if="!this.isPostCountDone">not clear post count: {{ this.count }}</p>
      <p v-else>clear</p>
      <p>Please, answer the questionnaire.</p>
      <v-ons-button v-if="!this.isQuestionnareDone" @click="toQuestionnaire()" modifier="outline" style="margin: 6px 0">click here!</v-ons-button>
      <!-- <a v-if="!this.isQuestionnareDone" href="this.questionnaire_url">click here!</a> -->
      <p v-else>clear</p>
      <div class="">
        <v-ons-button v-if="this.isPostCountDone && this.isQuestionnareDone"
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
        this.isPostCountClear = true;
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
