<template>
  <v-ons-page>
    <custom-toolbar></custom-toolbar>
    <div class="box">
      <h1 class="campaign-title">
        <span v-html="this.messages.campaignTitle"></span>
      </h1>
      <p class="campaign-detail"><span v-html="this.messages.campaignDetail"></span>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="fa-check-circle" class="list-item__icon" v-if="isPostCountDone"></v-ons-icon>
          <v-ons-icon icon="fa-check-circle" class="list-item__icon" style="color:white" v-else></v-ons-icon>
        </div>
        <div class="center"> {{ this.messages.postTerms }} </div>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">
          <v-ons-icon icon="fa-check-circle" class="list-item__icon" v-if="isQuestionnareDone"></v-ons-icon>
          <v-ons-icon icon="fa-check-circle" class="list-item__icon" style="color:white" v-else></v-ons-icon>
        </div>
        <div class="center"> {{ this.messages.questionnareTerms }} </div>
      </v-ons-list-item>

      <p class="campaign-map"><span v-html="this.messages.campaignMap"></span></p>
      <p class="campaign-expire"> {{ this.messages.campaignExpire }} </p>
      <v-ons-button v-if="isPostCountDone && isQuestionnareDone"
                  @click="toGetPresent()"
                  modifier="large"
                  style="margin: 6px 0">
                  {{ this.messages.buttonLabel.yet }}
      </v-ons-button>
      <v-ons-button v-else disabled modifier="large" style="margin: 6px 0">{{ this.messages.buttonLabel.already }}</v-ons-button>
    </div>
  </v-ons-page>
</template>

<script>
import axios from 'axios';
import ons from 'onsenui';
import CustomToolbar from './CustomToolbar';
import GetPresentPage from './GetPresentPage';
import { WEB_API_URL, PRESENT_EXCHANGE_PLACE } from '../../.env';

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
      isPostCountDone: false,
      isQuestionnareDone: false,
      present_exchange_place: PRESENT_EXCHANGE_PLACE,
      messages: this.getMessages(),
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
      ons.notification.alert({
        title: this.messages.error.connectTitle,
        message: this.messages.error.connectBody,
      });
    });
  },
  methods: {
    toGetPresent() {
      this.pageStack.push(GetPresentPage);
    },
    getMessages(){
      const messages = window.localStorage.getItem('messages');
      return JSON.parse(messages).PresentPage;
    },
  },
};
</script>

<style scoped>
.box {
  width: 80%;
  margin: auto;
}
.campaign-title {
  font-weight: 400;
  margin-top:20px;
}
.campaign-detail {
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  line-height: 1.5;
}
.campaign-map {
  font-size: 14px;
  margin-top: 30px;
  margin-bottom: 10px;
}
.campaign-expire {
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 30px;
  color: red;
}
h1 {
position: relative;
}

h1:after {
content: "";
position: absolute;
left: 0;
bottom: 0;
width: 100%;
height: 4px;
background: -webkit-repeating-linear-gradient(-45deg, #6ad1c8, #6ad1c8 2px, #fff 2px, #fff 4px);
background: repeating-linear-gradient(-45deg, #6ad1c8, #6ad1c8 2px, #fff 2px, #fff 4px);
}
</style>
