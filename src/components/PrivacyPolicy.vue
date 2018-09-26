<template>
  <v-ons-page>
    <custom-toolbar></custom-toolbar>
    <div id="privacy" style="margin: 5%">
      <h1>﻿{{ this.messages.title }}</h1>
      <span v-html="this.messages.leadSentence"></span>
      <h2>{{ this.messages.article1Title }}</h2>
      <span v-html="this.messages.article1Body"></span>
      <h2>{{ this.messages.article2Title }}</h2>
      <span v-html="this.messages.article2Body"></span>
      <h2>{{ this.messages.article3Title }}</h2>
      <span v-html="this.messages.article3Body"></span>
      <h2>{{ this.messages.article4Title }}</h2>
      <span v-html="this.messages.article4Body"></span>
      {{ this.messages.lastUpdate }}: October 12th, 2017.
      <hr width="100%">
      <!-- ---------------------------------------------------------------------- -->
      <h1>{{ this.messages.policyTitle }}</h1>
      <span v-html="this.messages.policyLeadSentence"></span>
      <h2>{{ this.messages.policyArticle1Title }}</h2>
      <span v-html="this.messages.policyArticle1Body"></span>
      <h2>{{ this.messages.policyArticle2Title }}</h2>
      <span v-html="this.messages.policyArticle2Body"></span>
      <h2>{{ this.messages.policyArticle3Title }}</h2>
      <span v-html="this.messages.policyArticle3Body"></span>
      <h2>{{ this.messages.policyArticle4Title }}</h2>
      <span v-html="this.messages.policyArticle4Body"></span>
      <h2>{{ this.messages.policyArticle5Title }}</h2>
      <span v-html="this.messages.policyArticle5Body"></span>
      <h2>{{ this.messages.policyArticle6Title }}</h2>
      <span v-html="this.messages.policyArticle6Body"></span>
      <h2>{{ this.messages.policyArticle7Title }}</h2>
      <span v-html="this.messages.policyArticle7Body"></span>
      <h2>{{ this.messages.policyArticle8Title }}</h2>
      <span v-html="this.messages.policyArticle8Body"></span>
      {{ this.messages.lastUpdate }}: October 12th, 2017.
    </div>
  </v-ons-page>
</template>

<script>
import CustomToolbar from './CustomToolbar';

export default {
  name: 'privacy-page',
  components: {
    CustomToolbar,
  },
  data() {
    return {
      messages: this.messages(),
    };
  },
  methods: {
    messages(){
      return JSON.parse(window.localStorage.getItem('messages')).privacyPolicy;
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
}

#privacy{
  text-align: left;
}

.title {
  height: 100%;
  box-sizing: border-box;
  padding: 3px 0;
}
.title-icon {
  height: 100%;
}
</style>
